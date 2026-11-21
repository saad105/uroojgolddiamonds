import React, { useState } from 'react';
import { MessageCircleIcon, ShieldCheckIcon, VideoIcon, XIcon } from 'lucide-react';
import { whatsappLink } from '../lib/format.js';

const VideoCallModal = ({ isOpen, onClose, product }) => {
  const [l, c] = useState(''),
    [d, u] = useState(''),
    [m, p] = useState('02:00 PM - 03:00 PM'),
    [x, b] = useState(product ? product.name : 'Bridal Haars & Heavy Necklaces');
  if (!isOpen) {
    return null;
  }
  const g = (v) => {
    v.preventDefault();
    const w = `Hello Urooj Gold & Diamonds, I would like to schedule a Live Video Shopping session via WhatsApp.
Guest Name: ${l || 'Valued Guest'}
Preferred Date: ${d || 'Earliest available'}
Preferred Time: ${m}
Jewellery of Interest: ${x} ${product ? `(SKU: ${product.sku})` : ''}

Please confirm the slot for a live jewellery walkthrough from your Mehdipatnam showroom.`,
      C = whatsappLink(w);
    window.open(C, '_blank');
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl border border-[#C6A15B] shadow-2xl overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#183C40] text-[#F7F3EA] p-5 sm:p-6 flex items-center justify-between border-b border-[#C6A15B]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#30565B] flex items-center justify-center border border-[#C6A15B]/40 text-[#DFCA8F]">
              <VideoIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#DFCA8F] block">
                Virtual VIP Shopping Experience
              </span>
              <h3 className="text-xl font-serif text-[#F7F3EA] tracking-wide">Live Video Call Shopping</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#EDE5D7] hover:text-[#C6A15B] rounded-full transition-colors cursor-pointer"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={g} className="p-6 space-y-4 text-xs text-[#171A19]">
          <p className="text-[#6B6862] leading-relaxed font-light">
            Examine the finest details of our 22K gold & diamond jewellery in real-time. Our master jewellers will present pieces
            live from our private Mehdipatnam salon directly to your screen.
          </p>
          {product && (
            <div className="bg-white rounded-xl p-3 border border-[#EDE5D7] flex items-center gap-3">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover bg-[#EDE5D7]/50 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] text-[#C6A15B] font-bold uppercase tracking-wider block">Featured Piece</span>
                <h4 className="font-serif text-sm font-semibold text-[#183C40] truncate">{product.name}</h4>
              </div>
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block mb-1">Your Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Fatima Khan"
              value={l}
              onChange={(v) => c(v.target.value)}
              className="w-full bg-white border border-[#EDE5D7] rounded-lg px-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block mb-1">Preferred Date *</label>
              <input
                type="date"
                required
                value={d}
                onChange={(v) => u(v.target.value)}
                className="w-full bg-white border border-[#EDE5D7] rounded-lg px-3 py-2 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block mb-1">
                Preferred Time Slot
              </label>
              <select
                value={m}
                onChange={(v) => p(v.target.value)}
                className="w-full bg-white border border-[#EDE5D7] rounded-lg px-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
              >
                <option>11:30 AM - 12:30 PM</option>
                <option>02:00 PM - 03:00 PM</option>
                <option>04:30 PM - 05:30 PM</option>
                <option>07:00 PM - 08:00 PM</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block mb-1">Jewellery Focus</label>
            <input
              type="text"
              value={x}
              onChange={(v) => b(v.target.value)}
              placeholder="e.g. Lightweight 7g Necklaces, Nizami Chokers, Solitaire Rings"
              className="w-full bg-white border border-[#EDE5D7] rounded-lg px-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
            />
          </div>
          <div className="bg-[#30565B]/10 p-3 rounded-xl flex items-center gap-2 text-[11px] text-[#183C40]">
            <ShieldCheckIcon className="w-4 h-4 text-[#30565B] shrink-0" />
            <span>High-definition private video session • Zero purchase obligation • Strictly confidential</span>
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wider uppercase py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircleIcon className="w-4 h-4" />
              <span>CONFIRM VIDEO CALL ON WHATSAPP (+91 99661 62100)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoCallModal;
