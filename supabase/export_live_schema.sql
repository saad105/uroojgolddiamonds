-- ==============================================================================
-- EXPORT THE EXACT LIVE SCHEMA
-- Read-only. Run in Supabase Dashboard → SQL Editor → New query → Run.
-- Returns one row per object, in the order needed to recreate the database:
--   1 tables (columns, defaults, keys, foreign keys)   2 indexes
--   3 row level security switches                      4 RLS policies (public + storage)
--   5 functions                                        6 triggers
--   7 views                                            8 storage buckets
--   9 realtime publication
-- Copy the "ddl" column (or use "Export → CSV") to get the full script.
-- ==============================================================================
WITH
cols AS (
  SELECT
    c.oid AS relid,
    c.relname::text AS relname,
    string_agg(
      format('  %I %s%s%s',
        a.attname,
        format_type(a.atttypid, a.atttypmod),
        CASE WHEN d.adbin IS NOT NULL THEN ' DEFAULT ' || pg_get_expr(d.adbin, d.adrelid) ELSE '' END,
        CASE WHEN a.attnotnull THEN ' NOT NULL' ELSE '' END),
      E',\n' ORDER BY a.attnum) AS col_defs
  FROM pg_class c
  JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum > 0 AND NOT a.attisdropped
  LEFT JOIN pg_attrdef d ON d.adrelid = c.oid AND d.adnum = a.attnum
  WHERE c.relnamespace = 'public'::regnamespace AND c.relkind IN ('r', 'p')
  GROUP BY c.oid, c.relname
),
cons AS (
  SELECT
    conrelid AS relid,
    string_agg(format('  CONSTRAINT %I %s', conname, pg_get_constraintdef(oid)), E',\n' ORDER BY contype DESC, conname) AS con_defs
  FROM pg_constraint
  WHERE connamespace = 'public'::regnamespace AND contype IN ('p', 'u', 'f', 'c')
  GROUP BY conrelid
)
SELECT * FROM (
  SELECT 1 AS step, cols.relname AS object,
         format(E'CREATE TABLE IF NOT EXISTS public.%I (\n%s%s\n);', cols.relname, cols.col_defs, COALESCE(E',\n' || cons.con_defs, '')) AS ddl
  FROM cols LEFT JOIN cons ON cons.relid = cols.relid

  UNION ALL
  SELECT 2, i.indexname::text, i.indexdef || ';'
  FROM pg_indexes i
  WHERE i.schemaname = 'public'
    AND NOT EXISTS (SELECT 1 FROM pg_constraint k WHERE k.conname = i.indexname AND k.connamespace = 'public'::regnamespace)

  UNION ALL
  SELECT 3, c.relname::text, format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', c.relname)
  FROM pg_class c
  WHERE c.relnamespace = 'public'::regnamespace AND c.relkind = 'r' AND c.relrowsecurity

  UNION ALL
  SELECT 4, (p.schemaname || '.' || p.tablename || ' · ' || p.policyname)::text,
         format('CREATE POLICY %I ON %I.%I AS %s FOR %s TO %s%s%s;',
           p.policyname, p.schemaname, p.tablename, p.permissive, p.cmd,
           array_to_string(p.roles, ', '),
           COALESCE(' USING (' || p.qual || ')', ''),
           COALESCE(' WITH CHECK (' || p.with_check || ')', ''))
  FROM pg_policies p
  WHERE p.schemaname IN ('public', 'storage')

  UNION ALL
  SELECT 5, f.proname::text, pg_get_functiondef(f.oid) || ';'
  FROM pg_proc f
  WHERE f.pronamespace = 'public'::regnamespace AND f.prokind IN ('f', 'p')

  UNION ALL
  SELECT 6, t.tgname::text, pg_get_triggerdef(t.oid) || ';'
  FROM pg_trigger t
  JOIN pg_class c ON c.oid = t.tgrelid
  WHERE NOT t.tgisinternal AND c.relnamespace = 'public'::regnamespace

  UNION ALL
  SELECT 7, v.viewname::text, format(E'CREATE OR REPLACE VIEW public.%I AS\n%s', v.viewname, v.definition)
  FROM pg_views v
  WHERE v.schemaname = 'public'

  UNION ALL
  SELECT 8, b.id::text, format('INSERT INTO storage.buckets (id, name, public) VALUES (%L, %L, %s) ON CONFLICT (id) DO NOTHING;', b.id, b.name, CASE WHEN b.public THEN 'true' ELSE 'false' END)
  FROM storage.buckets b

  UNION ALL
  SELECT 9, (pt.schemaname || '.' || pt.tablename)::text, format('ALTER PUBLICATION supabase_realtime ADD TABLE %I.%I;', pt.schemaname, pt.tablename)
  FROM pg_publication_tables pt
  WHERE pt.pubname = 'supabase_realtime'
) AS schema_export
ORDER BY step, object;
