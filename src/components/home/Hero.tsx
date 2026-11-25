import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sellers } from "@/lib/data";

export function Hero() {
  const cityCount = new Set(sellers.map((seller) => seller.city)).size;

  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:pt-12">
      <div className="grid gap-6 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:gap-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center rounded-full bg-[var(--color-primary-tint)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]">
            Wholesale, simplified
          </span>
          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
            Stock your store straight from India&rsquo;s best saree sellers
          </h1>
          <p className="mt-4 max-w-md text-[var(--color-ink-muted)]">
            Browse verified wholesale catalogs, send an enquiry, and place bulk orders —
            without the middleman markup.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
            >
              Browse the catalog
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/sellers/surat-silk-house"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              See a seller profile
            </Link>
          </div>

          <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm sm:gap-x-8">
            <div>
              <dt className="text-[var(--color-ink-muted)]">Sellers</dt>
              <dd className="font-display text-xl font-semibold text-[var(--color-ink)]">{sellers.length}+</dd>
            </div>
            <div>
              <dt className="text-[var(--color-ink-muted)]">Cities</dt>
              <dd className="font-display text-xl font-semibold text-[var(--color-ink)]">{cityCount}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-ink-muted)]">Avg. response</dt>
              <dd className="font-display text-xl font-semibold text-[var(--color-ink)]">~20 min</dd>
            </div>
          </dl>
        </div>

        <div className="self-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-square">
            <Image
              src="/images/hero-saree-stack.jpg"
              alt="A stack of folded silk Kanjivaram sarees in jewel-toned colors with gold zari borders"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <p className="mt-1.5 text-right text-xs text-[var(--color-ink-muted)]">
            Photo:{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Kanchipuram_sarees_(7642285396).jpg"
              className="underline hover:text-[var(--color-primary)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kamal Venkit, CC BY 2.0, via Wikimedia Commons
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
