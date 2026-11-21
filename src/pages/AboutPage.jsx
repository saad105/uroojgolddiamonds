import React, { useState } from 'react';
import {
  AwardIcon,
  CheckIcon,
  ClockIcon,
  ExternalLinkIcon,
  LockIcon,
  MapPinIcon,
  MessageCircleIcon,
  NavigationIcon,
  PhoneIcon,
  RefreshCwIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from 'lucide-react';
import { saveCustomerInquiryToCloud } from '../lib/supabase.js';
import { whatsappLink } from '../lib/format.js';
import { CONFIG } from '../data/store.js';
import SectionHeading from '../components/SectionHeading.jsx';

const AboutPage = ({ onOpenAppointment, onOpenLegalModal }) => {
  const [r, l] = useState(''),
    [c, d] = useState(''),
    [u, m] = useState(''),
    [p, x] = useState(''),
    [b, g] = useState('Gold Jewellery'),
    [v, w] = useState(''),
    [C, E] = useState(true),
    [S, k] = useState(false),
    [O, T] = useState(''),
    [R, P] = useState(false),
    [marketingConsent, setMarketingConsent] = useState(true),
    V = (G) => {
      if ((G.preventDefault(), !r || !c || !v || !C)) {
        return;
      }
      saveCustomerInquiryToCloud({
        name: r,
        phone: c,
        email: u || undefined,
        subject: p || 'General Jewellery Consultation',
        interest: b,
        message: `${v}\n\nMarketing consent (RCS SMS & WhatsApp): ${marketingConsent ? 'Yes' : 'No'}`,
        source: 'about_contact_enquiry',
      })
        .then((oe) => {
          if (oe.success) {
            P(true);
          }
        })
        .catch((oe) => {
          console.warn('Notice saving enquiry to Supabase:', oe);
        });
      try {
        const oe = JSON.parse(localStorage.getItem('urooj_enquiries') || '[]'),
          ye = {
            id: `INQ-${Date.now()}`,
            name: r,
            phone: c,
            email: u,
            category: b,
            subject: p,
            message: v,
            marketingConsent,
            createdAt: new Date().toISOString(),
          };
        localStorage.setItem('urooj_enquiries', JSON.stringify([ye, ...oe]));
      } catch {}
      const X = `*ENQUIRY — UROOJ GOLD & DIAMONDS*
*Name:* ${r}
*Phone:* ${c}
${
  u
    ? `*Email:* ${u}
`
    : ''
}*Category:* ${b}
*Subject:* ${p || 'General Jewellery Consultation'}
*Message:* ${v}
*Consent:* I hereby grant explicit consent under the DPDP Act 2023 to Urooj Gold & Diamonds to process my contact details solely to respond to this enquiry.${
  marketingConsent
    ? `
*Updates:* I agree to receive information regarding gold and diamonds through RCS SMS and WhatsApp from Urooj Gold and Diamonds (A unit of Ghori Jewellers LLP).`
    : ''
}`,
        W = whatsappLink(X);
      T(W);
      k(true);
      window.open(W, '_blank');
    },
    H = () => {
      l('');
      d('');
      m('');
      x('');
      w('');
      k(false);
    };
  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="relative min-h-[44vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#071F1B] text-[#F7F3EA] border-b-2 border-[#C6A15B]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=80"
            alt="Artisan Goldsmith Craftsmanship"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071F1B] via-[#071F1B]/80 to-[#071F1B]/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="flex justify-center mb-5">
            <img
              src={CONFIG.logoUrl}
              alt="Urooj Gold & Diamonds Insignia"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#C6A15B] shadow-[0_4px_30px_rgba(198,161,91,0.4)] p-1 bg-[#09231E] ring-2 ring-[#DFCA8F]/60"
              onError={(G) => {
                const X = G.currentTarget;
                if (X.src !== CONFIG.logoUrlRemote) {
                  X.src = CONFIG.logoUrlRemote;
                }
              }}
            />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09231E] text-[#DFCA8F] text-[11px] font-semibold tracking-widest uppercase border border-[#C6A15B]/50 mb-4 shadow-md">
            <SparklesIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
            WHERE TRUST MEETS LUXURY
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif tracking-wide uppercase text-[#F7F3EA] mb-4 drop-shadow-[0_2px_10px_rgba(198,161,91,0.2)]">
            ABOUT UROOJ GOLD & DIAMONDS
          </h1>
          <p className="font-serif italic text-sm sm:text-base text-[#DFCA8F] max-w-2xl mx-auto leading-relaxed mb-4">
            “{CONFIG.urduTagline}”
          </p>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#EDE5D7]/90 font-light leading-relaxed">
            Mehdipatnam X Road, Hyderabad • 100% BIS Hallmarked 22K Gold • Certified Natural Diamonds
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              eyebrow="Hyderabad's Premium Jewelry Destination"
              title={
                <>
                  WELCOME TO UROOJ GOLD & DIAMONDS
                  <span className="block mt-2 text-base sm:text-lg md:text-xl italic tracking-wider text-[#A9823D]">
                    (A unit of Ghori Jewellers LLP)
                  </span>
                </>
              }
              subtitle=""
              alignment="left"
              className="mb-0"
            />
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border-l-4 border-[#071F1B] shadow-sm text-sm text-[#171A19]/90 font-normal leading-relaxed">
              Welcome to Urooj Gold & Diamonds, Hyderabad’s premium jewelry destination. Located at the bustling Mehdipatnam X
              Road, we blend cultural legacy with modern artistry. Every piece we craft is designed to celebrate life's most
              precious milestones—from a daughter's wedding day to everyday celebrations. We specialize in high-quality,
              lightweight, and heavy bridal jewelry engineered for both modern luxury and traditional heritage.
            </div>
            <p className="text-xs sm:text-sm text-[#171A19]/80 font-light leading-relaxed">
              Our showroom houses masterworks inspired by five distinguished design eras: Kuwaiti, Turkish, Nizami, Kolkata, and
              Bangalore styles. We combine centuries-old craftsmanship with modern structural engineering to deliver daily-wear
              lightweight necklaces starting from just 7 grams and majestic bridal haars starting from just 20 grams.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenAppointment}
                className="bg-[#071F1B] hover:bg-[#09231E] text-[#DFCA8F] text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer border border-[#C6A15B]/40"
              >
                SCHEDULE SHOWROOM CONSULTATION
              </button>
              <a
                href={whatsappLink(
                  'Hello Urooj Gold & Diamonds, I would like to enquire with your Mehdipatnam jewellery advisors.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-widest uppercase px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircleIcon className="w-4 h-4" />
                <span>CHAT VIA WHATSAPP (+91 99661 62100)</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B] shadow-xl aspect-[4/5] bg-[#071F1B]">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
                alt="Urooj Gold & Diamonds Mehdipatnam Showroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071F1B] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-[#071F1B]/95 border border-[#C6A15B]/50 backdrop-blur-md text-[#F7F3EA]">
                <div className="flex items-center gap-2 text-[#DFCA8F] text-xs font-semibold tracking-widest uppercase">
                  <MapPinIcon className="w-4 h-4" />
                  <span>Mehdipatnam X Road</span>
                </div>
                <p className="text-[11px] text-[#EDE5D7]/80 mt-0.5">Below Sapphire Banquets, M S G Plaza, Hyderabad</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Official Terms & Exchange Structure"
          title="STORE POLICIES & TERMS"
          subtitle="Governed strictly by our official Terms & Conditions, melting purities, and 7-day exchange policies."
          alignment="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-[#071F1B] space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#071F1B] flex items-center justify-center text-[#DFCA8F]">
              <RefreshCwIcon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#071F1B] bg-[#071F1B]/10 px-2 py-0.5 rounded inline-block">
              100% EXCHANGE POLICY
            </span>
            <h4 className="font-serif text-lg font-bold text-[#071F1B]">100% Exchange on 18k & 22k / 916</h4>
            <p className="text-xs text-[#6B6862] leading-relaxed font-light">
              100% Exchange 18k & 22k / 916. Diamond Jewellery: 100% on 22k 916, 100% on 18k Gold Rate, Diamonds Value 90%. Return
              value: 2% Less on Net Weight 22k 916.
            </p>
          </div>
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-[#C6A15B] space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#C6A15B] flex items-center justify-center text-[#071F1B]">
              <ClockIcon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A9823D] bg-[#C6A15B]/20 px-2 py-0.5 rounded inline-block">
              7-DAY EXCHANGE POLICY
            </span>
            <h4 className="font-serif text-lg font-bold text-[#071F1B]">100% Invoice Value within 7 Days</h4>
            <p className="text-xs text-[#6B6862] leading-relaxed font-light">
              If exchange within 7 days of purchase: 100% exchange of invoice value can be availed by the customer on unused
              products without any damage. Original bills must be produced.
            </p>
          </div>
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-[#071F1B] space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-[#071F1B] flex items-center justify-center text-[#DFCA8F]">
              <ShieldCheckIcon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#071F1B] bg-[#071F1B]/10 px-2 py-0.5 rounded inline-block">
              ORNAMENT QUALITIES
            </span>
            <h4 className="font-serif text-lg font-bold text-[#071F1B]">Melting Purities 999, 916 & 750</h4>
            <p className="text-xs text-[#6B6862] leading-relaxed font-light">
              The ornament sold by us have the following melting purities: 999 Pure gold (24k), 91.6% (22k) content, and 750
              (18k): 75% pure gold content (Studded jewellery).
            </p>
          </div>
        </div>
        <div className="mt-6 bg-[#071F1B] text-[#DFCA8F] p-4 rounded-xl text-center text-xs font-semibold border border-[#C6A15B]/40">
          Note: Making Charges and Wastage Charges will not be Refunded at Any Cost. • Pan card is mandatory for purchase of Rs 2
          lakh and above.
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#071F1B] text-[#F7F3EA] rounded-3xl p-8 sm:p-12 border-2 border-[#C6A15B] shadow-xl">
          <SectionHeading
            eyebrow="Curated Design Eras"
            title="COLLECTIONS & ARTISANAL STYLES"
            subtitle="Inspired by the cultural richness of Kuwaiti, Turkish, Nizami, Kolkata, and Bangalore traditions."
            alignment="center"
            light
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            <div className="bg-[#09231E]/90 p-5 rounded-xl border border-[#C6A15B]/30 space-y-2">
              <span className="text-[10px] font-bold text-[#DFCA8F] tracking-widest uppercase">LIGHTWEIGHT COLLECTION</span>
              <h5 className="font-serif text-lg font-bold text-[#F7F3EA]">Necklaces Starting from 7 Grams</h5>
              <p className="text-xs text-[#EDE5D7]/80 font-light leading-relaxed">
                Exquisite, daily-wear, and festive statement necklaces precision-engineered to be lightweight, durable, and
                comfortable without compromising on visual grandeur.
              </p>
            </div>
            <div className="bg-[#09231E]/90 p-5 rounded-xl border border-[#C6A15B]/30 space-y-2">
              <span className="text-[10px] font-bold text-[#DFCA8F] tracking-widest uppercase">ROYAL BRIDAL COLLECTION</span>
              <h5 className="font-serif text-lg font-bold text-[#F7F3EA]">Grand Haars Starting from 20 Grams</h5>
              <p className="text-xs text-[#EDE5D7]/80 font-light leading-relaxed">
                Intricate bridal and festive long necklaces (haars) delivering royal volume and stately presence starting from
                just 20 grams.
              </p>
            </div>
            <div className="bg-[#09231E]/90 p-5 rounded-xl border border-[#C6A15B]/30 space-y-2">
              <span className="text-[10px] font-bold text-[#DFCA8F] tracking-widest uppercase">AESTHETIC VARIETY</span>
              <h5 className="font-serif text-lg font-bold text-[#F7F3EA]">Rings, Bangles, Lacha & Bracelets</h5>
              <p className="text-xs text-[#EDE5D7]/80 font-light leading-relaxed">
                Premium certified diamond rings, daily-wear bangles, modern Hyderabadi lacha designs, elegant ear tops, and bold
                gold and diamond bracelets.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#C6A15B]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SparklesIcon className="w-5 h-5 text-[#DFCA8F]" />
              <span className="text-xs text-[#EDE5D7]/90">
                Explore real video showcases of our latest bridal haars and lightweight collections on Instagram.
              </span>
            </div>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/reel/DZpSayGv89z/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#B99249] to-[#DFCA8F] hover:from-[#DFCA8F] hover:to-[#F7F3EA] text-[#071F1B] text-xs font-bold px-4 py-2 rounded-lg tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 shadow-md"
              >
                <span>Bridal Reel</span>
                <ExternalLinkIcon className="w-3 h-3 text-[#071F1B]" />
              </a>
              <a
                href="https://www.instagram.com/reel/DZrVBroRofT/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#09231E] hover:bg-[#0C2C26] text-[#DFCA8F] text-xs font-semibold px-4 py-2 rounded-lg tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 border border-[#C6A15B]/50"
              >
                <span>Lightweight Reel</span>
                <ExternalLinkIcon className="w-3 h-3 text-[#DFCA8F]" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] p-8 rounded-3xl border-2 border-[#071F1B] shadow-md space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#EDE5D7] pb-6">
            <div>
              <div className="flex items-center gap-2 text-[#071F1B] text-xs font-bold uppercase tracking-wider mb-1">
                <ScaleIcon className="w-4 h-4 text-[#071F1B]" />
                <span>Statutory Governance</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#071F1B]">
                LAWS, CONSTITUTION OF INDIA & TELANGANA STATE RULES
              </h3>
              <p className="text-xs text-[#6B6862] font-light mt-1">
                Our business is 100% compliant with National and Telangana State precious metal trading and consumer protection
                laws.
              </p>
            </div>
            <button
              onClick={() => onOpenLegalModal && onOpenLegalModal('regulatory')}
              className="bg-[#071F1B] hover:bg-[#09231E] text-[#DFCA8F] text-xs font-semibold px-5 py-2.5 rounded-xl uppercase tracking-wider transition-colors cursor-pointer shrink-0 border border-[#C6A15B]/30"
            >
              Open Compliance Centre
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[#171A19]/80">
            <div className="space-y-1.5">
              <h5 className="font-bold text-[#071F1B] text-sm uppercase flex items-center gap-1.5">
                <ShieldCheckIcon className="w-4 h-4 text-[#071F1B]" />
                BIS Act, 2016 (HUID)
              </h5>
              <p className="text-[11px] leading-relaxed">
                Mandatory 6-digit Hallmark Unique Identification (HUID) stamped on all 22K (916) articles. Verifiable on the
                official BIS CARE mobile app.
              </p>
            </div>
            <div className="space-y-1.5">
              <h5 className="font-bold text-[#071F1B] text-sm uppercase flex items-center gap-1.5">
                <ScaleIcon className="w-4 h-4 text-[#071F1B]" />
                PMLA & PAN Rules
              </h5>
              <p className="text-[11px] leading-relaxed">
                Rule 114B of Income Tax Rules and FIU guidelines: Government PAN card mandatory for precious metal transactions
                aggregating ₹2,00,000 and above.
              </p>
            </div>
            <div className="space-y-1.5">
              <h5 className="font-bold text-[#071F1B] text-sm uppercase flex items-center gap-1.5">
                <AwardIcon className="w-4 h-4 text-[#071F1B]" />
                Legal Metrology
              </h5>
              <p className="text-[11px] leading-relaxed">
                Precision Class-I electronic balances verified and stamped by Telangana Legal Metrology Department. Gross, net
                gold, and stone weights itemized.
              </p>
            </div>
            <div className="space-y-1.5">
              <h5 className="font-bold text-[#071F1B] text-sm uppercase flex items-center gap-1.5">
                <LockIcon className="w-4 h-4 text-[#071F1B]" />
                DPDP Act, 2023
              </h5>
              <p className="text-[11px] leading-relaxed">
                Explicit affirmative consent, purpose limitation, and WhatsApp-routed enquiries. Transparent Grievance Redressal
                Officer in Hyderabad.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              eyebrow="Visit Our Showroom"
              title="GET IN TOUCH"
              subtitle="Located in the heart of Hyderabad's historic jewellery district."
              alignment="left"
              className="mb-0"
            />
            <div className="space-y-4">
              <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#EDE5D7] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#071F1B]/10 flex items-center justify-center text-[#071F1B] shrink-0 mt-1">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#071F1B] uppercase tracking-wider">Store Address</h4>
                  <p className="text-xs text-[#171A19]/80 font-light mt-1 leading-relaxed">{CONFIG.address}</p>
                  <a
                    href="https://maps.google.com/?q=Mehdipatnam+X+Road+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#071F1B] hover:text-[#A9823D] mt-2 uppercase tracking-wider"
                  >
                    <NavigationIcon className="w-3 h-3 text-[#C6A15B]" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>
              <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#EDE5D7] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0 mt-1">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#071F1B] uppercase tracking-wider">
                    Official Phone & WhatsApp
                  </h4>
                  <p className="text-sm font-semibold text-[#071F1B] mt-1 font-mono">{CONFIG.phone}</p>
                  <p className="text-[11px] text-[#6B6862] font-light">
                    Direct VIP support, rate enquiries, and appointment bookings.
                  </p>
                  <a
                    href={whatsappLink('Hello Urooj Gold & Diamonds, I am contacting you regarding jewellery assistance.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#25D366] hover:underline mt-1 uppercase tracking-wider"
                  >
                    <MessageCircleIcon className="w-3.5 h-3.5" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                </div>
              </div>
              <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#EDE5D7] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#071F1B]/10 flex items-center justify-center text-[#071F1B] shrink-0 mt-1">
                  <ClockIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#071F1B] uppercase tracking-wider">Showroom Timings</h4>
                  <p className="text-xs text-[#171A19]/80 font-medium mt-1">{CONFIG.openingHours}</p>
                  <p className="text-[11px] text-[#6B6862] font-light">
                    Open all 7 days for personal viewing and bridal appointments.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-[#FAF7F2] rounded-3xl border border-[#C6A15B]/40 shadow-xl p-6 sm:p-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[11px] font-bold text-[#A9823D] uppercase tracking-widest block">
                    Instant WhatsApp Enquiry Framework
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#071F1B]">SEND AN OFFICIAL ENQUIRY</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md">
                  <MessageCircleIcon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xs text-[#6B6862] font-light mb-6">
                All enquiries are directly routed through our official store WhatsApp number (<strong>+91 99661 62100</strong>) in
                compliance with the Digital Personal Data Protection Act, 2023.
              </p>
              {S ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-[#071F1B] rounded-full flex items-center justify-center mx-auto text-[#DFCA8F] border-2 border-[#C6A15B]">
                    <CheckIcon className="w-8 h-8 text-[#DFCA8F]" />
                  </div>
                  <h4 className="text-2xl font-serif text-[#071F1B]">Enquiry Prepared for WhatsApp</h4>
                  <p className="text-xs text-[#171A19]/80 max-w-md mx-auto font-light leading-relaxed">
                    {
                      'Your enquiry has been structured with your DPDP Act consent and transmitted to our official WhatsApp helpline at '
                    }
                    <strong>+91 99661 62100</strong>.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={O}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-3 px-6 rounded-xl tracking-wider uppercase transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <MessageCircleIcon className="w-4 h-4" />
                      <span>Continue to WhatsApp Chat</span>
                    </a>
                    <button
                      onClick={H}
                      className="border border-[#071F1B] text-[#071F1B] hover:bg-[#071F1B] hover:text-[#DFCA8F] text-xs font-semibold py-3 px-6 rounded-xl tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={V} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#071F1B] uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={r}
                        onChange={(G) => l(G.target.value)}
                        placeholder="e.g. Fatima Begum"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EDE5D7] bg-white text-xs text-[#171A19] focus:outline-none focus:border-[#071F1B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#071F1B] uppercase tracking-wider mb-1">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={c}
                        onChange={(G) => d(G.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EDE5D7] bg-white text-xs text-[#171A19] focus:outline-none focus:border-[#071F1B]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#071F1B] uppercase tracking-wider mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={u}
                        onChange={(G) => m(G.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EDE5D7] bg-white text-xs text-[#171A19] focus:outline-none focus:border-[#071F1B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#071F1B] uppercase tracking-wider mb-1">
                        Interested Collection *
                      </label>
                      <select
                        value={b}
                        onChange={(G) => g(G.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EDE5D7] bg-white text-xs text-[#171A19] focus:outline-none focus:border-[#071F1B]"
                      >
                        <option value="Gold Jewellery">Gold Jewellery 18k & 22k / 916</option>
                        <option value="Diamond Jewellery">Diamond Jewellery 916 & 18k</option>
                        <option value="Bridal Jewellery">Bridal Sets & Haars (from 20g)</option>
                        <option value="Custom Bespoke">Lightweight Necklaces (from 7g)</option>
                        <option value="Old Gold Exchange">100% Exchange on 18k & 22k / 916</option>
                        <option value="Showroom Appointment">Showroom VIP Appointment</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#071F1B] uppercase tracking-wider mb-1">
                      Subject / Occasion
                    </label>
                    <input
                      type="text"
                      value={p}
                      onChange={(G) => x(G.target.value)}
                      placeholder="e.g. Daughter's Wedding Jewellery / Haar Enquiry"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EDE5D7] bg-white text-xs text-[#171A19] focus:outline-none focus:border-[#071F1B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#071F1B] uppercase tracking-wider mb-1">
                      Your Message / Enquiry *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={v}
                      onChange={(G) => w(G.target.value)}
                      placeholder="Please mention preferred weight, design style (Nizami, Kuwaiti, Turkish, Kolkata, Bangalore), or budget range..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EDE5D7] bg-white text-xs text-[#171A19] focus:outline-none focus:border-[#071F1B]"
                    />
                  </div>
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={C}
                        onChange={(G) => E(G.target.checked)}
                        className="mt-0.5 rounded border-[#C6A15B] text-[#071F1B] focus:ring-[#071F1B]"
                      />
                      <span className="text-[11px] text-[#6B6862] leading-tight font-light">
                        {'I give explicit consent under the '}
                        <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>
                        {
                          ' for Urooj Gold & Diamonds to process my contact details solely for handling this enquiry via WhatsApp (+91 99661 62100).'
                        }
                      </span>
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer mt-3">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(G) => setMarketingConsent(G.target.checked)}
                        className="mt-0.5 rounded border-[#C6A15B] text-[#071F1B] focus:ring-[#071F1B]"
                      />
                      <span className="text-[11px] text-[#6B6862] leading-tight font-light">
                        I agree to receive information regarding gold and diamonds through <strong>RCS SMS</strong> and{' '}
                        <strong>WhatsApp</strong> from Urooj Gold and Diamonds (A unit of Ghori Jewellers LLP).
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-widest uppercase py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <MessageCircleIcon className="w-4 h-4" />
                    <span>TRANSMIT VIA OFFICIAL WHATSAPP (+91 99661 62100)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
