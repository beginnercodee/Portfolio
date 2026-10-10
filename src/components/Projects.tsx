"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ScrollScale } from "./animations/ScrollScale";
import ProjectCursor from "./animations/ProjectCursor";
import Link from "next/link";
import { Github, Filter, Sparkles, Layers } from "lucide-react";

interface Project {
  title: string;
  category: "ai-automation" | "full-stack";
  tech: string;
  desc: string;
  image: string;
  link: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "CodeSprint.",
    category: "full-stack",
    tech: "Next.js, NestJS, Postgres, Judge0, Gemini API",
    desc: "AI-powered competitive programming and learning platform featuring real-time code evaluation with Judge0 CE, BullMQ, and Socket.IO. Selected as Finalist at ASPIRE Pakistan Startup Hub.",
    image: "/projects/codesprint.jpg",
    link: "https://code-sprint.com/",
    github: "https://github.com/CodeSprint-ai/Code-Sprint",
  },
  {
    title: "AI Resume Tailor.",
    category: "ai-automation",
    tech: "Next.js 16, TypeScript, Gemini API, Tailwind CSS, jsPDF",
    desc: "AI-powered ATS resume optimization engine that parses candidate resumes and dynamically aligns keywords, experience, and quantifiable metrics with job descriptions for instant formatted PDF export.",
    image: "/projects/ai-resumetailor.jpg",
    link: "https://ai-resumetailor-sage.vercel.app/",
    github: "https://github.com/beginnercodee/ai-resumetailor",
  },
  {
    title: "Nexium Blog Summarizer.",
    category: "full-stack",
    tech: "Next.js, Supabase, MongoDB, Tailwind CSS",
    desc: "Full-stack blog summarization platform enabling persistent AI summary retrieval with dual-database architecture storing metadata in MongoDB and content in Supabase.",
    image: "/projects/nexium-blog.jpg",
    link: "https://nexium-blog-summariser.vercel.app/",
    github: "https://github.com/beginnercodee/Nexium_Jamal_Assign2",
  },
  {
    title: "NexiumQuotes AI Engine.",
    category: "ai-automation",
    tech: "Next.js, Gemini API, Supabase, Tailwind CSS",
    desc: "Architected an AI-powered content generation engine using the Google Gemini API and Next.js, replacing legacy static datasets with real-time, context-aware dynamic generation.",
    image: "/projects/nexium-quotes.jpg",
    link: "https://nexium-quotes.vercel.app/",
    github: "https://github.com/beginnercodee/Nexium_Jamal_Assign1",
  },
];

/**
 * Renders the Selected Works / Projects grid displaying interactive project cards,
 * tech stack labels, custom hover cursors, and routing links to external repos or logs.
 */
export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "ai-automation" | "full-stack">("all");

  const categories = [
    { id: "all", label: "ALL WORK", icon: Layers, count: projects.length },
    { id: "ai-automation", label: "AI & AUTOMATION", icon: Sparkles, count: projects.filter(p => p.category === "ai-automation").length },
    { id: "full-stack", label: "FULL-STACK / WEB APPS", icon: Filter, count: projects.filter(p => p.category === "full-stack").length },
  ] as const;

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="px-6 md:px-12 py-16 md:py-24 max-w-[1440px] mx-auto z-30 relative">
      <ProjectCursor />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-glow-green block mb-2">
            // PORTFOLIO_INDEX
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-primary opacity-90 uppercase tracking-widest hover:text-glow-green hover:opacity-100 transition-all duration-500 cursor-pointer">
            SELECTED WORKS /
          </h2>
        </div>

        {/* Cyber Category Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
          {categories.map((tab) => {
            const isActive = selectedCategory === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`group px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all duration-300 flex items-center gap-2 border select-none ${
                  isActive
                    ? "bg-glow-green/15 border-glow-green text-glow-green shadow-[0_0_20px_rgba(57,255,20,0.25)] font-bold"
                    : "bg-transparent border-transparent text-secondary hover:text-white hover:bg-white/5"
                }`}
                aria-label={`Filter by ${tab.label}`}
              >
                <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? "text-glow-green" : "text-secondary group-hover:text-white"}`} />
                <span>[ {tab.label} ]</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans ${
                  isActive ? "bg-glow-green/20 text-glow-green font-bold" : "bg-white/5 text-secondary/60 group-hover:text-secondary"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8">
        {filteredProjects.map((proj, idx) => (
          <ScrollScale
            key={proj.title}
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

                {/* Floating Action Links */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8 z-30 pointer-events-auto flex items-center gap-2">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${proj.title} GitHub Repository`}
                      className="font-mono text-[10px] md:text-xs flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-white/20 px-2.5 py-1.5 rounded-sm hover:border-glow-green hover:text-glow-green opacity-90 hover:opacity-100 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_0_12px_rgba(57,255,20,0.25)] group/gh"
                      title="View Source Code"
                    >
                      <Github className="w-3.5 h-3.5 text-secondary group-hover/gh:text-glow-green transition-colors" />
                      <span className="hidden sm:inline-block">[ CODE ]</span>
                    </a>
                  )}

                  {proj.link.startsWith("http") ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${proj.title} Live Application`}
                      className="font-mono text-[10px] md:text-xs flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-white/20 px-2.5 sm:px-3 py-1.5 rounded-sm hover:border-glow-green hover:text-glow-green opacity-90 hover:opacity-100 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_0_12px_rgba(57,255,20,0.25)] group/btn"
                    >
                      <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity -mr-1 hidden md:inline-block">⚡ </span>
                      <span className="group-hover/btn:hidden">[ LIVE ]</span>
                      <span className="hidden group-hover/btn:inline-block">EXECUTE SYS</span>
                    </a>
                  ) : (
                    <Link
                      href={proj.link}
                      aria-label={`${proj.title} Details`}
                      className="font-mono text-[10px] md:text-xs flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-white/20 px-2.5 sm:px-3 py-1.5 rounded-sm hover:border-glow-green hover:text-glow-green opacity-90 hover:opacity-100 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_0_12px_rgba(57,255,20,0.25)] group/btn"
                    >
                      <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity -mr-1 hidden md:inline-block">⚡ </span>
                      <span className="group-hover/btn:hidden">[ LOG ]</span>
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
