import { notFound } from "next/navigation";
import { getResearchArticle, getAllResearchMeta } from "@/lib/research";
import ResearchClientPage from "../ResearchClientPage";

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