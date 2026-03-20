import { ScrollFade } from "./animations/ScrollFade";

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
    <section className="max-w-[1440px] mx-auto py-12 md:py-20 px-6 md:px-12 z-30 relative">
      <h2 className="font-display text-3xl md:text-4xl text-primary mb-10 md:mb-12 opacity-80 uppercase tracking-widest text-center md:text-left hover:text-glow-green hover:opacity-100 transition-all duration-500 cursor-pointer">
        CASE STUDIES / ROI ARCHITECTURE
      </h2>

      <div className="flex flex-col gap-8 md:gap-12">
        {caseStudies.map((cs, idx) => (
          <ScrollFade
            key={idx}
            y={20}
            duration={0.6}
            delay={idx * 0.2}
            className="bg-surface border border-glow-green/30 rounded-xl p-8 md:p-12 transition-all hover:border-glow-green hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center"
          >
            <div className="flex-1 w-full">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-3 md:mb-4">{cs.title}</h3>
              <p className="font-sans text-xs md:text-body-sm text-secondary leading-relaxed max-w-lg">
                {cs.synopsis}
              </p>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-start md:justify-end border-t border-white/10 pt-4 md:border-none md:pt-0">
              <div className="font-display text-[19px] md:text-[28.5px] text-glow-green font-extrabold text-left md:text-right drop-shadow-[0_0_15px_rgba(57,255,20,0.5)]">
                {cs.metric}
              </div>
            </div>
          </ScrollFade>
        ))}
      </div>
    </section>
  );
}
