"use client";

import Image from "next/image";
import { useState } from "react";

export default function FeatureGrid() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="w-full max-w-6xl mx-auto flex-col">
      
      {/* 1. TOP VIDEO/IMAGE BLOCK */}
      <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-cream rounded-[2rem] overflow-hidden">
        
        <Image 
          src="/landscape/how-it-works.png" 
          alt="Alos Health Professional using platform"
          fill
          className="object-cover"
        />

        {/* Subtle Gradient Overlay (pointer-events-none so it doesn't block clicks) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 z-10 pointer-events-none" />
        
        {/* Title at the Top Center */}
        <div className="absolute top-6 md:top-6 left-0 w-full text-center z-20 px-6 pointer-events-none">
          <span className="text-[0.95rem] font-semibold text-white tracking-tight">
            Como a Alos Health integra na sua prática
          </span>
        </div>

        {/* Play Button Indicator (Centered & Clickable) */}
        <button 
          onClick={() => setIsVideoOpen(true)}
          aria-label="Play video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-white backdrop-blur-md rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg cursor-pointer"
        >
          <div className="w-3 h-3 ml-1 bg-primary-dark [clip-path:polygon(0%_0%,_100%_50%,_0%_100%)]" />
        </button>
        
      </div>

      {/* 2. BOTTOM 3-COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mt-6">
        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          <div className="w-full aspect-square bg-alos-green rounded-3xl overflow-hidden relative">
            <Image 
              src="/high-fidelity/assessment.svg" 
              alt="Assessment Interface"
              fill
              className="object-cover"
            />
          </div>
          <div className="-space-y-2 flex flex-col pr-8">
            <p className="text-[0.95rem] font-semibold text-primary-dark/80 leading-relaxed">
              O mesmo número de consultas,<br></br>
              mais tempo em cada uma.
            </p>
            <p className="text-[0.95rem] text-primary-dark/80 leading-relaxed">
              Reduza o trabalho administrativo, e aumente a profundidade clínica, desde Questionários de Avaliação Nutricional até aos Critérios GLIM.
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          <div className="w-full aspect-square bg-alos-blue-light rounded-3xl overflow-hidden relative">
             <Image 
              src="/high-fidelity/diagnosis.svg" 
              alt="Diagnosis Interface"
              fill
              className="object-cover"
            />
          </div>
          <div className="-space-y-2 flex flex-col pr-8">
            <p className="text-[0.95rem] font-semibold text-primary-dark/80 leading-relaxed">
              Fecho do ciclo de cuidados<br></br>
              entre deteção e resolução.
            </p>
            <p className="text-[0.95rem] text-primary-dark/80 leading-relaxed">
              O sistema sugere expressões do Catálogo Português de Nutrição para gerar a frase PES em segundos a partir das avaliações efetuadas.
            </p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          <div className="w-full aspect-square bg-alos-green-light rounded-3xl overflow-hidden relative">
             <Image 
              src="/high-fidelity/monitoring.svg" 
              alt="Monitoring Interface"
              fill
              className="object-cover"
            />
          </div>
          <div className="-space-y-2 flex flex-col pr-8">
            <p className="text-[0.95rem] font-semibold text-primary-dark/80 leading-relaxed">
              Monitorização visual do<br></br>
              estado nutricional do doente.
            </p>
            <p className="text-[0.95rem] text-primary-dark/80 leading-relaxed">
              Painéis dinâmicos mostram a evolução do doente em tempo real, com correlação instantânea entre as diferentes variáveis.
            </p>
          </div>
        </div>
      </div>

      {/* 3. VIDEO MODAL PORTAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm">
          
          {/* Close Background Click */}
          <div className="absolute inset-0" onClick={() => setIsVideoOpen(false)} />

          {/* Close Button (Top Right) */}
          <button 
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 cursor-pointer md:top-10 md:right-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
            aria-label="Close video"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Iframe Container */}
          <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-white/10">
            {/* REPLACE THIS SRC WITH YOUR YOUTUBE/VIMEO LINK */}
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/BPKKGehoYMo?autoplay=1"
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