"use client";

import Image from "next/image";
import CalButton from "@/components/ui/CalButton";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-top rounded-b-[2rem] md:rounded-b-[4rem] overflow-hidden bg-cream">
      
      {/* Background Image */}
      <Image
        src="/landscape/hero-bg.svg" 
        alt="Alos Health Nutricionista em consulta"
        fill
        className="object-cover lg:object-right"
        priority 
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent md:from-black/20 md:via-black/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-32 md:pt-40 pb-24 flex flex-col items-start">
        
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-serif mb-2 text-white tracking-tight leading-tight md:leading-[1.05] max-w-[90%] md:max-w-xl lg:max-w-2xl">
          O seu espaço de <br/>
          decisão nutricional
        </h1>
        
        <span className="text-sm md:text-lg text-white mb-4 max-w-[70%] md:max-w-sm lg:max-w-md">
          Transforme o seu raciocínio clínico em dados estruturados e codificados. 
          Sem trabalho repetitivo.
          Desenhado para dar ao nutricionista o valor que merece.
        </span>

        <CalButton 
          calLink="https://cal.com/aloshealth/conversa-inicial" 
          variant="primary"
        >
          Conversa Inicial
        </CalButton>

      </div>
    </section>
  );
}