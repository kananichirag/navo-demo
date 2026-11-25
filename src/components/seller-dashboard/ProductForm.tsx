"use client";

import { useState, type FormEvent } from "react";
import type { NewProductInput, Product } from "@/lib/types";

const ALL_TAGS: Product["tags"] = ["New", "Trending", "Bestseller", "Festive"];

type Props = {
  initialProduct?: Product;
  onSubmit: (input: NewProductInput) => void;
  onCancel: () => void;
};

export function ProductForm({ initialProduct, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [price, setPrice] = useState(String(initialProduct?.price ?? ""));
  const [compareAtPrice, setCompareAtPrice] = useState(
    initialProduct?.compareAtPrice ? String(initialProduct.compareAtPrice) : ""
  );
  const [moq, setMoq] = useState(String(initialProduct?.moq ?? 6));
  const [stock, setStock] = useState<Product["stock"]>(initialProduct?.stock ?? "in-stock");
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [tags, setTags] = useState<Product["tags"]>(initialProduct?.tags ?? []);

  const toggleTag = (tag: Product["tags"][number]) => {
    setTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      name,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      moq: Number(moq),
      stock,
      description,
      tags,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="pf-name" className="text-xs font-medium text-[var(--color-ink-muted)]">
            Product name
          </label>
          <input
            id="pf-name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Mysore Silk Saree — Amber Glow"
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="pf-price" className="text-xs font-medium text-[var(--color-ink-muted)]">
            Price per piece (₹)
          </label>
          <input
            id="pf-price"
            required
            type="number"
            min={1}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="pf-compare" className="text-xs font-medium text-[var(--color-ink-muted)]">
            Compare-at price (optional)
          </label>
          <input
            id="pf-compare"
            type="number"
            min={1}
            value={compareAtPrice}
            onChange={(event) => setCompareAtPrice(event.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="pf-moq" className="text-xs font-medium text-[var(--color-ink-muted)]">
            Minimum order quantity
          </label>
          <input
            id="pf-moq"
            required
            type="number"
            min={1}
            value={moq}
            onChange={(event) => setMoq(event.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="pf-stock" className="text-xs font-medium text-[var(--color-ink-muted)]">
            Stock status
          </label>
          <select
            id="pf-stock"
            value={stock}
            onChange={(event) => setStock(event.target.value as Product["stock"])}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
          >
            <option value="in-stock">In stock</option>
            <option value="low-stock">Low stock</option>
            <option value="made-to-order">Made to order</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="pf-description" className="text-xs font-medium text-[var(--color-ink-muted)]">
            Description
          </label>
          <textarea
            id="pf-description"
            required
            rows={2}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <span className="text-xs font-medium text-[var(--color-ink-muted)]">Tags</span>
          <div className="mt-1 flex flex-wrap gap-3">
            {ALL_TAGS.map((tag) => (
              <label key={tag} className="flex items-center gap-1.5 text-sm text-[var(--color-ink)]">
                <input type="checkbox" checked={tags.includes(tag)} onChange={() => toggleTag(tag)} />
                {tag}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
        >
          {initialProduct ? "Save changes" : "Add product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-[var(--color-border)] px-5 py-2 text-sm font-semibold text-[var(--color-ink)]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
