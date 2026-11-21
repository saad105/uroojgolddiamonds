import React, { useState } from 'react';
import {
  AwardIcon,
  CalendarIcon,
  CheckIcon,
  ChevronRightIcon,
  FileTextIcon,
  HeartIcon,
  MessageCircleIcon,
  RefreshCwIcon,
  RulerIcon,
  ShieldCheckIcon,
  ShieldIcon,
  ShoppingBagIcon,
  StoreIcon,
  TruckIcon,
  XIcon,
} from 'lucide-react';
import { DEFAULT_PRODUCTS } from '../data/store.js';
import { formatINR, productEnquiryMessage, whatsappLink } from '../lib/format.js';
import DeliveryOptions from '../components/DeliveryOptions.jsx';
import ProductCard from '../components/ProductCard.jsx';

const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenAppointment,
  onSelectRelatedProduct,
  onQuickView,
  wishlistIds,
  onOpenPriceBreakup,
  onOpenSizeGuide,
  onOpenVideoCall,
  products,
}) => {
  const [C, E] = useState(0),
    [S, k] = useState('specs'),
    [O, T] = useState(false);
  if (!isOpen || !product) {
    return null;
  }
  const R = () => {
      onAddToCart(product);
      T(true);
      setTimeout(() => T(false), 3e3);
    },
    P = product.category.toLowerCase().includes('ring'),
    V = product.category.toLowerCase().includes('bangle') || product.category.toLowerCase().includes('kada'),
    G = (products || DEFAULT_PRODUCTS)
      .filter((X) => X.id !== product.id && (X.category === product.category || X.type === product.type))
      .slice(0, 4);
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F7F3EA] animate-in fade-in duration-300">
      <div className="sticky top-0 z-20 bg-[#F7F3EA]/95 backdrop-blur-md border-b border-[#EDE5D7] px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 text-xs text-[#6B6862]">
          <span className="uppercase tracking-wider font-semibold text-[#30565B]">
            {product.type === 'gold' ? '22K GOLD JEWELLERY' : 'CERTIFIED DIAMONDS'}
          </span>
          <ChevronRightIcon className="w-3.5 h-3.5" />
          <span className="truncate max-w-[200px] sm:max-w-md font-medium text-[#183C40]">{product.name}</span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#183C40] text-[#F7F3EA] hover:bg-[#30565B] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer shadow-xs"
        >
          <XIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Close Product</span>
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#EDE5D7] relative shadow-lg">
              <img
                src={product.images[C] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-[#183C40] text-[#F7F3EA] text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded shadow-md border border-[#C6A15B]">
                  {product.purity} {product.type === 'diamond' ? 'DIAMOND' : 'GOLD'}
                </span>
                {product.collection && (
                  <span className="bg-[#30565B] text-[#F7F3EA] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded shadow">
                    {product.collection}
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] bg-black/60 backdrop-blur-md text-[#F7F3EA] px-3 py-1.5 rounded-lg border border-white/20">
                <span className="flex items-center gap-1">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                  100% BIS 916 Hallmarked
                </span>
                <span>•</span>
                <span>0% Deduction Old Gold</span>
                <span>•</span>
                <span>Free Insured Delivery</span>
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((X, W) => (
                  <button
                    onClick={() => E(W)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${C === W ? 'border-[#30565B] ring-2 ring-[#C6A15B]/40 shadow-md scale-102' : 'border-[#EDE5D7] opacity-70 hover:opacity-100'}`}
                    key={W}
                  >
                    <img src={X} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <div className="bg-white rounded-2xl p-5 border border-[#EDE5D7] space-y-3">
              <span className="text-xs font-serif font-bold text-[#183C40] tracking-wider uppercase block">
                The Urooj Assurance Suite
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#EDE5D7]/80">
                  <ShieldCheckIcon className="w-5 h-5 text-[#30565B] mx-auto mb-1" />
                  <span className="font-semibold text-[#183C40] block text-[11px]">100% BIS 916</span>
                  <span className="text-[10px] text-[#6B6862]">6-Digit HUID</span>
                </div>
                <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#EDE5D7]/80">
                  <RefreshCwIcon className="w-5 h-5 text-[#30565B] mx-auto mb-1" />
                  <span className="font-semibold text-[#183C40] block text-[11px]">100% Exchange</span>
                  <span className="text-[10px] text-[#6B6862]">18k & 22k / 916</span>
                </div>
                <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#EDE5D7]/80">
                  <AwardIcon className="w-5 h-5 text-[#30565B] mx-auto mb-1" />
                  <span className="font-semibold text-[#183C40] block text-[11px]">Free Lifetime</span>
                  <span className="text-[10px] text-[#6B6862]">Cleaning & Care</span>
                </div>
                <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#EDE5D7]/80">
                  <TruckIcon className="w-5 h-5 text-[#30565B] mx-auto mb-1" />
                  <span className="font-semibold text-[#183C40] block text-[11px]">100% Insured</span>
                  <span className="text-[10px] text-[#6B6862]">Doorstep Delivery</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs text-[#6B6862] tracking-wider uppercase mb-1">
                <span className="text-[#30565B] font-semibold">{product.category}</span>
                <span className="font-mono">
                  {'SKU: '}
                  {product.sku}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif text-[#183C40] leading-tight">{product.name}</h1>
              <p className="text-sm text-[#171A19]/80 mt-3 font-light leading-relaxed">{product.description}</p>
            </div>
            <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#EDE5D7] shadow-sm space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold font-serif text-[#183C40]">{formatINR(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-base text-[#6B6862] line-through">{formatINR(product.originalPrice)}</span>
                  )}
                </div>
                {onOpenPriceBreakup && (
                  <button
                    onClick={() => onOpenPriceBreakup(product)}
                    className="flex items-center gap-1.5 text-xs text-[#30565B] hover:text-[#183C40] font-semibold underline underline-offset-4 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-[#C6A15B]/40 shadow-2xs"
                  >
                    <FileTextIcon className="w-4 h-4 text-[#C6A15B]" />
                    <span>View Transparent Price Breakup</span>
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between text-[11px] text-[#6B6862] pt-2 border-t border-[#EDE5D7] gap-2">
                <span>Inclusive of 3% GST (HSN 7113)</span>
                <span className="text-emerald-700 font-medium">Up to 40% Off Making Charge Applied</span>
              </div>
            </div>
            {(P || V) && onOpenSizeGuide && (
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#EDE5D7] text-xs">
                <button
                  onClick={() => onOpenSizeGuide(P ? 'ring' : 'bangle')}
                  className="flex items-center gap-1.5 text-[#30565B] hover:text-[#183C40] font-semibold underline underline-offset-2 cursor-pointer"
                >
                  <RulerIcon className="w-4 h-4 text-[#C6A15B]" />
                  <span>{P ? 'Ring Sizing Guide' : 'Bangle Sizing Guide'}</span>
                </button>
                <span className="text-[11px] text-[#6B6862]">Indian Standard Sizing</span>
              </div>
            )}
            <DeliveryOptions />
            <div className="space-y-3 pt-1">
              {O && (
                <div className="bg-[#30565B] text-[#F7F3EA] p-3 rounded-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <CheckIcon className="w-4 h-4 text-[#C6A15B]" />
                  <span>Item added to your shopping bag!</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={R}
                  className="w-full bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-xs font-semibold tracking-wider uppercase py-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <ShoppingBagIcon className="w-4 h-4 text-[#C6A15B]" />
                  <span>ADD TO BAG</span>
                </button>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`w-full py-4 rounded-xl text-xs font-semibold tracking-wider uppercase border flex items-center justify-center gap-2 transition-all cursor-pointer ${isWishlisted ? 'bg-[#183C40] text-[#F7F3EA] border-[#183C40]' : 'bg-white text-[#183C40] border-[#EDE5D7] hover:border-[#C6A15B]'}`}
                >
                  <HeartIcon className={`w-4 h-4 ${isWishlisted ? 'fill-[#C6A15B] text-[#C6A15B]' : ''}`} />
                  <span>{isWishlisted ? 'SAVED TO WISHLIST' : 'SAVE TO WISHLIST'}</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onOpenAppointment(product)}
                  className="w-full bg-white hover:bg-[#FAF7F2] text-[#183C40] border border-[#C6A15B] text-xs font-semibold tracking-wider uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <CalendarIcon className="w-4 h-4 text-[#30565B]" />
                  <span>BOOK STORE VIEWING</span>
                </button>
                <a
                  href={whatsappLink(productEnquiryMessage(product.name, product.sku, product.price, product.purity))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wider uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-center shadow-xs"
                >
                  <MessageCircleIcon className="w-4 h-4" />
                  <span>ENQUIRE ABOUT THIS</span>
                </a>
              </div>
            </div>
            <div className="pt-4 border-t border-[#EDE5D7] space-y-4">
              <div className="flex border-b border-[#EDE5D7] overflow-x-auto gap-4">
                <button
                  onClick={() => k('specs')}
                  className={`pb-3 text-xs font-semibold tracking-wider uppercase transition-colors relative cursor-pointer whitespace-nowrap ${S === 'specs' ? 'text-[#30565B]' : 'text-[#6B6862] hover:text-[#183C40]'}`}
                >
                  Specifications{S === 'specs' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C6A15B]" />}
                </button>
                <button
                  onClick={() => k('delivery')}
                  className={`pb-3 text-xs font-semibold tracking-wider uppercase transition-colors relative cursor-pointer whitespace-nowrap ${S === 'delivery' ? 'text-[#30565B]' : 'text-[#6B6862] hover:text-[#183C40]'}`}
                >
                  Delivery & Inspection
                  {S === 'delivery' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C6A15B]" />}
                </button>
                <button
                  onClick={() => k('care')}
                  className={`pb-3 text-xs font-semibold tracking-wider uppercase transition-colors relative cursor-pointer whitespace-nowrap ${S === 'care' ? 'text-[#30565B]' : 'text-[#6B6862] hover:text-[#183C40]'}`}
                >
                  Lifetime Care{S === 'care' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C6A15B]" />}
                </button>
                <button
                  onClick={() => k('promises')}
                  className={`pb-3 text-xs font-semibold tracking-wider uppercase transition-colors relative cursor-pointer whitespace-nowrap ${S === 'promises' ? 'text-[#30565B]' : 'text-[#6B6862] hover:text-[#183C40]'}`}
                >
                  Royal Promises{S === 'promises' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C6A15B]" />}
                </button>
              </div>
              {S === 'specs' && (
                <div className="bg-white rounded-xl border border-[#EDE5D7] p-4 text-xs space-y-2.5">
                  <div className="flex justify-between py-1 border-b border-[#EDE5D7]/50">
                    <span className="text-[#6B6862]">Precious Metal</span>
                    <span className="font-semibold text-[#183C40]">{product.metal}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EDE5D7]/50">
                    <span className="text-[#6B6862]">Gold Purity</span>
                    <span className="font-semibold text-[#183C40]">
                      {product.purity}
                      {' BIS Hallmarked (916)'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EDE5D7]/50">
                    <span className="text-[#6B6862]">Gross Approx Weight</span>
                    <span className="font-semibold text-[#183C40]">{product.approxWeight}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EDE5D7]/50">
                    <span className="text-[#6B6862]">Net Gold Weight</span>
                    <span className="font-semibold text-[#30565B]">{product.netGoldWeight || product.approxWeight}</span>
                  </div>
                  {product.diamondDetails && (
                    <>
                      <div className="flex justify-between py-1 border-b border-[#EDE5D7]/50">
                        <span className="text-[#6B6862]">Diamond Carat</span>
                        <span className="font-semibold text-[#183C40]">
                          {product.diamondDetails.carat}
                          {' Carat Total'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#EDE5D7]/50">
                        <span className="text-[#6B6862]">Diamond Shape & Cut</span>
                        <span className="font-semibold text-[#183C40]">
                          {product.diamondDetails.shape}
                          {' • '}
                          {product.diamondDetails.cut}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#EDE5D7]/50">
                        <span className="text-[#6B6862]">Color & Clarity</span>
                        <span className="font-semibold text-[#183C40]">
                          {product.diamondDetails.color}
                          {' • '}
                          {product.diamondDetails.clarity}
                        </span>
                      </div>
                    </>
                  )}
                  {product.stoneDetails && (
                    <div className="flex justify-between py-1">
                      <span className="text-[#6B6862]">Gemstone Accent</span>
                      <span className="font-semibold text-[#183C40]">{product.stoneDetails}</span>
                    </div>
                  )}
                </div>
              )}
              {S === 'delivery' && (
                <div className="bg-white rounded-xl border border-[#EDE5D7] p-4 text-xs space-y-3">
                  <div className="flex items-start gap-3">
                    <TruckIcon className="w-4 h-4 text-[#30565B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#183C40] block">Complimentary Insured Delivery</span>
                      <p className="text-[#6B6862] text-[11px] leading-relaxed">
                        {product.deliveryInfo ||
                          'Dispatches within 3-4 business days via dedicated high-value courier with 100% door-to-door transit insurance and adult signature handover.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <StoreIcon className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#183C40] block">Same-Day Showroom Inspection</span>
                      <p className="text-[#6B6862] text-[11px]">
                        Available for private viewings and immediate collection at our flagship showroom in Mehdipatnam X Road,
                        Hyderabad.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {S === 'care' && (
                <div className="bg-white rounded-xl border border-[#EDE5D7] p-4 text-xs space-y-2 text-[#171A19]/80 font-light">
                  <p>
                    <strong>Handling:</strong>{' '}
                    {product.careInstructions ||
                      'Store individually in velvet lined cases. Clean gently with a soft microfibre cloth.'}
                  </p>
                  <p>
                    <strong>Storage:</strong>
                    {' Avoid exposing directly to perfumes, chemical bleaches, or chlorinated pool water.'}
                  </p>
                  <p>
                    <strong>Complimentary Service:</strong>
                    {
                      ' Enjoy complimentary lifelong cleaning, prong tightening, and ultrasonic inspection at our Mehdipatnam flagship showroom.'
                    }
                  </p>
                </div>
              )}
              {S === 'promises' && (
                <div className="bg-white rounded-xl border border-[#EDE5D7] p-4 text-xs space-y-2 text-[#171A19]/85">
                  <div className="flex items-center gap-2 text-[#183C40] font-semibold">
                    <ShieldIcon className="w-4 h-4 text-[#C6A15B]" />
                    <span>Backed by the 10 Urooj Royal Promises:</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-[11px] text-[#6B6862]">
                    <li>Complete itemized price transparency (net gold weight billing)</li>
                    <li>100% Value on Old Gold Exchange (0% deduction)</li>
                    <li>100% BIS 916 Pure Gold with 6-digit HUID code</li>
                    <li>Tested & certified natural diamonds with 28-point QC</li>
                    <li>Guaranteed buyback policy with direct bank transfer</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {G.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#EDE5D7]">
            <div className="text-center mb-8">
              <span className="text-[11px] font-semibold tracking-widest text-[#C6A15B] uppercase block mb-1">
                Curated Companions
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#183C40]">You May Also Admire</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {G.map((X) => (
                <ProductCard
                  product={X}
                  isWishlisted={wishlistIds.includes(X.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickView={onQuickView}
                  onSelectProduct={(W) => {
                    onSelectRelatedProduct(W);
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  onOpenAppointment={onOpenAppointment}
                  key={X.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailModal;
