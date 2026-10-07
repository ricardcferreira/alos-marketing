"use client";

import Image from "next/image";

export default function BentoFeatures() {
  return (
    <section className="w-full max-w-7xl mx-auto items-center flex flex-col gap-4 md:gap-6">
      
      {/* LINHA SUPERIOR: 2 CARTÕES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        
        {/* Cartão 1 */}
        <div className="bg-cream rounded-2xl p-4 flex flex-col">
          {/* Imagem */}
          <div className="relative w-full aspect-[4/2] rounded-2xl overflow-hidden bg-white/50 mb-8">
            <Image
              src="/"
              alt="Representação de Conformidade"
              fill
              className="object-cover"
            />
          </div>
          {/* Texto */}
          <h3 className="text-2xl md:text-4xl font-serif text-primary-dark tracking-tight">
            Consectetur adipiscing elit et dolore magna aliqua. 
          </h3>
          <p className="text-xs md:text-sm text-primary-dark leading-relaxed mb-6 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Cartão 2 */}
        <div className="bg-cream rounded-2xl p-4 flex flex-col">
          {/* Imagem */}
          <div className="relative w-full aspect-[4/2] rounded-2xl overflow-hidden bg-white/50 mb-8">
            <Image
              src="/"
              alt="Representação de Interoperabilidade"
              fill
              className="object-cover"
            />
          </div>
          {/* Texto */}
          <h3 className="text-2xl md:text-4xl font-serif text-primary-dark tracking-tight">
            Consectetur adipiscing elit et dolore magna aliqua. 
          </h3>
          <p className="text-xs md:text-sm text-primary-dark leading-relaxed mb-6 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

      </div>

      {/* LINHA INFERIOR: 1 CARTÃO LARGO */}
      <div className="w-full bg-cream rounded-2xl p-8 md:p-4 flex flex-col md:flex-row gap-12 md:gap-16 items-top">
        
        {/* Lado Esquerdo - Texto */}
        <div className="w-full md:w-1/2 px-2 py-8 flex flex-col items-start">
          <h3 className="text-2xl md:text-4xl font-serif text-primary-dark tracking-tight">
            Consectetur adipiscing elit et dolore magna aliqua. 
          </h3>
          <p className="text-xs md:text-sm text-primary-dark leading-relaxed mb-6 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Lado Direito - Imagem */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/50">
            <Image
              src="/"
              alt="Representação de Big Data"
              fill
              className="object-cover object-left-top"
              priority
            />
          </div>
        </div>

      </div>
      
    </section>
  );
}