"use client";

import Image from "next/image";
import { useState } from "react";
import CalButton from "@/components/ui/CalButton";

export default function HeroVideoSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 md:px-4 lg:px-0">
      
      {/* 1. HEADER (Title, Description, Button) */}
      <div className="text-center max-w-3xl mb-12 space-y-4 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-[60%] lg:max-w-[70%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            O ciclo completo do cuidado nutricional, num só lugar.
        </h2>
        <p className="text-xs md:text-sm md:leading-[1.4] text-primary-dark mb-6 max-w-[80%] sm:max-w-[60%] md:max-w-[70%] mx-auto">
          A Alos centraliza o histórico nutricional do doente e apoia cada passo do Processo de Cuidado Nutricional, do rastreio à monitorização, para que os registos se moldem ao seu fluxo de trabalho.
        </p>
        
        <CalButton 
          calLink="https://cal.com/aloshealth/conversa-inicial" 
          variant="primary"
        >
          Conversa Inicial
        </CalButton>
      </div>

      {/* 2. MAIN VIDEO BLOCK */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-cream rounded-[1.5rem] overflow-hidden">
              
        {/* --- Imagem de Fundo (Banner) --- */}
        <Image 
            src="/landscape/feature-bg.webp"
            alt="Alos Health Professional using platform"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            priority // Sendo o Hero, deve carregar de imediato
            className="object-cover object-center z-0"
        />

        {/* --- PAINEL ESQUERDO COM BLUR (Apenas Desktop) --- */}
        <div className="hidden md:flex absolute left-0 top-0 h-full w-[35%] bg-gradient-to-l from-transparent via-primary-dark/10 to-primary-dark/30 backdrop-blur z-10 flex-col items-center justify-center">
          
          {/* Label no topo esquerdo do painel */}
          <div className="w-full h-full text-center bg-gradient-to-t from-transparent via-primary-dark/5 to-primary-dark/15 absolute top-0 pt-4 sm:pt-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <p className="text-white text-xs left-5 absolute md:text-sm font-medium">Veja como funciona</p>
          </div>

          {/* Blockframe */}
          <div className="relative w-[85%] aspect-square pointer-events-none">
            <Image 
                src="/illustrations/ncp-cycle.webp"
                alt="Diagrama do Processo de Cuidado Nutricional"
                fill
                sizes="(max-width: 768px) 0vw, 30vw"
                className="object-contain"
            />
          </div>
        </div>
  
        {/* --- Label e Gradiente para Mobile (Já que o painel com blur é escondido) --- */}
        <div className="md:hidden w-full h-full text-center bg-gradient-to-t from-transparent via-primary-dark/5 to-primary-dark/20 absolute top-0 left-0 z-20 pointer-events-none">
          <p className="text-white text-xs left-5 top-5 absolute font-medium">Veja como funciona</p>
        </div>
  
        {/* Overlay global escuro e subtil para garantir contraste (colocado atrás do painel esquerdo) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 z-10 pointer-events-none" />
  
        {/* --- Play Button Indicator --- */}
        <button 
                onClick={() => setIsVideoOpen(true)}
                aria-label="Play video"
                className="absolute bottom-0 right-0 -translate-x-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-12 md:h-12 bg-cream-light rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer group"
              >
                <div className="w-3 h-3 md:w-4 md:h-4 ml-0.5 md:ml-1 bg-primary-dark [clip-path:polygon(0%_0%,_100%_50%,_0%_100%)] transition-colors" />
            </button>
              
      </div>

      {/* 3. VIDEO MODAL PORTAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md">
          
          <div className="absolute inset-0" onClick={() => setIsVideoOpen(false)} />

          <button 
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 md:top-10 md:right-10 cursor-pointer w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-20"
            aria-label="Close video"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="w-full max-w-5xl aspect-video rounded-xl md:rounded-2xl overflow-hidden relative z-10">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/_8aNBv1hz9A?si=UNEB-vFYrHnImQ99"
              title="Alos Health Platform Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}