"use client";

import { useEffect, useState } from "react";

export default function ASCIIProgress({ status, isActive }: { status: string, isActive: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    // Simulate active processing chunks fluctuating
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Randomly jump around between 12% and 98% to simulate active processing nodes
        return Math.floor(Math.random() * 86) + 12;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isActive]);

  // Generate ASCII bracket based on progress percentage
  const getBrackets = () => {
    if (!isActive) return "[----------] 0%";
    const filled = Math.floor(progress / 10);
    const empty = 10 - filled;
    return `[${"|".repeat(filled)}${"-".repeat(empty)}] ${progress}%`;
  };

  return (
    <div className={`flex items-center justify-between w-full font-mono text-[10px] md:text-xs tracking-widest ${isActive ? "text-glow-green" : "text-secondary/50"}`}>
      <span className="flex items-center gap-2">
        <span className={isActive ? "animate-pulse" : ""}>{status}</span>
      </span>
      {isActive && (
        <span className="opacity-80 transition-all duration-300">
          {getBrackets()}
        </span>
      )}
    </div>
  );
}
