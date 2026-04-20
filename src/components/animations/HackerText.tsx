"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function HackerText({ text }: { text: string }) {
  // Initialize with plain text to match SSR and prevent Hydration #418 Error
  const [displayText, setDisplayText] = useState(text);
  const [isEncrypted, setIsEncrypted] = useState(false);
  
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -50px 0px" });
  const hasRunRef = useRef(false);

  useEffect(() => {
    // Stage 1: Fast-encrypt on Client Mount (safely bypasses SSR Hydration checks)
    if (!isEncrypted) {
      setDisplayText(text.split('').map(c => c === ' ' ? ' ' : LETTERS[Math.floor(Math.random() * LETTERS.length)]).join(''));
      setIsEncrypted(true);
      return;
    }

    // Stage 2: Wait until user scrolls the element into view
    if (!isInView || hasRunRef.current) return;

    hasRunRef.current = true;
    let iterations = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (text[index] === " ") return " ";
            
            if (index < iterations) {
              return text[index];
            }

            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      if (iterations >= maxIterations) {
        clearInterval(interval);
      }
      
      iterations += 1 / 3; 
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text, isEncrypted]);

  return (
    <h3 
      ref={containerRef}
      className="font-sans text-xl font-bold text-primary mb-3 group-hover:text-glow-green transition-colors"
    >
      {displayText}
    </h3>
  );
}
