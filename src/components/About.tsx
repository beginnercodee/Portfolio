"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const terminalLines = [
  "> identifying_manual_bottleneck...",
  "> compiling_agentic_workflow...",
  "> deploying_automation_script...",
  "> status: [SYSTEMS OPTIMIZED]"
];

export default function About() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const currentLine = terminalLines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (newLines[currentLineIndex] === undefined) {
            newLines[currentLineIndex] = "";
          }
          newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, Math.random() * 40 + 20); // typing speed
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 600); // pause between lines
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <section id="about" className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 relative z-30">
      <div className="relative border border-white/10 p-6 md:p-10 bg-white/5 backdrop-blur-sm rounded-xl shadow-inner overflow-hidden flex flex-col justify-between min-h-[350px] md:min-h-[450px]">
        <div className="absolute inset-0 bg-glow-green/10 blur-3xl opacity-20 pointer-events-none" />
        
        {/* Terminal Execution Overlay */}
        <div className="relative z-30 font-mono text-xs md:text-base leading-relaxed md:leading-loose flex-grow">
          {/* Mac window dots */}
          <div className="flex items-center gap-2 mb-4 md:mb-6 opacity-40">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
          </div>
          
          {/* Fixed height container to completely eliminate layout shifts during typing animation */}
          <div className="h-[140px] md:h-[180px] w-full">
            {displayedLines.map((line, i) => (
              <div key={i} className={i === terminalLines.length - 1 && line === terminalLines[i] ? "text-glow-green font-bold drop-shadow-[0_0_8px_rgba(57,255,20,0.8)] mt-2" : "text-gray-300 font-medium"}>
                {line}
                {i === currentLineIndex && (
                  <span className="inline-block w-1.5 h-3 md:w-2 md:h-4 bg-white animate-pulse ml-1 align-middle" />
                )}
              </div>
            ))}
            {/* Blinking cursor when finished typing */}
            {currentLineIndex >= terminalLines.length && (
              <div className="mt-2"><span className="inline-block w-1.5 h-3 md:w-2 md:h-4 bg-glow-green animate-pulse align-middle" /></div>
            )}
          </div>
        </div>

        {/* Huge Watermark Text */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-glow-green uppercase font-bold opacity-15 tracking-tighter text-right leading-none mt-8 md:mt-12 w-full pointer-events-none">
          THE /<br />MINDSET
        </h2>
      </div>
      
      <div className="flex flex-col justify-center font-sans text-body-sm text-secondary space-y-6 leading-relaxed">
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Currently completing my B.Sc in Computer Science at Sir Syed University of Engineering & Technology (Class of '26). <span className="text-primary font-medium">I don't just write code; I architect solutions.</span>
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          My core philosophy is simple: <span className="text-primary font-medium">if a task can be predicted, it can be automated.</span> I bridge the gap between clean, high-performance web development and agentic AI systems—reducing friction and multiplying efficiency.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Whether it's a sleek Next.js frontend or a complex background workflow powered by Python and GoHighLevel, I deliver digital infrastructure that works flawlessly.
        </motion.p>
      </div>
    </section>
  );
}
