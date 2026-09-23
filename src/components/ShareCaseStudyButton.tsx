"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareCaseStudyButtonProps {
  title: string;
  slug: string;
  variant?: "header" | "compact";
}

/**
 * Renders an interactive button to copy or natively share a case study link
 * with immediate clipboard feedback and tactile visual states.
 */
export default function ShareCaseStudyButton({
  title,
  slug,
  variant = "header",
}: ShareCaseStudyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/case-studies/${slug}`
        : `https://jamalnadeem.com/case-studies/${slug}`;

    // Mobile web share API support
    if (navigator.share && window.innerWidth < 768) {
      try {
        await navigator.share({
          title: `${title} | Jamal Nadeem`,
          text: `Check out this technical architecture case study: ${title}`,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleShare}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer",
          copied
            ? "border-glow-green bg-glow-green/20 text-glow-green shadow-[0_0_15px_rgba(57,255,20,0.3)]"
            : "border-white/10 bg-white/5 text-secondary hover:text-white hover:border-white/30"
        )}
        title="Share or Copy Case Study URL"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-glow-green" />
            <span>COPIED [✓]</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            <span>SHARE</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleShare}
      className={cn(
        "group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-full border font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md",
        copied
          ? "border-glow-green bg-glow-green/20 text-glow-green shadow-[0_0_20px_rgba(57,255,20,0.35)]"
          : "border-white/15 bg-black/60 text-secondary hover:text-glow-green hover:border-glow-green/40 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
      )}
      title="Share or Copy Case Study URL"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-glow-green shrink-0 animate-bounce" />
          <span className="text-glow-green font-bold">LINK COPIED [✓]</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 shrink-0 text-glow-green" />
          <span className="group-hover:text-white transition-colors">[ SHARE LINK ]</span>
        </>
      )}
    </button>
  );
}
