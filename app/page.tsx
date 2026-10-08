import NavBar from "@/components/home-page/NavBar";
import HeroSection from "@/components/home-page/Hero";
import FeatureVideo from "@/components/home-page/FeatureVideo";
import ClinicalSpecialtiesTabs from "@/components/home-page/ClinicalSpecialtiesTabs";
import StickyFeatureStack from "@/components/home-page/StickyFeatureStack";
import BentoFeatures from "@/components/home-page/FeatureGrid";
import ScrollRevealSection from "@/components/home-page/LogoInMotion";
import TeamSection from "@/components/home-page/TeamSection";
import StudySection from "@/components/home-page/ResearchSection";
import Footer from "@/components/home-page/Foot";

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