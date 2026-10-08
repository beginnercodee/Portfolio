"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Terminal, Filter } from "lucide-react";
import type { LogPost } from "@/lib/blog";

interface LogsListClientProps {
  initialLogs: LogPost[];
}

/**
 * Interactive Client Component for Execution Logs Index.
 * Provides real-time cyber tag pill filtering (ALL, dynamic tags, #ARCHIVED, etc.)
 * with active glow states and live count badges without requiring page reloads.
 */
export default function LogsListClient({ initialLogs }: LogsListClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  // Dynamically extract all unique tags across logs (case-preserved)
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    initialLogs.forEach((log) => {
      log.tags.forEach((tag) => tagSet.add(tag));
    });
    return ["ALL", ...Array.from(tagSet)];
  }, [initialLogs]);

  // Real-time filtered logs based on active pill
  const filteredLogs = useMemo(() => {
    if (selectedTag === "ALL") return initialLogs;
    return initialLogs.filter((log) =>
      log.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
    );
  }, [initialLogs, selectedTag]);

  return (
    <div className="flex flex-col gap-10">
      {/* Cyber Tag Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2 font-mono text-xs text-secondary">
          <Filter className="w-3.5 h-3.5 text-glow-green" />
          <span className="uppercase tracking-widest text-[11px]">FILTER_TAGS:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {availableTags.map((tag) => {
            const isActive = selectedTag.toLowerCase() === tag.toLowerCase();
            const tagCount =
              tag === "ALL"
                ? initialLogs.length
                : initialLogs.filter((l) =>
                    l.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
                  ).length;

            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`group px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 flex items-center gap-1.5 border select-none ${
                  isActive
                    ? "bg-glow-green/15 border-glow-green text-glow-green shadow-[0_0_15px_rgba(57,255,20,0.25)] font-bold"
                    : "bg-surface border-white/10 text-secondary hover:text-white hover:border-white/30"
                }`}
              >
                <span>{tag === "ALL" ? "ALL_LOGS" : `#${tag}`}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-glow-green/20 text-glow-green"
                      : "bg-white/5 text-secondary/60 group-hover:text-secondary"
                  }`}
                >
                  {tagCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Logs Grid */}
      {filteredLogs.length === 0 ? (
        <div className="font-mono text-secondary opacity-60 border border-dashed border-surface p-12 text-center rounded-xl flex flex-col items-center gap-2">
          <Terminal className="w-6 h-6 text-glow-green/60" />
          <span>No logs found matching tag #{selectedTag}.</span>
          <button
            onClick={() => setSelectedTag("ALL")}
            className="text-xs text-glow-green hover:underline mt-2 font-mono"
          >
            Reset filter to ALL_LOGS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredLogs.map((post) => (
            <Link
              key={post.slug}
              href={`/logs/${post.slug}`}
              className="group p-6 md:p-8 border border-white/10 bg-black/40 backdrop-blur-md rounded-xl hover:border-glow-green/50 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between min-h-[250px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-glow-green/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between font-mono text-[10px] md:text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-secondary tracking-widest">{post.date}</span>
                    <span className="text-secondary/40">•</span>
                    <span className="text-glow-silver/80 flex items-center gap-1 font-mono text-[10px]">
                      ⚡ {post.readingTime}
                    </span>
                  </div>
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
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTag(tag);
                    }}
                    className={`font-mono text-[9px] px-2.5 py-1 rounded uppercase tracking-wider transition-all ${
                      selectedTag.toLowerCase() === tag.toLowerCase()
                        ? "bg-glow-green/20 border border-glow-green text-glow-green font-bold"
                        : "bg-surface border border-white/5 text-glow-silver hover:border-glow-green/40 hover:text-white"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
