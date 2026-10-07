"use client";

import Image from "next/image";

export default function StickyFeatureStack() {
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
      imageSrc: "/", 
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
      imageSrc: "/",
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
      imageSrc: "/",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto space-y-10 flex flex-col items-center">
      
      {/* SECTION HEADER */}
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-medium text-primary-dark tracking-tight">
          Lorem ipsum dolor sit amet
        </h1>
        <p className="text-xs md:text-sm max-w-xl text-primary-dark leading-relaxed mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className="w-full flex flex-col relative">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`sticky w-full min-h-[500px] rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-top transition-transform ${feature.bgColor}`}
            style={{
              /* 
                120px: Compensa a altura exata da NavBar flutuante (88px) + margem de respiro.
                240px: Garante que o cartão seguinte para exatamente abaixo do título do anterior.
              */
              top: `calc(120px + ${index * 230}px)`, 
              marginBottom: `${(features.length - 1 - index) * 230}px`
            }}
          >
            {/* LEFT SIDE - COPY */}
            <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 items-start pr-0 md:pr-12 mb-10 md:mb-0">
              
              <span className={`border px-3 py-1.5 rounded-full text-sm font-semibold mb-6 w-fit ${feature.tagBorderColor} ${feature.tagTextColor}`}>
                {feature.tag}
              </span>

              {/* Headline */}
              <span className={`text-4xl md:text-5xl font-serif font-medium leading-[1.05] tracking-tight mb-6 ${feature.textColor}`}>
                {feature.title}
              </span>

              {/* Body Text */}
              <span className={`text-sm md:text-lg leading-relaxed max-w-lg opacity-90 ${feature.textColor}`}>
                {feature.description}
              </span>
            </div>

            {/* RIGHT SIDE - IMAGE MOCKUP */}
            <div className="w-full md:w-1/2 h-full flex items-center justify-center relative py-12 px-8 md:py-16 md:px-12 mt-4 md:mt-0">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={feature.imageSrc}
                  alt={`Mockup for ${feature.title}`}
                  fill
                  className="object-cover object-left-top"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}