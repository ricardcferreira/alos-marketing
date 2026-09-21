// lib/guides.ts
//
// Reads guide content from content/guides/. Plain Markdown + frontmatter,
// not MDX — no JSX embedded in article bodies, so a future migration to
// Intercom (or anywhere else) is a content copy, not a rewrite. This file
// is the only place that knows about the filesystem layout; pages below
// only ever call these functions.

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import collectionsManifest from "@/content/guides/collections.json";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const GUIDES_DIR = path.join(process.cwd(), "content/guides");

export interface CollectionMeta {
  slug: string;
  title: string;
  description: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  section?: string; 
  order?: number;
  authorName?: string;
  authorAvatar?: string;
  date?: string;
  readTime?: string;
  image?: string;
}

export interface Article extends ArticleMeta {
  collectionSlug: string;
  html: string;
}

export function getCollections(): CollectionMeta[] {
  return collectionsManifest as CollectionMeta[];
}

export function getCollectionMeta(slug: string): CollectionMeta | undefined {
  return getCollections().find((c) => c.slug === slug);
}

function articleFiles(collectionSlug: string): string[] {
  const dir = path.join(GUIDES_DIR, collectionSlug);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

export function getArticlesMeta(collectionSlug: string): ArticleMeta[] {
  return articleFiles(collectionSlug)
    .map((file) => {
      const raw = fs.readFileSync(path.join(GUIDES_DIR, collectionSlug, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title as string,
        description: data.description as string,
        section: data.section as string | undefined,
        order: (data.order as number | undefined) ?? 0,
        authorName: data.authorName as string | undefined,
        authorAvatar: data.authorAvatar as string | undefined,
        date: data.date as string | undefined,
        readTime: data.readTime as string | undefined,
        image: data.image as string | undefined,
      };
    })
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getArticleCount(collectionSlug: string): number {
  return articleFiles(collectionSlug).length;
}

export async function getArticle(
  collectionSlug: string,
  articleSlug: string
): Promise<Article | undefined> {
  const filePath = path.join(GUIDES_DIR, collectionSlug, `${articleSlug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  
  // The new robust Markdown pipeline!
  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true }) // Step 1: Let HTML pass through remark
    .use(rehypeRaw)                                  // Step 2: Parse that raw HTML (saves your iframe!)
    .use(rehypeSlug)                                 // Step 3: Auto-adds id="..." to all your H2 and H3 tags for the TOC!
    .use(rehypeStringify)
    .process(content);

  return {
    slug: articleSlug,
    collectionSlug,
    title: data.title as string,
    description: data.description as string,
    section: data.section as string | undefined,
    order: (data.order as number | undefined) ?? 0,
    authorName: data.authorName as string | undefined,
    authorAvatar: data.authorAvatar as string | undefined,
    date: data.date as string | undefined,
    readTime: data.readTime as string | undefined,
    image: data.image as string | undefined,
    
    html: processed.toString(),
  };
}

export function getAllArticleParams(): { collection: string; article: string }[] {
  return getCollections().flatMap((c) =>
    articleFiles(c.slug).map((file) => ({
      collection: c.slug,
      article: file.replace(/\.md$/, ""),
    }))
  );
}