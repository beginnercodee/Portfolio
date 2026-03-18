"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Team Lead, CRM & Agentic AI",
    meta: "[master] EditVista LTD // Mar 2026 — Present",
    desc: "Leading a department focused on orchestrating intelligent agentic workflows, complex CRM integrations, and massive-scale operational automation.",
  }, 
  {
    role: "Agentic AI & Automation Intern",
    meta: "[v1.1.0] EditVista LTD // Jan 2026 — Feb 2026",
    desc: "Designed and prototyped intelligent agentic systems and integrated LLMs to automate high-friction business processes.",
  },
  {
    role: "Web Development Intern",
    meta: "[v1.0.0] Nexium // Jul 2025 — Aug 2025",
    desc: "Architected and deployed full-stack web applications utilizing Next.js, Tailwind CSS, Supabase, and MongoDB.",
  },
];

export default function Experience() {
  const memoizedExperiences = useMemo(() => experiences.map((exp, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: idx * 0.2 }}
      className={`relative flex w-full mb-12 group ${
        idx % 2 === 0 ? "justify-start" : "justify-end"
      }`}
    >
      {/* Timeline node */}
      <div className="absolute left-4 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-glow-green rounded-full shadow-[0_0_15px_rgba(57,255,20,0.8)] z-10 group-hover:scale-150 group-hover:bg-glow-green transition-transform duration-300" />

      {/* Card - reduced margin and padding on mobile for maximum real estate */}
      <div className={`w-full md:w-[45%] p-6 md:p-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl hover:border-glow-green/50 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] transition-all duration-500 overflow-hidden relative ${idx % 2 === 0 ? "ml-12 md:ml-0 md:mr-12" : "ml-12 md:ml-12"}`}>
        {/* Card internal glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-glow-green/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <h3 className="font-display text-xl md:text-3xl text-primary font-bold group-hover:text-glow-green transition-colors duration-300">
          {exp.role}
        </h3>
        <p className="font-mono text-[10px] md:text-xs text-glow-silver/70 mt-2 mb-4 tracking-wider flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-glow-green/50 inline-block shrink-0" /> {exp.meta}
        </p>
        <p className="font-sans text-xs md:text-body-sm text-secondary leading-relaxed">
          {exp.desc}
        </p>
      </div>
    </motion.div>
  )), []);

  return (
    <section id="experience" className="flex flex-col max-w-[1000px] mx-auto py-20 md:py-32 px-6 md:px-12 z-30 relative overflow-hidden">
      <h2 className="font-display text-3xl md:text-4xl text-primary mb-16 md:mb-24 opacity-80 uppercase tracking-widest text-center">
        EXPERIENCE / EXECUTION_LOG
      </h2>

      <div className="relative">
        {/* Timeline line - pushed further left on mobile to save space */}
        <div className="w-px bg-gradient-to-b from-transparent via-glow-green/50 to-transparent absolute left-4 md:left-1/2 top-0 bottom-0 -translate-x-1/2 before:content-[''] before:absolute before:inset-0 before:bg-glow-green before:blur-[8px] before:opacity-30" />
        
        {memoizedExperiences}
      </div>
    </section>
  );
}
