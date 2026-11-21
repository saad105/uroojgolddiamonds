import React from 'react';
import { MessageCircleIcon, MinusIcon, PlusIcon, ShieldCheckIcon, ShoppingBagIcon, Trash2Icon, XIcon } from 'lucide-react';
import { formatINR, whatsappLink } from '../lib/format.js';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onOpenAppointment, onSelectProduct }) => {
  if (!isOpen) {
    return null;
  }
  const m = cartItems.reduce((x, b) => x + b.product.price * b.quantity, 0),
    p = () => {
      let x = `Hello Urooj Gold & Diamonds, I would like to enquire about purchasing the following items in my selection:

`;
      cartItems.forEach((b, g) => {
        x += `${g + 1}. ${b.product.name} (SKU: ${b.product.sku}) - Qty: ${b.quantity} - ${formatINR(b.product.price * b.quantity)}
`;
      });
      x += `
Estimated Total: ${formatINR(m)}
Please advise on showroom availability and insured dispatch.`;
      return x;
    };
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#EDE5D7] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          <div className="p-5 sm:p-6 bg-[#183C40] text-[#F7F3EA] flex items-center justify-between border-b border-[#C6A15B]/30">
            <div className="flex items-center gap-2">
              <ShoppingBagIcon className="w-5 h-5 text-[#DFCA8F]" />
              <h3 className="font-serif text-xl tracking-wider text-[#F7F3EA]">SHOPPING BAG ({cartItems.length})</h3>
            </div>
            <button onClick={onClose} className="p-1 text-[#EDE5D7] hover:text-[#C6A15B] transition-colors">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBagIcon className="w-12 h-12 text-[#6B6862]/40 mx-auto" />
                <h4 className="font-serif text-lg text-[#183C40]">Your Bag is Empty</h4>
                <p className="text-xs text-[#6B6862] max-w-xs mx-auto font-light">
                  Explore our exquisite 22K gold & diamond creations to add to your collection.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-[#30565B] text-[#F7F3EA] text-xs font-semibold px-5 py-2.5 rounded-lg tracking-wider uppercase"
                >
                  CONTINUE BROWSING
                </button>
              </div>
            ) : (
              cartItems.map((x) => (
                <div
                  className="bg-white rounded-xl p-3.5 border border-[#EDE5D7] shadow-xs flex gap-3.5 items-start"
                  key={x.product.id}
                >
                  <img
                    src={x.product.images[0]}
                    alt={x.product.name}
                    onClick={() => {
                      onClose();
                      onSelectProduct(x.product);
                    }}
                    className="w-20 h-20 rounded-lg object-cover bg-[#EDE5D7]/50 cursor-pointer shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <h4
                        onClick={() => {
                          onClose();
                          onSelectProduct(x.product);
                        }}
                        className="font-serif text-sm font-semibold text-[#183C40] truncate hover:text-[#30565B] cursor-pointer"
                      >
                        {x.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(x.product.id)}
                        className="text-[#6B6862] hover:text-red-700 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2Icon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-[#A9823D] font-medium block">
                      {x.product.purity}
                      {' • '}
                      {x.product.approxWeight}
                    </span>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-[#EDE5D7] rounded-md bg-[#FAF7F2]">
                        <button
                          onClick={() => onUpdateQuantity(x.product.id, x.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#183C40] hover:bg-[#EDE5D7]"
                        >
                          <MinusIcon className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#183C40]">{x.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(x.product.id, x.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#183C40] hover:bg-[#EDE5D7]"
                        >
                          <PlusIcon className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-serif font-bold text-sm text-[#183C40]">
                        {formatINR(x.product.price * x.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#EDE5D7] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B6862]">
                  <span>Subtotal (Inclusive of GST)</span>
                  <span className="font-semibold text-[#183C40]">{formatINR(m)}</span>
                </div>
                <div className="flex justify-between text-[#6B6862]">
                  <span>Insured Doorstep Transit</span>
                  <span className="font-semibold text-[#30565B]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-[#183C40] pt-2 border-t border-[#EDE5D7]">
                  <span>Estimated Total</span>
                  <span className="text-lg text-[#183C40]">{formatINR(m)}</span>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <a
                  href={whatsappLink(p())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wider uppercase py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <MessageCircleIcon className="w-4 h-4 text-white" />
                  <span>ENQUIRE ABOUT THIS ON WHATSAPP</span>
                </a>
                <button
                  onClick={() => {
                    onClose();
                    onOpenAppointment();
                  }}
                  className="w-full bg-white hover:bg-[#FAF7F2] text-[#183C40] border border-[#C6A15B] text-xs font-semibold tracking-wider uppercase py-3 rounded-xl transition-colors cursor-pointer"
                >
                  SCHEDULE SHOWROOM VIEWING
                </button>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6B6862]">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>All pieces hallmarked & insured in transit</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
