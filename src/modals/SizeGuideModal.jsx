import React, { useState } from 'react';
import { MessageCircleIcon, RulerIcon, SparklesIcon, XIcon } from 'lucide-react';
import { whatsappLink } from '../lib/format.js';

const SizeGuideModal = ({ isOpen, onClose, initialTab = 'ring' }) => {
  const [l, c] = useState(initialTab);
  if (!isOpen) {
    return null;
  }
  const d = [
      {
        indian: 6,
        diameterMm: 14.7,
        circMm: 46.1,
        us: 3.75,
      },
      {
        indian: 7,
        diameterMm: 15,
        circMm: 47.1,
        us: 4.25,
      },
      {
        indian: 8,
        diameterMm: 15.3,
        circMm: 48,
        us: 4.5,
      },
      {
        indian: 9,
        diameterMm: 15.6,
        circMm: 49,
        us: 5,
      },
      {
        indian: 10,
        diameterMm: 16,
        circMm: 50.2,
        us: 5.5,
      },
      {
        indian: 11,
        diameterMm: 16.3,
        circMm: 51.2,
        us: 5.75,
      },
      {
        indian: 12,
        diameterMm: 16.6,
        circMm: 52.1,
        us: 6,
      },
      {
        indian: 13,
        diameterMm: 17,
        circMm: 53.4,
        us: 6.5,
      },
      {
        indian: 14,
        diameterMm: 17.3,
        circMm: 54.3,
        us: 7,
      },
      {
        indian: 15,
        diameterMm: 17.6,
        circMm: 55.3,
        us: 7.25,
      },
      {
        indian: 16,
        diameterMm: 18,
        circMm: 56.5,
        us: 7.75,
      },
      {
        indian: 17,
        diameterMm: 18.3,
        circMm: 57.5,
        us: 8,
      },
      {
        indian: 18,
        diameterMm: 18.6,
        circMm: 58.4,
        us: 8.5,
      },
      {
        indian: 19,
        diameterMm: 19,
        circMm: 59.7,
        us: 9,
      },
      {
        indian: 20,
        diameterMm: 19.3,
        circMm: 60.6,
        us: 9.25,
      },
      {
        indian: 22,
        diameterMm: 20,
        circMm: 62.8,
        us: 10,
      },
      {
        indian: 24,
        diameterMm: 20.6,
        circMm: 64.7,
        us: 10.75,
      },
      {
        indian: 26,
        diameterMm: 21.2,
        circMm: 66.6,
        us: 11.5,
      },
    ],
    u = [
      {
        size: '2-2 (2.2)',
        innerDiameterInches: '2.125"',
        innerDiameterMm: 54,
        circumferenceMm: 169.6,
        fit: 'Very Petite / Teen',
      },
      {
        size: '2-4 (2.4)',
        innerDiameterInches: '2.250"',
        innerDiameterMm: 57.2,
        circumferenceMm: 179.6,
        fit: 'Small / Petite Adult',
      },
      {
        size: '2-6 (2.6)',
        innerDiameterInches: '2.375"',
        innerDiameterMm: 60.3,
        circumferenceMm: 189.5,
        fit: 'Medium (Most Popular)',
      },
      {
        size: '2-8 (2.8)',
        innerDiameterInches: '2.500"',
        innerDiameterMm: 63.5,
        circumferenceMm: 199.5,
        fit: 'Standard Large',
      },
      {
        size: '2-10 (2.10)',
        innerDiameterInches: '2.625"',
        innerDiameterMm: 66.7,
        circumferenceMm: 209.4,
        fit: 'Extra Large',
      },
    ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl border border-[#C6A15B] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#183C40] text-[#F7F3EA] p-5 sm:p-6 flex items-center justify-between border-b border-[#C6A15B]/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#30565B] flex items-center justify-center border border-[#C6A15B]/40 text-[#DFCA8F]">
              <RulerIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#DFCA8F] block">
                Precision Jewellery Sizing Guide
              </span>
              <h3 className="text-xl font-serif text-[#F7F3EA] tracking-wide">Ring & Bangle Size Guide</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#EDE5D7] hover:text-[#C6A15B] rounded-full transition-colors cursor-pointer"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex border-b border-[#EDE5D7] bg-[#EDE5D7]/40 px-6 pt-2 shrink-0 gap-2">
          <button
            onClick={() => c('ring')}
            className={`py-2.5 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${l === 'ring' ? 'border-[#30565B] text-[#183C40] bg-white rounded-t-lg' : 'border-transparent text-[#6B6862] hover:text-[#183C40]'}`}
          >
            Ring Sizing Chart
          </button>
          <button
            onClick={() => c('bangle')}
            className={`py-2.5 px-4 text-xs font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer ${l === 'bangle' ? 'border-[#30565B] text-[#183C40] bg-white rounded-t-lg' : 'border-transparent text-[#6B6862] hover:text-[#183C40]'}`}
          >
            Bangle & Kada Chart
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#171A19]">
          {l === 'ring' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-2">
                  <span className="font-bold text-[#183C40] uppercase tracking-wider block text-[11px]">
                    Method 1: Measure an Existing Ring
                  </span>
                  <p className="text-[11px] text-[#6B6862] leading-relaxed font-light">
                    {'Take a ring that fits your desired finger comfortably. Place it flat over a ruler and measure the '}
                    <strong>inside diameter</strong>
                    {' in millimetres (excluding the metal ring edge). Compare with our chart below.'}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-2">
                  <span className="font-bold text-[#183C40] uppercase tracking-wider block text-[11px]">
                    Method 2: Paper Strip / String Method
                  </span>
                  <p className="text-[11px] text-[#6B6862] leading-relaxed font-light">
                    {
                      'Wrap a non-stretchy strip of paper snugly around your knuckle. Mark the overlap point with a pen, flatten it against a ruler to read the '
                    }
                    <strong>circumference in mm</strong>.
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-[#EDE5D7] bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#183C40] text-[#DFCA8F] text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Indian Size</th>
                      <th className="py-2.5 px-3">Inner Diameter (mm)</th>
                      <th className="py-2.5 px-3">Circumference (mm)</th>
                      <th className="py-2.5 px-3">US Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE5D7]">
                    {d.map((m) => (
                      <tr className="hover:bg-[#FAF7F2] transition-colors" key={m.indian}>
                        <td className="py-2 px-3 font-mono font-bold text-[#30565B]">#{m.indian}</td>
                        <td className="py-2 px-3 font-mono">
                          {m.diameterMm}
                          {' mm'}
                        </td>
                        <td className="py-2 px-3 font-mono">
                          {m.circMm}
                          {' mm'}
                        </td>
                        <td className="py-2 px-3 text-[#6B6862]">{m.us}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-[#30565B]/10 p-3 rounded-xl flex items-center gap-2 text-[11px] text-[#183C40]">
                <SparklesIcon className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>
                  Tip: If your knuckle is significantly wider than the finger base, order one half-size larger for smooth passage.
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-2">
                <span className="font-bold text-[#183C40] uppercase tracking-wider block text-[11px]">
                  How to Measure Bangle Size
                </span>
                <p className="text-[11px] text-[#6B6862] leading-relaxed font-light">
                  {
                    'Bring your thumb and pinky finger together as if sliding on a bangle. Using a measuring tape or string, wrap around the '
                  }
                  <strong>widest part of your hand</strong>
                  {' (knuckles). Measure the length in millimetres and divide by 3.14 to calculate your exact inside diameter.'}
                </p>
              </div>
              <div className="overflow-x-auto rounded-xl border border-[#EDE5D7] bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#183C40] text-[#DFCA8F] text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Indian Bangle Size</th>
                      <th className="py-2.5 px-3">Inner Diameter (Inches)</th>
                      <th className="py-2.5 px-3">Inner Diameter (mm)</th>
                      <th className="py-2.5 px-3">Typical Fit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE5D7]">
                    {u.map((m) => (
                      <tr className="hover:bg-[#FAF7F2] transition-colors" key={m.size}>
                        <td className="py-2.5 px-3 font-mono font-bold text-[#30565B]">{m.size}</td>
                        <td className="py-2.5 px-3 font-mono">{m.innerDiameterInches}</td>
                        <td className="py-2.5 px-3 font-mono">
                          {m.innerDiameterMm}
                          {' mm'}
                        </td>
                        <td className="py-2.5 px-3 text-[#6B6862] font-medium">{m.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="bg-[#0e2528] text-[#F7F3EA] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-[#DFCA8F] block">Unsure about your exact fit?</span>
              <p className="text-[11px] text-[#EDE5D7]/80 font-light">
                Our jewellery masters can size you over WhatsApp video call or via a complimentary ring-sizer kit.
              </p>
            </div>
            <a
              href={whatsappLink('Hello Urooj Gold & Diamonds, I need guidance with ring/bangle sizing for a jewellery piece.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center gap-1.5 shrink-0"
            >
              <MessageCircleIcon className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
        <div className="bg-[#EDE5D7]/40 p-4 px-6 border-t border-[#EDE5D7] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="bg-[#30565B] hover:bg-[#183C40] text-[#F7F3EA] text-xs font-semibold tracking-wider uppercase py-2 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
