import React, { useState, useEffect, useRef } from 'react';
import Board from './components/Board';
import Navbar from './components/Navbar';
import Popup from './components/Popup';
import Sidebar from './components/Sidebar';
import Dice3D from './components/Dice3D'; 
import { SECTIONS, LUDO_PATH } from './constants';
import { speak as aiSpeak } from './utils/voiceAgent';
import confetti from 'canvas-confetti';

export default function App() {
  const [tile, setTile] = useState(0);
  const [popupSection, setPopupSection] = useState(null);
  const [diceValues, setDiceValues] = useState({ d1: 1, d2: 6 });
  const [isRolling, setIsRolling] = useState(false);
  const [isTouring, setIsTouring] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to Dark Mode
  
  const audioRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3'));

  const speak = (text) => {
    if (!isMuted) aiSpeak(text);
  };

  useEffect(() => {
    setPopupSection('intro');
    const link = document.querySelector("link[rel~='icon']");
    if (link) { link.href = '/image_28cbac.png'; }

    setTimeout(() => {
      speak("Hello World! I am Anshu. Welcome to my portfolio game.");
    }, 1000);
  }, []);

  const playSound = () => {
    if (isMuted) return;
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } catch(e) {}
  };

  const getNextStopDistance = (currentTile) => {
    const checkpoints = [13, 26, 39, 57];
    const nextIndex = checkpoints.find(cp => cp > currentTile);
    if (nextIndex === undefined) return 0;
    return nextIndex - currentTile;
  };

  const rollDice = async () => {
    if (isRolling || popupSection || isTouring) return;
    
    if (tile >= 57) {
      resetGame();
      return;
    }

    setIsRolling(true);
    playSound();
    speak("Rolling.");
    
    await new Promise(r => setTimeout(r, 2000)); 

    const distanceToNext = getNextStopDistance(tile);
    let finalD1 = Math.floor(Math.random()*6)+1;
    let finalD2 = Math.floor(Math.random()*6)+1;

    if (distanceToNext <= 12) {
      if (distanceToNext > 6) { 
        finalD1 = 6; 
        finalD2 = distanceToNext - 6; 
      } else { 
        finalD1 = Math.ceil(distanceToNext / 2); 
        finalD2 = Math.floor(distanceToNext / 2); 
      }
      if(distanceToNext === 1) { finalD1 = 1; finalD2 = 0; }
    }

    setDiceValues({ d1: finalD1, d2: finalD2 });
    setIsRolling(false); 

    await new Promise(r => setTimeout(r, 800));

    await moveToken(Math.min(finalD1 + finalD2, distanceToNext));
  };

  const moveToken = async (steps) => {
    let current = tile;
    const speed = 250; 

    for (let i = 0; i < steps; i++) {
      if (current >= 57) break;
      current++;
      setTile(current);
      await new Promise(r => setTimeout(r, speed));
    }
    checkLanding(current);
  };

  const checkLanding = (posIndex) => {
    const section = Object.values(SECTIONS).find(s => s.stepIndex === posIndex);
    if (section) {
      speak(`Reached ${section.label}`);
      setPopupSection(section.id);
      if (section.id === 'contact') triggerConfetti();
    }
  };

  const handlePopupClose = () => {
    if (popupSection === 'contact') {
        setPopupSection(null);
        setTimeout(() => {
            resetGame();
        }, 500);
    } else {
        setPopupSection(null);
    }
  };

  const runTour = async () => {
    if (isTouring) return;
    setIsTouring(true);
    speak("Starting Quick Tour.");
    
    setPopupSection(null);
    setTile(0);
    await new Promise(r => setTimeout(r, 500));
    setPopupSection('intro'); 
    await new Promise(r => setTimeout(r, 2000));
    setPopupSection(null);

    const stops = [13, 26, 39, 57]; 
    let currentTile = 0;
    
    for (const stopIndex of stops) {
        const dist = stopIndex - currentTile;
        for(let i=0; i<dist; i++) {
            currentTile++;
            setTile(currentTile);
            await new Promise(r => setTimeout(r, 60)); 
        }

        checkLanding(currentTile);
        await new Promise(r => setTimeout(r, 2500));
        
        if (stopIndex !== 57) {
            setPopupSection(null);
            await new Promise(r => setTimeout(r, 500));
        }
    }
    setIsTouring(false);
    speak("Tour Complete.");
  };

  const resetGame = () => {
    setTile(0);
    setDiceValues({d1: 1, d2: 6});
    speak("Game Reset to Start.");
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
  };

  return (
    <div className={`h-screen w-screen flex flex-col relative overflow-hidden font-sans transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      
      {/* Background Gradient - Switching based on theme */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isDark ? 'opacity-100 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black' : 'opacity-100 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100 via-slate-200 to-white'}`}></div>

      <Navbar 
        startTour={runTour} 
        resetGame={resetGame} 
        isMuted={isMuted} 
        toggleMute={() => setIsMuted(!isMuted)} 
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
      />

      <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full h-full p-2 md:p-6 gap-4 relative z-10 overflow-y-auto md:overflow-visible">
        
        {/* Left Sidebar */}
        <div className="w-full md:w-64 flex justify-start order-2 md:order-1 px-4 md:px-0">
           <Sidebar isDark={isDark} />
        </div>

        {/* Center Board */}
        <div className="flex-1 flex justify-center order-1 md:order-2">
           <Board 
             tile={tile} 
             onHomeClick={(color) => !isTouring && setPopupSection(SECTIONS[color].id)} 
             onCenterClick={() => setPopupSection('contact')} 
             isTouring={isTouring} 
             isDark={isDark}
           />
        </div>

        {/* Right Dice */}
        <div className="w-full md:w-64 flex flex-col items-center justify-end md:justify-end gap-4 mb-4 md:mb-0 order-3 md:order-3">
            <button onClick={resetGame} className={`text-xs underline decoration-slate-700 underline-offset-4 transition ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-black'}`}>Reset Board</button>

            <div className={`backdrop-blur-xl p-6 rounded-2xl border shadow-2xl flex flex-col items-center gap-6 w-full max-w-[280px] transition-colors duration-300 ${isDark ? 'bg-slate-800/40 border-white/5' : 'bg-white/40 border-black/5'}`}>
                <div className="flex gap-6 justify-center">
                    <Dice3D value={diceValues.d1} rolling={isRolling} />
                    <Dice3D value={diceValues.d2} rolling={isRolling} />
                </div>
                <button 
                    onClick={rollDice}
                    disabled={isRolling || isTouring || tile >= 57}
                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-black tracking-widest rounded-xl shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:grayscale"
                >
                    {isRolling ? "ROLLING..." : (tile >= 57 ? "GOAL REACHED" : "ROLL DICE")}
                </button>
            </div>
        </div>

      </div>

      <Popup section={popupSection} onClose={handlePopupClose} />
    </div>
  );
}