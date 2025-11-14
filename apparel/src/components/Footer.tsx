import React from 'react';

const footerLinks = [
  { label: 'Privacy Policy', href: 'https://blackholes.store/#privacy' },
  { label: 'Shipping Terms', href: 'https://blackholes.store/#shipping' },
  { label: 'Terms of Use', href: 'https://blackholes.store/#terms' },
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

const Footer: React.FC = () => {
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
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-fuchsia-300"
              >
                {link.label}
              </a>
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
    </>
  );
};

export default Footer;
