-- ==============================================================================
-- UROOJ GOLD & DIAMONDS: COMPLETE SUPABASE DATABASE SCRIPT
-- Run once in Supabase Dashboard → SQL Editor → New query → Run.
-- Safe to re-run: every statement is "IF NOT EXISTS" / "DROP ... IF EXISTS" / "ON CONFLICT".
--
-- Creates everything the website uses:
--   Tables (8)   products, store_settings, appointments, customer_inquiries,
--                newsletter_subscribers, profiles, wishlist_items, cart_items
--   Security     row level security + policies on every table
--   Storage      public "product-images" bucket + upload policies
--   Realtime     live updates for products, store_settings, appointments,
--                customer_inquiries, newsletter_subscribers
-- There are no database functions, RPCs or edge functions. The site doesn't use any.
--
-- Live gold rates are stored in store_settings.gold_rates (row id 'urooj_store_main').
-- The website creates that row, and seeds the product catalogue, on first use.
-- ==============================================================================


-- ##############################################################################
-- PART A · ORIGINAL SITE SCHEMA (verbatim from the original Admin → "Copy SQL")
-- ##############################################################################
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



-- ##############################################################################
-- PART B · CUSTOMER ACCOUNTS, WISHLIST & BAG
-- Used by the site's Account / Wishlist / Bag features but missing from the
-- original script. Each customer can only read and change their own rows.
-- ##############################################################################
-- Customer profile (one row per Supabase Auth user)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  city TEXT DEFAULT 'Hyderabad',
  preferred_metal TEXT DEFAULT 'Gold 22K',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved / wishlisted products
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS wishlist_items_user_id_idx ON public.wishlist_items (user_id);

-- Shopping bag
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  quantity INT DEFAULT 1,
  selected_size TEXT,
  custom_engraving TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS cart_items_user_id_idx ON public.cart_items (user_id);

-- Row level security: each customer can only see and change their own rows
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Own profile" ON public.profiles;
CREATE POLICY "Own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Own wishlist" ON public.wishlist_items;
CREATE POLICY "Own wishlist" ON public.wishlist_items
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Own cart" ON public.cart_items;
CREATE POLICY "Own cart" ON public.cart_items
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);


-- ##############################################################################
-- PART C · REALTIME (instant rate / product updates on every open page)
-- ##############################################################################
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['products', 'store_settings', 'appointments', 'customer_inquiries', 'newsletter_subscribers']
  LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = t
    ) THEN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', t);
    END IF;
  END LOOP;
END $$;
