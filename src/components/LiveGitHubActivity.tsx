"use client";

import dynamic from "next/dynamic";

const LiveGitHubActivityClient = dynamic(() => import("./LiveGitHubActivityClient"), { ssr: false });

/**
 * Renders the Live GitHub Activity wrapper component.
 * Dynamically imports the client component with SSR disabled to prevent hydration mismatches.
 */
export default function LiveGitHubActivity() {
  return (
    <section className="px-6 md:px-12 py-10 md:py-16 max-w-[1000px] mx-auto z-30 relative">
      <LiveGitHubActivityClient />
    </section>
  );
}
