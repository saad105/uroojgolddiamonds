import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  AwardIcon,
  BriefcaseIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  CompassIcon,
  FileTextIcon,
  LockIcon,
  MailIcon,
  MessageCircleIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  ScaleIcon,
  ShieldCheckIcon,
  TagIcon,
  TruckIcon,
} from 'lucide-react';
import { CONFIG } from '../data/store.js';

// Order of the sections on the page (and of the tab bar)
export const POLICY_SECTIONS = [
  { id: 'returns', label: 'Return & Exchange', Icon: RotateCcwIcon },
  { id: 'refunds', label: 'Refunds', Icon: RefreshCwIcon },
  { id: 'buyback', label: 'Buyback', Icon: RotateCcwIcon },
  { id: 'cancellation', label: 'Order Cancellation', Icon: FileTextIcon },
  { id: 'privacy', label: 'Privacy Policy', Icon: LockIcon },
  { id: 'shipping', label: 'Shipping Policy', Icon: TruckIcon },
  { id: 'faq', label: 'FAQ', Icon: CircleHelpIcon },
  { id: 'terms', label: 'Terms & Conditions', Icon: FileTextIcon },
  { id: 'offers', label: 'Offers & Schemes', Icon: TagIcon },
  { id: 'sitemap', label: 'Site Map', Icon: CompassIcon },
  { id: 'careers', label: 'Careers', Icon: BriefcaseIcon },
  { id: 'certificate', label: 'Verify Certificate', Icon: AwardIcon },
  { id: 'regulatory', label: 'Statutory BIS Laws', Icon: ScaleIcon },
];

const PolicySection = ({ id, label, Icon, children }) => (
  <section id={`policy-${id}`} className="bg-[#FAF7F2] rounded-2xl border border-[#C6A15B]/40 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-5 sm:px-8 py-4 bg-[#EDE5D7]/60 border-b border-[#EDE5D7]">
      <div className="w-9 h-9 rounded-xl bg-[#183C40] flex items-center justify-center text-[#DFCA8F] shrink-0">
        <Icon className="w-4.5 h-4.5" />
      </div>
      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#183C40] tracking-wide">{label}</h2>
    </div>
    <div className="p-5 sm:p-8 text-xs text-[#171A19]/90 leading-relaxed font-normal">{children}</div>
  </section>
);

/**
 * All terms, policies and statutory information on one page.
 * `initialSection` + `scrollRequest` (a counter bumped on every link click) scroll the page
 * to the requested section, even when the page is already open.
 */
const PoliciesPage = ({ initialSection = 'regulatory', scrollRequest = 0 }) => {
  const [active, setActive] = useState(initialSection);
  const [headerHeight, setHeaderHeight] = useState(0);
  const tabsRef = useRef(null);
  const programmaticScroll = useRef(false);

  // keep the tab bar pinned just below the (sticky, resizing) site header
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;
    const update = () => setHeaderHeight(header.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  const offset = () => (document.querySelector('header')?.offsetHeight || 0) + (tabsRef.current?.offsetHeight || 0) + 16;

  const scrollToSection = useCallback((id, smooth = true) => {
    const el = document.getElementById(`policy-${id}`);
    if (!el) return;
    setActive(id);
    programmaticScroll.current = true;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset(), behavior: smooth ? 'smooth' : 'auto' });
    clearTimeout(scrollToSection.timer);
    scrollToSection.timer = setTimeout(() => (programmaticScroll.current = false), 900);
  }, []);

  // scroll to the requested section whenever a policy link is clicked
  useEffect(() => {
    const t = setTimeout(() => scrollToSection(initialSection), 60);
    return () => clearTimeout(t);
  }, [initialSection, scrollRequest, scrollToSection]);

  // highlight the section currently in view
  useEffect(() => {
    const onScroll = () => {
      if (programmaticScroll.current) return;
      const line = offset() + 24;
      let current = POLICY_SECTIONS[0].id;
      for (const s of POLICY_SECTIONS) {
        const el = document.getElementById(`policy-${s.id}`);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // keep the active tab visible inside the horizontally scrolling tab bar
  useEffect(() => {
    const btn = tabsRef.current?.querySelector(`[data-tab="${active}"]`);
    const bar = btn?.parentElement;
    if (btn && bar) bar.scrollTo({ left: btn.offsetLeft - bar.clientWidth / 2 + btn.clientWidth / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <div className="pb-16 sm:pb-24">
      <section className="bg-[#071F1B] text-[#F7F3EA] border-b-2 border-[#C6A15B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C6A15B]/50 text-[#DFCA8F] text-[11px] font-semibold tracking-widest uppercase">
            <ScaleIcon className="w-3.5 h-3.5" />
            Official Regulatory, Legal & Consumer Protection Framework
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-wide">
            Statutory Compliance, Privacy & Customer Rights
          </h1>
          <p className="text-sm text-[#EDE5D7]/80 font-light max-w-2xl mx-auto">
            Terms & conditions, return, exchange and buyback policies, privacy (DPDP Act 2023), shipping, BIS hallmarking rules
            and more.
          </p>
        </div>
      </section>

      <div
        ref={tabsRef}
        className="sticky z-30 bg-[#F7F3EA]/95 backdrop-blur-md border-b border-[#EDE5D7] shadow-sm"
        style={{ top: headerHeight }}
      >
        <div className="max-w-6xl mx-auto px-2 sm:px-6 flex gap-1.5 overflow-x-auto scrollbar-none">
          {POLICY_SECTIONS.map(({ id, label, Icon }) => (
            <button
              key={id}
              data-tab={id}
              onClick={() => scrollToSection(id)}
              className={`py-3 px-3 text-[11px] font-semibold tracking-wider uppercase border-b-2 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${active === id ? 'border-[#30565B] text-[#183C40] bg-white rounded-t-lg' : 'border-transparent text-[#6B6862] hover:text-[#183C40]'}`}
            >
              <Icon className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <PolicySection id="returns" label="Return & Exchange" Icon={RotateCcwIcon}>
          <div className="space-y-6">
            <div className="bg-[#183C40] text-[#F7F3EA] rounded-xl p-5 border border-[#C6A15B]/40 space-y-1">
              <h4 className="font-serif text-base font-bold text-[#DFCA8F] flex items-center gap-2">
                <RotateCcwIcon className="w-5 h-5 text-[#DFCA8F]" />
                EXCHANGE & PURCHASE POLICIES WITHIN 7 DAYS
              </h4>
              <p className="text-[11.5px] text-[#EDE5D7]/85 font-light">
                If exchange within 7 days of purchase : 100% exchange of invoice value can be availed by the customer, if the
                product is exchange within 7 days of purchase.
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-[#171A19] leading-relaxed">
                exchange of (make to order) orders, Customized Jewellery orders and personalized jewellery orders are not allowed
                for this exchange policy of after 7 days of purchase is applicable.
              </p>
              <p className="font-semibold text-xs text-[#071F1B]">
                Note: The Product Should Not Be Used. If There Is Any Damages The Policy Will Not Be Applicable.
              </p>
              <p className="text-xs text-[#171A19] leading-relaxed">
                All Payments against purchase above twenty five thousand (25k) will be made by post dated cheques only. (Original
                bills must be produced for exchange or disposal).
              </p>
            </div>
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EDE5D7] space-y-2 text-xs">
              <p className="font-bold text-[#071F1B]">Mandatory Requirements:</p>
              <ul className="list-disc pl-5 space-y-1 text-[#6B6862]">
                <li>It is mandatory to produce original bills for exchange or disposal.</li>
                <li>Pan card is mandatory for purchase of Rs 2 lakh and above.</li>
                <li>Transaction of Rs 2 lakh and above will not be accepted by cash.</li>
              </ul>
            </div>
          </div>
        </PolicySection>
        <PolicySection id="refunds" label="Refunds" Icon={RefreshCwIcon}>
          <div className="space-y-6">
            <div className="bg-[#30565B]/10 border border-[#30565B]/30 rounded-xl p-4.5 space-y-1">
              <h4 className="font-serif text-base font-bold text-[#183C40] flex items-center gap-2">
                <RefreshCwIcon className="w-5 h-5 text-[#30565B]" />
                Commercial Refunds & Banking Settlement Policy
              </h4>
              <p className="text-[11.5px] text-[#171A19]/80 font-light">
                Urooj Gold & Diamonds follows standard Indian banking protocols for all financial reversals and settlement claims.
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold text-[#183C40] text-xs uppercase tracking-wider">1. Refund Processing Timelines</h5>
              <ul className="list-disc pl-5 space-y-1.5 text-[11.5px] text-[#171A19]/85">
                <li>
                  <strong>Original Payment Method:</strong>
                  {
                    ' Approved refunds are credited directly back to the original source account (UPI, Net Banking, or Credit/Debit card). In accordance with RBI guidelines, cash refunds are strictly prohibited for amounts exceeding ₹10,000.'
                  }
                </li>
                <li>
                  <strong>Standard Settlement Window:</strong>
                  {
                    " Once an eligible return or order cancellation is inspected and approved by our gemological laboratory, refunds are initiated within 48 hours and typically reflect in the patron's account within 5–7 business days."
                  }
                </li>
                <li>
                  <strong>Advance Deposits on Uncommenced Orders:</strong>
                  {
                    ' If an order is cancelled prior to gemstone procurement or 3D casting initiation, the advance deposit is refunded in full without processing deductions.'
                  }
                </li>
              </ul>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#EDE5D7]">
              <h5 className="font-bold text-[#183C40] text-xs uppercase tracking-wider">2. Assistance & Support Desk</h5>
              <p>
                {'For refund status updates or banking queries, email '}
                <strong>customercare.uroojgoldanddiamonds@gmail.com</strong>
                {' with your Invoice / Order ID or call our accounts desk at '}
                <strong>+91 99661 62100</strong>.
              </p>
            </div>
          </div>
        </PolicySection>
        <PolicySection id="buyback" label="Buyback" Icon={RotateCcwIcon}>
          <div className="space-y-6">
            <div className="bg-[#30565B]/10 border border-[#30565B]/30 rounded-xl p-4.5">
              <h4 className="font-serif text-base font-bold text-[#183C40] mb-1 flex items-center gap-2">
                <RotateCcwIcon className="w-5 h-5 text-[#30565B]" />
                Product Type Exchange & Return Value Policy
              </h4>
              <p className="text-[11.5px] text-[#171A19]/80">
                Valuation rules for all Gold, Diamond, Uncut, Precious Stone, Platinum, and Solitaire jewellery:
              </p>
            </div>
            <div className="overflow-x-auto border border-[#EDE5D7] rounded-xl shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#071F1B] text-[#DFCA8F]">
                    <th className="py-3 px-4 font-serif font-bold uppercase tracking-wider border-r border-[#09231E]">
                      PRODUCT TYPE
                    </th>
                    <th className="py-3 px-4 font-serif font-bold uppercase tracking-wider border-r border-[#09231E]">
                      EXCHANGE VALUE
                    </th>
                    <th className="py-3 px-4 font-serif font-bold uppercase tracking-wider">RETURN VALUE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE5D7] bg-white text-[#171A19]">
                  <tr>
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">Gold Jewellery 18k & 22k / 916</td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">100% Exchange 18k & 22k / 916</td>
                    <td className="py-3 px-4">2% Less on Net Weight 22k 916</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">Diamond Jewellery 916 & 18k</td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">
                      100% Exchange on 22k 916, 100% on 18k Gold Rate, Diamonds Value 90%
                    </td>
                    <td className="py-3 px-4" />
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">Uncut Jewellery 916 & 18k</td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">100% Exchange on 22k 916, 100% on 18k, 90% Uncuts</td>
                    <td className="py-3 px-4">3% Less on Net Weight 22k 916, 3% Less on 18k, 90% Uncuts</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">
                      Precious Stone Jewellery (Ruby, Emerald, Sapphire) 916
                    </td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">
                      100% Exchange on 22k 916, 90% on Precious Stones Value
                    </td>
                    <td className="py-3 px-4">3% Less on Net Weight 22k 916, 90% on Precious Stones Value</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">Platinum 950</td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">95% As per Platinum Privilage Rate</td>
                    <td className="py-3 px-4">95% As per Platinum Privilage Rate</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">Solitaire Diamond Only</td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">95% As Per Privilege Rate</td>
                    <td className="py-3 px-4">90% As Per Privilege Rate</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-[#071F1B] text-[#DFCA8F] py-2.5 px-4 rounded-lg text-center font-semibold text-xs">
              Note: Making Charges and Wastage Charges will not be Refunded at Any Cost.
            </div>
          </div>
        </PolicySection>
        <PolicySection id="cancellation" label="Order Cancellation" Icon={FileTextIcon}>
          <div className="space-y-6">
            <div className="bg-[#C6A15B]/15 border border-[#C6A15B] rounded-xl p-4.5 space-y-1">
              <h4 className="font-serif text-base font-bold text-[#183C40] flex items-center gap-2">
                <FileTextIcon className="w-5 h-5 text-[#183C40]" />
                Order Cancellation Guidelines
              </h4>
              <p className="text-[11.5px] text-[#171A19]/80 font-light">
                Clear terms governing cancellation requests for in-stock showroom pieces and custom-commissioned jewellery.
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold text-[#183C40] text-xs uppercase tracking-wider">1. Catalog & In-Stock Showroom Orders</h5>
              <p>
                {'Orders for standard catalogue pieces can be cancelled at '}
                <strong>100% immediate refund</strong>
                {
                  ' at any time prior to packaging and dispatch by our logistics courier. Simply notify our customer care team on WhatsApp (+91 99661 62100).'
                }
              </p>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#EDE5D7]">
              <h5 className="font-bold text-[#183C40] text-xs uppercase tracking-wider">2. Bespoke Atelier & Custom Castings</h5>
              <p>
                Bespoke orders involve dedicated precious metal alloy melting, 3D wax CAD printing, and hand-setting natural
                diamonds:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[11.5px] text-[#171A19]/85">
                <li>
                  <strong>During CAD Modeling Stage:</strong>
                  {' Cancellation permitted; refund issued minus a nominal CAD design drafting fee of ₹2,500.'}
                </li>
                <li>
                  <strong>After Metal Casting Initiation:</strong>
                  {
                    ' Once pure 22K/18K gold casting or stone setting has commenced, orders cannot be cancelled mid-crafting. Upon completion and delivery, the patron retains full access to our lifetime buyback guarantee.'
                  }
                </li>
              </ul>
            </div>
          </div>
        </PolicySection>
        <PolicySection id="privacy" label="Privacy Policy" Icon={LockIcon}>
          <div className="space-y-6">
            <div className="bg-[#183C40] text-[#F7F3EA] p-5 rounded-xl border border-[#C6A15B]/40 space-y-1">
              <h4 className="font-serif text-base font-semibold text-[#DFCA8F] flex items-center gap-2">
                <LockIcon className="w-5 h-5 text-[#DFCA8F]" />
                Digital Personal Data Protection Act, 2023 (DPDP Act) Notice
              </h4>
              <p className="text-[11.5px] text-[#EDE5D7]/85 font-light">
                {
                  'This Privacy Policy describes how Urooj Gold & Diamonds ("Data Fiduciary") collects, uses, protects, and handles the personal data of customers, showroom visitors, and online users ("Data Principals") in accordance with the '
                }
                <strong>DPDP Act, 2023</strong>
                {' and the '}
                <strong>Information Technology Act, 2000</strong>.
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold text-[#183C40] uppercase tracking-wider text-xs">
                1. Categories of Personal Data Collected
              </h5>
              <p>We process only data strictly necessary for our services:</p>
              <ul className="list-disc pl-5 space-y-1 text-[11.5px] text-[#171A19]/85">
                <li>
                  <strong>Identification Data:</strong>
                  {' Full name, telephone/WhatsApp number, email address (for appointment confirmations and service alerts).'}
                </li>
                <li>
                  <strong>Statutory Invoicing Data:</strong>
                  {
                    ' Government-issued PAN Card / Form 60 and billing address (strictly for invoices aggregating ₹2,00,000 or more as mandated by Indian tax laws).'
                  }
                </li>
                <li>
                  <strong>Consultation Preferences:</strong>
                  {' Preferred design era (Nizami, Turkish, Kuwaiti, etc.), ring/bangle sizes, and appointment schedule.'}
                </li>
                <li>
                  <strong>Technical Metadata:</strong>
                  {' IP address, device type, and session timestamps collected automatically for network security.'}
                </li>
              </ul>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#EDE5D7]">
              <h5 className="font-bold text-[#183C40] uppercase tracking-wider text-xs">
                2. Purpose Limitation & Strict "No-Sale" Guarantee
              </h5>
              <p>
                Your personal data is processed solely for scheduling showroom appointments, preparing custom CAD sketches,
                generating statutory tax invoices, and providing insured doorstep delivery tracking.
              </p>
              <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg p-3 text-[11.5px] font-medium">
                {'🔒 '}
                <strong>Absolute Privacy Commitment:</strong>
                {
                  ' Urooj Gold & Diamonds does NOT sell, rent, lease, or monetize your personal data to third-party marketing brokers or data brokers under any circumstances.'
                }
              </div>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#EDE5D7]">
              <h5 className="font-bold text-[#183C40] uppercase tracking-wider text-xs">
                3. WhatsApp-First Encrypted Architecture
              </h5>
              <p>
                To maximize customer control and data minimization, online enquiries and appointment bookings are routed directly
                to our verified WhatsApp Business channel (+91 99661 62100). All conversations benefit from WhatsApp's end-to-end
                encryption, and customers retain full control over their chat transcripts and deletion.
              </p>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#EDE5D7]">
              <h5 className="font-bold text-[#183C40] uppercase tracking-wider text-xs">
                4. Rights of Data Principals (Under DPDP Act, 2023)
              </h5>
              <ul className="list-disc pl-5 space-y-1 text-[11.5px] text-[#171A19]/85">
                <li>
                  <strong>Right to Information & Summary:</strong>
                  {' You may request a clear summary of personal data processed by us.'}
                </li>
                <li>
                  <strong>Right to Correction & Erasure:</strong>
                  {
                    ' You may request rectification of inaccurate records or erasure of data (subject to mandatory GST/PMLA retention periods of 6 years).'
                  }
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong>
                  {
                    ' You may withdraw consent for promotional messages at any time by replying "STOP" on WhatsApp or emailing our compliance desk.'
                  }
                </li>
                <li>
                  <strong>Right of Grievance Redressal:</strong>
                  {' You have the right to expeditious resolution of privacy complaints.'}
                </li>
              </ul>
            </div>
            <div className="bg-white p-4.5 rounded-xl border border-[#EDE5D7] space-y-2 shadow-xs">
              <h5 className="font-bold text-[#183C40] text-xs uppercase tracking-wider">
                5. Designated Data Protection & Grievance Officer
              </h5>
              <p className="text-[11.5px] text-[#171A19]/80">
                In compliance with Section 8(6) of the Digital Personal Data Protection Act, 2023:
              </p>
              <div className="text-[11.5px] space-y-1 text-[#183C40] font-medium pt-1">
                <p>
                  <strong>Designation:</strong>
                  {' Data Protection & Grievance Redressal Officer'}
                </p>
                <p>
                  <strong>Showroom Address:</strong> {CONFIG.address}
                </p>
                <p>
                  <strong>Phone / WhatsApp:</strong> {CONFIG.phone}
                </p>
                <p>
                  <strong>Email:</strong> {CONFIG.email}
                </p>
              </div>
            </div>
          </div>
        </PolicySection>
        <PolicySection id="shipping" label="Shipping Policy" Icon={TruckIcon}>
          <div className="space-y-6">
            <div className="bg-[#0e2528] text-[#F7F3EA] rounded-xl p-5 border border-[#C6A15B]/30 space-y-2">
              <h4 className="font-serif text-base font-bold text-[#DFCA8F] flex items-center gap-2">
                <TruckIcon className="w-5 h-5 text-[#DFCA8F]" />
                100% Insured Doorstep Transit & Tamper-Proof Packaging
              </h4>
              <p className="text-[11.5px] text-[#EDE5D7]/80 font-light">
                Every order dispatched from Urooj Gold & Diamonds is protected by complimentary comprehensive transit insurance
                until the moment of verified physical handover.
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold text-[#183C40] text-xs uppercase tracking-wider">1. Secure Courier Protocols</h5>
              <ul className="list-disc pl-5 space-y-1.5 text-[11.5px] text-[#171A19]/85">
                <li>
                  <strong>Specialized Armoured Transit:</strong>
                  {
                    ' Shipments are entrusted exclusively to high-security logistics partners specializing in valuable precious cargo (Blue Dart Apex / Sequel Logistics).'
                  }
                </li>
                <li>
                  <strong>Tamper-Evident Security Seals:</strong>
                  {
                    ' Jewellery boxes are enclosed in tamper-proof polymer envelopes with sequential numbered barcodes. If the seal appears breached, customers are advised to reject delivery immediately.'
                  }
                </li>
                <li>
                  <strong>Adult Signature & OTP Handover:</strong>
                  {
                    ' Delivery is executed only upon OTP authentication and verification of government-issued photo identification matching the billing recipient.'
                  }
                </li>
              </ul>
            </div>
            <div className="space-y-3 pt-3 border-t border-[#EDE5D7]">
              <h5 className="font-bold text-[#183C40] text-xs uppercase tracking-wider flex items-center gap-2">
                <AwardIcon className="w-4 h-4 text-[#C6A15B]" />
                2. How to Verify Your 6-Digit HUID on the BIS CARE App
              </h5>
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-2 text-[11.5px]">
                <p className="font-medium text-[#183C40]">Step-by-step verification guide:</p>
                <ol className="list-decimal pl-5 space-y-1 text-[#6B6862]">
                  <li>
                    {'Download the official '}
                    <strong>BIS CARE</strong>
                    {' mobile application from the Google Play Store or Apple App Store.'}
                  </li>
                  <li>
                    {'Navigate to the '}
                    <strong>"Verify HUID"</strong>
                    {' feature on the home screen.'}
                  </li>
                  <li>
                    Enter the unique 6-digit alphanumeric code stamped on your Urooj jewellery piece (and printed on your tax
                    invoice).
                  </li>
                  <li>
                    The application will instantly display the jeweller registration details, assaying & hallmarking centre (AHC),
                    article type, and official stamping date.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </PolicySection>
        <PolicySection id="faq" label="FAQ" Icon={CircleHelpIcon}>
          <div className="space-y-6">
            <div className="bg-[#183C40] text-[#F7F3EA] rounded-xl p-5 border border-[#C6A15B]/40 space-y-1">
              <h4 className="font-serif text-base font-bold text-[#DFCA8F] flex items-center gap-2">
                <CircleHelpIcon className="w-5 h-5 text-[#DFCA8F]" />
                Frequently Asked Questions (FAQ)
              </h4>
              <p className="text-[11.5px] text-[#EDE5D7]/85 font-light">
                Find fast, transparent answers to common questions about hallmarking, pricing, gold exchange, and custom bridal
                orders.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-1.5">
                <h6 className="font-bold text-[#183C40] text-xs">Q1: Is all jewellery sold by Urooj 100% BIS 916 Hallmarked?</h6>
                <p className="text-[11.5px] text-[#6B6862] leading-relaxed">
                  Yes. Every single piece of gold jewellery crafted and displayed at Urooj Gold & Diamonds bears the official
                  Government of India Bureau of Indian Standards (BIS) hallmark, including the BIS logo, purity grade (916 for 22K
                  or 750 for 18K), and a unique 6-digit alphanumeric HUID (Hallmark Unique Identification) stamped at authorized
                  assaying centres.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-1.5">
                <h6 className="font-bold text-[#183C40] text-xs">Q2: How does the 0% Deduction Old Gold Exchange work?</h6>
                <p className="text-[11.5px] text-[#6B6862] leading-relaxed">
                  We evaluate your ancestral or old gold using certified computerized XRF Karatmeters right in front of you
                  without melting. 100% of the pure gold content identified is credited toward your new purchase at the live
                  prevailing gold rate, with zero percentage deduction on the gold metal value.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-1.5">
                <h6 className="font-bold text-[#183C40] text-xs">Q3: Are your diamonds certified natural solitaires?</h6>
                <p className="text-[11.5px] text-[#6B6862] leading-relaxed">
                  Yes. All diamonds used in our jewellery are 100% naturally mined, ethically sourced, and conflict-free.
                  Solitaires and diamond bridal collections are backed by internationally recognized certificates (such as IGI or
                  GIA) guaranteeing color, clarity, cut, and carat weight.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-1.5">
                <h6 className="font-bold text-[#183C40] text-xs">
                  Q4: Can I commission custom jewellery from a photo or design sketch?
                </h6>
                <p className="text-[11.5px] text-[#6B6862] leading-relaxed">
                  Absolutely. Our in-house Master Karigars and CAD atelier at Mehdipatnam specialize in bespoke creations. You can
                  share reference photos or heirloom concepts, receive photo-realistic 3D CAD renders for approval, and have your
                  dream piece crafted within 10–14 business days.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-1.5">
                <h6 className="font-bold text-[#183C40] text-xs">Q5: What are your showroom timings and location?</h6>
                <p className="text-[11.5px] text-[#6B6862] leading-relaxed">
                  We are open from 11:00 AM to 10:00 PM on all days of the week. You will find us at Urooj Gold & Diamonds, M S G
                  Plaza, 12-2-831/8, Street No. 2, MIGH Colony, Murad Nagar, Mehdipatnam X Road, Hyderabad, Telangana 500006.
                </p>
              </div>
            </div>
          </div>
        </PolicySection>
        <PolicySection id="terms" label="Terms & Conditions" Icon={FileTextIcon}>
          <div className="space-y-6 text-[#171A19]">
            <div className="text-center pb-4 border-b border-[#EDE5D7]">
              <h4 className="font-serif text-2xl font-bold tracking-wider text-[#071F1B] uppercase">TERMS & CONDITIONS</h4>
            </div>
            <div className="space-y-2">
              <p className="leading-relaxed">
                <strong>Ornament Qualities :</strong>
                {
                  ' The ornament sold by us have the following melting purities) 999 Pure gold (24k): 91.6% (22k) content 750 (18k): 75% pure gold content. (Studded jewellery)'
                }
              </p>
            </div>
            <div className="space-y-3 pt-3 border-t border-[#EDE5D7]">
              <h5 className="font-bold text-[#071F1B] text-sm uppercase tracking-wider">
                EXCHANGE & PURCHASE POLICIES WITHIN 7 DAYS
              </h5>
              <p className="leading-relaxed">
                If exchange within 7 days of purchase : 100% exchange of invoice value can be availed by the customer, if the
                product is exchange within 7 days of purchase. exchange of (make to order) orders, Customized Jewellery orders and
                personalized jewellery orders are not allowed for this exchange policy of after 7 days of purchase is applicable.
              </p>
              <p className="font-semibold text-[#071F1B]">
                Note: The Product Should Not Be Used. If There Is Any Damages The Policy Will Not Be Applicable.
              </p>
              <p className="leading-relaxed">
                All Payments against purchase above twenty five thousand (25k) will be made by post dated cheques only. (Original
                bills must be produced for exchange or disposal).
              </p>
            </div>
            <div className="overflow-x-auto my-4 border border-[#EDE5D7] rounded-xl shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#071F1B] text-[#DFCA8F] border-b border-[#C6A15B]/30">
                    <th className="py-3 px-4 font-serif font-bold uppercase tracking-wider border-r border-[#09231E]">
                      PRODUCT TYPE
                    </th>
                    <th className="py-3 px-4 font-serif font-bold uppercase tracking-wider border-r border-[#09231E]">
                      EXCHANGE VALUE
                    </th>
                    <th className="py-3 px-4 font-serif font-bold uppercase tracking-wider">RETURN VALUE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDE5D7] bg-white text-[#171A19]">
                  <tr className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">Gold Jewellery 18k & 22k / 916</td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">100% Exchange 18k & 22k / 916</td>
                    <td className="py-3 px-4">2% Less on Net Weight 22k 916</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">Diamond Jewellery 916 & 18k</td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">
                      100% Exchange on 22k 916, 100% on 18k Gold Rate, Diamonds Value 90%
                    </td>
                    <td className="py-3 px-4" />
                  </tr>
                  <tr className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">Uncut Jewellery 916 & 18k</td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">100% Exchange on 22k 916, 100% on 18k, 90% Uncuts</td>
                    <td className="py-3 px-4">3% Less on Net Weight 22k 916, 3% Less on 18k, 90% Uncuts</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">
                      Precious Stone Jewellery (Ruby, Emerald, Sapphire) 916
                    </td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">
                      100% Exchange on 22k 916, 90% on Precious Stones Value
                    </td>
                    <td className="py-3 px-4">3% Less on Net Weight 22k 916, 90% on Precious Stones Value</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">Platinum 950</td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">95% As per Platinum Privilage Rate</td>
                    <td className="py-3 px-4">95% As per Platinum Privilage Rate</td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="py-3 px-4 font-medium border-r border-[#EDE5D7]">Solitaire Diamond Only</td>
                    <td className="py-3 px-4 border-r border-[#EDE5D7]">95% As Per Privilege Rate</td>
                    <td className="py-3 px-4">90% As Per Privilege Rate</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-[#071F1B] text-[#DFCA8F] py-2.5 px-4 rounded-lg text-center font-semibold text-xs border border-[#C6A15B]/40">
              Note: Making Charges and Wastage Charges will not be Refunded at Any Cost.
            </div>
            <div className="space-y-1.5 pt-2">
              <p className="font-semibold text-[#071F1B]">Pan card is mandatory for purchase of Rs 2 lakh and above</p>
              <p className="font-semibold text-[#071F1B]">Transaction of Rs 2 lakh and above will not be accepted by cash</p>
            </div>
            <div className="space-y-1 pt-2 border-t border-[#EDE5D7]">
              <p className="leading-relaxed">
                <strong>JOB ORDER:</strong>
                {
                  ' Cash/metal receipt shall be presented at the time of taking delivery of ornaments failing which ordered item will not be delivered management will have the right to sell the ordered ornaments, if not collected within one month of their time period in case customers wants to re-ordered the ornaments, the same shall be booked at the rate prevailing on the date of Re-order.'
                }
              </p>
            </div>
            <div className="space-y-1 pt-2 border-t border-[#EDE5D7]">
              <p className="leading-relaxed">
                <strong>HALLMARKED JEWELLERY :</strong>
                {
                  ' Customer should ensure the BIS symbol & caratage symbol 916 and 750 marking of the ornaments prior to taking delivery.'
                }
              </p>
            </div>
            <div className="space-y-1 pt-2 border-t border-[#EDE5D7]">
              <p className="leading-relaxed">
                <strong>DECOLORATION OF ORNAMENT:</strong>
                {
                  ' The decoloring of the ornaments may some time occur be reaction with mercury, rose water perfumes, flower acid spillage exposure of solder etc., such ornament should be immediately brought to the shop for cleaning and repolishing and these ornaments should not be considered as inferior in quality.'
                }
              </p>
            </div>
            <div className="space-y-1 pt-2 border-t border-[#EDE5D7]">
              <p className="leading-relaxed">
                <strong>CAUTION:</strong>
                {
                  ' The customer shall verify and make himself assured of the weight and workmanship of the ornaments prior to taking delivery, once the ornaments is delivered, management will not accept any responsibility on these counts or any damage of the jewellery.'
                }
              </p>
            </div>
            <div className="space-y-3 pt-2 border-t border-[#EDE5D7]">
              <p className="leading-relaxed">
                It is mandatory to produce original bills for exchange or disposal. Any or all of the above policies may change at
                the discreation of the jeweller, without any prior notice or intimation. it is understood that the customer has
                read and agreed for all the above terms and the concerned sales person has translated all the above policies in
                the mother tongue of the customer and the customer has agreed for the above terms and conditions.
              </p>
              <p className="leading-relaxed font-semibold">
                These above terms & Conditions supercede all other earlier terms & conditions. Disputes subject to Hyderabad
                Jurisdiction.
              </p>
            </div>
            <div className="pt-4 flex justify-center">
              <div className="border-2 border-[#071F1B] px-8 py-2.5 rounded-lg text-center font-serif font-bold tracking-widest text-[#071F1B] text-sm uppercase shadow-xs">
                THANK YOU VISIT AGAIN
              </div>
            </div>
          </div>
        </PolicySection>
        <PolicySection id="offers" label="Offers & Schemes" Icon={TagIcon}>
          <div className="space-y-6">
            <div className="bg-[#183C40] text-[#F7F3EA] rounded-xl p-5 border border-[#C6A15B]/40 space-y-1">
              <h4 className="font-serif text-base font-bold text-[#DFCA8F] flex items-center gap-2">
                <TagIcon className="w-5 h-5 text-[#DFCA8F]" />
                Offers & Privileges
              </h4>
              <p className="text-[11.5px] text-[#EDE5D7]/85 font-light">
                Transparent making charges and royal concessions for our valued patrons.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4.5 rounded-xl border border-[#EDE5D7] space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-[#30565B]/10 text-[#30565B] px-2.5 py-1 rounded-md text-[10.5px] font-bold uppercase tracking-wider">
                  Continuous Privilege
                </div>
                <h5 className="font-serif text-sm font-bold text-[#183C40]">0% Deduction Old Gold Exchange</h5>
                <p className="text-[11.5px] text-[#6B6862] leading-relaxed">
                  Exchange any hallmark gold jewellery for 100% of its pure gold weight value. No arbitrary melting cuts or
                  traditional jeweller deductions.
                </p>
              </div>
              <div className="bg-white p-4.5 rounded-xl border border-[#EDE5D7] space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-[#C6A15B]/20 text-[#183C40] px-2.5 py-1 rounded-md text-[10.5px] font-bold uppercase tracking-wider">
                  Daily Wear Special
                </div>
                <h5 className="font-serif text-sm font-bold text-[#183C40]">Lightweight Collection (From 7g)</h5>
                <p className="text-[11.5px] text-[#6B6862] leading-relaxed">
                  Special nominal making charges starting at low percentages on certified lightweight daily wear necklaces,
                  bracelets, and rings.
                </p>
              </div>
              <div className="bg-white p-4.5 rounded-xl border border-[#EDE5D7] space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md text-[10.5px] font-bold uppercase tracking-wider">
                  Bridal Trousseau Privilege
                </div>
                <h5 className="font-serif text-sm font-bold text-[#183C40]">Complete Wedding Set Concessions</h5>
                <p className="text-[11.5px] text-[#6B6862] leading-relaxed">
                  Tiered making charge discounts on complete bridal packages comprising Nizami Haar, chokers, jhumkas, and
                  matching kadas.
                </p>
              </div>
              <div className="bg-white p-4.5 rounded-xl border border-[#EDE5D7] space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-[#183C40] text-[#DFCA8F] px-2.5 py-1 rounded-md text-[10.5px] font-bold uppercase tracking-wider">
                  Diamond Solitaire Privilege
                </div>
                <h5 className="font-serif text-sm font-bold text-[#183C40]">Direct Wholesaler Pricing</h5>
                <p className="text-[11.5px] text-[#6B6862] leading-relaxed">
                  Conflict-free certified natural solitaires with complimentary 18K white/rose gold setting craft on select
                  engagement rings.
                </p>
              </div>
            </div>
          </div>
        </PolicySection>
        <PolicySection id="sitemap" label="Site Map" Icon={CompassIcon}>
          <div className="space-y-6">
            <div className="bg-[#183C40] text-[#F7F3EA] rounded-xl p-5 border border-[#C6A15B]/40 space-y-1">
              <h4 className="font-serif text-base font-bold text-[#DFCA8F] flex items-center gap-2">
                <CompassIcon className="w-5 h-5 text-[#DFCA8F]" />
                Website Directory & Site Map
              </h4>
              <p className="text-[11.5px] text-[#EDE5D7]/85 font-light">
                A structured overview of all showroom departments, collections, customer tools, and legal documentation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11.5px]">
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-2">
                <h6 className="font-bold text-[#183C40] text-xs uppercase tracking-wider border-b border-[#EDE5D7] pb-1.5">
                  Jewellery Collections
                </h6>
                <ul className="space-y-1.5 text-[#6B6862]">
                  <li>• 100% BIS 916 Pure Gold</li>
                  <li>• Certified Natural Diamonds</li>
                  <li>• Royal Nizami Bridal Haar & Chokers</li>
                  <li>• Lightweight Daily Wear (From 7g)</li>
                  <li>• Handcrafted Kadas & Bangles</li>
                  <li>• Solitaire Engagement Rings</li>
                  <li>• Heritage Chandbalis & Jhumkas</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-2">
                <h6 className="font-bold text-[#183C40] text-xs uppercase tracking-wider border-b border-[#EDE5D7] pb-1.5">
                  Customer Services & Tools
                </h6>
                <ul className="space-y-1.5 text-[#6B6862]">
                  <li>• Hyderabad Live Gold Rate Ticker</li>
                  <li>• Gold Rate Calculator Tool</li>
                  <li>• Ring & Bangle Size Guide</li>
                  <li>• Custom Bespoke 3D Atelier</li>
                  <li>• Pincode Delivery Availability Checker</li>
                  <li>• Instant WhatsApp Enquiries (+91 99661 62100)</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-2">
                <h6 className="font-bold text-[#183C40] text-xs uppercase tracking-wider border-b border-[#EDE5D7] pb-1.5">
                  Policies & Trust
                </h6>
                <ul className="space-y-1.5 text-[#6B6862]">
                  <li>• 14-Day Return & Exchange Policy</li>
                  <li>• Refunds & Commercial Invoicing</li>
                  <li>• Lifetime Buyback Guarantee</li>
                  <li>• Order Cancellation Guidelines</li>
                  <li>• Privacy Policy (DPDP Act 2023)</li>
                  <li>• Insured Doorstep Transit Policy</li>
                  <li>• Statutory BIS Hallmarking Rules</li>
                </ul>
              </div>
            </div>
          </div>
        </PolicySection>
        <PolicySection id="careers" label="Careers" Icon={BriefcaseIcon}>
          <div className="space-y-6">
            <div className="bg-[#183C40] text-[#F7F3EA] rounded-xl p-5 border border-[#C6A15B]/40 space-y-1">
              <h4 className="font-serif text-base font-bold text-[#DFCA8F] flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5 text-[#DFCA8F]" />
                Careers at Urooj Gold & Diamonds
              </h4>
              <p className="text-[11.5px] text-[#EDE5D7]/85 font-light">
                Join our distinguished team in Hyderabad. We seek passionate artisans, CAD engineers, and luxury retail advisors
                dedicated to the royal art of fine jewellery.
              </p>
            </div>
            <div className="space-y-3">
              <h5 className="font-bold text-[#183C40] text-xs uppercase tracking-wider">
                Current Open Positions (Mehdipatnam Flagship)
              </h5>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h6 className="font-bold text-[#183C40] text-xs">1. Senior Luxury Jewellery Sales Consultant</h6>
                    <span className="text-[10.5px] bg-[#30565B]/10 text-[#30565B] px-2 py-0.5 rounded-full font-medium">
                      Full Time
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#6B6862]">
                    Experience in premium bridal and diamond retail jewellery. Excellent communication in Urdu, Hindi, Telugu, and
                    English.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h6 className="font-bold text-[#183C40] text-xs">2. Master 3D CAD Jewellery Modeler</h6>
                    <span className="text-[10.5px] bg-[#30565B]/10 text-[#30565B] px-2 py-0.5 rounded-full font-medium">
                      Full Time / Studio
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#6B6862]">
                    Proficiency in Matrix, RhinoGold, or JewelCAD. Deep understanding of casting shrinkage, diamond prong layout,
                    and lightweight hollow technology.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#EDE5D7] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h6 className="font-bold text-[#183C40] text-xs">3. Certified Gemologist & Gold Appraiser</h6>
                    <span className="text-[10.5px] bg-[#30565B]/10 text-[#30565B] px-2 py-0.5 rounded-full font-medium">
                      Full Time
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#6B6862]">
                    Expertise in natural diamond 4C grading, coloured gemstones, and computerized non-destructive XRF Karatmeter
                    bullion assaying.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#FAF7F2] p-4.5 rounded-xl border border-[#C6A15B]/50 space-y-2">
              <h6 className="font-bold text-[#183C40] text-xs">How to Submit Your Application:</h6>
              <p className="text-[11.5px] text-[#171A19]/85">Send your resume and work portfolio to:</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1 text-[11.5px]">
                <a
                  href="mailto:customercare.uroojgoldanddiamonds@gmail.com?subject=Job%20Application%20-%20Urooj%20Gold"
                  className="inline-flex items-center gap-1.5 text-[#30565B] font-semibold hover:underline"
                >
                  <MailIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>customercare.uroojgoldanddiamonds@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/919966162100?text=Hello%20Urooj%20HR%20Team%2C%20I%20am%20interested%20in%20career%20opportunities."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold hover:underline"
                >
                  <MessageCircleIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp HR: +91 99661 62100</span>
                </a>
              </div>
            </div>
          </div>
        </PolicySection>
        <PolicySection id="certificate" label="Verify Certificate" Icon={AwardIcon}>
          <div className="space-y-6">
            <div className="bg-[#183C40] text-[#F7F3EA] rounded-xl p-5 border border-[#C6A15B]/40 space-y-1">
              <h4 className="font-serif text-base font-bold text-[#DFCA8F] flex items-center gap-2">
                <AwardIcon className="w-5 h-5 text-[#DFCA8F]" />
                Verify Certificate & BIS 6-Digit HUID
              </h4>
              <p className="text-[11.5px] text-[#EDE5D7]/85 font-light">
                Government of India authentication steps for your gold and international diamond grading reports.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-[#EDE5D7] space-y-3">
                <div className="flex items-center gap-2 text-[#183C40] font-bold text-xs uppercase tracking-wider">
                  <ShieldCheckIcon className="w-4 h-4 text-[#30565B]" />
                  <span>1. Verify BIS 6-Digit Alphanumeric HUID (Gold)</span>
                </div>
                <p className="text-[11.5px] text-[#6B6862] leading-relaxed">
                  Under Bureau of Indian Standards regulations, every gold article must carry a unique 6-digit laser-etched
                  alphanumeric HUID. This proves genuine purity and origin:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-[11.5px] text-[#171A19]/85">
                  <li>
                    {'Find the 6-character code (e.g., '}
                    <strong>AA1234</strong>) stamped on your jewellery piece and printed on your Urooj tax invoice.
                  </li>
                  <li>
                    {'Download the official '}
                    <strong>BIS CARE App</strong>
                    {' by the Government of India (available free on Google Play and Apple App Store).'}
                  </li>
                  <li>
                    {'Tap on '}
                    <strong>"Verify HUID"</strong>
                    {' on the home dashboard.'}
                  </li>
                  <li>
                    Enter the 6-digit code and submit. The app instantly verifies the jeweller name (Urooj Gold & Diamonds),
                    Assaying & Hallmarking Centre, date of stamping, and article purity (916 / 22K).
                  </li>
                </ol>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#EDE5D7] space-y-3">
                <div className="flex items-center gap-2 text-[#183C40] font-bold text-xs uppercase tracking-wider">
                  <AwardIcon className="w-4 h-4 text-[#C6A15B]" />
                  <span>2. Verify International Diamond Grading (IGI & GIA)</span>
                </div>
                <p className="text-[11.5px] text-[#6B6862] leading-relaxed">
                  All solitaire and diamond jewellery pieces from Urooj are accompanied by verified laboratory certificates:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-[11.5px] text-[#171A19]/85">
                  <li>
                    <strong>IGI Report Verification:</strong>
                    {' Visit the official portal '}
                    <a
                      href="https://www.igi.org/verify-your-report/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#30565B] font-semibold underline"
                    >
                      igi.org/verify-your-report
                    </a>
                    {' and enter your certificate number.'}
                  </li>
                  <li>
                    <strong>GIA Report Check:</strong>
                    {' Visit '}
                    <a
                      href="https://www.gia.edu/report-check-landing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#30565B] font-semibold underline"
                    >
                      gia.edu/report-check-landing
                    </a>
                    {' to verify solitaire reports.'}
                  </li>
                  <li>
                    <strong>In-Store Laser Microscope:</strong>
                    {
                      ' You are welcome to view the laser-inscribed report number on your diamond girdle under our 40x gemological microscope at the showroom.'
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </PolicySection>
        <PolicySection id="regulatory" label="Statutory BIS Laws" Icon={ScaleIcon}>
          <div className="space-y-6">
            <div className="bg-[#30565B]/10 border border-[#30565B]/30 rounded-xl p-4.5">
              <h4 className="font-serif text-base font-bold text-[#183C40] flex items-center gap-2 mb-1">
                <ShieldCheckIcon className="w-5 h-5 text-[#30565B]" />
                Constitutional Adherence & National Precious Metal Mandates
              </h4>
              <p className="text-[12px] text-[#171A19]/80 font-light">
                Urooj Gold & Diamonds operates under the sovereign laws of India, including the Constitution of India (Article
                19(1)(g) lawful trade and commerce), the Bureau of Indian Standards Act, 2016, the Legal Metrology Act, 2009, and
                the Consumer Protection Act, 2019.
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold text-[#183C40] text-sm uppercase tracking-wider flex items-center gap-2">
                <CircleCheckIcon className="w-4 h-4 text-[#C6A15B]" />
                1. Bureau of Indian Standards (BIS) Hallmarking & HUID Regulations
              </h5>
              <p>
                {'As mandated under the '}
                <strong>Bureau of Indian Standards (Hallmarking) Regulations, 2018</strong>
                {' issued by the Ministry of Consumer Affairs, Government of India:'}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[11.5px] text-[#171A19]/85">
                <li>
                  <strong>Mandatory 22K (916) Pure Gold:</strong>
                  {
                    ' Every piece of gold jewellery crafted, displayed, and sold at our showroom carries the mandatory 3-part BIS Hallmarking: (i) The official triangular '
                  }
                  <strong>BIS Standard Mark</strong>
                  {', (ii) The Purity/Fineness symbol '}
                  <strong>22K916</strong>
                  {', and (iii) The laser-etched 6-digit alphanumeric '}
                  <strong>Hallmark Unique Identification (HUID)</strong>.
                </li>
                <li>
                  <strong>Statutory Verification Right:</strong>
                  {
                    " Under BIS guidelines, every patron has the statutory right to verify their article's HUID in real-time via the Government of India's official "
                  }
                  <strong>BIS CARE Application</strong>
                  {' at the time of purchase.'}
                </li>
                <li>
                  <strong>Zero Toleration of Non-Hallmarked Stock:</strong>
                  {' Urooj Gold & Diamonds strictly prohibits the stocking, display, or sale of any un-hallmarked gold articles.'}
                </li>
              </ul>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#EDE5D7]">
              <h5 className="font-bold text-[#183C40] text-sm uppercase tracking-wider flex items-center gap-2">
                <CircleCheckIcon className="w-4 h-4 text-[#C6A15B]" />
                2. Prevention of Money Laundering Act (PMLA) & Income Tax PAN Rules
              </h5>
              <p>
                {'In compliance with '}
                <strong>Rule 114B of the Income Tax Rules, 1962</strong>
                {' and financial intelligence notifications under the '}
                <strong>Prevention of Money Laundering Act, 2002 (PMLA)</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[11.5px] text-[#171A19]/85">
                <li>
                  <strong>Mandatory PAN Card Requirement:</strong>
                  {
                    ' Furnishing a self-attested copy of a valid Permanent Account Number (PAN Card) or Form 60 is strictly mandatory for any purchase of gold, diamonds, or precious jewellery aggregating '
                  }
                  <strong>₹2,00,000 (Rupees Two Lakhs) or above</strong>
                  {' in a single transaction or day.'}
                </li>
                <li>
                  <strong>Section 269ST Prohibition:</strong>
                  {
                    ' Cash receipts exceeding ₹1,99,999 from an individual in a single day for any invoice are legally prohibited. Payments must be remitted via authorized banking channels (UPI, RTGS, NEFT, Cheque, or verified Credit/Debit Cards).'
                  }
                </li>
              </ul>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#EDE5D7]">
              <h5 className="font-bold text-[#183C40] text-sm uppercase tracking-wider flex items-center gap-2">
                <CircleCheckIcon className="w-4 h-4 text-[#C6A15B]" />
                3. Legal Metrology Act, 2009 (Telangana State Rules)
              </h5>
              <p>
                {'All weights and balances deployed at our Mehdipatnam showroom are verified '}
                <strong>Class-I high precision electronic scales</strong>
                {', inspected and stamped annually by the '}
                <strong>Telangana State Legal Metrology Department</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[11.5px] text-[#171A19]/85">
                <li>
                  All computer-generated invoices itemize Gross Weight, Stone / Lac Weight, Net Pure Gold Weight, and Making
                  Charges separately.
                </li>
                <li>No stones, pearls, or decorative enamels are ever weighed or billed as precious metal.</li>
              </ul>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#EDE5D7]">
              <h5 className="font-bold text-[#183C40] text-sm uppercase tracking-wider flex items-center gap-2">
                <CircleCheckIcon className="w-4 h-4 text-[#C6A15B]" />
                4. Telangana Shops Act & Statutory GST Compliance
              </h5>
              <p>
                {'Our showroom is registered under the '}
                <strong>Telangana Shops and Establishments Act, 1988</strong>
                {
                  '. All sales are invoiced under registered GSTIN with 3% statutory Goods and Services Tax (1.5% CGST + 1.5% SGST) applied under '
                }
                <strong>HSN Code 7113</strong>.
              </p>
            </div>
          </div>
        </PolicySection>

        <div className="bg-[#EDE5D7]/40 rounded-2xl p-5 px-6 border border-[#EDE5D7] text-center text-[11px] text-[#6B6862]">
          {'Showroom Helpline & Legal Enquiries: '}
          <strong className="text-[#30565B] font-mono">+91 99661 62100</strong>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
