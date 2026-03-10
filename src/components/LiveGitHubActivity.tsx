"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LiveGitHubActivity() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let active = true;

    async function fetchGitHubActivity() {
      try {
        const response = await fetch("https://api.github.com/users/beginnercodee/events/public?per_page=10");
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        
        if (!active) return;

        const formattedEvents: string[] = [];

        for (const event of data) {
          if (formattedEvents.length >= 5) break;

          const date = new Date(event.created_at);
          const timeString = `[${date.toLocaleTimeString('en-US', { hour12: false })}]`;
          const repoName = event.repo.name.replace("beginnercodee/", "");

          switch (event.type) {
            case "PushEvent":
              formattedEvents.push(`${timeString} pushed to ${repoName}`);
              break;
            case "CreateEvent":
              formattedEvents.push(`${timeString} created ${event.payload.ref_type || 'repo'} ${repoName}`);
              break;
            case "WatchEvent":
              formattedEvents.push(`${timeString} starred ${repoName}`);
              break;
            case "IssuesEvent":
              formattedEvents.push(`${timeString} ${event.payload.action} issue in ${repoName}`);
              break;
            case "PullRequestEvent":
              formattedEvents.push(`${timeString} ${event.payload.action} PR in ${repoName}`);
              break;
            default:
              // Skip events we don't explicitly format to keep the terminal clean
              continue;
          }
        }

        // Fallback if no recent supported events
        if (formattedEvents.length === 0) {
          formattedEvents.push(`[${new Date().toLocaleTimeString('en-US', { hour12: false })}] System initialized. Waiting for activity...`);
        }

        // Sequentially push events to simulate live booting
        setLogs([formattedEvents[0]]);
        let currentIndex = 1;

        const intervalId = setInterval(() => {
          if (!active) {
            clearInterval(intervalId);
            return;
          }
          if (currentIndex < formattedEvents.length) {
            // Needed to capture current index in closure properly
            const eventToPush = formattedEvents[currentIndex];
            setLogs((prev) => {
              const next = [...prev, eventToPush];
              if (next.length > 5) next.shift(); // Keep only last 5 lines on screen
              return next;
            });
            currentIndex++;
          } else {
            clearInterval(intervalId);
          }
        }, 1200);

      } catch (error) {
        if (active) {
          setLogs([`[${new Date().toLocaleTimeString('en-US', { hour12: false })}] error: failed to connect to GitHub API`]);
        }
      }
    }

    fetchGitHubActivity();

    return () => {
      active = false;
    };
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
