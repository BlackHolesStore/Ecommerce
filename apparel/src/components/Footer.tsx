import React, { useState } from 'react';
import Modal from './Modal';

type PolicyType = 'privacy' | 'shipping' | 'terms';

const footerLinks: { label: string; type: PolicyType }[] = [
  { label: 'Privacy Policy', type: 'privacy' },
  { label: 'Shipping Terms', type: 'shipping' },
  { label: 'Terms of Use', type: 'terms' },
];

const paymentIcons = [
  {
    alt: 'Google Pay accepted',
    src: 'https://js.stripe.com/v3/fingerprinted/img/google_pay-ca6cc2f4ee364c7966f8fabf064849fe.svg',
  },
  {
    alt: 'Visa accepted',
    src: 'https://js.stripe.com/v3/fingerprinted/img/visa-fb36094822f73d7bc581f6c0bad1c201.svg',
  },
  {
    alt: 'American Express accepted',
    src: 'https://js.stripe.com/v3/fingerprinted/img/amex-b933c9009eeaf8cfd07e789c549b8c57.svg',
  },
  {
    alt: 'Mastercard accepted',
    src: 'https://js.stripe.com/v3/fingerprinted/img/mastercard-86e9a2b929496a34918767093c470935.svg',
  },
  {
    alt: 'Cash App accepted',
    src: 'https://js.stripe.com/v3/fingerprinted/img/cashapp-7d18c6569a64a205d8cb64c9309358b5.svg',
  },
];

const PolicyLayout: React.FC<{ title: string; effectiveDate: string; children: React.ReactNode }> = ({
  title,
  effectiveDate,
  children,
}) => (
  <div className="max-h-[80vh] overflow-y-auto p-6 md:p-8 space-y-6 text-slate-200">
    <header className="space-y-2">
      <h2 className="text-3xl font-orbitron font-bold text-white">{title}</h2>
      <p className="text-sm text-slate-400 font-semibold">Effective Date: {effectiveDate}</p>
    </header>
    <div className="space-y-4 prose prose-invert prose-sm max-w-none">
      {children}
    </div>
  </div>
);

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<PolicyType | null>(null);

  const openModal = (type: PolicyType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  const renderModalContent = () => {
    if (!activeModal) {
      return null;
    }

    const effectiveDate = 'April 19, 2025';

    switch (activeModal) {
      case 'privacy':
        return (
          <PolicyLayout title="Privacy Policy" effectiveDate={effectiveDate}>
            <p>At BlackHoles.Store, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or make a purchase.</p>
            <h3>1. Information We Collect</h3>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, shipping address, payment information, and phone number provided during checkout or account creation.</li>
              <li><strong>Non-Personal Information:</strong> Browser type, IP address, device type, and browsing behavior (e.g., pages visited, time spent) collected via cookies and analytics tools.</li>
              <li><strong>Order Information:</strong> Details about products purchased, order history, and preferences.</li>
            </ul>
            <h3>2. How We Use Your Information</h3>
            <p>Your information is used to:</p>
            <ul>
              <li>Process and fulfill orders, including shipping and payment processing.</li>
              <li>Communicate with you about your order, promotions, or customer service inquiries.</li>
              <li>Improve our website, products, and services through analytics and feedback.</li>
              <li>Prevent fraud and ensure the security of our website.</li>
            </ul>
            <h3>3. Sharing Your Information</h3>
            <p>We do not sell your personal information. We may share your data with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third parties like Stripe for payment processing, shipping carriers, and analytics providers (e.g., Google Analytics).</li>
              <li><strong>Legal Requirements:</strong> If required by law or to protect our rights, we may disclose your information to authorities.</li>
            </ul>
            <h3>4. Cookies and Tracking</h3>
            <p>We use cookies to enhance your browsing experience, track analytics, and personalize content. You can manage cookie preferences through your browser settings.</p>
            <h3>5. Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access, update, or delete your personal information.</li>
              <li>Opt out of marketing emails via the unsubscribe link in our emails.</li>
              <li>Request information about how your data is used.</li>
            </ul>
            <p>To exercise these rights, contact us at <a href="mailto:support@blackholes.store" className="text-fuchsia-300 hover:text-fuchsia-200">support@blackholes.store</a>.</p>
            <h3>6. Data Security</h3>
            <p>We use industry-standard encryption (e.g., SSL) and secure payment gateways to protect your data. However, no online transmission is 100% secure, and you share information at your own risk.</p>
            <h3>7. Changes to This Policy</h3>
            <p>We may update this Privacy Policy periodically. Changes will be posted on this page with an updated effective date.</p>
            <h3>8. Contact Us</h3>
            <p>For questions about this Privacy Policy, please contact us at <a href="mailto:support@blackholes.store" className="text-fuchsia-300 hover:text-fuchsia-200">support@blackholes.store</a>.</p>
          </PolicyLayout>
        );
      case 'shipping':
        return (
          <PolicyLayout title="Shipping Terms" effectiveDate={effectiveDate}>
            <p>BlackHoles.Store is committed to delivering your orders efficiently and reliably. Below are our shipping terms and policies.</p>
            <h3>1. Shipping Destinations</h3>
            <p>We currently ship to addresses within the United States, Canada, and select international destinations. Please check availability at checkout.</p>
            <h3>2. Shipping Rates</h3>
            <p>Shipping costs are calculated at checkout based on your location, order weight, and selected shipping method. We offer:</p>
            <ul>
              <li><strong>Standard Shipping:</strong> 5-7 business days (US), 7-14 business days (Canada/International).</li>
              <li><strong>Express Shipping:</strong> 2-3 business days (US only).</li>
            </ul>
            <h3>3. Processing Time</h3>
            <p>Orders are processed within 1-2 business days. Custom or pre-order items may take 3-5 business days. You will receive a confirmation email once your order is processed.</p>
            <h3>4. Tracking Your Order</h3>
            <p>Once your order ships, you will receive a tracking number via email. Use this to track your package on the carrier’s website.</p>
            <h3>5. Delivery Issues</h3>
            <p>If your order is delayed, lost, or damaged, please contact us at <a href="mailto:support@blackholes.store" className="text-fuchsia-300 hover:text-fuchsia-200">support@blackholes.store</a> within 30 days of shipment. We’ll work with the carrier to resolve the issue.</p>
            <h3>6. International Shipping</h3>
            <p>International orders may incur customs fees, duties, or taxes, which are the responsibility of the recipient. Delivery times vary based on customs processing.</p>
            <h3>7. Returns and Exchanges</h3>
            <p>Please see our <button type="button" onClick={() => openModal('terms')} className="text-fuchsia-300 hover:text-fuchsia-200 underline decoration-dotted">Terms of Use</button> for information on returns and exchanges.</p>
            <h3>8. Contact Us</h3>
            <p>For shipping inquiries, reach out to <a href="mailto:support@blackholes.store" className="text-fuchsia-300 hover:text-fuchsia-200">support@blackholes.store</a>.</p>
          </PolicyLayout>
        );
      case 'terms':
      default:
        return (
          <PolicyLayout title="Terms of Use" effectiveDate={effectiveDate}>
            <p>By accessing or using BlackHoles.Store, you agree to these Terms of Use. Please read them carefully.</p>
            <h3>1. Use of Our Website</h3>
            <p>You agree to use our website for lawful purposes only. You may not:</p>
            <ul>
              <li>Use the site to engage in fraudulent or illegal activities.</li>
              <li>Attempt to hack, disrupt, or gain unauthorized access to our systems.</li>
              <li>Reproduce or distribute our content without permission.</li>
            </ul>
            <h3>2. Product Information</h3>
            <p>We strive to provide accurate product descriptions and pricing. However, errors may occur, and we reserve the right to correct them or cancel orders affected by such errors.</p>
            <h3>3. Orders and Payments</h3>
            <p>All orders are subject to acceptance and availability. We use Stripe for secure payment processing. You agree to provide accurate payment and shipping information.</p>
            <h3>4. Returns and Refunds</h3>
            <p>We accept returns within 30 days of delivery for unworn, undamaged items in original packaging. Refunds are issued to the original payment method within 7-10 business days of receiving the return. Shipping costs are non-refundable. To initiate a return, contact <a href="mailto:support@blackholes.store" className="text-fuchsia-300 hover:text-fuchsia-200">support@blackholes.store</a>.</p>
            <h3>5. Intellectual Property</h3>
            <p>All content on BlackHoles.Store, including images, text, and designs, is owned by us or our licensors. You may not use our content without written permission.</p>
            <h3>6. Limitation of Liability</h3>
            <p>BlackHoles.Store is not liable for indirect, incidental, or consequential damages arising from your use of our website or products. Our liability is limited to the amount paid for your order.</p>
            <h3>7. Governing Law</h3>
            <p>These Terms are governed by the laws of the State of California, USA. Any disputes will be resolved in the courts of California.</p>
            <h3>8. Changes to These Terms</h3>
            <p>We may update these Terms periodically. Changes will be posted on this page with an updated effective date.</p>
            <h3>9. Contact Us</h3>
            <p>For questions about these Terms, contact us at <a href="mailto:support@blackholes.store" className="text-fuchsia-300 hover:text-fuchsia-200">support@blackholes.store</a>.</p>
          </PolicyLayout>
        );
    }
  };

  return (
    <>
      <footer className="bg-black/80 text-slate-200 px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[0_-10px_40px_rgba(124,58,237,0.15)] relative z-30">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-8 rounded-full border border-fuchsia-500/80 bg-slate-900 shadow-[0_0_25px_rgba(168,85,247,0.6)] flex items-center justify-around px-2">
            <span className="h-4 w-4 rounded-full bg-slate-800 border border-fuchsia-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" aria-hidden="true"></span>
            <span className="h-4 w-4 rounded-full bg-slate-800 border border-fuchsia-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" aria-hidden="true"></span>
          </div>
          <p className="text-xs md:text-sm tracking-wide text-slate-400 uppercase">© 2025 BlackHoles.Store. All rights reserved.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3" aria-label="Accepted payment methods">
            {paymentIcons.map(icon => (
              <img
                key={icon.alt}
                src={icon.src}
                alt={icon.alt}
                loading="lazy"
                className="h-5 w-auto drop-shadow-[0_0_10px_rgba(168,85,247,0.45)]"
              />
            ))}
          </div>

          <nav className="flex items-center gap-4 md:gap-6 text-xs md:text-sm font-semibold uppercase tracking-wide text-slate-400">
            {footerLinks.map(link => (
              <button
                key={link.label}
                type="button"
                onClick={() => openModal(link.type)}
                className="bg-transparent border-none transition-colors hover:text-fuchsia-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-sm"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </footer>

      <a
        href="https://buy.stripe.com/9AQcQ2aqD95NgmsbII"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-0 left-0 right-0 z-40 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-center font-extrabold uppercase tracking-wider py-3 md:py-4 shadow-[0_-10px_45px_rgba(168,85,247,0.45)] transition-all"
      >
        Own the Signal
      </a>

      {activeModal && (
        <Modal isOpen={Boolean(activeModal)} onClose={closeModal} size="xl">
          {renderModalContent()}
        </Modal>
      )}
    </>
  );
};

export default Footer;
