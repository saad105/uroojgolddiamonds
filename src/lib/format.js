// Formatting + WhatsApp helpers shared across the site.
export const WHATSAPP_NUMBER = '919966162100';

const inrFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

/** ₹1,23,456 style currency */
export const formatINR = (value) => inrFormatter.format(Number(value) || 0);

/** wa.me link with a pre-filled message */
export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message || 'Hello Urooj Gold & Diamonds, I would like to enquire about your jewellery collection.',
  )}`;

/** Pre-filled product enquiry message */
export const productEnquiryMessage = (name, sku, price, purity) => `Hello Urooj Gold & Diamonds, I am interested in knowing more about:
Product: ${name}
SKU: ${sku}
Purity: ${purity}
Price: ${formatINR(price)}
Please share availability and consultation details.`;

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
