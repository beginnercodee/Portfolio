"use client";

import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "AI AUTOMATION & AGENTS",
    desc: "Custom LLM integrations, n8n workflows, and autonomous agents designed to eliminate repetitive tasks and scale operations.",
    features: ["Agentic Workflows", "OpenAI / Claude / Local LLMs", "Chatbots & RAG Systems"],
  },
  {
    id: "02",
    title: "FULL-STACK ENGINEERING",
    desc: "High-performance data pipelines, backend architecture, and database design using Node.js, Python, and Supabase.",
    features: ["REST/GraphQL APIs", "WebSockets & Real-time", "Database Architecture"],
  },
  {
    id: "03",
    title: "FRONTEND ARCHITECTURE",
    desc: "Responsive, motion-rich user interfaces built with React, Next.js, and Tailwind CSS. Obsessed with performance and design.",
    features: ["Next.js App Router", "Framer Motion", "Design Systems"],
  }
];

export default function Services() {
  return (
    <section id="services" className="px-12 py-32 max-w-[1440px] mx-auto z-30 relative">
      <h2 className="font-display text-4xl text-primary mb-16 opacity-80 uppercase tracking-widest text-center md:text-left">
        SERVICES / CAPABILITIES
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group p-8 border border-surface bg-[#0D0D0D] hover:border-glow-green hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] transition-all cursor-default relative overflow-hidden"
          >
            <div className="font-mono text-glow-green text-sm mb-6 relative z-10">{service.id} //</div>
            <h3 className="font-display text-2xl text-primary font-bold mb-4 relative z-10">{service.title}</h3>
            <p className="font-sans text-secondary text-sm mb-8 leading-relaxed relative z-10">
              {service.desc}
            </p>
            <ul className="flex flex-col gap-2 relative z-10">
              {service.features.map(f => (
                <li key={f} className="font-mono text-xs text-secondary flex items-center gap-2 group-hover:text-primary transition-colors">
                  <span className="text-glow-green">▹</span> {f}
                </li>
              ))}
            </ul>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-glow-green/10 rounded-full blur-2xl group-hover:bg-glow-green/20 transition-all pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
