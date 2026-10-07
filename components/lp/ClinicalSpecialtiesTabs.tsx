"use client";

import { useState } from "react";
import Image from "next/image";
import CalButton from "@/components/lp/CalButton";
import { cn } from "@/lib/utils";

export default function ClinicalSpecialtiesTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      tabName: "Doença Metabólica",
      title: "Nutrição na Doença Metabólica",
      description:
        "A Alos gera automaticamente gráficos de evolução longitudinal. Cruze instantaneamente o aporte diário de fibra com a melhoria da Hemoglobina Glicada (HbA1c), visualizando o impacto clínico da sua intervenção ao longo dos meses.",
      imageSrc: "/",
      activeColor: "bg-alos-blue-light border-alos-blue text-alos-blue",
    },
    {
      id: 1,
      tabName: "Oncologia",
      title: "Nutrição em Oncologia",
      description:
        "Desde o SARC-F e perímetro geminal, à força de preensão da mão e bioimpedância elétrica: centralizamos todas as métricas para o diagnóstico da sarcopenia. Em paralelo, a Alos pré-preenche ferramentas complexas como o questionário PG-SGA.",
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
      activeColor: "bg-alos-brown border-alos-brown text-cream",
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
        "A Alos integra a rigorosa metodologia ISAK para processar a antropometria avançada do atleta. Em paralelo, permite-lhe monitorizar a ingestão alimentar, quantificando ao detalhe os macronutrientes do pré ao pós-treino.",
      imageSrc: "/",
      activeColor: "bg-alos-yellow border-alos-brown text-alos-brown",
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col items-center">
      
      {/* NAVEGAÇÃO DE TABS */}
      <div className="w-full mb-6">
        <div className="flex overflow-x-auto scrollbar-hide gap-3 p-4 bg-cream rounded-full w-full">
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "whitespace-nowrap px-4 py-2 w-full cursor-pointer rounded-full text-sm font-medium transition-colors border",
                  isActive
                    ? tab.activeColor 
                    : "bg-cream border-[#C0B6AD] text-[#C0B6AD]" 
                )}
              >
                {tab.tabName}
              </button>
            );
          })}
        </div>
      </div>

      {/* ÁREA DE CONTEÚDO PRINCIPAL (CARD) */}
      <div className="w-full bg-cream rounded-[2rem] p-8 md:p-4 flex flex-col md:flex-row gap-12 md:gap-16 items-top">
        
        {/* Lado Esquerdo - Copy */}
        <div className="w-full md:w-1/2 px-2 py-8 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl font-serif text-primary-dark tracking-tight">
            {tabs[activeTab].title}
          </h1>
          
          <p className="text-xs md:text-sm text-primary-dark leading-relaxed mb-6 mt-4">
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
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/50">
            <Image
              src={tabs[activeTab].imageSrc}
              alt={`Interface demonstrativa de ${tabs[activeTab].title}`}
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