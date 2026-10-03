"use client";

import dynamic from "next/dynamic";

const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });
const TerminalOverlay = dynamic(() => import("@/components/TerminalOverlay"), { ssr: false });
const KonamiCode = dynamic(() => import("@/components/KonamiCode"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), { ssr: false });

// Dedicated client-side wrapper to group client-only overlays and prevent Next.js
// hydration mismatches, since next/dynamic with { ssr: false } cannot be used
// directly within Next.js Server Components like layout.tsx.
/**
 * Groups client-only interactive portal overlays (CommandPalette, TerminalOverlay, KonamiCode, ScrollProgress, ScrollToTop)
 * dynamically loaded with { ssr: false } to bypass server layout compilation mismatches.
 */
export default function ClientOnlyOverlays() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <CommandPalette />
      <TerminalOverlay />
      <KonamiCode />
    </>
  );
}
