"use client";

import dynamic from "next/dynamic";

const LiveGitHubActivityClient = dynamic(() => import("./LiveGitHubActivityClient"), { ssr: false });

export default function LiveGitHubActivity() {
  return (
    <section className="px-6 md:px-12 py-10 md:py-16 max-w-[1000px] mx-auto z-30 relative">
      <LiveGitHubActivityClient />
    </section>
  );
}
