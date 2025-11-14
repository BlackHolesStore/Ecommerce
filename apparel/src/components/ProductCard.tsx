import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { ShirtIcon, CloseIcon } from './IconComponents';
import Modal from './Modal';

const STRIPE_BUY_BUTTON_SRC = 'https://js.stripe.com/v3/buy-button.js';

const ensureStripeBuyButtonScript = () => {
  if (typeof document === 'undefined') {
    return;
  }

  if (document.querySelector(`script[src="${STRIPE_BUY_BUTTON_SRC}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.src = STRIPE_BUY_BUTTON_SRC;
  script.async = true;
  document.head.appendChild(script);
};

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductInfoModalContent: React.FC<{product: Product}> = ({ product }) => {
    if (!product.details) return null;
    const { details, stripeLink, stripeBuyButtonId, stripePublishableKey } = product;

    useEffect(() => {
        if (!stripeBuyButtonId || !stripePublishableKey) {
          return;
        }
        ensureStripeBuyButtonScript();
    }, [stripeBuyButtonId, stripePublishableKey]);

    return (
        <div className="max-h-[85vh] overflow-y-auto">
            <header className="flex justify-between items-center p-6 border-b border-slate-700/50 sticky top-0 bg-slate-900/80 backdrop-blur-sm">
                <h2 className="text-2xl font-bold font-orbitron text-white">{product.name}</h2>
            </header>
            <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="prose prose-sm prose-invert prose-slate max-w-none prose-h3:font-orbitron prose-h3:text-cyan-300 prose-strong:text-white">
                         <p className="text-2xl font-orbitron font-bold text-green-400">${product.price.toFixed(2)} USD</p>
                        {stripeBuyButtonId && stripePublishableKey && (
                            <div className="my-4">
                                <stripe-buy-button
                                    buy-button-id={stripeBuyButtonId}
                                    publishable-key={stripePublishableKey}
                                ></stripe-buy-button>
                            </div>
                        )}

                        <h3>Features</h3>
                        <ul>{details.features.map(item => <li key={item}>{item}</li>)}</ul>

                        <h3>Fabric</h3>
                        <ul>{details.fabric.map(item => <li key={item}>{item}</li>)}</ul>

                        <h3>Process</h3>
                        <ul>{details.process.map(item => <li key={item}>{item}</li>)}</ul>

                        <h3>Care Instructions</h3>
                        {details.care.map((p, i) => <p key={i}>{p}</p>)}

                        <h3>More Info</h3>
                        {details.moreInfo.map((p, i) => <p key={i}><em>{p}</em></p>)}

                        <h3>Size Guide (Metric)</h3>
                         <div className="overflow-x-auto">
                            <table className="w-full my-4">
                                <thead>
                                    <tr>{details.sizeGuide.headers.map(header => <th key={header} className="border border-slate-600 p-2">{header}</th>)}</tr>
                                </thead>
                                <tbody>
                                    {details.sizeGuide.rows.map((row, index) => (
                                        <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex} className="border border-slate-700 p-2 text-center">{cell}</td>)}</tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-start">
                        {details.modelImages.map(img => (
                            <img key={img} src={img} alt={`${product.name} model shot`} className="rounded-lg shadow-lg w-full" />
                        ))}
                    </div>
                </div>
                 <div className="p-6 border-t border-slate-700/50 text-right">
                    {stripeLink && (
                      <a href={stripeLink} target="_blank" rel="noopener noreferrer" className="no-underline inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300">
                        BUY NOW
                      </a>
                    )}
                </div>
            </div>
        </div>
    );
};


const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { virtualOnly, virtualLink, virtualPrice, stripeLink, details, image } = product;
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isZoomModalOpen, setZoomModalOpen] = useState(false);

  const typeColorClasses = {
    'Top': 'text-yellow-400 border-yellow-400',
    'Bottoms': 'text-cyan-400 border-cyan-400',
  };

  const hasRealImage = image && image !== 'placeholder.svg';

  return (
    <>
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg shadow-black/20 border border-slate-700/50 transition-all duration-300 hover:shadow-cyan-500/20 hover:border-cyan-500/50 hover:-translate-y-2 group flex flex-col">
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold font-orbitron text-white">{product.name}</h2>
              <p className={`text-sm font-semibold uppercase tracking-wider ${typeColorClasses[product.type]}`}>
                {product.type}
              </p>
            </div>
            <div className="text-right">
              {virtualOnly ? (
                <>
                  <p className="text-3xl font-orbitron font-bold text-violet-400">♦{virtualPrice}</p>
                  <p className="text-xs text-slate-500">Meta Credits</p>
                </>
              ) : (
                <>
                  <p className="text-3xl font-orbitron font-bold text-green-400">${product.price.toFixed(2)}</p>
                  <p className="text-xs text-slate-500">USD</p>
                </>
              )}
            </div>
          </div>

          <div className="relative h-48 mb-4 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-slate-700/30 [mask-image:linear-gradient(0deg,#000000,transparent)]"></div>
              {hasRealImage ? (
                  <img src={image} alt={product.name} className="max-h-full max-w-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-110" onClick={() => setZoomModalOpen(true)} />
              ) : (
                <ShirtIcon className="w-32 h-32 text-slate-500 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110 transform"/>
              )}
          </div>

          <p className="text-slate-400 mb-6 h-24 flex-grow">{product.description}</p>

          <div className="mt-auto space-y-3">
            {/* Case for the special "Vibes" shirt with details and Stripe link */}
            {stripeLink && (
              <>
                <button onClick={() => setInfoModalOpen(true)} className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                  More Info
                </button>
                <a
                  href={product.virtualLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Buy Virtually (♦{product.virtualPrice})
                </a>
              </>
            )}

            {/* Case for virtual-only items */}
            {virtualOnly && (
              <a
                href={virtualLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg group-hover:shadow-violet-500/40"
              >
                Buy in Meta Horizon
              </a>
            )}

            {/* Case for standard items (can be added to cart) */}
            {!stripeLink && !virtualOnly && (
              <>
                <button
                  onClick={onAddToCart}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg group-hover:shadow-cyan-500/40"
                >
                  Add to Cart
                </button>
                {virtualLink && (
                  <a
                    href={virtualLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Buy Virtually (♦{virtualPrice})
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modals for this card */}
      {details && (
          <Modal isOpen={isInfoModalOpen} onClose={() => setInfoModalOpen(false)} size="xl">
            <ProductInfoModalContent product={product} />
          </Modal>
      )}
      {hasRealImage && (
          <Modal isOpen={isZoomModalOpen} onClose={() => setZoomModalOpen(false)} size="full">
              <div className="w-full h-full flex items-center justify-center p-4">
                <img src={image} alt={`${product.name} zoomed`} className="max-h-full max-w-full object-contain"/>
              </div>
          </Modal>
      )}
    </>
  );
};

export default ProductCard;