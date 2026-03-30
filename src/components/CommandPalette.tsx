"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery(""); // Reset query on close
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const commands: Command[] = [
    {
      id: "home",
      name: "cd ~ /home",
      icon: <Terminal className="w-4 h-4" />,
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "about",
      name: "cat about.txt",
      icon: <Terminal className="w-4 h-4" />,
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "experience",
      name: "cd ./experience",
      icon: <Terminal className="w-4 h-4" />,
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "projects",
      name: "ls projects/",
      icon: <Terminal className="w-4 h-4" />,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "contact",
      name: "./initiate_contact.sh",
      icon: <Mail className="w-4 h-4" />,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      },
    },
    {
      id: "github",
      name: "ssh github.com/beginnercodee",
      icon: <Github className="w-4 h-4" />,
      action: () => {
        window.open("https://github.com/beginnercodee", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "linkedin",
      name: "ssh linkedin.com/jamal-nadeem",
      icon: <Linkedin className="w-4 h-4" />,
      action: () => {
        window.open("https://www.linkedin.com/in/jamal-nadeem/", "_blank");
        setIsOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase()) || 
    cmd.id.toLowerCase().includes(query.toLowerCase())
  );

  // Reset selected index when query results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

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
                onChange={(e) => setQuery(e.target.value)}
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
                    <div className="flex items-center gap-3 font-mono text-xs md:text-sm">
                      <span className={cn(
                        "transition-opacity",
                        index === selectedIndex ? "opacity-100" : "opacity-50 group-hover:opacity-100"
                      )}>
                        {cmd.icon}
                      </span>
                      {cmd.name}
                    </div>
                    <ArrowRight className={cn(
                      "w-4 h-4 transition-all",
                      index === selectedIndex ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                    )} />
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center font-mono text-xs text-secondary opacity-50">
                  No commands found matching "{query}"
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
