"use client";

import { useEffect, useState } from "react";

export default function SystemStatusFooter() {
  const [time, setTime] = useState("--:--");
  const [cpu, setCpu] = useState("--");
  const [latency, setLatency] = useState(12);
  const [ram, setRam] = useState(1.26);
  const [mounted, setMounted] = useState(false);
  const [buildInfo, setBuildInfo] = useState<{ hash: string; timeAgo: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Clock
    const updateTime = () => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    // CPU Simulator (5% to 15%, with 5% chance of severe load spikes)
    setCpu(Math.floor(Math.random() * 10 + 5).toString());
    const metricsInterval = setInterval(() => {
      const isSpike = Math.random() < 0.05;
      const newCpu = isSpike ? Math.floor(Math.random() * 40 + 50) : Math.floor(Math.random() * 10 + 5);
      setCpu(newCpu.toString());

      setLatency(prev => {
        const diff = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(8, Math.min(25, prev + diff));
      }); 
      setRam(prev => {
        const diff = (Math.random() * 0.1 - 0.05); // -0.05 to +0.05
        return Math.max(1.0, Math.min(1.8, prev + diff));
      });
    }, 3000);

    // Fetch Last Deployment Commit from GitHub (Vercel builds on push to main)
    const fetchBuildData = async () => {
      try {
        const res = await fetch("https://api.github.com/repos/beginnercodee/Portfolio/commits/main");
        if (res.ok) {
          const data = await res.json();
          const commitDate = new Date(data.commit.author.date);
          const now = new Date();
          const diffMs = now.getTime() - commitDate.getTime();
          const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
          const diffDays = Math.floor(diffHrs / 24);
          
          let timeAgo = "JUST NOW";
          if (diffDays > 0) timeAgo = `${diffDays}D AGO`;
          else if (diffHrs > 0) timeAgo = `${diffHrs}H AGO`;
          else timeAgo = `<1H AGO`;

          setBuildInfo({
            hash: data.sha.substring(0, 7).toUpperCase(),
            timeAgo
          });
        }
      } catch (err) {
        // Silent fail on rate limit, fallback to default UI
        console.error("Failed to fetch live build data");
      }
    };

    fetchBuildData();

    // Easter Egg: Tab Visibility Tracker
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "System Waiting...";
      } else {
        document.title = "Jamal Nadeem | Automation Engineer";
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <footer className="w-full border-t border-surface bg-[#0D0D0D] py-2 px-6 flex justify-between items-center z-50 fixed bottom-0">
      <div className="flex-1 flex gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase items-center">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-glow-green shadow-[0_0_8px_rgba(57,255,20,0.8)] animate-pulse" />
          SYSTEM: ONLINE
        </span>
        {mounted && buildInfo && (
          <span className="hidden sm:inline-flex items-center gap-2 opacity-70 border-l border-white/10 pl-4">
            BUILD_{buildInfo.hash} <span className="text-glow-green/80">// DEPLOYED {buildInfo.timeAgo}</span>
          </span>
        )}
      </div>
      
      <div className="flex-2 flex gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase justify-end items-center">
        <span className="hidden md:inline-block">SYNCED: {mounted ? time : "--:--"} UTC</span>
        <span className="hidden sm:inline-block border-l border-white/10 pl-4">LATENCY: {mounted ? latency : "--"}MS</span>
        <span className={`hidden sm:inline-block border-l border-white/10 pl-4 transition-colors duration-300 ${mounted && parseInt(cpu) >= 50 ? 'text-red-400' : 'text-glow-green'}`}>CPU: {mounted ? cpu : "--"}%</span>
        <span className="hidden lg:inline-block border-l border-white/10 pl-4 text-glow-silver">RAM: {mounted ? ram.toFixed(2) : "-.--"}GB ALLOCATED</span>
      </div>
    </footer>
  );
}
