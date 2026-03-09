"use client";

import { motion } from "framer-motion";

const experiments = [
  {
    status: "● ACTIVE",
    title: "Autonomous Content Agent",
    desc: "Testing multi-agent communication protocols using Hugging Face Spaces to generate, edit, and publish dual-language blog posts without human intervention.",
  },
  {
    status: "○ ARCHIVED",
    title: "Sentiment Trading Bot V1",
    desc: "A lightweight Python script piping real-time X (Twitter) financial sentiment into a basic predictive model. Proof of concept for automated data ingestion.",
  },
  {
    status: "● TRAINING...",
    title: "Local GenAI Coding Assistant",
    desc: "Fine-tuning a small LLaMA model locally to act as a specialized rubber-duck debugging assistant focused purely on React/Next.js edge cases.",
  },
];

export default function AILab() {
  return (
    <section className="max-w-[1440px] mx-auto py-32 px-12 z-30 relative">
      <h2 className="font-display text-4xl text-primary mb-12 opacity-80 uppercase tracking-widest text-center md:text-left">
        AI LAB / EXPERIMENTS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {experiments.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group bg-transparent border border-dashed border-surface p-8 hover:border-solid hover:border-glow-green transition-all duration-300 relative overflow-hidden rounded-xl"
          >
            {/* Status Indicator */}
            <div className="flex items-center gap-2 font-mono text-xs text-glow-green mb-6">
              <span className={exp.status.includes("ACTIVE") ? "animate-pulse" : ""}>
                {exp.status}
              </span>
            </div>

            <h3 className="font-sans text-xl font-bold text-primary mb-3 group-hover:text-glow-green transition-colors">
              {exp.title}
            </h3>
            
            <p className="font-mono text-xs text-secondary leading-relaxed">
              {exp.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
