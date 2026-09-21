import Link from "next/link";

export default function SupportHome() {
  const categories = [
    { 
      title: "Primeiros Passos", 
      desc: "Configure a sua conta, perfil profissional e preferências clínicas.", 
      icon: "🚀",
      slug: "primeiros-passos"
    },
    { 
      title: "Gestão de Pacientes", 
      desc: "Aprenda a adicionar pacientes, analisar registos e criar planos.", 
      icon: "👥",
      slug: "gestao-pacientes"
    },
    { 
      title: "Agendamento e Cal.com", 
      desc: "Faça a gestão do seu calendário e configure as marcações.", 
      icon: "📅",
      slug: "agendamentos"
    },
    { 
      title: "Integração EHR", 
      desc: "Como exportar e sincronizar dados com os sistemas da sua instituição.", 
      icon: "🔗",
      slug: "integracao-ehr"
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-24">
      
      {/* Secção de Pesquisa */}
      <div className="text-center mb-16 md:mb-24">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary-dark mb-6 tracking-tight">
          Como podemos ajudar?
        </h1>
        <div className="max-w-2xl mx-auto relative group">
          <input
            type="text"
            placeholder="Pesquise por artigos, guias ou funcionalidades..."
            className="w-full h-14 pl-6 pr-14 rounded-full border border-gray-300 focus:outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark shadow-sm text-base md:text-lg transition-all"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-dark transition-colors">
            {/* Ícone de Lupa */}
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grelha de Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <Link 
            href={`/${cat.slug}`} 
            key={i} 
            className="group block bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="text-3xl mb-5 opacity-90">{cat.icon}</div>
            <h3 className="text-lg font-semibold text-primary-dark mb-2 group-hover:text-black transition-colors">
              {cat.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {cat.desc}
            </p>
          </Link>
        ))}
      </div>

    </div>
  );
}