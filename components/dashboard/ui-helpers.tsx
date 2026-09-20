import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={"border-border/60 shadow-sm/0 border-gray-300 " + (className ?? "")}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base tracking-tight">
          {title}
        </CardTitle>
        {subtitle ? (
          <p className="text-xs text-primary-dark">{subtitle}</p>
        ) : null}
      </CardHeader>
      <CardContent className="pt-2">{children}</CardContent>
    </Card>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-tighter text-primary-dark/80">
        {eyebrow}
      </span>
      <span className="text-[1.2rem] mt-1 font-medium text-primary-dark">
        {title}
      </span>
      {description ? (
        <p className="mt-2 max-w-2xl text-xs text-primary-dark">{description}</p>
      ) : null}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <Card className="border-border/60 border-gray-300">
      <CardContent className="p-6">
        <p className="text-xs font-medium uppercase tracking-tighter text-primary-dark">
          {label}
        </p>
        <div className="mt-3">{value}</div>
        {hint ? <p className="mt-3 text-xs text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}

export function LoadingGrid() {
  const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-3", "lg:col-span-4", "lg:col-span-2", "lg:col-span-6"];
  return (
    <div className="grid gap-6 lg:grid-cols-6">
      {spans.map((s, i) => (
        <Card key={i} className={`border-border/60 shadow-sm ${s}`}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-2 h-3 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[240px] w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}