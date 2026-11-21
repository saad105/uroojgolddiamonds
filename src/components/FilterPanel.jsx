import React from 'react';
import { CheckIcon, RotateCcwIcon, SlidersHorizontalIcon } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, onResetFilters, productType = 'all', totalResults }) => {
  const d =
      productType === 'gold'
        ? ['Necklaces', 'Earrings', 'Rings', 'Bangles', 'Bracelets', 'Chains', 'Pendants', 'Mangalsutra', 'Kada', 'Bridal Sets']
        : ['Rings', 'Earrings', 'Necklaces', 'Pendants', 'Bangles', 'Bracelets', 'Mangalsutra', 'Bridal Sets'],
    u = ['22K', '18K', '14K'],
    m = ['Round', 'Oval', 'Princess', 'Pear', 'Emerald', 'Marquise'],
    p = ['VVS', 'VS', 'SI'],
    x = ['Yellow Gold', 'White Gold', 'Rose Gold'],
    b = ['Wedding', 'Bridal', 'Engagement', 'Festive', 'Daily Wear'],
    g = [
      {
        label: 'All Prices',
        value: 'all',
      },
      {
        label: 'Under ₹50,000',
        value: 'under-50k',
      },
      {
        label: '₹50,000 - ₹1,00,000',
        value: '50k-100k',
      },
      {
        label: '₹1,00,000 - ₹2,50,000',
        value: '100k-250k',
      },
      {
        label: '₹2,50,000 - ₹5,00,000',
        value: '250k-500k',
      },
      {
        label: 'Above ₹5,00,000',
        value: 'above-500k',
      },
    ],
    v =
      filters.category !== 'all' ||
      filters.purity !== 'all' ||
      filters.diamondShape !== 'all' ||
      filters.clarity !== 'all' ||
      filters.metal !== 'all' ||
      filters.occasion !== 'all' ||
      filters.gender !== 'all' ||
      filters.priceRange !== 'all' ||
      filters.searchQuery !== '';
  return (
    <div className="bg-[#FAF7F2] rounded-2xl border border-[#EDE5D7] p-5 lg:p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-[#EDE5D7]">
        <div className="flex items-center gap-2">
          <SlidersHorizontalIcon className="w-4 h-4 text-[#30565B]" />
          <h3 className="font-serif text-lg text-[#183C40] font-semibold">Refine Selection</h3>
        </div>
        {v && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-[#A9823D] hover:text-[#183C40] font-semibold transition-colors cursor-pointer"
          >
            <RotateCcwIcon className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
      <div className="space-y-2.5">
        <label className="text-xs font-semibold tracking-wider uppercase text-[#183C40] block">Category</label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() =>
              onFilterChange({
                ...filters,
                category: 'all',
              })
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${filters.category === 'all' ? 'bg-[#30565B] text-[#F7F3EA] shadow-xs' : 'bg-white text-[#171A19]/80 border border-[#EDE5D7] hover:border-[#C6A15B]'}`}
          >
            All Categories
          </button>
          {d.map((w) => (
            <button
              onClick={() =>
                onFilterChange({
                  ...filters,
                  category: filters.category === w ? 'all' : w,
                })
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${filters.category === w ? 'bg-[#30565B] text-[#F7F3EA] shadow-xs' : 'bg-white text-[#171A19]/80 border border-[#EDE5D7] hover:border-[#C6A15B]'}`}
              key={w}
            >
              {w}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2.5 pt-4 border-t border-[#EDE5D7]">
        <label className="text-xs font-semibold tracking-wider uppercase text-[#183C40] block">Price Range</label>
        <div className="space-y-1">
          {g.map((w) => (
            <button
              onClick={() =>
                onFilterChange({
                  ...filters,
                  priceRange: w.value,
                })
              }
              className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${filters.priceRange === w.value ? 'bg-[#30565B] text-[#F7F3EA]' : 'hover:bg-[#EDE5D7]/50 text-[#171A19]/80'}`}
              key={w.value}
            >
              <span>{w.label}</span>
              {filters.priceRange === w.value && <CheckIcon className="w-3.5 h-3.5 text-[#DFCA8F]" />}
            </button>
          ))}
        </div>
      </div>
      {(productType === 'gold' || productType === 'all') && (
        <div className="space-y-2.5 pt-4 border-t border-[#EDE5D7]">
          <label className="text-xs font-semibold tracking-wider uppercase text-[#183C40] block">Gold Purity</label>
          <div className="flex gap-2">
            {u.map((w) => (
              <button
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    purity: filters.purity === w ? 'all' : w,
                  })
                }
                className={`flex-1 py-1.5 rounded-md text-xs font-semibold border transition-all cursor-pointer ${filters.purity === w ? 'bg-[#183C40] text-[#F7F3EA] border-[#183C40]' : 'bg-white text-[#171A19]/80 border-[#EDE5D7] hover:border-[#C6A15B]'}`}
                key={w}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}
      {(productType === 'diamond' || productType === 'all') && (
        <div className="space-y-2.5 pt-4 border-t border-[#EDE5D7]">
          <label className="text-xs font-semibold tracking-wider uppercase text-[#183C40] block">Diamond Shape</label>
          <div className="flex flex-wrap gap-1.5">
            {m.map((w) => (
              <button
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    diamondShape: filters.diamondShape === w ? 'all' : w,
                  })
                }
                className={`px-3 py-1 rounded-md text-xs transition-all cursor-pointer ${filters.diamondShape === w ? 'bg-[#30565B] text-[#F7F3EA]' : 'bg-white border border-[#EDE5D7] text-[#171A19]/80 hover:border-[#C6A15B]'}`}
                key={w}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}
      {(productType === 'diamond' || productType === 'all') && (
        <div className="space-y-2.5 pt-4 border-t border-[#EDE5D7]">
          <label className="text-xs font-semibold tracking-wider uppercase text-[#183C40] block">Clarity Grade</label>
          <div className="flex gap-2">
            {p.map((w) => (
              <button
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    clarity: filters.clarity === w ? 'all' : w,
                  })
                }
                className={`flex-1 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer ${filters.clarity === w ? 'bg-[#183C40] text-[#F7F3EA] border-[#183C40]' : 'bg-white text-[#171A19]/80 border-[#EDE5D7] hover:border-[#C6A15B]'}`}
                key={w}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-2.5 pt-4 border-t border-[#EDE5D7]">
        <label className="text-xs font-semibold tracking-wider uppercase text-[#183C40] block">Precious Metal</label>
        <div className="flex flex-wrap gap-1.5">
          {x.map((w) => (
            <button
              onClick={() =>
                onFilterChange({
                  ...filters,
                  metal: filters.metal === w ? 'all' : w,
                })
              }
              className={`px-3 py-1 rounded-md text-xs transition-all cursor-pointer ${filters.metal === w ? 'bg-[#30565B] text-[#F7F3EA]' : 'bg-white border border-[#EDE5D7] text-[#171A19]/80 hover:border-[#C6A15B]'}`}
              key={w}
            >
              {w}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2.5 pt-4 border-t border-[#EDE5D7]">
        <label className="text-xs font-semibold tracking-wider uppercase text-[#183C40] block">Occasion</label>
        <div className="flex flex-wrap gap-1.5">
          {b.map((w) => (
            <button
              onClick={() =>
                onFilterChange({
                  ...filters,
                  occasion: filters.occasion === w ? 'all' : w,
                })
              }
              className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${filters.occasion === w ? 'bg-[#30565B] text-[#F7F3EA]' : 'bg-white border border-[#EDE5D7] text-[#171A19]/80 hover:border-[#C6A15B]'}`}
              key={w}
            >
              {w}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
