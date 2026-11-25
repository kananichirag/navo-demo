import Image from "next/image";
import clsx from "clsx";
import { renderCategoryIcon } from "@/lib/icon-map";
import { getCategoryById } from "@/lib/data";
import { patternStyle } from "@/lib/patterns";
import { swatches } from "@/lib/swatches";
import type { Product } from "@/lib/types";

type Props = {
  product: Pick<Product, "swatch" | "pattern" | "categoryId" | "images">;
  className?: string;
  sizes?: string;
};

export function ProductSwatch({ product, className, sizes = "(min-width: 640px) 256px, 50vw" }: Props) {
  const cover = product.images?.[0];
  if (cover) {
    return (
      <div className={clsx("relative aspect-[4/5] overflow-hidden rounded-2xl", className)}>
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const category = getCategoryById(product.categoryId);
  const ink = swatches[product.swatch].ink;

  return (
    <div
      className={clsx("relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl", className)}
      style={patternStyle(product)}
    >
      {renderCategoryIcon(category?.icon ?? "Sparkles", "h-10 w-10 opacity-40", { color: ink })}
    </div>
  );
}
