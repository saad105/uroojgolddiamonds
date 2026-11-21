import React from 'react';
import { CircleCheckBigIcon, FileTextIcon, ShieldCheckIcon, XIcon } from 'lucide-react';
import { CONFIG } from '../data/store.js';
import { formatINR } from '../lib/format.js';

const PriceBreakupModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) {
    return null;
  }
  const l = product.approxWeight || '10.00g',
    c = parseFloat(l) || 10,
    d = product.netGoldWeight || product.approxWeight || '10.00g',
    u = parseFloat(d) || c,
    m = Math.max(0, c - u),
    p = product.purity === '18K' ? CONFIG.liveGoldRate.karat18 : CONFIG.liveGoldRate.karat22,
    x = u * p,
    b = product.type === 'diamond' || product.type === 'solitaire' || !!product.diamondDetails;
  let g = 0;
  if (b) {
    g = Math.max(0, product.price * 0.55);
  }
  const v = product.price / 1.03,
    w = Math.max(0, v - x - g),
    C = v * 0.03;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl border border-[#C6A15B] shadow-2xl overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#183C40] text-[#F7F3EA] p-5 flex items-center justify-between border-b border-[#C6A15B]/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#30565B] flex items-center justify-center border border-[#C6A15B]/40 text-[#DFCA8F]">
              <FileTextIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#DFCA8F] block">
                100% Transparent Billing Standard
              </span>
              <h3 className="text-lg font-serif text-[#F7F3EA] tracking-wide">Price & Weight Breakup</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#EDE5D7] hover:text-[#C6A15B] rounded-full transition-colors cursor-pointer"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 bg-white border-b border-[#EDE5D7] flex items-center gap-3">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-14 h-14 rounded-lg object-cover bg-[#EDE5D7]/50 shrink-0 border border-[#EDE5D7]"
          />
          <div className="min-w-0">
            <h4 className="font-serif text-sm font-semibold text-[#183C40] truncate">{product.name}</h4>
            <span className="text-[11px] text-[#6B6862] font-mono">
              {'SKU: '}
              {product.sku}
              {' • '}
              {product.purity} {product.metal}
            </span>
          </div>
        </div>
        <div className="p-5 space-y-4 text-xs text-[#171A19]">
          <div className="bg-[#EDE5D7]/50 rounded-xl p-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="text-[10px] text-[#6B6862] uppercase tracking-wider block">Gross Weight</span>
              <span className="font-mono font-bold text-sm text-[#183C40]">{c.toFixed(2)}g</span>
            </div>
            <div className="border-x border-[#EDE5D7]">
              <span className="text-[10px] text-[#6B6862] uppercase tracking-wider block">Stone / Lac</span>
              <span className="font-mono font-bold text-sm text-[#6B6862]">{m.toFixed(2)}g</span>
            </div>
            <div>
              <span className="text-[10px] text-[#30565B] uppercase tracking-wider block font-semibold">Net Gold Wt</span>
              <span className="font-mono font-bold text-sm text-[#30565B]">{u.toFixed(2)}g</span>
            </div>
          </div>
          <div className="space-y-2.5 bg-white p-4 rounded-xl border border-[#EDE5D7] shadow-xs">
            <div className="flex justify-between items-center text-[#6B6862]">
              <span className="flex items-center gap-1.5">
                <CircleCheckBigIcon className="w-3.5 h-3.5 text-[#30565B]" />
                Gold Component ({u.toFixed(2)}
                {'g @ '}
                {formatINR(p)}/g)
              </span>
              <span className="font-mono font-semibold text-[#183C40]">{formatINR(x)}</span>
            </div>
            {b && g > 0 && (
              <div className="flex justify-between items-center text-[#6B6862]">
                <span className="flex items-center gap-1.5">
                  <CircleCheckBigIcon className="w-3.5 h-3.5 text-[#30565B]" />
                  Certified Diamond / Gemstone Value (incl. 30% Off)
                </span>
                <span className="font-mono font-semibold text-[#183C40]">{formatINR(g)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-[#6B6862]">
              <span className="flex items-center gap-1.5">
                <CircleCheckBigIcon className="w-3.5 h-3.5 text-[#30565B]" />
                Artisanal Making Charges (incl. up to 40% Off)
              </span>
              <span className="font-mono font-semibold text-[#183C40]">{formatINR(w)}</span>
            </div>
            <div className="flex justify-between items-center text-[#6B6862]">
              <span className="flex items-center gap-1.5">
                <CircleCheckBigIcon className="w-3.5 h-3.5 text-[#30565B]" />
                Statutory GST (3% HSN 7113)
              </span>
              <span className="font-mono font-semibold text-[#183C40]">{formatINR(C)}</span>
            </div>
            <div className="h-px bg-[#EDE5D7] my-2" />
            <div className="flex justify-between items-center text-sm font-serif font-bold text-[#183C40]">
              <span>Final Transparent Price</span>
              <span className="text-xl text-[#30565B]">{formatINR(product.price)}</span>
            </div>
          </div>
          <div className="bg-[#30565B]/10 p-3.5 rounded-xl flex items-start gap-2.5 text-[11px] text-[#183C40]">
            <ShieldCheckIcon className="w-4 h-4 text-[#30565B] shrink-0 mt-0.5" />
            <div className="space-y-0.5 font-light leading-relaxed">
              <strong className="font-semibold text-[#183C40] block">The Urooj Complete Transparency Guarantee:</strong>You only
              pay for the exact net gold weight. Stone weight is strictly deducted and never billed at gold price. Every piece is
              stamped with official BIS 916 Hallmark and 6-digit HUID code.
            </div>
          </div>
        </div>
        <div className="bg-[#EDE5D7]/40 p-4 px-6 border-t border-[#EDE5D7] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-xs font-semibold tracking-wider uppercase py-2 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakupModal;
