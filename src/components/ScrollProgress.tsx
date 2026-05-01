"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-glow-green z-[100] origin-left drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] pointer-events-none"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
