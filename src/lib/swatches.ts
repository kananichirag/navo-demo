import type { SwatchKey } from "./types";

interface SwatchDef {
  from: string;
  to: string;
  ink: string;
}

export const swatches: Record<SwatchKey, SwatchDef> = {
  terracotta: { from: "#f0855a", to: "#b8431c", ink: "#fff3ec" },
  berry: { from: "#c2447a", to: "#8a2355", ink: "#fdeaf2" },
  mustard: { from: "#e8b545", to: "#b9830f", ink: "#2a1d05" },
  teal: { from: "#4ba0a0", to: "#255c5c", ink: "#eafbfb" },
  plum: { from: "#8c63a0", to: "#52315f", ink: "#f6ecfa" },
  blush: { from: "#f3bcc4", to: "#d97a8a", ink: "#3a1016" },
  clay: { from: "#d6a378", to: "#9c5f38", ink: "#2c1a0c" },
  forest: { from: "#6fa07f", to: "#2f5c40", ink: "#ecf7ef" },
};

export function swatchGradient(key: SwatchKey): string {
  const swatch = swatches[key];
  return `linear-gradient(135deg, ${swatch.from}, ${swatch.to})`;
}
