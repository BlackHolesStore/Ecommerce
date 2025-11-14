import React, { useState } from 'react';
import Sidebar from './Sidebar';
import WikiContent from './WikiContent';
import { CloseIcon } from './IconComponents';

interface WikiPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const WikiPanel: React.FC<WikiPanelProps> = ({ isOpen, onClose }) => {
  const [selectedTopicId, setSelectedTopicId] = useState('welcome');

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-[59] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-slate-900 shadow-2xl shadow-cyan-500/20 transform transition-transform duration-300 ease-in-out z-[60] flex ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="w-64 border-r border-slate-800 hidden sm:block">
            <Sidebar
                selectedTopicId={selectedTopicId}
                onSelectTopic={setSelectedTopicId}
            />
        </div>
        <div className="flex-1 overflow-y-auto relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10" aria-label="Close wiki">
            <CloseIcon />
          </button>
          <WikiContent topicId={selectedTopicId} />
        </div>
      </div>
    </>
  );
};

export default WikiPanel;