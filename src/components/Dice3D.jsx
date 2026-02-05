import React from 'react';
import { motion } from 'framer-motion';

export default function Dice3D({ value, rolling }) {
  // Rotations for 1-6
  const rotations = {
    1: { x: 0, y: 0 },
    2: { x: -90, y: 0 },
    3: { x: 0, y: -90 },
    4: { x: 0, y: 90 },
    5: { x: 90, y: 0 },
    6: { x: 180, y: 0 },
  };

  const currentRot = rotations[value] || rotations[1];

  return (
    <div className="w-16 h-16 md:w-20 md:h-20 perspective-[600px]">
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={rolling ? {
          rotateX: [0, 360, 720, 1080],
          rotateY: [0, 360, 720, 1080],
          transition: { duration: 2.0, ease: "linear", repeat: Infinity } // Slowed to 2.0s
        } : {
          rotateX: currentRot.x,
          rotateY: currentRot.y,
          transition: { type: "spring", stiffness: 50, damping: 20 }
        }}
      >
        <Face translateZ="32px md:translate-z-10"><Dot /></Face> 
        <Face rotateY="180deg" translateZ="32px"><div className="grid grid-cols-2 gap-2"><Dot /><Dot /><Dot /><Dot /><Dot /><Dot /></div></Face> 
        <Face rotateY="90deg" translateZ="32px"><div className="grid grid-cols-2 gap-2"><Dot /><Dot /><Dot /><Dot /></div></Face> 
        <Face rotateY="-90deg" translateZ="32px"><div className="flex justify-between w-full p-1"><Dot /><div className="self-center"><Dot /></div><Dot /></div></Face> 
        <Face rotateX="90deg" translateZ="32px"><div className="grid grid-cols-2 gap-2 justify-items-center"><Dot /><Dot /><div className="col-span-2"><Dot /></div><Dot /><Dot /></div></Face> 
        <Face rotateX="-90deg" translateZ="32px"><div className="flex justify-between w-full p-2"><Dot /><Dot /></div></Face> 
      </motion.div>
    </div>
  );
}

const Face = ({ children, rotateX = 0, rotateY = 0, translateZ }) => (
  <div 
    className="absolute inset-0 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center backface-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.05)]"
    style={{ 
      transform: `rotateX(${rotateX}) rotateY(${rotateY}) translateZ(40px)`, // Adjusted for size
      backfaceVisibility: 'hidden',
    }} 
  >
    {children}
  </div>
);

const Dot = () => <div className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full shadow-sm"></div>;