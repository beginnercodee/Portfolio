"use client";

import { useEffect, useState } from "react";

/**
 * Renders the System Status Footer showing real-time client indicators: a clock, 
 * simulated hardware resource gauges (CPU/RAM/Latency), live Git build info via GitHub API,
 * and user IP-based city geolocation tracing.
 */
export default function SystemStatusFooter() {
  const [time, setTime] = useState("--:--");
  const [cpu, setCpu] = useState("--");
  const [latency, setLatency] = useState(12);
  const [ram, setRam] = useState(1.26);
  const [mounted, setMounted] = useState(false);
  const [buildInfo, setBuildInfo] = useState<{ hash: string; timeAgo: string; url: string } | null>(null);
  const [location, setLocation] = useState("TRACING...");

  useEffect(() => {
    const handle = setTimeout(() => {
      setMounted(true);
      setCpu(Math.floor(Math.random() * 10 + 5).toString());
    }, 0);
    
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
    /**
     * Queries the GitHub Commits API for the latest commit SHA hash and relative deployment age.
     */
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
            timeAgo,
            url: data.html_url
          });
        }
      } catch {
        // Silent fail on rate limit, fallback to default UI
        console.error("Failed to fetch live build data");
      }
    };

    // fetchBuildData will be called in deferred timeout below

    // Helper to derive a clean cyber region/node code from client timezone
    const getClientTimezoneFallback = () => {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz) {
          // e.g. "Asia/Karachi" -> "KARACHI (PKT)" or clean city name
          const parts = tz.split("/");
          const city = parts[parts.length - 1].replace(/_/g, " ").toUpperCase();
          
          // Compute GMT offset string e.g. "GMT+5" or "GMT-4"
          const offsetMinutes = -new Date().getTimezoneOffset();
          const sign = offsetMinutes >= 0 ? "+" : "-";
          const hours = Math.floor(Math.abs(offsetMinutes) / 60);
          const mins = Math.abs(offsetMinutes) % 60;
          const offsetStr = mins > 0 ? `GMT${sign}${hours}:${mins.toString().padStart(2, "0")}` : `GMT${sign}${hours}`;

          return `${city} [${offsetStr}]`;
        }
      } catch {
        // Fallback below
      }
      return "NODE_SECURE";
    };

    // Fetch User IP Geolocation (Easter Egg with ad-blocker fallback)
    const fetchLocation = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.city && data.country_code) {
            setLocation(`${data.city.toUpperCase()}, ${data.country_code}`);
            return;
          }
        }
        setLocation(getClientTimezoneFallback());
      } catch {
        // Ad-blockers (uBlock Origin, Brave Shields) frequently block ipapi.co
        // Gracefully resolve to the browser's native timezone node
        setLocation(getClientTimezoneFallback());
      }
    };
    
    // Defer non-critical network requests to avoid blocking main thread at startup
    const apiFetchTimeout = setTimeout(() => {
      fetchBuildData();
      fetchLocation();
    }, 3000);

    // Easter Egg: Tab Visibility Tracker
    let previousTitle = typeof document !== "undefined" ? document.title : "";
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (document.title && document.title !== "System Waiting...") {
          previousTitle = document.title;
        }
        document.title = "System Waiting...";
      } else {
        document.title = previousTitle && previousTitle !== "System Waiting..."
          ? previousTitle
          : "Jamal Nadeem | Full-Stack & AI Automation Engineer";
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Easter Egg: Developer Console Message
    console.info(
      "%c[ SYSTEM ONLINE ]\n%cLooking under the hood? I specialize in building heavy, autonomous architectures and scalable AI integrations. Let's build something massive together.", 
      "color: #39ff14; font-size: 20px; font-weight: bold; background: #0a0a0a; padding: 10px; border-radius: 5px;", 
      "color: #C0C0C0; font-size: 14px; padding-top: 10px; display: block;"
    );

    return () => {
      clearTimeout(handle);
      clearTimeout(apiFetchTimeout);
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <footer className="w-full border-t border-surface bg-[#0D0D0D]/80 backdrop-blur-md py-1.5 px-6 flex justify-between items-center z-50 fixed bottom-0 whitespace-nowrap">
      <div className="flex items-center gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase whitespace-nowrap">
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-glow-green shadow-[0_0_8px_rgba(57,255,20,0.8)] animate-pulse shrink-0" />
          SYSTEM: ONLINE
        </span>
        <span className="hidden lg:inline-flex items-center gap-2 border-l border-white/10 pl-4 whitespace-nowrap">
          NODE: {mounted ? location : "---"}
        </span>
        {mounted && buildInfo && (
          <a 
            href={buildInfo.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 opacity-70 hover:opacity-100 hover:text-white transition-opacity border-l border-white/10 pl-4 whitespace-nowrap"
            title="View Live Deployment Commit"
          >
            BUILD_{buildInfo.hash} <span className="text-glow-green/80 whitespace-nowrap">{"// DEPLOYED "}{buildInfo.timeAgo}</span>
          </a>
        )}
      </div>
      
      <div className="flex items-center gap-4 font-mono text-[10px] text-secondary tracking-widest uppercase justify-end whitespace-nowrap">
        <span className="hidden md:inline-block whitespace-nowrap">SYNCED: {mounted ? time : "--:--"} UTC</span>
        <span className="hidden sm:inline-block border-l border-white/10 pl-4 whitespace-nowrap">LATENCY: {mounted ? latency : "--"}MS</span>
        <span className={`hidden sm:inline-block border-l border-white/10 pl-4 transition-colors duration-300 whitespace-nowrap ${mounted && parseInt(cpu) >= 50 ? 'text-red-400' : 'text-glow-green'}`}>CPU: {mounted ? cpu : "--"}%</span>
        <span className="hidden lg:inline-block border-l border-white/10 pl-4 text-glow-silver whitespace-nowrap">RAM: {mounted ? ram.toFixed(2) : "-.--"}GB ALLOCATED</span>
      </div>
    </footer>
  );
}
