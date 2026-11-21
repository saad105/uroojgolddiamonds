import React, { useState, useRef } from 'react';
import {
  ArrowRightIcon,
  AwardIcon,
  CalculatorIcon,
  CheckIcon,
  ClockIcon,
  FileTextIcon,
  LockIcon,
  MapPinIcon,
  PhoneIcon,
  RotateCcwIcon,
  RulerIcon,
  ScaleIcon,
  ShieldIcon,
  SparklesIcon,
  TruckIcon,
} from 'lucide-react';
import { saveNewsletterSubscriberToCloud } from '../lib/supabase.js';
import { CONFIG } from '../data/store.js';

const Footer = ({
  onNavigate,
  onOpenAppointment,
  onOpenCustomModal,
  onOpenLegalModal,
  onOpenGoldCalculator,
  onOpenPromises,
  onOpenSizeGuide,
  onOpenSavingsPlan,
  onOpenVideoCall,
  onOpenAdmin,
}) => {
  const [email, setEmail] = useState(''),
    [isSubscribed, setIsSubscribed] = useState(false),
    tapCount = useRef(0),
    lastTapTime = useRef(0),
    handleSecretTap = () => {
      const O = Date.now();
      if (
        (O - lastTapTime.current < 650 ? (tapCount.current += 1) : (tapCount.current = 1),
        (lastTapTime.current = O),
        tapCount.current >= 4)
      ) {
        if (((tapCount.current = 0), typeof navigator < 'u' && navigator.vibrate)) {
          try {
            navigator.vibrate([40, 30, 40]);
          } catch {}
        }
        if (onOpenAdmin != null) {
          onOpenAdmin();
        }
      }
    },
    handleSubscribe = (O) => {
      O.preventDefault();
      if (email.trim()) {
        saveNewsletterSubscriberToCloud(email.trim()).catch(() => {});
        setIsSubscribed(true);
        setTimeout(() => {
          setEmail('');
        }, 4e3);
      }
    };
  return (
    <footer className="bg-[#071F1B] text-[#F7F3EA] pt-16 pb-12 border-t-2 border-[#C6A15B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#09231E] rounded-2xl p-6 sm:p-10 border border-[#C6A15B]/35 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center gap-2 text-[#DFCA8F] text-xs font-semibold tracking-widest uppercase">
                <SparklesIcon className="w-4 h-4 text-[#C6A15B]" />
                <span>The Urooj Circle</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#F7F3EA]">
                Be the first to discover new collections & private previews
              </h3>
              <p className="text-sm text-[#EDE5D7]/80 font-light max-w-lg">
                Receive invitations to bridal haar unveils, lightweight 7g necklace releases, and seasonal making-charge
                concession alerts.
              </p>
            </div>
            <div className="lg:col-span-6">
              {isSubscribed ? (
                <div className="bg-[#0C2C26] border border-[#C6A15B] p-4 rounded-xl flex items-center gap-3 text-[#DFCA8F]">
                  <CheckIcon className="w-5 h-5 text-[#C6A15B]" />
                  <span className="text-sm font-medium">Thank you for subscribing to the Urooj Private List.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(O) => setEmail(O.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-[#051714] border border-[#C6A15B]/40 rounded-xl px-4 py-3.5 text-sm text-[#F7F3EA] placeholder:text-[#EDE5D7]/40 focus:outline-none focus:border-[#DFCA8F] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#B99249] to-[#DFCA8F] hover:from-[#DFCA8F] hover:to-[#F7F3EA] text-[#071F1B] font-semibold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>JOIN CIRCLE</span>
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#C6A15B]/20">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3.5">
              <img
                src={CONFIG.logoUrl}
                alt="Urooj Gold & Diamonds Insignia"
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#C6A15B] shadow-xl p-0.5 bg-[#09231E] ring-2 ring-[#DFCA8F]/40"
                onError={(O) => {
                  const T = O.currentTarget;
                  if (T.src !== CONFIG.logoUrlRemote) {
                    T.src = CONFIG.logoUrlRemote;
                  }
                }}
              />
              <div className="space-y-0.5">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-[0.2em] text-[#F7F3EA] uppercase leading-none">
                  UROOJ
                </h2>
                <p className="text-[10px] sm:text-[11px] tracking-[0.35em] text-[#DFCA8F] font-semibold uppercase leading-tight">
                  GOLD & DIAMONDS
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#EDE5D7]/80 font-light leading-relaxed max-w-md">
              Where Trust Meets Luxury. Hyderabad's premier destination for BIS Hallmarked 916 & 750 gold jewellery, tested
              natural diamonds, Nizami bridal trousseaus, and transparent 100% exchange on 18k & 22k / 916.
            </p>
            <div className="space-y-2 pt-2 text-xs text-[#EDE5D7]/90 font-light">
              <div className="flex items-start gap-2.5">
                <MapPinIcon className="w-4 h-4 text-[#DFCA8F] shrink-0 mt-0.5" />
                <span>{CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneIcon className="w-4 h-4 text-[#DFCA8F] shrink-0" />
                <span>{CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ClockIcon className="w-4 h-4 text-[#DFCA8F] shrink-0" />
                <span>
                  {'Open Daily: '}
                  {CONFIG.openingHours}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold tracking-[0.2em] uppercase text-[#DFCA8F] border-b border-[#C6A15B]/20 pb-2">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-xs text-[#EDE5D7]/80">
              <li>
                <button
                  onClick={() => {
                    onNavigate('gold');
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  className="hover:text-[#DFCA8F] transition-colors cursor-pointer"
                >
                  22K Gold Jewellery
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('diamonds');
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  className="hover:text-[#DFCA8F] transition-colors cursor-pointer"
                >
                  Natural Diamond Solitaires
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('collections');
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  className="hover:text-[#DFCA8F] transition-colors cursor-pointer"
                >
                  Nizami Bridal Trousseau
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('gold');
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  className="hover:text-[#DFCA8F] transition-colors cursor-pointer"
                >
                  Lightweight Necklaces (From 7g)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('gold');
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  className="hover:text-[#DFCA8F] transition-colors cursor-pointer"
                >
                  Bridal Haars (From 20g)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('collections');
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  className="hover:text-[#DFCA8F] transition-colors cursor-pointer"
                >
                  Kuwaiti & Turkish Imports
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold tracking-[0.2em] uppercase text-[#DFCA8F] border-b border-[#C6A15B]/20 pb-2">
              SERVICES & TOOLS
            </h4>
            <ul className="space-y-2 text-xs text-[#EDE5D7]/80">
              {onOpenGoldCalculator && (
                <li>
                  <button
                    onClick={onOpenGoldCalculator}
                    className="hover:text-[#DFCA8F] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CalculatorIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Gold Rate Calculator</span>
                  </button>
                </li>
              )}
              {onOpenSizeGuide && (
                <li>
                  <button
                    onClick={onOpenSizeGuide}
                    className="hover:text-[#DFCA8F] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RulerIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Sizing & Bangle Guide</span>
                  </button>
                </li>
              )}
              {onOpenPromises && (
                <li>
                  <button
                    onClick={onOpenPromises}
                    className="hover:text-[#DFCA8F] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>The 10 Urooj Promises</span>
                  </button>
                </li>
              )}
              {onOpenSavingsPlan && (
                <li>
                  <button
                    onClick={onOpenSavingsPlan}
                    className="hover:text-[#DFCA8F] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <AwardIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Gold Savings Scheme</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenAppointment}
                  className="hover:text-[#DFCA8F] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MapPinIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Book Showroom Visit</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-serif font-bold tracking-[0.2em] uppercase text-[#DFCA8F] border-b border-[#C6A15B]/20 pb-2">
              TERMS & POLICIES
            </h4>
            <ul className="space-y-2 text-xs text-[#EDE5D7]/80">
              <li>
                <button
                  onClick={() => onOpenLegalModal?.('terms')}
                  className="hover:text-[#DFCA8F] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <FileTextIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Terms & Conditions (Official)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal?.('buyback')}
                  className="hover:text-[#DFCA8F] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <RotateCcwIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>7-Day & Exchange Policies</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal?.('regulatory')}
                  className="hover:text-[#DFCA8F] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ScaleIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>BIS 916 & 750 Hallmarked</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal?.('privacy')}
                  className="hover:text-[#DFCA8F] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <LockIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>DPDP Act Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegalModal?.('shipping')}
                  className="hover:text-[#DFCA8F] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <TruckIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Transit Insurance & Delivery</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div
          onClick={handleSecretTap}
          className="pt-6 pb-4 flex items-center justify-center text-center text-xs text-[#EDE5D7]/70 cursor-default select-none"
        >
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <ShieldIcon className="w-4 h-4 text-[#C6A15B] shrink-0" />
            <span>
              BIS Hallmarked 916 & 750 • 100% Exchange on 18k & 22k / 916 • 7-Day Exchange Policy • Hyderabad Jurisdiction
            </span>
          </div>
        </div>
        <div className="pt-4 border-t border-[#C6A15B]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#EDE5D7]/75">
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <span onClick={handleSecretTap} className="cursor-default select-none">
              © 2026 Urooj Gold & Diamonds. All Rights Reserved.
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-center sm:text-right">
            <span>Designed and developed by</span>
            <a
              href="https://pmdctechnologies.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit hover:text-[#DFCA8F] transition-colors no-underline cursor-pointer font-medium tracking-wide"
              title="PMDC TECHNOLOGIES"
            >
              PMDC TECHNOLOGIES
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
