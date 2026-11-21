import React from 'react';
import { HeartIcon, MessageCircleIcon, ShoppingBagIcon, Trash2Icon, XIcon } from 'lucide-react';
import { formatINR, productEnquiryMessage, whatsappLink } from '../lib/format.js';

const WishlistDrawer = ({ isOpen, onClose, wishlistProducts, onRemoveFromWishlist, onMoveToCart, onSelectProduct }) =>
  isOpen ? (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#EDE5D7] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          <div className="p-5 sm:p-6 bg-[#183C40] text-[#F7F3EA] flex items-center justify-between border-b border-[#C6A15B]/30">
            <div className="flex items-center gap-2">
              <HeartIcon className="w-5 h-5 text-[#DFCA8F] fill-[#DFCA8F]" />
              <h3 className="font-serif text-xl tracking-wider text-[#F7F3EA]">MY WISHLIST ({wishlistProducts.length})</h3>
            </div>
            <button onClick={onClose} className="p-1 text-[#EDE5D7] hover:text-[#C6A15B] transition-colors">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <HeartIcon className="w-12 h-12 text-[#6B6862]/30 mx-auto" />
                <h4 className="font-serif text-lg text-[#183C40]">No Saved Pieces Yet</h4>
                <p className="text-xs text-[#6B6862] max-w-xs mx-auto font-light">
                  Tap the heart icon on any gold or diamond creation to curate your personal wish list.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-[#30565B] text-[#F7F3EA] text-xs font-semibold px-5 py-2.5 rounded-lg tracking-wider uppercase"
                >
                  DISCOVER CREATIONS
                </button>
              </div>
            ) : (
              wishlistProducts.map((u) => (
                <div className="bg-white rounded-xl p-3.5 border border-[#EDE5D7] shadow-xs flex gap-3.5 items-start" key={u.id}>
                  <img
                    src={u.images[0]}
                    alt={u.name}
                    onClick={() => {
                      onClose();
                      onSelectProduct(u);
                    }}
                    className="w-20 h-20 rounded-lg object-cover bg-[#EDE5D7]/50 cursor-pointer shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4
                        onClick={() => {
                          onClose();
                          onSelectProduct(u);
                        }}
                        className="font-serif text-sm font-semibold text-[#183C40] truncate hover:text-[#30565B] cursor-pointer"
                      >
                        {u.name}
                      </h4>
                      <button onClick={() => onRemoveFromWishlist(u)} className="text-[#6B6862] hover:text-red-700 p-1">
                        <Trash2Icon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-[#A9823D] font-medium block">
                      {u.purity}
                      {' • '}
                      {u.approxWeight}
                    </span>
                    <span className="font-serif font-bold text-sm text-[#183C40] block">{formatINR(u.price)}</span>
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          onMoveToCart(u);
                          onRemoveFromWishlist(u);
                        }}
                        className="flex-1 bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-[11px] font-semibold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBagIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                        <span>MOVE TO BAG</span>
                      </button>
                      <a
                        href={whatsappLink(productEnquiryMessage(u.name, u.sku, u.price, u.purity))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-[#183C40] text-[#DFCA8F] rounded-lg hover:bg-[#0e2528] transition-colors"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircleIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {wishlistProducts.length > 0 && (
            <div className="p-5 bg-white border-t border-[#EDE5D7]">
              <button
                onClick={() => {
                  wishlistProducts.forEach((u) => onMoveToCart(u));
                  onClose();
                }}
                className="w-full bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-xs font-semibold tracking-wider uppercase py-3.5 rounded-xl shadow-md transition-colors"
              >
                MOVE ALL ITEMS TO BAG
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

export default WishlistDrawer;
