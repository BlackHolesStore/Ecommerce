import React from 'react';
import { CartItem } from '../types';
import { CloseIcon, ShirtIcon } from './IconComponents';

interface CartViewProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
}

const CartView: React.FC<CartViewProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity }) => {
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 shadow-2xl shadow-cyan-500/20 transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex justify-between items-center p-6 border-b border-slate-700/50">
          <h2 className="text-2xl font-bold font-orbitron text-white">Your Cart</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white" aria-label="Close cart">
            <CloseIcon />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-slate-500 py-16">
              <p>Your cart is a void.</p>
              <p>Add some galactic gear to begin.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex items-center space-x-4 bg-slate-800/50 p-3 rounded-lg">
                <ShirtIcon className="w-16 h-16 flex-shrink-0 text-slate-500" />
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{item.name}</h3>
                  <p className="text-sm text-slate-400">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 bg-slate-700 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 bg-slate-700 rounded">+</button>
                </div>
                <button onClick={() => onUpdateQuantity(item.id, 0)} className="text-red-500 hover:text-red-400" aria-label={`Remove ${item.name}`}>
                    <CloseIcon className="h-5 w-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <footer className="p-6 border-t border-slate-700/50 bg-slate-900/50">
            <div className="flex justify-between items-center mb-4 text-xl">
              <span className="font-semibold text-slate-400">Subtotal:</span>
              <span className="font-bold font-orbitron text-white">${totalCost.toFixed(2)}</span>
            </div>
            <button className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-4 rounded-lg text-lg transition-colors">
              Proceed to Secure Checkout
            </button>
          </footer>
        )}
      </div>
    </>
  );
};

export default CartView;