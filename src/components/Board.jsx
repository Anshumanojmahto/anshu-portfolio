import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { LUDO_PATH } from '../constants';

export default function Board({ tile, onHomeClick, onCenterClick, isTouring, isDark }) {
  const currentPos = LUDO_PATH[Math.min(tile, LUDO_PATH.length - 1)] || LUDO_PATH[0];

  const renderHomeTokens = (colorClass) => (
    <div className="grid grid-cols-2 gap-3 p-4 bg-white rounded-3xl shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] w-2/3 h-2/3 relative z-10">
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`relative rounded-full border border-black/10 shadow-[0_4px_0_rgba(0,0,0,0.2)] ${colorClass} transform hover:scale-110 transition-transform duration-300`}>
          <div className="absolute top-1 left-1 w-1/3 h-1/3 bg-white opacity-40 rounded-full"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative flex-1 flex items-center justify-center p-2 z-10">
      <div 
        className={`
          relative bg-white shadow-[0_20px_60px_rgba(0,0,0,0.6)] border-[6px] rounded-lg overflow-hidden select-none transition-colors duration-300
          ${isDark ? 'border-slate-800' : 'border-slate-500'}
        `}
        style={{
          width: 'min(95vw, 80vh)',
          aspectRatio: '1/1',
          display: 'grid',
          gridTemplateColumns: 'repeat(15, 1fr)',
          gridTemplateRows: 'repeat(15, 1fr)',
          backgroundColor: isDark ? '#cbd5e1' : '#e2e8f0', 
          gap: '1px'
        }}
      >
        {[...Array(225)].map((_, i) => {
          const x = i % 15;
          const y = Math.floor(i / 15);
          let cellClass = 'bg-white';

          // Homes
          if (x < 6 && y < 6) return (x===0&&y===0) ? <HomeBox key={i} color="bg-yellow-400" label="INTRO" onClick={() => onHomeClick('yellow')} renderTokens={() => renderHomeTokens('bg-yellow-500')} /> : null;
          if (x > 8 && y < 6) return (x===9&&y===0) ? <HomeBox key={i} color="bg-blue-500" label="SKILLS" onClick={() => onHomeClick('blue')} renderTokens={() => renderHomeTokens('bg-blue-600')} /> : null;
          if (x < 6 && y > 8) return (x===0&&y===9) ? <HomeBox key={i} color="bg-green-500" label="EXPERIENCE" onClick={() => onHomeClick('green')} renderTokens={() => renderHomeTokens('bg-green-600')} /> : null;
          if (x > 8 && y > 8) return (x===9&&y===9) ? <HomeBox key={i} color="bg-red-500" label="PROJECTS" onClick={() => onHomeClick('red')} renderTokens={() => renderHomeTokens('bg-red-600')} /> : null;

          // Center
          if (x >= 6 && x <= 8 && y >= 6 && y <= 8) return (x===6&&y===6) ? <CenterBox key={i} onClick={onCenterClick} /> : null;

          // Tracks
          if (y === 7 && x > 0 && x < 6) cellClass = 'bg-yellow-400';
          if (x === 7 && y > 0 && y < 6) cellClass = 'bg-blue-500';
          if (y === 7 && x > 8 && x < 14) cellClass = 'bg-red-500';
          if (x === 7 && y > 8 && y < 14) cellClass = 'bg-green-500';

          // Start Spots
          if (x === 1 && y === 6) cellClass = 'bg-yellow-400';
          if (x === 8 && y === 1) cellClass = 'bg-blue-500';
          if (x === 13 && y === 8) cellClass = 'bg-red-500';
          if (x === 6 && y === 13) cellClass = 'bg-green-500';

          const isStar = (x===1 && y===6) || (x===8 && y===1) || (x===13 && y===8) || (x===6 && y===13) || 
                         (x===2 && y===8) || (x===6 && y===2) || (x===12 && y===6) || (x===8 && y===12); 

          let arrowRot = null;
          if (x===0 && y===7) arrowRot = 0;    
          if (x===7 && y===0) arrowRot = 90;   
          if (x===14 && y===7) arrowRot = 180; 
          if (x===7 && y===14) arrowRot = 270; 

          return (
            <div key={i} className={`${cellClass} flex items-center justify-center relative shadow-[inset_0_0_2px_rgba(0,0,0,0.05)]`}>
               {isStar && <Star className={`w-3/4 h-3/4 ${cellClass === 'bg-white' ? 'text-slate-300' : 'text-white fill-white'}`} strokeWidth={cellClass === 'bg-white' ? 2 : 0} />}
               {arrowRot !== null && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400/50" style={{ transform: `rotate(${arrowRot}deg)` }}>
                    <ArrowRight size={20} strokeWidth={4} />
                </div>
              )}
            </div>
          );
        })}

        {/* --- 5. THE GLOWING TOKEN (GOTI) --- */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
          className="absolute z-50 flex items-center justify-center pointer-events-none"
          style={{ width: '6.66%', height: '6.66%', left: `${currentPos.x * 6.66}%`, top: `${currentPos.y * 6.66}%` }}
        >
           {/* RIPPLE / WAVE EFFECT */}
           <motion.div
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute w-full h-full bg-orange-500/50 rounded-full z-0"
           />
           
           {/* Second Ripple for density */}
           <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute w-full h-full bg-yellow-400/50 rounded-full z-0"
           />

           {/* The 3D Token Graphic With GLOW */}
           <div className="w-[75%] h-[75%] bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full shadow-[0_0_15px_rgba(251,146,60,0.8),0_4px_0_#b45309] border-[2px] border-white/80 relative z-10 flex items-center justify-center ring-2 ring-orange-400/50">
               <div className="absolute top-1 left-1.5 w-1/3 h-1/3 bg-white rounded-full opacity-70 blur-[0.5px]"></div>
               <div className="w-1.5 h-1.5 bg-orange-900/40 rounded-full"></div>
           </div>
        </motion.div>

      </div>
    </div>
  );
}

const HomeBox = ({ color, label, onClick, renderTokens }) => (
  <div onClick={onClick} className={`col-span-6 row-span-6 ${color} border border-black/20 flex flex-col items-center justify-center relative cursor-pointer hover:brightness-105 active:scale-[0.99] transition-all group overflow-hidden`}>
    <span className="absolute text-[2.5rem] md:text-[3rem] font-black text-black/10 group-hover:text-black/20 transition select-none rotate-[-15deg]">{label}</span>
    {renderTokens()}
    <span className="mt-2 text-[10px] md:text-xs font-bold text-black/70 bg-white/40 px-3 py-0.5 rounded-full backdrop-blur-sm z-10 shadow-sm border border-white/20">{label}</span>
  </div>
);

const CenterBox = ({ onClick }) => (
  <div onClick={onClick} className="col-span-3 row-span-3 bg-white relative border border-black/20 cursor-pointer hover:scale-105 transition z-10 shadow-lg group">
      <div className="absolute inset-0 border-[40px] md:border-[55px] border-solid border-transparent border-t-blue-500 border-r-red-500 border-b-green-500 border-l-yellow-400"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className="text-[8px] md:text-[10px] font-black text-white drop-shadow-md tracking-widest bg-black/20 px-1 rounded mb-0.5">CONNECT</span>
      </div>
  </div>
);