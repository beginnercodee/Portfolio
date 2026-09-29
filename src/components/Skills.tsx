"use client";

import { useState } from "react";
import { ScrollFade } from "./animations/ScrollFade";
import { ScrollScale } from "./animations/ScrollScale";
import { motion, AnimatePresence } from "framer-motion";

const skills = {
  "Frontend Architecture": ["TypeScript", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
  "Backend & Databases": ["Node.js", "Python", "NestJS", "PostgreSQL (NeonDB)", "Supabase", "MongoDB", "MySQL", "Docker"],
  "AI & Automation": ["n8n", "GoHighLevel (GHL)", "Voice Agents", "OpenAI / OpenRouter", "Google Gemini", "Nvidia Models", "Judge0 CE", "Selenium"],
};

interface RadarNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  score: number;
  level: string;
  stack: string;
}

const radarNodes: RadarNode[] = [
  {
    id: "frontend",
    name: "Frontend Frameworks",
    category: "Architecture & UI",
    x: 200,
    y: 70,
    score: 94,
    level: "PRODUCTION GRADE",
    stack: "Next.js • React • TypeScript • Tailwind",
  },
  {
    id: "automation",
    name: "Data & Automation",
    category: "ETL & Autonomous Pipelines",
    x: 330,
    y: 200,
    score: 96,
    level: "ARCHITECT LEVEL",
    stack: "n8n • GoHighLevel • BullMQ • Python",
  },
  {
    id: "backend",
    name: "Backend Architecture",
    category: "Microservices & Distributed DB",
    x: 200,
    y: 320,
    score: 92,
    level: "SCALED SYSTEMS",
    stack: "Node.js • NestJS • PostgreSQL • Docker",
  },
  {
    id: "ai",
    name: "LLMs & Agents",
    category: "Autonomous Systems & Voice",
    x: 65,
    y: 200,
    score: 98,
    level: "CORE SPECIALIZATION",
    stack: "Gemini • OpenAI • Voice Agents • Nvidia",
  },
];

/**
 * Renders the Skills section containing categorized lists of technical proficiencies
 * (Frontend, Backend, AI/Automation) and an interactive SVG radar telemetry chart
 * with clickable/hoverable nodes, score readouts, and animated HUD displays.
 */
export default function Skills() {
  const [activeNode, setActiveNode] = useState<RadarNode | null>(null);

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
        className="relative w-full aspect-square flex items-center justify-center p-4 md:p-8 bg-[#0D0D0D] border border-surface rounded-3xl group overflow-hidden mt-8 md:mt-0 shadow-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* SVG Radar Chart Abstract Representation */}
        <svg viewBox="0 0 400 400" className="w-full h-full text-surface z-10 select-none">
          <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <circle cx="200" cy="200" r="50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          
          <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          
          {/* Data Polygon */}
          <polygon
            points="200,70 330,200 200,320 65,200"
            fill="rgba(57, 255, 20, 0.18)"
            stroke="#39ff14"
            strokeWidth="2.5"
            className="filter drop-shadow-[0_0_12px_rgba(57,255,20,0.8)] transition-all duration-300"
          />

          {/* Interactive Radar Vertex Nodes */}
          {radarNodes.map((node) => {
            const isHovered = activeNode?.id === node.id;
            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setActiveNode(node)}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => setActiveNode(activeNode?.id === node.id ? null : node)}
              >
                {/* Invisible hit target for smooth mobile & mouse interaction */}
                <circle cx={node.x} cy={node.y} r="22" fill="transparent" />

                {/* Animated Ping Ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? "16" : "11"}
                  fill="none"
                  stroke="#39ff14"
                  strokeWidth="1.5"
                  className={isHovered ? "opacity-90 animate-ping" : "opacity-35"}
                />

                {/* Outer Glow Halo */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? "8" : "5.5"}
                  fill="#39ff14"
                  className="filter drop-shadow-[0_0_8px_rgba(57,255,20,0.9)] transition-all duration-300"
                />

                {/* Inner Bright Center Core */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? "3.5" : "2"}
                  fill="#ffffff"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* Labels with Dynamic Active State Highlight */}
        <div 
          onClick={() => setActiveNode(activeNode?.id === "frontend" ? null : radarNodes[0])}
          className={`absolute top-2 md:top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-center cursor-pointer transition-colors duration-300 ${activeNode?.id === "frontend" ? "text-white font-bold drop-shadow-[0_0_8px_#39ff14]" : "text-glow-green hover:text-white"}`}
        >
          Frontend<br/>Frameworks
        </div>
        <div 
          onClick={() => setActiveNode(activeNode?.id === "backend" ? null : radarNodes[2])}
          className={`absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-center cursor-pointer transition-colors duration-300 ${activeNode?.id === "backend" ? "text-white font-bold drop-shadow-[0_0_8px_#39ff14]" : "text-glow-green hover:text-white"}`}
        >
          Backend<br/>Architecture
        </div>
        <div 
          onClick={() => setActiveNode(activeNode?.id === "ai" ? null : radarNodes[3])}
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-center rotate-[-90deg] origin-center cursor-pointer transition-colors duration-300 ${activeNode?.id === "ai" ? "text-white font-bold drop-shadow-[0_0_8px_#39ff14]" : "text-glow-green hover:text-white"}`}
        >
          LLMs &<br/>Agents
        </div>
        <div 
          onClick={() => setActiveNode(activeNode?.id === "automation" ? null : radarNodes[1])}
          className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-center rotate-[90deg] origin-center cursor-pointer transition-colors duration-300 ${activeNode?.id === "automation" ? "text-white font-bold drop-shadow-[0_0_8px_#39ff14]" : "text-glow-green hover:text-white"}`}
        >
          Data &<br/>Automation
        </div>

        {/* Bottom Interactive HUD Telemetry Readout */}
        <div className="absolute bottom-3 left-4 right-4 md:bottom-4 md:left-6 md:right-6 z-20">
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="bg-black/90 backdrop-blur-md border border-glow-green/50 p-3 rounded-xl flex items-center justify-between font-mono shadow-[0_0_25px_rgba(57,255,20,0.25)]"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-glow-green animate-pulse" />
                    <span className="text-white font-bold text-xs uppercase tracking-wider">{activeNode.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-glow-green/10 text-glow-green border border-glow-green/30 font-semibold">{activeNode.level}</span>
                  </div>
                  <span className="text-[10px] text-secondary tracking-tight">{activeNode.stack}</span>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-2">
                  <span className="text-xl md:text-2xl font-bold font-display text-glow-green drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]">
                    {activeNode.score}%
                  </span>
                  <span className="text-[8px] text-secondary/70 uppercase tracking-widest">PROFICIENCY</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-black/60 backdrop-blur-sm border border-white/10 p-2.5 md:p-3 rounded-xl flex items-center justify-between font-mono text-[10px] md:text-xs text-secondary/70 shadow-inner"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-glow-green/60" />
                  RADAR_TELEMETRY // HOVER NODE TO INSPECT
                </span>
                <span className="text-[9px] text-glow-silver tracking-wider">4 NODES ACTIVE</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollScale>
    </section>
  );
}
