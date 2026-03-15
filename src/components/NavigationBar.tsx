"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // O(1) functional referencing across renders
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // O(1) toggle execution
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:py-4 transition-all duration-300",
          scrolled ? "md:py-2" : "md:py-6"
        )}
      >
        <div className={cn(
          "flex items-center justify-between px-6 py-4 w-full md:px-8 max-w-[1440px] mx-auto transition-all duration-300 rounded-full",
          scrolled || isOpen
            ? "bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-transparent"
        )}>
          {/* Desktop Left Links */}
          <div className="hidden md:flex gap-8 font-sans text-nav lowercase text-secondary transition-colors duration-300">
            <Link href="#about" className="hover:text-primary transition-colors">about</Link>
            <Link href="#experience" className="hover:text-primary transition-colors">experience</Link>
          </div>
          
          <div className="font-display uppercase tracking-widest text-primary text-xl font-bold hover:text-glow-green transition-colors cursor-pointer w-full text-center md:w-auto md:text-left z-50">
            JN LABS
          </div>
          
          {/* Desktop Right Links */}
          <div className="hidden md:flex gap-8 font-sans text-nav lowercase text-secondary transition-colors duration-300">
            <Link href="#projects" className="hover:text-primary transition-colors">projects</Link>
            <Link href="#skills" className="hover:text-primary transition-colors">skills</Link>
          </div>

          {/* Mobile Hamburger Toggle (Hardware Accelerated O(1) Rendering) */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 absolute right-6"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className={cn("w-6 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-center", isOpen ? "translate-y-[8px] rotate-45" : "")} />
            <div className={cn("w-6 h-0.5 bg-primary rounded-full transition-opacity duration-300", isOpen ? "opacity-0" : "opacity-100")} />
            <div className={cn("w-6 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-center", isOpen ? "-translate-y-[8px] -rotate-45" : "")} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay (Pre-rendered for O(1) mounting) */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden h-screen w-screen border-b border-glow-green/20 transition-all duration-300 ease-out",
          isOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-8"
        )}
      >
        <div className="absolute inset-0 bg-glow-green/5 blur-3xl opacity-20 pointer-events-none" />
        <Link href="#about" onClick={closeMenu} className="font-display uppercase tracking-[0.2em] text-2xl text-secondary hover:text-glow-green transition-all">About</Link>
        <Link href="#experience" onClick={closeMenu} className="font-display uppercase tracking-[0.2em] text-2xl text-secondary hover:text-glow-green transition-all">Experience</Link>
        <Link href="#projects" onClick={closeMenu} className="font-display uppercase tracking-[0.2em] text-2xl text-secondary hover:text-glow-green transition-all">Projects</Link>
        <Link href="#skills" onClick={closeMenu} className="font-display uppercase tracking-[0.2em] text-2xl text-secondary hover:text-glow-green transition-all">Skills</Link>
      </div>
    </>
  );
}
