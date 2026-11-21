import React, { useState } from 'react';
import { CheckIcon, SparklesIcon, XIcon } from 'lucide-react';
import { saveCustomerInquiryToCloud } from '../lib/supabase.js';
import { whatsappLink } from '../lib/format.js';

const CustomDesignModal = ({ isOpen, onClose }) => {
  const [r, l] = useState(''),
    [c, d] = useState(''),
    [u, m] = useState(''),
    [p, x] = useState('22K Yellow Gold'),
    [b, g] = useState('Certified Diamonds'),
    [v, w] = useState('₹2,00,000 - ₹5,00,000'),
    [C, E] = useState(''),
    [S, k] = useState(false);
  if (!isOpen) {
    return null;
  }
  const O = (T) => {
    if ((T.preventDefault(), !(!r || !c || !C))) {
      saveCustomerInquiryToCloud({
        name: r,
        phone: c,
        email: u || undefined,
        subject: `Custom Jewellery Bespoke (${p}, ${b}, Budget: ${v})`,
        interest: 'Custom Bespoke Jewellery',
        message: C,
        source: 'custom_jewellery_modal',
      }).catch((R) => {
        console.warn('Notice from Supabase custom enquiry sync:', R);
      });
      try {
        const R = {
            id: `CUST-${Math.floor(1e5 + Math.random() * 9e5)}`,
            name: r,
            phone: c,
            email: u,
            metal: p,
            stoneType: b,
            budgetRange: v,
            description: C,
            createdAt: new Date().toISOString(),
          },
          P = JSON.parse(localStorage.getItem('urooj_enquiries') || '[]');
        localStorage.setItem('urooj_enquiries', JSON.stringify([R, ...P]));
      } catch (R) {
        console.error(R);
      }
      k(true);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-2xl border border-[#C6A15B]/40 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        <div className="bg-[#183C40] text-[#F7F3EA] p-5 sm:p-6 flex items-center justify-between border-b border-[#C6A15B]/30">
          <div>
            <div className="flex items-center gap-2 text-[#DFCA8F] text-[11px] font-semibold tracking-widest uppercase">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Haute Joaillerie Atelier</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif tracking-wide text-[#F7F3EA] mt-1">CREATE SOMETHING UNIQUE</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#EDE5D7] hover:text-[#C6A15B] rounded-full transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {S ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#30565B] rounded-full flex items-center justify-center mx-auto text-[#DFCA8F] border-2 border-[#C6A15B]">
                <CheckIcon className="w-8 h-8 text-[#DFCA8F]" />
              </div>
              <h4 className="text-2xl font-serif text-[#183C40]">Custom Design Brief Received</h4>
              <p className="text-xs text-[#171A19]/80 max-w-md mx-auto font-light leading-relaxed">
                Our head CAD jewellery designers will review your brief and schedule an initial 3D sketch review.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={whatsappLink(
                    `Hello Urooj Gold & Diamonds, I have submitted a bespoke custom design request. Metal: ${p}, Budget: ${v}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-xs font-semibold py-3 px-6 rounded-lg tracking-wider uppercase transition-colors"
                >
                  Discuss on WhatsApp
                </a>
                <button
                  onClick={onClose}
                  className="bg-white hover:bg-[#EDE5D7]/50 text-[#183C40] border border-[#EDE5D7] text-xs font-semibold py-3 px-6 rounded-lg tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={O} className="space-y-4">
              <p className="text-xs text-[#171A19]/70 leading-relaxed font-light">
                Have a dream heirloom in mind or an old family gemstone to recreate? Our master artisans bring your imagination to
                life.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={r}
                    onChange={(T) => l(T.target.value)}
                    className="w-full bg-white border border-[#EDE5D7] rounded-lg px-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 Phone number"
                    value={c}
                    onChange={(T) => d(T.target.value)}
                    className="w-full bg-white border border-[#EDE5D7] rounded-lg px-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">Metal Preference</label>
                  <select
                    value={p}
                    onChange={(T) => x(T.target.value)}
                    className="w-full bg-white border border-[#EDE5D7] rounded-lg px-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                  >
                    <option>22K Yellow Gold</option>
                    <option>18K Yellow Gold</option>
                    <option>18K White Gold</option>
                    <option>18K Rose Gold</option>
                    <option>Platinum 950</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">Target Budget</label>
                  <select
                    value={v}
                    onChange={(T) => w(T.target.value)}
                    className="w-full bg-white border border-[#EDE5D7] rounded-lg px-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                  >
                    <option>Under ₹1,00,000</option>
                    <option>₹1,00,000 - ₹2,50,000</option>
                    <option>₹2,50,000 - ₹5,00,000</option>
                    <option>₹5,00,000 - ₹10,00,000</option>
                    <option>Above ₹10,00,000 (VIP Bespoke)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">
                  Describe Your Vision *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe motifs, stones, bridal themes, sizing, or any family jewellery inspirations..."
                  value={C}
                  onChange={(T) => E(T.target.value)}
                  className="w-full bg-white border border-[#EDE5D7] rounded-lg p-3 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-xs font-semibold tracking-widest uppercase py-3.5 rounded-xl shadow-lg border border-[#C6A15B]/40 transition-all cursor-pointer"
                >
                  SUBMIT CUSTOM DESIGN REQUEST
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDesignModal;
