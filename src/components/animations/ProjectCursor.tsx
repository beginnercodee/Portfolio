"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function ProjectCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Detect if the mouse is currently over a project card using closest()
      const target = e.target as HTMLElement;
      if (target.closest('[data-project-id]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Optimization loop using rAF to push motion values
    const updateMotionValues = () => {
      mouseX.set(targetX);
      mouseY.set(targetY);
      animationFrameId = requestAnimationFrame(updateMotionValues);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    updateMotionValues();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      className="fixed top-0 left-0 z-[100] flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        animate={{
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative flex items-center justify-center w-24 h-24 -ml-12 -mt-12 bg-glow-green/90 backdrop-blur-sm rounded-full mix-blend-difference shadow-[0_0_30px_rgba(57,255,20,0.8)]"
      >
        <span className="font-mono text-[10px] font-bold text-black tracking-widest text-center">
          EXPLORE<br/>SYS
        </span>
      </motion.div>
    </motion.div>
  );
}
