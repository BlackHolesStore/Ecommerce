import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartView from './components/CartView';
import WikiPanel from './components/WikiPanel';
import WikiLauncher from './components/WikiLauncher';
import Footer from './components/Footer';
import ComingSoonCard from './components/ComingSoonCard';
import { products } from './data/products';
import { CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWikiOpen, setIsWikiOpen] = useState(false);

  const addToCart = (productToAdd: (typeof products)[0]) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isCartOpen || isWikiOpen ? 'hidden' : 'auto';
  }, [isCartOpen, isWikiOpen]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col pb-24">
      <Header
        cartItemCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      <WikiLauncher onClick={() => setIsWikiOpen(true)} />

      <main className="container mx-auto px-4 py-8 pt-24 flex-1">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold font-orbitron text-white drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]">
            Blackholes Store
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Your avatar shouldn't have all the fun. Deck yourself out in exclusive IRL merch and bring a piece of the cosmos into your world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
          ))}
          <ComingSoonCard />
        </div>
      </main>

      <Footer />

      <CartView
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
      />

      <WikiPanel
        isOpen={isWikiOpen}
        onClose={() => setIsWikiOpen(false)}
      />
    </div>
  );
};

export default App;