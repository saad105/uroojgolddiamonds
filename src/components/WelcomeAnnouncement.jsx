import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, ClockIcon, MapPinIcon, MessageCircleIcon, ShieldCheckIcon, SparklesIcon, XIcon } from 'lucide-react';
import { CONFIG, DEFAULT_ANNOUNCEMENT } from '../data/store.js';
import { whatsappLink } from '../lib/format.js';

export const ANNOUNCEMENT_DISMISSED_KEY = 'urooj_announcement_overlay_dismissed';

const CornerOrnament = ({ position }) => {
  const t = position.includes('right'),
    r = position.includes('bottom');
  return (
    <div
      className={`absolute ${r ? 'bottom-0' : 'top-0'} ${t ? 'right-0' : 'left-0'} ${t ? 'scale-x-[-1]' : ''} ${r ? 'scale-y-[-1]' : ''} pointer-events-none select-none z-0`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 sm:w-28 sm:h-28 opacity-40">
        <path
          d="M4 4H100C100 4 75 25 50 50C25 75 4 100 4 100V4Z"
          stroke="url(#cornerGoldGradModal)"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          fill="none"
        />
        <path
          d="M10 10H80C80 10 60 28 42 46C24 64 10 82 10 82V10Z"
          stroke="url(#cornerGoldGradModal)"
          strokeWidth="0.6"
          strokeOpacity="0.4"
          fill="none"
        />
        <g transform="translate(32, 32)">
          <polygon
            points="0,-16 4.5,-4.5 16,0 4.5,4.5 0,16 -4.5,4.5 -16,0 -4.5,-4.5"
            stroke="url(#cornerGoldGradModal)"
            strokeWidth="0.9"
            fill="none"
          />
          <polygon
            points="0,-16 4.5,-4.5 16,0 4.5,4.5 0,16 -4.5,4.5 -16,0 -4.5,-4.5"
            stroke="url(#cornerGoldGradModal)"
            strokeWidth="0.75"
            fill="none"
            transform="rotate(45)"
          />
          <circle cx="0" cy="0" r="8" stroke="url(#cornerGoldGradModal)" strokeWidth="0.5" fill="none" />
          <circle cx="0" cy="0" r="2.5" fill="#DFCA8F" fillOpacity="0.8" />
        </g>
        <path d="M4 60C25 60 45 45 60 25C65 15 70 8 70 4" stroke="url(#cornerGoldGradModal)" strokeWidth="0.6" fill="none" />
        <circle cx="6" cy="6" r="1.5" fill="#DFCA8F" />
        <circle cx="100" cy="4" r="1.2" fill="#DFCA8F" />
        <circle cx="4" cy="100" r="1.2" fill="#DFCA8F" />
        <defs>
          <linearGradient id="cornerGoldGradModal" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F7F3EA" />
            <stop offset="0.35" stopColor="#DFCA8F" />
            <stop offset="0.7" stopColor="#C6A15B" />
            <stop offset="1" stopColor="#8E6F33" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const OrnamentDivider = ({ className }) => (
  <div
    className={`flex items-center justify-center gap-3 w-full max-w-xs sm:max-w-sm mx-auto my-2 ${className || ''}`}
    aria-hidden="true"
  >
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C6A15B]/50 to-[#DFCA8F]" />
    <div className="flex items-center gap-1.5 text-[#DFCA8F]">
      <span className="w-1 h-1 rounded-full bg-[#C6A15B]" />
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#DFCA8F]">
        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
      </svg>
      <span className="w-1 h-1 rounded-full bg-[#C6A15B]" />
    </div>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C6A15B]/50 to-[#DFCA8F]" />
  </div>
);

const WelcomeAnnouncement = ({ data = DEFAULT_ANNOUNCEMENT, isOpen, onClose }) => {
  const [l, c] = useState(() => {
      try {
        return sessionStorage.getItem(ANNOUNCEMENT_DISMISSED_KEY) !== 'true';
      } catch {
        return true;
      }
    }),
    d = isOpen !== undefined ? isOpen : l,
    u = () => {
      if (onClose) {
        onClose();
      } else {
        c(false);
        try {
          sessionStorage.setItem(ANNOUNCEMENT_DISMISSED_KEY, 'true');
        } catch {}
      }
    };
  useEffect(() => {
    if (!d) {
      return;
    }
    const m = (p) => {
      if (p.key === 'Escape') {
        u();
      }
    };
    window.addEventListener('keydown', m);
    return () => window.removeEventListener('keydown', m);
  }, [d]);
  return (
    <AnimatePresence>
      {d && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Urooj Gold & Diamonds Welcome Announcement"
        >
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            onClick={u}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />
          <motion.div
            id="welcome-announcement-overlay"
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            transition={{
              duration: 0.35,
              ease: 'easeOut',
            }}
            className="relative z-10 w-full max-w-xl sm:max-w-2xl bg-[#09231E]/95 text-[#F7F3EA] rounded-2xl border-2 border-[#C6A15B] shadow-[0_10px_50px_rgba(0,0,0,0.8)] p-5 sm:p-7 overflow-hidden selection:bg-[#C6A15B] selection:text-[#071F1B] my-auto"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(13, 51, 44, 0.85) 0%, rgba(7, 31, 27, 0.98) 85%)',
            }}
          >
            <CornerOrnament position="top-left" />
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-left" />
            <CornerOrnament position="bottom-right" />
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <button
              type="button"
              id="welcome-overlay-close-btn"
              onClick={u}
              aria-label="Close welcome announcement"
              className="absolute top-3.5 right-3.5 z-50 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#C6A15B]/50 bg-[#071F1B]/90 text-[#DFCA8F] hover:text-white hover:border-[#DFCA8F] hover:bg-[#C6A15B]/20 transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-sm"
            >
              <XIcon className="w-4 h-4 sm:w-4 sm:h-4" />
            </button>
            <div className="text-center w-full mb-3.5 sm:mb-4 relative z-10 flex flex-col items-center">
              <div className="relative mb-3">
                <img
                  src={CONFIG.logoUrl}
                  alt="Urooj Gold & Diamonds Official Insignia"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#C6A15B] shadow-[0_4px_20px_rgba(198,161,91,0.35)] p-0.5 bg-[#09231E] ring-2 ring-[#DFCA8F]/50"
                  onError={(m) => {
                    const p = m.currentTarget;
                    if (p.src !== CONFIG.logoUrlRemote) {
                      p.src = CONFIG.logoUrlRemote;
                    }
                  }}
                />
              </div>
              <div className="inline-flex items-start justify-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#F7F3EA] uppercase drop-shadow-[0_2px_8px_rgba(198,161,91,0.25)]">
                  {data.brand.name}
                </h1>
                {data.brand.registeredSymbol && (
                  <span className="text-[10px] sm:text-xs font-sans font-normal text-[#DFCA8F] ml-1 mt-0.5">®</span>
                )}
              </div>
              <p className="text-[10px] sm:text-xs font-sans font-semibold tracking-[0.3em] text-[#DFCA8F] uppercase mt-0.5">
                {data.brand.category}
              </p>
              <p className="text-[11px] sm:text-xs font-serif italic tracking-widest text-[#EDE5D7]/85 font-light">
                {data.brand.tagline}
              </p>
              <OrnamentDivider className="mt-2" />
            </div>
            <div className="relative z-10 space-y-3 sm:space-y-3.5">
              <div
                id="gold-platinum-rates-card"
                className="bg-[#0c2c26]/90 rounded-xl border border-[#C6A15B]/40 p-3 sm:p-4 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#C6A15B]/25">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold tracking-wider text-[#DFCA8F] uppercase">
                    <SparklesIcon className="w-3.5 h-3.5 text-[#DFCA8F]" />
                    <span>Today's Live Gold & Platinum Rates</span>
                  </div>
                  <span className="text-[10px] text-[#EDE5D7]/80 bg-[#071F1B] px-2 py-0.5 rounded border border-[#C6A15B]/30 font-mono">
                    Hyderabad Market
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2.5">
                  {data.rightCard.rates.map((m) => (
                    <div className="bg-[#071F1B]/80 rounded-lg p-2 border border-[#C6A15B]/20 text-center" key={m.label}>
                      <div className="text-[9px] sm:text-[10px] font-sans tracking-wider text-[#EDE5D7]/80 uppercase truncate">
                        {m.label}
                      </div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-[#DFCA8F] mt-0.5">{m.rate}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="bg-[#0c2c26]/70 rounded-xl p-2.5 sm:p-3 border border-[#C6A15B]/25 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#071F1B] border border-[#C6A15B]/40 flex items-center justify-center shrink-0 text-[#DFCA8F]">
                    <ShieldCheckIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-serif font-bold text-[#F7F3EA] uppercase tracking-wide">
                      100% BIS Hallmarked (HUID)
                    </div>
                    <div className="text-[10px] text-[#EDE5D7]/80 truncate">
                      Tested Natural Diamonds • 0% Deduction Old Gold Exchange
                    </div>
                  </div>
                </div>
                <div className="bg-[#0c2c26]/70 rounded-xl p-2.5 sm:p-3 border border-[#C6A15B]/25 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#071F1B] border border-[#C6A15B]/40 flex items-center justify-center shrink-0 text-[#DFCA8F]">
                    <MapPinIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-serif font-bold text-[#F7F3EA] uppercase tracking-wide">
                      Showroom in Mehdipatnam
                    </div>
                    <div className="text-[10px] text-[#EDE5D7]/80 flex items-center gap-1">
                      <ClockIcon className="w-3 h-3 text-[#DFCA8F]" />
                      <span>Open Daily: 11:00 AM – 10:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#0b2923]/90 rounded-xl p-2.5 sm:p-3 border border-[#C6A15B]/35 text-center">
                <p className="text-[11px] sm:text-xs font-serif italic text-[#EDE5D7]/95 leading-relaxed">
                  “{data.rightCard.advanceBooking.text}”
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-5 pt-3 border-t border-[#C6A15B]/25 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
              <a
                href={whatsappLink('Hello Urooj Gold & Diamonds, I would like to inquire about your jewellery collections.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#DFCA8F] hover:text-white transition-colors"
              >
                <MessageCircleIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Showroom</span>
              </a>
              <button
                type="button"
                id="welcome-overlay-enter-btn"
                onClick={u}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#B99249] via-[#DFCA8F] to-[#B99249] hover:from-[#DFCA8F] hover:via-[#F7F3EA] hover:to-[#DFCA8F] text-[#071F1B] font-serif font-bold tracking-[0.2em] text-xs sm:text-sm uppercase py-2.5 sm:py-3 px-8 sm:px-10 rounded-full shadow-[0_4px_20px_rgba(198,161,91,0.35)] hover:shadow-[0_6px_28px_rgba(198,161,91,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
              >
                <span>ENTER WEBSITE</span>
                <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeAnnouncement;
