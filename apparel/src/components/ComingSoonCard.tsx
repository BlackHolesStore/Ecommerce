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
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 bg-slate-900/80 backdrop-blur-sm border border-fuchsia-500/40 rounded-full p-3 shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/50 hover:border-fuchsia-300 transition-all duration-300 group"
        aria-label="Intercept the Coming Soon signal"
      >
        <img
          src={kittyVoidPlush}
          alt=""
          aria-hidden="true"
          className="w-12 h-12 rounded-full object-cover shadow-[0_0_20px_rgba(168,85,247,0.45)]"
          loading="lazy"
        />
        <span className="pointer-events-none absolute left-1/2 -bottom-10 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/90 text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-200 opacity-0 group-hover:opacity-100 transition-opacity">
          Coming Soon
        </span>
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} size="lg">
        <div className="p-8 md:p-10 space-y-6 bg-gradient-to-br from-slate-950/95 via-slate-900 to-slate-950 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-shrink-0 mx-auto md:mx-0 w-48 h-48 rounded-full flex items-center justify-center shadow-[0_0_45px_rgba(168,85,247,0.45)] bg-slate-900/70">
              <img src={kittyVoidPlush} alt="Classified plush transmission" className="w-36 h-36 rounded-full object-cover" />
            </div>
            <div className="space-y-3 text-slate-200">
              <p className="text-sm uppercase tracking-[0.45em] text-fuchsia-300">Signal Incoming</p>
              <h2 className="text-4xl font-orbitron font-bold text-white">Coming Soon</h2>
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
