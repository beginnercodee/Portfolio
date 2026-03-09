"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LiveGitHubActivity() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulated live feed events
    const events = [
      () => `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] branch feature/agentic-ai created -> outreach-engine`,
      () => `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] resolved issue #42 in custom-quote-bot`,
      () => `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] deployed production build -> status: success`,
      () => `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] push to origin/main -> portfolio-v2`,
      () => `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] running GitHub Actions CI/CD pipeline... pass`,
    ];

    setLogs([events[0]()]);

    const intervalId = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, events[Math.floor(Math.random() * events.length)]()];
        if (next.length > 5) next.shift(); // Keep only last 5
        return next;
      });
    }, 4500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="px-12 py-16 max-w-[1000px] mx-auto z-30 relative">
      <div className="relative border border-white/10 bg-black/60 backdrop-blur-md p-6 rounded-xl hover:border-glow-green/30 transition-all shadow-inner group flex flex-col items-start w-full overflow-hidden">
        {/* Terminal Header */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          <span className="ml-4 font-mono text-[10px] text-secondary opacity-50">root@jn-labs:~</span>
        </div>

        <h3 className="font-mono text-xs text-secondary mt-6 mb-4 uppercase tracking-widest pb-2 w-full text-left flex justify-between items-center">
          <span>LIVE_FEED // GITHUB.ACTIVITY</span>
          <span className="w-2 h-2 rounded-full bg-glow-green animate-pulse" />
        </h3>
        
        <div className="font-mono text-[11px] md:text-xs text-glow-green flex flex-col gap-2 h-[120px] overflow-hidden w-full relative">
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-glow-green/5 to-transparent h-[10px] w-full animate-[scan_2s_linear_infinite] pointer-events-none" />
          
          {logs.map((log, i) => (
            <motion.div
              key={i + log}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i === logs.length - 1 ? 1 : 0.6, x: 0 }}
              className="whitespace-nowrap overflow-hidden text-ellipsis flex items-center"
            >
              <span className="mr-2 text-glow-silver">&gt;</span>{log}
            </motion.div>
          ))}
          <motion.div 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 1 }} 
            className="mt-1"
          >
            █
          </motion.div>
        </div>
      </div>
    </section>
  );
}
