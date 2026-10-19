import { Metadata } from "next"; // <-- Added Metadata import
import { notFound } from "next/navigation";
import { getResearchArticle, getAllResearchMeta } from "@/lib/research";
import ResearchClientPage from "../ResearchClientPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getResearchArticle(slug);

  if (!study) {
    return {
      title: "Estudo não encontrado - Alos Health",
    };
  }

  return {
    title: `${study.title} — Alos Health`,
    description: study.leadWallTitle,
    openGraph: {
      title: `${study.title} — Alos Health`,
      description: study.leadWallTitle,
      url: `https://aloshealth.com/research/${slug}`,
      siteName: "Alos Health",
      images: [
        {
          url: "https://aloshealth.com/metadata/og-tempo-de-cuidar.png", 
          width: 1200,
          height: 627,
          alt: `Capa do Estudo: ${study.title}`,
        },
      ],
      locale: "pt_PT",
      type: "article",
    },
  };
}

// Generates the static HTML pages at build time for ultimate speed and SEO
export async function generateStaticParams() {
  const studies = getAllResearchMeta();
  return studies.map((study) => ({
    slug: study.slug,
  }));
}

export default async function ResearchStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getResearchArticle(slug);

  if (!study) notFound();

  // Pass the markdown data to the interactive client component
  return <ResearchClientPage study={study} />;
}