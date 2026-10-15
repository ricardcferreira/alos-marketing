"use client";

import Link from "next/link";

export default function StudySection() {
  const stats = [
    {
      id: 1,
      value: "54,5%",
      boldText: "Reportam",
      text: "que o registo em texto livre bloqueia a análise sistemática de dados.",
    },
    {
      id: 2,
      value: "52,3%",
      boldText: 'Afirmam que os sistemas hospitalares',
      text: 'são "superficiais no detalhe clínico".',
    },
    {
      id: 3,
      value: "40,7%",
      boldText: "Indicam o tratamento de dados",
      text: "como a etapa que mais tempo consome.",
    },
  ];

  const articles = [
    {
      id: 1,
      category: "Inquérito",
      date: "Jul 23, 2026",
      title: "Tempo de Cuidar",
      description: "A ausência de uma infraestrutura digital construída especificamente para o nutricionista clínico. O estudo mapeia as ferramentas digitais usadas no dia a dia, o tempo dedicado a tarefas administrativas e a forma como os profissionais avaliam o seu impacto na prática clínica, na aplicação do Processo de Cuidado Nutricional e na perceção de valor profissional.",
      href: "/resources/research/o-paradigma-digital",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col gap-6 md:gap-10 px-4 md:px-4 lg:px-0">
      
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-16 mb-2">
        {/* Left Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
          <span className="italic">104 nutricionistas</span> contaram<br className="hidden md:block" /> a sua realidade e como veem<br className="hidden md:block" /> o futuro da profissão
        </h2>
        
        {/* Description*/}
        <div className="w-full md:w-2/5 flex flex-col items-start gap-6">
          <p className="text-sm md:text-base text-primary-dark/80 leading-relaxed">
            Profissionais de diferentes contextos clínicos: ULS, clínicas de saúde, IPSS e prática privada, todos membros efetivos da Ordem dos Nutricionistas.
          </p>
          <Link 
            href="/resources/research/o-paradigma-digital" 
            className="inline-flex items-center justify-center bg-alos-yellow text-alos-brown hover:bg-alos-brown border-alos-brown border hover:text-white transition-colors font-medium rounded-xl px-6 py-2.5 text-xs sm:text-sm"
          >
            Ler o estudo
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
                <span className="font-bold text-primary-dark text-sm">{article.category}</span>
                <span className="text-primary-dark/70 tracking-tight text-xs">{article.date}</span>
              </div>
              
              <div className="w-full md:w-3/4 flex flex-col -space-y-4 mt-4 sm:mt-0">
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