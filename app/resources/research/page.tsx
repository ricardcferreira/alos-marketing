import Link from "next/link";
import { getAllResearchMeta } from "@/lib/research";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function ResearchIndexPage() {
  const studies = getAllResearchMeta();

  return (
    <main className="min-h-screen bg-cream text-primary-dark font-sans flex flex-col">
      <Header />
      
      <div className="flex-grow mx-auto max-w-6xl px-6 py-20 w-full">
        
        {/* Cabeçalho da Página */}
        <div className="text-left text-primary-dark py-24">
          <h1 className="text-6xl! font-serif mb-4">Investigação</h1>
          <p className="text-xl! max-w-xl">
            Conhecimento baseado em evidência a moldar o futuro da prática em nutrição clínica.
          </p>
        </div>

        {/* Lista Dinâmica Estilo Heidi Health */}
        <div className="flex flex-col">
          
          {studies.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum estudo publicado ainda.</p>
          ) : (
            studies.map((study) => {
              const formattedDate = new Date(study.date).toLocaleDateString('pt-PT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });

              // Definir um tempo de leitura padrão caso o autor se esqueça de preencher
              const displayReadTime = study.readTime || "5 min de leitura";

              return (
                /* 1. ADICIONADO: Div pai a envolver o cartão com a key e flex para ficarem lado a lado */
                <div key={study.slug} className="flex flex-col md:flex-row gap-12 mb-10">
                  
                  <div className="w-full md:w-[500px] h-[320px] shrink-0 rounded-sm overflow-hidden relative bg-gradient-to-tl from-white via-alos-green-light to-alos-green flex flex-col items-center justify-center">
                    {study.image ? (
                      /* Se existir imagem no Frontmatter, renderiza a imagem preenchendo o espaço */
                      <img 
                        src={study.image} 
                        alt={study.title} 
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    ) : (
                      /* Fallback: Gradiente com Texto (Mantém-se para estudos sem imagem) */
                      <div className="flex flex-col items-center justify-center p-6 w-full h-full relative z-10">
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-center space-y-4">
                    <h2 className="text-3xl font-serif text-primary-dark transition-colors">
                      {study.title}
                    </h2>
                    <div className="flex flex-col text-xs gap-0.5">
                      <span className="font-medium">{study.type}</span>
                      <span>{formattedDate}</span>
                    </div>
                    <Link 
                      href={`/resources/research/${study.slug}`} 
                      className="bg-alos-green-light text-sm text-alos-green font-medium py-1.5 px-3 cursor-pointer rounded-sm hover:bg-alos-green hover:text-white transition-colors w-fit"
                    >
                      Ler Estudo Completo
                    </Link>
                  </div>

                </div>
              );
            })
          )}
          
        </div>
      </div>

      <Footer />
    </main>
  );
}