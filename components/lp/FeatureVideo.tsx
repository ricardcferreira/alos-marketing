"use client";

import Image from "next/image";
import { useState } from "react";
import CalButton from "@/components/lp/CalButton"; // Assumindo que este é o path correto para o seu botão

export default function HeroVideoSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col items-center">
      
      {/* 1. HEADER (Title, Description, Button) */}
      <div className="text-center max-w-3xl mb-12 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-dark tracking-tight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </h1>
        <p className="text-base md:text-lg text-primary-dark/80 leading-relaxed mb-8 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        {/* Reutilização do seu botão Cal.com para manter a consistência */}
        <CalButton 
          calLink="https://cal.com/aloshealth/conversa-inicial" 
          variant="primary"
        >
          Conversa Inicial
        </CalButton>
      </div>

      {/* 2. MAIN VIDEO BLOCK */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-cream rounded-[2rem] overflow-hidden">
              
            <Image 
                src="/landscape/how-it-works.png" 
                alt="Alos Health Professional using platform"
                fill
                className="object-cover"
            />
      
            {/* Subtle Gradient Overlay (pointer-events-none so it doesn't block clicks) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20 z-10 pointer-events-none" />
      
            {/* Play Button Indicator (Centered & Clickable) */}
            <button 
                onClick={() => setIsVideoOpen(true)}
                aria-label="Play video"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-alos-blue-light border border-alos-blue backdrop-blur-md rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg cursor-pointer"
              >
                <div className="w-3 h-3 ml-1 bg-alos-blue [clip-path:polygon(0%_0%,_100%_50%,_0%_100%)]" />
            </button>
              
        </div>

      {/* 3. VIDEO MODAL PORTAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm">
          
          {/* Close Background Click */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsVideoOpen(false)} />

          {/* Close Button (Top Right) */}
          <button 
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 cursor-pointer md:top-10 md:right-10 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
            aria-label="Close video"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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