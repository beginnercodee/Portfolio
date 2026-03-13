"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 pb-24 px-12 z-10">
      {/* Background Glows (z-0) */}
      <motion.div style={{ y: yBg }} className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-glow-green rounded-full blur-[120px] opacity-30 z-0 pointer-events-none" />
      <motion.div style={{ y: yBg }} className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-glow-silver rounded-full blur-[120px] opacity-20 z-0 pointer-events-none" />

      {/* Hero Text */}
      <motion.div
        style={{ y: yText, opacity: opacityText, perspective: 1000 }}
        className="z-10 text-center flex flex-col items-center"
      >
        <h1 className="font-display text-hero uppercase tracking-tighter leading-none font-extrabold mix-blend-lighten flex flex-col items-center cursor-default">
          <div className="flex">
            {"ENGINEER.".split("").map((char, i) => (
              <motion.span
                key={`eng-${i}`}
                initial={{ y: 80, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary inline-block origin-bottom hover:text-glow-green hover:-translate-y-3 hover:rotate-6 hover:scale-110 transition-all duration-300"
              >
                {char}
              </motion.span>
            ))}
          </div>
          <div className="flex md:mt-[-0.5rem]">
            {"AUTOMATE.".split("").map((char, i) => (
              <motion.span
                key={`auto-${i}`}
                initial={{ y: 80, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary inline-block origin-bottom hover:text-glow-green hover:-translate-y-3 hover:rotate-6 hover:scale-110 transition-all duration-300"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ y: yText, opacity: opacityText }}
        className="font-sans text-body-sm !text-white mt-8 max-w-lg text-center z-30 leading-relaxed md:text-base selection:bg-glow-green selection:text-black font-medium tracking-wide drop-shadow-lg"
      >
        I am Jamal Nadeem. A full-stack developer and AI integration specialist building intelligent, scalable systems that eliminate manual work.
      </motion.p>

      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{ opacity: opacityText }}
        className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mt-8 z-30 max-w-[90vw]"
      >
        <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md font-mono text-[10px] md:text-xs text-secondary hover:text-white transition-colors cursor-default">
          Next.js
        </span>
        <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md font-mono text-[10px] md:text-xs text-secondary hover:text-white transition-colors cursor-default">
          Python
        </span>
        <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md font-mono text-[10px] md:text-xs text-secondary hover:text-white transition-colors cursor-default">
          Agents
        </span>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ opacity: opacityText }}
        className="relative mt-12 md:mt-16 z-30 group"
      >
        <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-sm hover:border-glow-green hover:shadow-[0_0_40px_rgba(57,255,20,0.15)] transition-all duration-500 cursor-pointer">
          <svg className="absolute w-[120%] h-[120%] animate-spin-slow opacity-60 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
            <path
              id="curve"
              fill="transparent"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            />
            <text className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.25em] font-mono fill-secondary group-hover:fill-glow-green transition-colors">
              <textPath href="#curve" startOffset="0">
                VIEW MY WORK • VIEW MY WORK •
              </textPath>
            </text>
          </svg>
          <div className="text-primary group-hover:text-glow-green transition-colors text-2xl md:text-3xl font-light translate-y-[-2px] group-hover:translate-x-1 group-hover:-translate-y-1 transform duration-300">
            ↗
          </div>
        </div>
      </motion.div>
    </section>
  );
}
