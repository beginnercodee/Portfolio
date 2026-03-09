"use client";

import { useEffect, useState } from "react";

export default function SystemStatusFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(
        `${date.getUTCHours().toString().padStart(2, "0")}:${date
          .getUTCMinutes()
          .toString()
          .padStart(2, "0")} UTC`
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full border-t border-surface bg-[#0D0D0D] py-2 px-6 flex justify-between items-center z-50 fixed bottom-0">
      <div className="flex gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase items-center">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-glow-green shadow-[0_0_8px_rgba(57,255,20,0.8)] animate-pulse" />
          SYSTEM: ONLINE
        </span>
      </div>
      
      <div className="hidden md:flex gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase">
        <span>LATENCY: 12ms | CPU: 4% | RAM: 1.2GB ALLOCATED</span>
      </div>
      
      <div className="flex gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase">
        <span>SYNCED: {time}</span>
      </div>
    </footer>
  );
}
