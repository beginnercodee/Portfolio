import Link from "next/link";
import { getLogs } from "@/lib/blog";

export const metadata = {
  title: "Execution Logs | Jamal Nadeem",
  description: "Technical writings, system architectures, and AI automation workflows.",
};

export default async function LogsIndex() {
  const logs = await getLogs();

  return (
    <main className="min-h-screen bg-background text-primary pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-glow-green rounded-full blur-[150px] opacity-10 mix-blend-screen" />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10 flex flex-col gap-16">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {logs.map((post) => (
              <Link
                key={post.slug}
                href={`/logs/${post.slug}`}
                className="group p-6 md:p-8 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl hover:border-glow-green/50 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between min-h-[250px] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-glow-green/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between font-mono text-[10px] md:text-xs">
                    <span className="text-secondary tracking-widest">{post.date}</span>
                    <span className="text-glow-green flex items-center gap-1.5 px-2 py-0.5 border border-glow-green/30 bg-glow-green/10 rounded">
                      <span className="w-1.5 h-1.5 bg-glow-green rounded-full animate-pulse" />
                      {post.status}
                    </span>
                  </div>

                  <h2 className="font-display text-xl md:text-2xl text-white group-hover:text-glow-green transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="font-sans text-sm text-secondary leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                     <span key={tag} className="font-mono text-[9px] px-2 py-1 bg-surface border border-white/5 text-glow-silver rounded uppercase tracking-wider">
                       {tag}
                     </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
