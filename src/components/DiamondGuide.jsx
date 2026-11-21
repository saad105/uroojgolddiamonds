import React, { useState } from 'react';
import { AwardIcon, CalendarIcon } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';

const DiamondGuide = ({ onOpenAppointment }) => {
  const [t, r] = useState('cut'),
    l = [
      {
        id: 'cut',
        label: '1. CUT (Optics & Fire)',
      },
      {
        id: 'color',
        label: '2. COLOUR (Purity of Light)',
      },
      {
        id: 'clarity',
        label: '3. CLARITY (Internal Perfection)',
      },
      {
        id: 'carat',
        label: '4. CARAT (Weight & Presence)',
      },
    ];
  return (
    <section className="py-16 bg-[#FAF7F2] border-y border-[#EDE5D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Gemological Guide"
          title="UNDERSTANDING YOUR DIAMOND"
          subtitle="Every Urooj diamond is hand-selected and certified. Learn the 4Cs to choose with uncompromised confidence."
          alignment="center"
        />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {l.map((c) => (
            <button
              onClick={() => r(c.id)}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${t === c.id ? 'bg-[#183C40] text-[#F7F3EA] shadow-lg border border-[#C6A15B]' : 'bg-white text-[#183C40] border border-[#EDE5D7] hover:border-[#C6A15B]/50'}`}
              key={c.id}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-[#EDE5D7] p-6 sm:p-10 shadow-md">
          {t === 'cut' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-semibold tracking-widest text-[#C6A15B] uppercase">Optical Physics & Symmetry</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#183C40]">The Cut: The Soul of a Diamond's Brilliance</h3>
                <p className="text-sm text-[#171A19]/80 leading-relaxed font-light">
                  A diamond's cut is not just its geometric shape, but how masterfully its 57 or 58 facets are aligned to bounce
                  light back through the crown. An Ideal Cut maximizes fire, brilliance, and scintillation without allowing light
                  to leak through the sides.
                </p>
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE5D7] space-y-2">
                  <span className="text-xs font-bold text-[#183C40] uppercase tracking-wider block">The Urooj Standard:</span>
                  <p className="text-xs text-[#6B6862]">
                    {'We exclusively set '}
                    <strong>Ideal & Excellent Cut</strong>
                    {' diamonds to guarantee maximum sparkle in everyday natural ambient light.'}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 bg-[#183C40] rounded-xl p-6 text-[#F7F3EA] space-y-4 border border-[#C6A15B]/40">
                <h4 className="text-sm font-semibold tracking-wider uppercase text-[#DFCA8F]">Light Performance Grades</h4>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#30565B]/60 rounded-lg border border-[#C6A15B]/30 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-[#DFCA8F]">Ideal / Excellent Cut</span>
                      <p className="text-[#EDE5D7]/80 text-[11px]">Reflects nearly 100% of light directly through table</p>
                    </div>
                    <AwardIcon className="w-5 h-5 text-[#C6A15B]" />
                  </div>
                  <div className="p-3 bg-[#0e2528]/60 rounded-lg border border-[#EDE5D7]/10 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-[#EDE5D7]">Very Good Cut</span>
                      <p className="text-[#EDE5D7]/70 text-[11px]">Superior brightness suitable for bespoke solitaires</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {t === 'color' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-semibold tracking-widest text-[#C6A15B] uppercase">Purity of Light</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#183C40]">Diamond Colour: The Absence of Hue</h3>
                <p className="text-sm text-[#171A19]/80 leading-relaxed font-light">
                  Diamond color grades evaluate the stone's lack of color. Graded on an alphabetical scale from D (completely
                  colorless) to Z. The less color, the higher the rarity and optical purity.
                </p>
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE5D7] space-y-2">
                  <span className="text-xs font-bold text-[#183C40] uppercase tracking-wider block">The Urooj Standard:</span>
                  <p className="text-xs text-[#6B6862]">
                    {'Our diamond collections focus on '}
                    <strong>D-F Colorless</strong>
                    {' and '}
                    <strong>G-H Near Colorless</strong>
                    {' diamonds, delivering crisp icy brilliance in yellow, white, and rose gold settings.'}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 bg-[#183C40] rounded-xl p-6 text-[#F7F3EA] space-y-3 border border-[#C6A15B]/40">
                <h4 className="text-sm font-semibold tracking-wider uppercase text-[#DFCA8F]">Color Spectrum Guide</h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#30565B]/60 rounded-lg flex justify-between items-center">
                    <span className="font-semibold text-[#DFCA8F]">D, E, F</span>
                    <span className="text-[#EDE5D7]/90 font-light">Colorless (Rarest & Purest)</span>
                  </div>
                  <div className="p-3 bg-[#0e2528]/60 rounded-lg flex justify-between items-center">
                    <span className="font-semibold text-[#EDE5D7]">G, H, I, J</span>
                    <span className="text-[#EDE5D7]/80 font-light">Near Colorless (Exceptional value)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {t === 'clarity' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-semibold tracking-widest text-[#C6A15B] uppercase">Internal Perfection</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#183C40]">Clarity: Nature’s Unique Fingerprint</h3>
                <p className="text-sm text-[#171A19]/80 leading-relaxed font-light">
                  Formed deep within the Earth under extreme heat and pressure, natural diamonds possess unique internal
                  characteristics called inclusions and external marks called blemishes.
                </p>
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE5D7] space-y-2">
                  <span className="text-xs font-bold text-[#183C40] uppercase tracking-wider block">The Urooj Standard:</span>
                  <p className="text-xs text-[#6B6862]">
                    {'We strictly reject visible inclusions, curating only '}
                    <strong>VVS (Very Very Slightly Included)</strong>
                    {' and '}
                    <strong>VS (Very Slightly Included)</strong>
                    {' diamonds completely eye-clean.'}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 bg-[#183C40] rounded-xl p-6 text-[#F7F3EA] space-y-3 border border-[#C6A15B]/40">
                <h4 className="text-sm font-semibold tracking-wider uppercase text-[#DFCA8F]">Clarity Hierarchy</h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#30565B]/60 rounded-lg flex justify-between items-center">
                    <span className="font-semibold text-[#DFCA8F]">FL / IF</span>
                    <span className="text-[#EDE5D7]">Flawless / Internally Flawless</span>
                  </div>
                  <div className="p-3 bg-[#30565B]/40 rounded-lg flex justify-between items-center">
                    <span className="font-semibold text-[#DFCA8F]">VVS1 - VVS2</span>
                    <span className="text-[#EDE5D7]">Very, Very Slightly Included</span>
                  </div>
                  <div className="p-3 bg-[#0e2528]/60 rounded-lg flex justify-between items-center">
                    <span className="font-semibold text-[#EDE5D7]">VS1 - VS2</span>
                    <span className="text-[#EDE5D7]">Very Slightly Included (100% Eye Clean)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {t === 'carat' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-semibold tracking-widest text-[#C6A15B] uppercase">Weight & Proportions</span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#183C40]">Carat Weight: Presence & Scale</h3>
                <p className="text-sm text-[#171A19]/80 leading-relaxed font-light">
                  Carat refers to the physical weight of the diamond (1 carat = 200 milligrams). Because large diamonds are
                  extraordinarily rare in nature, diamond value increases exponentially with carat weight.
                </p>
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE5D7] space-y-2">
                  <span className="text-xs font-bold text-[#183C40] uppercase tracking-wider block">The Urooj Standard:</span>
                  <p className="text-xs text-[#6B6862]">
                    We provide exact digital carat calibration for solitaires and total carat weight (ctw) breakdowns for
                    multi-stone creations.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-6 bg-[#183C40] rounded-xl p-6 text-[#F7F3EA] space-y-3 border border-[#C6A15B]/40">
                <h4 className="text-sm font-semibold tracking-wider uppercase text-[#DFCA8F]">Popular Solitaire Weights</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#30565B]/60 rounded-lg text-center">
                    <span className="block text-lg font-serif font-bold text-[#DFCA8F]">0.75 ct</span>
                    <span className="text-[11px] text-[#EDE5D7]/80">Classic Pendant & Ring</span>
                  </div>
                  <div className="p-3 bg-[#30565B]/60 rounded-lg text-center">
                    <span className="block text-lg font-serif font-bold text-[#DFCA8F]">1.00 ct</span>
                    <span className="text-[11px] text-[#EDE5D7]/80">Iconic Engagement Solitaire</span>
                  </div>
                  <div className="p-3 bg-[#30565B]/60 rounded-lg text-center">
                    <span className="block text-lg font-serif font-bold text-[#DFCA8F]">1.50 ct</span>
                    <span className="text-[11px] text-[#EDE5D7]/80">Regal Solitaire Statement</span>
                  </div>
                  <div className="p-3 bg-[#30565B]/60 rounded-lg text-center">
                    <span className="block text-lg font-serif font-bold text-[#DFCA8F]">2.00+ ct</span>
                    <span className="text-[11px] text-[#EDE5D7]/80">Monumental Heirloom</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-10 bg-[#30565B] text-[#F7F3EA] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#C6A15B]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-serif text-[#F7F3EA]">Seek Guided Diamond Advice</h4>
            <p className="text-xs sm:text-sm text-[#EDE5D7]/80 font-light">
              Speak with our certified gemologists to examine specific cuts, certificates, and settings.
            </p>
          </div>
          <button
            onClick={onOpenAppointment}
            className="bg-[#C6A15B] hover:bg-[#DFCA8F] text-[#183C40] px-6 py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>CONSULT A JEWELLERY EXPERT</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiamondGuide;
