import { LIKERT_ORDER } from "./constants";
import Papa from 'papaparse';

export type Row = Record<string, string | number | undefined>;

// 1. Define standard options here! 
export const STANDARD_OPTIONS: Record<string, string[]> = {
  software: [
    "Softwares de Nutrição",
    "Softwares de Gestão Clínica Multidisciplinar", 
    "Excel",
    "Métodos analógicos"
  ],
  contextos: [
    "Hospital Público/ULS",
    "Hospital Privado",
    "Clínica Privada",
    "Consultório Próprio/Freelancer",
    "Ginásios/Centros Desportivos",
    "IPSS/Lares de Idosos/Centros Comunitários",
  ],
};

export async function fetchData(url: string): Promise<Row[]> {
  const urlSemCache = `${url}&t=${new Date().getTime()}`;
  
  const res = await fetch(urlSemCache);
  if (!res.ok) throw new Error("Falha ao carregar dados");
  
  const csvText = await res.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawRows = results.data as Record<string, any>[];
        
        const formattedData = rawRows.map(row => {
          const formattedRow: Row = {};
          for (const key in row) {
            if (row.hasOwnProperty(key)) {
              let camelKey = key.charAt(0).toLowerCase() + key.slice(1);
              camelKey = camelKey.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              formattedRow[camelKey] = row[key];
            }
          }
          return formattedRow;
        });
        
        resolve(formattedData);
      },
      error: (err: any) => reject(err)
    });
  });
}

export function countBy(rows: Row[], key: string) {
  const map = new Map<string, number>();
  for (const r of rows) {
    const v = (r[key] as string | undefined)?.toString().trim();
    if (!v) continue;
    map.set(v, (map.get(v) ?? 0) + 1);
  }
  return Array.from(map, ([name, value]) => ({ name, value }));
}

// Passes the key to splitMulti to check for standard options
export function countByMulti(rows: Row[], key: string) {
  const map = new Map<string, number>();
  for (const r of rows) {
    const raw = r[key] as string | undefined;
    if (!raw) continue;
    
    const parts = splitMulti(raw, key);
      
    for (const p of parts) {
      const short = p.length > 70 ? p.slice(0, 67) + "…" : p;
      map.set(short, (map.get(short) ?? 0) + 1);
    }
  }
  return Array.from(map, ([name, value]) => ({ name, value })).sort(
    (a, b) => b.value - a.value,
  );
}

export function sortByOrder<T extends { name: string }>(items: T[], order: string[]) {
  return [...items].sort((a, b) => {
    const ia = order.indexOf(a.name);
    const ib = order.indexOf(b.name);
    if (ia === -1 && ib === -1) return 0;
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

export function likertDistribution(rows: Row[], keys: { key: string; label: string }[]) {
  return keys.map(({ key, label }) => {
    const counts: Record<string, number> = {};
    for (const opt of LIKERT_ORDER) counts[opt] = 0;
    let total = 0;
    for (const r of rows) {
      const v = (r[key] as string | undefined)?.trim();
      if (!v) continue;
      if (!(v in counts)) counts[v] = 0;
      counts[v] += 1;
      total += 1;
    }
    const row: Record<string, string | number> = { statement: label, total };
    for (const opt of LIKERT_ORDER) {
      row[opt] = total > 0 ? Math.round((counts[opt] / total) * 1000) / 10 : 0;
    }
    return row;
  });
}

export function agreementRate(rows: Row[], key: string) {
  let agree = 0;
  let total = 0;
  for (const r of rows) {
    const v = (r[key] as string | undefined)?.trim();
    if (!v) continue;
    total += 1;
    if (v === "Concordo" || v === "Concordo Totalmente") agree += 1;
  }
  return total > 0 ? Math.round((agree / total) * 100) : 0;
}

// Now accepts the column key and aggregates custom answers into "Outras"
export function splitMulti(raw: string | undefined, key?: string): string[] {
  if (!raw) return [];
  
  const parsed = raw
    .split(/,\s*(?![^(]*\))/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .map((s) => s.replace(/\s*\(ex\.[^)]*\)\s*/gi, " ").trim())
    .filter(Boolean);

  // If no standard options are defined for this key, return normally
  if (!key || !STANDARD_OPTIONS[key]) return parsed;

  const standards = STANDARD_OPTIONS[key];
  
  return Array.from(
    new Set(
      parsed.map((item) => {
        const isStandard = standards.some(
          (opt) => opt.toLowerCase() === item.toLowerCase()
        );
        return isStandard ? standards.find(opt => opt.toLowerCase() === item.toLowerCase()) || item : "Outras";
            })
          )
        );
  }

export function shortLabel(s: string, max = 26) {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

export function crossSoftwareBySatisfacao(rows: Row[]) {
  const cats = ["Satisfeito", "Neutro", "Insatisfeito"];
  const map = new Map<string, Record<string, number>>();
  for (const r of rows) {
    const sat = (r.satisfacao as string | undefined)?.trim();
    if (!sat || !cats.includes(sat)) continue;
    const tools = splitMulti(r.software as string | undefined, "software");
    for (const t of tools) {
      const key = shortLabel(t, 30);
      if (!map.has(key)) map.set(key, { Satisfeito: 0, Neutro: 0, Insatisfeito: 0 });
      map.get(key)![sat] += 1;
    }
  }
  return Array.from(map, ([name, counts]) => ({
    name,
    total: counts.Satisfeito + counts.Neutro + counts.Insatisfeito,
    ...counts,
  }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);
}

export function crossDesperdicioByEsgotamento(rows: Row[]) {
  const map = new Map<string, Record<string, number>>();
  for (const r of rows) {
    const esg = (r.percecaoEsgotamento as string | undefined)?.trim();
    if (!esg || !LIKERT_ORDER.includes(esg)) continue;
    const etapas = splitMulti(r.desperdicioTempo as string | undefined, "desperdicioTempo");
    for (const e of etapas) {
      const key = shortLabel(e, 30);
      if (!map.has(key)) {
        map.set(
          key,
          Object.fromEntries(LIKERT_ORDER.map((k) => [k, 0])) as Record<string, number>,
        );
      }
      map.get(key)![esg] += 1;
    }
  }
  return Array.from(map, ([name, counts]) => {
    const total = LIKERT_ORDER.reduce((s, k) => s + counts[k], 0);
    return { name, total, ...counts };
  })
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);
}

export function crossBarreirasByIdade(rows: Row[], ageOrder: string[]) {
  const barrierCounts = new Map<string, number>();
  for (const r of rows) {
    for (const b of splitMulti(r.barreirasAdocao as string | undefined, "barreirasAdocao")) {
      barrierCounts.set(b, (barrierCounts.get(b) ?? 0) + 1);
    }
  }
  const topBarriers = Array.from(barrierCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([n]) => n);
  const shortTop = topBarriers.map((b) => shortLabel(b, 24));
  const rowsByAge = ageOrder
    .map((age) => {
      const entry: Record<string, string | number> = { name: age };
      shortTop.forEach((s) => (entry[s] = 0));
      let any = 0;
      for (const r of rows) {
        if ((r.idade as string | undefined)?.trim() !== age) continue;
        const bs = splitMulti(r.barreirasAdocao as string | undefined, "barreirasAdocao");
        topBarriers.forEach((b, i) => {
          if (bs.includes(b)) {
            entry[shortTop[i]] = (entry[shortTop[i]] as number) + 1;
            any += 1;
          }
        });
      }
      return { entry, any };
    })
    .filter((x) => x.any > 0)
    .map((x) => x.entry);
  return { data: rowsByAge, keys: shortTop };
}

export function crossValorByContexto(rows: Row[], valorOrder: string[]) {
  const contextCounts = new Map<string, number>();
  for (const r of rows) {
    for (const c of splitMulti(r.contextos as string | undefined, "contextos")) {
      contextCounts.set(c, (contextCounts.get(c) ?? 0) + 1);
    }
  }
  const topContexts = Array.from(contextCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([n]) => n);
  const data = topContexts.map((ctx) => {
    const entry: Record<string, string | number> = { name: shortLabel(ctx, 22) };
    valorOrder.forEach((v) => (entry[v] = 0));
    for (const r of rows) {
      const cs = splitMulti(r.contextos as string | undefined, "contextos");
      if (!cs.includes(ctx)) continue;
      const v = (r.valorMensal as string | undefined)?.trim();
      if (v && valorOrder.includes(v)) {
        entry[v] = (entry[v] as number) + 1;
      }
    }
    return entry;
  });
  return data;
}

// --- NEW CROSS-ANALYSIS FUNCTIONS ---

export function crossConsultasByEsgotamento(rows: Row[], consultasOrder: string[]) {
  const data = consultasOrder.map((c) => {
    const entry: Record<string, string | number> = { name: c };
    LIKERT_ORDER.forEach((l) => (entry[l] = 0));
    return entry;
  });
  for (const r of rows) {
    const c = (r.consultas as string | undefined)?.trim();
    const esg = (r.percecaoEsgotamento as string | undefined)?.trim();
    if (c && esg && consultasOrder.includes(c) && LIKERT_ORDER.includes(esg)) {
      const row = data.find((d) => d.name === c);
      if (row) row[esg] = (row[esg] as number) + 1;
    }
  }
  return data;
}

export function crossSoftwareByBurocracia(rows: Row[]) {
  const map = new Map<string, Record<string, number>>();
  for (const r of rows) {
    const bur = (r.softwareBurocratico as string | undefined)?.trim();
    if (!bur || !LIKERT_ORDER.includes(bur)) continue;
    const tools = splitMulti(r.software as string | undefined, "software");
    for (const t of tools) {
      const key = shortLabel(t, 30);
      if (!map.has(key)) {
        map.set(
          key,
          Object.fromEntries(LIKERT_ORDER.map((k) => [k, 0])) as Record<string, number>
        );
      }
      map.get(key)![bur] += 1;
    }
  }
  return Array.from(map, ([name, counts]) => {
    const total = LIKERT_ORDER.reduce((sum, k) => sum + counts[k], 0);
    return { name, total, ...counts };
  })
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);
}

export function crossSatisfacaoByAbandono(rows: Row[]) {
  const satOrder = ["Satisfeito", "Neutro", "Insatisfeito"];
  const data = satOrder.map((s) => {
    const entry: Record<string, string | number> = { name: s };
    LIKERT_ORDER.forEach((l) => (entry[l] = 0));
    return entry;
  });
  for (const r of rows) {
    const sat = (r.satisfacao as string | undefined)?.trim();
    const ab = (r.percecaoAbandonar as string | undefined)?.trim();
    if (sat && ab && satOrder.includes(sat) && LIKERT_ORDER.includes(ab)) {
      const row = data.find((d) => d.name === sat);
      if (row) row[ab] = (row[ab] as number) + 1;
    }
  }
  return data;
}

export function crossSoftwareByValor(rows: Row[], valorOrder: string[]) {
  const map = new Map<string, Record<string, number>>();
  for (const r of rows) {
    const v = (r.valorMensal as string | undefined)?.trim();
    if (!v || !valorOrder.includes(v)) continue;
    const tools = splitMulti(r.software as string | undefined, "software");
    for (const t of tools) {
      const key = shortLabel(t, 30);
      if (!map.has(key)) {
        map.set(
          key,
          Object.fromEntries(valorOrder.map((k) => [k, 0])) as Record<string, number>
        );
      }
      map.get(key)![v] += 1;
    }
  }
  return Array.from(map, ([name, counts]) => ({
    name,
    total: Object.values(counts).reduce((a, b) => a + b, 0),
    ...counts,
  }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);
}

export function crossRegimeByFatores(rows: Row[]) {
  const factorCounts = new Map<string, number>();
  for (const r of rows) {
    const fs = splitMulti(r.fatoresAdocao as string | undefined, "fatoresAdocao");
    for (const f of fs) factorCounts.set(f, (factorCounts.get(f) ?? 0) + 1);
  }
  const topFactors = Array.from(factorCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map((e) => e[0]);
  const shortTop = topFactors.map((f) => shortLabel(f, 24));

  const regimeMap = new Map<string, number>();
  for (const r of rows) {
    const reg = (r.regime as string | undefined)?.trim();
    if (reg) regimeMap.set(reg, (regimeMap.get(reg) ?? 0) + 1);
  }
  const topRegimes = Array.from(regimeMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map((e) => e[0]);

  const data = topRegimes.map((reg) => {
    const entry: Record<string, string | number> = { name: shortLabel(reg, 20) };
    shortTop.forEach((f) => (entry[f] = 0));
    for (const r of rows) {
      if ((r.regime as string | undefined)?.trim() === reg) {
        const fs = splitMulti(r.fatoresAdocao as string | undefined, "fatoresAdocao");
        topFactors.forEach((f, i) => {
          if (fs.includes(f)) {
            entry[shortTop[i]] = (entry[shortTop[i]] as number) + 1;
          }
        });
      }
    }
    return entry;
  });

  return { data, keys: shortTop };
}