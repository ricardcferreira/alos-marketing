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
    <section className="w-full max-w-7xl mx-auto flex flex-col gap-10">
      
      {/* 1. CABEÇALHO */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16 mb-2">
        {/* Título Esquerda */}
        <h2 className="text-4xl md:text-5xl font-serif text-primary-dark tracking-tight leading-[1.1] w-full md:w-1/2">
          <span className="italic">108 nutricionistas</span> partilharam<br className="hidden md:block" /> a sua realidade.
        </h2>
        
        {/* Descrição e Botão Direita */}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-6 pt-2">
          <p className="text-base text-primary-dark/80 leading-relaxed">
            Profissionais de diferentes contextos: ULS, Clínicas de Saúde, IPSS e Particulares, todos membros ativos da Ordem dos Nutricionistas.
          </p>
          <Link 
            href="/resources/research/o-paradigma-digital" 
            className="inline-flex items-center justify-center bg-alos-yellow text-alos-brown hover:bg-alos-brown border-alos-brown border hover:text-white transition-colors font-medium rounded-xl px-6 py-2.5 text-sm"
          >
            Ver estudo completo
          </Link>
        </div>
      </div>

      {/* 2. CARTÃO DE ESTATÍSTICAS (Castanho) */}
      <div className="w-full bg-alos-brown rounded-[2rem] p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col text-cream">
            <span className="text-6xl md:text-7xl tracking-tight">{stat.value}</span>
            <p className="text-base leading-snug text-cream">
              <span className="font-bold">{stat.boldText}</span> {stat.text}
            </p>
          </div>
        ))}
      </div>

      {/* 3. CARTÃO DE ARTIGOS (Creme) */}
      <div className="w-full bg-cream rounded-[2rem] p-8 md:p-12 flex flex-col">
        <p className="text-xl font-bold text-primary-dark">Ultimos artigos</p>
        
        <div className="flex flex-col hover:opacity-70">
          {articles.map((article, index) => (
            <Link 
              key={article.id}
              href={article.href}
              className={`group flex flex-col md:flex-row gap-6 md:gap-12 py-8 ${
                index !== 0 ? "border-b border-primary-dark/10" : "border-b border-primary-dark/10"
              }`}
            >
              {/* Lado Esquerdo - Meta (Data/Categoria) */}
              <div className="w-full md:w-1/4 flex flex-col gap-1">
                <span className="font-bold text-primary-dark text-sm">{article.category}</span>
                <span className="text-primary-dark/70 text-sm">{article.date}</span>
              </div>
              
              {/* Lado Direito - Conteúdo */}
              <div className="w-full md:w-3/4 flex flex-col gap-2">
                <p className="font-bold text-primary-dark text-base md:text-lg leading-snug transition-colors">
                  {article.title}
                </p>
                <span className="text-sm md:text-base text-primary-dark leading-relaxed">
                  {article.description}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Link Footer do Cartão */}
        <div className="mt-4">
          <Link 
            href="/resources/research" 
            className="text-primary-dark font-bold text-sm underline underline-offset-4 hover:text-primary-dark/70 transition-colors"
          >
            Ver mais
          </Link>
        </div>
      </div>

    </section>
  );
}