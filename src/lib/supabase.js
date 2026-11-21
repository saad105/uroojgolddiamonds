// Optional Supabase cloud backend.
// Credentials come from (1) values saved in the admin panel (localStorage) or
// (2) VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in .env. With neither, the site
// runs fully offline on localStorage.
import { createClient } from '@supabase/supabase-js';

const LS_KEYS = { URL: 'urooj_supabase_url', ANON_KEY: 'urooj_supabase_anon_key' };

const isValidUrl = (url) => {
  if (!url || url.includes('your-project') || url.includes('example.com')) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};
const isValidKey = (key) =>
  !(!key || key.includes('your-anon-public-key') || key.includes('your-anon-key') || key.length < 20);

export function getSupabaseConfig() {
  const url = (localStorage.getItem(LS_KEYS.URL) || '').trim();
  const anonKey = (localStorage.getItem(LS_KEYS.ANON_KEY) || '').trim();
  if (isValidUrl(url) && isValidKey(anonKey)) return { url, anonKey, source: 'custom' };
  const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
  if (isValidUrl(envUrl) && isValidKey(envKey)) return { url: envUrl, anonKey: envKey, source: 'env' };
  return { url: '', anonKey: '', source: 'none' };
}

export const isSupabaseConfigured = () => {
  const c = getSupabaseConfig();
  return isValidUrl(c.url) && isValidKey(c.anonKey);
};

let client = null;
function initClient() {
  const c = getSupabaseConfig();
  if (!isValidUrl(c.url) || !isValidKey(c.anonKey)) return (client = null);
  try {
    client = createClient(c.url, c.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  } catch (e) {
    console.warn('Supabase initialization skipped:', e);
    client = null;
  }
  return client;
}
initClient();

export const getSupabase = () => client || initClient();

export function saveSupabaseCredentials(url, key) {
  const u = url.trim();
  const k = key.trim();
  if (!isValidUrl(u)) return { success: false, error: 'Please enter a valid Supabase Project URL (e.g., https://xyz.supabase.co)' };
  if (!isValidKey(k)) return { success: false, error: 'Please enter a valid Supabase anon public key (starts with eyJ... or sb_publishable_...)' };
  localStorage.setItem(LS_KEYS.URL, u);
  localStorage.setItem(LS_KEYS.ANON_KEY, k);
  initClient();
  return { success: true };
}

export function clearSupabaseCredentials() {
  localStorage.removeItem(LS_KEYS.URL);
  localStorage.removeItem(LS_KEYS.ANON_KEY);
  initClient();
}

/* ---------- row mappers ---------- */
const parseJson = (v, fallback) => (Array.isArray(v) ? v : typeof v === 'string' ? JSON.parse(v) : fallback);

export const productFromRow = (r) => ({
  id: r.id,
  name: r.name,
  sku: r.sku || '',
  category: r.category,
  subCategory: r.sub_category || undefined,
  type: r.type || 'gold',
  collection: r.collection || undefined,
  metal: r.metal || 'Yellow Gold',
  purity: r.purity || '22K',
  price: Number(r.price),
  originalPrice: r.original_price ? Number(r.original_price) : undefined,
  approxWeight: r.approx_weight || '10.00g',
  netGoldWeight: r.net_gold_weight || undefined,
  images: parseJson(r.images, []),
  description: r.description || '',
  shortDescription: r.short_description || undefined,
  stoneDetails: r.stone_details || undefined,
  diamondDetails: r.diamond_details || undefined,
  occasion: parseJson(r.occasion, ['Wedding', 'Festive', 'Bridal']),
  gender: r.gender || 'Women',
  isNewArrival: !!r.is_new_arrival,
  isBestseller: !!r.is_bestseller,
  isBridal: !!r.is_bridal,
  isSignature: !!r.is_signature,
  inStock: r.in_stock !== false,
  dimensions: r.dimensions || undefined,
  deliveryInfo: r.delivery_info || undefined,
  careInstructions: r.care_instructions || undefined,
});

export const productToRow = (p) => ({
  id: p.id,
  name: p.name,
  sku: p.sku || null,
  category: p.category,
  sub_category: p.subCategory || null,
  type: p.type,
  collection: p.collection || null,
  metal: p.metal,
  purity: p.purity,
  price: p.price,
  original_price: p.originalPrice || null,
  approx_weight: p.approxWeight || null,
  net_gold_weight: p.netGoldWeight || null,
  images: p.images || [],
  description: p.description || null,
  short_description: p.shortDescription || null,
  stone_details: p.stoneDetails || null,
  diamond_details: p.diamondDetails || null,
  occasion: p.occasion || [],
  gender: p.gender || 'Women',
  is_new_arrival: !!p.isNewArrival,
  is_bestseller: !!p.isBestseller,
  is_bridal: !!p.isBridal,
  is_signature: !!p.isSignature,
  in_stock: p.inStock !== false,
  dimensions: p.dimensions || null,
  delivery_info: p.deliveryInfo || null,
  care_instructions: p.careInstructions || null,
  updated_at: new Date().toISOString(),
});

/* ---------- products ---------- */
export async function fetchCloudProducts() {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      console.warn('Notice from cloud database fetch:', error.message);
      return null;
    }
    return !data || data.length === 0 ? [] : data.map(productFromRow);
  } catch (e) {
    console.error('Exception in fetchCloudProducts:', e);
    return null;
  }
}

export async function saveProductToCloud(product) {
  const sb = getSupabase();
  if (!sb) return { success: false, error: 'Supabase is not connected. Enter your Supabase Project URL & Anon Key in Admin -> Cloud Database.' };
  try {
    const { error } = await sb.from('products').upsert(productToRow(product), { onConflict: 'id' });
    return error ? { success: false, error: error.message } : { success: true };
  } catch (e) {
    return { success: false, error: e.message || 'Unknown network error' };
  }
}

export async function deleteProductFromCloud(id) {
  const sb = getSupabase();
  if (!sb) return { success: false, error: 'Supabase is not connected.' };
  try {
    const { error } = await sb.from('products').delete().eq('id', id);
    return error ? { success: false, error: error.message } : { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function saveBulkProductsToCloud(products) {
  const sb = getSupabase();
  if (!sb || products.length === 0) return { success: false, count: 0, error: 'Supabase is not connected.' };
  try {
    const { error } = await sb.from('products').upsert(products.map(productToRow), { onConflict: 'id' });
    return error ? { success: false, count: 0, error: error.message } : { success: true, count: products.length };
  } catch (e) {
    return { success: false, count: 0, error: e.message || 'Unknown network error' };
  }
}

/* ---------- store settings (rates, offers, announcement, newsletter) ---------- */
const SETTINGS_ID = 'urooj_store_main';

export async function fetchCloudStoreSettings() {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb
      .from('store_settings')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) {
      console.warn('Notice fetching cloud store settings:', error.message);
      return null;
    }
    return data;
  } catch (e) {
    console.error('Exception in fetchCloudStoreSettings:', e);
    return null;
  }
}

export async function updateCloudStoreSettings(patch) {
  const sb = getSupabase();
  if (!sb) return { success: false, error: 'Supabase is not connected.' };
  try {
    const current = await fetchCloudStoreSettings();
    const row = { id: current?.id || SETTINGS_ID, ...patch, updated_at: new Date().toISOString() };
    const { error } = await sb.from('store_settings').upsert(row, { onConflict: 'id' });
    return error ? { success: false, error: error.message } : { success: true };
  } catch (e) {
    return { success: false, error: e.message || 'Unknown network error' };
  }
}

/* ---------- appointments / enquiries / newsletter ---------- */
export async function saveAppointmentToCloud(appt, userId) {
  const sb = getSupabase();
  if (!sb) return { success: false, error: 'Supabase is not connected' };
  try {
    const row = {
      name: appt.name,
      phone: appt.phone,
      email: appt.email,
      preferred_date: appt.preferredDate,
      preferred_time: appt.preferredTime,
      interest: appt.interest,
      notes: appt.notes || null,
      status: appt.status || 'Confirmed',
    };
    if (userId) row.user_id = userId;
    const { error } = await sb.from('appointments').insert(row);
    return error ? { success: false, error: error.message } : { success: true };
  } catch (e) {
    return { success: false, error: e.message || 'Network error' };
  }
}

export async function fetchAppointmentsFromCloud() {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb.from('appointments').select('*').order('created_at', { ascending: false });
    if (error) return [];
    return (data || []).map((d) => ({
      id: d.id || `APT-${Date.now()}`,
      name: d.name,
      phone: d.phone,
      email: d.email,
      preferredDate: d.preferred_date,
      preferredTime: d.preferred_time,
      interest: d.interest,
      notes: d.notes || '',
      status: d.status || 'Confirmed',
      createdAt: d.created_at,
    }));
  } catch {
    return [];
  }
}

export async function saveCustomerInquiryToCloud(inq) {
  const sb = getSupabase();
  if (!sb) return { success: false, error: 'Supabase is not connected' };
  try {
    const row = {
      id: `INQ-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: inq.name,
      phone: inq.phone,
      email: inq.email || null,
      subject: inq.subject || null,
      interest: inq.interest || null,
      message: inq.message,
      source: inq.source || 'website_contact',
      created_at: new Date().toISOString(),
    };
    const { error } = await sb.from('customer_inquiries').insert(row);
    if (!error) return { success: true };
    // Fallback: store as an appointment-style enquiry
    const { error: e2 } = await sb.from('appointments').insert({
      name: inq.name,
      phone: inq.phone,
      email: inq.email || 'customer@uroojjewels.com',
      preferred_date: new Date().toISOString().split('T')[0],
      preferred_time: 'Online Enquiry',
      interest: inq.interest || 'General Consultation',
      notes: `${inq.subject ? `Subject: ${inq.subject}\n` : ''}${inq.message}`,
      status: 'New Enquiry',
    });
    return e2 ? { success: false, error: error.message || e2.message } : { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

export async function saveNewsletterSubscriberToCloud(email) {
  const sb = getSupabase();
  const clean = email.trim().toLowerCase();
  // always keep a local copy so the admin panel can list subscribers offline
  try {
    const list = JSON.parse(localStorage.getItem('urooj_newsletter_subscribers') || '[]');
    if (!list.includes(clean)) localStorage.setItem('urooj_newsletter_subscribers', JSON.stringify([...list, clean]));
  } catch {}
  if (!sb || !clean) return { success: false, error: 'Supabase is not connected or email invalid' };
  try {
    const { error } = await sb.from('newsletter_subscribers').insert({ email: clean });
    if (!error) return { success: true };
    const settings = await fetchCloudStoreSettings();
    const list = settings?.newsletter_list || [];
    if (!list.includes(clean)) await updateCloudStoreSettings({ ...settings, newsletter_list: [...list, clean] });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/* ---------- product image upload (compress -> storage bucket, else data URL) ---------- */
function compressImage(file, maxSize = 1400, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (ev) => {
      const img = new Image();
      img.src = ev.target?.result;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas context could not be created.'));
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        canvas.toBlob((blob) => (blob ? resolve({ blob, dataUrl }) : reject(new Error('Canvas to Blob conversion failed.'))), 'image/jpeg', quality);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

export async function uploadProductImage(file, label) {
  const { blob, dataUrl } = await compressImage(file);
  const sb = getSupabase();
  if (!sb) return { url: dataUrl, isCloudStorage: false };
  const safe = (label || 'jewel').replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
  const path = `products/${safe}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.jpg`;
  const { error } = await sb.storage.from('product-images').upload(path, blob, { contentType: 'image/jpeg', upsert: true });
  if (error) return { url: dataUrl, isCloudStorage: false, error: error.message };
  const { data } = sb.storage.from('product-images').getPublicUrl(path);
  return data?.publicUrl ? { url: data.publicUrl, isCloudStorage: true } : { url: dataUrl, isCloudStorage: false };
}

/* ---------- connection test ---------- */
export async function testSupabaseConnection() {
  if (!isSupabaseConfigured()) return { connected: false, error: 'Supabase URL or Anon Key is missing. Enter your credentials in the box below.' };
  const sb = getSupabase();
  if (!sb) return { connected: false, error: 'Supabase client failed to initialize with provided URL/Key.' };
  const start = Date.now();
  try {
    const { count, error } = await sb.from('products').select('*', { count: 'exact', head: true });
    const { error: e2 } = await sb.from('store_settings').select('id').limit(1);
    const latencyMs = Date.now() - start;
    if (error && error.code === '42P01')
      return { connected: false, latencyMs, error: 'Database connected, but tables do not exist yet. Run supabase/schema.sql in your Supabase SQL Editor.' };
    if (error && e2) return { connected: false, latencyMs, error: `Supabase error: ${error.message || e2.message}` };
    return {
      connected: true,
      latencyMs,
      productCount: typeof count === 'number' ? count : undefined,
      tablesVerified: ['products', 'store_settings', 'profiles', 'wishlist_items', 'cart_items', 'appointments'],
    };
  } catch (e) {
    return { connected: false, latencyMs: Date.now() - start, error: e.message || 'Failed to ping Supabase servers.' };
  }
}
