import Link from "next/link";
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
      className="group block overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[rgba(38,24,15,0.08)]"
    >
      <div className="relative p-2">
        <ProductSwatch product={product} className="transition group-hover:scale-[1.02]" />
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
        {seller && <p className="text-xs text-[var(--color-ink-muted)]">{seller.name} · {seller.city}</p>}

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
