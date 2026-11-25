import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSellerById } from "@/lib/data";
import { discountPercent, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { Badge, tagTone } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { ProductSwatch } from "./ProductSwatch";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const seller = getSellerById(product.sellerId);
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition hover:-translate-y-1 hover:border-[var(--color-primary)]/40 hover:shadow-xl hover:shadow-[rgba(38,24,15,0.1)]"
    >
      <div className="relative p-2">
        <ProductSwatch product={product} className="transition duration-500 group-hover:scale-[1.03]" />
        <div className="pointer-events-none absolute inset-2 flex items-end justify-center rounded-2xl bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
          <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] shadow-sm">
            View product
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} tone={tagTone(tag)}>
              {tag}
            </Badge>
          ))}
        </div>
        {discount && (
          <Badge tone="accent" className="absolute right-3 top-3">
            {discount}% off
          </Badge>
        )}
      </div>

      <div className="space-y-1.5 px-4 pb-4">
        <p className="line-clamp-2 font-medium leading-snug text-[var(--color-ink)]">{product.name}</p>
        {seller && (
          <p className="flex items-center gap-1.5 text-xs text-[var(--color-ink-muted)]">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-tint)] text-[9px] font-bold text-[var(--color-primary-dark)]">
              {seller.name.charAt(0)}
            </span>
            {seller.name} · {seller.city}
          </p>
        )}

        <div className="flex items-center justify-between pt-1">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-display text-lg font-semibold text-[var(--color-ink)]">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-[var(--color-ink-muted)] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <p className="text-xs text-[var(--color-ink-muted)]">MOQ {product.moq} pcs</p>
      </div>
    </Link>
  );
}
