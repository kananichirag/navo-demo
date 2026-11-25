import Link from "next/link";
import { categories } from "@/lib/data";
import { renderCategoryIcon } from "@/lib/icon-map";
import { swatchGradient } from "@/lib/swatches";

export function CategoryGrid() {
  if (categories.length <= 1) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Shop by category</h2>
      <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group flex flex-col items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[rgba(38,24,15,0.08)]"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full text-white"
              style={{ backgroundImage: swatchGradient(category.swatch) }}
            >
              {renderCategoryIcon(category.icon, "h-5 w-5")}
            </span>
            <span className="text-xs font-medium text-[var(--color-ink)] sm:text-sm">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
