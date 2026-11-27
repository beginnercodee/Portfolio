"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

/**
 * A reusable scroll-triggered fade and translation animation component powered by Framer Motion.
 * Triggers once when scrolled into view with customizable offset axes, duration, and viewport margins.
 * Respects user OS and browser reduced motion preferences for accessibility (WCAG 2.3.3).
 */
export function ScrollFade({
  children,
  x = 0,
  y = 0,
  delay = 0,
  duration = 0.6,
  className = "",
  viewportMargin = "0px"
}: {
  children: ReactNode;
  x?: number;
  y?: number;
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: shouldReduceMotion ? 0 : x,
        y: shouldReduceMotion ? 0 : y,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration,
        delay: shouldReduceMotion ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}