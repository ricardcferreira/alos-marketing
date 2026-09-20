import React from 'react';

export function ResearchSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-0">
      <div className="w-full flex mb-12 pb-4">
          {/* --- SECTION HEADER --- */}
          <p className="text-[0.95rem] font-semibold text-primary-dark tracking-tight">
            Investigação em Saúde Digital
          </p>
        </div>
      
        {/* --- CLICKABLE PUBLICATION BLOCK --- */}
        <a 
          href="https://aloshealth.com/resources/research" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group block"
        >
          {/* 
            Changed to md:grid-cols-2 for a perfect 50/50 split 
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-b border-gray-200 pb-8 duration-200 transition-colors hover:opacity-70">
            
            {/* Left Column: Meta Information */}
            <div className="flex flex-col">
              <p className="text-[0.9rem] font-medium text-primary-dark/80 tracking-tight">
                Questionário
              </p>
              <span className="text-[0.75rem] font-light text-primary-dark/80 mt-1">
                Jul 23, 2026
              </span>
            </div>

            {/* Right Column: Title & Description */}
            <div className="flex flex-col space-y-4">
              <p className="text-[0.95rem] font-semibold text-primary-dark/80 leading-relaxed">
                O Paradigma Digital na Nutrição Clínica: Desafios, Burocracia e Inovação
              </p>
              
              <span><p className="text-[0.95rem] text-primary-dark/80 leading-relaxed">
                Este estudo visa compreender os verdadeiros desafios da prática clínica dos Nutricionistas e mapear a relação entre tecnologia, tempo administrativo e perceção de valor profissional. O desenho do futuro das ferramentas de gestão e de apoio à decisão clínica permitirá devolver o foco total do nutricionista ao doente.
              </p></span>
            </div>

          </div>
        </a>
    </section>
  );
}