import React from 'react';
import { InfoIcon } from './IconComponents';

interface WikiLauncherProps {
  onClick: () => void;
}

const WikiLauncher: React.FC<WikiLauncherProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed left-0 top-1/2 -translate-y-1/2 bg-slate-800/80 backdrop-blur-sm text-white p-3 rounded-r-lg shadow-lg hover:bg-cyan-500/80 transition-all z-40"
      aria-label="Open Universe Wiki"
    >
      <InfoIcon className="h-7 w-7" />
    </button>
  );
};

export default WikiLauncher;