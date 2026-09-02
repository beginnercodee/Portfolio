import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudyBySlug, getAllCaseStudies } from "@/data/caseStudies";
import { ArrowLeft, CheckCircle2, Layers, Cpu, Database, Mail, ShieldCheck, Zap, Server, ChevronRight, Terminal, BarChart3 } from "lucide-react";
import DownloadCaseStudyPdfButton from "@/components/DownloadCaseStudyPdfButton";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case Study Not Found | JN Labs" };

  return {
    title: `${cs.title} | Technical Case Study & ROI Architecture`,
    description: cs.synopsis,
    openGraph: {
      title: `${cs.title} | JN Labs`,
      description: cs.synopsis,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);

  if (!cs) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-primary pt-28 md:pt-36 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-start justify-center">
        <div className="absolute top-[8%] left-1/4 w-[70vw] md:w-[45vw] h-[70vw] md:h-[45vw] bg-glow-green rounded-full blur-[200px] opacity-10 mix-blend-screen" />
        <div className="absolute top-[40%] right-10 w-[50vw] md:w-[35vw] h-[50vw] md:h-[35vw] bg-accent-orange rounded-full blur-[250px] opacity-5 mix-blend-screen" />
      </div>

      <div className="max-w-[1100px] mx-auto relative z-10 flex flex-col gap-12 md:gap-16">
        
        {/* Navigation & Header Breadcrumbs */}
        <header className="flex flex-col gap-6 border-b border-surface pb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 font-mono text-xs text-secondary">
              <Link
                href="/#case-studies"
                className="hover:text-glow-green transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-glow-green" />
                <span>cd ../home#case-studies</span>
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-glow-silver">case-studies/{cs.slug}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-surface border border-glow-green/30 rounded-full font-mono text-[11px] text-glow-green">
                <span className="w-2 h-2 rounded-full bg-glow-green animate-pulse shadow-[0_0_8px_#39ff14]" />
                PRODUCTION_DEPLOYED
              </div>
              <DownloadCaseStudyPdfButton caseStudy={cs} />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <span className="font-mono text-xs uppercase tracking-widest text-glow-green flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              {cs.badge}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-tight uppercase leading-[1.1]">
              {cs.title}
            </h1>
            <p className="font-sans text-base sm:text-lg md:text-xl text-secondary leading-relaxed max-w-3xl">
              {cs.synopsis}
            </p>
          </div>

          {/* Client & Deployment Profile Meta Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/5 font-mono text-xs">
            <div className="flex flex-col gap-1">
              <span className="text-secondary/60 text-[10px] uppercase tracking-wider">Client Domain</span>
              <span className="text-white font-semibold">{cs.clientContext.industry}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-secondary/60 text-[10px] uppercase tracking-wider">Organization</span>
              <span className="text-white font-semibold">{cs.clientContext.organizationType}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-secondary/60 text-[10px] uppercase tracking-wider">Deployment Speed</span>
              <span className="text-glow-green font-semibold">{cs.clientContext.timeline}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-secondary/60 text-[10px] uppercase tracking-wider">Operational Scale</span>
              <span className="text-white font-semibold">{cs.clientContext.scale}</span>
            </div>
          </div>
        </header>

        {/* Hero ROI Metrics Showcase */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cs.metrics.map((metric, i) => (
            <div
              key={i}
              className="bg-black/40 backdrop-blur-md border border-glow-green/20 hover:border-glow-green/60 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(57,255,20,0.1)] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-glow-green/5 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="flex flex-col gap-1 mb-4">
                <span className="font-mono text-xs text-secondary/70 uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className="font-display text-3xl md:text-4xl font-extrabold text-glow-green drop-shadow-[0_0_12px_rgba(57,255,20,0.4)]">
                  {metric.value}
                </span>
              </div>
              <p className="font-sans text-xs text-secondary leading-snug">
                {metric.subtext}
              </p>
            </div>
          ))}
        </section>

        {/* Section 1: The Challenge */}
        <section className="flex flex-col gap-6 bg-surface/50 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-orange/10 border border-accent-orange/30 text-accent-orange">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-accent-orange uppercase tracking-widest">Section 01 // Problem Space</span>
              <h2 className="font-display text-2xl md:text-3xl text-white font-bold uppercase tracking-tight">
                The Operational Bottlenecks
              </h2>
            </div>
          </div>

          <p className="font-sans text-sm md:text-base text-secondary leading-relaxed">
            {cs.challenge.overview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {cs.challenge.painPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition-all flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-glow-silver font-semibold">
                  <span className="text-accent-orange">0{idx + 1}.</span> {point.title}
                </div>
                <p className="font-sans text-xs md:text-sm text-secondary/90 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: 5-Layer Engineering Architecture */}
        <section className="flex flex-col gap-8 bg-surface/50 border border-glow-green/20 rounded-2xl p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-glow-green/10 border border-glow-green/30 text-glow-green">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-glow-green uppercase tracking-widest">Section 02 // System Topology</span>
              <h2 className="font-display text-2xl md:text-3xl text-white font-bold uppercase tracking-tight">
                5-Layer Autonomous Architecture
              </h2>
            </div>
          </div>

          <p className="font-sans text-sm md:text-base text-secondary leading-relaxed">
            {cs.architecture.overview}
          </p>

          {/* Interactive Topology Stepper */}
          <div className="flex flex-col gap-4">
            {cs.architecture.layers.map((layer, idx) => (
              <div
                key={idx}
                className="bg-black/50 border border-white/10 hover:border-glow-green/50 rounded-xl p-5 md:p-6 transition-all duration-300 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between group"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="font-mono text-xs px-2.5 py-1 rounded bg-surface border border-white/10 text-glow-green shrink-0 font-bold">
                    {layer.step}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg md:text-xl text-white font-bold group-hover:text-glow-green transition-colors">
                        {layer.title}
                      </h3>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-secondary">
                        {layer.platform}
                      </span>
                    </div>
                    <p className="font-sans text-xs md:text-sm text-secondary leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-72 flex flex-col gap-1.5 pl-4 md:pl-0 border-l border-white/10 md:border-l-0 text-left">
                  {layer.keyFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 font-mono text-[11px] text-glow-silver">
                      <CheckCircle2 className="w-3 h-3 text-glow-green shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Deep Technical Breakthroughs */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-glow-silver/10 border border-glow-silver/30 text-glow-silver">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-glow-silver uppercase tracking-widest">Section 03 // Deep Dive</span>
              <h2 className="font-display text-2xl md:text-3xl text-white font-bold uppercase tracking-tight">
                Key Algorithmic Breakthroughs
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {cs.deepDive.map((item, idx) => (
              <div
                key={idx}
                className="bg-black/40 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col gap-4"
              >
                <h3 className="font-display text-xl text-white font-bold tracking-wide flex items-center gap-2">
                  <Zap className="w-4 h-4 text-glow-green" />
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-secondary leading-relaxed">
                  {item.description}
                </p>

                {item.codeSnippet && (
                  <div className="my-2">
                    {item.codeSnippetTitle && (
                      <div className="font-mono text-[11px] text-secondary/70 mb-1.5 flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-glow-green" />
                        {item.codeSnippetTitle}
                      </div>
                    )}
                    <pre className="bg-[#0A0A0A] p-4 md:p-5 rounded-xl border border-white/10 overflow-x-auto font-mono text-xs text-glow-silver shadow-inner relative">
                      <code>{item.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                  {item.keyTakeaways.map((takeaway, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2.5 font-sans text-xs md:text-sm text-secondary">
                      <span className="text-glow-green font-mono text-xs shrink-0">&gt;</span>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Technology Stack Grid */}
        <section className="flex flex-col gap-6 bg-surface/30 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-glow-green/10 border border-glow-green/30 text-glow-green">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-glow-green uppercase tracking-widest">Section 04 // Tech Stack</span>
              <h2 className="font-display text-2xl md:text-3xl text-white font-bold uppercase tracking-tight">
                Integrated Technology Stack
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cs.techStack.map((group, idx) => (
              <div
                key={idx}
                className="bg-black/40 border border-white/5 rounded-xl p-5 flex flex-col gap-3"
              >
                <span className="font-mono text-xs text-glow-green font-semibold uppercase tracking-wider">
                  {group.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-surface border border-white/10 text-glow-silver rounded text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Quantifiable Business Impact */}
        <section className="flex flex-col gap-6 bg-gradient-to-br from-black/60 via-black/40 to-glow-green/5 border border-glow-green/30 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_0_30px_rgba(57,255,20,0.05)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-glow-green/20 border border-glow-green/50 text-glow-green">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-glow-green uppercase tracking-widest">Section 05 // ROI Verification</span>
              <h2 className="font-display text-2xl md:text-3xl text-white font-bold uppercase tracking-tight">
                Business & Operational ROI
              </h2>
            </div>
          </div>

          <p className="font-sans text-sm md:text-base text-secondary leading-relaxed">
            {cs.impact.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {cs.impact.results.map((res, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-black/60 border border-glow-green/20 flex flex-col gap-2"
              >
                <span className="font-display text-lg text-glow-green font-bold">
                  {res.metric}
                </span>
                <p className="font-sans text-xs md:text-sm text-secondary leading-relaxed">
                  {res.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Footer Box */}
        <section className="bg-base border border-glow-green/40 rounded-2xl p-8 md:p-12 text-center flex flex-col items-center gap-6 relative overflow-hidden shadow-[0_0_40px_rgba(57,255,20,0.1)]">
          <div className="absolute inset-0 bg-radial from-glow-green/10 via-transparent to-transparent opacity-50 pointer-events-none" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-extrabold uppercase tracking-tight">
            Ready to Automate Your High-Volume Workflows?
          </h2>
          <p className="font-sans text-sm md:text-base text-secondary max-w-xl leading-relaxed">
            Whether you need multi-system CRM orchestration, intelligent AI extraction contracts, or custom proposal engines, let&apos;s build an unshakeable automated system for your agency.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/#contact"
              className="px-6 py-3 rounded-full bg-glow-green text-black font-mono text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(57,255,20,0.5)] flex items-center gap-2"
            >
              <span>[ INITIATE ARCHITECTURE AUDIT ]</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <DownloadCaseStudyPdfButton caseStudy={cs} />
            <Link
              href="/#case-studies"
              className="px-6 py-3 rounded-full border border-white/20 bg-black/40 text-secondary hover:text-white hover:border-white font-mono text-xs md:text-sm tracking-widest uppercase transition-all"
            >
              &lt; Back to Overview
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
