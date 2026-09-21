// app/(support)/[collection]/page.tsx
import { notFound } from "next/navigation";
import { getCollectionMeta, getArticlesMeta } from "@/lib/guides";
import CollectionGrid from "../../../components/collection/CollectionGrid";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: collectionSlug } = await params;
  const collection = getCollectionMeta(collectionSlug);
  
  if (!collection) notFound();

  // Fetch all articles on the server
  const articles = getArticlesMeta(collectionSlug);

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* 1. Set explicit height and make the parent the flex container */}
      <div className="bg-cream w-full h-[500px] flex items-center justify-center px-6">
        <div className="mx-auto max-w-5xl text-center">
            {/* 2. Changed to <h1> for better SEO and accessibility */}
            <span className="text-6xl font-regular tracking-tight text-black font-serif">
                {collection.title}
            </span>
        </div>
      </div>

      {/* Pass data to interactive Client Component */}
      <CollectionGrid articles={articles} collectionSlug={collectionSlug} />
      <Footer />
    </main>
  );
}