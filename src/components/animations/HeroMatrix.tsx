"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a full-screen Matrix digital rain animation on an HTML5 canvas,
 * featuring interactive mouse-proximity glow highlights and trail fade effects.
 */
export default function HeroMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Matrix configuration
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];
    
    // Resize handler
    /**
     * Recalculates canvas dimensions and matrix column drop staggers on viewport resize.
     */
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = prefersReducedMotion ? Math.floor(Math.random() * (canvas.height / fontSize)) : Math.random() * -100;
      }
      if (prefersReducedMotion) {
        draw();
      }
    };

    // Mouse tracking for proximity-based glow interaction
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (prefersReducedMotion) {
        draw();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%.";

    // Animation Loop
    const draw = () => {
      // Semi-transparent black to create trailing effect (opaque when static)
      ctx.fillStyle = prefersReducedMotion ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Calculate distance from mouse
        const dropX = i * fontSize;
        const dropY = drops[i] * fontSize;
        const dx = dropX - mouseX;
        const dy = dropY - mouseY;
        const distSq = dx * dx + dy * dy;
        const radius = 150;
        const radiusSq = radius * radius;

        // If mouse is near, light up the character and push it slightly
        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          ctx.fillStyle = `rgba(57, 255, 20, ${1 - dist / 150})`; // glow-green
          // Optional: Add a subtle text shadow for local glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(57, 255, 20, 0.8)";
        } else {
          ctx.fillStyle = "rgba(57, 255, 20, 0.15)"; // faint background matrix
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, dropX, dropY);

        if (!prefersReducedMotion) {
          // Reset drop to top randomly
          if (dropY > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i]++;
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-[-1] opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
