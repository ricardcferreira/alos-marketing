import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { ResearchSection } from "@/components/landing/research-section";
import { TeamSection } from "@/components/landing/team-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F3F3] flex flex-col overflow-hidden relative">
      <Header />
      <HeroSection />
      <ResearchSection />
      <TeamSection />
      <Footer />
    </main>
  );
}