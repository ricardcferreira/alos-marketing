import FeatureSection from "@/components/lp/FeatureSection";
import ResultsSection from "@/components/lp/ResultsSection";
import FeatureGrid from "@/components/lp/FeatureGrid";
import CtaSection from "@/components/lp/CtaSection";
import TeamSection from "@/components/lp/TeamSection";
import Hero from "@/components/lp/Hero";
import NavBar from "@/components/lp/NavBar";
import FaqSection from "@/components/lp/FaqSection";

export const metadata = {
  title: "Estudo-Piloto | Alos Health",
  robots: {
    index: false,
    follow: false, // Keeps the ad landing page hidden from Google / search indexing
  },
};

export default function FeaturesSection() {
  return (
    <main className="w-full bg-cream-light py-20 space-y-20">
      <NavBar />
      <Hero />
      <FeatureGrid />
      <CtaSection/>
      <section className="max-w-6xl mx-auto space-y-8">
        <FeatureSection
          reverse
          title="A diferença entre fazer o trabalho e conseguir prová-lo."
          description="Os dados estruturados tornam-se reportáveis e demonstráveis, perante o doente, ou perante quem gere a sua unidade. Veja, num relatório, quantos doentes reduziram risco nutricional este mês."
          imageSrc="/high-fidelity/directory.svg" 
          imageAlt="Preview of the Alos Health dashboard"
        />
        <FeatureSection
          title="Transferências para EHR com um clique"
          description="Registo estruturado alinhado com os sistemas de informação CID-11 e Catálogo Português de Nutrição de forma a comunicar com as infraestruturas informáticas já existentes nas instituições de saúde."
          imageSrc="/high-fidelity/interoperability.svg" 
          imageAlt="Preview of the Alos Health dashboard"
        />
      </section>
      <ResultsSection />
      <section className="max-w-6xl mx-auto space-y-8">
        <FeatureSection
          reverse
          title="Conformidade desenvolvida para a saúde em Portugal."
          description="Garantimos sempre que os seus dados são tratados segundo o Regulamento Geral de Proteção de Dados, protegendo a sua privacidade e a dos seus pacientes."
          imageSrc="/portraits/clinician-woman.png" 
          imageAlt="Preview of the Alos Health dashboard"
        />
      </section>
      <CtaSection/>
      <TeamSection/>
      <FaqSection />
    </main>
  );
}