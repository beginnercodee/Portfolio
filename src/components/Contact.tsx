"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ThankYouOverlay from "./ThankYouOverlay";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const formData = new FormData(e.currentTarget);
    
    // REPLACE THIS KEY with your actual Web3Forms Access Key
    formData.append("access_key", "bdc6e8c4-25f2-4a6a-a0ba-6d7fc7806d93"); 
    formData.append("subject", "New Contact from JN LABS Portfolio");
    formData.append("from_name", "JN LABS Terminal");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setIsOverlayOpen(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitError("Transaction Failed: " + data.message);
      }
    } catch (err) {
      setSubmitError("Network Error. Please try again or use direct email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-[80vh] flex border-t border-surface flex-col items-center justify-center pb-16 md:pb-24 pt-16 md:pt-24 px-6 md:px-12 z-30 relative overflow-hidden">
      <ThankYouOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} />
      
      {/* Background Glow Spotlight */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] bg-glow-green rounded-full blur-[100px] md:blur-[150px] opacity-10 mix-blend-screen" />
        <div className="absolute w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-glow-silver rounded-full blur-[80px] md:blur-[120px] opacity-20 mix-blend-screen" />
      </div>

      <h2 className="font-display text-[clamp(2rem,8vw,6rem)] md:text-[clamp(2.5rem,6vw,6rem)] text-white text-center leading-none tracking-tighter cursor-pointer z-10 mb-10 md:mb-16 hover:text-glow-green transition-colors duration-500">
        INITIATE_CONNECTION
      </h2>

      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 z-10">
        <motion.form
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#0D0D0D]/80 backdrop-blur-md p-6 md:p-8 border border-surface rounded-xl flex flex-col gap-4 md:gap-6"
          onSubmit={handleSubmit}
        >
          <input 
            type="text" 
            name="name"
            placeholder="your.name" 
            className="w-full bg-transparent border-b border-surface !text-glow-green font-sans p-3 md:p-4 focus:outline-none focus:border-glow-green focus:shadow-[0_4px_15px_-3px_rgba(57,255,20,0.3)] transition-all placeholder:text-secondary/50 text-sm md:text-base disabled:opacity-50" 
            required
            disabled={isSubmitting}
          />
          <input 
            type="email" 
            name="email"
            placeholder="your.email@domain.com" 
            className="w-full bg-transparent border-b border-surface !text-glow-green font-sans p-3 md:p-4 focus:outline-none focus:border-glow-green focus:shadow-[0_4px_15px_-3px_rgba(57,255,20,0.3)] transition-all placeholder:text-secondary/50 text-sm md:text-base disabled:opacity-50" 
            required
            disabled={isSubmitting}
          />
          <textarea 
            name="message"
            placeholder="[enter_message]" 
            rows={4}
            className="w-full bg-transparent border-b border-surface !text-glow-green font-sans p-3 md:p-4 focus:outline-none focus:border-glow-green focus:shadow-[0_4px_15px_-3px_rgba(57,255,20,0.3)] transition-all resize-none placeholder:text-secondary/50 text-sm md:text-base disabled:opacity-50" 
            required
            disabled={isSubmitting}
          />
          
          {submitError && (
            <div className="font-mono text-xs text-red-500 mt-2 px-2 bg-red-500/10 py-2 border border-red-500/20 rounded">
              &gt; error: {submitError}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="mt-2 md:mt-4 w-full py-3 md:py-4 uppercase font-display tracking-widest bg-glow-green/20 !text-glow-green border border-glow-green rounded hover:bg-glow-green hover:!text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.6)] shadow-[0_0_10px_rgba(57,255,20,0.2)] transition-all duration-300 font-bold text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-2 h-2 rounded-full bg-glow-green/50 animate-ping inline-block" />
                TRANSMITTING...
              </>
            ) : (
              "EXECUTE.SEND()"
            )}
          </button>
        </motion.form>

        {/* Right Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#0D0D0D] border border-surface rounded-xl overflow-hidden flex flex-col h-full min-h-[300px] md:min-h-[400px] shadow-2xl"
        >
          {/* Header */}
          <div className="flex bg-[#1A1A1A] border-b border-surface px-4 py-3 items-center gap-2">
            <div className="flex gap-2">
              <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-red-500/80" />
              <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="font-mono text-[10px] md:text-xs text-secondary mx-auto">
              bash - jamal_nadeem
            </div>
          </div>

          {/* Body */}
          <div className="p-4 md:p-6 font-mono text-xs md:text-sm leading-relaxed flex flex-col gap-2 overflow-y-auto h-full overflow-x-hidden break-all sm:break-normal">
            <div>
              <span className="text-glow-green font-bold">jamal@sys</span>:
              <span className="text-blue-400">~/portfolio</span>$ ./initiate_contact.sh
            </div>
            <div className="text-secondary mt-2">
              System ready. Awaiting input...
            </div>
            <div className="mt-2 text-secondary opacity-70 flex flex-wrap gap-1 leading-[1.8]">
              # You can also reach me directly at <a href="mailto:jamalnadeem2004@gmail.com" className="text-glow-green underline hover:text-white break-all">jamalnadeem2004@gmail.com</a>
            </div>
            <div className="mt-4 flex flex-wrap gap-1 items-center">
              <div>
                <span className="text-glow-green font-bold">jamal@sys</span>:
                <span className="text-blue-400">~/portfolio</span>$
              </div>
              <span className="w-1.5 md:w-2 h-3 md:h-4 bg-glow-green animate-pulse inline-block align-middle" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Prominent Social Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-[900px] mt-20 md:mt-32 z-10">
        <a 
          href="https://github.com/beginnercodee" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-black/40 hover:bg-glow-green/10 hover:border-glow-green/50 text-secondary hover:text-glow-green hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(57,255,20,0.3)] transition-all duration-300 group"
        >
          <Github className="w-8 h-8 mb-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
          <span className="font-mono text-sm tracking-widest uppercase">github://</span>
          <span className="font-sans font-bold text-white group-hover:text-glow-green mt-1">jamal-nadeem</span>
        </a>
        
        <a 
          href="https://www.linkedin.com/in/jamal-nadeem/" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-black/40 hover:bg-glow-green/10 hover:border-glow-green/50 text-secondary hover:text-glow-green hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(57,255,20,0.3)] transition-all duration-300 group"
        >
          <Linkedin className="w-8 h-8 mb-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
          <span className="font-mono text-sm tracking-widest uppercase">linkedin://</span>
          <span className="font-sans font-bold text-white group-hover:text-glow-green mt-1">in/jamalnadeem</span>
        </a>

        <a 
          href="https://x.com/Nadeem7Jamal" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 bg-black/40 hover:bg-glow-green/10 hover:border-glow-green/50 text-secondary hover:text-glow-green hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(57,255,20,0.3)] transition-all duration-300 group"
        >
          <Twitter className="w-8 h-8 mb-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
          <span className="font-mono text-sm tracking-widest uppercase">x://</span>
          <span className="font-sans font-bold text-white group-hover:text-glow-green mt-1">@jamal_codes</span>
        </a>
      </div>
    </section>
  );
}
