import React, { useState } from 'react';
import {
  ArrowRightIcon,
  CalendarIcon,
  FileTextIcon,
  HeartIcon,
  MessageCircleIcon,
  RulerIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  XIcon,
} from 'lucide-react';
import { formatINR, productEnquiryMessage, whatsappLink } from '../lib/format.js';

const QuickViewModal = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenAppointment,
  onViewFullDetails,
  onOpenPriceBreakup,
  onOpenSizeGuide,
  onOpenVideoCall,
}) => {
  const [g, v] = useState(0);
  if (!isOpen || !product) {
    return null;
  }
  const w = product.category.toLowerCase().includes('ring') || product.category.toLowerCase().includes('bangle');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-2xl border border-[#C6A15B]/40 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#183C40]/80 text-[#F7F3EA] hover:bg-[#183C40] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <XIcon className="w-5 h-5" />
        </button>
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6 space-y-4">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#EDE5D7]/50 border border-[#EDE5D7] relative shadow-inner">
                <img
                  src={product.images[g] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-[#183C40] text-[#F7F3EA] text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded border border-[#C6A15B] shadow">
                  {product.purity} {product.type === 'diamond' ? 'DIAMOND' : 'GOLD'}
                </div>
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((C, E) => (
                    <button
                      onClick={() => v(E)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${g === E ? 'border-[#30565B] shadow-md scale-105' : 'border-[#EDE5D7] opacity-70 hover:opacity-100'}`}
                      key={E}
                    >
                      <img src={C} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between text-[11px] text-[#183C40] bg-white p-2.5 rounded-lg border border-[#EDE5D7]">
                <div className="flex items-center gap-1">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-[#30565B]" />
                  <span>100% BIS 916 HUID</span>
                </div>
                <span>•</span>
                <div>0% Old Gold Deduction</div>
                <span>•</span>
                <div>Free Insured Delivery</div>
              </div>
            </div>
            <div className="md:col-span-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B6862] tracking-wider uppercase mb-1">
                  <span>{product.category}</span>
                  <span className="font-mono">
                    {'SKU: '}
                    {product.sku}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#183C40] leading-snug">{product.name}</h2>
                <p className="text-xs text-[#171A19]/75 mt-1 font-light leading-relaxed">
                  {product.shortDescription || product.description}
                </p>
              </div>
              <div className="p-4 bg-[#EDE5D7]/40 rounded-xl border border-[#EDE5D7]">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold font-serif text-[#183C40]">{formatINR(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#6B6862] line-through">{formatINR(product.originalPrice)}</span>
                    )}
                  </div>
                  {onOpenPriceBreakup && (
                    <button
                      onClick={() => onOpenPriceBreakup(product)}
                      className="text-xs text-[#30565B] hover:text-[#183C40] font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                    >
                      <FileTextIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>Price Breakup</span>
                    </button>
                  )}
                </div>
                <span className="text-[11px] text-[#A9823D] tracking-wider uppercase block mt-1">
                  Includes 3% GST, Luxury Velvet Box & BIS Hallmarking
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-[#EDE5D7]">
                  <span className="text-[#6B6862] block text-[10px] uppercase">Gold Purity</span>
                  <span className="font-semibold text-[#183C40]">
                    {product.purity}
                    {' ('}
                    {product.metal})
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-[#EDE5D7]">
                  <span className="text-[#6B6862] block text-[10px] uppercase">Approx Weight</span>
                  <span className="font-semibold text-[#183C40]">{product.approxWeight}</span>
                </div>
                {product.diamondDetails && (
                  <>
                    <div className="p-2.5 bg-white rounded-lg border border-[#EDE5D7]">
                      <span className="text-[#6B6862] block text-[10px] uppercase">Diamond Carat & Cut</span>
                      <span className="font-semibold text-[#183C40]">
                        {product.diamondDetails.carat}
                        {' ct • '}
                        {product.diamondDetails.cut}
                      </span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-[#EDE5D7]">
                      <span className="text-[#6B6862] block text-[10px] uppercase">Clarity & Color</span>
                      <span className="font-semibold text-[#183C40]">
                        {product.diamondDetails.clarity}
                        {' • '}
                        {product.diamondDetails.color}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3 pt-1 text-xs">
                {onOpenSizeGuide && w && (
                  <button
                    onClick={() => onOpenSizeGuide(product.category.toLowerCase().includes('ring') ? 'ring' : 'bangle')}
                    className="flex items-center gap-1.5 text-[#30565B] hover:text-[#183C40] font-semibold underline underline-offset-2 cursor-pointer"
                  >
                    <RulerIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Check Size Guide</span>
                  </button>
                )}
              </div>
              <div className="space-y-2.5 pt-2">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-xs font-semibold tracking-wider uppercase py-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <ShoppingBagIcon className="w-4 h-4 text-[#C6A15B]" />
                    <span>ADD TO BAG</span>
                  </button>
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`w-full py-3 rounded-xl text-xs font-semibold tracking-wider uppercase border flex items-center justify-center gap-2 transition-all cursor-pointer ${isWishlisted ? 'bg-[#183C40] text-[#F7F3EA] border-[#183C40]' : 'bg-white text-[#183C40] border-[#EDE5D7] hover:border-[#C6A15B]'}`}
                  >
                    <HeartIcon className={`w-4 h-4 ${isWishlisted ? 'fill-[#C6A15B] text-[#C6A15B]' : ''}`} />
                    <span>{isWishlisted ? 'IN WISHLIST' : 'WISHLIST'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAppointment(product);
                    }}
                    className="w-full bg-white hover:bg-[#EDE5D7]/50 text-[#183C40] border border-[#C6A15B] text-xs font-semibold tracking-wider uppercase py-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <CalendarIcon className="w-4 h-4 text-[#30565B]" />
                    <span>BOOK VIEWING</span>
                  </button>
                  <a
                    href={whatsappLink(productEnquiryMessage(product.name, product.sku, product.price, product.purity))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wider uppercase py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-center shadow-xs"
                  >
                    <MessageCircleIcon className="w-4 h-4" />
                    <span>ENQUIRE ABOUT THIS</span>
                  </a>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onViewFullDetails(product);
                  }}
                  className="w-full text-center text-xs text-[#30565B] hover:text-[#183C40] font-semibold tracking-wider uppercase pt-2 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>VIEW COMPLETE PRODUCT SPECIFICATIONS</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
