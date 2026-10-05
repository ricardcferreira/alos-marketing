import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const RESEARCH_DIR = path.join(process.cwd(), "content/research");

export interface ResearchMeta {
  slug: string;
  title: string;
  type: string;
  date: string;
  leadWallTitle: string;
  description?: string;
  readTime?: string;
  image?: string;  
}

export interface ResearchArticle extends ResearchMeta {
  html: string;
}

function getResearchFiles(): string[] {
  if (!fs.existsSync(RESEARCH_DIR)) return [];
  return fs.readdirSync(RESEARCH_DIR).filter((f) => f.endsWith(".md"));
}

export function getAllResearchMeta(): ResearchMeta[] {
  return getResearchFiles()
    .map((file) => {
      const raw = fs.readFileSync(path.join(RESEARCH_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title as string,
        type: data.type as string,
        date: data.date as string,
        leadWallTitle: data.leadWallTitle as string,
        description: data.description as string | undefined,
        readTime: data.readTime as string | undefined, 
        image: data.image as string | undefined,    
        };
    })
    // Sort by date (newest first)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getResearchArticle(slug: string): Promise<ResearchArticle | undefined> {
  const filePath = path.join(RESEARCH_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true }) 
    .use(rehypeRaw)                                  
    .use(rehypeSlug)                                 
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title as string,
    type: data.type as string,
    date: data.date as string,
    leadWallTitle: data.leadWallTitle as string,
    description: data.description as string | undefined,
    html: processed.toString(),
  };
}