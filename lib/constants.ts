export const API_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7S6DYjvIDj_yjex3uhjEPuhWwU-_FFHXafboBXrWte0ZjtXubiU6XAdBrscSkPzpUrNmRKsO6Sz1c/pub?gid=0&single=true&output=csv";

export const ACCENT = "#98C191";

export const shades = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const alpha = 1 - (i / Math.max(n, 1)) * 0.7;
    return `color-mix(in oklab, ${ACCENT} ${Math.round(alpha * 100)}%, white)`;
  });

export const LIKERT_ORDER = [
  "Discordo Totalmente",
  "Discordo",
  "Neutro",
  "Concordo",
  "Concordo Totalmente",
];

export const LIKERT_COLORS: Record<string, string> = {
  "Discordo Totalmente": `color-mix(in oklab, ${ACCENT} 20%, white)`,
  Discordo: `color-mix(in oklab, ${ACCENT} 40%, white)`,
  Neutro: `color-mix(in oklab, ${ACCENT} 55%, white)`,
  Concordo: `color-mix(in oklab, ${ACCENT} 80%, white)`,
  "Concordo Totalmente": ACCENT,
};