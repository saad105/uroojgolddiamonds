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

## Scripts (Dashboard → SQL Editor → New query → Run)

| File | What it does |
|---|---|
| `schema.sql` | **The complete script. Run this once.** Creates all 8 tables, RLS policies, the `product-images` bucket and Realtime. Safe to re-run |
| `export_live_schema.sql` | **Read-only.** Prints the exact definitions currently in your live database |

`schema.sql` has three parts:

- **A** · The original site's own setup script, word for word (Admin → Cloud Database → "Copy SQL"):
  `products`, `store_settings`, `appointments`, `customer_inquiries`, `newsletter_subscribers`,
  their policies and the photo bucket.
- **B** · `profiles`, `wishlist_items`, `cart_items`. The site's code uses them but the original
  script never created them. Each customer can only access their own rows.
- **C** · Realtime for the 5 tables the site listens to.

Tested on Postgres: runs cleanly twice in a row, and the export output rebuilds the same schema
on an empty database.

## Getting exactly what's in the live database

`schema.sql` builds what the website needs. Anything someone added by hand in the dashboard
won't be in it. To capture the real live state:

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
