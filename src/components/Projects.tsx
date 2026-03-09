"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    title: "CodeSprint.",
    tech: "React, GenAI, Web Sockets",
    desc: "An AI-tutoring system for coding competitions. Evaluates logic in real-time, providing immediate, intelligent feedback to competitors.",
    image: "/projects/codesprint.png",
  },
  {
    title: "Automated Outreach Engine.",
    tech: "GoHighLevel, n8n, Supabase",
    desc: "End-to-end client acquisition system built for a Consulting Agency and a dental clinic, completely removing manual pipeline management.",
    image: "/projects/outreach-engine.png",
  },
  {
    title: "Custom Quote Generator.",
    tech: "Next.js, Supabase, Tailwind",
    desc: "A dynamic, high-performance web tool engineered to replace legacy Excel-based quoting flows with real-time database synchronization.",
    image: "/projects/quote-generator.png",
  },
  {
    title: "Intelligent PDF Engine.",
    tech: "Python, Flask, Webhooks",
    desc: "Automated PDF generation system integrating directly with GoHighLevel via webhooks to instantly update CRM contact records.",
    image: "/projects/pdf-engine.png",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-12 py-32 max-w-[1440px] mx-auto z-30 relative">
      <h2 className="font-display text-4xl text-primary mb-16 opacity-80 uppercase tracking-widest text-center md:text-left">
        SELECTED WORKS /
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative aspect-[4/3] bg-base border border-surface hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden group rounded-2xl cursor-pointer transition-all duration-500"
          >
            {/* Added subtle glow on hover */}
            <div className="absolute inset-0 bg-glow-green/20 opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700 z-10 pointer-events-none" />
            
            {/* Project Image */}
            <Image 
              src={proj.image} 
              alt={proj.title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.02] transition-all duration-700 z-0"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-8 z-20">
              <h3 className="font-display text-3xl md:text-4xl text-primary mb-3 font-bold tracking-tight shadow-black drop-shadow-lg">
                {proj.title}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-widest text-glow-green mb-5 flex items-center gap-2 drop-shadow-md">
                <span className="w-2 h-2 rounded-full bg-glow-green animate-pulse" /> {proj.tech}
              </p>
              <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-sans text-body-sm text-secondary pt-2 border-t border-white/10 max-w-md leading-relaxed drop-shadow-md bg-black/40 backdrop-blur-sm p-4 rounded-lg mt-2">
                  {proj.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
