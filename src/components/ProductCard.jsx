import React, { useState } from 'react';
import { EyeIcon, HeartIcon, MessageCircleIcon } from 'lucide-react';
import { formatINR, productEnquiryMessage, whatsappLink } from '../lib/format.js';

const ProductCard = ({ product, isWishlisted, onToggleWishlist, onQuickView, onSelectProduct, onOpenAppointment }) => {
  const [u, m] = useState(false),
    [p, x] = useState(false),
    b = product.images[0],
    g = product.images[1] || product.images[0];
  return (
    <div
      className="group relative bg-[#FAF7F2] rounded-xl border border-[#EDE5D7] hover:border-[#C6A15B] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl"
      onMouseEnter={() => m(true)}
      onMouseLeave={() => m(false)}
    >
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDE5D7]/30 cursor-pointer"
        onClick={() => onSelectProduct(product)}
      >
        {!p && <div className="absolute inset-0 bg-[#EDE5D7]/50 animate-pulse" />}
        <img
          src={u && product.images.length > 1 ? g : b}
          alt={product.name}
          loading="lazy"
          onLoad={() => x(true)}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBridal && (
            <span className="bg-[#071F1B] text-[#DFCA8F] text-[10px] tracking-wider uppercase font-semibold px-2.5 py-0.5 rounded shadow-sm border border-[#C6A15B]/40">
              BRIDAL
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#C6A15B] text-[#071F1B] text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded shadow-sm">
              BESTSELLER
            </span>
          )}
          {product.purity && (
            <span className="bg-[#FAF7F2]/95 backdrop-blur-xs text-[#071F1B] text-[10px] tracking-wider font-semibold px-2 py-0.5 rounded border border-[#EDE5D7]">
              {product.purity} {product.type === 'diamond' ? 'GOLD & DIA' : 'GOLD'}
            </span>
          )}
        </div>
        <button
          onClick={(v) => {
            v.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#FAF7F2]/90 backdrop-blur-xs hover:bg-white flex items-center justify-center text-[#071F1B] hover:text-[#A9823D] transition-transform active:scale-90 shadow-sm"
        >
          <HeartIcon
            className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-[#071F1B] text-[#071F1B]' : 'text-[#071F1B]'}`}
          />
        </button>
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
          <button
            onClick={(v) => {
              v.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-[#FAF7F2]/95 hover:bg-white text-[#071F1B] text-[11px] font-semibold tracking-wider uppercase py-2.5 rounded-lg backdrop-blur-sm shadow-md transition-all flex items-center justify-center gap-1.5 border border-[#C6A15B]/50 cursor-pointer"
          >
            <EyeIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>QUICK VIEW</span>
          </button>
        </div>
      </div>
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-[#FAF7F2]">
        <div className="space-y-1.5 cursor-pointer" onClick={() => onSelectProduct(product)}>
          <div className="flex items-center justify-between text-[11px] text-[#6B6862] tracking-wider uppercase">
            <span>{product.category}</span>
            <span className="font-medium text-[#A9823D]">{product.approxWeight}</span>
          </div>
          <h3 className="font-serif text-base sm:text-lg text-[#071F1B] group-hover:text-[#09231E] line-clamp-1 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-[#171A19]/60 line-clamp-1 font-light">{product.shortDescription || product.description}</p>
        </div>
        <div className="pt-4 mt-3 border-t border-[#EDE5D7] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-semibold text-[#071F1B]">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-[#6B6862] line-through">{formatINR(product.originalPrice)}</span>
              )}
            </div>
            <span className="text-[10px] text-[#A9823D] tracking-wider uppercase block">Inclusive of all taxes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={whatsappLink(productEnquiryMessage(product.name, product.sku, product.price, product.purity))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(v) => v.stopPropagation()}
              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-semibold tracking-wider uppercase rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              title="Enquire About This on WhatsApp"
            >
              <MessageCircleIcon className="w-3.5 h-3.5" />
              <span>ENQUIRE</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
