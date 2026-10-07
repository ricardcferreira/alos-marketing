"use client";

import Image from "next/image";
import CalButton from "@/components/lp/CalButton";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center rounded-b-[2rem] md:rounded-b-[4rem] overflow-hidden bg-primary-dark">
      
      {/* IMAGEM DE FUNDO */}
      <Image
        src="/landscape/hero-bg.svg" // Substitua pelo caminho correto da sua imagem
        alt="Alos Health Nutricionista em consulta"
        fill
        className="object-cover object-center"
        priority // Essencial no Hero para não haver lag de carregamento (LCP)
      />

      {/* OVERLAY DE GRADIENTE (Escuro à esquerda para o texto, transparente à direita) */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* CONTENTOR DE CONTEÚDO */}
      {/* O pt-32 garante que o texto não fica escondido debaixo da NavBar flutuante */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col items-start">
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-2 text-white tracking-tight leading-[1.05] max-w-2xl">
          O seu espaço de <br className="hidden md:block" />
          decisão nutricional
        </h1>
        
        <span className="text-base md:text-lg text-white/90 mb-6 leading-relaxed max-w-lg">
          Transforme o seu raciocínio clínico em dados estruturados e codificados. 
          Sem blocos de texto-livre. Sem trabalho repetitivo. Desenhado para dar à 
          profissão o valor que merece.
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