import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { sellers } from "@/lib/data";

export function Hero() {
  const cityCount = new Set(sellers.map((seller) => seller.city)).size;

  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-6 sm:pt-12">
      <div className="relative grid gap-8 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[radial-gradient(ellipse_120%_100%_at_0%_0%,var(--color-primary-tint),transparent_60%),radial-gradient(ellipse_100%_100%_at_100%_100%,var(--color-gold-tint),transparent_55%),var(--color-surface)] p-6 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[var(--color-accent-tint)] opacity-40 blur-3xl"
        />

        <div className="relative min-w-0 flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[var(--color-gold-tint)] px-3 py-1 text-xs font-semibold tracking-wide text-[var(--color-gold)]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Premium wholesale, simplified
          </span>
          <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--color-ink)] sm:text-5xl lg:text-[3.4rem]">
            Stock your store with India&rsquo;s finest handloom sarees
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--color-ink-muted)]">
            Browse verified wholesale catalogs shot editorial-style on real drapes, send an
            enquiry, and place bulk orders — without the middleman markup.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[var(--color-primary)]/20 transition hover:bg-[var(--color-primary-dark)] hover:shadow-xl"
            >
              Browse the catalog
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/sellers/surat-silk-house"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              See a seller profile
            </Link>
          </div>

          <dl className="mt-9 grid max-w-md grid-cols-3 divide-x divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/70 py-4">
            <div className="px-4 text-center sm:px-5">
              <dt className="text-xs text-[var(--color-ink-muted)]">Sellers</dt>
              <dd className="font-display mt-0.5 text-xl font-semibold text-[var(--color-ink)]">{sellers.length}+</dd>
            </div>
            <div className="px-4 text-center sm:px-5">
              <dt className="text-xs text-[var(--color-ink-muted)]">Cities</dt>
              <dd className="font-display mt-0.5 text-xl font-semibold text-[var(--color-ink)]">{cityCount}</dd>
            </div>
            <div className="px-4 text-center sm:px-5">
              <dt className="text-xs text-[var(--color-ink-muted)]">Avg. response</dt>
              <dd className="font-display mt-0.5 text-xl font-semibold text-[var(--color-ink)]">~20 min</dd>
            </div>
          </dl>
        </div>

        <div className="relative min-w-0 flex items-center justify-center lg:justify-end">
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-6 h-[85%] w-[85%] rounded-[28px] bg-[linear-gradient(135deg,var(--color-gold),var(--color-primary))] opacity-15 blur-2xl"
          />
          <div className="relative w-full max-w-sm overflow-hidden rounded-[28px] shadow-2xl shadow-black/10">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/hero-model-studio.jpg"
                alt="Model wearing an elegant jewel-toned silk saree with a gold zari brocade border, editorial studio photograph"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>

          <div className="absolute -bottom-5 left-3 flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-xl shadow-black/5 sm:-left-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-tint)] text-[var(--color-gold)]">
              <Star className="h-4 w-4 fill-current" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-[var(--color-ink)]">4.8 average rating</p>
              <p className="text-xs text-[var(--color-ink-muted)]">Across verified sellers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
