import React, { useState } from 'react';
import { ArrowRightIcon, CalendarIcon, CrownIcon, MessageCircleIcon, SparklesIcon } from 'lucide-react';
import { DEFAULT_PRODUCTS } from '../data/store.js';
import SectionHeading from '../components/SectionHeading.jsx';
import { CURATED_COLLECTIONS } from '../data/collections.js';
import ProductCard from '../components/ProductCard.jsx';
import { whatsappLink } from '../lib/format.js';

const CollectionsPage = ({
  onQuickView,
  onSelectProduct,
  onToggleWishlist,
  onOpenAppointment,
  onOpenCustomModal,
  onNavigate,
  wishlistIds,
  products,
}) => {
  const [p, x] = useState(null),
    b = products || DEFAULT_PRODUCTS,
    g = p ? b.filter((v) => v.collection === p.title) : [];
  b.filter((v) => v.isBridal).slice(0, 6);
  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="relative min-h-[42vh] sm:min-h-[48vh] flex items-center justify-center overflow-hidden bg-[#071F1B] text-[#F7F3EA] border-b-2 border-[#C6A15B]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=80"
            alt="Collections Header"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071F1B] via-[#071F1B]/80 to-[#071F1B]/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09231E] text-[#DFCA8F] text-[11px] font-semibold tracking-widest uppercase border border-[#C6A15B]/50 mb-4 shadow-md">
            <CrownIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
            CURATED UNIVERSES OF ARTISTRY
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-wide uppercase text-[#F7F3EA] mb-4 drop-shadow-[0_2px_10px_rgba(198,161,91,0.2)]">
            THE UROOJ COLLECTIONS
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#EDE5D7]/90 font-light leading-relaxed">
            Each collection represents a distinct philosophy — from centuries of imperial temple heritage to contemporary
            solitaire silhouettes.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Signature Anthologies"
          title="EXPLORE BY THEME"
          subtitle="Discover masterfully curated edits designed for every milestone, wedding ceremony, and celebration."
          alignment="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CURATED_COLLECTIONS.map((v) => (
            <div
              className="group bg-[#FAF7F2] rounded-2xl border border-[#EDE5D7] hover:border-[#C6A15B] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
              key={v.id}
            >
              <div>
                <div className="aspect-[16/11] overflow-hidden bg-[#EDE5D7]/50 relative">
                  <img
                    src={v.image}
                    alt={v.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#071F1B]/90 text-[#DFCA8F] text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded border border-[#C6A15B]/30 backdrop-blur-xs">
                    {v.itemCount}
                    {' Masterpieces'}
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] font-semibold text-[#A9823D] tracking-widest uppercase block">{v.subtitle}</span>
                  <h3 className="font-serif text-2xl text-[#071F1B] group-hover:text-[#09231E] transition-colors">{v.title}</h3>
                  <p className="text-xs text-[#6B6862] font-light leading-relaxed line-clamp-3">{v.description}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button
                  onClick={() => x(v)}
                  className="w-full bg-[#071F1B] hover:bg-[#09231E] text-[#DFCA8F] text-xs font-semibold tracking-widest uppercase py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#C6A15B]/40"
                >
                  <span>
                    {'VIEW '}
                    {v.title}
                  </span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {p && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={() => x(null)} />
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#FAF7F2] rounded-3xl border border-[#C6A15B] shadow-2xl overflow-y-auto z-10 p-6 sm:p-10 my-auto animate-in zoom-in-95 duration-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#EDE5D7]">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-[#A9823D] block">{p.subtitle}</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#071F1B]">{p.title}</h3>
                <p className="text-xs text-[#6B6862] font-light max-w-xl mt-1">{p.description}</p>
              </div>
              <button
                onClick={() => x(null)}
                className="bg-[#071F1B] text-[#DFCA8F] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer border border-[#C6A15B]/30"
              >
                Close Anthology
              </button>
            </div>
            <div className="pt-8">
              {g.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {g.map((v) => (
                    <ProductCard
                      product={v}
                      isWishlisted={wishlistIds.includes(v.id)}
                      onToggleWishlist={onToggleWishlist}
                      onQuickView={onQuickView}
                      onSelectProduct={onSelectProduct}
                      onOpenAppointment={onOpenAppointment}
                      key={v.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#EDE5D7] space-y-4">
                  <p className="font-serif text-lg text-[#071F1B]">
                    Exclusive Pieces currently curated upon private viewing request.
                  </p>
                  <a
                    href={whatsappLink(
                      `Hello Urooj Gold & Diamonds, I am interested in viewing pieces from the ${p.title} collection.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl text-xs font-semibold tracking-widest uppercase"
                  >
                    <MessageCircleIcon className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071F1B] rounded-3xl p-8 sm:p-14 text-[#F7F3EA] border-2 border-[#C6A15B] shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#DFCA8F] uppercase block">Bespoke Nizami Studio</span>
            <h3 className="text-3xl sm:text-5xl font-serif leading-tight text-[#F7F3EA]">
              {'CRAFT YOUR OWN '}
              <br />
              <span className="italic text-[#DFCA8F]">BESPOKE HEIRLOOM</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#EDE5D7]/85 font-light leading-relaxed">
              Work alongside our master karigars to create a one-of-a-kind wedding set, restore an antique Nizami silhouette, or
              select a custom solitaire diamond.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenCustomModal}
                className="bg-gradient-to-r from-[#B99249] to-[#DFCA8F] hover:from-[#DFCA8F] hover:to-[#F7F3EA] text-[#071F1B] font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <SparklesIcon className="w-4 h-4 text-[#071F1B]" />
                <span>START BESPOKE DESIGN</span>
              </button>
              <button
                onClick={() => onOpenAppointment()}
                className="bg-[#09231E] hover:bg-[#0C2C26] text-[#F7F3EA] border border-[#C6A15B]/50 font-semibold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarIcon className="w-4 h-4 text-[#DFCA8F]" />
                <span>BOOK PRIVATE CONSULTATION</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;
