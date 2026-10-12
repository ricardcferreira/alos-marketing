"use client";

import { useState } from "react";
import Image from "next/image";
import CalButton from "@/components/ui/CalButton";
import { cn } from "@/lib/utils";

export default function ClinicalSpecialtiesTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 1,
      tabName: "Doença Metabólica",
      title: "Visualize o impacto da sua intervenção",
      description:
        "Acompanhe lado a lado a ingestão diária de fibra e e os valores de hemoglobina glicada (HbA1c), e compreenda a evolução do estado nutricional do doente ao longo dos meses.",
      imageSrc: "/bg-low-fidelity/metabolica.svg",
      activeColor: "bg-alos-blue-light border-alos-blue text-alos-blue",
    },
    {
      id: 2,
      tabName: "Oncologia",
      title: "Vá mais longe na avaliação do doente oncológico",
      description:
        "Reúna na mesma interface o rastreio SARC-F e os valores da força de preensão da mão, do perímetro geminal e da bioimpedância, para construir a frase PES em segundos.",
      imageSrc: "/bg-low-fidelity/oncologia.svg",
      activeColor: "bg-alos-yellow border-alos-brown text-alos-brown",
    },
    {
      id: 3,
      tabName: "Internamento",
      title: "Não perca informação nas alas do internamento",
      description:
        "Ao registar o doente na admissão, a Alos propõe a ferramenta de rastreio adequada e responde às perguntas com o que já foi registado. Valide cada resposta e veja a pontuação.",
      imageSrc: "/bg-low-fidelity/internamento.svg",
      activeColor: "bg-alos-green-light border-alos-green text-alos-green",
    },
    {
      id: 4,
      tabName: "Pediatria",
      title: "Acompanhe a trajetória de crescimento",
      description:
        "A Alos propõe a curva de referência adequada à idade e ao sexo da criança (OMS ou CDC) e coloca cada medição no gráfico, para ver o percentil e a trajetória.",
      imageSrc: "/bg-low-fidelity/pediatria.svg",
      activeColor: "bg-alos-yellow border-alos-brown text-alos-brown",
    },
    {
      id: 5,
      tabName: "Doença Renal",
      title: "Nutrição na Doença Renal",
      description:
        "Na doença renal, o edema compromete qualquer estimativa. A Alos permite aplicar instantaneamente o peso corrigido do doente para cálculos de energia e proteína. Controle a ingestão de sódio, potássio e fósforo com o máximo rigor clínico.",
      imageSrc: "/",
      activeColor: "bg-alos-blue-light border-alos-blue text-alos-blue",
    },
    {
      id: 6,
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

        {/* Lado Direito - Imagem */}
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-cream-light">
            {/* Bloco de fallback caso a imagem seja "/" como no código de exemplo */}
            {tabs[activeTab].imageSrc !== "/" ? (
              <Image
                src={tabs[activeTab].imageSrc}
                alt={`Interface demonstrativa de ${tabs[activeTab].title}`}
                fill
                className="object-cover w-full h-full"
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