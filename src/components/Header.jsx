import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRightIcon,
  CalculatorIcon,
  HeartIcon,
  MenuIcon,
  MessageCircleIcon,
  RulerIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingBagIcon,
  SparklesIcon,
  UserIcon,
  XIcon,
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext.jsx';
import LiveRateBar from './LiveRateBar.jsx';
import { CONFIG } from '../data/store.js';

const Header = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  onOpenAccount,
  onOpenAppointment,
  onOpenGoldCalculator,
  onOpenPromises,
  onOpenSizeGuide,
  onOpenSavingsPlan,
  onOpenVideoCall,
  onOpenAdmin,
  wishlistCount,
  cartCount,
  liveRates,
  offersConfig,
}) => {
  const { user, profile } = useAuth(),
    [isScrolled, setIsScrolled] = useState(false),
    [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false),
    tapCount = useRef(0),
    lastTapTime = useRef(0),
    handleLogoTap = () => {
      const Z = Date.now();
      if (
        (Z - lastTapTime.current < 650 ? (tapCount.current += 1) : (tapCount.current = 1),
        (lastTapTime.current = Z),
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
      } else {
        onNavigate('home');
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    };
  useEffect(() => {
    const Z = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', Z);
    return () => window.removeEventListener('scroll', Z);
  }, []);
  const navItems = [
    {
      label: 'HOME',
      page: 'home',
    },
    {
      label: 'GOLD',
      page: 'gold',
    },
    {
      label: 'DIAMONDS',
      page: 'diamonds',
    },
    {
      label: 'COLLECTIONS',
      page: 'collections',
    },
    {
      label: 'ABOUT',
      page: 'about',
    },
  ];
  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {onOpenGoldCalculator && (
        <LiveRateBar onOpenCalculator={onOpenGoldCalculator} onOpenPromises={onOpenPromises} rates={liveRates} />
      )}
      <div className="bg-[#071F1B] text-[#F7F3EA] text-xs py-1.5 px-4 border-b border-[#C6A15B]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-[#DFCA8F]">
            <SparklesIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="tracking-wider uppercase text-[10.5px] font-medium">Bespoke Nizami Craftsmanship</span>
          </div>
          <div className="mx-auto sm:mx-0 text-center flex items-center gap-2">
            <span className="font-light tracking-wide text-[#EDE5D7]/90 text-[11px] sm:text-xs">
              {offersConfig != null && offersConfig.activeBanner && offersConfig.bannerText
                ? offersConfig.bannerText
                : '100% Exchange on 18k & 22k / 916 • BIS Hallmarked 916 & 750 • 7-Day Exchange Policy'}
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#EDE5D7]/90">
            <span className="text-[#DFCA8F] font-medium tracking-wide">Mehdipatnam X Road, Hyderabad</span>
          </div>
        </div>
      </div>
      <div
        className={`w-full transition-all duration-300 ${isScrolled ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-[#C6A15B]/30 py-2.5' : 'bg-[#FAF7F2] border-b border-[#EDE5D7] py-3.5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-[#071F1B] hover:text-[#09231E] transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#071F1B] hover:text-[#09231E] transition-colors cursor-pointer"
              aria-label="Search jewellery"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.slice(0, 3).map((Z) => (
              <button
                onClick={() => {
                  onNavigate(Z.page);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
                className={`text-[13px] tracking-[0.2em] font-medium transition-all duration-200 relative py-1 cursor-pointer ${currentPage === Z.page ? 'text-[#071F1B] font-semibold' : 'text-[#171A19]/80 hover:text-[#071F1B]'}`}
                key={Z.page}
              >
                {Z.label}
                {currentPage === Z.page && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C6A15B]" />}
              </button>
            ))}
          </nav>
          <div
            onClick={handleLogoTap}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none py-1"
            title="Urooj Gold & Diamonds (Official Showroom)"
          >
            <div className="relative">
              <img
                src={CONFIG.logoUrl}
                alt="Urooj Gold & Diamonds Official Insignia"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#C6A15B]/70 shadow-[0_2px_10px_rgba(198,161,91,0.25)] group-hover:scale-105 transition-all duration-300 ring-1 ring-[#DFCA8F]/40"
                onError={(Z) => {
                  const De = Z.currentTarget;
                  if (De.src !== CONFIG.logoUrlRemote) {
                    De.src = CONFIG.logoUrlRemote;
                  }
                }}
              />
            </div>
            <div className="flex flex-col items-start justify-center text-left">
              <span className="text-xl sm:text-2xl lg:text-3xl font-serif font-semibold tracking-[0.2em] text-[#071F1B] group-hover:text-[#09231E] transition-colors uppercase leading-none">
                UROOJ
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[8px] sm:text-[9.5px] font-sans tracking-[0.3em] text-[#A9823D] font-semibold uppercase leading-none">
                  GOLD & DIAMONDS
                </span>
              </div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.slice(3).map((Z) => (
              <button
                onClick={() => {
                  onNavigate(Z.page);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
                className={`text-[13px] tracking-[0.2em] font-medium transition-all duration-200 relative py-1 cursor-pointer ${currentPage === Z.page ? 'text-[#071F1B] font-semibold' : 'text-[#171A19]/80 hover:text-[#071F1B]'}`}
                key={Z.page}
              >
                {Z.label}
                {currentPage === Z.page && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C6A15B]" />}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2.5">
            {onOpenSizeGuide && (
              <button
                onClick={onOpenSizeGuide}
                className="hidden xl:flex items-center gap-1 text-[11px] text-[#071F1B] hover:text-[#09231E] px-2.5 py-1.5 rounded-lg border border-[#EDE5D7] hover:border-[#C6A15B] transition-colors cursor-pointer mr-1"
                title="Ring & Bangle Sizing Guide"
              >
                <RulerIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span className="font-medium">Size Guide</span>
              </button>
            )}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="hidden lg:flex p-2 text-[#071F1B] hover:text-[#09231E] hover:bg-[#EDE5D7]/50 rounded-full transition-colors cursor-pointer"
              aria-label="Search"
              title="Search collection"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            <button
              id="header-account-btn"
              onClick={onOpenAccount}
              className="p-1.5 sm:p-2 text-[#071F1B] hover:text-[#09231E] hover:bg-[#EDE5D7]/50 rounded-full transition-colors cursor-pointer relative flex items-center gap-1.5"
              aria-label="User Account"
              title={user ? `Signed in as ${profile?.fullName || user.email}` : 'My Account'}
            >
              <div className="relative">
                <UserIcon className="w-5 h-5" />
                {user && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white ring-1 ring-emerald-600" />
                )}
              </div>
              {user && (
                <span className="hidden xl:inline text-[11px] font-bold text-[#071F1B] max-w-[80px] truncate">
                  {(profile?.fullName || user.email?.split('@')[0])?.split(' ')[0]}
                </span>
              )}
            </button>
            <button
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2 text-[#071F1B] hover:text-[#09231E] hover:bg-[#EDE5D7]/50 rounded-full transition-colors relative cursor-pointer"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <HeartIcon className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#071F1B] text-[#DFCA8F] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-[#C6A15B]">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="p-2 text-[#071F1B] hover:text-[#09231E] hover:bg-[#EDE5D7]/50 rounded-full transition-colors relative cursor-pointer"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#C6A15B] text-[#071F1B] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-[#071F1B]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FAF7F2] h-full shadow-2xl z-10 flex flex-col justify-between border-r border-[#C6A15B]/30 animate-in slide-in-from-left duration-300">
            <div>
              <div className="p-5 border-b border-[#EDE5D7] flex items-center justify-between bg-[#071F1B] text-[#F7F3EA]">
                <div className="flex items-center gap-3">
                  <img
                    src={CONFIG.logoUrl}
                    alt="Urooj Gold & Diamonds"
                    className="w-10 h-10 rounded-full object-cover border border-[#C6A15B] shadow-md ring-1 ring-[#DFCA8F]/50"
                    onError={(Z) => {
                      const De = Z.currentTarget;
                      if (De.src !== CONFIG.logoUrlRemote) {
                        De.src = CONFIG.logoUrlRemote;
                      }
                    }}
                  />
                  <div>
                    <h3 className="font-serif text-lg tracking-widest text-[#F7F3EA] leading-tight">UROOJ</h3>
                    <p className="text-[9px] tracking-[0.25em] text-[#DFCA8F] font-semibold">GOLD & DIAMONDS</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-[#EDE5D7] hover:text-[#DFCA8F] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4 space-y-1">
                {navItems.map((Z) => (
                  <button
                    onClick={() => {
                      onNavigate(Z.page);
                      setIsMobileMenuOpen(false);
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm tracking-widest uppercase flex items-center justify-between transition-colors cursor-pointer ${currentPage === Z.page ? 'bg-[#09231E] text-[#DFCA8F] font-semibold border border-[#C6A15B]/40' : 'text-[#071F1B] hover:bg-[#EDE5D7]'}`}
                    key={Z.page}
                  >
                    <span>{Z.label}</span>
                    <ArrowRightIcon className="w-4 h-4 text-[#C6A15B]" />
                  </button>
                ))}
              </div>
              <div className="p-4 pt-2 border-t border-[#EDE5D7] space-y-2 text-xs">
                {onOpenGoldCalculator && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenGoldCalculator();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg bg-white border border-[#EDE5D7] flex items-center gap-2 text-[#071F1B] font-medium"
                  >
                    <CalculatorIcon className="w-4 h-4 text-[#071F1B]" />
                    <span>Live Gold Rate Calculator</span>
                  </button>
                )}
                {onOpenSizeGuide && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenSizeGuide();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg bg-white border border-[#EDE5D7] flex items-center gap-2 text-[#071F1B] font-medium"
                  >
                    <RulerIcon className="w-4 h-4 text-[#C6A15B]" />
                    <span>Ring & Bangle Sizing Guide</span>
                  </button>
                )}
                {onOpenPromises && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenPromises();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg bg-white border border-[#EDE5D7] flex items-center gap-2 text-[#071F1B] font-medium"
                  >
                    <ShieldIcon className="w-4 h-4 text-[#C6A15B]" />
                    <span>The 10 Urooj Royal Promises</span>
                  </button>
                )}
              </div>
              <div className="px-4 py-2 border-t border-[#EDE5D7]">
                <a
                  href="https://wa.me/919966162100?text=Hello%20Urooj%20Gold%20%26%20Diamonds%2C%20I%20have%20an%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-xl text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
                >
                  <MessageCircleIcon className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="p-4 bg-[#EDE5D7]/50 border-t border-[#EDE5D7] text-xs text-[#171A19]/70 space-y-1">
              <p className="font-serif italic text-center text-[#071F1B]">"Where Trust Meets Luxury"</p>
              <p className="text-[10px] text-center text-[#6B6862] tracking-wider uppercase">Mehdipatnam X Road, Hyderabad</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
