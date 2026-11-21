# Supabase database scripts

Everything the website uses in Supabase. There are **no database functions, RPCs, triggers
or edge functions**. The site only uses plain tables, one storage bucket and Realtime.

| Kind | Objects |
|---|---|
| Tables | `products`, `store_settings`, `appointments`, `customer_inquiries`, `newsletter_subscribers`, `profiles`, `wishlist_items`, `cart_items` |
| Storage bucket | `product-images` (public; admin photo uploads) |
| Realtime | `products`, `store_settings`, `appointments`, `customer_inquiries`, `newsletter_subscribers` |
| Auth | Email + password sign-up/sign-in for customer accounts |

Where the live gold rates are stored: `store_settings.gold_rates` (JSON) in the row with
`id = 'urooj_store_main'`. The offers banner (`offers_config`) and welcome overlay
(`welcome_announcement`) are in the same row.

## Scripts (run in order in Dashboard → SQL Editor)

| File | What it does |
|---|---|
| `01_original_schema.sql` | The original site's own setup script, word for word (Admin → Cloud Database → "Copy SQL"): 5 tables, RLS policies, `product-images` bucket |
| `02_accounts_wishlist_cart.sql` | `profiles`, `wishlist_items`, `cart_items`. The site's code uses them but the original script never created them. Each customer can only access their own rows |
| `03_realtime.sql` | Adds the 5 tables to Realtime so rate/product changes appear instantly on open pages |
| `export_live_schema.sql` | **Read-only.** Prints the exact definitions currently in your live database |

All scripts can be safely re-run. Each was tested on Postgres: run twice, then the export
output was used to rebuild the schema on an empty database.

## Getting exactly what's in the live database

Scripts 01–03 rebuild what the website needs. Anything someone added by hand in the dashboard
won't be in them. To capture the real live state:

**Option A: SQL Editor (no install).** Run `export_live_schema.sql`, then copy the `ddl`
column (or Export → CSV). You get tables, indexes, RLS policies, functions, triggers, views,
buckets and Realtime tables.

**Option B: Supabase CLI (complete dump, including grants).** Get the connection string from
Dashboard → Project Settings → Database, then:

```bash
npx supabase db dump --db-url "postgresql://postgres:[DB-PASSWORD]@db.rgijkisrdndurjrwzlcw.supabase.co:5432/postgres" -f supabase/live_schema.sql
```

Add `--data-only -f supabase/live_data.sql` for a data backup (products, rates, enquiries).

Dashboard → SQL Editor also keeps your saved queries and recent history, which shows what was
actually run by hand.

## Security note

The original policies (`01`) allow **anyone** holding the public key to insert/update/delete
products and store settings, and to read every appointment, enquiry and newsletter email.
The admin panel is protected only by a PIN checked in the browser. Before relying on this in
production, restrict writes on `products`/`store_settings` and reads on customer tables to an
authenticated admin role.
