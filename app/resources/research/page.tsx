import { Metadata } from "next";
import ResearchDashboardClient from "./dashboard-client";

// This replaces the HeadContent from TanStack's __root.tsx
export const metadata: Metadata = {
  title: "O Paradigma Digital na Nutrição Clínica",
  description: "Resultados em tempo real do estudo sobre desafios, burocracia e inovação na nutrição clínica em Portugal.",
  openGraph: {
    title: "O Paradigma Digital na Nutrição Clínica em Portugal",
    description: "Resultados em tempo real do estudo sobre desafios, burocracia e inovação na nutrição clínica em Portugal.",
    type: "website",
    images: [
      {
        url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cb98818a-20ed-43cd-9043-7ac7d91199f4/id-preview-263cec79--ede3afc6-b8f6-45d8-9f7a-ea6673a7a5e6.lovable.app-1784571927502.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "O Paradigma Digital na Nutrição Clínica em Portugal",
    description: "Resultados em tempo real do estudo sobre desafios, burocracia e inovação na nutrição clínica em Portugal.",
    images: ["https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cb98818a-20ed-43cd-9043-7ac7d91199f4/id-preview-263cec79--ede3afc6-b8f6-45d8-9f7a-ea6673a7a5e6.lovable.app-1784571927502.png"],
  },
};

export default function ResearchPage() {
  return <ResearchDashboardClient />;
}