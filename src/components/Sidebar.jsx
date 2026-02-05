import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { THOUGHTS } from '../constants';

export default function Sidebar({ isDark }) {
  return (
    <div className="hidden md:flex w-64 flex-col gap-4 z-30">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-2 px-1">
            <MessageSquareQuote size={18} className={isDark ? "text-yellow-400" : "text-yellow-600"} />
            <h3 className={`text-sm font-bold uppercase tracking-widest ${isDark ? "text-yellow-400" : "text-yellow-600"}`}>
              My Beliefs
            </h3>
        </div>
        
        {/* Transparent Cards */}
        <div className="flex flex-col gap-4">
          {THOUGHTS.map((t, i) => (
              <div 
                key={i} 
                className={`
                  bg-transparent pl-4 border-l-2 text-xs italic leading-relaxed transition-colors
                  ${isDark 
                    ? "border-yellow-500/50 text-slate-300 hover:text-white" 
                    : "border-yellow-600/50 text-slate-600 hover:text-black"}
                `}
              >
                  "{t}"
              </div>
          ))}
        </div>
    </div>
  );
}