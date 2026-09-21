// app/(support)/page.tsx
// Server component — the only one here allowed to call lib/guides.ts,
// since that reads the filesystem. Interactive filtering lives in the
// client component below, which only ever receives plain data as props.

import { getCollections, getArticleCount } from "@/lib/guides";
import GuidesHomeClient from "./GuidesHomeClient";

export default function GuidesHome() {
  const collections = getCollections().map((c) => ({
    ...c,
    articleCount: getArticleCount(c.slug),
  }));

  return <GuidesHomeClient collections={collections} />;
}