import React, { useState } from 'react';
import { MessageCircleIcon, SparklesIcon, XIcon } from 'lucide-react';
import { whatsappLink } from '../lib/format.js';
import { CONFIG } from '../data/store.js';

const FloatingActions = () => {
  const [s, t] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {s && (
        <div className="mb-3 w-72 bg-[#FAF7F2] border border-[#C6A15B] rounded-xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 text-[#183C40] relative">
          <button
            onClick={() => t(false)}
            className="absolute top-2 right-2 text-[#6B6862] hover:text-[#183C40] transition-colors"
            aria-label="Close message"
          >
            <XIcon className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#30565B] uppercase mb-1">
            <SparklesIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>UROOJ CONCIERGE</span>
          </div>
          <p className="text-xs text-[#171A19]/80 mb-3 leading-relaxed font-light">
            Need immediate assistance or looking for a bespoke design? Chat directly with our private jewellery advisors.
          </p>
          <a
            href={whatsappLink(CONFIG.whatsappPrefill)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-xs font-semibold py-2 rounded-lg tracking-wider uppercase transition-colors"
          >
            Start WhatsApp Chat
          </a>
        </div>
      )}
      <div className="relative group">
        <a
          href={whatsappLink(CONFIG.whatsappPrefill)}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => t(true)}
          className="flex items-center gap-2.5 bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] px-4 py-3 rounded-full shadow-2xl border border-[#C6A15B] transition-all transform hover:scale-105"
          aria-label="WhatsApp Jewellery Concierge"
        >
          <MessageCircleIcon className="w-5 h-5 text-[#C6A15B]" />
          <span className="text-xs font-semibold tracking-wider uppercase hidden sm:inline">WhatsApp Concierge</span>
        </a>
      </div>
    </div>
  );
};

export default FloatingActions;
