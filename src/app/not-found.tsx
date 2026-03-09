"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const errorLogs = [
      "> VERIFYING_SECTOR_INTEGRITY...",
      "> SECTOR_NOT_FOUND",
      "> WARNING: UNAUTHORIZED_ACCESS_ATTEMPT",
      "> The requested neuro-link path does not exist.",
      "> Initiating fallback protocol...",
      "> Redirecting to safe harbor in 0x05 seconds..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, errorLogs[i]]);
      i++;
      if (i === errorLogs.length) clearInterval(interval);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full bg-[#0D0D0D] flex items-center justify-center p-4 relative z-50 overflow-hidden font-mono">
      {/* Background Matrix-style noise / static simulated by CSS pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #39ff14 2px, #39ff14 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="max-w-3xl w-full border border-glow-green/50 rounded bg-[#1A1A1A] p-8 shadow-[0_0_40px_rgba(57,255,20,0.15)] relative z-10">
        
        {/* Header with Glitch styling */}
        <h1 className="font-display text-5xl md:text-7xl text-glow-green font-bold mb-8 relative inline-block">
          <span className="absolute top-0 left-1 -ml-1 text-red-500 opacity-70 mix-blend-screen animate-pulse">
            [FATAL EXCEPTION: 0x404]
          </span>
          <span className="relative z-10">
            [FATAL EXCEPTION: 0x404]
          </span>
        </h1>

        <div className="flex flex-col gap-2 font-mono text-glow-green text-sm md:text-base min-h-[200px]">
          {logs.map((log, index) => (
            <div key={index} className="animate-fade-in">{log}</div>
          ))}
          <div className="mt-4 animate-pulse">_</div>
        </div>

        <div className="mt-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 border border-glow-green/50 px-6 py-3 text-glow-green hover:bg-glow-green hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm font-bold"
          >
            &gt; Execute [ RETURN_TO_HOME ] command
          </Link>
        </div>
      </div>
    </div>
  );
}
