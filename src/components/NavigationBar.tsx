"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  // Check OS for correct shortcut key display
  useEffect(() => {
    setIsMac(navigator.userAgent.toLowerCase().includes('mac'));
  }, []);

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

  const openCommandPalette = useCallback(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
    closeMenu();
  }, [closeMenu]);

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
          <div className="hidden md:flex w-1/3 justify-start gap-8 font-sans text-nav lowercase text-secondary transition-colors duration-300 items-center">
            <Link href="/#about" className="hover:text-primary transition-colors">about</Link>
            <Link href="/#experience" className="hover:text-primary transition-colors">experience</Link>
            <Link href="/logs" className="hover:text-glow-green text-glow-green/80 flex items-center gap-1 transition-colors group">
              <span className="w-1.5 h-1.5 rounded-full bg-glow-green/50 group-hover:bg-glow-green animate-pulse" />
              logs
            </Link>
          </div>
          
          {/* Logo Center */}
          <div className="flex w-full md:w-1/3 justify-start md:justify-center z-50">
            <Link href="/" className="font-display uppercase tracking-widest text-primary text-xl font-bold hover:text-glow-green transition-colors">
              JN LABS
            </Link>
          </div>
          
          {/* Desktop Right Links */}
          <div className="hidden md:flex w-1/3 justify-end gap-8 font-sans text-nav lowercase text-secondary transition-colors duration-300 items-center">
            <Link href="/#projects" className="hover:text-primary transition-colors">projects</Link>
            <Link href="/#skills" className="hover:text-primary transition-colors">skills</Link>
            <button 
              onClick={openCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-glow-green/10 hover:border-glow-green/30 hover:text-glow-green transition-all"
            >
              <span className="font-mono text-[10px] tracking-widest opacity-70">SEARCH</span>
              <kbd className="font-mono text-[9px] bg-black/50 px-1.5 py-0.5 rounded border border-white/5 text-glow-silver">
                {isMac ? '⌘K' : 'CTRL+K'}
              </kbd>
            </button>
          </div>

          {/* Mobile Hamburger Toggle (Hardware Accelerated O(1) Rendering) */}
          <div className="md:hidden flex items-center gap-4 z-50 absolute right-6">
            <button 
              onClick={openCommandPalette}
              className="flex items-center justify-center p-2 rounded-md border border-white/10 bg-white/5 text-secondary hover:text-glow-green transition-colors"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button 
              className="flex flex-col justify-center items-center w-6 h-6 gap-1.5"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <div className={cn("w-6 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-center", isOpen ? "translate-y-[8px] rotate-45" : "")} />
              <div className={cn("w-6 h-0.5 bg-primary rounded-full transition-opacity duration-300", isOpen ? "opacity-0" : "opacity-100")} />
              <div className={cn("w-6 h-0.5 bg-primary rounded-full transition-transform duration-300 origin-center", isOpen ? "-translate-y-[8px] -rotate-45" : "")} />
            </button>
          </div>
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
        <Link href="/#about" onClick={closeMenu} className="font-display uppercase tracking-[0.2em] text-2xl text-secondary hover:text-glow-green transition-all">About</Link>
        <Link href="/#experience" onClick={closeMenu} className="font-display uppercase tracking-[0.2em] text-2xl text-secondary hover:text-glow-green transition-all">Experience</Link>
        <Link href="/#projects" onClick={closeMenu} className="font-display uppercase tracking-[0.2em] text-2xl text-secondary hover:text-glow-green transition-all">Projects</Link>
        <Link href="/#skills" onClick={closeMenu} className="font-display uppercase tracking-[0.2em] text-2xl text-secondary hover:text-glow-green transition-all">Skills</Link>
        <div className="w-12 h-px bg-white/10 my-2" />
        <Link href="/logs" onClick={closeMenu} className="font-display uppercase tracking-[0.2em] text-2xl text-glow-green hover:text-white transition-all flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-glow-green animate-pulse" />
          Execution Logs
        </Link>
      </div>
    </>
  );
}
