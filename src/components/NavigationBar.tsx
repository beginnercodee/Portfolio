"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-all duration-300",
        scrolled ? "py-2" : "py-6"
      )}
    >
      <div className={cn(
        "flex items-center justify-between px-8 py-4 w-full max-w-[1440px] mx-auto transition-all duration-300 rounded-full",
        scrolled 
          ? "bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
          : "bg-transparent border-transparent"
      )}>
        <div className="flex gap-8 font-sans text-nav lowercase text-secondary transition-colors duration-300">
          <Link href="#about" className="hover:text-primary transition-colors">about</Link>
          <Link href="#experience" className="hover:text-primary transition-colors">experience</Link>
        </div>
        <div className="font-display uppercase tracking-widest text-primary text-xl font-bold hover:text-glow-green transition-colors cursor-pointer">
          JN LABS
        </div>
        <div className="flex gap-8 font-sans text-nav lowercase text-secondary transition-colors duration-300">
          <Link href="#projects" className="hover:text-primary transition-colors">projects</Link>
          <Link href="#skills" className="hover:text-primary transition-colors">skills</Link>
        </div>
      </div>
    </motion.nav>
  );
}
