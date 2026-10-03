"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Minimalist Cyber "Scroll-to-Top" Floating Action Button.
 * Automatically fades in when the page scroll progress exceeds 30%.
 * Features cybernetic monospace branding "[ ↑ TOP ]", glowing green border accents on hover,
 * and smooth return-to-top viewport navigation.
 */
export default function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Reveal button when scrolled past 30% of total document height
      setIsVisible(latest > 0.3);
    });
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-label="Scroll to top of page"
          className="fixed bottom-16 md:bottom-14 right-20 md:right-24 z-[60] flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-secondary hover:text-glow-green hover:border-glow-green/60 hover:shadow-[0_0_20px_rgba(57,255,20,0.25)] transition-all group font-mono text-[11px] tracking-wider select-none"
        >
          <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span className="font-semibold tracking-widest">[ TOP ]</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
