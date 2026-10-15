"use client";

import { useState } from "react";
import Image from "next/image";
import CalButton from "@/components/ui/CalButton";
import { cn } from "@/lib/utils";

export default function ClinicalSpecialtiesTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      id: 0,
      tabName: "Internamento",
      title: "Não perca informação nas alas do internamento",
      description:
        "De acordo com o perfil do doente, a Alos propõe a ferramenta de rastreio adequada e responde às perguntas com o que já foi registado. Valide cada resposta e veja a pontuação.",
      bgSrc: "/dreamy-texture/texture-three.webp",
      blockframeSrc: "/low-fidelity/internamento.svg",
      activeColor: "bg-alos-blue-light text-alos-blue border border-alos-blue",
    },
    {
      id: 1,
      tabName: "Gastroenterologia",
      title: "Compreenda a evolução da sintomatologia",
      description:
        "A Alos converte registos qualitativos, como a gravidade da distensão e dor abdominal ou a frequência de alterações do trânsito intestinal, em gráficos dinâmicos.",
      bgSrc: "/dreamy-texture/texture-six.webp",
      blockframeSrc: "/low-fidelity/gastro.svg",
      activeColor: "bg-alos-blue-light text-alos-blue border border-alos-blue",
    },
    {
      id: 2,
      tabName: "Pediatria",
      title: "Acompanhe a trajetória de crescimento",
      description:
        "A Alos propõe a curva de referência adequada à idade e ao sexo da criança (OMS ou CDC) e coloca cada medição no gráfico, para ver o percentil e a trajetória.",
      bgSrc: "/dreamy-texture/texture-four.webp",
      blockframeSrc: "/low-fidelity/pediatria.svg",
      activeColor: "bg-alos-blue-light text-alos-blue border border-alos-blue",
    },
    {
      id: 3,
      tabName: "Nefrologia",
      title: "Facilite a matemática na doença renal",
      description:
        "A presença de edema distorce o peso real. A Alos permite aplicar instantaneamente o peso corrigido do doente para efetuar os cálculos nutricionais com o máximo rigor clínico.",
      bgSrc: "/dreamy-texture/texture-five.webp",
      blockframeSrc: "/low-fidelity/nefrologia.svg",
      activeColor: "bg-alos-blue-light text-alos-blue border border-alos-blue",
    },
    {
      id: 4,
      tabName: "Oncologia",
      title: "Vá mais longe na avaliação do doente oncológico",
      description:
        "Reúna na mesma interface o rastreio SARC-F, a força de preensão da mão, o perímetro geminal e a bioimpedância, para construir a frase PES em segundos: centralizamos todas as métricas para o diagnóstico da sarcopenia (consenso europeu EWGSOP2).",
      bgSrc: "/dreamy-texture/texture-two.webp",
      blockframeSrc: "/low-fidelity/oncologia.svg",
      activeColor: "bg-alos-blue-light text-alos-blue border border-alos-blue",
    },
    {
      id: 5,
      tabName: "Síndrome Metabólica",
      title: "Visualize o impacto da sua intervenção",
      description:
        "Acompanhe lado a lado a ingestão diária de fibra dietética e a análise do perfil lipídico, e compreenda a evolução do estado nutricional do doente ao longo do tempo.",
      bgSrc: "/dreamy-texture/texture-one.webp",
      blockframeSrc: "/low-fidelity/metabolica.svg",
      activeColor: "bg-alos-blue-light text-alos-blue border border-alos-blue",
    },
    {
      id: 6,
      tabName: "Desporto",
      title: "Avalie a composição corporal ao milímetro",
      description:
        "Do alto rendimento ao desporto amador, registe pregas cutâneas, perímetros e diâmetros segundo a metodologia ISAK. A Alos calcula o somatório de pregas para representar a massa gorda do atleta.",
      bgSrc: "/dreamy-texture/texture-nine.webp",
      blockframeSrc: "/low-fidelity/desporto.svg",
      activeColor: "bg-alos-blue-light text-alos-blue border border-alos-blue",
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 md:px-4 lg:px-0">
      
      <div className="w-full mb-6">
        <div className="flex flex-wrap sm:flex-wrap lg:flex-nowrap justify-center md:justify-between gap-2 md:gap-3 p-3 md:p-4 bg-cream rounded-[1.5rem] sm:rounded-[1.5rem] lg:rounded-full w-full">
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "whitespace-nowrap flex-grow text-center px-4 py-2 md:px-6 md:py-2.5 cursor-pointer rounded-full text-xs md:text-sm font-medium transition-colors border",
                  isActive
                    ? tab.activeColor 
                    : "bg-cream border-[#C0B6AD] text-[#C0B6AD] hover:bg-cream-light" 
                )}
              >
                {tab.tabName}
              </button>
            );
          })}
        </div>
      </div>

      {/* CARD */}
      <div className="w-full bg-cream rounded-[1.5rem] p-6 md:p-12 flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start">
        
        <div className="w-full md:w-1/2 flex flex-col items-start pt-2 space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl w-[80%] md:w-3/4 font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            {tabs[activeTab].title}
          </h2>
          
          <p className="text-xs md:text-sm md:w-3/4 text-primary-dark leading-[1.3] mb-6">
            {tabs[activeTab].description}
          </p>

          <CalButton 
            calLink="https://cal.com/aloshealth/conversa-inicial" 
            variant="primary"
          >
            Conversa Inicial
          </CalButton>
        </div>

        {/* Right side - Image optimized in layers */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-cream-light">
            
            {tabs[activeTab].blockframeSrc !== "/" ? (
              <>
                {/* LAYER 1: Background (WebP) */}
                <Image
                  src={tabs[activeTab].bgSrc}
                  alt={`Mockup do ecrã para: ${tabs[activeTab].title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover z-0"
                  priority={activeTab === 0}
                />
                
                {/* LAYER 2: Blockframe (SVG) */}
                <Image
                  src={tabs[activeTab].blockframeSrc}
                  alt={`Mockup do ecrã para: ${tabs[activeTab].title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover z-10" 
                  priority={activeTab === 0}
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-xs text-primary-dark">
                Mockup do ecrã para: {tabs[activeTab].title}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}