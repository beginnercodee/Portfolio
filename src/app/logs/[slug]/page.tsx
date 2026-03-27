import { notFound } from "next/navigation";
import Link from "next/link";
import { getLogBySlug, getLogs } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getLogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getLogBySlug(params.slug);
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.title} | Execution Log`,
    description: post.excerpt,
  };
}

export default async function LogPost({ params }: { params: { slug: string } }) {
  const post = await getLogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // A very lightweight parser to map basic markdown syntax to HTML classes safely without installing heavy libraries
  // Supports Headers, Bold, Italic, CodeBlocks, Inline Code, blockquotes
  const parseMarkdownBasic = (content: string) => {
    let html = content
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
          <Link href="/logs" className="font-mono text-xs text-secondary hover:text-white transition-colors inline-flex items-center gap-2 mb-2 w-max">
            <span className="text-glow-green">&lt;</span> cd ../logs
          </Link>
          
          <div className="flex flex-wrap gap-4 items-center font-mono text-xs text-secondary">
            <div className="flex items-center gap-2 px-3 py-1 bg-surface border border-white/5 rounded-full text-glow-silver">
              <span className="w-2 h-2 rounded-full bg-glow-green shadow-[0_0_8px_rgba(57,255,20,0.8)]" />
              AUTHORIZED_PROTOCOL
            </div>
            <time className="tracking-widest">{post.date}</time>
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

        <div className="border-t border-surface pt-12 flex justify-between items-center font-mono text-xs mt-16 text-secondary">
          <span>// END OF TRANSMISSION</span>
          <Link href="/logs" className="text-glow-green hover:text-white transition-colors">
            RETURN_TO_INDEX
          </Link>
        </div>
      </div>
    </main>
  );
}
