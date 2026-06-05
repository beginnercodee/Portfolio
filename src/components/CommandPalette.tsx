"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { LogPost } from "@/lib/blog";

type Command = {
  id: string;
  name: string;
  desc?: string;
  icon: React.ReactNode;
  action: () => void;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [availableLogs, setAvailableLogs] = useState<LogPost[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Toggle palette on CMD+K or CTRL+K
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Fetch dynamic logs on mount
  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await fetch("/api/logs");
        if (response.ok) {
          const data = await response.json();
          setAvailableLogs(data);
        }
      } catch (err) {
        console.error("Error fetching logs for command palette:", err);
      }
    }
    fetchLogs();
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      const handle = setTimeout(() => {
        setQuery("");
        setSelectedIndex(0);
      }, 0);
      return () => clearTimeout(handle);
    }
  }, [isOpen]);

  const commands: Command[] = [
    {
      id: "home",
      name: "cd ~ /home",
      desc: "Navigate to the top of the homepage",
      icon: <Terminal className="w-4 h-4" />,
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "about",
      name: "cat about.txt",
      desc: "View biography section",
      icon: <Terminal className="w-4 h-4" />,
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "experience",
      name: "cd ./experience",
      desc: "Scroll to professional history and education",
      icon: <Terminal className="w-4 h-4" />,
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "projects",
      name: "ls projects/",
      desc: "Examine portfolio works and details",
      icon: <Terminal className="w-4 h-4" />,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "contact",
      name: "./initiate_contact.sh",
      desc: "Scroll down to connection and social links",
      icon: <Mail className="w-4 h-4" />,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "github",
      name: "ssh github.com/beginnercodee",
      desc: "Open GitHub profile in a new tab",
      icon: <Github className="w-4 h-4" />,
      action: () => {
        window.open("https://github.com/beginnercodee", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "linkedin",
      name: "ssh linkedin.com/jamal-nadeem",
      desc: "Open LinkedIn profile in a new tab",
      icon: <Linkedin className="w-4 h-4" />,
      action: () => {
        window.open("https://www.linkedin.com/in/jamal-nadeem/", "_blank");
        setIsOpen(false);
      },
    },
  ];

  const getFilteredCommands = (): Command[] => {
    if (query.startsWith(">")) {
      const macroQuery = query.substring(1).trim().toLowerCase();
      const macros = [
        { name: "help", desc: "Show available terminal commands" },
        { name: "ping", desc: "Check system connectivity latency" },
        { name: "clear", desc: "Wipe terminal command logs" },
        { name: "whoami", desc: "Display guest user identity details" },
        { name: "skills", desc: "List core technical competencies" },
        { name: "uptime", desc: "Show system load and running time" },
        { name: "godmode", desc: "Activate system God Mode override" },
        { name: "ls logs", desc: "List all files in the content partition" },
      ];

      const filteredMacros = macros.filter(
        (m) =>
          m.name.includes(macroQuery) ||
          m.desc.toLowerCase().includes(macroQuery)
      );

      const macroCommands: Command[] = filteredMacros.map((m) => ({
        id: `macro-${m.name}`,
        name: `> ${m.name}`,
        desc: m.desc,
        icon: <Terminal className="w-4 h-4 text-glow-green" />,
        action: () => {
          window.dispatchEvent(
            new CustomEvent("run-terminal-command", {
              detail: { command: m.name }
            })
          );
          setIsOpen(false);
        }
      }));

      // Custom command execution
      const hasExactMacroMatch = macros.some((m) => m.name === macroQuery);
      if (macroQuery && !hasExactMacroMatch) {
        macroCommands.push({
          id: `macro-custom`,
          name: `> ${macroQuery}`,
          desc: "Execute custom terminal command",
          icon: <Terminal className="w-4 h-4 text-glow-green" />,
          action: () => {
            window.dispatchEvent(
              new CustomEvent("run-terminal-command", {
                detail: { command: macroQuery }
              })
            );
            setIsOpen(false);
          }
        });
      }

      return macroCommands;
    } else {
      const logCommands: Command[] = availableLogs.map((log) => ({
        id: `log-${log.slug}`,
        name: `cat logs/${log.slug}.md`,
        desc: log.title,
        icon: <Terminal className="w-4 h-4 text-glow-silver/70" />,
        action: () => {
          router.push(`/logs/${log.slug}`);
          setIsOpen(false);
        }
      }));

      const all = [...commands, ...logCommands];
      return all.filter(
        (cmd) =>
          cmd.name.toLowerCase().includes(query.toLowerCase()) ||
          cmd.id.toLowerCase().includes(query.toLowerCase()) ||
          (cmd.desc && cmd.desc.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  const filteredCommands = getFilteredCommands();

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className="fixed top-[15%] left-1/2 w-full max-w-xl bg-[#0a0a0a] border border-glow-green/30 rounded-xl shadow-[0_0_40px_rgba(57,255,20,0.15)] z-[101] overflow-hidden flex flex-col"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5 bg-white/[0.02]">
              <Search className="w-5 h-5 text-glow-green opacity-70" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-primary placeholder:text-secondary/50 font-mono text-sm focus:outline-none"
                autoComplete="off"
                spellCheck="false"
              />
              <div className="flex gap-1 text-[10px] font-mono text-secondary px-2 py-1 bg-white/5 rounded border border-white/10">
                ESC
              </div>
            </div>

            {/* Command List */}
            <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-glow-green/20 scrollbar-track-transparent">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all outline-none",
                      index === selectedIndex 
                        ? "bg-glow-green/10 text-glow-green" 
                        : "text-secondary hover:bg-glow-green/5 hover:text-glow-green/80",
                      "group"
                    )}
                  >
                    <div className="flex flex-col items-start gap-1 font-mono text-xs md:text-sm text-left">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "transition-opacity",
                          index === selectedIndex ? "opacity-100" : "opacity-50 group-hover:opacity-100"
                        )}>
                          {cmd.icon}
                        </span>
                        {cmd.name}
                      </div>
                      {cmd.desc && (
                        <span className="text-[10px] text-secondary/60 pl-7 group-hover:text-secondary/80 transition-colors">
                          {cmd.desc}
                        </span>
                      )}
                    </div>
                    <ArrowRight className={cn(
                      "w-4 h-4 transition-all shrink-0",
                      index === selectedIndex ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                    )} />
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center font-mono text-xs text-secondary opacity-50">
                  No commands found matching &quot;{query}&quot;
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center gap-4 font-mono text-[9px] text-secondary/60">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white/5 rounded border border-white/10">↑↓</kbd> to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white/5 rounded border border-white/10">↵</kbd> to execute
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
