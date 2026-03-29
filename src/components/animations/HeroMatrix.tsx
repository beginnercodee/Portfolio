"use client";

import { useEffect, useRef } from "react";

export default function HeroMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Matrix configuration
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];
    
    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100; // Random starting stagger
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse tracking for parallax and dispersion
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%.";

    // Animation Loop
    const draw = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Calculate distance from mouse
        const dropX = i * fontSize;
        const dropY = drops[i] * fontSize;
        const dx = dropX - mouseX;
        const dy = dropY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // If mouse is near, light up the character and push it slightly
        if (dist < 150) {
          ctx.fillStyle = `rgba(57, 255, 20, ${1 - dist / 150})`; // glow-green
          // Optional: Add a subtle text shadow for local glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(57, 255, 20, 0.8)";
        } else {
          ctx.fillStyle = "rgba(57, 255, 20, 0.15)"; // faint background matrix
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, dropX, dropY);

        // Reset drop to top randomly
        if (dropY > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[-1] opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
