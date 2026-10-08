import Image from "next/image";

export default function TeamSection() {
  return (
    <section className="w-full bg-alos-blue-light py-16 md:py-24 px-4 md:px-8">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-7xl mx-auto flex flex-col">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary-dark tracking-tight leading-tight md:leading-snug">
            Fundada por <span className="italic">Francisco Ribeiro</span> e <span className="italic">Ricardo Ferreira,</span> a Alos combina um profundo conhecimento clínico com a inovação digital estratégica no setor da saúde moderna.
          </h2>
        </div>
      
      {/* TEAM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4">
        
        {/* Team Member 1: Francisco */}
        <div className="flex flex-col">
          <div className="relative w-full aspect-[1/1] rounded-[1.5rem] overflow-hidden mb-6 bg-cream-light">
            <Image 
              src="/portraits/founder-francisco.png"
              alt="Francisco Ribeiro"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col -space-y-4 md:pr-4">
            <p className="text-sm md:text-[0.95rem] text-primary-dark font-semibold">
              Francisco Ribeiro
            </p>
            <p className="text-sm md:text-[0.95rem] text-primary-dark">
              O Francisco é um nutricionista certificado com experiência prática em hospitais, clínicas multidisciplinares e instituições desportivas. Orientado pela prática baseada em evidências, garante que a Alos Health assenta em fundamentos científicos rigorosos e se adapta na perfeição às necessidades reais e quotidianas dos profissionais de saúde.
            </p>
          </div>
        </div>

        {/* Team Member 2: Ricardo */}
        <div className="flex flex-col">
          <div className="relative w-full aspect-[1/1] rounded-[1.5rem] overflow-hidden mb-6 bg-cream-light">
            <Image 
              src="/portraits/founder-ricardo.png"
              alt="Ricardo Ferreira"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col -space-y-4 md:pr-4">
            <p className="text-sm md:text-[0.95rem] text-primary-dark font-semibold">
              Ricardo Ferreira
            </p>
            <p className="text-sm md:text-[0.95rem] text-primary-dark">
              Ricardo traz uma abordagem orientada a resultados à estratégia digital no setor da HealthTech. A sua função concentra-se em traduzir o complexo valor tecnológico e clínico da Alos Health em soluções escaláveis que realmente tenham ressonância no mercado moderno dos cuidados de saúde.
            </p>
          </div>
        </div>

        {/* Team Member 3: Phoebe */}
        <div className="flex flex-col">
          <div className="relative w-full aspect-[1/1] rounded-[1.5rem] overflow-hidden mb-6 bg-cream-light">
            <Image 
              src="/portraits/founder-phoebe.png"
              alt="Phoebe"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col -space-y-4 md:pr-4">
            <p className="text-sm md:text-[0.95rem] text-primary-dark font-semibold">
              Phoebe
            </p>
            <p className="text-sm md:text-[0.95rem] text-primary-dark">
              A Phoebe atua como Diretora de Bem-Estar e Controlo de Qualidade Alimentar da Alos (com foco implacável em qualquer snack que caia ao chão). Apesar de não ter formação clínica, a sua presença é vital para o equilíbrio da equipa fundadora.
            </p>
          </div>
        </div>

      </div>
      </div>
    </section>
  );
}