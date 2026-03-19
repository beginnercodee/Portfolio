"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ENGINEER_CHARS = "ENGINEER.".split("");
const AUTOMATE_CHARS = "AUTOMATE.".split("");

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
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-16 px-12 z-10">
      {/* Background Glows (Static rendering, O(1) scroll execution) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-glow-green rounded-full blur-[120px] opacity-30 z-0 pointer-events-none translate-z-0 will-change-transform" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-glow-silver rounded-full blur-[120px] opacity-20 z-0 pointer-events-none translate-z-0 will-change-transform" />

      {/* Profile Picture Placeholder */}
      <motion.div style={{ y: yText, opacity: opacityText }} className="mb-8 md:mb-12 z-30">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-white/10 p-1 overflow-hidden backdrop-blur-md group hover:border-glow-green/50 transition-colors duration-500"
        >
          <div className="w-full h-full rounded-full bg-[#111] overflow-hidden relative flex items-center justify-center">
            {/* INSTRUCTION FOR USER: Add profile.jpg or profile.png to the 'public' folder */}
            <img 
              src="/profile.jpg" 
              alt="Jamal Nadeem" 
              className="absolute w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-800 opacity-80 group-hover:opacity-100 object-top"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Fallback Initials */}
            <span className="text-secondary tracking-widest font-mono text-xl group-hover:text-glow-green transition-colors">
              [ J_N ]
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Text */}
      <motion.div
        style={{ y: yText, opacity: opacityText, perspective: 1000 }}
        className="z-10 text-center flex flex-col items-center"
      >
        <h1 className="font-display text-hero uppercase tracking-tighter leading-none font-extrabold mix-blend-lighten flex flex-col items-center cursor-default">
          <div className="flex">
            {ENGINEER_CHARS.map((char, i) => (
              <span
                key={`eng-${i}`}
                style={{ animationDelay: `${i * 0.06}s` }}
                className="text-primary inline-block origin-bottom hover:text-glow-green hover:-translate-y-3 hover:rotate-6 hover:scale-110 transition-all duration-300 animate-slide-up-fade opacity-0-init"
              >
                {char}
              </span>
            ))}
          </div>
          <div className="flex md:mt-[-0.5rem]">
            {AUTOMATE_CHARS.map((char, i) => (
              <span
                key={`auto-${i}`}
                style={{ animationDelay: `${0.4 + i * 0.06}s` }}
                className="text-primary inline-block origin-bottom hover:text-glow-green hover:-translate-y-3 hover:rotate-6 hover:scale-110 transition-all duration-300 animate-slide-up-fade opacity-0-init"
              >
                {char}
              </span>
            ))}
          </div>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div style={{ y: yText, opacity: opacityText }} className="w-full flex justify-center z-30">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-sans text-body-sm !text-white mt-8 max-w-lg text-center leading-relaxed md:text-base selection:bg-glow-green selection:text-black font-medium tracking-wide drop-shadow-lg"
        >
          I am Jamal Nadeem. A full-stack developer and AI integration specialist building intelligent, scalable systems that eliminate manual work.
        </motion.p>
      </motion.div>

      {/* Floating Badges */}
      <motion.div style={{ opacity: opacityText }} className="w-full flex justify-center z-30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mt-8 max-w-[90vw]"
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
      </motion.div>

      {/* CTA Button */}
      <motion.div style={{ opacity: opacityText }} className="w-full flex justify-center z-30 mt-12 md:mt-16 group">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="relative inline-block"
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
      </motion.div>
    </section>
  );
}
