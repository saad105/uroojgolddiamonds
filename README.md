# Urooj Gold & Diamonds — website clone

React 18 + Vite + Tailwind CSS v4 + framer-motion + Supabase (same stack as uroojgolddiamonds.com).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## How the "live gold rates" work

The original site does **not** call a third-party gold-price API. Rates are typed in by the
shop owner in the hidden admin panel and stored in Supabase (`store_settings.gold_rates`).
Every visitor's browser pulls them on load, re-polls every 20 seconds, and also listens to
Supabase Realtime, so a change in admin shows up on all open pages almost instantly.
This clone does exactly the same — see `src/lib/store.js` (`startLiveSync`, `saveRates`).

Rates feed: the top "HYD LIVE" bar, the welcome overlay rate card, the Gold Rate Calculator
and the price-breakup modal.

## Supabase

Credentials live in `.env` (gitignored; template in `.env.example`):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Without them the site runs fully offline on `localStorage` with the bundled defaults.
Admin → Cloud Database can also override the credentials per browser.
For a fresh project, run `supabase_schema.sql` in the Supabase SQL editor.

> ⚠️ With the current `.env`, this clone reads **and writes** the same database as the live
> site. Saving rates/products/offers in the clone's admin panel changes the live website.

## Admin panel

Open it with any of: type `kernal009` anywhere on the page · `Ctrl+Shift+K` / `Alt+K` ·
visit `/#kernal009` · tap the header logo or footer copyright 4× quickly.
The PIN is the same as the original site's (salted SHA-256, 5 attempts → 15-min lockout);
change it in Admin → Security.

Admin features: product catalogue CRUD (with image upload/compression), gold/platinum/silver
rates, offers & promo banner, welcome announcement (rates card, namaz timings), customer
appointments / enquiries / newsletter list, Supabase connection test, push/pull sync, reset.

## Project structure

```
src/
  App.jsx                 page switching, cart/wishlist state, modal wiring, admin shortcuts
  data/store.js           store config, 36 products, default rates/offers/announcement
  data/collections.js     curated collections      data/adminOptions.js  admin dropdowns
  lib/store.js            localStorage + cloud sync, live rates, admin PIN security
  lib/supabase.js         Supabase client, table mappers, uploads, connection test
  lib/AuthContext.jsx     customer sign-up/sign-in, profile, cloud wishlist & cart
  lib/format.js           ₹ formatting, WhatsApp links
  components/             Header, LiveRateBar, Footer, ProductCard, FilterPanel, WelcomeAnnouncement…
  pages/                  Home, Gold, Diamonds, Collections, About, Policies (all legal sections)
  modals/                 Quick view, Product detail, Cart, Wishlist, Account, Search, Appointment,
                          Custom design, Gold calculator, Size guide, Price breakup, Video call,
                          Savings plan
  admin/AdminPanel.jsx    showroom admin
```

## Notes

- The components were reconstructed from the original production bundle, so markup and
  Tailwind classes match it 1:1. Props, imports and the main state in `App`, `Header` and
  `Footer` have readable names; some deeper component-local state still has short names.
- The original's `/api/admin/*` server endpoints aren't reproduced (no backend here);
  PIN checks happen client-side exactly as the original's fallback path does.
- Security: the schema's "Allow All" write policies (copied from the original) let anyone with
  the public anon key edit products and rates. For production, restrict writes to an
  authenticated admin role or a server function.
