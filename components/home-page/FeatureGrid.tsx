"use client";

import Image from "next/image";

export default function BentoFeatures() {
  return (
    <section className="w-full max-w-7xl mx-auto items-center flex flex-col gap-4 md:gap-6 px-4 md:px-4 lg:px-0">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
        
        {/* Cartão 1 */}
        <div className="bg-cream rounded-[1.5rem] p-6 md:p-10 flex flex-col">
          <div className="relative w-full aspect-[4/3] md:aspect-[4/2] rounded-[1.5rem] overflow-hidden mb-8 bg-cream-light">
            <div className="absolute inset-0 flex items-center justify-center text-center p-6 text-xs text-primary-dark">
              Mockup do ecrã para: Conformidade
            </div>
            {/* 
            <Image
              src="/path-da-imagem"
              alt="Mockup do ecrã para: Conformidade"
              fill
              className="object-cover"
            /> 
            */}
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl max-w-[70%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            Consectetur adipiscing elit et dolore magna aliqua. 
          </h3>
          <p className="text-xs md:text-sm md:leading-[1.4] text-primary-dark max-w-[80%] md:max-w-[70%] md:max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Cartão 2 */}
        <div className="bg-cream rounded-[1.5rem] p-6 md:p-10 flex flex-col">
          <div className="relative w-full aspect-[4/3] md:aspect-[4/2] rounded-[1.5rem] overflow-hidden bg-cream-light mb-8">
            <div className="absolute inset-0 flex items-center justify-center text-center p-6 text-xs text-primary-dark">
              Mockup do ecrã para: Interoperabilidade
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl max-w-[70%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            Consectetur adipiscing elit et dolore magna aliqua. 
          </h3>
          <p className="text-xs md:text-sm md:leading-[1.4] text-primary-dark max-w-[80%] md:max-w-[70%] md:max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

      </div>

      {/* LINHA INFERIOR: 1 CARTÃO LARGO */}
      <div className="w-full bg-cream rounded-[1.5rem] p-6 md:p-12 flex flex-col md:flex-row gap-8 items-center">
        
        <div className="w-full md:w-1/2 flex flex-col items-start pt-2 md:pt-0">
          <h3 className="text-2xl md:text-3xl lg:text-4xl max-w-[70%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            Consectetur adipiscing elit et dolore magna aliqua. 
          </h3>
          <p className="text-xs md:text-sm md:leading-[1.4] text-primary-dark max-w-[80%] md:max-w-[70%] md:max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-cream-light">
            <div className="absolute inset-0 flex items-center justify-center text-center p-6 text-xs text-primary-dark">
              Mockup do ecrã para: Big Data
            </div>
          </div>
        </div>

      </div>
      
    </section>
  );
}