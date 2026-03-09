"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="max-w-[1440px] mx-auto px-12 py-32 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-30">
      <div className="relative border border-white/10 p-12 bg-white/5 backdrop-blur-sm rounded-lg shadow-inner overflow-hidden">
        <div className="absolute inset-0 bg-glow-green/10 blur-3xl opacity-20 pointer-events-none" />
        <h2 className="font-display text-4xl md:text-6xl lg:text-8xl text-surface uppercase font-bold opacity-30 tracking-tighter mix-blend-overlay">
          THE / MINDSET
        </h2>
      </div>
      
      <div className="flex flex-col justify-center font-sans text-body-sm text-secondary space-y-6 leading-relaxed">
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Currently completing my B.Sc in Computer Science at Sir Syed University of Engineering & Technology (Class of '26). <span className="text-primary font-medium">I don't just write code; I architect solutions.</span>
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          My core philosophy is simple: <span className="text-primary font-medium">if a task can be predicted, it can be automated.</span> I bridge the gap between clean, high-performance web development and agentic AI systems—reducing friction and multiplying efficiency.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Whether it's a sleek Next.js frontend or a complex background workflow powered by Python and GoHighLevel, I deliver digital infrastructure that works flawlessly.
        </motion.p>
      </div>
    </section>
  );
}
