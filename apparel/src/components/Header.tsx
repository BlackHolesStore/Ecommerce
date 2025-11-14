import React from 'react';
import { ShoppingCartIcon, UserIcon } from './IconComponents';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const auth0LoginUrl = "https://blackholesstore.us.auth0.com/login?state=hKFo2SBRYXNNQnVFUDJwYU15b3hOSXN6amF1cmxxUGNhWVlCQ6FupWxvZ2luo3RpZNkgNEVnZlJDN1ppMFY5Vm0yN2xqWFgwX3htel84REtzNXSjY2lk2SBUWldRZmR2VHMxaUdHdmVKRkhSTlVMSjR2WVJYbjlsRg&client=TZWQfdvTs1iGGveJFHRNULJ4vYRXn9lF&protocol=oauth2&scope=openid%20profile%20email&audience=https%3A%2F%2Fblackholesstore.us.auth0.com%2Fapi%2Fv2%2F&redirect_uri=https%3A%2F%2Fblackholes.store&response_type=code&response_mode=query&nonce=QS5xOU5zYjdMWEJFTlBDODlZOFY5RU05bk90UH5QV3NxT0VISGdIb0hJWA%3D%3D&code_challenge=x4fSVBi8GpaM0C9_nBumSit9-Q0GgI3GNWNjw3zhNBw&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjIuMC44In0%3D";

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm shadow-lg shadow-cyan-500/10 z-50">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        <div className="text-2xl font-bold font-orbitron text-white">
          <a href="https://blackholes.store">Blackholes Store</a>
        </div>
        <nav className="flex items-center space-x-6">
           <a
            href="https://horizon.meta.com/profile/promptartist/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline text-slate-300 hover:text-cyan-400 transition-colors font-semibold">
            Virtual Worlds
          </a>
          <a href="https://blackholes.store" className="hidden sm:inline text-slate-300 hover:text-cyan-400 transition-colors font-semibold">
            Main Page
          </a>

          <div className="hidden sm:block w-px h-6 bg-slate-700"></div>

          <button
            onClick={onCartClick}
            className="relative text-slate-300 hover:text-cyan-400 transition-colors"
            aria-label={`Open shopping cart with ${cartItemCount} items`}
          >
            <ShoppingCartIcon className="h-7 w-7" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => { window.location.href = auth0LoginUrl; }}
            className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors"
            aria-label="Login"
          >
             <UserIcon className="h-7 w-7" />
             <span className="hidden sm:inline">Login</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;