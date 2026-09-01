import Link from "next/link";
import { getAllCaseStudies } from "@/data/caseStudies";
import { ArrowLeft, ArrowUpRight, Terminal, BarChart3, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & ROI Architecture | JN Labs",
  description: "Deep-dive technical case studies, autonomous agent workflows, CRM pipelines, and enterprise automation ROI architectures.",
};

export default function CaseStudiesIndexPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <main className="min-h-screen bg-background text-primary pt-28 md:pt-36 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-start justify-center">
        <div className="absolute top-[10%] left-1/4 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-glow-green rounded-full blur-[180px] opacity-10 mix-blend-screen" />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10 flex flex-col gap-12">
        {/* Header Breadcrumbs */}
        <header className="flex flex-col gap-4 border-b border-surface pb-8">
          <Link
            href="/"
            className="font-mono text-xs text-secondary hover:text-glow-green transition-colors inline-flex items-center gap-1.5 w-max mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-glow-green" />
            <span>&lt; cd ../home</span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-glow-green">
            <Terminal className="w-3.5 h-3.5" />
            <span>ROI_ARCHITECTURE // ARCHIVES</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-extrabold uppercase tracking-tight">
            TECHNICAL CASE STUDIES
          </h1>
          <p className="font-sans text-base md:text-lg text-secondary leading-relaxed max-w-2xl">
            Detailed breakdowns of production-grade autonomous agent systems, high-concurrency data pipelines, and measurable business ROI architectures.
          </p>
        </header>

        {/* Case Studies Grid */}
        <div className="flex flex-col gap-8">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group p-6 sm:p-8 md:p-10 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl hover:border-glow-green/60 hover:bg-white/[0.03] transition-all duration-300 flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-glow-green/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex flex-col gap-4 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-glow-green/10 border border-glow-green/30 text-glow-green font-bold uppercase tracking-wider">
                    {cs.badge}
                  </span>
                  <span className="text-secondary/60">•</span>
                  <span className="text-glow-silver">{cs.clientContext.industry}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl text-white group-hover:text-glow-green transition-colors font-bold">
                  {cs.title}
                </h2>

                <p className="font-sans text-sm text-secondary leading-relaxed">
                  {cs.synopsis}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cs.techStack.flatMap((ts) => ts.technologies).slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] px-2 py-0.5 bg-surface border border-white/5 text-glow-silver rounded uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                  {cs.techStack.flatMap((ts) => ts.technologies).length > 5 && (
                    <span className="font-mono text-[10px] px-2 py-0.5 bg-surface text-secondary/60 rounded">
                      +{cs.techStack.flatMap((ts) => ts.technologies).length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* Metric & Action Column */}
              <div className="w-full lg:w-auto flex lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t border-white/10 lg:border-none pt-4 lg:pt-0 gap-3 shrink-0">
                <div className="flex flex-col lg:items-end">
                  <span className="font-display text-3xl sm:text-4xl text-glow-green font-extrabold drop-shadow-[0_0_15px_rgba(57,255,20,0.4)]">
                    {cs.heroMetric}
                  </span>
                  <span className="font-mono text-[11px] text-secondary/80 uppercase tracking-wider">
                    {cs.heroMetricLabel}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-glow-green/40 bg-glow-green/10 text-glow-green group-hover:bg-glow-green group-hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300">
                  <span>READ CASE STUDY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
