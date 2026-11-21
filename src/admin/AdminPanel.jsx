import React, { useState, useEffect, useRef } from 'react';
import {
  ActivityIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  CameraIcon,
  CheckIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  ClockIcon,
  CopyIcon,
  DatabaseIcon,
  DollarSignIcon,
  ExternalLinkIcon,
  EyeIcon,
  EyeOffIcon,
  GemIcon,
  HardDriveIcon,
  ImageIcon,
  KeyRoundIcon,
  LayersIcon,
  LockIcon,
  MailIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  PenIcon,
  PhoneIcon,
  PlusIcon,
  RefreshCwIcon,
  SaveIcon,
  SearchIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TagIcon,
  Trash2Icon,
  UploadIcon,
  WifiIcon,
  WifiOffIcon,
  XIcon,
} from 'lucide-react';
import {
  changeAdminPin,
  getAnnouncement,
  getLockoutState,
  getOffers,
  getProducts,
  getRates,
  isAdminSessionActive,
  pinStrength,
  pushAllToCloud,
  resetStoreToDefaults,
  saveAnnouncement,
  saveOffers,
  saveProducts,
  saveRates,
  setAdminSessionState,
  syncFromCloud,
  verifyAdminPin,
} from '../lib/store.js';
import {
  clearSupabaseCredentials,
  fetchAppointmentsFromCloud,
  fetchCloudStoreSettings,
  getSupabaseConfig,
  isSupabaseConfigured,
  saveProductToCloud,
  saveSupabaseCredentials,
  testSupabaseConnection,
  uploadProductImage,
} from '../lib/supabase.js';
import {
  CATEGORY_OPTIONS,
  DIAMOND_CLARITIES,
  DIAMOND_COLORS,
  DIAMOND_SHAPES,
  METAL_OPTIONS,
  PURITY_OPTIONS,
  SAMPLE_IMAGES,
} from '../data/adminOptions.js';
import { CONFIG } from '../data/store.js';
import { formatINR } from '../lib/format.js';

const AdminPanel = ({ isOpen, onClose, onProductsUpdated }) => {
  const [l, c] = useState(false),
    [d, u] = useState(''),
    [m, p] = useState(''),
    [x, b] = useState('products'),
    [g, v] = useState([]),
    [w, C] = useState([]),
    [E, S] = useState([]),
    [k, O] = useState(false),
    [T, R] = useState([]),
    [P, V] = useState(''),
    [H, G] = useState('all'),
    [X, W] = useState(false),
    [oe, ye] = useState(null),
    [Z, De] = useState(''),
    [Se, Y] = useState(''),
    [fe, se] = useState('Necklaces'),
    [Ne, ve] = useState(''),
    [ze, At] = useState('gold'),
    [Kt, B] = useState('THE HERITAGE EDIT'),
    [$, ce] = useState('Yellow Gold'),
    [de, Te] = useState('22K'),
    [Ae, Be] = useState(1e5),
    [ne, ge] = useState(0),
    [Dt, _n] = useState('15.00g'),
    [Os, Lt] = useState('15.00g'),
    [We, Fe] = useState([]),
    [Mt, Cs] = useState(''),
    [rs, Fs] = useState(''),
    [Ks, ae] = useState(''),
    [tt, $s] = useState(true),
    [Ms, Ys] = useState(false),
    [us, mn] = useState(false),
    [hs, _a] = useState(false),
    [Rn, na] = useState(true),
    [aa, pn] = useState('Round'),
    [fs, J] = useState('VVS'),
    [ke, He] = useState('D-F (Colorless)'),
    [ft, Je] = useState(0.5),
    [mt, ra] = useState('Excellent'),
    [nt, zt] = useState(getRates()),
    [at, is] = useState(getAnnouncement()),
    [ot, $t] = useState(getOffers()),
    [ls, Bc] = useState(null),
    [Lx, zx] = useState(false),
    [Ra, Cr] = useState(false),
    [Ba, Bn] = useState(false),
    [Oa, Fa] = useState(false),
    [xn, Oc] = useState(false),
    [bi, yi] = useState(false),
    [Ss, $l] = useState(null),
    [vi, Yl] = useState(() => getSupabaseConfig().url),
    [wi, ji] = useState(() => getSupabaseConfig().anonKey),
    [Sr, Wl] = useState(false),
    [Ni, gn] = useState(false),
    [Ke, Yt] = useState(''),
    [On, Xl] = useState(''),
    [Fc, Ma] = useState('idle'),
    [Jl, Fn] = useState(''),
    [ia, Ei] = useState(false),
    [Ws, Ia] = useState(false),
    [Xs, Js] = useState(false),
    [gt, Ci] = useState(0),
    [Mc, Si] = useState(5),
    [Mn, la] = useState(false),
    Ic = useRef(null),
    Ql = useRef(null);
  useEffect(() => {
    if (isOpen) {
      const N = isAdminSessionActive();
      c(N);
      R(getProducts());
      zt(getRates());
      is(getAnnouncement());
      $t(getOffers());
      const Q = getLockoutState();
      if (Q.lockedUntil && Date.now() < Q.lockedUntil) {
        Js(true);
        Ci(Math.ceil((Q.lockedUntil - Date.now()) / 1e3));
      } else {
        Js(false);
        Si(Math.max(0, 5 - Q.failedAttempts));
      }
    }
  }, [isOpen]);
  useEffect(() => {
    if (!Xs || gt <= 0) {
      return;
    }
    const N = setInterval(() => {
      Ci((Q) => (Q <= 1 ? (Js(false), Si(5), clearInterval(N), 0) : Q - 1));
    }, 1e3);
    return () => clearInterval(N);
  }, [Xs, gt]);
  const Ge = (N) => {
      Bc(N);
      setTimeout(() => {
        Bc(null);
      }, 3500);
    },
    vh = async (N) => {
      if ((N && N.preventDefault(), !d.trim())) {
        p('Please enter the security PIN code');
        return;
      }
      la(true);
      const Q = await verifyAdminPin(d);
      la(false);
      if (Q.success) {
        c(true);
        setAdminSessionState(true);
        p('');
        Js(false);
        u('');
        Ge('Master Admin session securely authenticated.');
      } else if (Q.isLocked) {
        Js(true);
        Ci(Q.remainingLockSeconds);
        p(`Security Lockout active for ${Math.ceil(Q.remainingLockSeconds / 60)} minutes due to repeated failed attempts.`);
      } else {
        Si(Q.attemptsLeft);
        p(`Invalid Security PIN. ${Q.attemptsLeft} attempt(s) remaining before security lockout.`);
      }
    },
    Ve = () => {
      c(false);
      setAdminSessionState(false);
      u('');
      Ge('Admin session terminated.');
    },
    Zl = (N, Q) => {
      const me = N === 'diamond' ? 'UGD-D' : 'UGD-G',
        Ee = Q.slice(0, 2).toUpperCase(),
        ht = Math.floor(100 + Math.random() * 900);
      return `${me}-${Ee}-${ht}`;
    },
    Ar = () => {
      ye(null);
      De('');
      const N = Zl('gold', 'Necklaces');
      Y(N);
      se('Necklaces');
      ve('Royal Gold');
      At('gold');
      B('THE HERITAGE EDIT');
      ce('Yellow Gold');
      Te('22K');
      Be(145e3);
      ge(16e4);
      _n('18.50g');
      Lt('18.50g');
      Fe([SAMPLE_IMAGES[0].url]);
      Cs('');
      Fs(
        'Finely handcrafted in 22K yellow gold with exquisite detailing by Urooj master artisans. Hallmarked by BIS with authenticity certification.',
      );
      ae('Handcrafted 22K yellow gold fine jewellery piece.');
      $s(true);
      Ys(false);
      mn(false);
      _a(false);
      na(true);
      W(true);
    },
    Dr = (N) => {
      ye(N.id);
      De(N.name);
      Y(N.sku);
      se(N.category);
      ve(N.subCategory || '');
      At(N.type);
      B(N.collection || 'THE HERITAGE EDIT');
      ce(N.metal);
      Te(N.purity);
      Be(N.price);
      ge(N.originalPrice || 0);
      _n(N.approxWeight);
      Lt(N.netGoldWeight || N.approxWeight);
      Fe(N.images && N.images.length > 0 ? [...N.images] : [SAMPLE_IMAGES[0].url]);
      Cs('');
      Fs(N.description);
      ae(N.shortDescription || '');
      $s(!!N.isNewArrival);
      Ys(!!N.isBestseller);
      mn(!!N.isBridal);
      _a(!!N.isSignature);
      na(N.inStock);
      if (N.diamondDetails) {
        pn(N.diamondDetails.shape);
        J(N.diamondDetails.clarity);
        He(N.diamondDetails.color);
        Je(N.diamondDetails.carat);
        ra(N.diamondDetails.cut);
      }
      W(true);
    },
    Qs = async (N) => {
      const Q = N.target.files;
      if (!Q || Q.length === 0) {
        return;
      }
      const me = Q[0];
      Oc(true);
      Ge('⏳ Compressing & processing image for Supabase...');
      try {
        const Ee = await uploadProductImage(me, Se || Z || 'jewellery');
        if (Ee.url) {
          Fe((ht) => [...ht, Ee.url]);
          if (Ee.isCloudStorage) {
            Ge('☁️ Photo uploaded to Supabase Storage!');
          } else {
            Ge('📸 Photo optimized and attached!');
          }
        }
      } catch (Ee) {
        console.error('Image upload failed:', Ee);
        Ge('⚠️ Image processing error: ' + (Ee.message || 'Please retry'));
      } finally {
        Oc(false);
        N.target.value = '';
      }
    },
    ms = () => {
      if (Mt.trim()) {
        Fe((N) => [...N, Mt.trim()]);
        Cs('');
      }
    },
    Pc = (N) => {
      Fe((Q) => Q.filter((me, Ee) => Ee !== N));
    },
    wh = async (N) => {
      if ((N.preventDefault(), !Z.trim())) {
        alert('Please enter a product title.');
        return;
      }
      yi(true);
      const Q = We.length > 0 ? We : [SAMPLE_IMAGES[0].url],
        me = {
          id: oe || `custom-${Date.now()}`,
          name: Z.trim(),
          sku: Se.trim() || Zl(ze, fe),
          category: fe,
          subCategory: Ne.trim() || undefined,
          type: ze,
          collection: Kt.trim() || undefined,
          metal: $,
          purity: de,
          price: Number(Ae),
          originalPrice: ne > 0 ? Number(ne) : undefined,
          approxWeight: Dt.trim() || '10.00g',
          netGoldWeight: Os.trim() || Dt.trim() || '10.00g',
          images: Q,
          description: rs.trim() || 'Handcrafted fine jewellery by Urooj Gold & Diamonds.',
          shortDescription: Ks.trim() || undefined,
          occasion: ['Wedding', 'Festive', 'Bridal'],
          gender: 'Women',
          isNewArrival: tt,
          isBestseller: Ms,
          isBridal: us || ze === 'bridal',
          isSignature: hs,
          inStock: Rn,
          deliveryInfo: 'Insured complimentary doorstep delivery with BIS certificate.',
          careInstructions: 'Store in airtight velvet case. Clean with microfiber cloth.',
        };
      if (ze === 'diamond' || ze === 'solitaire') {
        me.diamondDetails = {
          shape: aa,
          clarity: fs,
          color: ke,
          carat: Number(ft),
          cut: mt,
        };
      }
      let Ee;
      if (
        (oe
          ? ((Ee = T.map((ht) => (ht.id === oe ? me : ht))), Ge(`✨ Saving "${me.name}" to Supabase...`))
          : ((Ee = [me, ...T]), Ge(`✨ Publishing "${me.name}" to Supabase...`)),
        R(Ee),
        saveProducts(Ee),
        isSupabaseConfigured())
      ) {
        try {
          if (await saveProductToCloud(me)) {
            Ge(`☁️ "${me.name}" live on Supabase & website!`);
          }
        } catch (ht) {
          console.warn('Cloud sync background notice:', ht);
        }
      }
      if (onProductsUpdated) {
        onProductsUpdated(Ee);
      }
      yi(false);
      W(false);
    },
    Ai = (N) => {
      const Q = T.map((me) =>
        me.id === N
          ? {
              ...me,
              inStock: !me.inStock,
            }
          : me,
      );
      R(Q);
      saveProducts(Q);
      if (onProductsUpdated) {
        onProductsUpdated(Q);
      }
      Ge('Stock availability toggled.');
    },
    eo = (N, Q) => {
      if (window.confirm(`Delete "${Q}" from the live store catalogue?`)) {
        const me = T.filter((Ee) => Ee.id !== N);
        R(me);
        saveProducts(me);
        if (onProductsUpdated) {
          onProductsUpdated(me);
        }
        Ge(`"${Q}" removed.`);
      }
    },
    Uc = (N) => {
      const me = [
        {
          ...N,
          id: `copy-${Date.now()}`,
          name: `${N.name} (Copy)`,
          sku: `${N.sku}-CP`,
          isNewArrival: true,
        },
        ...T,
      ];
      R(me);
      saveProducts(me);
      if (onProductsUpdated) {
        onProductsUpdated(me);
      }
      Ge(`"${N.name}" duplicated.`);
    },
    Et = (N, Q) => {
      zt((me) => {
        const Ee = Number(me[N]) || 0,
          ht = Math.max(0, Ee + Q);
        return {
          ...me,
          [N]: ht,
        };
      });
    },
    to = (N) => {
      N.preventDefault();
      saveRates(nt);
      Ge('Gold, Silver & Platinum rates updated across entire website!');
    },
    Lc = (N) => {
      N.preventDefault();
      saveAnnouncement(at);
      Ge('Namaz timings & Islamic dates published to welcome screen!');
    },
    so = (N) => {
      N.preventDefault();
      saveOffers(ot);
      Ge('Announcement ribbon & offers updated on website!');
    },
    [ps, zc] = useState({
      score: 0,
      label: 'Very Weak',
      isValid: false,
      feedback: [],
    }),
    Hc = (N) => {
      Yt(N);
      Ma('idle');
      zc(pinStrength(N));
    },
    Pa = async (N) => {
      N.preventDefault();
      const Q = pinStrength(Ke);
      if (!Q.isValid) {
        Ma('error');
        Fn(Q.feedback[0] || 'PIN must be at least 8 characters with letters, numbers, and symbols.');
        return;
      }
      if (Ke !== On) {
        Ma('error');
        Fn('New PIN and Confirm PIN do not match.');
        return;
      }
      if (await changeAdminPin(Ke)) {
        Ma('success');
        Fn('Master Security PIN updated and cryptographically hashed with SHA-256.');
        Yt('');
        Xl('');
        Ge('🔒 Master Admin PIN upgraded and synced to Cloud Database!');
      } else {
        Ma('error');
        Fn('Failed to update PIN. Please try again.');
      }
    },
    jh = async (N) => {
      N.preventDefault();
      Wl(true);
      try {
        const Q = saveSupabaseCredentials(vi, wi);
        if (!Q.success) {
          Ge(`⚠️ ${Q.error || 'Invalid credentials'}`);
          return;
        }
        Ge('☁️ Credentials saved! Testing Supabase connection...');
        const me = await testSupabaseConnection();
        if (
          ($l({
            ...me,
            checkedAt: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          }),
          me.connected)
        ) {
          Ge(`⚡ Supabase Live! Latency: ${me.latencyMs}ms. Syncing products...`);
          const Ee = await pushAllToCloud();
          if (Ee.success) {
            Ge(`🎉 Connected & Pushed ${Ee.count} products with images to Supabase!`);
          }
        } else {
          Ge(`⚠️ Supabase: ${me.error}`);
        }
      } finally {
        Wl(false);
      }
    },
    Gc = () => {
      if (window.confirm('Clear custom Supabase credentials from this browser?')) {
        clearSupabaseCredentials();
        const N = getSupabaseConfig();
        Yl(N.url);
        ji(N.anonKey);
        $l(null);
        Ge('Custom Supabase credentials cleared.');
      }
    },
    Di = () => {
      navigator.clipboard.writeText(`-- ==============================================================================
-- UROOJ GOLD & DIAMONDS COMPLETE SUPABASE DATABASE SCHEMA
-- Run this in your Supabase Project -> SQL Editor (New Query -> Run)
-- ==============================================================================

-- 1. STORE CATALOG PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT,
  category TEXT NOT NULL,
  sub_category TEXT,
  type TEXT NOT NULL,
  collection TEXT,
  metal TEXT NOT NULL,
  purity TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  approx_weight TEXT,
  net_gold_weight TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  short_description TEXT,
  stone_details TEXT,
  diamond_details JSONB,
  occasion JSONB DEFAULT '[]'::jsonb,
  gender TEXT DEFAULT 'Women',
  is_new_arrival BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  is_bridal BOOLEAN DEFAULT false,
  is_signature BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  dimensions TEXT,
  delivery_info TEXT,
  care_instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. STORE SETTINGS (Rates, Offers, Namaz, Newsletters)
CREATE TABLE IF NOT EXISTS public.store_settings (
  id TEXT PRIMARY KEY,
  gold_rates JSONB,
  offers_config JSONB,
  welcome_announcement JSONB,
  newsletter_list JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. APPOINTMENTS (Customer Site Booking & Admin Viewable)
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_date TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  interest TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'Confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.appointments ALTER COLUMN user_id DROP NOT NULL;

-- 4. CUSTOMER INQUIRIES & BESPOKE REQUESTS
CREATE TABLE IF NOT EXISTS public.customer_inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT,
  interest TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'website_contact',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY POLICIES
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Products policies
DROP POLICY IF EXISTS "Public Read Products" ON public.products;
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow All Insert/Update Products" ON public.products;
CREATE POLICY "Allow All Insert/Update Products" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- Store settings policies
DROP POLICY IF EXISTS "Public Read Store Settings" ON public.store_settings;
CREATE POLICY "Public Read Store Settings" ON public.store_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow All Upsert Store Settings" ON public.store_settings;
CREATE POLICY "Allow All Upsert Store Settings" ON public.store_settings FOR ALL USING (true) WITH CHECK (true);

-- Appointments policies (Customer Website & Admin)
DROP POLICY IF EXISTS "Public Read Appointments" ON public.appointments;
CREATE POLICY "Public Read Appointments" ON public.appointments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert Appointments" ON public.appointments;
CREATE POLICY "Public Insert Appointments" ON public.appointments FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public Update Appointments" ON public.appointments;
CREATE POLICY "Public Update Appointments" ON public.appointments FOR UPDATE USING (true);

-- Customer inquiries policies
DROP POLICY IF EXISTS "Public Read Inquiries" ON public.customer_inquiries;
CREATE POLICY "Public Read Inquiries" ON public.customer_inquiries FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert Inquiries" ON public.customer_inquiries;
CREATE POLICY "Public Insert Inquiries" ON public.customer_inquiries FOR INSERT WITH CHECK (true);

-- Newsletter subscribers policies
DROP POLICY IF EXISTS "Public Read Newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Public Read Newsletter" ON public.newsletter_subscribers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Insert Newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Public Insert Newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- 6. Storage bucket for jewelry photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Access Product Images" ON storage.objects;
CREATE POLICY "Public Access Product Images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
DROP POLICY IF EXISTS "Allow Uploads Product Images" ON storage.objects;
CREATE POLICY "Allow Uploads Product Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
DROP POLICY IF EXISTS "Allow Updates Product Images" ON storage.objects;
CREATE POLICY "Allow Updates Product Images" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images');
`);
      Ge('📋 Copied full SQL Schema to clipboard! Paste into Supabase SQL Editor.');
    },
    no = async () => {
      Fa(true);
      try {
        const N = await testSupabaseConnection();
        $l({
          ...N,
          checkedAt: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        });
        if (N.connected) {
          Ge(`⚡ Supabase Connected! Latency: ${N.latencyMs}ms (${N.productCount ?? 0} products in cloud)`);
        } else {
          Ge(`⚠️ Cloud Check: ${N.error || 'Connection failed'}`);
        }
      } finally {
        Fa(false);
      }
    },
    Nh = async () => {
      Cr(true);
      try {
        const N = await pushAllToCloud();
        if (N.success) {
          Ge(`🚀 Successfully pushed ${N.count} products with photos to Supabase Cloud!`);
        } else {
          Ge(`⚠️ Push failed: ${N.error}`);
        }
      } finally {
        Cr(false);
      }
    },
    Eh = async () => {
      Bn(true);
      try {
        if (await syncFromCloud()) {
          R(getProducts());
          zt(getRates());
          is(getAnnouncement());
          $t(getOffers());
          if (onProductsUpdated) {
            onProductsUpdated(getProducts());
          }
          Ge('📥 Refreshed and loaded latest data from Supabase Cloud!');
        } else {
          Ge('⚠️ Could not sync from cloud. Check Supabase connection.');
        }
      } finally {
        Bn(false);
      }
    },
    Tr = async () => {
      O(true);
      try {
        const N = await fetchAppointmentsFromCloud(),
          Q = JSON.parse(localStorage.getItem('urooj_appointments') || '[]'),
          me = new Map();
        for (const en of N) en.id && me.set(en.id, en);
        for (const en of Q) {
          const _r = en.id || `${en.phone}_${en.preferredDate}`;
          if (!me.has(_r)) {
            me.set(_r, en);
          }
        }
        v(Array.from(me.values()));
        const Ee = JSON.parse(localStorage.getItem('urooj_enquiries') || '[]');
        C(Ee);
        const ht = await fetchCloudStoreSettings(),
          ro = ht?.newsletter_list || [],
          kr = JSON.parse(localStorage.getItem('urooj_newsletter_subscribers') || '[]'),
          In = Array.from(new Set([...ro, ...kr]));
        S(In);
      } catch (N) {
        console.warn('Error fetching customer inquiries:', N);
      } finally {
        O(false);
      }
    };
  useEffect(() => {
    if (x === 'inquiries' && l) {
      Tr();
    }
  }, [x, l]);
  const Zs = () => {
    if (
      window.confirm(
        'Reset catalog, daily rates, and namaz timings to factory initial defaults? This will restore original items.',
      )
    ) {
      resetStoreToDefaults();
      R(getProducts());
      zt(getRates());
      is(getAnnouncement());
      $t(getOffers());
      if (onProductsUpdated) {
        onProductsUpdated(getProducts());
      }
      Ge('Store catalog and rates reset to factory defaults.');
    }
  };
  if (!isOpen) {
    return null;
  }
  const Ua = T.filter((N) =>
      N.name.toLowerCase().includes(P.toLowerCase()) ||
      N.sku.toLowerCase().includes(P.toLowerCase()) ||
      N.category.toLowerCase().includes(P.toLowerCase())
        ? H === 'all'
          ? true
          : H === 'gold'
            ? N.type === 'gold'
            : H === 'diamond'
              ? N.type === 'diamond' || N.type === 'solitaire'
              : H === 'bridal'
                ? N.isBridal
                : true
        : false,
    ),
    ao = [
      {
        id: 'products',
        label: 'Products',
        sub: `${T.length} live items`,
        icon: LayersIcon,
      },
      {
        id: 'rates',
        label: 'Live Rates',
        sub: '22K, 24K, 18K, Pt',
        icon: DollarSignIcon,
      },
      {
        id: 'inquiries',
        label: 'Enquiries & Bookings',
        sub: 'Customer visits & leads',
        icon: CalendarIcon,
      },
      {
        id: 'offers',
        label: 'Offers Bar',
        sub: 'Promo ribbon & badges',
        icon: MegaphoneIcon,
      },
      {
        id: 'namaz',
        label: 'Namaz & Hijri',
        sub: 'Hyderabad prayer times',
        icon: ClockIcon,
      },
      {
        id: 'database',
        label: 'Cloud Database',
        sub: isSupabaseConfigured() ? 'Supabase Synced' : 'Offline / Standby',
        icon: DatabaseIcon,
      },
      {
        id: 'security',
        label: 'Security & PIN',
        sub: 'PIN & Reset',
        icon: ShieldCheckIcon,
      },
    ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-3 overflow-hidden">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="relative w-full h-full sm:h-auto sm:max-w-6xl sm:max-h-[92vh] bg-[#FAF7F2] sm:rounded-2xl border-0 sm:border border-[#C6A15B] shadow-2xl overflow-hidden z-10 flex flex-col">
        {ls && (
          <div className="absolute top-3 left-3 right-3 sm:left-auto sm:right-4 z-50 bg-[#183C40] text-[#DFCA8F] px-4 py-2.5 rounded-xl border border-[#C6A15B] shadow-2xl flex items-center gap-2 text-xs font-medium animate-in slide-in-from-top duration-200">
            <CircleCheckIcon className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="flex-1">{ls}</span>
          </div>
        )}
        <div className="bg-[#183C40] text-[#F7F3EA] px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-[#C6A15B]/40 shrink-0 select-none">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img
              src={CONFIG.logoUrl}
              alt="Urooj Official Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover border border-[#C6A15B]/70 shrink-0 shadow-md ring-1 ring-[#DFCA8F]/40"
              onError={(N) => {
                const Q = N.currentTarget;
                if (Q.src !== CONFIG.logoUrlRemote) {
                  Q.src = CONFIG.logoUrlRemote;
                }
              }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-sm sm:text-lg font-serif tracking-wider uppercase text-[#DFCA8F] truncate">Showroom Admin</h2>
                <span className="bg-[#DFCA8F]/20 text-[#DFCA8F] text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded border border-[#DFCA8F]/30 uppercase tracking-widest font-semibold shrink-0">
                  LIVE
                </span>
                {isSupabaseConfigured() ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-500/50 text-[9px] sm:text-[10px] font-medium shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Cloud Synced</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-500/50 text-[9px] sm:text-[10px] font-medium shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Local Cache</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] sm:text-xs text-[#EDE5D7]/75 font-light truncate hidden xs:block sm:block">
                Urooj Gold & Diamonds Showroom Controls
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {l && (
              <button
                onClick={Ve}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#EDE5D7] text-[11px] sm:text-xs transition-colors border border-white/20 min-h-[36px]"
                title="Lock Session"
              >
                <KeyRoundIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#EDE5D7] flex items-center justify-center transition-colors border border-white/20 min-h-[36px] min-w-[36px]"
              aria-label="Close"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        {l ? (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-60 bg-[#183C40] text-[#F7F3EA] border-b md:border-b-0 md:border-r border-[#C6A15B]/30 flex md:flex-col shrink-0 overflow-x-auto no-scrollbar p-1.5 sm:p-3 gap-1 z-20">
              {ao.map((N) => {
                const Q = N.icon,
                  me = x === N.id;
                return (
                  <button
                    onClick={() => {
                      b(N.id);
                      W(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all whitespace-nowrap text-left min-h-[40px] shrink-0 ${me ? 'bg-[#30565B] text-[#DFCA8F] border border-[#C6A15B] shadow-sm font-semibold' : 'text-[#EDE5D7]/80 hover:bg-white/5 hover:text-white border border-transparent'}`}
                    key={N.id}
                  >
                    <Q className={`w-4 h-4 shrink-0 ${me ? 'text-[#DFCA8F]' : 'text-[#C6A15B]'}`} />
                    <div className="flex-1">
                      <div className="leading-tight">{N.label}</div>
                      <div className="text-[10px] text-[#EDE5D7]/60 hidden md:block font-normal mt-0.5">{N.sub}</div>
                    </div>
                  </button>
                );
              })}
              <div className="hidden md:block mt-auto pt-3 border-t border-[#C6A15B]/20">
                <div className="bg-[#0e2528] p-2.5 rounded-lg border border-[#C6A15B]/30 text-[10px] text-[#EDE5D7]/80 space-y-1">
                  <div className="text-[#DFCA8F] font-semibold flex items-center gap-1">
                    <SparklesIcon className="w-3 h-3" />
                    <span>Real-Time Sync</span>
                  </div>
                  <div>Changes are instantly published to customers visiting the website.</div>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#FAF7F2] pb-24 sm:pb-6">
              {x === 'products' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col xs:flex-row sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-stone-200">
                    <div>
                      <h3 className="text-base sm:text-xl font-serif text-[#183C40] tracking-wide">
                        Catalogue ({T.length}
                        {' Items)'}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-stone-500">
                        Upload items directly, adjust prices, or toggle in-stock status.
                      </p>
                    </div>
                    <button
                      onClick={Ar}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#183C40] hover:bg-[#30565B] active:bg-[#0e2528] text-[#DFCA8F] font-semibold text-xs tracking-wider uppercase border border-[#C6A15B] shadow-md transition-all cursor-pointer min-h-[42px]"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>+ Add Product</span>
                    </button>
                  </div>
                  <div className="space-y-2 bg-white p-2.5 sm:p-3 rounded-xl border border-stone-200 shadow-sm">
                    <div className="relative w-full">
                      <SearchIcon className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search product, SKU, or category..."
                        value={P}
                        onChange={(N) => V(N.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#183C40] bg-stone-50/50"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                      {['all', 'gold', 'diamond', 'bridal'].map((N) => (
                        <button
                          onClick={() => G(N)}
                          className={`px-3 py-1.5 rounded-lg uppercase tracking-wider text-[10px] sm:text-[11px] font-semibold transition-colors shrink-0 ${H === N ? 'bg-[#183C40] text-[#DFCA8F] border border-[#C6A15B]/50' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                          key={N}
                        >
                          {N}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="block md:hidden space-y-3">
                    {Ua.length === 0 ? (
                      <div className="bg-white p-8 rounded-xl border border-stone-200 text-center text-stone-400 text-xs">
                        No products match your search.
                      </div>
                    ) : (
                      Ua.map((N) => {
                        const Q =
                          N.originalPrice && N.originalPrice > N.price
                            ? Math.round(((N.originalPrice - N.price) / N.originalPrice) * 100)
                            : 0;
                        return (
                          <div
                            className="bg-white rounded-xl border border-stone-200 p-3 shadow-sm flex flex-col gap-2.5 transition-all"
                            key={N.id}
                          >
                            <div className="flex gap-3">
                              <img
                                src={N.images[0] || SAMPLE_IMAGES[0].url}
                                alt={N.name}
                                className="w-16 h-16 rounded-lg object-cover border border-stone-200 bg-stone-100 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1">
                                  <h4 className="font-semibold text-stone-900 text-xs truncate">{N.name}</h4>
                                  <span className="font-mono text-[9px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded shrink-0">
                                    {N.sku}
                                  </span>
                                </div>
                                <div className="text-[11px] text-stone-600 mt-0.5 flex items-center gap-1.5 flex-wrap">
                                  <span>
                                    {N.purity} {N.metal}
                                  </span>
                                  <span>•</span>
                                  <span>{N.category}</span>
                                  {N.approxWeight && (
                                    <>
                                      <span>•</span>
                                      <span className="font-mono">{N.approxWeight}</span>
                                    </>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="font-bold text-stone-900 font-mono text-sm">{formatINR(N.price)}</span>
                                  {Q > 0 && N.originalPrice && (
                                    <div className="flex items-center gap-1 text-[10px]">
                                      <span className="line-through text-stone-400 font-mono">{formatINR(N.originalPrice)}</span>
                                      <span className="text-rose-600 font-bold bg-rose-50 px-1 rounded">-{Q}%</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-stone-100 gap-2">
                              <button
                                onClick={() => Ai(N.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors min-h-[30px] flex items-center gap-1 ${N.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${N.inStock ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                                <span>{N.inStock ? 'In Stock' : 'Sold Out'}</span>
                              </button>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => Dr(N)}
                                  className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 active:bg-stone-300 min-h-[36px] min-w-[36px] flex items-center justify-center"
                                  title="Edit"
                                >
                                  <PenIcon className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => Uc(N)}
                                  className="p-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 active:bg-stone-300 min-h-[36px] min-w-[36px] flex items-center justify-center"
                                  title="Duplicate"
                                >
                                  <CopyIcon className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => eo(N.id, N.name)}
                                  className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 active:bg-rose-200 min-h-[36px] min-w-[36px] flex items-center justify-center"
                                  title="Delete"
                                >
                                  <Trash2Icon className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="hidden md:block bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-stone-700">
                        <thead className="bg-[#183C40] text-[#DFCA8F] uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Item</th>
                            <th className="py-3 px-3">SKU / Category</th>
                            <th className="py-3 px-3">Metal / Purity</th>
                            <th className="py-3 px-3">Price & Discount</th>
                            <th className="py-3 px-3">Weight</th>
                            <th className="py-3 px-3 text-center">Stock</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                          {Ua.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-stone-400 text-xs">
                                No products match your search criteria.
                              </td>
                            </tr>
                          ) : (
                            Ua.map((N) => {
                              const Q =
                                N.originalPrice && N.originalPrice > N.price
                                  ? Math.round(((N.originalPrice - N.price) / N.originalPrice) * 100)
                                  : 0;
                              return (
                                <tr className="hover:bg-stone-50/80 transition-colors" key={N.id}>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={N.images[0] || SAMPLE_IMAGES[0].url}
                                        alt={N.name}
                                        className="w-11 h-11 object-cover rounded-lg border border-stone-200 shrink-0 bg-stone-100"
                                      />
                                      <div className="min-w-0">
                                        <div className="font-semibold text-stone-900 truncate max-w-xs">{N.name}</div>
                                        <div className="flex items-center gap-1 mt-0.5">
                                          {N.isNewArrival && (
                                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded font-medium">
                                              New
                                            </span>
                                          )}
                                          {N.isBestseller && (
                                            <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded font-medium">
                                              Bestseller
                                            </span>
                                          )}
                                          {N.isBridal && (
                                            <span className="text-[9px] bg-purple-100 text-purple-800 px-1 rounded font-medium">
                                              Bridal
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3 px-3">
                                    <div className="font-mono text-[10px] text-stone-500">{N.sku}</div>
                                    <div className="text-stone-800">{N.category}</div>
                                  </td>
                                  <td className="py-3 px-3">
                                    <div className="font-medium text-stone-900">
                                      {N.purity} {N.metal}
                                    </div>
                                    {N.diamondDetails && (
                                      <div className="text-[10px] text-blue-600 font-mono">
                                        {N.diamondDetails.carat}
                                        {'ct • '}
                                        {N.diamondDetails.clarity}
                                      </div>
                                    )}
                                  </td>
                                  <td className="py-3 px-3">
                                    <div className="font-semibold text-stone-900 font-mono">{formatINR(N.price)}</div>
                                    {Q > 0 && N.originalPrice && (
                                      <div className="flex items-center gap-1.5 text-[10px]">
                                        <span className="line-through text-stone-400 font-mono">
                                          {formatINR(N.originalPrice)}
                                        </span>
                                        <span className="text-rose-600 font-bold bg-rose-50 px-1 rounded">-{Q}%</span>
                                      </div>
                                    )}
                                  </td>
                                  <td className="py-3 px-3 text-stone-600 font-mono text-[11px]">{N.approxWeight}</td>
                                  <td className="py-3 px-3 text-center">
                                    <button
                                      onClick={() => Ai(N.id)}
                                      className={`px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors ${N.inStock ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-rose-100 text-rose-800 hover:bg-rose-200'}`}
                                    >
                                      {N.inStock ? 'In Stock' : 'Out of Stock'}
                                    </button>
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                      <button
                                        onClick={() => Dr(N)}
                                        title="Edit Product"
                                        className="p-1.5 rounded-md hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
                                      >
                                        <PenIcon className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => Uc(N)}
                                        title="Duplicate Item"
                                        className="p-1.5 rounded-md hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
                                      >
                                        <CopyIcon className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => eo(N.id, N.name)}
                                        title="Delete Product"
                                        className="p-1.5 rounded-md hover:bg-rose-50 text-rose-600 hover:text-rose-800 transition-colors"
                                      >
                                        <Trash2Icon className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              {x === 'rates' && (
                <div className="space-y-4 sm:space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-base sm:text-xl font-serif text-[#183C40] tracking-wide">
                      Live Daily Gold & Metal Rates
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-500">
                      Instantly updates the rate ticker, gold savings calculator, and welcome screen.
                    </p>
                  </div>
                  <form
                    onSubmit={to}
                    className="bg-white p-3.5 sm:p-6 rounded-xl border border-stone-200 shadow-sm space-y-4 sm:space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/80 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-stone-800">22K Gold Selling (₹/g)</label>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {'10g: '}
                            {formatINR(nt.karat22 * 10)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => Et('karat22', -10)}
                            className="px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-700 active:bg-stone-200 shrink-0 min-h-[36px]"
                          >
                            -10
                          </button>
                          <input
                            type="number"
                            inputMode="numeric"
                            value={nt.karat22}
                            onChange={(N) =>
                              zt({
                                ...nt,
                                karat22: Number(N.target.value),
                              })
                            }
                            required
                            className="w-full px-2 py-1.5 text-sm font-bold text-center rounded-lg border border-stone-300 font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                          />
                          <button
                            type="button"
                            onClick={() => Et('karat22', 10)}
                            className="px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-700 active:bg-stone-200 shrink-0 min-h-[36px]"
                          >
                            +10
                          </button>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-200/80 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-stone-800">22K Exchange / Buying (₹/g)</label>
                          <span className="text-[10px] text-emerald-700 font-medium">0% Deduction</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => Et('buying22K', -10)}
                            className="px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-700 active:bg-stone-200 shrink-0 min-h-[36px]"
                          >
                            -10
                          </button>
                          <input
                            type="number"
                            inputMode="numeric"
                            value={nt.buying22K || nt.karat22}
                            onChange={(N) =>
                              zt({
                                ...nt,
                                buying22K: Number(N.target.value),
                              })
                            }
                            required
                            className="w-full px-2 py-1.5 text-sm font-bold text-center rounded-lg border border-stone-300 font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                          />
                          <button
                            type="button"
                            onClick={() => Et('buying22K', 10)}
                            className="px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-700 active:bg-stone-200 shrink-0 min-h-[36px]"
                          >
                            +10
                          </button>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-stone-800">24K Bullion / 999 (₹/g)</label>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {'10g: '}
                            {formatINR(nt.karat24 * 10)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => Et('karat24', -10)}
                            className="px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-700 active:bg-stone-200 shrink-0 min-h-[36px]"
                          >
                            -10
                          </button>
                          <input
                            type="number"
                            inputMode="numeric"
                            value={nt.karat24}
                            onChange={(N) =>
                              zt({
                                ...nt,
                                karat24: Number(N.target.value),
                              })
                            }
                            required
                            className="w-full px-2 py-1.5 text-sm font-bold text-center rounded-lg border border-stone-300 font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                          />
                          <button
                            type="button"
                            onClick={() => Et('karat24', 10)}
                            className="px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-700 active:bg-stone-200 shrink-0 min-h-[36px]"
                          >
                            +10
                          </button>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-stone-800">18K Diamond Jewellery Gold (₹/g)</label>
                          <span className="text-[10px] text-stone-500 font-mono">
                            {'10g: '}
                            {formatINR(nt.karat18 * 10)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => Et('karat18', -10)}
                            className="px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-700 active:bg-stone-200 shrink-0 min-h-[36px]"
                          >
                            -10
                          </button>
                          <input
                            type="number"
                            inputMode="numeric"
                            value={nt.karat18}
                            onChange={(N) =>
                              zt({
                                ...nt,
                                karat18: Number(N.target.value),
                              })
                            }
                            required
                            className="w-full px-2 py-1.5 text-sm font-bold text-center rounded-lg border border-stone-300 font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                          />
                          <button
                            type="button"
                            onClick={() => Et('karat18', 10)}
                            className="px-2 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold text-stone-700 active:bg-stone-200 shrink-0 min-h-[36px]"
                          >
                            +10
                          </button>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                        <label className="text-xs font-bold text-stone-800 block">Platinum Selling Rate (₹/g)</label>
                        <input
                          type="number"
                          inputMode="numeric"
                          value={nt.platinumSelling || 7300}
                          onChange={(N) =>
                            zt({
                              ...nt,
                              platinumSelling: Number(N.target.value),
                            })
                          }
                          required
                          className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                        <label className="text-xs font-bold text-stone-800 block">Silver 999 Rate (₹/g)</label>
                        <input
                          type="number"
                          step="0.1"
                          inputMode="decimal"
                          value={nt.silver}
                          onChange={(N) =>
                            zt({
                              ...nt,
                              silver: Number(N.target.value),
                            })
                          }
                          required
                          className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          22K Change Today (+/- ₹ per gram)
                        </label>
                        <input
                          type="number"
                          inputMode="numeric"
                          value={nt.change22}
                          onChange={(N) =>
                            zt({
                              ...nt,
                              change22: Number(N.target.value),
                            })
                          }
                          required
                          className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Market Location</label>
                        <input
                          type="text"
                          value={nt.city}
                          onChange={(N) =>
                            zt({
                              ...nt,
                              city: N.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#183C40] hover:bg-[#30565B] active:bg-[#0e2528] text-[#DFCA8F] font-semibold text-xs tracking-wider uppercase border border-[#C6A15B] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                    >
                      <SaveIcon className="w-4 h-4" />
                      <span>Save & Broadcast Rates</span>
                    </button>
                  </form>
                </div>
              )}
              {x === 'namaz' && (
                <div className="space-y-4 sm:space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-base sm:text-xl font-serif text-[#183C40] tracking-wide">Namaz & Islamic Calendar</h3>
                    <p className="text-[11px] sm:text-xs text-stone-500">
                      Displayed on the regal Welcome Announcement Overlay for customers.
                    </p>
                  </div>
                  <form
                    onSubmit={Lc}
                    className="bg-white p-3.5 sm:p-6 rounded-xl border border-stone-200 shadow-sm space-y-4 sm:space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Gregorian Date</label>
                        <input
                          type="text"
                          value={at.leftCard.date}
                          onChange={(N) =>
                            is({
                              ...at,
                              leftCard: {
                                ...at.leftCard,
                                date: N.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Hijri Date</label>
                        <input
                          type="text"
                          value={at.leftCard.hijriDate}
                          onChange={(N) =>
                            is({
                              ...at,
                              leftCard: {
                                ...at.leftCard,
                                hijriDate: N.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Day of Week</label>
                        <input
                          type="text"
                          value={at.leftCard.day}
                          onChange={(N) =>
                            is({
                              ...at,
                              leftCard: {
                                ...at.leftCard,
                                day: N.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                        />
                      </div>
                    </div>
                    <div className="pt-2">
                      <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                        Five Daily Prayers (Start & End Times)
                      </h4>
                      <div className="space-y-2">
                        {at.leftCard.prayers.map((N, Q) => (
                          <div
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200 gap-2"
                            key={N.name}
                          >
                            <div className="flex items-center justify-between sm:w-28">
                              <span className="font-semibold text-xs text-stone-900">{N.name}</span>
                              <span className="text-[11px] text-stone-500 font-arabic">{N.arabicName}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-stone-500 uppercase font-mono">Start:</span>
                                <input
                                  type="text"
                                  value={N.start}
                                  onChange={(me) => {
                                    const Ee = [...at.leftCard.prayers];
                                    Ee[Q] = {
                                      ...N,
                                      start: me.target.value,
                                    };
                                    is({
                                      ...at,
                                      leftCard: {
                                        ...at.leftCard,
                                        prayers: Ee,
                                      },
                                    });
                                  }}
                                  className="w-full px-2 py-1.5 text-xs rounded border border-stone-300 font-mono text-center bg-white"
                                />
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-stone-500 uppercase font-mono">End:</span>
                                <input
                                  type="text"
                                  value={N.end}
                                  onChange={(me) => {
                                    const Ee = [...at.leftCard.prayers];
                                    Ee[Q] = {
                                      ...N,
                                      end: me.target.value,
                                    };
                                    is({
                                      ...at,
                                      leftCard: {
                                        ...at.leftCard,
                                        prayers: Ee,
                                      },
                                    });
                                  }}
                                  className="w-full px-2 py-1.5 text-xs rounded border border-stone-300 font-mono text-center bg-white"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-stone-200">
                      <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/80">
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">Saher Time (Morning)</label>
                        <input
                          type="text"
                          value={at.leftCard.fastingTimings?.saher || '4:41'}
                          onChange={(N) => {
                            return is({
                              ...at,
                              leftCard: {
                                ...at.leftCard,
                                fastingTimings: {
                                  saher: N.target.value,
                                  iftar: at.leftCard.fastingTimings?.iftar || '6:26',
                                },
                              },
                            });
                          }}
                          className="w-full px-2 py-1.5 text-xs rounded border border-stone-300 font-mono text-center bg-white"
                        />
                      </div>
                      <div className="p-2.5 rounded-lg bg-purple-50/50 border border-purple-200/80">
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">Iftar Time (Evening)</label>
                        <input
                          type="text"
                          value={at.leftCard.fastingTimings?.iftar || '6:26'}
                          onChange={(N) => {
                            return is({
                              ...at,
                              leftCard: {
                                ...at.leftCard,
                                fastingTimings: {
                                  saher: at.leftCard.fastingTimings?.saher || '4:41',
                                  iftar: N.target.value,
                                },
                              },
                            });
                          }}
                          className="w-full px-2 py-1.5 text-xs rounded border border-stone-300 font-mono text-center bg-white"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#183C40] hover:bg-[#30565B] active:bg-[#0e2528] text-[#DFCA8F] font-semibold text-xs tracking-wider uppercase border border-[#C6A15B] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                    >
                      <SaveIcon className="w-4 h-4" />
                      <span>Save Islamic Calendar & Prayers</span>
                    </button>
                  </form>
                </div>
              )}
              {x === 'offers' && (
                <div className="space-y-4 sm:space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-base sm:text-xl font-serif text-[#183C40] tracking-wide">Offers & Header Ribbon</h3>
                    <p className="text-[11px] sm:text-xs text-stone-500">
                      Manage the top promotional bar and discount badges shown across the showroom site.
                    </p>
                  </div>
                  <form
                    onSubmit={so}
                    className="bg-white p-3.5 sm:p-6 rounded-xl border border-stone-200 shadow-sm space-y-4 sm:space-y-5"
                  >
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                      <div>
                        <div className="font-semibold text-xs text-stone-900">Active Promotional Ribbon</div>
                        <div className="text-[11px] text-stone-600">Shows banner across top website header.</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer min-h-[36px]">
                        <input
                          type="checkbox"
                          checked={ot.activeBanner}
                          onChange={(N) =>
                            $t({
                              ...ot,
                              activeBanner: N.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#183C40]" />
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Header Ribbon Text</label>
                      <textarea
                        rows={2}
                        value={ot.bannerText}
                        onChange={(N) =>
                          $t({
                            ...ot,
                            bannerText: N.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                        placeholder="e.g. 0% Deduction on Old Gold Exchange \u2022 100% BIS 916 Pure Gold..."
                      />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2">
                        Promotional Schemes & Badges
                      </h4>
                      <div className="space-y-2.5">
                        {ot.schemes.map((N, Q) => (
                          <div className="p-3 rounded-xl border border-stone-200 bg-stone-50 space-y-2" key={N.id}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <input
                                type="text"
                                value={N.title}
                                onChange={(me) => {
                                  const Ee = [...ot.schemes];
                                  Ee[Q] = {
                                    ...N,
                                    title: me.target.value,
                                  };
                                  $t({
                                    ...ot,
                                    schemes: Ee,
                                  });
                                }}
                                className="font-semibold text-xs text-stone-900 bg-white px-2.5 py-1.5 rounded border border-stone-300 flex-1"
                                placeholder="Offer Title"
                              />
                              <input
                                type="text"
                                value={N.badge}
                                onChange={(me) => {
                                  const Ee = [...ot.schemes];
                                  Ee[Q] = {
                                    ...N,
                                    badge: me.target.value,
                                  };
                                  $t({
                                    ...ot,
                                    schemes: Ee,
                                  });
                                }}
                                className="text-[10px] font-bold uppercase tracking-wider bg-[#DFCA8F]/30 text-[#183C40] px-2 py-1.5 rounded border border-[#C6A15B]/40 text-center sm:w-28"
                                placeholder="BADGE TEXT"
                              />
                            </div>
                            <input
                              type="text"
                              value={N.description}
                              onChange={(me) => {
                                const Ee = [...ot.schemes];
                                Ee[Q] = {
                                  ...N,
                                  description: me.target.value,
                                };
                                $t({
                                  ...ot,
                                  schemes: Ee,
                                });
                              }}
                              className="text-[11px] text-stone-600 bg-white px-2.5 py-1.5 rounded border border-stone-200 w-full"
                              placeholder="Offer details description..."
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#183C40] hover:bg-[#30565B] active:bg-[#0e2528] text-[#DFCA8F] font-semibold text-xs tracking-wider uppercase border border-[#C6A15B] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                    >
                      <SaveIcon className="w-4 h-4" />
                      <span>Save Offers</span>
                    </button>
                  </form>
                </div>
              )}
              {x === 'database' && (
                <div className="space-y-4 sm:space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-base sm:text-xl font-serif text-[#183C40] tracking-wide flex items-center gap-2">
                      <DatabaseIcon className="w-5 h-5 text-[#C6A15B]" />
                      <span>Supabase Cloud Database & Storage Manager</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-500">
                      Connect your Supabase project to persist jewellery items, high-res photos, gold rates, and customer orders
                      directly to your cloud database.
                    </p>
                  </div>
                  <div
                    className={`p-4 sm:p-5 rounded-xl border ${isSupabaseConfigured() ? 'bg-emerald-50/70 border-emerald-300' : 'bg-amber-50/70 border-amber-300'} shadow-sm space-y-3`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${isSupabaseConfigured() ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'} flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0`}
                        >
                          {isSupabaseConfigured() ? <WifiIcon className="w-5 h-5" /> : <WifiOffIcon className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-stone-900">
                              {isSupabaseConfigured()
                                ? 'Supabase Cloud Database Connected'
                                : 'Supabase Not Connected (Local Storage Mode)'}
                            </h4>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isSupabaseConfigured() ? 'bg-emerald-200/90 text-emerald-900' : 'bg-amber-200/90 text-amber-900'}`}
                            >
                              {isSupabaseConfigured() ? 'ONLINE' : 'STANDBY'}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-0.5">
                            {isSupabaseConfigured()
                              ? `Active URL: ${getSupabaseConfig().url} (${getSupabaseConfig().source === 'custom' ? 'Browser Configured' : 'Environment Variable'})`
                              : 'Enter your Supabase Project URL and anon key below to connect your real database.'}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={no}
                        disabled={Oa}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-50 active:bg-stone-100 disabled:opacity-50 shadow-sm transition-all shrink-0 cursor-pointer min-h-[38px]"
                      >
                        <ActivityIcon className={`w-3.5 h-3.5 text-[#183C40] ${Oa ? 'animate-spin' : ''}`} />
                        <span>{Oa ? 'Testing...' : 'Test Connection'}</span>
                      </button>
                    </div>
                    {Ss && (
                      <div className="pt-2.5 border-t border-stone-200/70 space-y-1.5 text-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-stone-700">
                            Connection Result:{' '}
                            <strong className={Ss.connected ? 'text-emerald-700' : 'text-rose-700'}>
                              {Ss.connected
                                ? `Success (Ping: ${Ss.latencyMs}ms | Cloud Products: ${Ss.productCount ?? 0})`
                                : Ss.error}
                            </strong>
                          </span>
                          <span className="text-[11px] text-stone-400">
                            {'Checked at '}
                            {Ss.checkedAt}
                          </span>
                        </div>
                        {!Ss.connected && (
                          <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-center justify-between gap-2">
                            <span>
                              {'If tables or buckets are missing, run '}
                              <code>supabase/schema.sql</code>
                              {' in your Supabase SQL Editor.'}
                            </span>
                            <button
                              type="button"
                              onClick={Di}
                              className="px-2.5 py-1 bg-rose-700 hover:bg-rose-800 text-white rounded font-medium text-[10px] shrink-0 uppercase tracking-wider"
                            >
                              Copy SQL Script
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <form onSubmit={jh} className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                      <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                        <KeyRoundIcon className="w-4 h-4 text-[#183C40]" />
                        <span>Supabase Project Credentials</span>
                      </h4>
                      <button
                        type="button"
                        onClick={Di}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#183C40] hover:text-[#C6A15B] transition-colors"
                      >
                        <CopyIcon className="w-3.5 h-3.5" />
                        <span>Copy SQL Schema</span>
                      </button>
                    </div>
                    <p className="text-xs text-stone-600">
                      {'Copy from your '}
                      <strong>Supabase Project → Project Settings → API</strong>
                      {' (Project URL and '}
                      <code>anon</code> <code>public</code>
                      {' API key).'}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Supabase Project URL</label>
                        <input
                          type="url"
                          value={vi}
                          onChange={(N) => Yl(N.target.value)}
                          placeholder="https://yourprojectid.supabase.co"
                          required
                          className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">Supabase Anon Public API Key</label>
                        <div className="relative">
                          <input
                            type={Ni ? 'text' : 'password'}
                            value={wi}
                            onChange={(N) => ji(N.target.value)}
                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                            required
                            className="w-full px-3 py-2 pr-10 text-xs rounded-lg border border-stone-300 font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                          />
                          <button
                            type="button"
                            onClick={() => gn(!Ni)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                          >
                            {Ni ? <EyeOffIcon className="w-3.5 h-3.5" /> : <EyeIcon className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={Sr || !vi || !wi}
                        className="py-2.5 px-5 rounded-xl bg-[#183C40] hover:bg-[#30565B] active:bg-[#0e2528] disabled:opacity-50 text-[#DFCA8F] font-semibold text-xs tracking-wider uppercase border border-[#C6A15B] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[40px]"
                      >
                        {Sr ? (
                          <RefreshCwIcon className="w-4 h-4 animate-spin text-[#DFCA8F]" />
                        ) : (
                          <SaveIcon className="w-4 h-4" />
                        )}
                        <span>{Sr ? 'Connecting & Syncing...' : 'Save & Connect Cloud Now'}</span>
                      </button>
                      {getSupabaseConfig().source === 'custom' && (
                        <button
                          type="button"
                          onClick={Gc}
                          className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs tracking-wider uppercase border border-stone-300 transition-all min-h-[40px]"
                        >
                          Clear Custom Credentials
                        </button>
                      )}
                    </div>
                  </form>
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-sm space-y-4">
                    <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                      <HardDriveIcon className="w-4 h-4 text-[#183C40]" />
                      <span>Manual Cloud Synchronization Station</span>
                    </h4>
                    <p className="text-xs text-stone-600">
                      {'Push all '}
                      {T.length}
                      {' products with photos and current live rates to your Supabase tables:'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <button
                        type="button"
                        onClick={Nh}
                        disabled={Ra}
                        className="py-3 px-4 rounded-xl bg-[#183C40] hover:bg-[#30565B] active:bg-[#0e2528] disabled:opacity-50 text-[#DFCA8F] font-semibold text-xs tracking-wider uppercase border border-[#C6A15B] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                      >
                        <UploadIcon className={`w-4 h-4 ${Ra ? 'animate-bounce' : ''}`} />
                        <span>{Ra ? 'Pushing All Data...' : 'Force Push All to Supabase'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={Eh}
                        disabled={Ba}
                        className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 active:bg-stone-300 disabled:opacity-50 text-stone-800 font-semibold text-xs tracking-wider uppercase border border-stone-300 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                      >
                        <RefreshCwIcon className={`w-4 h-4 text-stone-600 ${Ba ? 'animate-spin' : ''}`} />
                        <span>{Ba ? 'Pulling from Cloud...' : 'Pull & Refresh from Supabase'}</span>
                      </button>
                    </div>
                  </div>
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                        <LayersIcon className="w-4 h-4 text-[#183C40]" />
                        <span>Database Tables & Sync Scope</span>
                      </h4>
                      <button type="button" onClick={Di} className="text-[11px] font-semibold text-[#183C40] hover:underline">
                        Copy SQL Schema
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        {
                          table: 'products',
                          desc: 'Jewellery catalog, weights, prices, diamond specs & photo URLs',
                          count: `${T.length} items`,
                        },
                        {
                          table: 'store_settings',
                          desc: 'Live 22K/24K rates, offers bar, namaz timings & hashed PIN',
                          count: 'Live synchronized',
                        },
                        {
                          table: 'appointments',
                          desc: 'VIP in-store & virtual jewelry consultation bookings',
                          count: `${g.length} bookings`,
                        },
                        {
                          table: 'customer_inquiries',
                          desc: 'Website contact inquiries & bespoke custom jewelry requests',
                          count: `${w.length} leads`,
                        },
                        {
                          table: 'newsletter_subscribers',
                          desc: 'Opt-in customer emails for private previews & gold alerts',
                          count: `${E.length} emails`,
                        },
                        {
                          table: 'storage.product-images',
                          desc: 'Public storage bucket for fast CDN photos',
                          count: 'Cloud Bucket',
                        },
                      ].map((N, Q) => (
                        <div
                          className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between gap-1"
                          key={Q}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-[#183C40] text-xs">{N.table}</span>
                            <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-stone-600 border border-stone-200 font-medium">
                              {N.count}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-500">{N.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {x === 'inquiries' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                    <div>
                      <h3 className="text-base sm:text-xl font-serif text-[#183C40] tracking-wide flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-[#C6A15B]" />
                        <span>Customer Enquiries & Appointments</span>
                      </h3>
                      <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">
                        Real-time customer bookings from website forms and Supabase cloud tables.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={Tr}
                        disabled={k}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 active:bg-stone-100 disabled:opacity-50 shadow-sm transition-all"
                      >
                        <RefreshCwIcon className={`w-3.5 h-3.5 text-[#183C40] ${k ? 'animate-spin' : ''}`} />
                        <span>{k ? 'Refreshing...' : 'Refresh from Cloud'}</span>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#183C40]/10 text-[#183C40] flex items-center justify-center shrink-0">
                        <CalendarIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xl font-bold font-serif text-[#183C40]">{g.length}</div>
                        <div className="text-[11px] text-stone-500 font-medium">Boutique Appointments</div>
                      </div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#C6A15B]/15 text-[#8C6D28] flex items-center justify-center shrink-0">
                        <MessageSquareIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xl font-bold font-serif text-[#183C40]">{w.length}</div>
                        <div className="text-[11px] text-stone-500 font-medium">Contact & Custom Leads</div>
                      </div>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <MailIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xl font-bold font-serif text-[#183C40]">{E.length}</div>
                        <div className="text-[11px] text-stone-500 font-medium">Newsletter Subscribers</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-[#183C40]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                          Boutique Appointments ({g.length})
                        </h4>
                      </div>
                      <span className="text-[10px] text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {'Supabase Table: '}
                        <code>appointments</code>
                      </span>
                    </div>
                    {g.length === 0 ? (
                      <div className="p-8 text-center">
                        <CalendarIcon className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                        <p className="text-xs font-medium text-stone-600">No appointments recorded yet.</p>
                        <p className="text-[11px] text-stone-400 mt-1">
                          When a customer books a visit using the "Book Appointment" button on the website, it will appear here
                          and in Supabase.
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-stone-100 max-h-[400px] overflow-y-auto">
                        {g.map((N, Q) => (
                          <div className="p-4 hover:bg-stone-50/80 transition-colors space-y-2" key={N.id || Q}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-stone-900">{N.name}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider bg-[#183C40]/10 text-[#183C40]">
                                  {N.status || 'Confirmed'}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-stone-500">
                                <span className="flex items-center gap-1">
                                  <ClockIcon className="w-3 h-3 text-[#C6A15B]" />
                                  <span>
                                    {N.preferredDate}
                                    {' at '}
                                    {N.preferredTime}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-600">
                              <div className="flex items-center gap-1.5">
                                <PhoneIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                                <a href={`tel:${N.phone}`} className="hover:text-[#183C40] hover:underline font-mono">
                                  {N.phone}
                                </a>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MailIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                                <span className="truncate">{N.email || '—'}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <TagIcon className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                                <span className="truncate font-medium text-stone-800">{N.interest}</span>
                              </div>
                            </div>
                            {N.notes && (
                              <div className="text-[11px] text-stone-500 bg-stone-50 p-2 rounded border border-stone-200/60 italic">
                                "{N.notes}"
                              </div>
                            )}
                            <div className="flex items-center gap-2 pt-1">
                              <a
                                href={`https://wa.me/91${N.phone.replace(/[^0-9]/g, '')}?text=Dear%20${encodeURIComponent(N.name)},%20greetings%20from%20Urooj%20Gold%20%26%20Diamonds!%20We%20look%20forward%20to%20welcoming%20you%20for%20your%20appointment%20on%20${encodeURIComponent(N.preferredDate)}%20at%20${encodeURIComponent(N.preferredTime)}.`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-[11px] font-semibold transition-colors"
                              >
                                <ExternalLinkIcon className="w-3 h-3" />
                                <span>WhatsApp Customer</span>
                              </a>
                              <a
                                href={`tel:${N.phone}`}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold transition-colors"
                              >
                                <PhoneIcon className="w-3 h-3" />
                                <span>Call</span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
                      <div className="flex items-center gap-2">
                        <MessageSquareIcon className="w-4 h-4 text-[#183C40]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                          Website Contact & Bespoke Requests ({w.length})
                        </h4>
                      </div>
                      <span className="text-[10px] text-stone-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                        {'Supabase Table: '}
                        <code>customer_inquiries</code>
                      </span>
                    </div>
                    {w.length === 0 ? (
                      <div className="p-6 text-center text-xs text-stone-500">
                        No contact enquiries recorded yet. Messages sent via the Contact form or Custom Jewellery modal will be
                        listed here.
                      </div>
                    ) : (
                      <div className="divide-y divide-stone-100 max-h-[350px] overflow-y-auto">
                        {w.map((N, Q) => (
                          <div className="p-4 hover:bg-stone-50/80 transition-colors space-y-1.5" key={N.id || Q}>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-xs text-stone-900">{N.name}</span>
                              <span className="text-[10px] text-stone-400">{N.timestamp || N.created_at || 'Recent'}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
                              <span className="font-mono">{N.phone}</span>
                              {N.email && <span>{N.email}</span>}
                              {N.subject && <span className="font-medium text-[#183C40]">[{N.subject}]</span>}
                              {N.interest && <span className="font-medium text-[#C6A15B]">{N.interest}</span>}
                            </div>
                            <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded border border-stone-200/60">
                              {N.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MailIcon className="w-4 h-4 text-[#183C40]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800">
                          Newsletter Subscribers ({E.length})
                        </h4>
                      </div>
                      {E.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(E.join(', '));
                            Ge('📋 Copied all subscriber emails to clipboard!');
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#183C40] hover:text-[#C6A15B]"
                        >
                          <CopyIcon className="w-3.5 h-3.5" />
                          <span>Copy Email List</span>
                        </button>
                      )}
                    </div>
                    {E.length === 0 ? (
                      <p className="text-xs text-stone-500">
                        No newsletter subscribers yet. Submissions from the website footer will be saved here and in Supabase.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-stone-50 rounded-lg border border-stone-200">
                        {E.map((N, Q) => (
                          <span
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-white text-stone-700 border border-stone-200 shadow-xs"
                            key={Q}
                          >
                            {N}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {x === 'security' && (
                <div className="space-y-4 sm:space-y-6 max-w-xl">
                  <div>
                    <h3 className="text-base sm:text-xl font-serif text-[#183C40] tracking-wide flex items-center gap-2">
                      <ShieldCheckIcon className="w-5 h-5 text-[#C6A15B]" />
                      <span>Security & Store Management</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-500">
                      Manage cryptographic access credentials, brute-force security defenses, and factory catalog recovery.
                    </p>
                  </div>
                  <form onSubmit={Pa} className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                      <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                        <KeyRoundIcon className="w-4 h-4 text-[#183C40]" />
                        <span>Upgrade Showroom Master PIN</span>
                      </h4>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                        SHA-256 Salted Hashing
                      </span>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        New Master PIN (Min. 8 characters)
                      </label>
                      <div className="relative">
                        <input
                          type={Ws ? 'text' : 'password'}
                          value={Ke}
                          onChange={(N) => Hc(N.target.value)}
                          placeholder="e.g. Urooj@Hyd#2026!"
                          required
                          className="w-full px-3 py-2.5 pr-10 text-sm rounded-lg border border-stone-300 font-mono tracking-wider bg-white focus:outline-none focus:ring-2 focus:ring-[#183C40]"
                        />
                        <button
                          type="button"
                          onClick={() => Ia(!Ws)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
                          title={Ws ? 'Hide PIN' : 'Show PIN'}
                        >
                          {Ws ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                        </button>
                      </div>
                      {Ke && (
                        <div className="mt-2 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-stone-500">Security Strength:</span>
                            <span
                              className={`font-bold ${ps.score >= 4 ? 'text-emerald-700' : ps.score >= 3 ? 'text-blue-700' : ps.score >= 2 ? 'text-amber-700' : 'text-rose-700'}`}
                            >
                              {ps.label}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden flex gap-0.5">
                            {[1, 2, 3, 4].map((N) => (
                              <div
                                className={`h-full flex-1 rounded-full transition-all ${N <= ps.score ? (ps.score >= 4 ? 'bg-emerald-600' : ps.score >= 3 ? 'bg-blue-600' : ps.score >= 2 ? 'bg-amber-500' : 'bg-rose-500') : 'bg-stone-200'}`}
                                key={N}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-[11px] space-y-1 text-stone-600">
                      <div className="font-semibold text-stone-800 text-[11px] mb-1">PIN Complexity Checklist:</div>
                      <div
                        className={`flex items-center gap-1.5 ${Ke.length >= 8 ? 'text-emerald-700 font-medium' : 'text-stone-500'}`}
                      >
                        {Ke.length >= 8 ? (
                          <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-stone-300" />
                        )}
                        <span>At least 8 characters in length</span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 ${/[A-Z]/.test(Ke) ? 'text-emerald-700 font-medium' : 'text-stone-500'}`}
                      >
                        {/[A-Z]/.test(Ke) ? (
                          <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-stone-300" />
                        )}
                        <span>At least one uppercase letter (A-Z)</span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 ${/[0-9]/.test(Ke) ? 'text-emerald-700 font-medium' : 'text-stone-500'}`}
                      >
                        {/[0-9]/.test(Ke) ? (
                          <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-stone-300" />
                        )}
                        <span>At least one number (0-9)</span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 ${/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(Ke) ? 'text-emerald-700 font-medium' : 'text-stone-500'}`}
                      >
                        {/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(Ke) ? (
                          <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-stone-300" />
                        )}
                        <span>At least one special symbol (!@#$%^&*)</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Confirm New PIN</label>
                      <input
                        type="password"
                        value={On}
                        onChange={(N) => {
                          Xl(N.target.value);
                          Ma('idle');
                        }}
                        placeholder="Re-enter new PIN"
                        required
                        className="w-full px-3 py-2.5 text-sm rounded-lg border border-stone-300 font-mono tracking-wider bg-white focus:outline-none focus:ring-2 focus:ring-[#183C40]"
                      />
                    </div>
                    {Fc === 'success' && (
                      <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-center gap-2">
                        <CircleCheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{Jl || 'Master Security PIN updated and hashed!'}</span>
                      </div>
                    )}
                    {Fc === 'error' && (
                      <div className="text-xs text-rose-800 bg-rose-50 border border-rose-200 p-3 rounded-lg flex items-center gap-2">
                        <CircleAlertIcon className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{Jl || 'Please check the PIN requirements above.'}</span>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={!Ke || !On}
                      className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-[#183C40] hover:bg-[#30565B] active:bg-[#0e2528] disabled:opacity-50 disabled:cursor-not-allowed text-[#DFCA8F] text-xs font-semibold uppercase tracking-wider border border-[#C6A15B] transition-colors min-h-[42px] shadow-sm flex items-center justify-center gap-2"
                    >
                      <SaveIcon className="w-4 h-4" />
                      <span>Apply & Sync New Master PIN</span>
                    </button>
                  </form>
                  <div className="bg-rose-50/80 p-4 sm:p-6 rounded-xl border border-rose-200 space-y-2.5">
                    <h4 className="text-xs font-semibold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                      <RefreshCwIcon className="w-4 h-4 text-rose-700" />
                      <span>Factory Catalog Reset</span>
                    </h4>
                    <p className="text-[11px] sm:text-xs text-rose-800 leading-relaxed">
                      Restores all products, prices, and prayer times back to default factory showroom data.
                    </p>
                    <button
                      type="button"
                      onClick={Zs}
                      className="py-2.5 px-4 rounded-xl bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white text-xs font-semibold tracking-wider transition-colors shadow-sm cursor-pointer min-h-[42px]"
                    >
                      Reset Store to Factory Defaults
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col items-center justify-center text-center max-w-sm sm:max-w-md mx-auto my-auto w-full">
            <div className="relative mb-5">
              <img
                src={CONFIG.logoUrl}
                alt="Urooj Official Logo"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#C6A15B] shadow-xl p-0.5 bg-[#09231E] ring-2 ring-[#DFCA8F]/50"
                onError={(N) => {
                  const Q = N.currentTarget;
                  if (Q.src !== CONFIG.logoUrlRemote) {
                    Q.src = CONFIG.logoUrlRemote;
                  }
                }}
              />
              <div
                className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full ${Xs ? 'bg-rose-900 border-rose-500 text-rose-300' : 'bg-[#183C40] border-[#C6A15B] text-[#DFCA8F]'} border flex items-center justify-center shadow-md`}
              >
                {Xs ? <ShieldAlertIcon className="w-3.5 h-3.5 text-rose-300" /> : <ShieldCheckIcon className="w-3.5 h-3.5" />}
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-[#183C40] mb-2 tracking-wide">Showroom Master Access</h3>
            <p className="text-xs text-stone-600 mb-6 leading-relaxed">
              Enter the master security PIN to access the management portal.
            </p>
            {Xs ? (
              <div className="w-full mb-5 bg-rose-50 border-2 border-rose-300 text-rose-900 p-4 rounded-xl text-xs space-y-2 text-left shadow-sm">
                <div className="font-bold flex items-center gap-1.5 text-rose-800">
                  <ShieldAlertIcon className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>Security Lockout Active</span>
                </div>
                <p className="text-[11px] text-rose-700">Too many incorrect attempts. Authentication is temporarily suspended.</p>
                <div className="font-mono text-center font-bold text-base py-1.5 bg-white/90 rounded border border-rose-200 text-rose-900">
                  {Math.floor(gt / 60)}:{(gt % 60).toString().padStart(2, '0')}
                  {' min remaining'}
                </div>
              </div>
            ) : null}
            <form onSubmit={vh} className="w-full space-y-4">
              <div className="relative">
                <input
                  type={ia ? 'text' : 'password'}
                  placeholder="Enter Security PIN"
                  value={d}
                  autoFocus
                  onChange={(N) => {
                    u(N.target.value);
                    p('');
                  }}
                  className="w-full text-center text-lg sm:text-xl tracking-wider font-mono py-3 px-10 rounded-xl border-2 bg-white border-[#C6A15B]/60 text-stone-900 focus:ring-2 focus:ring-[#183C40] focus:outline-none shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => Ei(!ia)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1.5 rounded transition-colors"
                  title={ia ? 'Hide PIN' : 'Show PIN'}
                >
                  {ia ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
              </div>
              {m && (
                <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5">
                  <CircleAlertIcon className="w-4 h-4 shrink-0" />
                  <span>{m}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={Mn}
                className="w-full py-3 px-6 rounded-xl bg-[#183C40] hover:bg-[#30565B] active:bg-[#0e2528] disabled:opacity-50 disabled:cursor-not-allowed text-[#DFCA8F] font-semibold text-xs sm:text-sm tracking-wider uppercase border border-[#C6A15B] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
              >
                {Mn ? (
                  <span>Verifying Cryptographic Hash...</span>
                ) : (
                  <>
                    <span>Unlock Control Panel</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </>
                )}
              </button>
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1.5 text-stone-500 font-medium">
                  <LockIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Authorized Personnel Terminal</span>
                </span>
                {!Xs && (
                  <span className="text-[10px] text-stone-400 font-mono">
                    {Mc}
                    {' attempts left'}
                  </span>
                )}
              </div>
            </form>
          </div>
        )}
        {l && x === 'products' && !X && (
          <div className="block sm:hidden fixed bottom-4 right-4 z-40">
            <button
              onClick={Ar}
              className="w-14 h-14 rounded-full bg-[#183C40] text-[#DFCA8F] border-2 border-[#C6A15B] shadow-2xl flex items-center justify-center active:scale-95 transition-all"
              aria-label="Add Product"
            >
              <PlusIcon className="w-6 h-6" />
            </button>
          </div>
        )}
        {X && (
          <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-sm">
            <div className="relative w-full h-full sm:h-auto sm:max-w-3xl sm:max-h-[92vh] bg-white sm:rounded-2xl border-0 sm:border border-[#C6A15B] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95">
              <div className="bg-[#183C40] text-[#F7F3EA] px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-[#C6A15B]/40 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => W(false)}
                    className="sm:hidden p-1 text-[#EDE5D7] mr-1 min-h-[36px] min-w-[36px] flex items-center justify-center"
                    aria-label="Back"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="text-sm sm:text-lg font-serif text-[#DFCA8F] tracking-wide truncate">
                      {oe ? 'Edit Product' : 'Upload New Jewellery'}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-[#EDE5D7]/75 truncate hidden xs:block">
                      Published directly to live customer store.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => W(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#EDE5D7] flex items-center justify-center min-h-[36px] min-w-[36px]"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <form onSubmit={wh} className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1 text-xs pb-24 sm:pb-6">
                <div className="space-y-3 bg-stone-50/60 p-3 sm:p-4 rounded-xl border border-stone-200">
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1.5 flex items-center gap-1.5">
                    <TagIcon className="w-3.5 h-3.5 text-[#183C40]" />
                    <span>1. Title, Category & Classification</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-stone-700 mb-1">Product Title *</label>
                      <input
                        type="text"
                        value={Z}
                        onChange={(N) => De(N.target.value)}
                        placeholder="e.g. Urooj Nizam Heritage Polki Choker"
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Jewellery Category</label>
                      <select
                        value={fe}
                        onChange={(N) => se(N.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                      >
                        {CATEGORY_OPTIONS.map((N) => (
                          <option value={N} key={N}>
                            {N}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Classification</label>
                      <select
                        value={ze}
                        onChange={(N) => At(N.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                      >
                        <option value="gold">Gold Jewellery</option>
                        <option value="diamond">Diamond Jewellery</option>
                        <option value="bridal">Bridal Jewellery</option>
                        <option value="heritage">Heritage Jewellery</option>
                        <option value="solitaire">Solitaire</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">SKU Code</label>
                      <input
                        type="text"
                        value={Se}
                        onChange={(N) => Y(N.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Collection</label>
                      <input
                        type="text"
                        value={Kt}
                        onChange={(N) => B(N.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#183C40]"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-3 bg-stone-50/60 p-3 sm:p-4 rounded-xl border border-stone-200">
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1.5 flex items-center gap-1.5">
                    <SparklesIcon className="w-3.5 h-3.5 text-[#183C40]" />
                    <span>2. Metal, Purity & Weights</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Metal</label>
                      <select
                        value={$}
                        onChange={(N) => ce(N.target.value)}
                        className="w-full px-2.5 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                      >
                        {METAL_OPTIONS.map((N) => (
                          <option value={N} key={N}>
                            {N}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Purity</label>
                      <select
                        value={de}
                        onChange={(N) => Te(N.target.value)}
                        className="w-full px-2.5 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                      >
                        {PURITY_OPTIONS.map((N) => (
                          <option value={N} key={N}>
                            {N}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Gross Weight</label>
                      <input
                        type="text"
                        value={Dt}
                        onChange={(N) => _n(N.target.value)}
                        placeholder="e.g. 18.50g"
                        className="w-full px-2.5 py-2 text-xs rounded-lg border border-stone-300 font-mono bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Net Gold</label>
                      <input
                        type="text"
                        value={Os}
                        onChange={(N) => Lt(N.target.value)}
                        placeholder="e.g. 18.50g"
                        className="w-full px-2.5 py-2 text-xs rounded-lg border border-stone-300 font-mono bg-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-3 bg-stone-50/60 p-3 sm:p-4 rounded-xl border border-stone-200">
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1.5 flex items-center gap-1.5">
                    <DollarSignIcon className="w-3.5 h-3.5 text-[#183C40]" />
                    <span>3. Price & Discount Tag</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Selling Price (₹) *</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono">₹</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          value={Ae}
                          onChange={(N) => Be(Number(N.target.value))}
                          required
                          className="w-full pl-7 pr-3 py-2 text-xs rounded-lg border border-stone-300 font-mono font-bold bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">
                        Original MRP (₹) (For Strikethrough Discount)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono">₹</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          value={ne}
                          onChange={(N) => ge(Number(N.target.value))}
                          placeholder="Optional"
                          className="w-full pl-7 pr-3 py-2 text-xs rounded-lg border border-stone-300 font-mono bg-white"
                        />
                      </div>
                      {ne > Ae && (
                        <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-block">
                          {'Auto Discount: '}
                          {Math.round(((ne - Ae) / ne) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {(ze === 'diamond' || ze === 'solitaire') && (
                  <div className="space-y-3 bg-blue-50/60 p-3 sm:p-4 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <GemIcon className="w-3.5 h-3.5 text-blue-600" />
                      <span>Diamond Specifications</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div>
                        <label className="block text-stone-700 mb-1 font-medium">Shape</label>
                        <select
                          value={aa}
                          onChange={(N) => pn(N.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                        >
                          {DIAMOND_SHAPES.map((N) => (
                            <option value={N} key={N}>
                              {N}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-stone-700 mb-1 font-medium">Carat</label>
                        <input
                          type="number"
                          step="0.01"
                          inputMode="decimal"
                          value={ft}
                          onChange={(N) => Je(Number(N.target.value))}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-700 mb-1 font-medium">Clarity</label>
                        <select
                          value={fs}
                          onChange={(N) => J(N.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                        >
                          {DIAMOND_CLARITIES.map((N) => (
                            <option value={N} key={N}>
                              {N}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-stone-700 mb-1 font-medium">Color</label>
                        <select
                          value={ke}
                          onChange={(N) => He(N.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                        >
                          {DIAMOND_COLORS.map((N) => (
                            <option value={N} key={N}>
                              {N}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-3 bg-stone-50/60 p-3 sm:p-4 rounded-xl border border-stone-200">
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-[#183C40]" />
                      <span>4. Product Photos & Supabase Cloud Storage</span>
                    </div>
                    <span className="text-stone-500 font-normal">
                      {We.length}
                      {' images'}
                    </span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      disabled={xn}
                      onClick={() => {
                        return Ql.current?.click();
                      }}
                      className="p-3 rounded-xl bg-white border border-[#C6A15B] hover:bg-[#FAF7F2] active:bg-amber-100/50 flex flex-col items-center justify-center text-center transition-all shadow-sm min-h-[70px] disabled:opacity-50"
                    >
                      {xn ? (
                        <RefreshCwIcon className="w-5 h-5 text-[#183C40] mb-1 animate-spin" />
                      ) : (
                        <CameraIcon className="w-5 h-5 text-[#183C40] mb-1" />
                      )}
                      <span className="font-semibold text-stone-900 text-[11px]">{xn ? 'Uploading...' : 'Take Photo'}</span>
                      <span className="text-[9px] text-stone-500">Camera</span>
                      <input ref={Ql} type="file" accept="image/*" capture="environment" onChange={Qs} className="hidden" />
                    </button>
                    <button
                      type="button"
                      disabled={xn}
                      onClick={() => {
                        return Ic.current?.click();
                      }}
                      className="p-3 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 active:bg-stone-100 flex flex-col items-center justify-center text-center transition-all shadow-sm min-h-[70px] disabled:opacity-50"
                    >
                      {xn ? (
                        <RefreshCwIcon className="w-5 h-5 text-stone-600 mb-1 animate-spin" />
                      ) : (
                        <UploadIcon className="w-5 h-5 text-stone-600 mb-1" />
                      )}
                      <span className="font-semibold text-stone-900 text-[11px]">{xn ? 'Processing...' : 'Choose File'}</span>
                      <span className="text-[9px] text-stone-500">Gallery / PC</span>
                      <input ref={Ic} type="file" accept="image/*" onChange={Qs} className="hidden" />
                    </button>
                    <div className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-white border border-stone-200 flex flex-col justify-center">
                      <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider mb-1">Sample Presets</span>
                      <div className="flex gap-1 overflow-x-auto no-scrollbar pb-0.5">
                        {SAMPLE_IMAGES.slice(0, 4).map((N, Q) => (
                          <button
                            type="button"
                            onClick={() => Fe((me) => [...me, N.url])}
                            className="w-7 h-7 rounded object-cover border border-stone-200 overflow-hidden shrink-0 active:scale-95"
                            title={N.label}
                            key={Q}
                          >
                            <img src={N.url} alt={N.label} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Or paste image URL (https://...)"
                      value={Mt}
                      onChange={(N) => Cs(N.target.value)}
                      className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                    />
                    <button
                      type="button"
                      onClick={ms}
                      className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium text-xs shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                  {xn && (
                    <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 font-medium animate-pulse">
                      <RefreshCwIcon className="w-3.5 h-3.5 animate-spin text-amber-700" />
                      <span>Optimizing image and uploading to Supabase Storage...</span>
                    </div>
                  )}
                  {We.length > 0 && (
                    <div className="flex items-center gap-2 overflow-x-auto p-2 bg-stone-100 rounded-xl">
                      {We.map((N, Q) => {
                        const me = N.includes('supabase.co');
                        return (
                          <div
                            className="relative group shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-stone-300 bg-white"
                            key={Q}
                          >
                            <img src={N} alt={`Preview ${Q}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => Pc(Q)}
                              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow"
                            >
                              <XIcon className="w-3 h-3" />
                            </button>
                            {me && (
                              <span className="absolute top-1 left-1 bg-emerald-700/90 text-white text-[7px] font-bold px-1 rounded">
                                Cloud
                              </span>
                            )}
                            {Q === 0 && (
                              <span className="absolute bottom-0 inset-x-0 bg-[#183C40] text-[#DFCA8F] text-[8px] font-bold text-center py-0.5 uppercase">
                                Main
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="space-y-3 bg-stone-50/60 p-3 sm:p-4 rounded-xl border border-stone-200">
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1.5">
                    5. Craftsmanship & Description
                  </h4>
                  <div>
                    <textarea
                      rows={2}
                      value={rs}
                      onChange={(N) => Fs(N.target.value)}
                      placeholder="Craftsmanship details, artistry heritage, filigree work..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                </div>
                <div className="space-y-3 bg-stone-50/60 p-3 sm:p-4 rounded-xl border border-stone-200">
                  <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1.5">
                    6. Tags & Inventory Status
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${Rn ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold' : 'bg-white border-stone-200 text-stone-700'}`}
                    >
                      <input
                        type="checkbox"
                        checked={Rn}
                        onChange={(N) => na(N.target.checked)}
                        className="rounded text-[#183C40]"
                      />
                      <span>In Stock</span>
                    </label>
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${tt ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold' : 'bg-white border-stone-200 text-stone-700'}`}
                    >
                      <input
                        type="checkbox"
                        checked={tt}
                        onChange={(N) => $s(N.target.checked)}
                        className="rounded text-[#183C40]"
                      />
                      <span>New Arrival</span>
                    </label>
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${Ms ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold' : 'bg-white border-stone-200 text-stone-700'}`}
                    >
                      <input
                        type="checkbox"
                        checked={Ms}
                        onChange={(N) => Ys(N.target.checked)}
                        className="rounded text-[#183C40]"
                      />
                      <span>Bestseller</span>
                    </label>
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${us ? 'bg-purple-50 border-purple-300 text-purple-900 font-semibold' : 'bg-white border-stone-200 text-stone-700'}`}
                    >
                      <input
                        type="checkbox"
                        checked={us}
                        onChange={(N) => mn(N.target.checked)}
                        className="rounded text-[#183C40]"
                      />
                      <span>Bridal</span>
                    </label>
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${hs ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold' : 'bg-white border-stone-200 text-stone-700'}`}
                    >
                      <input
                        type="checkbox"
                        checked={hs}
                        onChange={(N) => _a(N.target.checked)}
                        className="rounded text-[#183C40]"
                      />
                      <span>Signature</span>
                    </label>
                  </div>
                </div>
                <div className="fixed sm:static bottom-0 inset-x-0 bg-white sm:bg-transparent p-3 sm:p-0 sm:pt-4 border-t sm:border-t-0 border-stone-200 flex items-center justify-end gap-2.5 z-50 shadow-lg sm:shadow-none">
                  <button
                    type="button"
                    onClick={() => W(false)}
                    className="px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 font-medium transition-colors min-h-[42px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={bi || xn}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#183C40] hover:bg-[#30565B] active:bg-[#0e2528] text-[#DFCA8F] font-semibold text-xs tracking-wider uppercase border border-[#C6A15B] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[42px] disabled:opacity-60"
                  >
                    {bi ? <RefreshCwIcon className="w-4 h-4 animate-spin text-[#DFCA8F]" /> : <SaveIcon className="w-4 h-4" />}
                    <span>{bi ? 'Saving to Supabase...' : oe ? 'Save Changes' : 'Publish to Store & Cloud'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
