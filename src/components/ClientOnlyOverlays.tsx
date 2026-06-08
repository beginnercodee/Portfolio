"use client";

import dynamic from "next/dynamic";

const CommandPalette = dynamic(() => import("@/components/CommandPalette"), { ssr: false });
const TerminalOverlay = dynamic(() => import("@/components/TerminalOverlay"), { ssr: false });
const KonamiCode = dynamic(() => import("@/components/KonamiCode"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });

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
