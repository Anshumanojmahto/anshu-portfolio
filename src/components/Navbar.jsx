import React from 'react';
import { Play, RotateCcw, Download, Volume2, VolumeX, Sun, Moon, Info } from 'lucide-react';

const LOGO_URL = "/image_28cbac.png"; 

export default function Navbar({ startTour, resetGame, isMuted, toggleMute, isDark, toggleTheme }) {
  return (
    <div className="flex flex-col w-full z-[100] relative shrink-0">
        <nav className={`
          flex flex-row justify-between items-center px-4 py-3 
          backdrop-blur-md border-b shadow-xl transition-colors duration-300
          ${isDark ? 'bg-slate-900/95 border-slate-700' : 'bg-white/90 border-slate-200'}
        `}>
          <div className="flex items-center gap-4">
            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg overflow-hidden border ${isDark ? 'border-slate-600' : 'border-slate-300'} bg-white relative`}>
                <img src={LOGO_URL} alt="Logo" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            
            <div className="flex flex-col">
                <h1 className={`font-black text-xl md:text-2xl tracking-widest leading-none ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  ANSHU
                </h1>
                <span className="text-[10px] text-yellow-500 font-bold tracking-widest">PORTFOLIO</span>
            </div>
          </div>

          <div className="flex gap-2 md:gap-3">
            <button 
              onClick={toggleTheme} 
              className={`p-2 rounded-full transition border ${isDark ? 'bg-slate-800 text-yellow-400 border-slate-700 hover:text-white' : 'bg-slate-100 text-orange-500 border-slate-200 hover:bg-slate-200'}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={toggleMute} 
              className={`p-2 rounded-full transition border ${isDark ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}`}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            <button 
              onClick={resetGame} 
              className={`p-2 rounded-full transition border ${isDark ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}`}
            >
              <RotateCcw size={18} />
            </button>

            <a 
              href="/resume.pdf" 
              download 
              target="_blank"
              className={`hidden md:flex px-4 py-2 rounded-full font-bold items-center gap-2 text-xs border transition ${isDark ? 'bg-slate-800 text-white border-slate-600 hover:bg-slate-700' : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'}`}
            >
              <Download size={14} /> Resume
            </a>

            <button 
              onClick={startTour} 
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 text-xs shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition"
            >
              <Play size={14} fill="currentColor" /> QUICK TOUR
            </button>
          </div>
        </nav>

        {/* --- NOTE FOR PLAYING --- */}
        <div className={`
            w-full py-1 text-center text-[10px] md:text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm
            ${isDark ? 'bg-yellow-500/10 text-yellow-500 border-b border-yellow-500/20' : 'bg-blue-50 text-blue-600 border-b border-blue-100'}
        `}>
            <Info size={12} className="animate-pulse" />
            <span>Roll the Dice to Explore. Reach the Center to Connect!</span>
        </div>
    </div>
  );
}