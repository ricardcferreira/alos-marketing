import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionMeta, getArticle, getAllArticleParams } from "@/lib/guides";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import TableOfContents from "@/components/article/TableOfContents";

export function generateStaticParams() {
  return getAllArticleParams();
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ collection: string; article: string }>;
}) {
  const { collection: collectionSlug, article: articleSlug } = await params;
  const collection = getCollectionMeta(collectionSlug);
  const article = await getArticle(collectionSlug, articleSlug);
  if (!collection || !article) notFound();

  return (
    <main className="min-h-screen bg-cream-light">
      <Header />
      
      {/* 1. Widened the main container for the two-column layout */}
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        
        {/* 2. Grid layout: Article takes remaining space (1fr), ToC takes 250px */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: The Article */}
          <div className="max-w-3xl w-full">
            <nav className="text-sm text-gray-500 mb-8">
              <Link href="/" className="hover:text-primary-dark transition-colors">
                Todas as coleções
              </Link>
              <span className="mx-2">›</span>
              <Link href={`/${collectionSlug}`} className="hover:text-primary-dark transition-colors">
                {collection.title}
              </Link>
            </nav>

            <div className="space-y-4 mb-12">
              <h1 className="font-serif text-3xl md:text-5xl text-primary-dark tracking-tight leading-tight">
                {article.title}
              </h1>
              <div className="space-y-0">
                <p className="text-lg text-primary-dark leading-relaxed">{article.description}</p>
                {article.date && (
                  <span className="block text-sm text-gray-500 pt-2">{article.date}</span>
                )}
              </div>
            </div>

            <article
              className="prose prose-neutral max-w-none text-primary-dark leading-relaxed [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-primary-dark [&_h2]:mt-12 [&_h2]:mb-4 [&_a]:text-alos-blue"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </div>

          {/* RIGHT COLUMN: The Sticky Table of Contents */}
          <div className="hidden lg:block sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
            <TableOfContents />
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}