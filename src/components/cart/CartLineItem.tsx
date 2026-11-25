"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { ProductSwatch } from "@/components/product/ProductSwatch";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  variantLabel: string;
  quantity: number;
};

export function CartLineItem({ product, variantLabel, quantity }: Props) {
  const { setQuantity, removeLine } = useCart();

  return (
    <div className="flex gap-4 border-b border-[var(--color-border)] py-4 last:border-0">
      <div className="w-20 shrink-0">
        <ProductSwatch product={product} />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <Link href={`/products/${product.slug}`} className="font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)]">
          {product.name}
        </Link>
        <p className="text-xs text-[var(--color-ink-muted)]">Variant: {variantLabel} · MOQ {product.moq} pcs</p>

        <div className="mt-1 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <div className="flex items-center rounded-full border border-[var(--color-border)]">
            <button
              type="button"
              aria-label={`Decrease quantity of ${product.name}`}
              onClick={() => setQuantity(product.id, variantLabel, Math.max(product.moq, quantity - 1))}
              className="flex h-8 w-8 items-center justify-center text-[var(--color-ink)]"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span className="w-10 text-center text-sm font-medium text-[var(--color-ink)]">{quantity}</span>
            <button
              type="button"
              aria-label={`Increase quantity of ${product.name}`}
              onClick={() => setQuantity(product.id, variantLabel, quantity + 1)}
              className="flex h-8 w-8 items-center justify-center text-[var(--color-ink)]"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium text-[var(--color-ink)]">{formatPrice(product.price * quantity)}</span>
            <button
              type="button"
              aria-label={`Remove ${product.name} from parcel`}
              onClick={() => removeLine(product.id, variantLabel)}
              className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
