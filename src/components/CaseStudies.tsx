"use client";

import Link from "next/link";
import { ScrollFade } from "./animations/ScrollFade";
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react";

const caseStudies = [
  {
    slug: "agency-outreach-automation",
    title: "Agency Outreach & RFP Quoting Engine.",
    badge: "AI EXTRACTION & CRM ORCHESTRATION",
    metric: "+400% Turnaround Velocity",
    synopsis:
      "Engineered an autonomous RFQ extraction and dynamic proposal generation engine with forwarder-safe client resolution, 2-way Outlook/CRM sync, and immutable version control in Supabase.",
    tags: ["n8n", "OpenAI GPT-4", "GoHighLevel", "Supabase", "jsPDF"],
  },
  {
    slug: "real-time-data-sync-pipeline",
    title: "Real-Time Enterprise Data Sync Pipeline.",
    badge: "EVENT-DRIVEN ARCHITECTURE",
    metric: "0 Manual Entry Errors",
    synopsis:
      "Bridged legacy internal tools and modern cloud CRMs with sub-2s replication, automated backoff retry queues, and cryptographic webhook verification.",
    tags: ["Node.js", "Redis BullMQ", "PostgreSQL", "Webhooks"],
  },
];

/**
 * Renders the Case Studies section showing client ROI metrics and architectural
 * summaries with interactive hover navigation to deep-dive case study pages.
 */
export default function CaseStudies() {
  return (
    <section id="case-studies" className="max-w-[1440px] mx-auto py-12 md:py-20 px-6 md:px-12 z-30 relative">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-glow-green uppercase tracking-widest mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>ROI_ARCHITECTURE // VERIFIED METRICS</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-primary opacity-90 uppercase tracking-widest hover:text-glow-green hover:opacity-100 transition-all duration-500 cursor-pointer">
            CASE STUDIES / ROI ARCHITECTURE
          </h2>
        </div>
        
        <Link
          href="/case-studies"
          className="font-mono text-xs text-secondary hover:text-glow-green flex items-center gap-1 transition-colors w-max"
        >
          <span>view_all_case_studies</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex flex-col gap-8 md:gap-10">
        {caseStudies.map((cs, idx) => (
          <ScrollFade
            key={idx}
            y={20}
            duration={0.6}
            delay={idx * 0.2}
            className="w-full"
          >
            <Link
              href={`/case-studies/${cs.slug}`}
              className="group block bg-surface/70 border border-glow-green/30 rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-500 hover:border-glow-green hover:shadow-[0_0_35px_rgba(57,255,20,0.15)] hover:bg-white/[0.03] relative overflow-hidden"
            >
              {/* Subtle ambient hover flare */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-glow-green/10 rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start lg:items-center justify-between relative z-10">
                
                {/* Left Content */}
                <div className="flex-1 w-full flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-xs">
                    <span className="px-2 py-0.5 rounded bg-glow-green/10 border border-glow-green/30 text-glow-green font-semibold uppercase tracking-wider">
                      {cs.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary group-hover:text-glow-green transition-colors duration-300">
                    {cs.title}
                  </h3>
                  
                  <p className="font-sans text-xs sm:text-sm md:text-body-sm text-secondary leading-relaxed max-w-2xl">
                    {cs.synopsis}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cs.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[10px] px-2 py-0.5 bg-black/40 border border-white/10 text-glow-silver rounded uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Metric + Interactive Hover Action */}
                <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t border-white/10 lg:border-none pt-4 lg:pt-0 gap-4 shrink-0">
                  <div className="font-display text-xl sm:text-2xl md:text-3xl text-glow-green font-extrabold text-left lg:text-right drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]">
                    {cs.metric}
                  </div>

                  {/* Interactive Navigation Button on Hover */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-glow-green/40 bg-glow-green/10 text-glow-green group-hover:bg-glow-green group-hover:text-black font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.1)] group-hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]">
                    <Sparkles className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100" />
                    <span>READ CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

              </div>
            </Link>
          </ScrollFade>
        ))}
      </div>
    </section>
  );
}
