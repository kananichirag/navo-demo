"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import {
  addProductToCatalog,
  removeProductFromCatalog,
  updateProductInCatalog,
  useSelectedSellerId,
  useSellerCatalog,
} from "@/lib/use-seller-store";
import type { NewProductInput, Product } from "@/lib/types";
import { ProductSwatch } from "@/components/product/ProductSwatch";
import { Badge } from "@/components/ui/Badge";
import { ProductForm } from "@/components/seller-dashboard/ProductForm";

const STOCK_LABEL: Record<Product["stock"], string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "made-to-order": "Made to order",
};

export default function SellerProductsPage() {
  const [sellerId] = useSelectedSellerId();
  const catalog = useSellerCatalog(sellerId);
  const [formMode, setFormMode] = useState<"add" | string | null>(null);

  const editingProduct = typeof formMode === "string" && formMode !== "add" ? catalog.find((p) => p.id === formMode) : undefined;

  const handleSubmit = (input: NewProductInput) => {
    if (formMode === "add") {
      addProductToCatalog(sellerId, input);
    } else if (editingProduct) {
      updateProductInCatalog(sellerId, editingProduct.id, input);
    }
    setFormMode(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Your products ({catalog.length})</h1>
        {formMode === null && (
          <button
            type="button"
            onClick={() => setFormMode("add")}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add product
          </button>
        )}
      </div>

      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
        Changes here are saved to this dashboard for your session — they don&rsquo;t publish to the public catalog
        in this demo.
      </p>

      {formMode !== null && (
        <div className="mt-4">
          <ProductForm
            key={formMode}
            initialProduct={editingProduct}
            onSubmit={handleSubmit}
            onCancel={() => setFormMode(null)}
          />
        </div>
      )}

      <div className="mt-5 space-y-3">
        {catalog.length === 0 && formMode === null && (
          <p className="rounded-2xl border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-ink-muted)]">
            No products yet. Add your first one above.
          </p>
        )}

        {catalog.map((product) => (
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
                {formatPrice(product.price)} · MOQ {product.moq} pcs
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
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label={`Edit ${product.name}`}
                onClick={() => setFormMode(product.id)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={`Delete ${product.name}`}
                onClick={() => removeProductFromCatalog(sellerId, product.id)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
