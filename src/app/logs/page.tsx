import Link from "next/link";
import { getLogs } from "@/lib/blog";
import LogsListClient from "@/components/LogsListClient";

export const metadata = {
  title: "Execution Logs | Jamal Nadeem",
  description: "Technical writings, system architectures, and AI automation workflows.",
};

/**
 * Renders the Execution Logs directory index page, fetching and listing all published
 * Markdown technical articles, architecture decisions, and system breakdown logs with client-side tag filtering.
 */
export default async function LogsIndex() {
  const logs = await getLogs();

  return (
    <main className="min-h-screen bg-background text-primary pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-glow-green rounded-full blur-[150px] opacity-10 mix-blend-screen" />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10 flex flex-col gap-12">
        <header className="flex flex-col gap-4 border-b border-surface pb-8">
          <Link href="/" className="font-mono text-xs text-secondary hover:text-glow-green transition-colors inline-block mb-4">
            &lt; cd ../home
          </Link>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter uppercase">
            EXECUTION_LOGS
          </h1>
          <p className="font-mono text-sm text-glow-silver">
            Technical breakdowns, architecture decisions, and autonomous agent experiment notes.
          </p>
        </header>

        {logs.length === 0 ? (
          <div className="font-mono text-secondary opacity-50 border border-dashed border-surface p-12 text-center rounded-xl">
            No active logs found in content partition.
          </div>
        ) : (
          <LogsListClient initialLogs={logs} />
        )}
      </div>
    </main>
  );
}
