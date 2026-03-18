"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    client: "Consulting Agency X",
    author: "Operations Director",
    log: "The n8n and GoHighLevel outreach engine Jamal built saved us 30 hours a week. It literally runs on auto-pilot. Brilliant work.",
    status: "VERIFIED_LOG",
  },
  {
    client: "Dental Clinic Partners",
    author: "Lead Administrator",
    log: "Transitioning from manual Excel sheets to the Next.js Custom Quote Generator was seamless. The database sync is instantaneous.",
    status: "VERIFIED_LOG",
  }
];

export default function Testimonials() {
  const memoizedTestimonials = useMemo(() => testimonials.map((t, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.2 }}
      className="flex flex-col md:flex-row gap-6 p-8 border-l-2 border-surface hover:border-glow-green transition-colors duration-500 bg-[#0D0D0D]/50 group"
    >
      <div className="md:w-1/3 flex flex-col justify-between">
        <div>
          <div className="font-mono text-xs text-glow-green mb-1 animate-[pulse_3s_infinite]">{t.status}</div>
          <h3 className="font-sans font-bold text-primary group-hover:text-glow-green transition-colors duration-300">{t.client}</h3>
          <p className="font-mono text-[10px] text-secondary">{t.author}</p>
        </div>
      </div>
      <div className="md:w-2/3">
        <p className="font-mono text-sm text-secondary italic leading-relaxed">
          "{t.log}"
        </p>
      </div>
    </motion.div>
  )), []);

  return (
    <section className="px-12 py-32 max-w-[1000px] mx-auto z-30 relative">
      <h2 className="font-display text-4xl text-primary mb-16 opacity-80 uppercase tracking-widest text-center md:text-left hover:text-glow-green hover:opacity-100 transition-all duration-500 cursor-pointer">
        CLIENT_LOGS / TESTIMONIALS
      </h2>
      <div className="flex flex-col gap-8">
        {memoizedTestimonials}
      </div>
    </section>
  );
}
