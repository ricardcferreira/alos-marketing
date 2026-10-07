import Image from "next/image";

export default function TeamSection() {
  return (
    <section className="w-full bg-alos-blue-light py-20 px-4">
      
      {/* HEADER SECTION */}
      {/* INNER CONTAINER: Conteúdo centrado e limitado a 6xl */}
      <div className="w-full max-w-7xl mx-auto flex flex-col">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-primary-dark tracking-tight leading-snug">
            Fundada por <span className="italic">Francisco Ribeiro</span> e <span className="italic">Ricardo Ferreira,</span> a Alos combina um profundo conhecimento clínico com a inovação digital estratégica no setor da saúde moderna.
          </h2>
        </div>
      

      {/* TEAM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Team Member 1: Francisco */}
        <div className="flex flex-col">
          <div className="relative w-full aspect-[1/1] rounded-xl overflow-hidden mb-6 bg-gray-200">
            <Image 
              src="/portraits/founder-francisco.png"
              alt="Francisco Ribeiro"
              fill
              className="object-cover"
            />
          </div>
          <div className="-space-y-4 flex flex-col pr-8">
          <p className="text-[0.95rem] font-semibold text-primary-dark leading-relaxed">
            Francisco Ribeiro
          </p>
          <p className="text-[0.95rem] text-primary-dark leading-relaxed">
            O Francisco é um nutricionista certificado com experiência prática em hospitais, clínicas multidisciplinares e instituições desportivas. Orientado pela prática baseada em evidências, garante que a Alos Health assenta em fundamentos científicos rigorosos e se adapta na perfeição às necessidades reais e quotidianas dos profissionais de saúde.
          </p>
          </div>
        </div>

        {/* Team Member 2: Ricardo */}
        <div className="flex flex-col">
          <div className="relative w-full aspect-[1/1] rounded-xl overflow-hidden mb-6 bg-gray-200">
            <Image 
              src="/portraits/founder-ricardo.png"
              alt="Ricardo Ferreira"
              fill
              className="object-cover"
            />
          </div>
          <div className="-space-y-4 flex flex-col pr-8">
          <p className="text-[0.95rem] font-semibold text-primary-dark leading-relaxed">
            Ricardo Ferreira
          </p>
          <p className="text-[0.95rem] text-primary-dark/80 leading-relaxed">
            Ricardo traz uma abordagem orientada a resultados à estratégia digital no setor da HealthTech. A sua função concentra-se em traduzir o complexo valor tecnológico e clínico da Alos Health em soluções escaláveis que realmente tenham ressonância no mercado moderno dos cuidados de saúde.
          </p>
          </div>
        </div>

        {/* Team Member 3: Phoebe */}
        <div className="flex flex-col">
          <div className="relative w-full aspect-[1/1] rounded-xl overflow-hidden mb-6 bg-gray-200">
            <Image 
              src="/portraits/founder-phoebe.png"
              alt="Phoebe"
              fill
              className="object-cover"
            />
          </div>
          <div className="-space-y-4 flex flex-col pr-8">
          <p className="text-[0.95rem] font-semibold text-primary-dark leading-relaxed">
            Phoebe
          </p>
          <p className="text-[0.95rem] text-primary-dark leading-relaxed">
            A Phoebe atua como Diretora de Bem-Estar e Controlo de Qualidade Alimentar da Alos (com foco implacável em qualquer snack que caia ao chão). Apesar de não ter formação clínica, a sua presença é vital para o equilíbrio da equipa fundadora.
          </p>
          </div>
        </div>

      </div>
      </div>
    </section>
  );
}