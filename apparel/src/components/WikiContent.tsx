import React from 'react';
import { WIKI_DATA } from '../data/wikiData';
import { BlackholeIcon } from './IconComponents';

interface WikiContentProps {
  topicId: string;
}

const WikiContent: React.FC<WikiContentProps> = ({ topicId }) => {
  const topic = WIKI_DATA.find(t => t.id === topicId);

  if (!topic) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-400">Error</h2>
        <p>Topic not found. Please select an entry from the sidebar.</p>
      </div>
    );
  }

  return (
    <article className="p-8 md:p-12 h-full">
        <header className="mb-8 pb-4 border-b border-slate-700/50">
            <div className="flex items-center space-x-4">
                 {React.cloneElement(topic.icon, { className: 'h-10 w-10 text-cyan-400' })}
                <h1 className="text-4xl font-bold font-orbitron text-white">{topic.title}</h1>
            </div>
        </header>
        <div className="prose prose-invert prose-slate max-w-none prose-h2:font-orbitron prose-h2:text-cyan-300 prose-h3:text-violet-300 prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-strong:text-white">
            {topic.content}
        </div>
    </article>
  );
};

export default WikiContent;