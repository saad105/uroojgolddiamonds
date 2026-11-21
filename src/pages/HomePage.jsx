import React, { useState } from 'react';
import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  ExternalLinkIcon,
  GemIcon,
  InstagramIcon,
  MapPinIcon,
  MessageCircleIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  ScaleIcon,
} from 'lucide-react';
import { CONFIG, DEFAULT_PRODUCTS } from '../data/store.js';
import { whatsappLink } from '../lib/format.js';
import SectionHeading from '../components/SectionHeading.jsx';
import ProductCard from '../components/ProductCard.jsx';
import TrustHighlights from '../components/TrustHighlights.jsx';
import LiveRateBar from '../components/LiveRateBar.jsx';

const HomePage = ({
  onNavigate,
  onQuickView,
  onSelectProduct,
  onToggleWishlist,
  onOpenAppointment,
  onOpenLegalModal,
  onOpenGoldCalculator,
  onOpenPromises,
  onOpenSavingsPlan,
  onOpenVideoCall,
  onOpenSizeGuide,
  wishlistIds,
  products,
  liveRates,
  onOpenAdmin,
}) => {
  const [E, S] = useState('ALL'),
    k = products || DEFAULT_PRODUCTS,
    O = k.filter((P) => P.type === 'gold' || P.purity === '22K').slice(0, 4),
    T = k.filter((P) => P.type === 'diamond' || P.type === 'solitaire' || !!P.diamondDetails).slice(0, 4);
  k.filter((P) => P.isBridal).slice(0, 6);
  const R = [
    {
      name: 'Necklaces',
      weight: 'From 7g',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
      purity: '22K & 18K',
      page: 'gold',
    },
    {
      name: 'Bridal Sets',
      weight: 'Haars From 20g',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
      purity: 'Nizami & Royal',
      page: 'collections',
    },
    {
      name: 'Earrings',
      weight: 'Daily & Tops',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
      purity: 'Jhumkas & Tops',
      page: 'gold',
    },
    {
      name: 'Rings',
      weight: 'Solitaire & Bands',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
      purity: 'Certified Diamonds',
      page: 'diamonds',
    },
    {
      name: 'Bangles',
      weight: 'Daily to Broad',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80',
      purity: '22K Hallmarked',
      page: 'gold',
    },
    {
      name: 'Bracelets',
      weight: 'Broad & Tennis',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80',
      purity: 'Diamond & Gold',
      page: 'diamonds',
    },
    {
      name: 'Mangalsutra',
      weight: 'Modern Lacha',
      image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80',
      purity: 'Sacred Lacha Designs',
      page: 'gold',
    },
    {
      name: 'Chains',
      weight: 'Light to Heavy',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
      purity: 'Classic 22K',
      page: 'gold',
    },
  ];
  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#071F1B] text-[#F7F3EA]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=90"
            alt="Urooj Luxury Jewellery Hyderabad"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071F1B] via-[#071F1B]/85 to-[#071F1B]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071F1B]/95 via-[#09231E]/70 to-[#071F1B]/95" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="flex justify-center mb-4">
            <img
              src={CONFIG.logoUrl}
              alt="Urooj Gold & Diamonds Insignia"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#C6A15B] shadow-[0_4px_25px_rgba(198,161,91,0.45)] p-0.5 bg-[#09231E] ring-2 ring-[#DFCA8F]/50 animate-in fade-in duration-500"
              onError={(P) => {
                const V = P.currentTarget;
                if (V.src !== CONFIG.logoUrlRemote) {
                  V.src = CONFIG.logoUrlRemote;
                }
              }}
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#09231E]/90 border border-[#C6A15B]/60 backdrop-blur-md mb-4 shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
            <MapPinIcon className="w-3.5 h-3.5 text-[#DFCA8F]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#DFCA8F]">
              MEHDIPATNAM X ROAD, HYDERABAD
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-wide uppercase text-[#F7F3EA] leading-[1.12] mb-4 drop-shadow-[0_2px_15px_rgba(198,161,91,0.2)]">
            {'WHERE TRUST '}
            <br />
            <span className="italic font-normal text-[#DFCA8F]">MEETS LUXURY</span>
          </h1>
          <p className="font-serif italic text-sm sm:text-lg text-[#EDE5D7] max-w-2xl mx-auto mb-6 tracking-wide leading-relaxed font-light">
            “{CONFIG.urduTagline}”
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 rounded-xl bg-[#09231E]/95 border border-[#C6A15B]/50 backdrop-blur-md text-[11px] sm:text-xs font-semibold tracking-wider text-[#DFCA8F] uppercase mb-8 max-w-3xl mx-auto shadow-xl">
            <span className="flex items-center gap-1.5">
              <CircleCheckIcon className="w-3.5 h-3.5 text-[#DFCA8F]" />
              999 (24k) & 916 (22k) & 750 (18k)
            </span>
            <span className="text-[#C6A15B]/40 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <GemIcon className="w-3.5 h-3.5 text-[#DFCA8F]" />
              Certified Diamonds
            </span>
            <span className="text-[#C6A15B]/40 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <RefreshCwIcon className="w-3.5 h-3.5 text-[#DFCA8F]" />
              100% Exchange on 18k & 22k / 916
            </span>
          </div>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#EDE5D7]/85 font-light leading-relaxed mb-8">
            Exclusively retailing 22-Carat pure gold stamped with BIS Hallmarks. Experience bespoke craftsmanship across Kuwaiti,
            Turkish, Nizami, Kolkata, and Bangalore design eras.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onNavigate('gold');
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-[#B99249] via-[#DFCA8F] to-[#B99249] hover:from-[#DFCA8F] hover:via-[#F7F3EA] hover:to-[#DFCA8F] text-[#071F1B] font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-xl shadow-[0_4px_25px_rgba(198,161,91,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>EXPLORE 22K GOLD</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
            <a
              href={whatsappLink(
                'Hello Urooj Gold & Diamonds, I would like to consult with your Mehdipatnam showroom team about your gold & diamond collections.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <MessageCircleIcon className="w-4 h-4" />
              <span>WHATSAPP ENQUIRY</span>
            </a>
            <button
              onClick={() => {
                onNavigate('diamonds');
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
              className="w-full sm:w-auto bg-[#09231E]/90 hover:bg-[#0C2C26] text-[#F7F3EA] border border-[#C6A15B]/60 font-semibold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <GemIcon className="w-4 h-4 text-[#DFCA8F]" />
              <span>DIAMONDS & RINGS</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent" />
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-[#FAF7F2] rounded-2xl border-2 border-[#C6A15B] shadow-2xl p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-[#EDE5D7] flex items-start gap-4 shadow-xs hover:border-[#C6A15B] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#071F1B] flex items-center justify-center text-[#DFCA8F] shrink-0 border border-[#C6A15B]/30">
                <RefreshCwIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[#071F1B]/10 text-[#071F1B] uppercase tracking-wider">
                  EXCHANGE POLICY
                </span>
                <h3 className="font-serif text-base font-bold text-[#071F1B]">100% Exchange 18k & 22k / 916</h3>
                <p className="text-xs text-[#6B6862] leading-relaxed font-light">
                  100% exchange on 22k 916 and 18k gold rate. 90% exchange value on diamonds and precious stones.
                </p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#EDE5D7] flex items-start gap-4 shadow-xs hover:border-[#C6A15B] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#C6A15B] flex items-center justify-center text-[#071F1B] shrink-0">
                <RotateCcwIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[#C6A15B]/20 text-[#A9823D] uppercase tracking-wider">
                  WITHIN 7 DAYS
                </span>
                <h3 className="font-serif text-base font-bold text-[#071F1B]">100% Exchange Within 7 Days</h3>
                <p className="text-xs text-[#6B6862] leading-relaxed font-light">
                  100% exchange of invoice value can be availed if product is exchanged within 7 days of purchase (unused
                  condition).
                </p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#EDE5D7] flex items-start gap-4 shadow-xs hover:border-[#C6A15B] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#09231E] flex items-center justify-center text-[#DFCA8F] shrink-0 border border-[#C6A15B]/30">
                <GemIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[#071F1B]/10 text-[#071F1B] uppercase tracking-wider">
                  ORNAMENT QUALITIES
                </span>
                <h3 className="font-serif text-base font-bold text-[#071F1B]">999 (24k) • 91.6% (22k) • 750 (18k)</h3>
                <p className="text-xs text-[#6B6862] leading-relaxed font-light">
                  All ornaments sold have verified melting purities: 999 Pure gold, 91.6% (22k) 916 Hallmark, and 750 (18k).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Regional & International Artistry"
          title="DISTINCT DESIGN ERAS"
          subtitle="Explore masterfully curated traditions\u2014from royal Nizami courts to Kuwaiti and Turkish international splendour."
          alignment="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CONFIG.designEras.map((P, V) => (
            <div
              className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EDE5D7] hover:border-[#C6A15B] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              key={V}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-[#A9823D] tracking-widest uppercase block">{P.origin}</span>
                <h4 className="font-serif text-lg font-bold text-[#071F1B] group-hover:text-[#09231E] transition-colors">
                  {P.name}
                </h4>
                <p className="text-xs text-[#6B6862] font-light leading-relaxed">{P.description}</p>
              </div>
              <div className="pt-4 mt-2 border-t border-[#EDE5D7]/70">
                <button
                  onClick={() => {
                    onNavigate('collections');
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  className="text-[11px] font-semibold text-[#071F1B] group-hover:text-[#A9823D] flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                >
                  <span>Explore Style</span>
                  <ChevronRightIcon className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071F1B] rounded-3xl p-8 sm:p-12 text-[#F7F3EA] border-2 border-[#C6A15B] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold tracking-widest text-[#DFCA8F] uppercase block">
                Engineered for Comfort & Grandeur
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-[#F7F3EA] leading-tight">
                {'LIGHTWEIGHT LUXURY & '}
                <br />
                <span className="italic text-[#DFCA8F]">ELEGANT BRIDAL HAARS</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#EDE5D7]/85 font-light leading-relaxed">
                We specialize in high-quality, lightweight, and heavy bridal jewelry engineered for both modern luxury and
                traditional heritage:
              </p>
              <div className="space-y-3 pt-2">
                <div className="bg-[#09231E]/90 p-3.5 rounded-xl border border-[#C6A15B]/40 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#C6A15B] text-[#071F1B] font-bold text-[11px] shrink-0 mt-0.5">
                    FROM 7g
                  </span>
                  <div>
                    <h5 className="font-serif font-bold text-[#F7F3EA] text-xs uppercase tracking-wider">
                      Lightweight Necklace Collection
                    </h5>
                    <p className="text-[11px] text-[#EDE5D7]/80 font-light">
                      Exquisite, daily-wear, and festive statement necklaces starting from just 7 grams.
                    </p>
                  </div>
                </div>
                <div className="bg-[#09231E]/90 p-3.5 rounded-xl border border-[#C6A15B]/40 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#DFCA8F] text-[#071F1B] font-bold text-[11px] shrink-0 mt-0.5">
                    FROM 20g
                  </span>
                  <div>
                    <h5 className="font-serif font-bold text-[#F7F3EA] text-xs uppercase tracking-wider">
                      Elegant Bridal Haar Collection
                    </h5>
                    <p className="text-[11px] text-[#EDE5D7]/80 font-light">
                      Intricate bridal and festive long necklaces (haars) starting from just 20 grams.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onNavigate('gold');
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  className="bg-gradient-to-r from-[#B99249] to-[#DFCA8F] hover:from-[#DFCA8F] hover:to-[#F7F3EA] text-[#071F1B] text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg"
                >
                  <span>VIEW WEIGHT HIGHLIGHTS</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#09231E] border border-[#C6A15B]/40">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
                  alt="Lightweight 7g Gold Necklace"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#09231E] border border-[#C6A15B]/40 pt-6">
                <img
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
                  alt="Bridal Haar starting 20g"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Curated Explorations"
          title="SHOP BY CATEGORY"
          subtitle="Explore iconic silhouettes crafted in 22K certified gold and brilliant natural diamonds."
          alignment="center"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {R.map((P) => (
            <div
              onClick={() => {
                onNavigate(P.page, P.name);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
              className="group cursor-pointer bg-[#FAF7F2] rounded-xl border border-[#EDE5D7] hover:border-[#C6A15B] p-2.5 sm:p-3 transition-all duration-300 text-center flex flex-col items-center shadow-xs hover:shadow-lg"
              key={P.name}
            >
              <div className="aspect-square w-full rounded-lg overflow-hidden bg-[#EDE5D7]/50 mb-2.5">
                <img
                  src={P.image}
                  alt={P.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#071F1B] group-hover:text-[#A9823D] transition-colors truncate w-full">
                {P.name}
              </h4>
              <span className="text-[10px] text-[#A9823D] tracking-wider truncate w-full font-medium">{P.weight}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#EDE5D7] p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#C6A15B] uppercase block mb-1 flex items-center gap-1.5">
                <InstagramIcon className="w-4 h-4 text-[#C6A15B]" />
                Official Instagram Reels
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#071F1B]">WATCH OUR DESIGNS COME ALIVE</h3>
              <p className="text-xs text-[#6B6862] font-light max-w-xl mt-1">
                Explore real video showcases of our latest bridal haars, lightweight necklaces, and diamond designs from our
                Mehdipatnam showroom.
              </p>
            </div>
            <a
              href="https://www.instagram.com/reel/DZpSayGv89z/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#071F1B] hover:text-[#A9823D] flex items-center gap-1.5 uppercase tracking-wider"
            >
              <span>View On Instagram</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-[#EDE5D7] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-[#071F1B] text-[#F7F3EA] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <InstagramIcon className="w-4 h-4 text-[#DFCA8F]" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Showcase 1: Bridal Haars</span>
                </div>
                <span className="text-[10px] text-[#EDE5D7]/70 font-mono">@uroojgoldanddiamonds</span>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-xs text-[#171A19]/80 font-light">
                  Experience the majesty of our handcrafted Nizami bridal long necklaces and intricate 22K haars starting from 20
                  grams.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/reel/DZpSayGv89z/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#071F1B] hover:bg-[#09231E] text-[#DFCA8F] px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 transition-colors border border-[#C6A15B]/30"
                  >
                    <span>Watch Bridal Reel</span>
                    <ExternalLinkIcon className="w-3 h-3 text-[#DFCA8F]" />
                  </a>
                  <a
                    href={whatsappLink(
                      'Hello Urooj Gold & Diamonds, I watched your Bridal Haar Instagram Reel (DZpSayGv89z) and would like more details and price estimates.',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 transition-colors"
                  >
                    <MessageCircleIcon className="w-3 h-3" />
                    <span>Enquire Price</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-[#EDE5D7] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 bg-[#071F1B] text-[#F7F3EA] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <InstagramIcon className="w-4 h-4 text-[#DFCA8F]" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Showcase 2: Lightweight & Diamonds</span>
                </div>
                <span className="text-[10px] text-[#EDE5D7]/70 font-mono">@uroojgoldanddiamonds</span>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-xs text-[#171A19]/80 font-light">
                  Discover daily-wear 7g statement necklaces, modern lacha designs, certified solitaire rings, and delicate ear
                  tops.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/reel/DZrVBroRofT/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#071F1B] hover:bg-[#09231E] text-[#DFCA8F] px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 transition-colors border border-[#C6A15B]/30"
                  >
                    <span>Watch Collection Reel</span>
                    <ExternalLinkIcon className="w-3 h-3 text-[#DFCA8F]" />
                  </a>
                  <a
                    href={whatsappLink(
                      'Hello Urooj Gold & Diamonds, I watched your Lightweight & Diamond Instagram Reel (DZrVBroRofT) and would like to enquire about designs starting 7g.',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 transition-colors"
                  >
                    <MessageCircleIcon className="w-3 h-3" />
                    <span>Enquire Price</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeading
            eyebrow="Heirloom Purity"
            title="THE GOLD EDIT"
            subtitle="Rich 22K yellow gold silhouettes stamped with official BIS 916 hallmarking."
            alignment="left"
            className="mb-0"
          />
          <button
            onClick={() => {
              onNavigate('gold');
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
            className="self-start md:self-auto text-xs font-semibold text-[#071F1B] hover:text-[#A9823D] tracking-widest uppercase flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>VIEW COMPLETE GOLD CATALOGUE</span>
            <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {O.map((P) => (
            <ProductCard
              product={P}
              isWishlisted={wishlistIds.includes(P.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onSelectProduct={onSelectProduct}
              onOpenAppointment={onOpenAppointment}
              key={P.id}
            />
          ))}
        </div>
      </section>
      <section className="py-16 bg-[#071F1B] text-[#F7F3EA] border-y-2 border-[#C6A15B] relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#09231E]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#C6A15B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              eyebrow="Haute Diamanterie"
              title="BRILLIANCE, REFINED"
              subtitle="Certified solitaires and architectural diamond creations cut for unparalleled scintillation."
              alignment="left"
              light
              className="mb-0"
            />
            <button
              onClick={() => {
                onNavigate('diamonds');
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
              className="self-start md:self-auto text-xs font-semibold text-[#DFCA8F] hover:text-[#F7F3EA] tracking-widest uppercase flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>EXPLORE DIAMOND SOLITAIRES</span>
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {T.map((P) => (
              <ProductCard
                product={P}
                isWishlisted={wishlistIds.includes(P.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onSelectProduct={onSelectProduct}
                onOpenAppointment={onOpenAppointment}
                key={P.id}
              />
            ))}
          </div>
        </div>
      </section>
      <TrustHighlights onOpenLegalModal={onOpenLegalModal} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-2xl border-2 border-[#071F1B] p-6 sm:p-8 shadow-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <ScaleIcon className="w-5 h-5 text-[#071F1B]" />
                <span className="text-xs font-bold text-[#071F1B] uppercase tracking-wider">
                  National & Telangana State Regulatory Adherence
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-[#071F1B] font-bold">
                100% COMPLIANT WITH INDIAN CONSTITUTION & GOLD LAWS
              </h4>
              <p className="text-xs text-[#171A19]/80 font-light leading-relaxed">
                We strictly adhere to the Bureau of Indian Standards (BIS) Hallmarking Scheme with mandatory 6-digit HUID, Legal
                Metrology precision-calibrated balances, PMLA / Income Tax PAN threshold rules (above ₹2 Lakhs), and the Digital
                Personal Data Protection Act, 2023 (DPDP Act).
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => onOpenLegalModal && onOpenLegalModal('regulatory')}
                className="bg-[#071F1B] hover:bg-[#09231E] text-[#DFCA8F] text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-xl transition-colors cursor-pointer border border-[#C6A15B]/30"
              >
                View Statutory Rules
              </button>
              <button
                onClick={() => onOpenLegalModal && onOpenLegalModal('privacy')}
                className="bg-white hover:bg-[#EDE5D7]/50 text-[#071F1B] border border-[#071F1B] text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-xl transition-colors cursor-pointer"
              >
                DPDP Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LiveRateBar onOpenCalculator={onOpenGoldCalculator} onOpenPromises={onOpenPromises} rates={liveRates} />
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-[#071F1B] rounded-3xl p-8 sm:p-14 text-[#F7F3EA] border-2 border-[#C6A15B] relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#DFCA8F] uppercase block">
              Mehdipatnam Flagship Concierge
            </span>
            <h3 className="text-3xl sm:text-5xl font-serif leading-tight text-[#F7F3EA]">
              {'LET US HELP YOU FIND '}
              <br />
              <span className="italic text-[#DFCA8F]">THE PERFECT PIECE</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#EDE5D7]/80 font-light leading-relaxed">
              Located below Sapphire Banquets, M S G Plaza, Mehdipatnam X Road. Whether curating a wedding trousseau or designing
              a bespoke heirloom, our private jewellery advisors are here for you.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink(
                  'Hello Urooj Gold & Diamonds, I would like to schedule a personal jewellery consultation at your Mehdipatnam showroom.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-center shadow-lg"
              >
                <MessageCircleIcon className="w-4 h-4" />
                <span>CONSULT VIA WHATSAPP (+91 99661 62100)</span>
              </a>
              <button
                onClick={() => onOpenAppointment()}
                className="bg-gradient-to-r from-[#B99249] to-[#DFCA8F] hover:from-[#DFCA8F] hover:to-[#F7F3EA] text-[#071F1B] font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>BOOK IN-STORE VISIT</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
