import React from 'react';
import { CloseIcon } from './IconComponents';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'md' | 'lg' | 'xl' | 'full';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size = 'lg' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    md: 'max-w-md',
    lg: 'max-w-3xl',
    xl: 'max-w-6xl',
    full: 'w-screen h-screen max-w-none max-h-none rounded-none'
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`bg-slate-900 border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/20 w-full relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale ${sizeClasses[size]}`}
        onClick={e => e.stopPropagation()}
        style={{ animationName: 'fade-in-scale', animationDuration: '0.3s', animationFillMode: 'forwards' }}
      >
         <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-white z-20 bg-slate-800/50 rounded-full p-1" aria-label="Close modal">
            <CloseIcon />
        </button>
        {children}
      </div>
       <style>{`
        @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Modal;