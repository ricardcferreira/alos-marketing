"use client";

import Link from "next/link";

export default function StudySection() {
  const stats = [
    {
      id: 1,
      value: "51,9%",
      boldText: "Esgotamento crítico",
      text: "associado ao trabalho administrativo.",
    },
    {
      id: 2,
      value: "24,1%",
      boldText: "Taxa de Insatisfação",
      text: "gerem duas ou mais ferramentas.",
    },
    {
      id: 3,
      value: "52,3%",
      boldText: "Ferramentas atuais",
      text: "superficiais no detalhe clínico",
    },
  ];

  const articles = [
    {
      id: 1,
      category: "Inquérito",
      date: "Jul 23, 2026",
      title: "O Paradigma Digital na Nutrição Clínica: Desafios, Burocracia e Inovação",
      description: "Este estudo visa compreender os verdadeiros desafios da prática clínica dos Nutricionistas e mapear a relação entre tecnologia, tempo administrativo e perceção de valor profissional. O desenho do futuro das ferramentas de gestão e de apoio à decisão clínica permitirá devolver o foco total do nutricionista ao doente.",
      href: "/resources/research/o-paradigma-digital",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-10 px-4 md:px-4 lg:px-0">
      
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 mb-2">
        {/* Left Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
          <span className="italic">104 nutricionistas</span> partilharam<br className="hidden md:block" /> a sua realidade e a sua visão sobre o futuro da profissão.
        </h2>
        
        {/* Description*/}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-6">
          <p className="text-sm md:text-base text-primary-dark/80 leading-relaxed">
            Profissionais de diferentes contextos: ULS, Clínicas de Saúde, IPSS e Particulares, todos membros ativos da Ordem dos Nutricionistas.
          </p>
          <Link 
            href="/resources/research/o-paradigma-digital" 
            className="inline-flex items-center justify-center bg-alos-yellow text-alos-brown hover:bg-alos-brown border-alos-brown border hover:text-white transition-colors font-medium rounded-xl px-6 py-2.5 text-xs sm:text-sm"
          >
            Ver estudo completo
          </Link>
        </div>
      </div>

      {/* 2. Statistics */}
      <div className="w-full bg-alos-brown rounded-[2rem] p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col text-cream">
            <span className="text-5xl md:text-7xl tracking-tight">{stat.value}</span>
            <p className="text-sm md:text-base leading-snug text-cream">
              <span className="font-bold text-cream">{stat.boldText}</span> {stat.text}
            </p>
          </div>
        ))}
      </div>

      {/* 3. CARTÃO DE ARTIGOS (Creme) */}
      <div className="w-full bg-cream rounded-[2rem] p-6 md:p-12 flex flex-col">
        <p className="text-lg md:text-xl text-primary-dark font-semibold">Últimos artigos</p>
        
        <div className="flex flex-col hover:opacity-70">
          {articles.map((article, index) => (
            <Link 
              key={article.id}
              href={article.href}
              className={`group flex flex-col md:flex-row gap-4 md:gap-12 py-6 md:py-8 ${
                index !== 0 ? "border-b border-primary-dark/20" : "border-b border-primary-dark/20"
              }`}
            >
              <div className="w-full md:w-1/4 flex flex-col gap-1">
                <span className="font-bold text-primary-dark text-xs md:text-sm">{article.category}</span>
                <span className="text-primary-dark/70 text-xs md:text-sm">{article.date}</span>
              </div>
              
              <div className="w-full md:w-3/4 flex flex-col -space-y-2 mt-4">
                <p className="text-sm md:text-[0.95rem] text-primary-dark font-semibold">
                  {article.title}
                </p>
                <p className="text-sm md:text-[0.95rem] text-primary-dark">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Link Footer do Cartão */}
        <div className="mt-6 md:mt-8">
          <Link 
            href="/resources/research" 
            className="text-sm md:text-[0.95rem] text-primary-dark font-semibold underline underline-offset-4 hover:text-primary-dark/70 transition-colors"
          >
            Ver mais
          </Link>
        </div>
      </div>

    </section>
  );
}