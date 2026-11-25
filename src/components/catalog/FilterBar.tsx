import { categories } from "@/lib/data";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating";

type Props = {
  category?: string;
  q?: string;
  sort: SortOption;
};

export function FilterBar({ category, q, sort }: Props) {
  return (
    <form
      action="/products"
      method="get"
      className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:flex-row sm:flex-wrap sm:items-end"
    >
      {q && <input type="hidden" name="q" value={q} />}

      <div className="flex flex-col gap-1">
        <label htmlFor="filter-category" className="text-xs font-medium text-[var(--color-ink-muted)]">
          Category
        </label>
        <select
          id="filter-category"
          name="category"
          defaultValue={category ?? ""}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-ink)] sm:w-auto sm:py-2"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="filter-sort" className="text-xs font-medium text-[var(--color-ink-muted)]">
          Sort by
        </label>
        <select
          id="filter-sort"
          name="sort"
          defaultValue={sort}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-ink)] sm:w-auto sm:py-2"
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Highest rated</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)] sm:w-auto sm:py-2"
      >
        Apply
      </button>
    </form>
  );
}
