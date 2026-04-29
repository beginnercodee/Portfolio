"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function KonamiCode() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // Standard Konami Code Sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiSequence = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", 
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", 
      "b", "a"
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Normalize key (handle uppercase 'B'/'A' and lowercase 'b'/'a')
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      
      if (key === konamiSequence[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiSequence.length) {
          setUnlocked(true);
          konamiIndex = 0; // Reset sequence
          
          // Auto-hide the God Mode overlay after 5 seconds
          setTimeout(() => setUnlocked(false), 5000);
        }
      } else {
        // Reset sequence if broken, but allow immediate restart
        konamiIndex = key === konamiSequence[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] pointer-events-none flex flex-col items-center justify-center bg-[#050505]/90 backdrop-blur-md"
        >
          {/* Hardware Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] mix-blend-overlay" />
          
          <div className="text-glow-green font-mono text-center space-y-6 z-20">
            <h1 className="text-4xl md:text-7xl font-bold tracking-[0.2em] drop-shadow-[0_0_30px_rgba(57,255,20,0.8)] animate-pulse">
              GOD MODE
            </h1>
            <div className="space-y-2 border border-glow-green/30 bg-black/50 p-6 rounded-md">
              <p className="text-sm md:text-lg opacity-90 tracking-widest uppercase">
                {">"} Root Access Verified
              </p>
              <p className="text-xs md:text-sm opacity-60">
                You found the master override switch. Respect.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
