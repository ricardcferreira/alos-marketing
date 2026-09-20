import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  Legend as RLegend 
} from "recharts";
import { ACCENT, shades, LIKERT_ORDER, LIKERT_COLORS } from "@/lib/constants";

const tooltipStyle = {
  background: "white",
  borderRadius: 8,
  fontSize: 12,
  boxShadow: "0 4px 14px -6px rgb(0 0 0 / 0.1)",
};

export function DonutChart({ data }: { data: { name: string; value: number }[] }) {
  const colors = shades(data.length);
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function PieChartFlat({ data }: { data: { name: string; value: number }[] }) {
  const colors = shades(data.length);
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={95}
          label={(e: { percent?: number }) =>
            `${Math.round((e.percent ?? 0) * 100)}%`
          }
          labelLine={false}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ColumnChart({
  data,
  height = 260,
}: {
  data: { name: string; value: number }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip cursor={{ fill: "var(--color-muted)" }} contentStyle={tooltipStyle} />
        <Bar dataKey="value" fill={ACCENT} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function HorizontalBarChart({
  data,
  height,
}: {
  data: { name: string; value: number }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height ?? Math.max(220, data.length * 42)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 24, left: 8, bottom: 0 }}
      >
        <CartesianGrid horizontal={false} stroke="var(--color-border)" strokeDasharray="3 3" />
        <XAxis
          type="number"
          allowDecimals={false}
          tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={220}
          tick={{ fontSize: 12, fill: "var(--color-foreground)" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip cursor={{ fill: "var(--color-muted)" }} contentStyle={tooltipStyle} />
        <Bar dataKey="value" fill={ACCENT} radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LikertStacked({
  data,
  height,
}: {
  data: Array<Record<string, string | number>>;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height ?? Math.max(240, data.length * 64)}>
      <BarChart
        data={data}
        layout="vertical"
        stackOffset="expand"
        margin={{ top: 4, right: 24, left: 8, bottom: 0 }}
      >
        <CartesianGrid horizontal={false} stroke="var(--color-border)" strokeDasharray="3 3" />
        <XAxis
          type="number"
          tickFormatter={(v: number) => `${Math.round(v * 100)}%`}
          tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          domain={[0, 1]}
        />
        <YAxis
          type="category"
          dataKey="statement"
          width={280}
          tick={{ fontSize: 12, fill: "var(--color-foreground)" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v: number, n: string) => [`${v}%`, n]}
        />
        <RLegend
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          iconType="square"
        />
        {LIKERT_ORDER.map((opt) => (
          <Bar key={opt} dataKey={opt} stackId="a" fill={LIKERT_COLORS[opt]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function StackedBarByKeys({
  data,
  keys,
  colors,
  height = 320,
  yLabel = "Respondentes",
}: {
  data: Array<Record<string, string | number>>;
  keys: string[];
  colors: Record<string, string>;
  height?: number;
  yLabel?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 16, left: -10, bottom: 40 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          interval={0}
          angle={-20}
          textAnchor="end"
          height={70}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          label={{
            value: yLabel,
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 11, fill: "var(--color-muted-foreground)" },
          }}
        />
        <Tooltip cursor={{ fill: "var(--color-muted)" }} contentStyle={tooltipStyle} />
        <RLegend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} iconType="square" />
        {keys.map((k) => (
          <Bar key={k} dataKey={k} stackId="s" fill={colors[k]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function GroupedBarByKeys({
  data,
  keys,
  height = 340,
}: {
  data: Array<Record<string, string | number>>;
  keys: string[];
  height?: number;
}) {
  const colors = shades(keys.length);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 16, left: -10, bottom: 40 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          tickLine={false}
          axisLine={false}
          interval={0}
          angle={-20}
          textAnchor="end"
          height={70}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip cursor={{ fill: "var(--color-muted)" }} contentStyle={tooltipStyle} />
        <RLegend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} iconType="square" />
        {keys.map((k, i) => (
          <Bar key={k} dataKey={k} fill={colors[i]} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Legend({ data }: { data: { name: string; value: number }[] }) {
  const colors = shades(data.length);
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  return (
    <ul className="mt-4 space-y-1.5 text-xs">
      {data.map((d, i) => (
        <li key={d.name} className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 truncate">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ background: colors[i] }}
            />
            <span className="truncate text-foreground/80">{d.name}</span>
          </span>
          <span className="tabular-nums text-muted-foreground">
            {d.value} · {Math.round((d.value / total) * 100)}%
          </span>
        </li>
      ))}
    </ul>
  );
}