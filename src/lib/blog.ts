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
};

const LOGS_DIR = path.join(process.cwd(), "content/logs");

// Extremely lightweight custom frontmatter parser to avoid external dependencies blocking CI
function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\n([\s\S]*?)\n---/;
  const match = frontmatterRegex.exec(fileContent);
  
  let data: any = {};
  let content = fileContent;

  if (match) {
    const fmString = match[1];
    content = fileContent.replace(match[0], "").trim();
    
    fmString.split("\n").forEach((line) => {
      const [key, ...values] = line.split(":");
      if (key && values.length > 0) {
        let val = values.join(":").trim();
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
      };
    })
    // Sort logs descending by date
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return posts;
}

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
  };
}
