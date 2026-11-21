import React, { useState } from 'react';
import { CalculatorIcon, MessageCircleIcon, ShieldCheckIcon, TrendingUpIcon, XIcon } from 'lucide-react';
import { CONFIG } from '../data/store.js';
import { formatINR, whatsappLink } from '../lib/format.js';

const GoldCalculatorModal = ({ isOpen, onClose, rates }) => {
  const [l, c] = useState(10),
    [d, u] = useState('22K'),
    [m, p] = useState('buy');
  if (!isOpen) {
    return null;
  }
  const x = rates || CONFIG.liveGoldRate,
    b = d === '22K' ? x.karat22 : d === '24K' ? x.karat24 : x.karat18,
    g = l * b,
    v = m === 'buy' ? g * 0.084 : 0,
    w = m === 'buy' ? (g + v) * 0.03 : 0,
    C = g + v + w;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-2xl border-2 border-[#C6A15B] shadow-2xl overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#071F1B] text-[#F7F3EA] p-5 sm:p-6 flex items-center justify-between border-b border-[#C6A15B]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#09231E] flex items-center justify-center border border-[#C6A15B]/40 text-[#DFCA8F]">
              <CalculatorIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#DFCA8F]">
                  Hyderabad Live Benchmark
                </span>
                <span className="bg-[#25D366]/20 text-[#25D366] text-[9px] px-1.5 py-0.5 rounded-full font-mono">LIVE</span>
              </div>
              <h3 className="text-xl font-serif text-[#F7F3EA] tracking-wide">Live Gold Rate & Bullion Calculator</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#EDE5D7] hover:text-[#DFCA8F] rounded-full transition-colors cursor-pointer"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-[#051714] px-6 py-3 border-b border-[#C6A15B]/20 text-xs text-[#EDE5D7] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[#DFCA8F] text-[10px] uppercase tracking-wider block">22K (916) Gold</span>
              <span className="font-serif text-sm font-bold text-white">{formatINR(x.karat22)}/g</span>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div>
              <span className="text-[#DFCA8F] text-[10px] uppercase tracking-wider block">24K (999) Pure</span>
              <span className="font-serif text-sm font-bold text-white">{formatINR(x.karat24)}/g</span>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div>
              <span className="text-[#DFCA8F] text-[10px] uppercase tracking-wider block">18K Gold</span>
              <span className="font-serif text-sm font-bold text-white">{formatINR(x.karat18)}/g</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-emerald-400 flex items-center justify-end gap-1 font-medium">
              <TrendingUpIcon className="w-3 h-3" />
              {' +'}
              {formatINR(x.change22)}/g today
            </span>
            <span className="text-[9px] text-[#EDE5D7]/60 block">{x.lastUpdated}</span>
          </div>
        </div>
        <div className="p-6 space-y-6 text-[#171A19]">
          <div className="grid grid-cols-2 gap-2 bg-[#EDE5D7]/50 p-1 rounded-xl">
            <button
              onClick={() => p('buy')}
              className={`py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${m === 'buy' ? 'bg-[#071F1B] text-[#DFCA8F] shadow-md border border-[#C6A15B]/40' : 'text-[#6B6862] hover:text-[#071F1B]'}`}
            >
              New Jewellery Estimate
            </button>
            <button
              onClick={() => p('exchange')}
              className={`py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${m === 'exchange' ? 'bg-[#071F1B] text-[#DFCA8F] shadow-md border border-[#C6A15B]/40' : 'text-[#6B6862] hover:text-[#071F1B]'}`}
            >
              100% Exchange Valuation
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#071F1B] uppercase tracking-wider block mb-1.5">Metal Purity</label>
              <div className="grid grid-cols-3 gap-1.5">
                {['22K', '24K', '18K'].map((E) => (
                  <button
                    onClick={() => u(E)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${d === E ? 'bg-[#09231E] text-[#DFCA8F] border-[#C6A15B] shadow-xs' : 'bg-white text-[#071F1B] border-[#EDE5D7] hover:border-[#C6A15B]'}`}
                    key={E}
                  >
                    {E}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-[#071F1B] uppercase tracking-wider">Weight in Grams</label>
                <span className="text-xs font-mono font-bold text-[#071F1B]">
                  {l}
                  {' g'}
                </span>
              </div>
              <input
                type="number"
                min={0.5}
                max={500}
                step={0.1}
                value={l}
                onChange={(E) => c(Math.max(0.1, parseFloat(E.target.value) || 0))}
                className="w-full bg-white border border-[#EDE5D7] rounded-lg px-3 py-2 text-sm text-[#071F1B] font-mono focus:outline-none focus:border-[#071F1B]"
              />
              <div className="flex gap-1.5 mt-2">
                {[7, 10, 16, 20, 46.8].map((E) => (
                  <button
                    onClick={() => c(E)}
                    className="text-[10px] bg-white border border-[#EDE5D7] px-2 py-0.5 rounded text-[#6B6862] hover:text-[#071F1B] hover:border-[#C6A15B] transition-colors"
                    key={E}
                  >
                    {E}g
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[#C6A15B]/30 shadow-sm space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-[#6B6862]">
              <span>
                Pure Bullion Value ({l}
                {'g × '}
                {formatINR(b)})
              </span>
              <span className="font-mono font-semibold text-[#071F1B]">{formatINR(g)}</span>
            </div>
            {m === 'buy' ? (
              <>
                <div className="flex justify-between items-center text-[#6B6862]">
                  <span>Artisanal Making Charges</span>
                  <span className="font-mono font-semibold text-[#071F1B]">+{formatINR(v)}</span>
                </div>
                <div className="flex justify-between items-center text-[#6B6862]">
                  <span>Statutory GST (3% HSN 7113)</span>
                  <span className="font-mono font-semibold text-[#071F1B]">+{formatINR(w)}</span>
                </div>
                <div className="h-px bg-[#EDE5D7] my-1" />
                <div className="flex justify-between items-center text-sm font-serif font-bold text-[#071F1B]">
                  <span>Estimated Total Amount</span>
                  <span className="text-lg text-[#071F1B]">{formatINR(C)}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  <span className="font-medium">100% Exchange 18k & 22k / 916</span>
                  <span className="font-bold">100% VALUE</span>
                </div>
                <div className="h-px bg-[#EDE5D7] my-1" />
                <div className="flex justify-between items-center text-sm font-serif font-bold text-[#071F1B]">
                  <span>Total Exchange Credit Value</span>
                  <span className="text-lg text-[#25D366] font-bold">{formatINR(g)}</span>
                </div>
              </>
            )}
          </div>
          <div className="bg-[#09231E]/10 p-3 rounded-xl flex items-start gap-2.5 text-[11px] text-[#071F1B] border border-[#071F1B]/15">
            <ShieldCheckIcon className="w-4 h-4 text-[#071F1B] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold">Official Terms & Conditions Policy:</span>
              <p className="text-[#171A19]/80 leading-relaxed font-light">
                {m === 'buy'
                  ? 'Ornament Qualities: 999 Pure gold (24k), 91.6% (22k) content, 750 (18k) pure gold content. 100% exchange within 7 days of purchase.'
                  : '100% exchange on 18k & 22k / 916. Making Charges and Wastage Charges will not be Refunded at Any Cost. All Payments against purchase above twenty five thousand (25k) will be made by post dated cheques only.'}
              </p>
            </div>
          </div>
          <div className="pt-1 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink(
                `Hello Urooj Gold & Diamonds, I used your Live Gold Calculator for ${l}g of ${d} (${m === 'buy' ? 'New Purchase' : '0% Deduction Exchange'}). Please share currently available designs.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wider uppercase py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircleIcon className="w-4 h-4" />
              <span>Lock Today's Rate on WhatsApp</span>
            </a>
            <button
              onClick={onClose}
              className="bg-white border border-[#EDE5D7] hover:bg-[#EDE5D7]/40 text-[#071F1B] font-semibold text-xs tracking-wider uppercase py-3 px-6 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldCalculatorModal;
