"use client";

import { useEffect, useState } from "react";

export default function SystemStatusFooter() {
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(12);
  const [cpu, setCpu] = useState(4);
  const [ram, setRam] = useState(1.2);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    
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
    const timeInterval = setInterval(updateTime, 1000);
    
    // Dynamic system metrics mock
    const metricsInterval = setInterval(() => {
      setLatency(prev => {
        const diff = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(8, Math.min(25, prev + diff));
      }); 
      setCpu(prev => {
        const diff = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(1, Math.min(15, prev + diff));
      });
      setRam(prev => {
        const diff = (Math.random() * 0.1 - 0.05); // -0.05 to +0.05
        return Math.max(1.0, Math.min(1.8, prev + diff));
      });
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  if (!mounted) {
    return (
      <footer className="w-full border-t border-surface bg-[#0D0D0D] py-2 px-6 flex justify-between items-center z-50 fixed bottom-0">
        <div className="flex-1 flex gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase items-center">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-glow-green shadow-[0_0_8px_rgba(57,255,20,0.8)] animate-pulse" />
            SYSTEM: ONLINE
          </span>
        </div>
        
        <div className="flex-1 flex gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase justify-center">
          <span>SYNCED: --:-- UTC</span>
        </div>
        
        <div className="flex-1 hidden md:flex gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase justify-end">
          <span>LATENCY: --MS | CPU: --% | RAM: --GB ALLOCATED</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full border-t border-surface bg-[#0D0D0D] py-2 px-6 flex justify-between items-center z-50 fixed bottom-0">
      <div className="flex-1 flex gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase items-center">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-glow-green shadow-[0_0_8px_rgba(57,255,20,0.8)] animate-pulse" />
          SYSTEM: ONLINE
        </span>
      </div>
      
      <div className="flex-1 flex gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase justify-center">
        <span>SYNCED: {time}</span>
      </div>
      
      <div className="flex-1 hidden md:flex gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase justify-end">
        <span>LATENCY: {latency}MS | CPU: {cpu}% | RAM: {ram.toFixed(2)}GB ALLOCATED</span>
      </div>
    </footer>
  );
}
