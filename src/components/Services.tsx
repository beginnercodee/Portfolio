import { ScrollFade } from "./animations/ScrollFade";

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
    <section id="services" className="px-6 md:px-12 py-16 md:py-24 max-w-[1440px] mx-auto z-30 relative">
      <h2 className="font-display text-3xl md:text-4xl text-primary mb-12 md:mb-16 opacity-80 uppercase tracking-widest text-center md:text-left hover:text-glow-green hover:opacity-100 transition-all duration-500 cursor-pointer">
        SERVICES / CAPABILITIES
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
        {services.map((service, idx) => (
          <ScrollFade
            key={service.id}
            y={30}
            delay={idx * 0.1}
            duration={0.5}
            className="group p-6 md:p-8 border border-surface bg-[#0D0D0D] rounded-2xl hover:border-glow-green hover:shadow-[0_0_20px_rgba(57,255,20,0.1)] transition-all duration-500 cursor-default relative overflow-hidden"
          >
            <div className="font-mono text-glow-green text-xs md:text-sm mb-4 md:mb-6 relative z-10">{service.id} //</div>
            <h3 className="font-display text-xl md:text-2xl text-primary font-bold mb-3 md:mb-4 relative z-10 group-hover:text-glow-green transition-colors duration-300">{service.title}</h3>
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
          </ScrollFade>
        ))}
      </div>
    </section>
  );
}
