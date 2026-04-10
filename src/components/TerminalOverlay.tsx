"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";

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
  
  const endOfLogsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const executeCommand = (cmd: string) => {
    const pureCmd = cmd.trim().toLowerCase();
    
    // Echo input
    const newLogs: Log[] = [...logs, { id: Date.now(), text: `jamal@sys:~$ ${cmd}`, type: "input" }];

    // Processing Logic
    switch (pureCmd) {
      case "help":
        newLogs.push({ id: Date.now() + 1, text: "AVAILABLE COMMANDS:", type: "output" });
        newLogs.push({ id: Date.now() + 2, text: "  whoami      - display current user identity", type: "output" });
        newLogs.push({ id: Date.now() + 3, text: "  skills      - list core technical competencies", type: "output" });
        newLogs.push({ id: Date.now() + 4, text: "  clear       - wipe terminal output", type: "output" });
        newLogs.push({ id: Date.now() + 5, text: "  sudo rm -rf - [DANGEROUS] do not run", type: "output" });
        newLogs.push({ id: Date.now() + 6, text: "  exit        - close terminal interface", type: "output" });
        break;
      case "whoami":
        newLogs.push({ id: Date.now() + 1, text: "Jamal Nadeem - Team Lead, CRM & Agentic AI at EditVista LTD.", type: "output" });
        newLogs.push({ id: Date.now() + 2, text: "Specializing in autonomous workflows, AI architecture, and massive-scale automation.", type: "output" });
        break;
      case "skills":
        newLogs.push({ id: Date.now() + 1, text: "[ SYSTEM COMPETENCIES ]", type: "output" });
        newLogs.push({ id: Date.now() + 2, text: "> React.js, Next.js, Node.js", type: "output" });
        newLogs.push({ id: Date.now() + 3, text: "> Python, GoHighLevel, Supabase", type: "output" });
        newLogs.push({ id: Date.now() + 4, text: "> Agentic Frameworks, Web Sockets, Microservices", type: "output" });
        break;
      case "sudo rm -rf":
      case "sudo rm -rf /":
        newLogs.push({ id: Date.now() + 1, text: "PERMISSION DENIED: Nice try. You don't have root access to Jamal's portfolio.", type: "error" });
        break;
      case "clear":
        setLogs([]);
        return;
      case "exit":
        setIsOpen(false);
        return;
      case "":
        break;
      default:
        newLogs.push({ id: Date.now() + 1, text: `Command not found: ${pureCmd}. Type 'help' for available commands.`, type: "error" });
    }

    setLogs(newLogs);
  };

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
        className="fixed bottom-6 right-6 z-40 bg-black/80 backdrop-blur-md border border-surface p-3 rounded-full hover:border-glow-green hover:text-glow-green hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all group"
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
            <div className="w-full max-w-4xl h-[80vh] bg-[#0A0A0A] border border-glow-green/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(57,255,20,0.1)] flex flex-col relative" onClick={() => inputRef.current?.focus()}>
              
              {/* Scanline Overlay Effect */}
              <div className="absolute inset-0 pointer-events-none z-20 opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] mix-blend-overlay" />

              {/* Terminal Header */}
              <div className="flex bg-[#111] border-b border-white/10 px-4 py-3 items-center justify-between z-30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-400" onClick={() => setIsOpen(false)} />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
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

                {/* Input Line */}
                <form onSubmit={handleSubmit} className="mt-4 flex items-center shrink-0">
                  <span className="text-glow-green mr-2">jamal@sys:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <span className="w-2 h-4 bg-glow-green animate-pulse inline-block" />
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
