import Link from "next/link";

export default function ResultsSection() {
  return (
    <section>
      <div className="w-full p-6 flex gap-12 flex-col items-center justify-center">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-dark tracking-tight mb-2">
            <span className="italic">104 nutricionistas</span> partilharam a sua realidade. 
          </h2>
          <span><p className="text-base md:text-lg text-primary-dark/80 leading-relaxed max-w-2xl mx-auto mb-8">
             Profissionais de diferentes contextos: ULS, Clínicas de Saúde, IPSS e Particulares, <br></br> todos membros ativos da Ordem dos Nutricionistas.
          </p></span>
          <a 
            href="https://aloshealth.com/resources/research" 
            className="inline-flex items-center justify-center bg-alos-green-light text-alos-green hover:bg-alos-green hover:text-white transition-colors font-medium rounded-sm px-3 py-2 text-xs"
            >
            Ver Estudo
          </a>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl w-full mx-auto gap-18 p-8 bg-cream rounded-xl">
          {/* Column 1 */}
          <div className="flex flex-col gap-3 justify-left items-left">
              <h1 className="font-serif text-3xl text-primary-dark tracking-tight">51,9%</h1>
              <hr className="border-cream" />
            <div>
              <span><p className="text-[0.95rem] font-semibold text-primary-dark/80 leading-relaxed">Esgotamento crítico</p></span>
              <span><p className="text-[0.95rem] text-primary-dark/80 leading-relaxed">associado ao trabalho administrativo.</p></span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3 justify-left items-left">
              <h1 className="font-serif text-3xl text-primary-dark tracking-tight">24,1%</h1>
              <hr className="border-cream" />
            <div>
              <span><p className="text-[0.95rem] font-semibold text-primary-dark/80 leading-relaxed">Taxa de Insatisfação</p></span>
              <span><p className="text-[0.95rem] text-primary-dark/80 leading-relaxed">gerem duas ou mais ferramentas.</p></span>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3 justify-left items-left">
              <h1 className="font-serif text-3xl text-primary-dark tracking-tight">52,3%</h1>
              <hr className="border-cream" />
            <div>
              <span><p className="text-[0.95rem] font-semibold text-primary-dark/80 leading-relaxed">Ferramentas atuais</p></span>
              <span><p className="text-[0.95rem] text-primary-dark/80 leading-relaxed">superficiais no detalhe clínico</p></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}