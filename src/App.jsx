import React, { useState, useEffect } from 'react';
import { useAuth } from './lib/AuthContext.jsx';
import { getAnnouncement, getOffers, getProducts, getRates, startLiveSync, subscribeStore } from './lib/store.js';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import GoldPage from './pages/GoldPage.jsx';
import DiamondsPage from './pages/DiamondsPage.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import Footer from './components/Footer.jsx';
import QuickViewModal from './modals/QuickViewModal.jsx';
import ProductDetailModal from './modals/ProductDetailModal.jsx';
import PriceBreakupModal from './modals/PriceBreakupModal.jsx';
import GoldCalculatorModal from './modals/GoldCalculatorModal.jsx';
import SizeGuideModal from './modals/SizeGuideModal.jsx';
import VideoCallModal from './modals/VideoCallModal.jsx';
import SavingsPlanModal from './modals/SavingsPlanModal.jsx';
import AppointmentModal from './modals/AppointmentModal.jsx';
import CustomDesignModal from './modals/CustomDesignModal.jsx';
import CartDrawer from './modals/CartDrawer.jsx';
import WishlistDrawer from './modals/WishlistDrawer.jsx';
import AccountModal from './modals/AccountModal.jsx';
import SearchModal from './modals/SearchModal.jsx';
import PoliciesPage from './pages/PoliciesPage.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import WelcomeAnnouncement from './components/WelcomeAnnouncement.jsx';
import AdminPanel from './admin/AdminPanel.jsx';

function App() {
  const { user, fetchUserWishlist, saveWishlistToCloud, fetchUserCart, saveCartToCloud } = useAuth(),
    [currentPage, setCurrentPage] = useState('home'),
    [initialCategory, setInitialCategory] = useState(undefined),
    [isAdminOpen, setIsAdminOpen] = useState(false),
    [products, setProducts] = useState(() => getProducts()),
    [liveRates, setLiveRates] = useState(() => getRates()),
    [offersConfig, setOffersConfig] = useState(() => getOffers()),
    [announcement, setAnnouncement] = useState(() => getAnnouncement());
  useEffect(() => {
    const J = () => {
        setProducts(getProducts());
        setLiveRates(getRates());
        setOffersConfig(getOffers());
        setAnnouncement(getAnnouncement());
      },
      ke = subscribeStore(J),
      He = startLiveSync(J);
    return () => {
      ke();
      He();
    };
  }, []);
  useEffect(() => {
    const J = () => {
      const mt = window.location.hash.toLowerCase(),
        ra = window.location.search.toLowerCase();
      if (mt === '#kernal009' || mt.includes('kernal009') || ra.includes('kernal009') || ra.includes('k009')) {
        setIsAdminOpen(true);
        try {
          window.history.replaceState(null, '', window.location.pathname);
        } catch {}
      }
    };
    J();
    const ke = () => {
      J();
    };
    let He = '',
      ft = null;
    const Je = (mt) => {
      var nt;
      if ((mt.ctrlKey || mt.metaKey) && mt.shiftKey && (mt.key === 'K' || mt.key === 'k')) {
        mt.preventDefault();
        setIsAdminOpen((zt) => !zt);
        return;
      }
      if (mt.altKey && (mt.key === 'k' || mt.key === 'K')) {
        mt.preventDefault();
        setIsAdminOpen((zt) => !zt);
        return;
      }
      const ra = (document.activeElement?.tagName || '').toLowerCase();
      if (ra !== 'input' && ra !== 'textarea') {
        He += mt.key.toLowerCase();
        if (He.includes('kernal009') || He.includes('k009')) {
          He = '';
          setIsAdminOpen(true);
        }
        clearTimeout(ft);
        ft = setTimeout(() => {
          He = '';
        }, 2500);
      }
    };
    window.addEventListener('hashchange', ke);
    window.addEventListener('keydown', Je);
    return () => {
      window.removeEventListener('hashchange', ke);
      window.removeEventListener('keydown', Je);
      clearTimeout(ft);
    };
  }, []);
  const [showAnnouncement, setShowAnnouncement] = useState(() => {
      try {
        return sessionStorage.getItem('urooj_announcement_overlay_dismissed') !== 'true';
      } catch {
        return true;
      }
    }),
    closeAnnouncement = () => {
      setShowAnnouncement(false);
      try {
        sessionStorage.setItem('urooj_announcement_overlay_dismissed', 'true');
      } catch {}
    },
    [wishlistIds, setWishlistIds] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem('urooj_wishlist') || '[]');
      } catch {
        return [];
      }
    }),
    [cartItems, setCartItems] = useState(() => {
      try {
        const J = localStorage.getItem('urooj_cart');
        if (J) {
          return JSON.parse(J);
        }
      } catch {}
      return [];
    }),
    [quickViewProduct, setQuickViewProduct] = useState(null),
    [selectedProduct, setSelectedProduct] = useState(null),
    [appointmentProduct, setAppointmentProduct] = useState(null),
    [priceBreakupProduct, setPriceBreakupProduct] = useState(null),
    [videoCallProduct, setVideoCallProduct] = useState(null),
    [isAppointmentOpen, setIsAppointmentOpen] = useState(false),
    [isCustomDesignOpen, setIsCustomDesignOpen] = useState(false),
    [isCartOpen, setIsCartOpen] = useState(false),
    [isWishlistOpen, setIsWishlistOpen] = useState(false),
    [isAccountOpen, setIsAccountOpen] = useState(false),
    [isSearchOpen, setIsSearchOpen] = useState(false),
    [policySection, setPolicySection] = useState('regulatory'),
    [policyScrollRequest, setPolicyScrollRequest] = useState(0),
    [isCalculatorOpen, setIsCalculatorOpen] = useState(false),
    [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false),
    [sizeGuideTab, setSizeGuideTab] = useState('ring'),
    [isVideoCallOpen, setIsVideoCallOpen] = useState(false),
    [isSavingsPlanOpen, setIsSavingsPlanOpen] = useState(false),
    // Policy links open the Policies page and scroll to the requested section
    openLegalModal = (section = 'regulatory') => {
      setPolicySection(section);
      setPolicyScrollRequest((n) => n + 1);
      setCurrentPage('policies');
    },
    openSizeGuide = (J = 'ring') => {
      setSizeGuideTab(J);
      setIsSizeGuideOpen(true);
    },
    openVideoCall = (J) => {
      setVideoCallProduct(J || null);
      setIsVideoCallOpen(true);
    },
    openPriceBreakup = (J) => {
      setPriceBreakupProduct(J);
    },
    scrollToPromises = () => {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          window.scrollTo({
            top: 1200,
            behavior: 'smooth',
          });
        }, 100);
      } else {
        window.scrollTo({
          top: 1200,
          behavior: 'smooth',
        });
      }
    };
  useEffect(() => {
    try {
      localStorage.setItem('urooj_wishlist', JSON.stringify(wishlistIds));
    } catch (J) {
      console.error(J);
    }
  }, [wishlistIds]);
  useEffect(() => {
    try {
      localStorage.setItem('urooj_cart', JSON.stringify(cartItems));
    } catch (J) {
      console.error(J);
    }
  }, [cartItems]);
  useEffect(() => {
    if (user) {
      fetchUserWishlist().then((J) => {
        if (J && J.length > 0) {
          setWishlistIds((ke) => {
            const He = Array.from(new Set([...J, ...ke]));
            saveWishlistToCloud(He);
            return He;
          });
        } else if (wishlistIds.length > 0) {
          saveWishlistToCloud(wishlistIds);
        }
      });
      fetchUserCart(products).then((J) => {
        if (J && J.length > 0) {
          setCartItems((ke) => {
            const He = new Map();
            J.forEach((Je) => He.set(Je.product.id, Je));
            ke.forEach((Je) => {
              if (He.has(Je.product.id)) {
                const mt = He.get(Je.product.id);
                He.set(Je.product.id, {
                  ...mt,
                  quantity: Math.max(mt.quantity, Je.quantity),
                });
              } else {
                He.set(Je.product.id, Je);
              }
            });
            const ft = Array.from(He.values());
            saveCartToCloud(ft);
            return ft;
          });
        } else if (cartItems.length > 0) {
          saveCartToCloud(cartItems);
        }
      });
    }
  }, [user]);
  const toggleWishlist = (J) => {
      setWishlistIds((ke) => {
        let He;
        if (ke.includes(J.id)) {
          He = ke.filter((ft) => ft !== J.id);
        } else {
          He = [...ke, J.id];
        }
        if (user) {
          saveWishlistToCloud(He);
        }
        return He;
      });
    },
    wishlistProducts = products.filter((J) => wishlistIds.includes(J.id)),
    addToCart = (J) => {
      setCartItems((ke) => {
        const He = ke.find((Je) => Je.product.id === J.id);
        let ft;
        if (He) {
          ft = ke.map((Je) =>
            Je.product.id === J.id
              ? {
                  ...Je,
                  quantity: Je.quantity + 1,
                }
              : Je,
          );
        } else {
          ft = [
            ...ke,
            {
              product: J,
              quantity: 1,
            },
          ];
        }
        if (user) {
          saveCartToCloud(ft);
        }
        return ft;
      });
    },
    updateCartQuantity = (J, ke) => {
      if (ke <= 0) {
        removeFromCart(J);
      } else {
        setCartItems((He) => {
          const ft = He.map((Je) =>
            Je.product.id === J
              ? {
                  ...Je,
                  quantity: ke,
                }
              : Je,
          );
          if (user) {
            saveCartToCloud(ft);
          }
          return ft;
        });
      }
    },
    removeFromCart = (J) => {
      setCartItems((ke) => {
        const He = ke.filter((ft) => ft.product.id !== J);
        if (user) {
          saveCartToCloud(He);
        }
        return He;
      });
    },
    navigate = (J, ke) => {
      setCurrentPage(J);
      setInitialCategory(ke);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    openAppointment = (J) => {
      setAppointmentProduct(J || null);
      setIsAppointmentOpen(true);
    };
  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#171A19] flex flex-col font-sans selection:bg-[#30565B] selection:text-[#DFCA8F]">
      <Header
        currentPage={currentPage}
        onNavigate={navigate}
        wishlistCount={wishlistIds.length}
        cartCount={cartItems.reduce((J, ke) => J + ke.quantity, 0)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenAppointment={() => openAppointment()}
        onOpenGoldCalculator={() => setIsCalculatorOpen(true)}
        onOpenPromises={scrollToPromises}
        onOpenSizeGuide={() => openSizeGuide('ring')}
        onOpenSavingsPlan={() => setIsSavingsPlanOpen(true)}
        onOpenVideoCall={() => openVideoCall()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        liveRates={liveRates}
        offersConfig={offersConfig}
      />
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigate}
            onQuickView={(J) => setQuickViewProduct(J)}
            onSelectProduct={(J) => setSelectedProduct(J)}
            onToggleWishlist={toggleWishlist}
            onOpenAppointment={openAppointment}
            onOpenLegalModal={openLegalModal}
            onOpenGoldCalculator={() => setIsCalculatorOpen(true)}
            onOpenPromises={scrollToPromises}
            onOpenSavingsPlan={() => setIsSavingsPlanOpen(true)}
            onOpenVideoCall={() => openVideoCall()}
            onOpenSizeGuide={() => openSizeGuide('ring')}
            wishlistIds={wishlistIds}
            products={products}
            liveRates={liveRates}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />
        )}
        {currentPage === 'gold' && (
          <GoldPage
            onQuickView={(J) => setQuickViewProduct(J)}
            onSelectProduct={(J) => setSelectedProduct(J)}
            onToggleWishlist={toggleWishlist}
            onOpenAppointment={openAppointment}
            wishlistIds={wishlistIds}
            initialCategory={initialCategory}
            products={products}
          />
        )}
        {currentPage === 'diamonds' && (
          <DiamondsPage
            onQuickView={(J) => setQuickViewProduct(J)}
            onSelectProduct={(J) => setSelectedProduct(J)}
            onToggleWishlist={toggleWishlist}
            onOpenAppointment={openAppointment}
            wishlistIds={wishlistIds}
            initialCategory={initialCategory}
            products={products}
          />
        )}
        {currentPage === 'collections' && (
          <CollectionsPage
            onQuickView={(J) => setQuickViewProduct(J)}
            onSelectProduct={(J) => setSelectedProduct(J)}
            onToggleWishlist={toggleWishlist}
            onOpenAppointment={openAppointment}
            onOpenCustomModal={() => setIsCustomDesignOpen(true)}
            onNavigate={navigate}
            wishlistIds={wishlistIds}
            products={products}
          />
        )}
        {currentPage === 'about' && <AboutPage onOpenAppointment={() => openAppointment()} onOpenLegalModal={openLegalModal} />}
        {currentPage === 'policies' && <PoliciesPage initialSection={policySection} scrollRequest={policyScrollRequest} />}
      </main>
      <Footer
        onNavigate={navigate}
        onOpenAppointment={() => openAppointment()}
        onOpenCustomModal={() => setIsCustomDesignOpen(true)}
        onOpenLegalModal={openLegalModal}
        onOpenGoldCalculator={() => setIsCalculatorOpen(true)}
        onOpenPromises={scrollToPromises}
        onOpenSizeGuide={() => openSizeGuide('ring')}
        onOpenSavingsPlan={() => setIsSavingsPlanOpen(true)}
        onOpenVideoCall={() => openVideoCall()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={toggleWishlist}
        onAddToCart={(J) => {
          addToCart(J);
          setIsCartOpen(true);
        }}
        onOpenAppointment={openAppointment}
        onViewFullDetails={(J) => {
          setQuickViewProduct(null);
          setSelectedProduct(J);
        }}
        onOpenPriceBreakup={openPriceBreakup}
        onOpenSizeGuide={openSizeGuide}
        onOpenVideoCall={openVideoCall}
      />
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={toggleWishlist}
        onAddToCart={addToCart}
        onOpenAppointment={openAppointment}
        onSelectRelatedProduct={(J) => setSelectedProduct(J)}
        onQuickView={(J) => setQuickViewProduct(J)}
        wishlistIds={wishlistIds}
        onOpenPriceBreakup={openPriceBreakup}
        onOpenSizeGuide={openSizeGuide}
        onOpenVideoCall={openVideoCall}
        products={products}
      />
      <PriceBreakupModal
        product={priceBreakupProduct}
        isOpen={!!priceBreakupProduct}
        onClose={() => setPriceBreakupProduct(null)}
      />
      <GoldCalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} rates={liveRates} />
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} initialTab={sizeGuideTab} />
      <VideoCallModal isOpen={isVideoCallOpen} onClose={() => setIsVideoCallOpen(false)} product={videoCallProduct} />
      <SavingsPlanModal isOpen={isSavingsPlanOpen} onClose={() => setIsSavingsPlanOpen(false)} />
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        initialProduct={appointmentProduct}
      />
      <CustomDesignModal isOpen={isCustomDesignOpen} onClose={() => setIsCustomDesignOpen(false)} />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onOpenAppointment={openAppointment}
        onSelectProduct={(J) => setSelectedProduct(J)}
      />
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={toggleWishlist}
        onMoveToCart={(J) => addToCart(J)}
        onSelectProduct={(J) => setSelectedProduct(J)}
      />
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        wishlistProducts={wishlistProducts}
        cartItems={cartItems}
        onSelectProduct={(J) => setSelectedProduct(J)}
        onOpenAppointment={() => {
          setIsAccountOpen(false);
          setIsAppointmentOpen(true);
        }}
        onOpenCart={() => {
          setIsAccountOpen(false);
          setIsCartOpen(true);
        }}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(J) => setSelectedProduct(J)}
        onQuickView={(J) => setQuickViewProduct(J)}
        products={products}
      />
      <FloatingActions />
      <WelcomeAnnouncement isOpen={showAnnouncement} onClose={closeAnnouncement} data={announcement} />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default App;
