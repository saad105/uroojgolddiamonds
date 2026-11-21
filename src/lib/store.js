// Local store (localStorage) + cloud sync for products, gold rates, offers and
// the welcome announcement. This is where the "live gold rates" come from:
// the shop owner edits them in the admin panel; they're saved locally and, if
// Supabase is configured, pushed to `store_settings.gold_rates`. Every visitor's
// browser re-pulls them every 20 seconds and on Supabase Realtime change events.
import { DEFAULT_PRODUCTS, DEFAULT_RATES, DEFAULT_ANNOUNCEMENT, DEFAULT_OFFERS } from '../data/store.js';
import {
  getSupabase,
  isSupabaseConfigured,
  fetchCloudProducts,
  fetchCloudStoreSettings,
  saveBulkProductsToCloud,
  saveProductToCloud,
  deleteProductFromCloud,
  updateCloudStoreSettings,
} from './supabase.js';

export const STORAGE_KEYS = {
  PRODUCTS: 'urooj_catalog_products_v1',
  RATES: 'urooj_gold_metal_rates_v1',
  ANNOUNCEMENT: 'urooj_welcome_announcement_v1',
  OFFERS: 'urooj_offers_discounts_v1',
};

/* ---------- sanitizers ---------- */
export function sanitizeText(s) {
  return s
    ? String(s)
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/vbscript:/gi, '')
        .replace(/data:text\/html/gi, '')
        .replace(/on\w+=/gi, '')
        .trim()
    : '';
}
export function sanitizeImageUrl(s) {
  if (!s) return '';
  const t = s.trim();
  if (t.startsWith('https://') || t.startsWith('data:image/') || t.startsWith('/')) {
    return /javascript:|vbscript:|data:text/i.test(t) ? '' : t;
  }
  return t.startsWith('http://') ? t.replace('http://', 'https://') : '';
}
function sanitizeProduct(p) {
  return {
    ...p,
    id: sanitizeText(p.id) || `prod_${Date.now()}`,
    name: sanitizeText(p.name),
    sku: sanitizeText(p.sku),
    subCategory: p.subCategory ? sanitizeText(p.subCategory) : undefined,
    collection: p.collection ? sanitizeText(p.collection) : undefined,
    price: Math.max(0, Number(p.price) || 0),
    originalPrice: p.originalPrice ? Math.max(0, Number(p.originalPrice)) : undefined,
    approxWeight: sanitizeText(p.approxWeight) || '10.00g',
    netGoldWeight: p.netGoldWeight ? sanitizeText(p.netGoldWeight) : undefined,
    images: (p.images || []).map(sanitizeImageUrl).filter(Boolean),
    description: sanitizeText(p.description),
    shortDescription: p.shortDescription ? sanitizeText(p.shortDescription) : undefined,
    stoneDetails: p.stoneDetails ? sanitizeText(p.stoneDetails) : undefined,
    isNewArrival: !!p.isNewArrival,
    isBestseller: !!p.isBestseller,
    isBridal: !!p.isBridal,
    isSignature: !!p.isSignature,
    inStock: p.inStock !== false,
    dimensions: p.dimensions ? sanitizeText(p.dimensions) : undefined,
    deliveryInfo: p.deliveryInfo ? sanitizeText(p.deliveryInfo) : undefined,
    careInstructions: p.careInstructions ? sanitizeText(p.careInstructions) : undefined,
  };
}

export function notifyStoreUpdated() {
  window.dispatchEvent(new Event('urooj_store_updated'));
}

/* ---------- products ---------- */
export function getProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) return DEFAULT_PRODUCTS;
    const list = JSON.parse(raw);
    return Array.isArray(list) && list.length > 0 ? list.map(sanitizeProduct) : DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function saveProducts(products) {
  const clean = products.map(sanitizeProduct);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(clean));
  notifyStoreUpdated();
  if (isSupabaseConfigured()) saveBulkProductsToCloud(clean).catch((e) => console.error('Cloud bulk sync failed:', e));
}

export async function upsertProduct(product) {
  const clean = sanitizeProduct(product);
  const list = getProducts();
  const exists = list.some((p) => p.id === clean.id);
  const next = exists ? list.map((p) => (p.id === clean.id ? clean : p)) : [clean, ...list];
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
  notifyStoreUpdated();
  if (isSupabaseConfigured()) return saveProductToCloud(clean);
  return { success: true, local: true };
}

export async function removeProduct(id) {
  const next = getProducts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
  notifyStoreUpdated();
  if (isSupabaseConfigured()) return deleteProductFromCloud(id);
  return { success: true, local: true };
}

/* ---------- gold rates ---------- */
export function getRates() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RATES);
    return raw ? { ...DEFAULT_RATES, ...JSON.parse(raw) } : DEFAULT_RATES;
  } catch {
    return DEFAULT_RATES;
  }
}

/** Save rates and mirror them into the welcome-announcement rate card */
export function saveRates(rates) {
  const r = {
    ...rates,
    karat24: Math.max(1000, Number(rates.karat24) || 0),
    karat22: Math.max(1000, Number(rates.karat22) || 0),
    karat18: Math.max(1000, Number(rates.karat18) || 0),
    silver: Math.max(10, Number(rates.silver) || 0),
    change22: Number(rates.change22) || 0,
    buying22K: rates.buying22K ? Math.max(1000, Number(rates.buying22K)) : undefined,
    platinumSelling: rates.platinumSelling ? Math.max(1000, Number(rates.platinumSelling)) : undefined,
    platinumBuying: rates.platinumBuying ? Math.max(1000, Number(rates.platinumBuying)) : undefined,
  };
  localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(r));
  let announcement = getAnnouncement();
  if (announcement?.rightCard) {
    const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
    announcement = {
      ...announcement,
      rightCard: {
        ...announcement.rightCard,
        rates: [
          { label: '22K (91.6) SELLING', rate: fmt(r.karat22) },
          { label: '22K (91.6) BUYING', rate: fmt(r.buying22K || r.karat22) },
          { label: '18K JEWELLERY', rate: fmt(r.karat18) },
          { label: 'PLATINUM', rate: fmt(r.platinumSelling || 7300) },
          { label: 'PLATINUM BUYING', rate: fmt(r.platinumBuying || 6300) },
        ],
      },
    };
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(announcement));
  }
  notifyStoreUpdated();
  if (isSupabaseConfigured()) {
    return updateCloudStoreSettings({ gold_rates: r, welcome_announcement: announcement });
  }
  return Promise.resolve({ success: true, local: true });
}

/* ---------- welcome announcement ---------- */
export function getAnnouncement() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
    return raw ? { ...DEFAULT_ANNOUNCEMENT, ...JSON.parse(raw) } : DEFAULT_ANNOUNCEMENT;
  } catch {
    return DEFAULT_ANNOUNCEMENT;
  }
}

export function saveAnnouncement(a) {
  const clean = {
    ...a,
    leftCard: {
      ...a.leftCard,
      title: sanitizeText(a.leftCard.title),
      location: sanitizeText(a.leftCard.location),
      date: sanitizeText(a.leftCard.date),
      hijriDate: sanitizeText(a.leftCard.hijriDate),
      day: sanitizeText(a.leftCard.day),
      prayers: a.leftCard.prayers.map((p) => ({ ...p, name: sanitizeText(p.name), start: sanitizeText(p.start), end: sanitizeText(p.end) })),
      fastingTimings: { saher: sanitizeText(a.leftCard.fastingTimings.saher), iftar: sanitizeText(a.leftCard.fastingTimings.iftar) },
    },
    rightCard: {
      ...a.rightCard,
      titleLine1: sanitizeText(a.rightCard.titleLine1),
      titleLine2: sanitizeText(a.rightCard.titleLine2),
      rates: a.rightCard.rates.map((r) => ({ ...r, label: sanitizeText(r.label), rate: sanitizeText(r.rate) })),
      advanceBooking: { heading: sanitizeText(a.rightCard.advanceBooking.heading), text: sanitizeText(a.rightCard.advanceBooking.text) },
    },
    ctaText: sanitizeText(a.ctaText),
  };
  localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(clean));
  notifyStoreUpdated();
  if (isSupabaseConfigured()) return updateCloudStoreSettings({ welcome_announcement: clean });
  return Promise.resolve({ success: true, local: true });
}

/* ---------- offers ---------- */
export function getOffers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFERS);
    return raw ? { ...DEFAULT_OFFERS, ...JSON.parse(raw) } : DEFAULT_OFFERS;
  } catch {
    return DEFAULT_OFFERS;
  }
}

export function saveOffers(o) {
  const clean = {
    activeBanner: !!o.activeBanner,
    bannerText: sanitizeText(o.bannerText),
    schemes: (o.schemes || []).map((s) => ({
      ...s,
      title: sanitizeText(s.title),
      badge: sanitizeText(s.badge),
      description: sanitizeText(s.description),
      code: s.code ? sanitizeText(s.code).toUpperCase() : undefined,
      validUntil: s.validUntil ? sanitizeText(s.validUntil) : undefined,
      category: s.category ? sanitizeText(s.category) : undefined,
      isActive: !!s.isActive,
    })),
  };
  localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(clean));
  notifyStoreUpdated();
  if (isSupabaseConfigured()) return updateCloudStoreSettings({ offers_config: clean });
  return Promise.resolve({ success: true, local: true });
}

/* ---------- reset ---------- */
export function resetStoreToDefaults() {
  Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  localStorage.removeItem(ADMIN_PIN_HASH_KEY);
  clearLockout();
  notifyStoreUpdated();
  if (isSupabaseConfigured()) {
    saveBulkProductsToCloud(DEFAULT_PRODUCTS);
    updateCloudStoreSettings({ gold_rates: DEFAULT_RATES, offers_config: DEFAULT_OFFERS, welcome_announcement: DEFAULT_ANNOUNCEMENT });
  }
}

/* ---------- cloud sync ---------- */
export async function syncFromCloud() {
  if (!isSupabaseConfigured() || !getSupabase()) return false;
  try {
    let changed = false;
    const products = await fetchCloudProducts();
    if (products !== null) {
      if (products.length > 0) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products.map(sanitizeProduct)));
        changed = true;
      } else {
        await saveBulkProductsToCloud(DEFAULT_PRODUCTS); // seed an empty cloud catalogue
      }
    }
    const settings = await fetchCloudStoreSettings();
    if (settings) {
      if (settings.gold_rates) { localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(settings.gold_rates)); changed = true; }
      if (settings.offers_config) { localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(settings.offers_config)); changed = true; }
      if (settings.welcome_announcement) { localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(settings.welcome_announcement)); changed = true; }
    }
    if (changed) notifyStoreUpdated();
    return true;
  } catch (e) {
    console.error('Error syncing store from cloud:', e);
    return false;
  }
}

/** Starts live sync: initial pull, Realtime subscription and a 20s poll. Returns cleanup. */
export function startLiveSync(onChange) {
  const sb = getSupabase();
  if (!isSupabaseConfigured() || !sb) return () => {};
  syncFromCloud().then(() => onChange && onChange());
  const channel = sb
    .channel('urooj-store-realtime-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, async () => {
      await syncFromCloud();
      onChange && onChange();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'store_settings' }, async () => {
      await syncFromCloud();
      onChange && onChange();
    })
    .subscribe();
  const timer = setInterval(() => syncFromCloud().then(() => onChange && onChange()), 20000);
  return () => {
    sb.removeChannel(channel);
    clearInterval(timer);
  };
}

/** Push everything local -> cloud (admin "Push to Cloud") */
export async function pushAllToCloud() {
  if (!isSupabaseConfigured()) return { success: false, count: 0, error: 'Supabase credentials are not configured in Admin -> Cloud Database.' };
  const products = getProducts();
  const p = await saveBulkProductsToCloud(products);
  const s = await updateCloudStoreSettings({ gold_rates: getRates(), offers_config: getOffers(), welcome_announcement: getAnnouncement() });
  if (p.success && s.success) return { success: true, count: products.length };
  return {
    success: false,
    count: products.length,
    error: [p.success ? null : `Products: ${p.error}`, s.success ? null : `Settings: ${s.error}`].filter(Boolean).join(' | '),
  };
}

export function subscribeStore(cb) {
  window.addEventListener('urooj_store_updated', cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener('urooj_store_updated', cb);
    window.removeEventListener('storage', cb);
  };
}

/* =========================================================================
   Admin security: salted SHA-256 PIN, 5-attempt lockout (15 min), session token.
   Default PIN: the same admin password as the original site (change it in Admin -> Security)
   ========================================================================= */
const LOCKOUT_KEY = 'urooj_admin_sec_lockout_v1';
const SESSION_KEY = 'urooj_admin_backend_token';
const ADMIN_PIN_HASH_KEY = 'urooj_admin_custom_pin_hash_v1';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const DEFAULT_PIN_HASH = '60d41d3e95e75180514e7ef8559660b7826af2531735c646daa174fe4a16423a';
const PIN_SALT = 'urooj_jewellers_salt_2026_hyd_786';

async function hashPin(pin) {
  const bytes = new TextEncoder().encode(PIN_SALT + pin.trim());
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function getLockoutState() {
  try {
    const raw = localStorage.getItem(LOCKOUT_KEY);
    if (!raw) return { failedAttempts: 0, lockedUntil: null };
    const s = JSON.parse(raw);
    if (s.lockedUntil && Date.now() > s.lockedUntil) {
      clearLockout();
      return { failedAttempts: 0, lockedUntil: null };
    }
    return s;
  } catch {
    return { failedAttempts: 0, lockedUntil: null };
  }
}
function clearLockout() {
  localStorage.removeItem(LOCKOUT_KEY);
}
function registerFailedAttempt() {
  const s = getLockoutState();
  const attempts = s.failedAttempts + 1;
  const now = Date.now();
  const lockedUntil = attempts >= MAX_ATTEMPTS ? now + LOCKOUT_MS : s.lockedUntil;
  localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ failedAttempts: attempts, lockedUntil, lastAttemptTime: now }));
  const isLocked = lockedUntil !== null && now < lockedUntil;
  return {
    isLocked,
    remainingLockSeconds: isLocked ? Math.ceil((lockedUntil - now) / 1000) : 0,
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - attempts),
  };
}

export async function verifyAdminPin(pin) {
  const p = pin.trim();
  if (!p) return { success: false, isLocked: false, remainingLockSeconds: 0, attemptsLeft: MAX_ATTEMPTS };
  const lock = getLockoutState();
  if (lock.lockedUntil && Date.now() < lock.lockedUntil) {
    return { success: false, isLocked: true, remainingLockSeconds: Math.ceil((lock.lockedUntil - Date.now()) / 1000), attemptsLeft: 0 };
  }
  const expected = localStorage.getItem(ADMIN_PIN_HASH_KEY) || DEFAULT_PIN_HASH;
  if ((await hashPin(p)) === expected) {
    clearLockout();
    sessionStorage.setItem(SESSION_KEY, `urooj_admin_sec_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`);
    return { success: true, isLocked: false, remainingLockSeconds: 0, attemptsLeft: MAX_ATTEMPTS };
  }
  return { success: false, ...registerFailedAttempt() };
}

export async function changeAdminPin(newPin) {
  if (!newPin || newPin.trim().length < 8) return false;
  localStorage.setItem(ADMIN_PIN_HASH_KEY, await hashPin(newPin));
  return true;
}

export const isAdminSessionActive = () => !!sessionStorage.getItem(SESSION_KEY);
export const endAdminSession = () => sessionStorage.removeItem(SESSION_KEY);

export function pinStrength(pin) {
  const t = pin.trim();
  const feedback = [];
  let score = 0;
  t.length < 8 ? feedback.push('Must be at least 8 characters long') : (score += 1);
  /[A-Z]/.test(t) ? (score += 1) : feedback.push('Include at least one uppercase letter');
  /[0-9]/.test(t) ? (score += 1) : feedback.push('Include at least one number');
  /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(t) ? (score += 1) : feedback.push('Include at least one special symbol (!@#$%^&*)');
  if (['12345678', 'password', 'admin123', 'urooj123', 'qwertyui'].some((w) => t.toLowerCase().includes(w))) {
    feedback.push('Avoid common sequential patterns');
    score = Math.max(0, score - 1);
  }
  const label = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][Math.min(score, 4)];
  return { score, label, isValid: t.length >= 8 && score >= 3, feedback };
}

/** Mirrors the original admin session helper: ending a session clears the token. */
export function setAdminSessionState(active) {
  if (!active) endAdminSession();
  notifyStoreUpdated();
}
