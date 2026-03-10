"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThankYouOverlay from "./ThankYouOverlay";

export default function Contact() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOverlayOpen(true);
  };

  return (
    <section id="contact" className="min-h-screen flex border-t border-surface flex-col items-center justify-center auto-px pb-32 pt-32 px-12 z-30 relative overflow-hidden">
      <ThankYouOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
      
      {/* Background Glow Spotlight */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[60vw] h-[60vw] bg-glow-green rounded-full blur-[150px] opacity-10 mix-blend-screen" />
        <div className="absolute w-[40vw] h-[40vw] bg-glow-silver rounded-full blur-[120px] opacity-20 mix-blend-screen" />
      </div>

      <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] text-white text-center leading-none tracking-tighter cursor-pointer z-10 mb-16 hover:text-glow-green transition-colors duration-500">
        INITIATE_CONNECTION
      </h2>

      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-16 z-10">
        <motion.form
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#0D0D0D]/80 backdrop-blur-md p-8 border border-surface rounded-xl flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <input 
            type="text" 
            placeholder="your.name" 
            className="w-full bg-transparent border-b border-surface text-primary font-sans p-4 focus:outline-none focus:border-glow-green focus:shadow-[0_4px_15px_-3px_rgba(57,255,20,0.3)] transition-all placeholder:text-secondary/50" 
            required
          />
          <input 
            type="email" 
            placeholder="your.email@domain.com" 
            className="w-full bg-transparent border-b border-surface text-primary font-sans p-4 focus:outline-none focus:border-glow-green focus:shadow-[0_4px_15px_-3px_rgba(57,255,20,0.3)] transition-all placeholder:text-secondary/50" 
            required
          />
          <textarea 
            placeholder="[enter_message]" 
            rows={4}
            className="w-full bg-transparent border-b border-surface text-primary font-sans p-4 focus:outline-none focus:border-glow-green focus:shadow-[0_4px_15px_-3px_rgba(57,255,20,0.3)] transition-all resize-none placeholder:text-secondary/50" 
            required
          />
          
          <button type="submit" className="mt-4 w-full py-4 uppercase font-display tracking-widest bg-glow-green/10 text-glow-green border border-glow-green rounded hover:bg-glow-green hover:text-black transition-colors duration-300 font-bold">
            EXECUTE.SEND()
          </button>
        </motion.form>

        {/* Right Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#0D0D0D] border border-surface rounded-xl overflow-hidden flex flex-col h-full min-h-[400px] shadow-2xl"
        >
          {/* Header */}
          <div className="flex bg-[#1A1A1A] border-b border-surface px-4 py-3 items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="font-mono text-xs text-secondary mx-auto">
              bash - jamal_nadeem
            </div>
          </div>

          {/* Body */}
          <div className="p-6 font-mono text-xs md:text-sm leading-relaxed flex flex-col gap-2 overflow-y-auto h-full">
            <div>
              <span className="text-glow-green font-bold">jamal@sys</span>:
              <span className="text-blue-400">~/portfolio</span>$ ./initiate_contact.sh
            </div>
            <div className="text-secondary mt-2">
              System ready. Awaiting input...
            </div>
            <div className="mt-2 text-secondary opacity-70">
              # You can also reach me directly at <a href="mailto:jamal.nadeem@example.com" className="text-glow-green underline hover:text-white">jamalnadeem2004@gmail.com</a>
            </div>
            <div className="mt-4">
              <span className="text-glow-green font-bold">jamal@sys</span>:
              <span className="text-blue-400">~/portfolio</span>$ <span className="w-2 h-4 bg-glow-green animate-pulse inline-block align-middle ml-1" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="font-mono text-xs text-secondary flex gap-8 justify-center w-full mt-32 z-10">
        <a href="https://github.com/beginnercodee" className="hover:text-glow-green transition-colors">github://jamal-nadeem</a>
        <a href="https://www.linkedin.com/in/jamal-nadeem/" className="hover:text-glow-green transition-colors">linkedin://in/jamalnadeem</a>
        <a href="https://x.com/Nadeem7Jamal" className="hover:text-glow-green transition-colors">x://@jamal_codes</a>
      </div>
    </section>
  );
}
