"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function StickyFeatureStack() {
  const [isMobile, setIsMobile] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detetamos se é mobile para desativar o sticky math de forma reativa
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Executa ao montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = [
    {
      id: 1,
      tag: "Avaliação Nutricional",
      title: "Mais tempo clínico em cada consulta para o doente.",
      description:
        "Reduza o trabalho administrativo, e aumente a profundidade clínica, desde Questionários de Avaliação Nutricional até aos Critérios GLIM.",
      bgColor: "bg-alos-green-light", 
      tagBorderColor: "border-alos-green", 
      tagTextColor: "text-alos-green", 
      textColor: "text-primary-dark",
      imageSrc: "/icons/avaliacao.jpeg", 
      imageScale: 3.6,
      imageOffset: { x: 0, y: 0 },
    },
    {
      id: 2,
      tag: "Diagnóstico e Intervenção",
      title: "Fecho do ciclo de cuidados entre deteção e resolução.",
      description:
        "O sistema sugere expressões do Catálogo Português de Nutrição para gerar a frase PES em segundos a partir das avaliações efetuadas.",
      bgColor: "bg-alos-yellow", 
      tagBorderColor: "border-alos-brown",
      tagTextColor: "text-alos-brown",
      textColor: "text-primary-dark", 
      imageSrc: "/icons/intervencao.jpeg",
      imageScale: 3.6,
      imageOffset: { x: 8, y: 40 },
    },
    {
      id: 3,
      tag: "Monitorização",
      title: "Monitorização visual do estado nutricional do doente.",
      description:
        "Painéis dinâmicos mostram a evolução do doente em tempo real, com correlação instantânea entre as diferentes variáveis.",
      bgColor: "bg-alos-blue-light", 
      tagBorderColor: "border-alos-blue", 
      tagTextColor: "text-alos-blue", 
      textColor: "text-primary-dark",
      imageSrc: "/icons/monitorizacao.jpeg",
      imageScale: 3.6,
    imageOffset: { x: 20, y: 60 },
    },
  ];

  return (
    <section ref={containerRef} className="w-full max-w-7xl mx-auto space-y-10 flex flex-col items-center px-4 md:px-4 lg:px-0">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl max-w-[70%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
          Lorem ipsum dolor sit amet adipiscing elit
        </h2>
        <p className="text-xs md:text-sm md:leading-[1.4] text-primary-dark max-w-[80%] md:max-w-[70%] md:max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="w-full flex flex-col relative">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`relative md:sticky w-full min-h-[420px] md:min-h-[500px] rounded-[1.5rem] overflow-hidden flex flex-col md:flex-row items-stretch transition-transform ${feature.bgColor}`}
            style={
              !isMobile
                ? {
                    top: `calc(120px + ${index * 260}px)`, 
                    marginBottom: `${(features.length - 1 - index) * 260}px`
                  }
                : {}
            }
          >
            {/* LEFT SIDE - COPY */}
            <div className="w-full md:w-1/2 flex flex-col p-6 md:p-12 items-start md:pr-12">
              
              <span className={`border px-3 py-1 rounded-full text-xs md:text-sm font-semibold mb-6 w-fit ${feature.tagBorderColor} ${feature.tagTextColor}`}>
                {feature.tag}
              </span>

              {/* Headline */}
              <h2 className={`text-3xl md:text-4xl lg:text-5xl max-w-[85%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1] ${feature.textColor}`}>
                {feature.title}
              </h2>

              {/* Body Text */}
              <p className={`text-sm md:text-lg md:leading-[1.4] text-primary-dark max-w-[80%] md:max-w-[70%] md:max-w-2xl ${feature.textColor}`}>
                {feature.description}
              </p>
            </div>

            {/* RIGHT SIDE - IMAGE MOCKUP */}
            <div className="w-full md:w-1/2 flex items-center justify-center relative py-6 px-6 lg:py-10">
              <div className="relative w-full aspect-[4/3] md:aspect-[3/3] lg:aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-cream">
                {feature.imageSrc !== "/" ? (
                  <Image
                    src={feature.imageSrc}
                    alt={`Mockup for ${feature.title}`}
                    fill
                    className="object-cover"
                    style={{
                      transform: `translate(${feature.imageOffset.x}%, ${feature.imageOffset.y}%) scale(${feature.imageScale})`,
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-center p-6 text-xs text-primary-dark">
                    Mockup do ecrã para: {feature.tag}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}