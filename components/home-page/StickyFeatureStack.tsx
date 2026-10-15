"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function StickyFeatureStack() {
  const [isMobile, setIsMobile] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = [
    {
      id: 0,
      tag: "Rastreio Nutricional",
      title: "Identifique todos os doentes em risco",
      description:
        "Mais do que cumprir uma exigência nos cuidados hospitalares/continuados (Despacho n.º 9984/2023), a Alos torna o rastreio imediato em qualquer contexto: sugere e pré-preenche ferramentas validadas com os dados já registados, sinalizando risco em segundos.",
      bgColor: "bg-alos-yellow", 
      tagBorderColor: "border-alos-brown",
      tagTextColor: "text-alos-brown",
      textColor: "text-primary-dark", 
      imageSrc: "/low-fidelity/rastreio.svg", 
      imageScale: 1.2,
      imageOffset: { x: 0, y: 0 },
    },
    {
      id: 1,
      tag: "Avaliação do Estado Nutricional",
      title: "Mais profundidade, menos cliques",
      description:
        "Sinais e sintomas, questionários de avaliação do estado nutricional, composição corporal, ingestão alimentar e marcadores biológicos. A Alos enquadra e classifica as avaliações de acordo com as referências, abrindo espaço para a sua interpretação crítica.",
      bgColor: "bg-alos-green-light", 
      tagBorderColor: "border-alos-green", 
      tagTextColor: "text-alos-green", 
      textColor: "text-primary-dark",
      imageSrc: "/low-fidelity/avaliacao.svg", 
      imageScale: 1.2,
      imageOffset: { x: 0, y: 0 },
    },
    {
      id: 2,
      tag: "Diagnóstico Nutricional",
      title: "Encurte a distância entre detetar e diagnosticar",
      description:
        "A partir das avaliações que efetuou, a Alos sugere termos do Catálogo Português de Nutrição para compor a frase PES (Problema, Etiologia, Sinais e Sintomas). Reveja, ajuste e valide em segundos.",
      bgColor: "bg-alos-blue-light", 
      tagBorderColor: "border-alos-blue", 
      tagTextColor: "text-alos-blue", 
      textColor: "text-primary-dark",
      imageSrc: "/low-fidelity/diagnostico.svg",
      imageScale: 1.2,
      imageOffset: { x: 0, y: 0 },
    },
    {
      id: 3,
      tag: "Intervenção Nutricional",
      title: "Transforme o diagnóstico num plano acionável",
      description:
        "Defina metas nutricionais exatas e estruture a prescrição a partir do diagnóstico validado. Do cálculo de necessidades à escolha da estratégia terapêutica.",
      bgColor: "bg-cream", 
      tagBorderColor: "border-primary-dark", 
      tagTextColor: "text-primary-dark", 
      textColor: "text-primary-dark",
      imageSrc: "/",
      imageScale: 1.2,
    imageOffset: { x: 0, y: 0 },
    },
    {
      id: 4,
      tag: "Monitorização e Avaliação de Resultados",
      title: "Acompanhe a evolução do estado nutricional",
      description:
        "A Alos permite cruzar mais de 100 parâmetros clínicos no mesmo painel visual para que compreenda melhor o estado nutricional atual do doente e as suas variações.",
      bgColor: "bg-alos-brown", 
      tagBorderColor: "border-white", 
      tagTextColor: "text-white", 
      textColor: "text-white",
      imageSrc: "/low-fidelity/monitorizacao.svg",
      imageScale: 1.2,
      imageOffset: { x: 0, y: 0 },
    },
  ];

  // Smaller values on mobile so the stack leaves room for the content
  const stickyBase = isMobile ? 88 : 120; // distance from the top (below your header)
  const stickyStep = isMobile ? 16 : 30;  // visible strip of each stacked card

  return (
    <section ref={containerRef} className="w-full max-w-6xl mx-auto space-y-10 flex flex-col items-center px-4 md:px-4 lg:px-0">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl space-y-0 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-[70%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
          Do primeiro registo ao<br></br>resultado clínico
        </h2>
        <p className="text-xs md:text-sm md:leading-[1.4] mb-2 text-primary-dark max-w-[80%] sm:max-w-[60%] md:max-w-[70%] mx-auto">
          Rastreio, avaliação, diagnóstico, intervenção e monitorização: o que regista numa fase alimenta a seguinte, sem dados repetidos.
        </p>
      </div>

      <div className="w-full flex flex-col gap-4 relative">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            // 1. Use fixed height (h-[540px] md:h-[500px]) instead of min-h
            className={`sticky w-full h-[540px] md:h-[500px] rounded-[1.5rem] overflow-hidden flex flex-col md:flex-row items-stretch transition-transform ${feature.bgColor}`}
            style={{
              top: `${stickyBase + index * stickyStep}px`,
              marginBottom: `${(features.length - 1 - index) * stickyStep}px`,
            }}
          >
            {/* LEFT SIDE - COPY */}
            <div className="w-full md:w-1/2 flex flex-col p-6 md:p-12 items-start md:pr-12 shrink-0">
              <span
                className={`border px-3 py-1 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6 w-fit ${feature.tagBorderColor} ${feature.tagTextColor}`}
              >
                {feature.tag}
              </span>

              <h2
                className={`text-2xl md:text-4xl lg:text-5xl sm:max-w-[75%] lg:max-w-[100%] font-serif tracking-tight leading-tight md:leading-[1.1] mb-0 sm:mb-3 ${feature.textColor}`}
              >
                {feature.title}
              </h2>

              <p
                className={`text-xs sm:text-sm md:text-lg md:leading-[1.4] max-w-[90%] md:max-w-[85%] ${feature.textColor}`}
              >
                {feature.description}
              </p>
            </div>

            {/* RIGHT SIDE - IMAGE MOCKUP */}
            {/* 2. flex-1 min-h-0 lets the image area absorb height differences on mobile */}
            <div className="w-full flex-1 min-h-0 md:w-1/2 flex items-center justify-center relative pb-6 px-6 md:py-6 lg:py-10">
              <div className="relative w-full h-full md:h-auto md:aspect-[3/3] lg:aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-transparent">
                {feature.imageSrc !== "/" ? (
                  <Image
                    src={feature.imageSrc}
                    alt={`Mockup do ecrã para: ${feature.title}`}
                    fill
                    className="object-contain"
                    style={{
                      transform: `translate(${feature.imageOffset.x}%, ${feature.imageOffset.y}%) scale(${feature.imageScale})`,
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex bg-cream-light items-center justify-center text-center p-6 text-xs text-primary-dark">
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