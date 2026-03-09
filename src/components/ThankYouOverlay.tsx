"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThankYouOverlay({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0D0D0D]/90 backdrop-blur-xl z-[100] flex flex-col justify-center items-center p-4 text-center"
        >
          {/* Animated SVG Checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-32 h-32 mb-12"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.circle
                initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#39ff14"
                strokeWidth="4"
              />
              <motion.path
                initial={{ strokeDasharray: 100, strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                d="M 30,50 L 45,65 L 75,35"
                fill="none"
                stroke="#39ff14"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]"
              />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="font-display text-4xl md:text-6xl text-glow-green mb-4 tracking-tighter mix-blend-screen"
          >
            PAYLOAD_DELIVERED.
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="font-mono text-sm text-secondary max-w-md mx-auto mb-12 leading-relaxed"
          >
            Connection established successfully. I will initiate contact within 24 hours.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={onClose}
            className="uppercase tracking-widest text-xs font-mono font-bold text-glow-green border border-glow-green/30 px-6 py-4 rounded hover:bg-glow-green hover:text-black transition-all"
          >
            [ CLOSE_SESSION ]
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
