import { ScrollFade } from "./animations/ScrollFade";
import { ScrollScale } from "./animations/ScrollScale";

const skills = {
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
  Backend: ["Node.js", "Python", "Flask", "Supabase", "MongoDB Atlas"],
  AI: ["n8n", "GoHighLevel", "Selenium", "Google Gemini", "Hugging Face APIs"],
};

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-6 md:px-12 max-w-[1440px] mx-auto z-30 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
      {/* Left Column - Skills List */}
      <div className="flex flex-col gap-10 md:gap-12">
        <h2 className="font-display text-3xl md:text-4xl text-primary opacity-80 uppercase tracking-widest text-center lg:text-left hover:text-glow-green hover:opacity-100 transition-all duration-500 cursor-pointer">
          TECHNICAL ARSENAL /
        </h2>

        {Object.entries(skills).map(([category, items], idx) => (
          <ScrollFade
            key={category}
            x={-20}
            duration={0.5}
            delay={idx * 0.1}
          >
            <h3 className="font-sans font-bold text-xs md:text-sm text-secondary mb-3 md:mb-4 uppercase tracking-widest">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-4 py-2 md:px-6 md:py-3 border border-surface rounded-full text-primary font-sans text-[11px] md:text-[13px] hover:bg-glow-green hover:text-black hover:border-glow-green transition-all duration-300 cursor-default shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ScrollFade>
        ))}
      </div>

      {/* Right Column - Technical Radar Chart */}
      <ScrollScale
        duration={0.7}
        className="relative w-full aspect-square flex items-center justify-center p-4 md:p-8 bg-[#0D0D0D] border border-surface rounded-3xl group overflow-hidden mt-8 md:mt-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* SVG Radar Chart Abstract Representation */}
        <svg viewBox="0 0 400 400" className="w-full h-full text-surface z-10">
          <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          
          <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="1" />
          <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="1" />
          
          {/* Data Polygon */}
          <polygon
            points="200,70 320,200 200,310 110,200"
            fill="rgba(57, 255, 20, 0.2)"
            stroke="#39ff14"
            strokeWidth="3"
            className="filter drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
          />
        </svg>

        {/* Labels */}
        <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] md:text-[10px] text-glow-green uppercase tracking-widest text-center">
          Frontend<br/>Frameworks
        </div>
        <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] md:text-[10px] text-glow-green uppercase tracking-widest text-center">
          Backend<br/>Architecture
        </div>
        <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 font-mono text-[8px] md:text-[10px] text-glow-green uppercase tracking-widest text-center rotate-[-90deg] origin-center">
          LLMs &<br/>Agents
        </div>
        <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 font-mono text-[8px] md:text-[10px] text-glow-green uppercase tracking-widest text-center rotate-[90deg] origin-center">
          Data &<br/>Automation
        </div>
      </ScrollScale>
    </section>
  );
}
