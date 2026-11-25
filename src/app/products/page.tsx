import type { Metadata } from "next";
import { categories, products } from "@/lib/data";
import { FilterBar, type SortOption } from "@/components/catalog/FilterBar";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Browse the catalog — BA Enterprises",
};

function sortProducts(list: typeof products, sort: SortOption) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}

export default async function ProductsPage(props: PageProps<"/products">) {
  const searchParams = await props.searchParams;
  const categoryParam = Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category;
  const qParam = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  const sortParam = (Array.isArray(searchParams.sort) ? searchParams.sort[0] : searchParams.sort) as
    | SortOption
    | undefined;
  const sort: SortOption = sortParam ?? "relevance";

  const query = qParam?.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesCategory = !categoryParam || product.categoryId === categoryParam;
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const sorted = sortProducts(filtered, sort);
  const activeCategory = categories.find((category) => category.id === categoryParam);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-[var(--color-ink)]">
          {activeCategory ? activeCategory.name : "All products"}
        </h1>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          {sorted.length} product{sorted.length === 1 ? "" : "s"}
          {query && <> matching &ldquo;{qParam}&rdquo;</>}
        </p>
      </div>

      <div className="mb-8">
        <FilterBar category={categoryParam} q={qParam} sort={sort} />
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--color-border)] p-12 text-center text-[var(--color-ink-muted)]">
          No products match these filters yet. Try a different category or search term.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
