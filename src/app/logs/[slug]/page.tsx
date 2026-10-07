import { notFound } from "next/navigation";
import Link from "next/link";
import { getLogBySlug, getLogs } from "@/lib/blog";
import ShareCaseStudyButton from "@/components/ShareCaseStudyButton";
import { ArrowLeft, ChevronRight, Terminal } from "lucide-react";

export async function generateStaticParams() {
  const posts = await getLogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getLogBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.title} | Execution Log`,
    description: post.excerpt,
  };
}

/**
 * Renders an individual Markdown execution log article page, converting light Markdown content
 * into styled HTML headers, code blocks, and formatted paragraph blocks.
 */
export default async function LogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getLogBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getLogs();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevIndex = (currentIndex - 1 + allPosts.length) % allPosts.length;
  const nextIndex = (currentIndex + 1) % allPosts.length;

  const prevPost = allPosts.length > 1 ? allPosts[prevIndex] : null;
  const nextPost = allPosts.length > 1 ? allPosts[nextIndex] : null;

  // A very lightweight parser to map basic markdown syntax to HTML classes safely without installing heavy libraries
  //Supports Headers, Bold, Italic, CodeBlocks, Inline Code, blockquotes
  const parseMarkdownBasic = (content: string) => {
    const html = content
      .replace(/^### (.*$)/gim, '<h3 class="font-display text-2xl text-white mt-12 mb-6 tracking-wide">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="font-display text-3xl text-glow-green mt-16 mb-8 uppercase tracking-widest">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="font-display text-4xl text-white mt-8 mb-8">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-secondary">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="font-mono text-sm bg-surface text-glow-green px-1.5 py-0.5 rounded border border-white/10">$1</code>')
      .replace(/```(.*?)\n([\s\S]*?)```/gm, '<pre class="bg-[#0A0A0A] p-4 md:p-6 rounded-xl border border-white/10 overflow-x-auto my-8 font-mono text-sm shadow-inner overflow-hidden relative"><div class="absolute inset-0 bg-gradient-to-b from-transparent via-glow-green/5 to-transparent h-[10px] w-full animate-[scan_2s_linear_infinite] pointer-events-none"></div><code class="text-glow-silver text-xs break-pre block text-left">$2</code></pre>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-2 border-glow-green pl-6 py-2 my-8 italic text-secondary bg-glow-green/5">$1</blockquote>')
      .replace(/^\s*\n/gm, '</p><p class="font-sans text-secondary leading-relaxed mb-6 text-sm md:text-base">');

    return `<p class="font-sans text-secondary leading-relaxed mb-6 text-sm md:text-base">${html}</p>`;
  };

  return (
    <main className="min-h-screen bg-background text-primary pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-start justify-center">
        <div className="absolute top-[10%] w-[80vw] md:w-[60vw] h-[80vw] md:h-[60vw] bg-glow-green rounded-full blur-[200px] opacity-5 mix-blend-screen" />
      </div>

      <div className="max-w-[800px] mx-auto relative z-10 flex flex-col gap-16">
        <header className="flex flex-col gap-6 border-b border-surface pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <Link href="/logs" className="font-mono text-xs text-secondary hover:text-white transition-colors inline-flex items-center gap-2 w-max">
              <span className="text-glow-green">&lt;</span> cd ../logs
            </Link>
            <ShareCaseStudyButton title={post.title} slug={post.slug} basePath="logs" variant="compact" />
          </div>

          <div className="flex flex-wrap gap-4 items-center font-mono text-xs text-secondary">
            <div className="flex items-center gap-2 px-3 py-1 bg-surface border border-white/5 rounded-full text-glow-silver">
              <span className="w-2 h-2 rounded-full bg-glow-green shadow-[0_0_8px_rgba(57,255,20,0.8)]" />
              AUTHORIZED_PROTOCOL
            </div>
            <time className="tracking-widest">{post.date}</time>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded border border-glow-green/30 bg-glow-green/10 text-glow-green font-mono text-[11px] tracking-wider flex items-center gap-1">
              ⚡ {post.readingTime}
            </span>
          </div>

          <h1 className="font-display text-[clamp(2rem,6vw,4rem)] text-white tracking-tighter leading-none uppercase mt-4 text-glow-green hover:text-white transition-colors">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map(tag => (
              <span key={tag} className="font-mono text-[10px] px-2.5 py-1 bg-white/5 border border-white/10 text-glow-silver rounded uppercase tracking-wider">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <article
          className="prose prose-invert prose-p:text-secondary max-w-none prose-headings:font-display w-full"
          dangerouslySetInnerHTML={{ __html: parseMarkdownBasic(post.content) }}
        />

        {/* Dual Next & Previous Log Post Navigation Carousel Cards */}
        {(prevPost || nextPost) && (
          <section className="flex flex-col gap-4 border-t border-surface pt-10">
            <div className="flex items-center justify-between pb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-secondary flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-glow-green" />
                <span>CONTINUE READING // EXECUTION_LOGS</span>
              </span>
              <Link
                href="/logs"
                className="font-mono text-xs text-glow-silver/70 hover:text-glow-green transition-colors"
              >
                [ VIEW ALL LOGS ]
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Previous Log Card */}
              {prevPost ? (
                <Link
                  href={`/logs/${prevPost.slug}`}
                  className="group p-5 bg-black/40 border border-white/10 hover:border-glow-green/60 rounded-xl transition-all duration-300 flex flex-col justify-between gap-3 relative overflow-hidden backdrop-blur-md hover:bg-white/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]"
                >
                  <div className="absolute top-0 left-0 w-28 h-28 bg-glow-green/5 rounded-full blur-[35px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-secondary">
                    <span className="inline-flex items-center gap-1.5 text-glow-green group-hover:-translate-x-1 transition-transform">
                      <ArrowLeft className="w-3 h-3" />
                      <span>PREVIOUS LOG</span>
                    </span>
                    <span className="text-secondary/60">⚡ {prevPost.readingTime}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-base sm:text-lg text-white font-bold group-hover:text-glow-green transition-colors line-clamp-2">
                      {prevPost.title}
                    </h3>
                    <p className="font-sans text-xs text-secondary/70 line-clamp-2 leading-relaxed">
                      {prevPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-[9px] text-secondary/70">
                    <span>{prevPost.date}</span>
                    <span className="text-glow-green uppercase">{prevPost.status}</span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {/* Next Log Card */}
              {nextPost ? (
                <Link
                  href={`/logs/${nextPost.slug}`}
                  className="group p-5 bg-black/40 border border-white/10 hover:border-glow-green/60 rounded-xl transition-all duration-300 flex flex-col justify-between gap-3 relative overflow-hidden backdrop-blur-md hover:bg-white/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-glow-green/5 rounded-full blur-[35px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-secondary">
                    <span className="text-secondary/60">⚡ {nextPost.readingTime}</span>
                    <span className="inline-flex items-center gap-1.5 text-glow-green group-hover:translate-x-1 transition-transform">
                      <span>NEXT LOG</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-base sm:text-lg text-white font-bold group-hover:text-glow-green transition-colors line-clamp-2">
                      {nextPost.title}
                    </h3>
                    <p className="font-sans text-xs text-secondary/70 line-clamp-2 leading-relaxed">
                      {nextPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-[9px] text-secondary/70">
                    <span>{nextPost.date}</span>
                    <span className="text-glow-green uppercase">{nextPost.status}</span>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </section>
        )}

        <div className="border-t border-surface pt-8 flex flex-wrap gap-4 justify-between items-center font-mono text-xs text-secondary">
          <div className="flex items-center gap-4">
            <span>{"// END OF TRANSMISSION"}</span>
            <ShareCaseStudyButton title={post.title} slug={post.slug} basePath="logs" variant="compact" />
          </div>
          <Link href="/logs" className="text-glow-green hover:text-white transition-colors">
            RETURN_TO_INDEX
          </Link>
        </div>
      </div>
    </main>
  );
}
