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
      tabName: "Doença Metabólica",
      title: "Nutrição na Doença Metabólica",
      description:
        "A Alos gera gráficos de evolução longitudinal, podendo cruzar instantaneamente o aporte diário de fibra com a melhoria da Hemoglobina Glicada (HbA1c), visualizando o impacto clínico da sua intervenção ao longo dos meses.",
      imageSrc: "/",
      activeColor: "bg-alos-blue-light border-alos-blue text-alos-blue",
    },
    {
      id: 1,
      tabName: "Oncologia",
      title: "Nutrição em Oncologia",
      description:
        "Desde o SARC-F à classificação do perímetro geminal, da força de preensão da mão e bioimpedância: centralizamos todas as métricas para o diagnóstico da sarcopenia. A Alos pré-preenche ferramentas complexas como o questionário PG-SGA.",
      imageSrc: "/",
      activeColor: "bg-alos-yellow border-alos-brown text-alos-brown",
    },
    {
      id: 2,
      tabName: "Internamento",
      title: "Nutrição em Internamento",
      description:
        "Centralize a informação para evitar perdas de dados e reduzir o erro clínico. O sistema autoseleciona a ferramenta de rastreio, como o NRS 2002, e sistematiza o seu raciocínio gerando declarações de diagnóstico nutricional em formato PES.",
      imageSrc: "/",
      activeColor: "bg-alos-green-light border-alos-green text-alos-green",
    },
    {
      id: 3,
      tabName: "Pediatria",
      title: "Nutrição em Pediatria",
      description:
        "Analise a demografia do doente e autoseleciona a curva de crescimento ideal, utilizando referências da OMS ou dos Centers for Disease Control. A Alos acompanha a trajetória dos percentis e as curvas de todos os parâmetros de crescimento.",
      imageSrc: "/",
      activeColor: "bg-alos-yellow border-alos-brown text-alos-brown",
    },
    {
      id: 4,
      tabName: "Doença Renal",
      title: "Nutrição na Doença Renal",
      description:
        "Na doença renal, o edema compromete qualquer estimativa. A Alos permite aplicar instantaneamente o peso corrigido do doente para cálculos de energia e proteína. Controle a ingestão de sódio, potássio e fósforo com o máximo rigor clínico.",
      imageSrc: "/",
      activeColor: "bg-alos-blue-light border-alos-blue text-alos-blue",
    },
    {
      id: 5,
      tabName: "Desporto",
      title: "Nutrição no Desporto",
      description:
        "A Alos integra a rigorosa metodologia ISAK para processar a antropometria do atleta. Também permite monitorizar a ingestão alimentar, quantificando ao detalhe os macronutrientes do pré ao pós-treino.",
      imageSrc: "/",
      activeColor: "bg-alos-green-light border-alos-green text-alos-green",
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col items-center px-4 md:px-4 lg:px-0">
      
      {/* TABS */}
      <div className="w-full mb-6">
        <div className="flex overflow-x-auto scrollbar-hide gap-2 justify-between md:gap-3 p-2 md:p-4 bg-cream rounded-full w-full">
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={cn(
                  /* Removida a classe w-full para as pílulas se adaptarem ao próprio texto */
                  "whitespace-nowrap px-4 py-2 md:px-6 md:py-2.5 cursor-pointer w-full rounded-full text-xs md:text-sm font-medium transition-colors border",
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
        
        <div className="w-full md:w-1/2 flex flex-col items-start pt-2 space-y-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            {tabs[activeTab].title}
          </h2>
          
          <p className="text-xs md:text-sm text-primary-dark leading-relaxed mb-6">
            {tabs[activeTab].description}
          </p>

          <CalButton 
            calLink="https://cal.com/aloshealth/conversa-inicial" 
            variant="primary"
          >
            Conversa Inicial
          </CalButton>
        </div>

        {/* Lado Direito - Imagem */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-cream-light">
            {/* Bloco de fallback caso a imagem seja "/" como no código de exemplo */}
            {tabs[activeTab].imageSrc !== "/" ? (
              <Image
                src={tabs[activeTab].imageSrc}
                alt={`Interface demonstrativa de ${tabs[activeTab].title}`}
                fill
                className="object-cover object-left-top"
                priority
              />
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