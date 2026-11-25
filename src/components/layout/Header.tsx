import Link from "next/link";
import { Search } from "lucide-react";
import { categories } from "@/lib/data";
import { renderCategoryIcon } from "@/lib/icon-map";
import { CartBadge } from "./CartBadge";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:gap-4">
        <Link href="/" className="flex items-baseline font-display text-2xl font-semibold tracking-tight text-[var(--color-primary)]">
          BA
          <span className="ml-1.5 text-sm font-normal text-[var(--color-ink-muted)]">
            Enterprises
          </span>
        </Link>

        <form action="/products" method="get" className="order-3 w-full sm:order-2 sm:w-auto sm:flex-1">
          <label htmlFor="site-search" className="sr-only">
            Search products, sellers, or categories
          </label>
          <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 focus-within:border-[var(--color-primary)]">
            <Search className="h-4 w-4 shrink-0 text-[var(--color-ink-muted)]" aria-hidden="true" />
            <input
              id="site-search"
              type="search"
              name="q"
              placeholder="Search sarees, sellers…"
              className="w-full bg-transparent text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)] focus:outline-none"
            />
          </div>
        </form>

        <nav aria-label="Account" className="order-2 ml-auto flex items-center gap-2 sm:order-3 sm:ml-0">
          <Link
            href="/seller"
            className="hidden rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] md:inline-flex"
          >
            Sell on BA
          </Link>
          <CartBadge />
        </nav>
      </div>

      {categories.length > 1 && (
        <nav aria-label="Categories" className="scroll-rail mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              {renderCategoryIcon(category.icon, "h-3.5 w-3.5")}
              {category.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
