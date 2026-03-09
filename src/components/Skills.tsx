"use client";

import { motion } from "framer-motion";

const skills = {
  Frontend: ["React.js", "Next.js", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
  Backend: ["Node.js", "Python", "Flask", "Supabase", "MongoDB Atlas"],
  AI: ["n8n", "GoHighLevel", "Selenium", "Google Gemini", "Hugging Face APIs"],
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-12 max-w-[1440px] mx-auto z-30 grid lg:grid-cols-2 gap-16 items-center">
      {/* Left Column - Skills List */}
      <div className="flex flex-col gap-12">
        <h2 className="font-display text-4xl text-primary opacity-80 uppercase tracking-widest text-center lg:text-left">
          TECHNICAL ARSENAL /
        </h2>

        {Object.entries(skills).map(([category, items], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <h3 className="font-sans font-bold text-sm text-secondary mb-4 uppercase tracking-widest">
              {category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="inline-block px-6 py-3 border border-surface rounded-full text-primary font-sans text-[13px] hover:bg-glow-green hover:text-black hover:border-glow-green transition-all duration-300 cursor-default shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right Column - Technical Radar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative w-full aspect-square flex items-center justify-center p-8 bg-[#0D0D0D] border border-surface rounded-3xl group overflow-hidden"
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
        <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-glow-green uppercase tracking-widest text-center">
          Frontend<br/>Frameworks
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-glow-green uppercase tracking-widest text-center">
          Backend<br/>Architecture
        </div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-glow-green uppercase tracking-widest text-center rotate-[-90deg] origin-center">
          LLMs &<br/>Agents
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-glow-green uppercase tracking-widest text-center rotate-[90deg] origin-center">
          Data &<br/>Automation
        </div>
      </motion.div>
    </section>
  );
}
