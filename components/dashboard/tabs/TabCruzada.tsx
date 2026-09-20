import { 
  Row, 
  crossSoftwareBySatisfacao, 
  crossDesperdicioByEsgotamento, 
  crossBarreirasByIdade, 
  crossValorByContexto,
  crossConsultasByEsgotamento,
  crossSoftwareByBurocracia,
  crossSatisfacaoByAbandono,
  crossSoftwareByValor,
  crossRegimeByFatores
} from "@/lib/aggregations";
import { ACCENT, LIKERT_ORDER, LIKERT_COLORS } from "@/lib/constants";
import { StackedBarByKeys, GroupedBarByKeys } from "@/components/dashboard/charts";
import { ChartCard, SectionHeading, LoadingGrid } from "@/components/dashboard/ui-helpers";

export function TabCruzada({ rows, isLoading }: { rows: Row[]; isLoading: boolean }) {
  if (isLoading) return <LoadingGrid />;

  // Ordering Arrays
  const idadeOrder = ["18-21", "22-24", "25-34", "35-44", "45-54", "55-64", "65+"];
  const consultasOrder = ["Menos de 5", "5 a 10", "11 a 20", "21 a 30", "Mais de 30"];
  const valorOrder = ["Até 15€ / mês", "16€ a 30€ / mês", "31€ a 50€ / mês", "51€ a 100€ / mês", "Mais de 100€ / mês"];

  // Colors
  const satKeys = ["Satisfeito", "Neutro", "Insatisfeito"];
  const satColors: Record<string, string> = {
  Satisfeito: ACCENT,
  Neutro: `color-mix(in oklab, ${ACCENT} 55%, white)`,
  Insatisfeito: `color-mix(in oklab, ${ACCENT} 25%, white)`,
};  

  // Base Aggregations (Original 4)
  const satBySoftware = crossSoftwareBySatisfacao(rows);
  const desperdicioByEsg = crossDesperdicioByEsgotamento(rows);
  const barreirasByIdade = crossBarreirasByIdade(rows, idadeOrder);
  const valorByContexto = crossValorByContexto(rows, valorOrder);

  // New Aggregations (The 5 new charts)
  const consultasByEsg = crossConsultasByEsgotamento(rows, consultasOrder);
  const burocraciaBySoftware = crossSoftwareByBurocracia(rows);
  const abandonoBySatisfacao = crossSatisfacaoByAbandono(rows);
  const valorBySoftware = crossSoftwareByValor(rows, valorOrder);
  const fatoresByRegime = crossRegimeByFatores(rows);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-12 items-start">
      
      {/* Menu Lateral (Sidebar) */}
      <aside className="hidden lg:block w-56 shrink-0 pt-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-8">Índice</p>
        <div className="sticky top-8 flex flex-col space-y-3">
          <a href="#dor" className="text-sm font-light text-foreground/70 hover:text-primary transition-colors">1. Dor e Frustração</a>
          <a href="#concorrencia" className="text-sm font-light text-foreground/70 hover:text-primary transition-colors">2. Análise da Concorrência</a>
          <a href="#business" className="text-sm font-light text-foreground/70 hover:text-primary transition-colors">3. Business Intelligence</a>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 space-y-16 min-w-0 w-full">
        
        {/* SECTION 1: Pain & Burnout */}
        <div id="dor" className="scroll-mt-12">
          <SectionHeading 
            eyebrow="1. Dor e Frustração" 
            title="O Impacto do Escalonamento no Desgaste Profissional" 
            description="Como o aumento do volume de trabalho e as tarefas administrativas afetam a saúde mental e retenção na área."
          />
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ChartCard title="O Problema de Escalabilidade (Volume vs. Esgotamento)" subtitle="Níveis de esgotamento cruzados com o número de consultas semanais">
              <StackedBarByKeys data={consultasByEsg} keys={LIKERT_ORDER} colors={LIKERT_COLORS} yLabel="Respondentes" />
            </ChartCard>
            <ChartCard title="Esgotamento vs. Etapa de Desperdício" subtitle="Perceção de esgotamento por etapa clínica onde se perde mais tempo">
              <StackedBarByKeys data={desperdicioByEsg} keys={LIKERT_ORDER} colors={LIKERT_COLORS} yLabel="Respondentes" />
            </ChartCard>
          </div>
        </div>

        {/* SECTION 2: Competitor Analysis */}
        <div id="concorrencia" className="scroll-mt-12">
          <SectionHeading 
            eyebrow="2. Análise da Concorrência" 
            title="Onde o Ecossistema Atual Falha" 
            description="Identificação direta das lacunas nas ferramentas de software clínico atualmente em uso no mercado."
          />
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ChartCard title="Satisfação Global por Software Atual" subtitle="Distribuição de satisfação entre os utilizadores de cada ferramenta">
              <StackedBarByKeys data={satBySoftware} keys={satKeys} colors={satColors} />
            </ChartCard>
            <ChartCard title="A Falha Burocrática (Concorrência vs. Burocracia)" subtitle="Concordância com 'o processo é demasiado burocrático' por software usado">
              <StackedBarByKeys data={burocraciaBySoftware} keys={LIKERT_ORDER} colors={LIKERT_COLORS} />
            </ChartCard>
          </div>
        </div>

        {/* SECTION 3: Business Intelligence */}
        <div id="business" className="scroll-mt-12">
          <SectionHeading 
            eyebrow="3. Business Intelligence" 
            title="Disposição a Pagar e Adoção Tecnológica" 
            description="Mapeamento financeiro e prioridades de features por segmento de mercado para definição da estratégia Go-to-Market."
          />
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ChartCard title="O Pipeline de Early Adopters (Software vs. Disposição a Pagar)" subtitle="Quanto os utilizadores de ferramentas atuais estão dispostos a investir">
              <GroupedBarByKeys data={valorBySoftware} keys={valorOrder} />
            </ChartCard>
            <ChartCard title="Disposição a Pagar por Contexto de Trabalho" subtitle="Capacidade financeira por tipo de local de prática (Privado, Público, etc.)">
              <GroupedBarByKeys data={valorByContexto} keys={valorOrder} />
            </ChartCard>
            <ChartCard title="Shift Digital (Regime vs. Fatores de Adoção)" subtitle="As features mais desejadas cruzadas com o regime (Online vs. Presencial)">
              <GroupedBarByKeys data={fatoresByRegime.data} keys={fatoresByRegime.keys} />
            </ChartCard>
            <ChartCard title="Barreiras à Adoção por Faixa Etária" subtitle="Principais receios tecnológicos (Preço vs. Curva de Aprendizagem) por idade">
              <GroupedBarByKeys data={barreirasByIdade.data} keys={barreirasByIdade.keys} />
            </ChartCard>
          </div>
        </div>

      </div>
    </div>
  );
}