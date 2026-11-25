"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Minus, Plus, MessageCircle, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { discountPercent, formatPrice } from "@/lib/format";
import { patternStyle } from "@/lib/patterns";
import { renderCategoryIcon } from "@/lib/icon-map";
import { recordEnquiry } from "@/lib/use-seller-store";
import { generateId } from "@/lib/slug";
import type { Product, Seller } from "@/lib/types";
import { Badge, tagTone } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";

type Props = {
  product: Product;
  seller: Seller;
  categoryIcon: string;
};

const STOCK_LABEL: Record<Product["stock"], { label: string; tone: "success" | "accent" | "neutral" }> = {
  "in-stock": { label: "In stock", tone: "success" },
  "low-stock": { label: "Low stock", tone: "accent" },
  "made-to-order": { label: "Made to order", tone: "neutral" },
};

export function ProductDetailInteractive({ product, seller, categoryIcon }: Props) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(product.moq);
  const [justAdded, setJustAdded] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const { addLine } = useCart();

  const variant = product.variants[variantIndex];
  const discount = discountPercent(product.price, product.compareAtPrice);
  const stock = STOCK_LABEL[product.stock];

  const handleAdd = () => {
    addLine(product.id, variant.label, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2200);
  };

  const handleEnquiry = () => {
    recordEnquiry({
      id: generateId("enq"),
      sellerId: seller.id,
      productId: product.id,
      productName: product.name,
      createdAt: new Date().toISOString(),
      status: "open",
    });
    setEnquirySent(true);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        {product.image ? (
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div
            className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl"
            style={patternStyle({ swatch: variant.swatch, pattern: product.pattern })}
          >
            {renderCategoryIcon(categoryIcon, "h-16 w-16 text-white/70")}
          </div>
        )}
        {product.image && (
          <p className="mt-1.5 text-right text-xs text-[var(--color-ink-muted)]">
            Photo:{" "}
            <a href={product.image.creditUrl} className="underline hover:text-[var(--color-primary)]" target="_blank" rel="noopener noreferrer">
              {product.image.credit}
            </a>
          </p>
        )}
        <div className="mt-3 flex gap-2">
          {product.variants.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setVariantIndex(index)}
              className={clsx(
                "flex flex-col items-center gap-1 rounded-xl border px-2 py-2 text-xs transition",
                index === variantIndex ? "border-[var(--color-primary)]" : "border-[var(--color-border)]"
              )}
            >
              <span className="h-8 w-8 rounded-lg" style={patternStyle({ swatch: item.swatch, pattern: product.pattern })} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <Badge key={tag} tone={tagTone(tag)}>
              {tag}
            </Badge>
          ))}
          <Badge tone={stock.tone}>{stock.label}</Badge>
        </div>

        <h1 className="font-display mt-3 text-3xl font-semibold text-[var(--color-ink)]">{product.name}</h1>

        <a href={`/sellers/${seller.slug}`} className="mt-2 inline-block text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]">
          Sold by <span className="font-medium text-[var(--color-ink)]">{seller.name}</span> · {seller.city}
        </a>

        <div className="mt-2">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="font-display text-3xl font-semibold text-[var(--color-ink)]">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-base text-[var(--color-ink-muted)] line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
          {discount && <Badge tone="accent">{discount}% off</Badge>}
        </div>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">per piece · minimum order {product.moq} pcs</p>

        <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-muted)]">{product.description}</p>

        <ul className="mt-3 space-y-1.5 text-sm text-[var(--color-ink)]">
          {product.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-[var(--color-border)]">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(product.moq, q - 1))}
              className="flex h-10 w-10 items-center justify-center text-[var(--color-ink)]"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="w-12 text-center text-sm font-medium text-[var(--color-ink)]">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-10 w-10 items-center justify-center text-[var(--color-ink)]"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <span className="text-xs text-[var(--color-ink-muted)]">pcs · {formatPrice(product.price * quantity)} total</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
          >
            {justAdded ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
            {justAdded ? "Added to parcel" : "Add to parcel"}
          </button>
          <button
            type="button"
            onClick={handleEnquiry}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Ask the seller
          </button>
        </div>

        {enquirySent && (
          <p className="mt-3 rounded-xl bg-[var(--color-success-tint)] px-4 py-3 text-sm text-[var(--color-success)]">
            Your enquiry about this product was sent to {seller.name}. They typically respond in {seller.responseTime}.
          </p>
        )}
      </div>
    </div>
  );
}
