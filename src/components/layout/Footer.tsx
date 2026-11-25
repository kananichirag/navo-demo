import Link from "next/link";
import { categories } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold text-[var(--color-primary)]">BA Enterprises</p>
          <p className="mt-2 max-w-xs text-sm text-[var(--color-ink-muted)]">
            A wholesale marketplace demo connecting saree sellers with retail shop owners —
            catalogs, enquiries, and bulk ordering in one place.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--color-ink)]">Shop by category</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-muted)]">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/products?category=${category.id}`} className="hover:text-[var(--color-primary)]">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--color-ink)]">For sellers</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-muted)]">
            <li><Link href="/seller" className="hover:text-[var(--color-primary)]">Seller dashboard</Link></li>
            <li><Link href="/sellers/surat-silk-house" className="hover:text-[var(--color-primary)]">Sample seller profile</Link></li>
            <li><Link href="/products" className="hover:text-[var(--color-primary)]">Browse the catalog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--color-ink)]">About this demo</h3>
          <p className="mt-3 text-sm text-[var(--color-ink-muted)]">
            Built as a product demo — no real payments, accounts, or messages are sent.
          </p>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-ink-muted)]">
        © {new Date().getFullYear()} BA Enterprises. For illustration purposes only.
      </div>
    </footer>
  );
}
