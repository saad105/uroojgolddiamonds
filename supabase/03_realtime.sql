-- ==============================================================================
-- 03 · REALTIME
-- The website subscribes to changes on these tables, which is what makes gold-rate
-- and product edits appear on every open page instantly (it also re-polls every 20 s
-- as a fallback). The admin panel listens to appointments, enquiries and newsletter
-- sign-ups. Safe to re-run: only adds tables that aren't in the publication yet.
-- ==============================================================================
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
