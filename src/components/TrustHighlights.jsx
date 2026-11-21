import React, { useState } from 'react';
import {
  AwardIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  GlobeIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TagIcon,
  TruckIcon,
  UsersIcon,
} from 'lucide-react';
import { CONFIG } from '../data/store.js';

const TrustHighlights = ({ onOpenLegalModal }) => {
  const [t, r] = useState(0),
    l = [
      <ScaleIcon className="w-5 h-5" key={'0'} />,
      <RotateCcwIcon className="w-5 h-5" key={'1'} />,
      <ShieldCheckIcon className="w-5 h-5" key={'2'} />,
      <AwardIcon className="w-5 h-5" key={'3'} />,
      <RefreshCwIcon className="w-5 h-5" key={'4'} />,
      <CircleCheckIcon className="w-5 h-5" key={'5'} />,
      <TagIcon className="w-5 h-5" key={'6'} />,
      <GlobeIcon className="w-5 h-5" key={'7'} />,
      <TruckIcon className="w-5 h-5" key={'8'} />,
      <UsersIcon className="w-5 h-5" key={'9'} />,
    ],
    c = CONFIG.tenPromises[t];
  return (
    <section className="py-20 bg-[#071F1B] text-[#F7F3EA] relative overflow-hidden border-y-2 border-[#C6A15B]">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#DFCA8F_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#09231E] px-3.5 py-1 rounded-full border border-[#C6A15B]/40 text-[#DFCA8F] text-xs font-semibold tracking-widest uppercase shadow-md">
            <SparklesIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>UNCOMPROMISING LUXURY & ASSURANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F7F3EA] tracking-wide drop-shadow-[0_2px_10px_rgba(198,161,91,0.2)]">
            The 10 Urooj Royal Promises
          </h2>
          <p className="text-sm sm:text-base text-[#EDE5D7]/80 font-light leading-relaxed">
            Benchmarked against the highest standards of Indian jewellery leadership, every creation from Urooj Gold & Diamonds is
            backed by ten inviolable commitments to purity, transparency, and lifetime care.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONFIG.tenPromises.map((d, u) => {
              const m = t === u;
              return (
                <button
                  onClick={() => r(u)}
                  className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${m ? 'bg-[#09231E] border-[#C6A15B] shadow-xl scale-[1.02]' : 'bg-[#051714]/80 border-[#0C2C26] hover:border-[#C6A15B]/50 hover:bg-[#09231E]/60'}`}
                  key={d.id}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${m ? 'bg-[#071F1B] border-[#DFCA8F] text-[#DFCA8F]' : 'bg-[#071F1B]/60 border-[#0C2C26] text-[#C6A15B]'}`}
                  >
                    {l[u]}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#C6A15B] font-bold tracking-wider">{d.number}</span>
                      <h4 className="text-xs font-serif font-bold text-[#F7F3EA] truncate">{d.title}</h4>
                    </div>
                    <p className="text-[11px] text-[#EDE5D7]/70 font-light truncate">{d.tagline}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="lg:col-span-5 bg-[#09231E] rounded-2xl border-2 border-[#C6A15B]/70 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C6A15B]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-[#C6A15B] px-3 py-1 rounded-full bg-[#071F1B] border border-[#C6A15B]/40">
                  {'PROMISE '}
                  {c.number}
                  {' OF 10'}
                </span>
                <span className="text-xs text-[#DFCA8F] font-serif uppercase tracking-widest">UROOJ STANDARD</span>
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="text-2xl sm:text-3xl font-serif text-[#F7F3EA]">{c.title}</h3>
                <p className="text-xs font-serif italic text-[#DFCA8F] tracking-wide">“{c.tagline}”</p>
              </div>
              <p className="text-xs sm:text-sm text-[#EDE5D7]/85 font-light leading-relaxed pt-2">{c.desc}</p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#C6A15B]/30 flex items-center justify-between relative z-10">
              <button
                onClick={() => onOpenLegalModal?.('regulatory')}
                className="text-xs text-[#DFCA8F] hover:text-[#F7F3EA] flex items-center gap-1.5 uppercase tracking-wider font-semibold cursor-pointer"
              >
                <span>Read Official Policy</span>
                <ChevronRightIcon className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-[#EDE5D7]/50 font-mono">BIS & Telangana Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustHighlights;
