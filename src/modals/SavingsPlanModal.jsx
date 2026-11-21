import React, { useState } from 'react';
import { CheckIcon, GiftIcon, MessageCircleIcon, XIcon } from 'lucide-react';
import { CONFIG } from '../data/store.js';
import { formatINR, whatsappLink } from '../lib/format.js';

const SavingsPlanModal = ({ isOpen, onClose }) => {
  const [r, l] = useState(5e3);
  if (!isOpen) {
    return null;
  }
  const c = CONFIG.swarnaNidhi,
    d = CONFIG.liveGoldRate.karat22,
    u = r * c.durationMonths,
    m = u * 0.15,
    p = u + m,
    x = (u / d).toFixed(2);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-2xl border border-[#C6A15B] shadow-2xl overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#183C40] text-[#F7F3EA] p-5 sm:p-6 flex items-center justify-between border-b border-[#C6A15B]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#30565B] flex items-center justify-center border border-[#C6A15B]/40 text-[#DFCA8F]">
              <GiftIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#DFCA8F]">
                  Smart Gold Savings & Advance Plan
                </span>
                <span className="bg-[#C6A15B] text-[#183C40] text-[9px] px-1.5 py-0.5 rounded font-bold">11 MONTHS</span>
              </div>
              <h3 className="text-xl font-serif text-[#F7F3EA] tracking-wide">Urooj Swarna Nidhi</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#EDE5D7] hover:text-[#C6A15B] rounded-full transition-colors cursor-pointer"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6 text-xs text-[#171A19]">
          <p className="text-[#6B6862] leading-relaxed font-light">
            {
              'Plan for upcoming weddings, festivals, or smart bullion accumulation. Save a fixed amount every month for 11 months, and on the 11th month, enjoy '
            }
            <strong>100% Making Charge Concession</strong>
            {' on your dream jewellery!'}
          </p>
          <div className="bg-white p-5 rounded-xl border border-[#EDE5D7] space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider">Select Monthly Savings:</label>
              <span className="font-serif text-xl font-bold text-[#30565B]">
                {formatINR(r)}
                {' / month'}
              </span>
            </div>
            <input
              type="range"
              min={2e3}
              max={5e4}
              step={1e3}
              value={r}
              onChange={(b) => l(parseInt(b.target.value))}
              className="w-full h-2 bg-[#EDE5D7] rounded-lg appearance-none cursor-pointer accent-[#30565B]"
            />
            <div className="flex justify-between text-[10px] text-[#6B6862] font-mono">
              <span>Min: ₹2,000</span>
              <span>₹10,000</span>
              <span>₹25,000</span>
              <span>Max: ₹50,000</span>
            </div>
          </div>
          <div className="bg-[#0e2528] text-[#F7F3EA] rounded-xl p-5 border border-[#C6A15B]/30 space-y-3">
            <span className="text-[10px] font-bold text-[#DFCA8F] uppercase tracking-widest block">
              11-Month Maturity Projection
            </span>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-[10px] text-[#EDE5D7]/70 block">Total You Deposit (11 mos)</span>
                <span className="font-mono text-base font-bold text-white">{formatINR(u)}</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 block">Urooj Making Charge Bonus</span>
                <span className="font-mono text-base font-bold text-emerald-400">+{formatINR(m)}</span>
              </div>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-[#DFCA8F] block font-medium">Approx. Gold Accumulated</span>
                <span className="text-sm font-mono text-white font-bold">
                  {x}
                  {' grams (22K)'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#DFCA8F] block font-medium">Effective Jewellery Value</span>
                <span className="text-lg font-serif font-bold text-white">{formatINR(p)}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">Scheme Privileges:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#6B6862]">
              <div className="flex items-center gap-1.5">
                <CheckIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero administrative or enrollment fees</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Redeemable across all 22K Gold & Diamonds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Protected against future gold price spikes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% BIS 916 HUID certified jewellery</span>
              </div>
            </div>
          </div>
          <div className="pt-1">
            <a
              href={whatsappLink(
                `Hello Urooj Gold & Diamonds, I am interested in joining the Urooj Swarna Nidhi Gold Savings Scheme with a monthly contribution of ${formatINR(r)}. Please assist me with the enrollment details.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wider uppercase py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircleIcon className="w-4 h-4" />
              <span>ENROLL VIA WHATSAPP (+91 99661 62100)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsPlanModal;
