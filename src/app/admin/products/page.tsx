"use client";

import { getSellerById } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { useAllCatalogs } from "@/lib/use-seller-store";
import type { Product } from "@/lib/types";
import { ProductSwatch } from "@/components/product/ProductSwatch";
import { Badge } from "@/components/ui/Badge";

const STOCK_LABEL: Record<Product["stock"], string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "made-to-order": "Made to order",
};

export default function AdminProductsPage() {
  const catalog = useAllCatalogs();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">All products ({catalog.length})</h1>
      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
        Read-only — sellers manage their own listings from their seller dashboard.
      </p>

      <div className="mt-5 space-y-3">
        {catalog.map((product) => {
          const seller = getSellerById(product.sellerId);
          return (
            <div
              key={product.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3"
            >
              <div className="w-16 shrink-0">
                <ProductSwatch product={product} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-[var(--color-ink)]">{product.name}</p>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  {seller?.name ?? "Seller"} · {formatPrice(product.price)} · MOQ {product.moq} pcs
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <Badge tone="neutral">{STOCK_LABEL[product.stock]}</Badge>
                  {product.tags.map((tag) => (
                    <Badge key={tag} tone="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
