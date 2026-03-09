"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 pb-24 px-12 z-10">
      {/* Background Glows (z-0) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-glow-green rounded-full blur-[120px] opacity-30 z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-glow-silver rounded-full blur-[120px] opacity-20 z-0 pointer-events-none" />

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center"
      >
        <h1 className="font-display text-hero text-primary uppercase tracking-tighter leading-none font-extrabold mix-blend-lighten">
          ENGINEER.<br />
          AUTOMATE.
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="font-sans text-body-sm text-glow-silver mt-8 max-w-lg text-center z-30 leading-relaxed md:text-base selection:bg-glow-green selection:text-black font-medium tracking-wide drop-shadow-md"
      >
        I am Jamal Nadeem. A full-stack developer and AI integration specialist building intelligent, scalable systems that eliminate manual work.
      </motion.p>

      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex gap-4 mt-8 z-30"
      >
        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md font-mono text-xs text-secondary hover:text-white transition-colors cursor-default">
          Next.js
        </span>
        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md font-mono text-xs text-secondary hover:text-white transition-colors cursor-default">
          Python
        </span>
        <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md font-mono text-xs text-secondary hover:text-white transition-colors cursor-default">
          Agents
        </span>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative mt-16 z-30 group"
      >
        <div className="relative w-36 h-36 flex items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-sm hover:border-glow-green hover:shadow-[0_0_40px_rgba(57,255,20,0.15)] transition-all duration-500 cursor-pointer">
          <svg className="absolute w-[120%] h-[120%] animate-spin-slow opacity-60 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 100 100">
            <path
              id="curve"
              fill="transparent"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            />
            <text className="text-[10px] tracking-[0.25em] font-mono fill-secondary group-hover:fill-glow-green transition-colors">
              <textPath href="#curve" startOffset="0">
                VIEW MY WORK • VIEW MY WORK •
              </textPath>
            </text>
          </svg>
          <div className="text-primary group-hover:text-glow-green transition-colors text-3xl font-light translate-y-[-2px] group-hover:translate-x-1 group-hover:-translate-y-1 transform duration-300">
            ↗
          </div>
        </div>
      </motion.div>
    </section>
  );
}
