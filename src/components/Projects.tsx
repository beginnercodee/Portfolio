import Image from "next/image";
import { ScrollScale } from "./animations/ScrollScale";
import ProjectCursor from "./animations/ProjectCursor";
import Link from "next/link"; // For upcoming routing implementations

const projects = [
  {
    title: "CodeSprint.",
    tech: "React, GenAI, Web Sockets",
    desc: "An AI-tutoring system for coding competitions. Evaluates logic in real-time, providing immediate, intelligent feedback to competitors.",
    image: "/projects/codesprint.png",
    link: "https://github.com/beginnercodee",
  },
  {
    title: "Automated Outreach Engine.",
    tech: "GoHighLevel, n8n, Supabase",
    desc: "End-to-end client acquisition system built for a Consulting Agency and a dental clinic, completely removing manual pipeline management.",
    image: "/projects/outreach-engine.png",
    link: "/logs",
  },
  {
    title: "Custom Quote Generator.",
    tech: "Next.js, Supabase, Tailwind",
    desc: "A dynamic, high-performance web tool engineered to replace legacy Excel-based quoting flows with real-time database synchronization.",
    image: "/projects/quote-generator.png",
    link: "https://github.com/beginnercodee",
  },
  {
    title: "Intelligent PDF Engine.",
    tech: "Python, Flask, Webhooks",
    desc: "Automated PDF generation system integrating directly with GoHighLevel via webhooks to instantly update CRM contact records.",
    image: "/projects/pdf-engine.png",
    link: "https://github.com/beginnercodee",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-12 py-16 md:py-24 max-w-[1440px] mx-auto z-30 relative">
      <ProjectCursor />
      <h2 className="font-display text-3xl md:text-4xl text-primary mb-12 md:mb-16 opacity-80 uppercase tracking-widest text-center md:text-left hover:text-glow-green hover:opacity-100 transition-all duration-500 cursor-pointer">
        SELECTED WORKS /
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8">
        {projects.map((proj, idx) => (
          <ScrollScale
            key={idx}
            delay={idx * 0.1}
            duration={0.5}
            className="w-full h-full"
          >
            {/* Added data attribute and custom cursor wrapper */}
            <div data-project-id={idx} className="relative aspect-[4/5] md:aspect-[4/3] bg-base border border-surface md:hover:border-glow-green/30 md:hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] overflow-hidden group rounded-2xl md:cursor-none transition-all duration-500">
            {/* Added subtle glow on hover */}
            <div className="absolute inset-0 bg-glow-green/20 opacity-0 md:group-hover:opacity-10 blur-3xl transition-opacity duration-700 z-10 pointer-events-none" />
            
            {/* Project Image */}
            <Image 
              src={proj.image} 
              alt={proj.title}
              fill
              className="object-cover md:grayscale md:group-hover:grayscale-0 scale-100 md:group-hover:scale-[1.02] transition-all duration-700 z-0"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Lower gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 md:via-black/50 to-transparent flex flex-col justify-end p-6 md:p-8 z-20 pointer-events-none">
              
              {/* Floating Action Link */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 z-30 pointer-events-auto">
                 {proj.link.startsWith("http") ? (
                   <a 
                     href={proj.link} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="font-mono text-[10px] md:text-xs flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-sm hover:border-glow-green hover:text-glow-green transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 group/btn"
                   >
                     <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity -mr-1 hidden md:inline-block">↗ </span>
                     <span className="md:hidden group-hover/btn:hidden">[ ... ]</span>
                     <span className="hidden md:inline-block group-hover/btn:hidden">[ RUN ]</span>
                     <span className="hidden group-hover/btn:inline-block">EXECUTE SYS</span>
                   </a>
                 ) : (
                   <Link 
                     href={proj.link} 
                     className="font-mono text-[10px] md:text-xs flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-sm hover:border-glow-green hover:text-glow-green transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 group/btn"
                   >
                     <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity -mr-1 hidden md:inline-block">↗ </span>
                     <span className="md:hidden group-hover/btn:hidden">[ ... ]</span>
                     <span className="hidden md:inline-block group-hover/btn:hidden">[ LOG ]</span>
                     <span className="hidden group-hover/btn:inline-block">VIEW DATA</span>
                   </Link>
                 )}
              </div>

              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-primary mb-2 md:mb-3 font-bold tracking-tight shadow-black drop-shadow-lg">
                {proj.title}
              </h3>
              <p className="font-mono text-[9px] sm:text-[11px] uppercase tracking-widest text-glow-green mb-3 md:mb-5 flex items-center gap-2 drop-shadow-md">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-glow-green animate-pulse shrink-0" /> {proj.tech}
              </p>
              
              {/* Description - always visible on mobile, hover-only on desktop */}
              <div className="overflow-hidden h-auto opacity-100 md:h-0 md:group-hover:h-auto md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                <p className="font-sans text-[11px] sm:text-xs md:text-body-sm text-secondary pt-2 border-t border-white/10 max-w-md leading-relaxed drop-shadow-md bg-black/60 md:bg-black/40 backdrop-blur-md p-3 md:p-4 rounded-lg mt-2 hidden sm:block">
                  {proj.desc}
                </p>
                <p className="font-sans text-[11px] text-secondary leading-relaxed bg-black/60 backdrop-blur-md p-3 rounded-lg mt-1 sm:hidden">
                  {proj.desc}
                </p>
              </div>
            </div>
            </div>
          </ScrollScale>
        ))}
      </div>
    </section>
  );
}
