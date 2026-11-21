import React, { useState, useMemo } from 'react';
import { SearchIcon, SlidersHorizontalIcon, SparklesIcon } from 'lucide-react';
import { DEFAULT_PRODUCTS } from '../data/store.js';
import FilterPanel from '../components/FilterPanel.jsx';
import ProductCard from '../components/ProductCard.jsx';

const GoldPage = ({
  onQuickView,
  onSelectProduct,
  onToggleWishlist,
  onOpenAppointment,
  wishlistIds,
  initialCategory,
  products,
}) => {
  const [m, p] = useState({
      category: initialCategory || 'all',
      priceRange: 'all',
      purity: 'all',
      diamondShape: 'all',
      clarity: 'all',
      metal: 'all',
      occasion: 'all',
      gender: 'all',
      sortBy: 'recommended',
      searchQuery: '',
    }),
    [x, b] = useState(false),
    g = products || DEFAULT_PRODUCTS,
    v = useMemo(
      () =>
        g.filter((E) => E.type === 'gold' || E.purity === '22K' || (E.metal && E.metal.includes('Gold') && E.type !== 'diamond')),
      [g],
    ),
    w = useMemo(
      () =>
        v
          .filter((E) => {
            if (
              (m.category !== 'all' && E.category !== m.category) ||
              (m.purity !== 'all' && E.purity !== m.purity) ||
              (m.occasion !== 'all' && E.occasion !== m.occasion) ||
              (m.gender !== 'all' && E.gender !== m.gender && E.gender !== 'Unisex')
            ) {
              return false;
            }
            if (m.searchQuery.trim() !== '') {
              const S = m.searchQuery.toLowerCase(),
                k = E.name.toLowerCase().includes(S),
                O = E.sku.toLowerCase().includes(S),
                T = E.category.toLowerCase().includes(S),
                R = E.description.toLowerCase().includes(S);
              if (!k && !O && !T && !R) {
                return false;
              }
            }
            return !(
              m.priceRange !== 'all' &&
              ((m.priceRange === 'under-50k' && E.price >= 5e4) ||
                (m.priceRange === '50k-100k' && (E.price < 5e4 || E.price > 1e5)) ||
                (m.priceRange === '100k-250k' && (E.price < 1e5 || E.price > 25e4)) ||
                (m.priceRange === '250k-500k' && (E.price < 25e4 || E.price > 5e5)) ||
                (m.priceRange === 'above-500k' && E.price <= 5e5))
            );
          })
          .sort((E, S) =>
            m.sortBy === 'price-low-high'
              ? E.price - S.price
              : m.sortBy === 'price-high-low'
                ? S.price - E.price
                : m.sortBy === 'newest'
                  ? (S.isNewArrival ? 1 : 0) - (E.isNewArrival ? 1 : 0)
                  : (S.isBestseller ? 1 : 0) - (E.isBestseller ? 1 : 0),
          ),
      [v, m],
    ),
    C = () => {
      p({
        category: 'all',
        priceRange: 'all',
        purity: 'all',
        diamondShape: 'all',
        clarity: 'all',
        metal: 'all',
        occasion: 'all',
        gender: 'all',
        sortBy: 'recommended',
        searchQuery: '',
      });
    };
  return (
    <div className="space-y-12">
      <section className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center justify-center overflow-hidden bg-[#071F1B] text-[#F7F3EA] border-b-2 border-[#C6A15B]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=80"
            alt="Gold Jewellery Header"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071F1B] via-[#071F1B]/80 to-[#071F1B]/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09231E] text-[#DFCA8F] text-[11px] font-semibold tracking-widest uppercase border border-[#C6A15B]/50 mb-4 shadow-md">
            <SparklesIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
            100% BIS HALLMARKED PURITY
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-wide uppercase text-[#F7F3EA] mb-4 drop-shadow-[0_2px_10px_rgba(198,161,91,0.2)]">
            GOLD JEWELLERY
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#EDE5D7]/90 font-light leading-relaxed">
            Timeless 22K gold designs crafted to become part of your story. Explore heritage temple jewellery, modern minimalism,
            and imperial bridal sets.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <FilterPanel filters={m} onFilterChange={p} onResetFilters={C} productType="gold" totalResults={w.length} />
          </div>
          <div className="lg:col-span-9 space-y-6">
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE5D7] flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-72">
                <SearchIcon className="w-4 h-4 text-[#6B6862] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search gold designs..."
                  value={m.searchQuery}
                  onChange={(E) =>
                    p({
                      ...m,
                      searchQuery: E.target.value,
                    })
                  }
                  className="w-full bg-white border border-[#EDE5D7] rounded-lg pl-9 pr-3 py-2 text-xs text-[#071F1B] focus:outline-none focus:border-[#071F1B]"
                />
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => b(true)}
                  className="lg:hidden flex items-center gap-1.5 bg-white border border-[#EDE5D7] text-[#071F1B] text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  <SlidersHorizontalIcon className="w-4 h-4 text-[#071F1B]" />
                  <span>FILTERS ({w.length})</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#6B6862] hidden sm:inline">Sort:</span>
                  <select
                    value={m.sortBy}
                    onChange={(E) =>
                      p({
                        ...m,
                        sortBy: E.target.value,
                      })
                    }
                    className="bg-white border border-[#EDE5D7] text-xs text-[#071F1B] rounded-lg px-3 py-2 focus:outline-none focus:border-[#071F1B]"
                  >
                    <option value="recommended">Featured / Recommended</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
            {(m.category !== 'all' || m.purity !== 'all' || m.priceRange !== 'all' || m.occasion !== 'all' || m.searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#6B6862] font-semibold text-[10px] uppercase">Active:</span>
                {m.category !== 'all' && (
                  <span className="bg-[#09231E] text-[#DFCA8F] px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1 border border-[#C6A15B]/30">
                    {m.category}
                  </span>
                )}
                {m.purity !== 'all' && (
                  <span className="bg-[#09231E] text-[#DFCA8F] px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1 border border-[#C6A15B]/30">
                    {m.purity}
                  </span>
                )}
                {m.priceRange !== 'all' && (
                  <span className="bg-[#09231E] text-[#DFCA8F] px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1 border border-[#C6A15B]/30">
                    Price Filter
                  </span>
                )}
                <button onClick={C} className="text-xs text-[#A9823D] hover:underline ml-2">
                  Clear All
                </button>
              </div>
            )}
            {w.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {w.map((E) => (
                  <ProductCard
                    product={E}
                    isWishlisted={wishlistIds.includes(E.id)}
                    onToggleWishlist={onToggleWishlist}
                    onQuickView={onQuickView}
                    onSelectProduct={onSelectProduct}
                    onOpenAppointment={onOpenAppointment}
                    key={E.id}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#FAF7F2] p-12 rounded-2xl text-center space-y-4 border border-[#EDE5D7]">
                <h3 className="font-serif text-xl text-[#071F1B]">No gold designs match your current filter selection</h3>
                <p className="text-xs text-[#6B6862]">Try adjusting or resetting your filter preferences.</p>
                <button
                  onClick={C}
                  className="bg-[#071F1B] text-[#DFCA8F] text-xs font-semibold px-6 py-2.5 rounded-xl uppercase tracking-wider cursor-pointer border border-[#C6A15B]/40"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      {x && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => b(false)} />
          <div className="relative w-4/5 max-w-sm bg-[#FAF7F2] h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto">
            <FilterPanel filters={m} onFilterChange={p} onResetFilters={C} productType="gold" totalResults={w.length} />
            <button
              onClick={() => b(false)}
              className="mt-6 w-full bg-[#071F1B] text-[#DFCA8F] py-3 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer border border-[#C6A15B]/40"
            >
              {'Show '}
              {w.length}
              {' Results'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoldPage;
