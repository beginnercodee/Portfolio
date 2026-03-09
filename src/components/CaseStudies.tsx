"use client";

import { motion } from "framer-motion";

const caseStudies = [
  {
    title: "Agency Outreach Automation.",
    metric: "+400% Meeting Booking Rate",
    synopsis: "Implemented an autonomous lead-qualification system using LLMs and n8n, saving 30+ hours of manual inbox management per week.",
  },
  {
    title: "Real-Time Data Sync Pipeline.",
    metric: "0 Manual Data Entry Errors",
    synopsis: "Bridged isolated legacy tools via custom Python endpoints and webhooks, ensuring 100% data fidelity between sales and operations teams in under 2 seconds.",
  },
];

export default function CaseStudies() {
  return (
    <section className="max-w-[1440px] mx-auto py-24 px-12 z-30 relative">
      <h2 className="font-display text-4xl text-primary mb-12 opacity-80 uppercase tracking-widest text-center md:text-left">
        CASE STUDIES / ROI ARCHITECTURE
      </h2>

      <div className="flex flex-col gap-12">
        {caseStudies.map((cs, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-surface border border-glow-green/30 rounded-xl p-12 transition-all hover:border-glow-green hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="flex-1">
              <h3 className="font-display text-3xl font-bold text-primary mb-4">{cs.title}</h3>
              <p className="font-sans text-body-sm text-secondary leading-relaxed max-w-lg">
                {cs.synopsis}
              </p>
            </div>
            
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="font-display text-xl md:text-3xl text-glow-green font-extrabold text-center md:text-right drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]">
                {cs.metric}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
