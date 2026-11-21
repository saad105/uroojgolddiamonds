import React, { useState } from 'react';
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  MessageCircleIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserIcon,
  XIcon,
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext.jsx';
import { saveAppointmentToCloud } from '../lib/supabase.js';
import { whatsappLink } from '../lib/format.js';

const AppointmentModal = ({ isOpen, onClose, initialProduct, onBookSuccess }) => {
  const [c, d] = useState(''),
    [u, m] = useState(''),
    [p, x] = useState(''),
    [b, g] = useState(''),
    [v, w] = useState('11:30 AM - 01:00 PM'),
    [C, E] = useState(
      initialProduct?.type === 'diamond'
        ? 'Diamond Jewellery'
        : initialProduct != null && initialProduct.isBridal
          ? 'Bridal Jewellery'
          : 'Gold Jewellery',
    ),
    [S, k] = useState(initialProduct ? `Interested in viewing: ${initialProduct.name} (SKU: ${initialProduct.sku})` : ''),
    [O, T] = useState(false),
    [R, P] = useState(null),
    { user } = useAuth(),
    [H, G] = useState(false),
    [X, W] = useState(false);
  if (!isOpen) {
    return null;
  }
  const oe = async (Z) => {
      if ((Z.preventDefault(), !c || !u || !p || !b)) {
        return;
      }
      G(true);
      const De = {
        id: `APT-${Math.floor(1e5 + Math.random() * 9e5)}`,
        name: c,
        phone: u,
        email: p,
        preferredDate: b,
        preferredTime: v,
        interest: C,
        notes: S,
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      };
      try {
        if ((await saveAppointmentToCloud(De, user?.id || null)).success) {
          W(true);
        }
      } catch (Se) {
        console.warn('Notice from Supabase appointment sync:', Se);
      }
      try {
        const Se = JSON.parse(localStorage.getItem('urooj_appointments') || '[]');
        localStorage.setItem('urooj_appointments', JSON.stringify([De, ...Se]));
      } catch (Se) {
        console.error(Se);
      }
      G(false);
      P(De);
      T(true);
      if (onBookSuccess) {
        onBookSuccess(De);
      }
    },
    ye = () => {
      T(false);
      P(null);
      onClose();
    };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-2xl border border-[#C6A15B]/40 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col">
        <div className="bg-[#183C40] text-[#F7F3EA] p-5 sm:p-6 flex items-center justify-between border-b border-[#C6A15B]/30">
          <div>
            <div className="flex items-center gap-2 text-[#DFCA8F] text-[11px] font-semibold tracking-widest uppercase">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Private VIP Consultation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif tracking-wide text-[#F7F3EA] mt-1">BOOK YOUR JEWELLERY APPOINTMENT</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#EDE5D7] hover:text-[#C6A15B] rounded-full transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {O && R ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#30565B] rounded-full flex items-center justify-center mx-auto text-[#DFCA8F] border-2 border-[#C6A15B]">
                <CheckIcon className="w-8 h-8 text-[#DFCA8F]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-serif text-[#183C40]">Appointment Request Confirmed</h4>
                <p className="text-xs text-[#6B6862] font-mono">
                  {'Reference: '}
                  <strong className="text-[#30565B]">{R.id}</strong>
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-[#EDE5D7] text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#6B6862]">Guest:</span>
                  <span className="font-semibold text-[#183C40]">{R.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6862]">Date & Time:</span>
                  <span className="font-semibold text-[#183C40]">
                    {R.preferredDate}
                    {' • '}
                    {R.preferredTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6862]">Consultation:</span>
                  <span className="font-semibold text-[#183C40]">{R.interest}</span>
                </div>
              </div>
              <p className="text-xs text-[#171A19]/80 max-w-md mx-auto font-light leading-relaxed">
                {'Our jewellery concierge will reach out to '}
                <strong>{R.phone}</strong>
                {' to confirm your private viewing salon suite.'}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={whatsappLink(
                    `Hello Urooj Gold & Diamonds, I have booked consultation ${R.id} for ${R.preferredDate}. Please confirm.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-xs font-semibold py-3 px-6 rounded-lg tracking-wider uppercase transition-colors"
                >
                  Confirm on WhatsApp
                </a>
                <button
                  onClick={ye}
                  className="bg-white hover:bg-[#EDE5D7]/50 text-[#183C40] border border-[#EDE5D7] text-xs font-semibold py-3 px-6 rounded-lg tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={oe} className="space-y-4">
              <p className="text-xs text-[#171A19]/70 leading-relaxed font-light">
                Experience personal one-on-one attention in our private jewellery suites. Select your preferred schedule below:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">Full Name *</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#6B6862] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={c}
                      onChange={(Z) => d(Z.target.value)}
                      className="w-full bg-white border border-[#EDE5D7] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">Phone Number *</label>
                  <div className="relative">
                    <PhoneIcon className="w-4 h-4 text-[#6B6862] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={u}
                      onChange={(Z) => m(Z.target.value)}
                      className="w-full bg-white border border-[#EDE5D7] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">Email Address *</label>
                <div className="relative">
                  <MailIcon className="w-4 h-4 text-[#6B6862] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. radhika@example.com"
                    value={p}
                    onChange={(Z) => x(Z.target.value)}
                    className="w-full bg-white border border-[#EDE5D7] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">Preferred Date *</label>
                  <div className="relative">
                    <CalendarIcon className="w-4 h-4 text-[#6B6862] absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={b}
                      onChange={(Z) => g(Z.target.value)}
                      className="w-full bg-white border border-[#EDE5D7] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">
                    Preferred Time Slot *
                  </label>
                  <div className="relative">
                    <ClockIcon className="w-4 h-4 text-[#6B6862] absolute left-3 top-3" />
                    <select
                      value={v}
                      onChange={(Z) => w(Z.target.value)}
                      className="w-full bg-white border border-[#EDE5D7] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                    >
                      <option>10:30 AM - 12:00 PM</option>
                      <option>12:00 PM - 01:30 PM</option>
                      <option>02:30 PM - 04:00 PM</option>
                      <option>04:00 PM - 05:30 PM</option>
                      <option>06:00 PM - 07:30 PM</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">
                  Jewellery Interest *
                </label>
                <select
                  value={C}
                  onChange={(Z) => E(Z.target.value)}
                  className="w-full bg-white border border-[#EDE5D7] rounded-lg px-3 py-2.5 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                >
                  <option>Gold Jewellery</option>
                  <option>Diamond Jewellery</option>
                  <option>Bridal Jewellery</option>
                  <option>Custom Jewellery</option>
                  <option>General Consultation</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#183C40] uppercase tracking-wider block">
                  Specific Designs or Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  value={S}
                  onChange={(Z) => k(Z.target.value)}
                  placeholder="Share any specific styles, purity, budget or celebration details..."
                  className="w-full bg-white border border-[#EDE5D7] rounded-lg p-3 text-xs text-[#183C40] focus:outline-none focus:border-[#30565B]"
                />
              </div>
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-xs font-semibold tracking-widest uppercase py-3.5 rounded-xl shadow-lg border border-[#C6A15B]/40 transition-all cursor-pointer"
                >
                  REQUEST APPOINTMENT
                </button>
                <a
                  href={whatsappLink(
                    `Hello Urooj Gold & Diamonds, I would like to book a private VIP appointment at your Mehdipatnam showroom. Name: ${c || 'Guest'}, Phone: ${u || 'N/A'}, Date: ${b || 'Flexible'}, Interest: ${C}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-widest uppercase py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircleIcon className="w-4 h-4" />
                  <span>BOOK DIRECTLY ON WHATSAPP (+91 99661 62100)</span>
                </a>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 text-[11px] text-[#6B6862] text-center pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Below Sapphire Banquets, M S G Plaza, Mehdipatnam X Road</span>
                </div>
                <span className="text-[10px] text-[#6B6862]/80">
                  Data processed under DPDP Act 2023 strictly for scheduling your appointment.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
