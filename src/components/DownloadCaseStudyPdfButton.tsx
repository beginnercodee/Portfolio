"use client";

import { useState } from "react";
import { FileDown, Check, Loader2 } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import { generateCaseStudyPdf } from "@/lib/generateCaseStudyPdf";

interface DownloadCaseStudyPdfButtonProps {
  caseStudy: CaseStudy;
  variant?: "header" | "floating" | "compact";
}

export default function DownloadCaseStudyPdfButton({
  caseStudy,
  variant = "header",
}: DownloadCaseStudyPdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      // Small timeout to allow UI to render the loading state smoothly
      await new Promise((resolve) => setTimeout(resolve, 80));
      generateCaseStudyPdf(caseStudy);
      setIsDownloaded(true);
      setTimeout(() => {
        setIsDownloaded(false);
      }, 3500);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        title="Download Case Study as PDF"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-glow-green/40 bg-glow-green/10 text-glow-green hover:bg-glow-green hover:text-black font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_12px_rgba(57,255,20,0.15)] hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] disabled:opacity-50 cursor-pointer"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>EXPORTING...</span>
          </>
        ) : isDownloaded ? (
          <>
            <Check className="w-3.5 h-3.5 text-glow-green" />
            <span>DOWNLOADED</span>
          </>
        ) : (
          <>
            <FileDown className="w-3.5 h-3.5" />
            <span>PDF EXPORT</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="group relative inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full border border-glow-green/40 bg-black/60 backdrop-blur-md text-glow-green hover:bg-glow-green hover:text-black font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.15)] hover:shadow-[0_0_25px_rgba(57,255,20,0.5)] disabled:opacity-60 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-glow-green/10 via-glow-green/20 to-glow-green/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-glow-green group-hover:text-black shrink-0" />
          <span>COMPILING_VECTOR_PDF...</span>
        </>
      ) : isDownloaded ? (
        <>
          <Check className="w-4 h-4 text-glow-green group-hover:text-black shrink-0" />
          <span>PDF_SAVED [✓]</span>
        </>
      ) : (
        <>
          <FileDown className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 shrink-0" />
          <span>[ DOWNLOAD PDF BRIEFING ]</span>
        </>
      )}
    </button>
  );
}
