"use client";

import Image from "next/image";
import { useState } from "react";
import CalButton from "@/components/ui/CalButton";

export default function HeroVideoSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

// Decida com todo o contexto do doente à sua frente.

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col items-center px-4 md:px-4 lg:px-0">
      
      {/* 1. HEADER (Title, Description, Button) */}
      <div className="text-center max-w-3xl mb-12 space-y-4 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl max-w-[70%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
          	O histórico nutricional do<br/>doente, num só lugar.
        </h2>
        <p className="text-xs md:text-sm md:leading-[1.4] text-primary-dark max-w-[80%] mb-6 md:max-w-[70%] md:max-w-2xl mx-auto">
          A Alos centraliza o histórico nutricional do doente e apoia cada passo do Processo de Cuidado Nutricional, da avaliação à monitorização, para que chegue à consulta já com o quadro completo. A decisão é sua.
        </p>
        
        <CalButton 
          calLink="https://cal.com/aloshealth/conversa-inicial" 
          variant="primary"
        >
          Conversa Inicial
        </CalButton>
      </div>

      {/* 2. MAIN VIDEO BLOCK */}
      {/* Bordas arredondadas ajustadas: 2xl em mobile, 4xl em desktop */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-cream rounded-[1.5rem] overflow-hidden">
              
            {/* Label inside the video */}
            <div className="bg-gradient-to-t w-full h-full text-center from-transparent via-primary-dark/5 to-primary-dark/15 absolute top-0 pt-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <p className="text-white text-xs md:text-sm font-medium">Veja como funciona</p>
            </div>

            <Image 
                src="/landscape/founder-banner-angled-smile.png" 
                alt="Alos Health Professional using platform"
                fill
                className="object-cover"
            />
      
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 z-10 pointer-events-none" />
      
            {/* Play Button Indicator (Aumentado para w-14/h-14 em mobile para ser fácil de clicar) */}
            <button 
                onClick={() => setIsVideoOpen(true)}
                aria-label="Play video"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-alos-blue-light/95 border border-alos-blue backdrop-blur-md rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-2xl cursor-pointer group"
              >
                {/* Triângulo do Play ajustado proporcionalmente */}
                <div className="w-3 h-3 ml-1 bg-alos-blue [clip-path:polygon(0%_0%,_100%_50%,_0%_100%)] transition-colors" />
            </button>
              
        </div>

      {/* 3. VIDEO MODAL PORTAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md">
          
          {/* Close Background Click */}
          <div className="absolute inset-0" onClick={() => setIsVideoOpen(false)} />

          {/* Close Button (Maior contraste e mais fácil de clicar em mobile) */}
          <button 
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 md:top-10 md:right-10 cursor-pointer w-6 h-6 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-20"
            aria-label="Close video"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Iframe Container */}
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