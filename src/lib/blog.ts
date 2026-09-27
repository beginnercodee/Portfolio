import fs from "fs";
import path from "path";

export type LogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
  status: string;
  readingTime: string;
};

const LOGS_DIR = path.join(process.cwd(), "content/logs");

interface Frontmatter {
  title?: string;
  date?: string;
  tags?: string[];
  excerpt?: string;
  status?: string;
  [key: string]: string | string[] | undefined;
}

/**
 * Lightweight custom frontmatter parser to extract YAML-style key-value metadata
 * and body markdown text without external dependency overhead.
 */
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\n([\s\S]*?)\n---/;
  const match = frontmatterRegex.exec(fileContent);
  
  const data: Frontmatter = {};
  let content = fileContent;

  if (match) {
    const fmString = match[1];
    content = fileContent.replace(match[0], "").trim();
    
    fmString.split("\n").forEach((line) => {
      const [key, ...values] = line.split(":");
      if (key && values.length > 0) {
        const val = values.join(":").trim();
        // Handle array parsing like tags: [AI, Next.js]
        if (val.startsWith("[") && val.endsWith("]")) {
          data[key.trim()] = val.slice(1, -1).split(",").map(s => s.trim().replace(/^['"]|['"]$/g, ''));
        } else {
          data[key.trim()] = val.replace(/^['"]|['"]$/g, '');
        }
      }
    });
  }

  return { data, content };
}

/**
 * Calculates estimated reading time in minutes based on ~200 words per minute.
 */
export function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} MIN READ`;
}

/**
 * Reads all Markdown execution log posts from the local content directory,
 * parses frontmatter metadata, and returns them sorted descending by date.
 */
export async function getLogs(): Promise<LogPost[]> {
  if (!fs.existsSync(LOGS_DIR)) return [];

  const files = fs.readdirSync(LOGS_DIR);
  
  const posts = files
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const fullPath = path.join(LOGS_DIR, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      const { data, content } = parseFrontmatter(fileContents);
      
      return {
        slug,
        title: data.title || "Untitled Log",
        date: data.date || new Date().toISOString().split("T")[0],
        tags: data.tags || [],
        excerpt: data.excerpt || "No metadata extracted.",
        status: data.status || "VERIFIED",
        content,
        readingTime: calculateReadingTime(content),
      };
    })
    // Sort logs descending by date
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return posts;
}

/**
 * Retrieves a single execution log post by its URL slug.
 */
export async function getLogBySlug(slug: string): Promise<LogPost | null> {
  const fullPath = path.join(LOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = parseFrontmatter(fileContents);

  return {
    slug,
    title: data.title || "Untitled Log",
    date: data.date || new Date().toISOString().split("T")[0],
    tags: data.tags || [],
    excerpt: data.excerpt || "No metadata extracted.",
    status: data.status || "VERIFIED",
    content,
    readingTime: calculateReadingTime(content),
  };
}
