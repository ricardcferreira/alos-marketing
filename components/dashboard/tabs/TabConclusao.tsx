import { Row, countBy, countByMulti } from "@/lib/aggregations";
import { SectionHeading } from "@/components/dashboard/ui-helpers";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TabConclusao({ rows, total, isLoading }: { rows: Row[]; total: number; isLoading: boolean }) {
  // 1. Satisfaction Metrics
  const satisfeitos = rows.filter((r) => (r.satisfacao as string | undefined)?.trim() === "Satisfeito").length;
  const insatisfeitos = rows.filter((r) => (r.satisfacao as string | undefined)?.trim() === "Insatisfeito").length;
  const satRate = total > 0 ? Math.round((satisfeitos / total) * 100) : 0;
  const dissatRate = total > 0 ? Math.round((insatisfeitos / total) * 100) : 0;

  // 2. Burnout & Flight Risk (Concordo + Concordo Totalmente)
  const esgotados = rows.filter((r) => {
    const val = (r.percecaoEsgotamento as string | undefined)?.trim();
    return val === "Concordo" || val === "Concordo Totalmente";
  }).length;
  const burnoutRate = total > 0 ? Math.round((esgotados / total) * 100) : 0;

  const abandono = rows.filter((r) => {
    const val = (r.percecaoAbandonar as string | undefined)?.trim();
    return val === "Concordo" || val === "Concordo Totalmente";
  }).length;
  const abandonoRate = total > 0 ? Math.round((abandono / total) * 100) : 0;

  // 3. Bureaucracy Metric
  const burocracia = rows.filter((r) => {
    const val = (r.softwareBurocratico as string | undefined)?.trim();
    return val === "Concordo" || val === "Concordo Totalmente";
  }).length;
  const burocraciaRate = total > 0 ? Math.round((burocracia / total) * 100) : 0;

  // 4. Top Text Variables (converted to lowercase where appropriate)
  const software = countByMulti(rows, "software");
  const topSoftware = software[0]?.name ?? "indefinido";

  const desperdicios = countByMulti(rows, "desperdicioTempo");
  const topWastedTime = desperdicios[0]?.name?.toLowerCase() ?? "indefinido";

  const barreiras = countByMulti(rows, "barreirasAdocao");
  const topBarrier = barreiras[0]?.name?.toLowerCase() ?? "indefinido";

  const fatores = countByMulti(rows, "fatoresAdocao");
  let topFactor = (fatores[0]?.name?.toLowerCase() ?? "indefinido").replace("…", "").trim();

  if (topFactor.includes("correlação instantânea")) {
    topFactor = "correlação instantânea entre as diferentes variáveis do processo de cuidados nutricionais";
  }

  const valor = countBy(rows, "valorMensal").sort((a, b) => b.value - a.value);
  const topValor = valor[0]?.name?.toLowerCase() ?? "indefinido";

  return (
    <div>
      <SectionHeading eyebrow="Conclusão" title="Síntese Preliminar" />
      <Card className="mt-6 border-gray-300">
        <CardContent className="p-8">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-10/12" />
            </div>
          ) : (
            <div className="space-y-5 text-[15px] leading-relaxed text-foreground/90 sm:text-base">
              <p>
                A análise preliminar de <span className="font-semibold text-primary">{total} respostas</span> revela um panorama objetivo sobre o ecossistema digital na nutrição clínica em Portugal. Atualmente, a ferramenta mais reportada na gestão diária destes profissionais é <span className="font-semibold text-primary">"{topSoftware}"</span>.
              </p>
              <p>
                Os dados indicam que <span className="font-semibold text-primary">{satRate}%</span> dos inquiridos estão globalmente satisfeitos com as suas ferramentas de trabalho, enquanto <span className="font-semibold text-primary">{dissatRate}%</span> reportam insatisfação. Uma análise mais detalhada revela que <span className="font-semibold text-primary">{burocraciaRate}%</span> dos nutricionistas consideram os seus métodos de registo demasiado burocráticos, destacando-se a tarefa de <span className="font-semibold text-primary">"{topWastedTime}"</span> como a principal etapa de desperdício de tempo.
              </p>
              <p>
                Este atrito tem um impacto direto no bem-estar clínico: <span className="font-semibold text-primary">{burnoutRate}%</span> da amostra relata níveis significativos de esgotamento com o volume de trabalho administrativo e, de forma reveladora, <span className="font-semibold text-primary">{abandonoRate}%</span> já ponderaram abandonar a área da nutrição clínica.
              </p>
              <p>
                Ao perspetivar a adoção de novas tecnologias, a principal prioridade apontada para mitigar estas falhas é <span className="font-semibold text-primary">"{topFactor}"</span>. Embora a transição digital enfrente <span className="font-semibold text-primary">"{topBarrier}"</span> como o obstáculo principal, a maioria dos profissionais inquiridos considera justo investir <span className="font-semibold text-primary">{topValor}</span> numa ferramenta que elimine o desperdício de tempo e justifique o valor clínico da sua intervenção.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}