import React, { useState } from 'react';
import Modal from './Modal';
import kittyVoidPlush from '../assets/kitty-void-plush.png';

const ComingSoonCard: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-violet-500/40 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:border-violet-300/70 transition-all duration-300 overflow-hidden flex flex-col items-center justify-between p-6 text-left"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.28),_transparent_70%)]" aria-hidden="true"></div>
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-36 h-36 md:w-40 md:h-40 bg-slate-900/80 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.35)] group-hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-shadow duration-300">
            <img src={kittyVoidPlush} alt="Mystery plush teaser" className="w-28 h-28 md:w-32 md:h-32 drop-shadow-[0_8px_18px_rgba(15,23,42,0.65)]" loading="lazy" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm tracking-[0.35em] uppercase text-fuchsia-300/90">
              Transmission
            </p>
            <h2 className="text-3xl font-orbitron font-bold text-white">Coming Soon</h2>
            <p className="text-slate-400 text-sm max-w-xs">
              Classified drop. Tap to intercept the Kitty Void Plush signal.
            </p>
          </div>
        </div>
        <span className="relative mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fuchsia-400/70 text-fuchsia-200 text-xs font-semibold tracking-wider uppercase">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Await Transmission
        </span>
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} size="lg">
        <div className="p-8 md:p-10 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-shrink-0 mx-auto md:mx-0 w-48 h-48 bg-slate-900/70 rounded-full flex items-center justify-center shadow-[0_0_45px_rgba(168,85,247,0.45)]">
              <img src={kittyVoidPlush} alt="Kitty Void Plush icon" className="w-36 h-36" />
            </div>
            <div className="space-y-3 text-slate-200">
              <p className="text-sm uppercase tracking-[0.45em] text-fuchsia-300">Signal Incoming</p>
              <h2 className="text-4xl font-orbitron font-bold text-white">Kitty Void Plush</h2>
              <p className="text-slate-300 text-base leading-relaxed">
                A legendary companion stitched from cosmic whisper-fabric. Rumored to absorb stray singularities and purr in quantum harmonics. Only those tuned to the void will unlock this drop.
              </p>
              <ul className="space-y-2 text-sm text-slate-300/90 list-disc list-inside">
                <li>Limited prototype release aligned with the next signal window</li>
                <li>Includes encrypted lore fragment and XR-ready holographic badge</li>
                <li>Access code delivered to early interceptors first</li>
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-700/40 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-xs uppercase tracking-[0.4em] text-slate-500">Status: Sequencing Drop ETA</div>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-6 py-3 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold uppercase tracking-wider transition-colors duration-300"
            >
              Close Transmission
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ComingSoonCard;
