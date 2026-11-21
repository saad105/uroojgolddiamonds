-- ==============================================================================
-- 02 · CUSTOMER ACCOUNTS, WISHLIST & BAG
-- The website code reads/writes these tables (Account modal, wishlist, bag sync for
-- signed-in customers), but the original "Copy SQL" script never created them.
-- Columns below match exactly what the code sends. Safe to re-run.
-- ==============================================================================

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
