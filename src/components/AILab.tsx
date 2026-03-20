import { ScrollScale } from "./animations/ScrollScale";

const experiments = [
  {
    status: "● ACTIVE",
    title: "Autonomous Content Agent",
    desc: "Testing multi-agent communication protocols using Hugging Face Spaces to generate, edit, and publish dual-language blog posts without human intervention.",
  },
  {
    status: "○ ARCHIVED",
    title: "Headless UI Automation Suite",
    desc: "Python and Selenium test scripts designed to navigate complex user journeys, including automated authentication and media interaction. Utilizes Smart Waits to reliably handle dynamic DOM elements and bypass interaction exceptions.",
  },
  {
    status: "● IN_PROGRESS...",
    title: "Resume Evaluation Algorithm",
    desc: "Currently architecting the core parsing and matching logic for an AI Resume Tailor. Experimenting with real-time data syncing via Supabase to dynamically score candidate profiles against strict job parameters.",
  },
];


export default function AILab() {
  return (
    <section className="max-w-[1440px] mx-auto py-16 md:py-24 px-6 md:px-12 z-30 relative">
      <h2 className="font-display text-3xl md:text-4xl text-primary mb-8 md:mb-12 opacity-80 uppercase tracking-widest text-center md:text-left hover:text-glow-green hover:opacity-100 transition-all duration-500 cursor-pointer">
        AI LAB / EXPERIMENTS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {experiments.map((exp, idx) => (
          <ScrollScale
            key={idx}
            duration={0.4}
            delay={idx * 0.1}
            className="group bg-transparent border border-dashed border-surface p-6 md:p-8 hover:border-solid hover:border-glow-green transition-all duration-300 relative overflow-hidden rounded-xl"
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
          </ScrollScale>
        ))}
      </div>
    </section>
  );
}
