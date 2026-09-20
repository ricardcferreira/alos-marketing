import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading, MetricCard } from "@/components/dashboard/ui-helpers";

export function TabEstudo({ total, isLoading }: { total: number; isLoading: boolean }) {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeading eyebrow="Problema" title="Enquadramento do Estudo" />
        <Card className="mt-6 border-gray-300">
          <CardContent className="p-6 leading-relaxed">
            O mercado clínico carece de ferramentas que integrem o <i>Nutrition Care Process</i> <span></span>
            de forma holística. Atualmente, a gestão nutricional é fragmentada, analógica ou adaptada a softwares 
            genéricos e superficiais que não compreendem a profundidade e a especificidade da nutrição clínica. 
          </CardContent>
        </Card>
      </div>
      <div>
        <SectionHeading eyebrow="Objetivos" title="Objetivo Geral" />
        <Card className="mt-6 border-gray-300">
          <CardContent className="p-6">
            Este estudo visa compreender os verdadeiros desafios da prática clínica dos Nutricionistas e 
            mapear a relação entre tecnologia, tempo administrativo e perceção de valor profissional.
            O desenho do futuro das ferramentas de gestão e de apoio à decisão clínica permitirá devolver o foco total do nutricionista ao doente.
          </CardContent>
        </Card>
      </div>
      <div>
        <SectionHeading eyebrow="" title="Objetivos Específicos" />
        <Card className="mt-6 border-gray-300">
          <CardContent className="p-6">
            <ul className="space-y-4">
              {[
                "Identificar os principais desafios percecionados pelos nutricionistas na prática clínica atual.",
                "Avaliar o grau de satisfação com as ferramentas de software clínico em uso.",
                "Analisar o tempo administrativo perdido em tarefas de baixo valor clínico.",
                "Explorar a perceção sobre inovação e disposição para adotar soluções tecnológicas.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  {/* SVG Checkmark */}
                  <svg 
                    className="w-5 h-5 text-primary-dark/60 shrink-0 mt-[2px]" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-primary-dark/90 leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div>
        <SectionHeading eyebrow="Metodologia" title="Desenho do Estudo" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <MetricCard
            label="População"
            value={<span className="text-sm">Membros efetivos da Ordem dos Nutricionistas a exercer atualmente a sua atividade profissional na área da Nutrição Clínica.</span>}
          />
          {/* Custom Card for Amostra to allow giant text */}
          <Card className="border-border/60 border-gray-300">
            <CardContent className="p-6 flex flex-col justify-center h-full gap-4">
              <p className="text-xs font-medium uppercase tracking-tighter text-primary-dark">Amostra (n)</p>
              
              {isLoading ? (
                <Skeleton className="h-20 w-32" />
              ) : (
                <h1 className="text-primary-dark tracking-tighter leading-none">
                  {total}
                </h1>
              )}
            </CardContent>
          </Card>
          <MetricCard 
            label="Método de Amostragem" 
            value={<span className="text-sm">Não Probabilística por Autoseleção.</span>} 
          />
          <MetricCard 
            label="Recrutamento e Critérios" 
            value={<span className="text-sm">Via segmentação LinkedIn Ads, com filtro estrito de inclusão (membros efetivos com prática clínica).</span>} 
          />
        </div>
      </div>
    </div>
  );
}