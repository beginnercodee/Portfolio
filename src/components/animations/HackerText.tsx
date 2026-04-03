"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function HackerText({ text }: { text: string }) {
  // Initialize with completely garbled text matching the exact length of the original title
  const [displayText, setDisplayText] = useState(() => 
    text.split('').map(c => c === ' ' ? ' ' : LETTERS[Math.floor(Math.random() * LETTERS.length)]).join('')
  );
  
  const containerRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -50px 0px" });
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!isInView || hasRun) return;

    setHasRun(true);
    let iterations = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            // Keep spaces intact
            if (text[index] === " ") return " ";
            
            // If iteration has passed this index, lock in the correct character
            if (index < iterations) {
              return text[index];
            }

            // Otherwise, render a random hacking character
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      // Increase iterations slowly so decryption moves from left to right
      if (iterations >= maxIterations) {
        clearInterval(interval);
      }
      
      iterations += 1 / 3; // Fractional increment creates the matrix stutter effect
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text, hasRun]);

  return (
    <h3 
      ref={containerRef}
      className="font-sans text-xl font-bold text-primary mb-3 group-hover:text-glow-green transition-colors"
    >
      {displayText}
    </h3>
  );
}
