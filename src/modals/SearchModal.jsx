import React, { useState, useEffect, useRef } from 'react';
import { EyeIcon, SearchIcon, XIcon } from 'lucide-react';
import { DEFAULT_PRODUCTS } from '../data/store.js';
import { formatINR } from '../lib/format.js';

const SearchModal = ({ isOpen, onClose, onSelectProduct, onQuickView, products }) => {
  const [d, u] = useState(''),
    m = useRef(null);
  if (
    (useEffect(() => {
      if (isOpen) {
        setTimeout(() => {
          var g;
          return m.current?.focus();
        }, 100);
      } else {
        u('');
      }
    }, [isOpen]),
    !isOpen)
  ) {
    return null;
  }
  const p = products || DEFAULT_PRODUCTS,
    x =
      d.trim() === ''
        ? p.slice(0, 6)
        : p.filter((g) => {
            const v = d.toLowerCase();
            return (
              g.name.toLowerCase().includes(v) ||
              g.category.toLowerCase().includes(v) ||
              g.sku.toLowerCase().includes(v) ||
              g.purity.toLowerCase().includes(v) ||
              g.metal.toLowerCase().includes(v) ||
              (g.collection && g.collection.toLowerCase().includes(v)) ||
              (g.diamondDetails && g.diamondDetails.shape.toLowerCase().includes(v)) ||
              g.description.toLowerCase().includes(v)
            );
          }),
    b = ['Bridal Choker', 'Solitaire Ring', 'Royal Jhumka', '22K Bangles', 'Diamond Tennis Bracelet', 'Temple Kada'];
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-4xl mx-auto mt-12 sm:mt-20 px-4 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#C6A15B]/40 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
          <div className="p-4 sm:p-6 bg-white border-b border-[#EDE5D7] flex items-center gap-3">
            <SearchIcon className="w-6 h-6 text-[#30565B]" />
            <input
              ref={m}
              type="text"
              value={d}
              onChange={(g) => u(g.target.value)}
              placeholder="Search by jewellery type, 22K gold, diamond cut, ring, choker, bangles..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[#183C40] placeholder-[#6B6862]/60 focus:outline-none font-medium"
            />
            {d && (
              <button onClick={() => u('')} className="text-xs text-[#6B6862] hover:text-[#183C40] px-2 py-1">
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EDE5D7] flex items-center justify-center text-[#183C40]"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-3 bg-[#EDE5D7]/40 border-b border-[#EDE5D7] flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#6B6862] font-semibold uppercase tracking-wider shrink-0 text-[10px]">Popular:</span>
            {b.map((g) => (
              <button
                onClick={() => u(g)}
                className="px-2.5 py-1 rounded-full bg-white border border-[#EDE5D7] text-[#183C40] hover:border-[#30565B] whitespace-nowrap transition-colors"
                key={g}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="p-6 overflow-y-auto space-y-3 flex-1">
            <div className="flex justify-between items-center text-xs text-[#6B6862] pb-2">
              <span>{d ? `Search Results (${x.length})` : 'Featured Masterpieces'}</span>
              <span>
                {x.length}
                {' items found'}
              </span>
            </div>
            {x.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <SearchIcon className="w-10 h-10 text-[#6B6862]/40 mx-auto" />
                <p className="font-serif text-lg text-[#183C40]">No Jewellery Found</p>
                <p className="text-xs text-[#6B6862]">
                  Try searching for terms like "22K Gold", "Earrings", "Solitaire", or "Choker".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {x.map((g) => (
                  <div
                    onClick={() => {
                      onClose();
                      onSelectProduct(g);
                    }}
                    className="bg-white rounded-xl p-3 border border-[#EDE5D7] hover:border-[#30565B] flex gap-3.5 items-center cursor-pointer transition-all shadow-xs hover:shadow-md group"
                    key={g.id}
                  >
                    <img src={g.images[0]} alt={g.name} className="w-16 h-16 rounded-lg object-cover bg-[#EDE5D7]/50 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#A9823D] uppercase tracking-wider font-semibold block">
                        {g.purity}
                        {' • '}
                        {g.category}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#183C40] group-hover:text-[#30565B] truncate">
                        {g.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-bold text-xs text-[#183C40]">{formatINR(g.price)}</span>
                        <span className="text-[10px] text-[#6B6862] font-mono">{g.approxWeight}</span>
                      </div>
                    </div>
                    <button
                      onClick={(v) => {
                        v.stopPropagation();
                        onQuickView(g);
                      }}
                      className="p-2 rounded-lg text-[#6B6862] hover:text-[#30565B] hover:bg-[#FAF7F2]"
                      title="Quick View"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
