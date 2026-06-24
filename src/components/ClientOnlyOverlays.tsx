"use client";

import dynamic from "next/dynamic";

const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });
const TerminalOverlay = dynamic(() => import("@/components/TerminalOverlay"), { ssr: false });
const KonamiCode = dynamic(() => import("@/components/KonamiCode"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });

// Dedicated client-side wrapper to group client-only overlays and prevent Next.js
// hydration mismatches, since next/dynamic with { ssr: false } cannot be used
// directly within Next.js Server Components like layout.tsx.
export default function ClientOnlyOverlays() {
  return (
    <>
      <ScrollProgress />
      <CommandPalette />
      <TerminalOverlay />
      <KonamiCode />
    </>
  );
}
