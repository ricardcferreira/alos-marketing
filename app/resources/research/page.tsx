import Link from "next/link";
import { getAllResearchMeta } from "@/lib/research";
import NavBar from "@/components/home-page/NavBar";
import Footer from "@/components/home-page/Foot";

export default function ResearchIndexPage() {
  const studies = getAllResearchMeta();

  return (
    <main className="min-h-screen bg-cream-light text-primary-dark font-sans flex flex-col">
      <NavBar />
      
      <div className="flex-grow mx-auto max-w-6xl px-6 py-20 w-full">
        
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
              return (
                <div key={study.slug} className="flex flex-col md:flex-row gap-12 mb-10">
                  
                  <div className="w-full sm:w-[420px] h-[320px] shrink-0 rounded-sm overflow-hidden relative bg-gradient-to-tl from-white via-alos-green-light to-alos-green flex flex-col items-center justify-center">
                    {study.image ? (
                      <img 
                        src={study.image} 
                        alt={study.title} 
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    ) : (
                      /* Fallback */
                      <div className="flex flex-col items-center justify-center p-6 w-full h-full relative z-10">
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-center space-y-6">
                    <div className="-space-y-4">
                      <h2 className="text-3xl font-serif text-primary-dark transition-colors">
                        {study.title}
                      </h2>
                      <p className="text-sm text-primary-dark max-w-xs sm:max-w-sm transition-colors">
                        {study.leadWallTitle}
                      </p>
                    </div>
                    <div className="flex flex-col text-xs gap-0.5">
                      <span className="font-medium">{study.type}</span>
                      <span>{study.date}</span>
                      <Link 
                      href={`/resources/research/${study.slug}`} 
                      className="inline-flex cursor-pointer mt-4 items-center justify-center w-fit font-medium rounded-lg px-3 py-2 text-sm transition-colors border bg-alos-green-light text-alos-green hover:bg-alos-green border-alos-green hover:text-white"
                    >
                      Ler o estudo completo
                    </Link>
                    </div>
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