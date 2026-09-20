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
            <ul className="space-y-3">
              {[
                "1. Identificar os principais desafios percecionados pelos nutricionistas na prática clínica atual.",
                "2. Avaliar o grau de satisfação com as ferramentas de software clínico em uso.",
                "3. Analisar o tempo administrativo perdido em tarefas de baixo valor clínico.",
                "4. Explorar a perceção sobre inovação e disposição para adotar soluções tecnológicas.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full" />
                  <span>{t}</span>
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
            value={<span className="text-sm font-normal text-foreground/80">Membros efetivos da Ordem dos Nutricionistas a exercer atualmente a sua atividade profissional na área da Nutrição Clínica.</span>}
          />
          <MetricCard
            label="Amostra (n)"
            value={
              isLoading ? (
                <Skeleton className="h-12 w-24" />
              ) : (
                <span className="text-5xl font-semibold text-primary">{total}</span>
              )
            }
          />
          <MetricCard 
            label="Método de Amostragem" 
            value={<span className="text-sm font-normal text-foreground/80">Não Probabilística por Autoseleção.</span>} 
          />
          <MetricCard 
            label="Recrutamento e Critérios" 
            value={<span className="text-sm font-normal text-foreground/80">Via segmentação LinkedIn Ads, com filtro estrito de inclusão (membros efetivos com prática clínica).</span>} 
          />
        </div>
      </div>
    </div>
  );
}