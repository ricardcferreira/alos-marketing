import { Header } from "@/components/landing/header";
import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/Hero";
import FeatureVideo from "@/components/lp/FeatureVideo";
import ClinicalSpecialtiesTabs from "@/components/lp/ClinicalSpecialtiesTabs";
import StickyFeatureStack from "@/components/lp/StickyFeatureStack";
import BentoFeatures from "@/components/lp/FeatureGridThree";
import ScrollRevealSection from "@/components/lp/LogoInMotion";
import TeamSection from "@/components/lp/TeamSection";
import StudySection from "@/components/lp/ResearchSection";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="w-full bg-cream-light mx-auto space-y-12 md:space-y-16 lg:space-y-20">
      <NavBar />
      <HeroSection />
      <FeatureVideo />
      <ClinicalSpecialtiesTabs />
      <StickyFeatureStack/>
      <BentoFeatures />
      <ScrollRevealSection />
      <TeamSection />
      <StudySection />
      <Footer />
    </main>
  );
}