import { Row, countBy, countByMulti, sortByOrder, likertDistribution } from "@/lib/aggregations";
import { DonutChart, Legend, HorizontalBarChart, ColumnChart, LikertStacked, PieChartFlat } from "@/components/dashboard/charts";
import { ChartCard, SectionHeading, LoadingGrid } from "@/components/dashboard/ui-helpers";
import { Card, CardContent } from "@/components/ui/card";

export function TabResultados({ rows, isLoading }: { rows: Row[]; isLoading: boolean }) {
  if (isLoading) return <LoadingGrid />;

  // --- Sec 1: Demographics ---
  const genero = countBy(rows, "genero");
  const idadeOrder = ["18-21", "22-24", "25-34", "35-44", "45-54", "55-64", "65+"];
  const idade = sortByOrder(countBy(rows, "idade"), idadeOrder);
  const habilitacoes = countBy(rows, "habilitacoes").sort((a, b) => b.value - a.value);
  const situacao = countBy(rows, "situacaoProfissional").sort((a, b) => b.value - a.value);

  // --- Sec 2: Clinical Context ---
  const inscrito = countBy(rows, "inscrito");
  const regime = countBy(rows, "regime").sort((a, b) => b.value - a.value);
  const contextos = countByMulti(rows, "contextos").slice(0, 10);
  const consultasOrder = ["Menos de 5", "5 a 10", "11 a 20", "21 a 30", "Mais de 30"];
  const consultas = sortByOrder(countBy(rows, "consultas"), consultasOrder);

  // --- Sec 3: Profession challenges (Likert) ---
  const desafios = likertDistribution(rows, [
    { key: "percecaoEsgotamento", label: "Sinto-me esgotado(a) com o volume administrativo" },
    { key: "percecaoRecompensa", label: "A prática é mal recompensada financeiramente" },
    { key: "percecaoExpectativa", label: "A realidade não reflete a expectativa" },
    { key: "percecaoAbandonar", label: "Já ponderei abandonar a nutrição clínica" },
  ]);

  // --- Sec 4: Current ecosystem ---
  const software = countByMulti(rows, "software").slice(0, 10);
  const satisfacao = sortByOrder(countBy(rows, "satisfacao"), ["Satisfeito", "Neutro", "Insatisfeito"]);
  const desperdicio = countByMulti(rows, "desperdicioTempo").slice(0, 8);
  const softwareLikert = likertDistribution(rows, [
    { key: "softwareSuperficial", label: "O sistema atual é superficial no detalhe clínico" },
    { key: "softwareBurocratico", label: "O processo de registo é demasiado burocrático" },
    { key: "softwareConfuso", label: "A informação apresentada é visualmente confusa" },
    { key: "softwarePrescricao", label: "As ferramentas focam-se apenas na prescrição" },
    { key: "softwareTextoLivre", label: "O registo é feito em texto-livre não estruturado" },
  ]);

  // --- Sec 5: Future & Innovation ---
  const futuroLikert = likertDistribution(rows, [
    { key: "futuroDecisao", label: "Registo estruturado facilita a decisão baseada em evidência" },
    { key: "futuroAutomatizar", label: "É essencial automatizar processos repetitivos" },
    { key: "futuroValor", label: "Ter dados concretos justifica o valor da intervenção" },
    { key: "futuroMotivacao", label: "Apresentação visual aumenta a motivação do doente" },
    { key: "futuroEspecializada", label: "Prefiro uma ferramenta especializada no Processo de Cuidados" },
  ]);
  const fatores = countByMulti(rows, "fatoresAdocao").slice(0, 8);
  const barreiras = countByMulti(rows, "barreirasAdocao").slice(0, 8);
  const valorOrder = ["Até 15€ / mês", "16€ a 30€ / mês", "31€ a 50€ / mês", "51€ a 100€ / mês", "Mais de 100€ / mês"];
  const valorMensal = sortByOrder(countBy(rows, "valorMensal"), valorOrder);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-12 items-start">
      
      {/* Menu Lateral (Sidebar) - Escondido em telemóveis, fixo em desktops */}
      <aside className="hidden lg:block w-56 shrink-0 pt-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-8">Índice</p>
        <div className="sticky top-8 flex flex-col space-y-3">
          <a href="#demografia" className="text-sm font-light text-foreground/70 hover:text-primary transition-colors">1. Demografia</a>
          <a href="#atividade" className="text-sm font-light text-foreground/70 hover:text-primary transition-colors">2. Atividade Clínica</a>
          <a href="#desafios" className="text-sm font-light text-foreground/70 hover:text-primary transition-colors">3. Desafios Profissionais</a>
          <a href="#ecossistema" className="text-sm font-light text-foreground/70 hover:text-primary transition-colors">4. Ecossistema Digital</a>
          <a href="#inovacao" className="text-sm font-light text-foreground/70 hover:text-primary transition-colors">5. Inovação</a>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 space-y-16 min-w-0 w-full">
        {/* Secção 1: Demografia */}
        <div id="demografia" className="scroll-mt-12">
          <SectionHeading eyebrow="1. Demografia" title="Caracterização Sociodemográfica" />
          <div className="mt-6 grid gap-6 lg:grid-cols-6">
            <ChartCard title="Género" className="lg:col-span-2"><DonutChart data={genero} /><Legend data={genero} /></ChartCard>
            <ChartCard title="Faixa etária" className="lg:col-span-2"><DonutChart data={idade} /><Legend data={idade} /></ChartCard>
            <ChartCard title="Habilitações literárias" className="lg:col-span-2"><DonutChart data={habilitacoes} /><Legend data={habilitacoes} /></ChartCard>
            <ChartCard title="Situação profissional atual" className="lg:col-span-6"><HorizontalBarChart data={situacao} height={200} /></ChartCard>
          </div>
        </div>

        {/* Secção 2: Contexto Clínico */}
        <div id="atividade" className="scroll-mt-12">
          <SectionHeading eyebrow="2. Atividade Clínica" title="Enquadramento e Volume de Prática" />
          <div className="mt-6 grid gap-6 lg:grid-cols-6">
            <ChartCard title="Regime de consultas" className="lg:col-span-2"><PieChartFlat data={regime} /><Legend data={regime} /></ChartCard>
            <ChartCard title="Volume semanal" subtitle="Consultas de nutrição por semana" className="lg:col-span-2"><ColumnChart data={consultas} /></ChartCard>
            <ChartCard title="Contextos de prática clínica" subtitle="Onde exerce atividade" className="lg:col-span-6"><HorizontalBarChart data={contextos} height={260} /></ChartCard>
          </div>
        </div>

        {/* Secção 3: Desafios */}
        <div id="desafios" className="scroll-mt-12">
          <SectionHeading eyebrow="3. Desafios Profissionais" title="Perceção sobre o Exercício da Profissão" description="Distribuição de respostas (escala Likert)." />
          <Card className="mt-6 border-border-300"><CardContent className="pt-6"><LikertStacked data={desafios} height={300} /></CardContent></Card>
        </div>

        {/* Secção 4: Ecossistema Atual */}
        <div id="ecossistema" className="scroll-mt-12">
          <SectionHeading eyebrow="4. Ecossistema Digital" title="Avaliação das Ferramentas Atuais" />
          <div className="mt-6 grid gap-6 lg:grid-cols-6">
            <ChartCard title="Software / Ferramentas em uso" subtitle="Múltipla escolha" className="lg:col-span-4"><HorizontalBarChart data={software} height={240} /></ChartCard>
            <ChartCard title="Satisfação global" subtitle="Com as ferramentas atuais" className="lg:col-span-2"><PieChartFlat data={satisfacao} /><Legend data={satisfacao} /></ChartCard>
            <ChartCard title="Etapas de maior desperdício de tempo" subtitle="No acompanhamento de um doente" className="lg:col-span-6"><HorizontalBarChart data={desperdicio} height={240} /></ChartCard>
            <ChartCard title="Avaliação crítica do método de registo atual" subtitle="Análise das falhas (Likert)" className="lg:col-span-6"><LikertStacked data={softwareLikert} height={320} /></ChartCard>
          </div>
        </div>

        {/* Secção 5: Inovação */}
        <div id="inovacao" className="scroll-mt-12">
          <SectionHeading eyebrow="5. Inovação" title="Adoção de Novas Ferramentas" />
          <div className="mt-6 grid gap-6 lg:grid-cols-6">
            <ChartCard title="Visão sobre o futuro da prática clínica" subtitle="A importância da tecnologia" className="lg:col-span-6"><LikertStacked data={futuroLikert} height={320} /></ChartCard>
            <ChartCard title="Fatores decisivos para adoção" subtitle="O que pesa na decisão" className="lg:col-span-3"><HorizontalBarChart data={fatores} height={240} /></ChartCard>
            <ChartCard title="Maiores barreiras e preocupações" subtitle="O que impede a adoção" className="lg:col-span-3"><HorizontalBarChart data={barreiras} height={240} /></ChartCard>
            <ChartCard title="Valor mensal aceitável" subtitle="Considerando o tempo poupado" className="lg:col-span-6">
              <div className="grid gap-6 md:grid-cols-2 md:items-center"><DonutChart data={valorMensal} /><Legend data={valorMensal} /></div>
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
}