import type { CSSProperties } from "react";
import type { Product } from "./types";
import { swatchGradient } from "./swatches";

const LINE = "rgba(255,255,255,0.16)";

export function patternStyle(product: Pick<Product, "swatch" | "pattern">): CSSProperties {
  const base = swatchGradient(product.swatch);

  switch (product.pattern) {
    case "diagonal":
      return {
        backgroundImage: `repeating-linear-gradient(45deg, ${LINE} 0px, ${LINE} 2px, transparent 2px, transparent 12px), ${base}`,
      };
    case "wave":
      return {
        backgroundImage: `repeating-linear-gradient(-45deg, ${LINE} 0px, ${LINE} 2px, transparent 2px, transparent 12px), ${base}`,
      };
    case "dot":
      return {
        backgroundImage: `radial-gradient(circle, ${LINE} 1.6px, transparent 1.7px), ${base}`,
        backgroundSize: "14px 14px, 100% 100%",
      };
    case "grid":
      return {
        backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px), ${base}`,
        backgroundSize: "16px 16px, 16px 16px, 100% 100%",
      };
    default:
      return { backgroundImage: base };
  }
}
