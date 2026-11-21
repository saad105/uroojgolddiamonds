// Minimal URL routing for the single-page site (History API, no router library).
//   /                    -> home
//   /gold  /diamonds  /collections  /about
//   /policies/<section>  -> Policies page scrolled to <section> (e.g. /policies/privacy)
// Vercel serves index.html for every path (see vercel.json), so these URLs work on refresh too.

export const PAGE_PATHS = {
  home: '/',
  gold: '/gold',
  diamonds: '/diamonds',
  collections: '/collections',
  about: '/about',
  policies: '/policies',
};

export const PAGE_TITLES = {
  home: 'Urooj Gold & Diamonds | Premium Jewellery Showroom in Mehdipatnam, Hyderabad',
  gold: '22K Gold Jewellery | Urooj Gold & Diamonds',
  diamonds: 'Certified Diamond Jewellery | Urooj Gold & Diamonds',
  collections: 'Collections | Urooj Gold & Diamonds',
  about: 'About Us | Urooj Gold & Diamonds',
  policies: 'Terms & Policies | Urooj Gold & Diamonds',
};

export const DEFAULT_POLICY_SECTION = 'regulatory';

/** Reads the current URL -> { page, section } */
export function parseLocation(pathname = window.location.pathname) {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean).map((p) => p.toLowerCase());
  if (parts.length === 0) return { page: 'home' };
  const page = Object.keys(PAGE_PATHS).find((k) => PAGE_PATHS[k] === `/${parts[0]}`);
  if (!page) return { page: 'home' };
  if (page === 'policies') return { page, section: parts[1] || DEFAULT_POLICY_SECTION };
  return { page };
}

export function pathFor(page, section) {
  if (page === 'policies') return `${PAGE_PATHS.policies}/${section || DEFAULT_POLICY_SECTION}`;
  return PAGE_PATHS[page] || '/';
}

/** Adds a history entry (or replaces the current one) when the path actually changes. */
export function setPath(path, { replace = false } = {}) {
  if (window.location.pathname === path) return;
  window.history[replace ? 'replaceState' : 'pushState']({ path }, '', path);
}
