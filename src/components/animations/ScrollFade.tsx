"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

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
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: viewportMargin as any }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
