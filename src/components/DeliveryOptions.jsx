import React, { useState } from 'react';
import { CheckIcon, MapPinIcon, TruckIcon } from 'lucide-react';

const DeliveryOptions = ({ onShowroomPickupClick }) => {
  const [t, r] = useState(''),
    [l, c] = useState('idle'),
    d = (u) => {
      u.preventDefault();
      const m = t.trim();
      if (!/^\d{6}$/.test(m)) {
        c('invalid');
        return;
      }
      c('checking');
      setTimeout(() => {
        if (m.startsWith('500') || m.startsWith('501') || m.startsWith('502')) {
          c('hyd');
        } else {
          c('national');
        }
      }, 400);
    };
  return (
    <div className="bg-white rounded-xl p-3.5 border border-[#EDE5D7] space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#183C40] uppercase tracking-wider flex items-center gap-1.5">
          <MapPinIcon className="w-3.5 h-3.5 text-[#30565B]" />
          <span>Delivery & Showroom Availability</span>
        </span>
      </div>
      <form onSubmit={d} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Pincode (e.g. 500006)"
          value={t}
          onChange={(u) => {
            r(u.target.value.replace(/\D/g, ''));
            c('idle');
          }}
          className="flex-1 bg-[#FAF7F2] border border-[#EDE5D7] px-3 py-2 rounded-lg text-xs font-mono text-[#183C40] focus:outline-none focus:border-[#30565B]"
        />
        <button
          type="submit"
          disabled={l === 'checking'}
          className="bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          {l === 'checking' ? 'Checking...' : 'CHECK'}
        </button>
      </form>
      {l === 'hyd' && (
        <div className="bg-[#30565B]/10 rounded-lg p-2.5 text-xs text-[#183C40] space-y-1 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800">
            <CheckIcon className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Eligible for Same-Day VIP Showroom Preview & Fast Dispatch</span>
          </div>
          <p className="text-[11px] text-[#171A19]/80 pl-5">
            <strong>Mehdipatnam X Road:</strong>
            {
              ' Available for instant private salon viewing. Insured doorstep delivery within 24–48 hours across Greater Hyderabad.'
            }
          </p>
        </div>
      )}
      {l === 'national' && (
        <div className="bg-[#EDE5D7]/50 rounded-lg p-2.5 text-xs text-[#183C40] space-y-1 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 font-bold text-[#183C40]">
            <TruckIcon className="w-4 h-4 text-[#30565B] shrink-0" />
            <span>Complimentary 100% Insured Pan-India Express Transit</span>
          </div>
          <p className="text-[11px] text-[#6B6862] pl-5">
            Expected delivery in 3–5 business days via Blue Dart / Sequel Secured Logistics with tamper-evident packaging and OTP
            signature verification.
          </p>
        </div>
      )}
      {l === 'invalid' && <p className="text-[11px] text-red-600">Please enter a valid 6-digit Indian postal pincode.</p>}
    </div>
  );
};

export default DeliveryOptions;
