"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";
import type { LogPost } from "@/lib/blog";

type Log = {
  id: number;
  text: string;
  type: "input" | "output" | "error" | "system";
};

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [logs, setLogs] = useState<Log[]>([
    { id: 0, text: "JN_OS v2.0.4 loaded.", type: "system" },
    { id: 1, text: "Type 'help' to see available execution commands.", type: "system" }
  ]);
  const [availableLogs, setAvailableLogs] = useState<LogPost[]>([]);
  const [isPrinting, setIsPrinting] = useState(false);

  const endOfLogsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const printIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load dynamic logs from API route via useEffect
  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await fetch("/api/logs");
        if (response.ok) {
          const data = await response.json();
          setAvailableLogs(data);
        }
      } catch (err) {
        console.error("Error fetching logs for CLI:", err);
      }
    }
    fetchLogs();
  }, []);

  // Auto-focus when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom when logs update
  useEffect(() => {
    endOfLogsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Hotkey listener (Ctrl + `)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Cleanup active print interval on unmount
  useEffect(() => {
    return () => {
      if (printIntervalRef.current) {
        clearInterval(printIntervalRef.current);
      }
    };
  }, []);

  const printLinesSlowly = (lines: string[]) => {
    if (printIntervalRef.current) {
      clearInterval(printIntervalRef.current);
    }
    setIsPrinting(true);
    let index = 0;

    printIntervalRef.current = setInterval(() => {
      if (index < lines.length) {
        const lineText = lines[index];
        setLogs((prev) => [
          ...prev,
          { id: Date.now() + index, text: lineText, type: "output" }
        ]);
        index++;
      } else {
        if (printIntervalRef.current) {
          clearInterval(printIntervalRef.current);
          printIntervalRef.current = null;
        }
        setIsPrinting(false);
      }
    }, 40);
  };

  const executeCommandRef = useRef<((cmd: string) => void) | null>(null);

  useEffect(() => {
    const handleRunCommand = (e: Event) => {
      const customEvent = e as CustomEvent<{ command: string }>;
      const cmd = customEvent.detail.command;
      setIsOpen(true);
      setTimeout(() => {
        if (executeCommandRef.current) {
          executeCommandRef.current(cmd);
        }
      }, 150);
    };
    window.addEventListener("run-terminal-command", handleRunCommand);
    return () => window.removeEventListener("run-terminal-command", handleRunCommand);
  }, []);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setLogs((prev) => [...prev, { id: Date.now(), text: "jamal@sys:~$", type: "input" }]);
      return;
    }

    const args = trimmed.split(/\s+/);
    const commandName = args[0].toLowerCase();

    // Echo input
    const newLogs: Log[] = [...logs, { id: Date.now(), text: `jamal@sys:~$ ${cmd}`, type: "input" }];

    // Handle echo
    if (commandName === "echo") {
      const outputText = trimmed.substring(4).trim();
      newLogs.push({ id: Date.now() + 1, text: outputText, type: "output" });
      setLogs(newLogs);
      return;
    }

    switch (commandName) {
      case "help":
        newLogs.push({ id: Date.now() + 1, text: "AVAILABLE COMMANDS:", type: "output" });
        newLogs.push({ id: Date.now() + 2, text: "  whoami           - display current user identity", type: "output" });
        newLogs.push({ id: Date.now() + 3, text: "  skills           - list core technical competencies", type: "output" });
        newLogs.push({ id: Date.now() + 4, text: "  ls [dir]         - list directory files (e.g. ls logs)", type: "output" });
        newLogs.push({ id: Date.now() + 5, text: "  cat [file]       - print file contents (e.g. cat about.md, cat logs/building-agentic-workflows.md)", type: "output" });
        newLogs.push({ id: Date.now() + 6, text: "  date             - print system date and time", type: "output" });
        newLogs.push({ id: Date.now() + 7, text: "  pwd              - print working directory", type: "output" });
        newLogs.push({ id: Date.now() + 8, text: "  echo [arg]       - print arguments to output", type: "output" });
        newLogs.push({ id: Date.now() + 9, text: "  ping             - check network connectivity", type: "output" });
        newLogs.push({ id: Date.now() + 10, text: "  uptime           - tell how long the system has been running", type: "output" });
        newLogs.push({ id: Date.now() + 11, text: "  clear            - wipe terminal output", type: "output" });
        newLogs.push({ id: Date.now() + 12, text: "  sudo rm -rf      - [DANGEROUS] do not run", type: "output" });
        newLogs.push({ id: Date.now() + 13, text: "  exit             - close terminal interface", type: "output" });
        break;

      case "ls":
      case "ll":
        const targetDir = args[1]?.toLowerCase();
        if (targetDir === "logs" || targetDir === "logs/") {
          if (availableLogs.length === 0) {
            newLogs.push({ id: Date.now() + 1, text: "No active logs found in content partition.", type: "output" });
          } else {
            availableLogs.forEach((log, index) => {
              newLogs.push({ id: Date.now() + 1 + index, text: `-rw-r--r--  jamal  jamal  ${log.slug}.md`, type: "output" });
            });
          }
        } else if (targetDir && targetDir !== "." && targetDir !== "./") {
          newLogs.push({ id: Date.now() + 1, text: `ls: cannot access '${args[1]}': No such file or directory`, type: "error" });
        } else {
          newLogs.push({ id: Date.now() + 1, text: "drwxr-xr-x  jamal  jamal  logs/", type: "output" });
          newLogs.push({ id: Date.now() + 2, text: "-rw-r--r--  jamal  jamal  about.md", type: "output" });
          newLogs.push({ id: Date.now() + 3, text: "-rw-r--r--  jamal  jamal  skills.json", type: "output" });
          newLogs.push({ id: Date.now() + 4, text: "-rwxr-xr-x  root   root   deploy.sh", type: "output" });
        }
        break;

      case "cat":
        if (!args[1]) {
          newLogs.push({ id: Date.now() + 1, text: "cat: missing file operand", type: "error" });
          break;
        }

        const targetFile = args[1];
        const lowerTarget = targetFile.toLowerCase();

        if (lowerTarget === "logs" || lowerTarget === "logs/") {
          newLogs.push({ id: Date.now() + 1, text: "cat: logs: Is a directory", type: "error" });
          break;
        }

        if (lowerTarget === "about.md") {
          const lines = [
            "JAMAL NADEEM - B.Sc in Computer Science (SSUET, Class of '26)",
            "-------------------------------------------------------------",
            "Core Philosophy: \"If a task can be predicted, it can be automated.\"",
            "",
            "I bridge the gap between clean, high-performance web development",
            "and agentic AI systems—reducing friction and multiplying efficiency.",
            "",
            "Whether it's a sleek Next.js frontend or a complex background workflow",
            "powered by Python and GoHighLevel, I deliver digital infrastructure",
            "that works flawlessly."
          ];
          setLogs(newLogs);
          printLinesSlowly(lines);
          return;
        }

        if (lowerTarget === "skills.json") {
          const lines = [
            "{",
            '  "languages": ["TypeScript", "JavaScript", "Python", "HTML/CSS"],',
            '  "frameworks": ["Next.js", "React", "TailwindCSS"],',
            '  "tools_platforms": ["GoHighLevel", "n8n", "Supabase", "Git"],',
            '  "specialties": ["Agentic AI systems", "Browser automation", "E2E testing"]',
            "}"
          ];
          setLogs(newLogs);
          printLinesSlowly(lines);
          return;
        }

        if (lowerTarget === "deploy.sh") {
          const lines = [
            "#!/bin/bash",
            "echo \">>> Initializing production build sequence...\"",
            "npm run build",
            "echo \">>> Running automated integration suite...\"",
            "npx playwright test",
            "echo \">>> Pushing artifacts to Vercel production edge...\"",
            "echo \">>> [SUCCESS] Deployment completed successfully!\""
          ];
          setLogs(newLogs);
          printLinesSlowly(lines);
          return;
        }

        // Check if it matches a dynamic log
        const cleanSlug = targetFile
          .replace(/^logs\//, "")
          .replace(/\.md$/, "");

        const matchedLog = availableLogs.find(
          (log) => log.slug.toLowerCase() === cleanSlug.toLowerCase()
        );

        if (matchedLog) {
          const fileLines = [
            `TITLE:  ${matchedLog.title.toUpperCase()}`,
            `DATE:   ${matchedLog.date}`,
            `TAGS:   [${matchedLog.tags.join(", ")}]`,
            `STATUS: [${matchedLog.status}]`,
            "-------------------------------------------------------------",
            ...matchedLog.content.split("\n"),
          ];
          setLogs(newLogs);
          printLinesSlowly(fileLines);
          return;
        }

        newLogs.push({ id: Date.now() + 1, text: `cat: ${targetFile}: No such file or directory`, type: "error" });
        break;

      case "date":
        newLogs.push({ id: Date.now() + 1, text: new Date().toString(), type: "output" });
        break;

      case "pwd":
        newLogs.push({ id: Date.now() + 1, text: "/home/jamal/system/portfolio", type: "output" });
        break;

      case "ping":
        const ms = Math.floor(Math.random() * 40) + 10;
        newLogs.push({ id: Date.now() + 1, text: `PONG! (${ms}ms) - connection stable.`, type: "output" });
        break;

      case "uptime":
        newLogs.push({ id: Date.now() + 1, text: "up 14 days, 3 hours, 42 minutes. load average: 0.01, 0.03, 0.05", type: "output" });
        break;

      case "whoami":
        newLogs.push({ id: Date.now() + 1, text: "guest_user // ACCESS_LEVEL: RESTRICTED", type: "output" });
        break;

      case "skills":
        newLogs.push({ id: Date.now() + 1, text: "[ SYSTEM COMPETENCIES ]", type: "output" });
        newLogs.push({ id: Date.now() + 2, text: "> React.js, Next.js, Node.js", type: "output" });
        newLogs.push({ id: Date.now() + 3, text: "> Python, GoHighLevel, Supabase", type: "output" });
        newLogs.push({ id: Date.now() + 4, text: "> Agentic Frameworks, Web Sockets, Microservices", type: "output" });
        break;

      case "sudo":
        if (args.slice(1).join(" ").toLowerCase().startsWith("rm -rf")) {
          newLogs.push({ id: Date.now() + 1, text: "PERMISSION DENIED: Nice try. You don't have root access to Jamal's portfolio.", type: "error" });
        } else {
          newLogs.push({ id: Date.now() + 1, text: "sudo: permission denied", type: "error" });
        }
        break;

      case "godmode":
        newLogs.push({ id: Date.now() + 1, text: "[SUCCESS] ROOT ACCESS VERIFIED. INITIATING OVERRIDE SEQUENCE.", type: "output" });
        window.dispatchEvent(new CustomEvent("trigger-god-mode"));
        break;

      case "clear":
        setLogs([]);
        return;

      case "exit":
        setIsOpen(false);
        return;

      default:
        newLogs.push({ id: Date.now() + 1, text: `Command not found: ${commandName}. Type 'help' for available commands.`, type: "error" });
    }

    setLogs(newLogs);
  };

  executeCommandRef.current = executeCommand;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage) return;
    executeCommand(inputMessage);
    setInputMessage("");
  };

  return (
    <>
      {/* Easter Egg Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-16 md:bottom-14 right-6 md:right-8 z-[60] bg-black/80 backdrop-blur-md border border-surface p-3 rounded-full hover:border-glow-green hover:text-glow-green hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all group"
        aria-label="Open Terminal OS"
      >
        <TerminalIcon className="w-5 h-5 opacity-70 group-hover:opacity-100" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/60 backdrop-blur-sm"
          >
            {/* Terminal Window */}
            <div className="w-full max-w-4xl h-[80vh] bg-[#0A0A0A] border border-glow-green/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(57,255,20,0.1)] flex flex-col relative" onClick={() => !isPrinting && inputRef.current?.focus()}>

              {/* Scanline Overlay Effect */}
              <div className="absolute inset-0 pointer-events-none z-20 opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] mix-blend-overlay" />

              {/* Terminal Header */}
              <div className="flex bg-[#111] border-b border-white/10 px-4 py-3 items-center justify-between z-30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-400" onClick={() => setIsOpen(false)} />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer hover:bg-yellow-400" onClick={() => setIsOpen(false)} />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer hover:bg-green-400" onClick={() => setIsOpen(false)} />
                </div>
                <div className="font-mono text-xs text-secondary font-bold tracking-widest">
                  JN_OS_TERMINAL
                </div>
                <button onClick={() => setIsOpen(false)} className="text-secondary hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Terminal Body */}
              <div className="flex-1 p-6 font-mono text-sm overflow-y-auto z-30 scrollbar-thin scrollbar-thumb-glow-green/20">
                <div className="flex flex-col gap-2">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className={`
                        ${log.type === "system" ? "text-glow-silver/70 italic" : ""}
                        ${log.type === "input" ? "text-white" : ""}
                        ${log.type === "output" ? "text-glow-green" : ""}
                        ${log.type === "error" ? "text-red-400" : ""}
                      `}
                    >
                      {log.text}
                    </div>
                  ))}
                  <div ref={endOfLogsRef} />
                </div>

                <form onSubmit={handleSubmit} className="mt-4 flex items-center shrink-0">
                  <span className="text-glow-green mr-2 hover:text-white transition-colors duration-300">jamal@sys:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={isPrinting ? "processing data stream..." : inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                    spellCheck={false}
                    autoComplete="off"
                    disabled={isPrinting}
                  />
                  {!isPrinting && <span className="w-2 h-4 bg-glow-green animate-pulse inline-block" />}
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
