"use client";

import Image from "next/image";

// 1. O Copy e os Assets são definidos estaticamente fora do componente
const bentoContent = {
  compliance: {
    title: "Conformidade na área de saúde em Portugal",
    description: "Garantimos sempre que os seus dados são tratados segundo o Regulamento Geral de Proteção de Dados (RGPD), protegendo a sua privacidade e a dos seus doentes.",
    bgSrc: "/square/doctor-three.webp",
    blockframeSrc: "/low-fidelity/conformidade.svg",
  },
  interoperability: {
    title: "Integração com o processo clínico num clique",
    description: "Registo estruturado alinhado com as codificações CID-11 e Catálogo Português de Nutrição, pronto a comunicar com os sistemas de informação já existentes nas instituições de saúde.",
    bgSrc: "/dreamy-texture/texture-nine.webp",
    blockframeSrc: "/low-fidelity/interoperabilidade.svg",
  },
  bigData: {
    title: "A diferença entre fazer o trabalho e conseguir prová-lo",
    description: "O diretório de dados da Alos permite isolar perfis demográficos e clínicos, cruzar protocolos terapêuticos, como o impacto de um suplemento na massa muscular, e comparar resultados entre grupos em segundos. Os dados estruturados tornam-se reportáveis e demonstráveis, perante o doente, ou perante quem gere a sua unidade.",
    bgSrc: "/dreamy-texture/texture-five.webp",
    blockframeSrc: "/low-fidelity/diretorio.svg",
  }
};

export default function BentoFeatures() {
  return (
    <section className="w-full max-w-6xl mx-auto items-center flex flex-col gap-4 md:gap-6 px-4 md:px-4 lg:px-0">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
        
        {/* Cartão 1: Conformidade */}
        <div className="bg-cream rounded-[1.5rem] p-6 md:p-10 flex flex-col">
          <div className="relative w-full aspect-[4/3] mb-8 rounded-[1.5rem] overflow-hidden bg-cream-light">
            <Image
              src={bentoContent.compliance.bgSrc}
              alt="Textura"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover z-0"
            />
            <Image
              src={bentoContent.compliance.blockframeSrc}
              alt="Mockup do ecrã para: Conformidade"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover z-0"
            />
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl max-w-[70%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            {bentoContent.compliance.title}
          </h3>
          <p className="text-xs md:text-sm md:leading-[1.4] text-primary-dark max-w-[80%] md:max-w-[70%] md:max-w-2xl mt-4">
            {bentoContent.compliance.description}
          </p>
        </div>

        {/* Cartão 2: Interoperabilidade */}
        <div className="bg-cream rounded-[1.5rem] p-6 md:p-10 flex flex-col">
          <div className="relative w-full aspect-[4/3] mb-8 rounded-[1.5rem] overflow-hidden bg-cream-light">
            <Image
              src={bentoContent.interoperability.bgSrc}
              alt="Textura"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover z-0"
            />
            <Image
              src={bentoContent.interoperability.blockframeSrc}
              alt="Mockup do ecrã para: Interoperabilidade"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover z-0"
            />
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl max-w-[80%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            {bentoContent.interoperability.title}
          </h3>
          <p className="text-xs md:text-sm md:leading-[1.4] text-primary-dark max-w-[80%] md:max-w-[70%] md:max-w-2xl mt-4">
            {bentoContent.interoperability.description}
          </p>
        </div>

      </div>

      {/* LINHA INFERIOR: 1 CARTÃO LARGO (Big Data) */}
      <div className="w-full bg-cream rounded-[1.5rem] p-6 md:p-12 flex flex-col md:flex-row gap-8 items-top">
        
        <div className="w-full md:w-1/2 flex flex-col items-start pt-2 md:pt-0">
          <h3 className="text-2xl md:text-3xl lg:text-4xl max-w-[85%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            {bentoContent.bigData.title}
          </h3>
          <p className="text-xs md:text-sm md:leading-[1.4] text-primary-dark max-w-[80%] md:max-w-[80%] mt-4">
            {bentoContent.bigData.description}
          </p>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-cream-light">
            <Image
              src={bentoContent.bigData.bgSrc}
              alt="Textura"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover z-0"
            />
            <Image
              src={bentoContent.bigData.blockframeSrc}
              alt="Mockup do ecrã para: Big Data"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover z-0"
            />
          </div>
        </div>

      </div>
      
    </section>
  );
}