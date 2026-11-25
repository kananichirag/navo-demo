import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProductById, getSellerById } from "@/lib/data";
import { discountPercent, formatPrice } from "@/lib/format";
import { Badge, tagTone } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";

const FLAGSHIP_ID = "p9";
const SUPPORTING_IDS = ["p1", "p3", "p7"];

export function FeaturedLookbook() {
  const flagship = getProductById(FLAGSHIP_ID);
  const supporting = SUPPORTING_IDS.map(getProductById).filter((product) => product !== undefined);

  if (!flagship) return null;

  const flagshipImage = flagship.images?.[0];
  const flagshipSeller = getSellerById(flagship.sellerId);
  const flagshipDiscount = discountPercent(flagship.price, flagship.compareAtPrice);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Styled on model</h2>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            See exactly how these bestsellers drape before you stock them
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-5">
        <Link
          href={`/products/${flagship.slug}`}
          className="group relative min-w-0 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-ink)] text-white transition hover:shadow-2xl hover:shadow-black/20 lg:col-span-3"
        >
          <div className="grid sm:grid-cols-2">
            {flagshipImage && (
              <div className="relative aspect-[4/5] sm:aspect-auto">
                <Image
                  src={flagshipImage.src}
                  alt={flagshipImage.alt}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:bg-gradient-to-r" />
              </div>
            )}
            <div className="relative flex flex-col justify-center gap-3 p-6 sm:p-8">
              <Badge tone="gold">Heirloom pick</Badge>
              <h3 className="font-display text-2xl font-semibold leading-snug sm:text-3xl">{flagship.name}</h3>
              {flagshipSeller && (
                <p className="text-sm text-white/70">
                  {flagshipSeller.name} · {flagshipSeller.city}
                </p>
              )}
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-semibold">{formatPrice(flagship.price)}</span>
                {flagship.compareAtPrice && (
                  <span className="text-sm text-white/50 line-through">{formatPrice(flagship.compareAtPrice)}</span>
                )}
                {flagshipDiscount && <Badge tone="accent">{flagshipDiscount}% off</Badge>}
              </div>
              <span className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--color-gold-tint)] transition group-hover:gap-2.5">
                Shop this look
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>

        <div className="grid min-w-0 gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
          {supporting.map((product) => {
            if (!product) return null;
            const cover = product.images?.[0];
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex gap-3 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[rgba(38,24,15,0.08)] sm:flex-col lg:flex-row"
              >
                {cover && (
                  <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl sm:aspect-[4/5] sm:w-full lg:aspect-square lg:w-20">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      sizes="160px"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                <div className="flex min-w-0 flex-col justify-center gap-1 px-1 py-0.5">
                  <p className="line-clamp-1 text-sm font-medium text-[var(--color-ink)]">{product.name}</p>
                  <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-sm font-semibold text-[var(--color-ink)]">
                      {formatPrice(product.price)}
                    </span>
                    <Badge tone={tagTone("Bestseller")} className="ml-auto">
                      Bestseller
                    </Badge>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
