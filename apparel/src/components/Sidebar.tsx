import React from 'react';
import { WIKI_DATA } from '../data/wikiData';
import { BlackholeIcon } from './IconComponents';

interface SidebarProps {
  selectedTopicId: string;
  onSelectTopic: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTopicId, onSelectTopic }) => {
  const groupedTopics = WIKI_DATA.reduce((acc, topic) => {
    const category = topic.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(topic);
    return acc;
  }, {} as Record<string, typeof WIKI_DATA>);

  return (
    <aside className="w-full bg-slate-900/70 backdrop-blur-sm border-r border-slate-700/50 flex-shrink-0 p-4 flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-6 px-2">
        <BlackholeIcon className="h-8 w-8 text-cyan-400" />
        <h1 className="text-xl font-bold font-orbitron text-white">
          Universe Wiki
        </h1>
      </div>
      <nav className="flex-1 overflow-y-auto space-y-4">
        {Object.entries(groupedTopics).map(([category, topics]) => (
          <div key={category}>
            <h2 className="text-xs font-bold uppercase text-slate-500 mb-2 px-2">{category}</h2>
            <ul className="space-y-1">
              {topics.map(topic => (
                <li key={topic.id}>
                  <button
                    onClick={() => onSelectTopic(topic.id)}
                    className={`w-full flex items-center space-x-3 text-left px-2 py-2 rounded-md transition-colors duration-200 ${
                      selectedTopicId === topic.id
                        ? 'bg-slate-700/50 text-white'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    {React.cloneElement(topic.icon, { className: 'h-5 w-5 flex-shrink-0' })}
                    <span className="text-sm font-semibold">{topic.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-6 p-3 text-center bg-slate-800/50 rounded-lg">
          <p className="text-sm font-semibold text-cyan-300">We let the community write the narrative.</p>
          <a href="#" className="text-sm font-bold text-white hover:underline">Join us!</a>
      </div>
       <div className="mt-4 p-2 text-center text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} Blackholes Store</p>
          <p>All lore is subject to cosmic drift.</p>
        </div>
    </aside>
  );
};

export default Sidebar;