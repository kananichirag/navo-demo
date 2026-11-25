"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Truck } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getProductById, getSellerById } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { FREE_DELIVERY_THRESHOLD } from "@/lib/constants";
import { recordOrder } from "@/lib/use-seller-store";
import type { Order } from "@/lib/types";
import { CartLineItem } from "./CartLineItem";

export function CartView() {
  const { lines, subtotal, totalItems, clear, isHydrated } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const groups = useMemo(() => {
    const bySeller = new Map<string, { sellerId: string; lines: typeof lines }>();
    for (const line of lines) {
      const product = getProductById(line.productId);
      if (!product) continue;
      const existing = bySeller.get(product.sellerId);
      if (existing) {
        existing.lines.push(line);
      } else {
        bySeller.set(product.sellerId, { sellerId: product.sellerId, lines: [line] });
      }
    }
    return Array.from(bySeller.values());
  }, [lines]);

  if (!isHydrated) return null;

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--color-success)]" aria-hidden="true" />
        <h1 className="font-display mt-4 text-2xl font-semibold text-[var(--color-ink)]">Order request sent</h1>
        <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
          Order <strong>{orderNumber}</strong> has been shared with your sellers. This is a product demo —
          no real payment was processed.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
        >
          Continue browsing
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-[var(--color-border)] p-10 text-center">
        <p className="text-[var(--color-ink-muted)]">Your parcel is empty.</p>
        <Link
          href="/products"
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
        >
          Browse the catalog
        </Link>
      </div>
    );
  }

  const remaining = Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0);

  const handlePlaceOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const buyerName = String(formData.get("shopName") ?? "");
    const buyerPhone = String(formData.get("phone") ?? "");
    const buyerAddress = String(formData.get("address") ?? "");
    const displayNumber = `BA-${Math.floor(100000 + Math.random() * 900000)}`;
    const placedAt = new Date().toISOString();

    groups.forEach((group) => {
      const orderLines = group.lines
        .map((line) => {
          const product = getProductById(line.productId);
          if (!product) return null;
          return {
            productId: product.id,
            productName: product.name,
            variantLabel: line.variantLabel,
            quantity: line.quantity,
            priceAtOrder: product.price,
          };
        })
        .filter((line): line is NonNullable<typeof line> => line !== null);

      const order: Order = {
        id: `${displayNumber}-${group.sellerId}`,
        sellerId: group.sellerId,
        lines: orderLines,
        subtotal: orderLines.reduce((sum, line) => sum + line.priceAtOrder * line.quantity, 0),
        buyerName,
        buyerPhone,
        buyerAddress,
        placedAt,
        status: "pending",
      };
      recordOrder(order);
    });

    setOrderNumber(displayNumber);
    setOrderPlaced(true);
    clear();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-5">
        {groups.map((group) => {
          const seller = getSellerById(group.sellerId);
          return (
            <div key={group.sellerId} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <Link href={`/sellers/${seller?.slug ?? ""}`} className="font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)]">
                {seller?.name ?? "Seller"}
              </Link>
              <div className="mt-1">
                {group.lines.map((line) => {
                  const product = getProductById(line.productId);
                  if (!product) return null;
                  return (
                    <CartLineItem
                      key={`${line.productId}-${line.variantLabel}`}
                      product={product}
                      variantLabel={line.variantLabel}
                      quantity={line.quantity}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-fit rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Order summary</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between text-[var(--color-ink-muted)]">
            <dt>Items</dt>
            <dd>{totalItems}</dd>
          </div>
          <div className="flex justify-between font-medium text-[var(--color-ink)]">
            <dt>Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
        </dl>

        <p className="mt-3 flex items-center gap-2 rounded-xl bg-[var(--color-surface-sunken)] px-3 py-2 text-xs text-[var(--color-ink-muted)]">
          <Truck className="h-4 w-4 shrink-0 text-[var(--color-success)]" aria-hidden="true" />
          {remaining > 0 ? <>Add {formatPrice(remaining)} more for free delivery</> : "Free delivery unlocked"}
        </p>

        {!checkoutOpen ? (
          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            className="mt-4 w-full rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
          >
            Proceed to checkout
          </button>
        ) : (
          <form onSubmit={handlePlaceOrder} className="mt-4 space-y-3">
            <div>
              <label htmlFor="shop-name" className="text-xs font-medium text-[var(--color-ink-muted)]">Shop name</label>
              <input id="shop-name" name="shopName" required placeholder="e.g. Shree Textiles" className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="shop-phone" className="text-xs font-medium text-[var(--color-ink-muted)]">Phone number</label>
              <input id="shop-phone" name="phone" required type="tel" pattern="[0-9]{10}" placeholder="10-digit mobile number" className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="shop-address" className="text-xs font-medium text-[var(--color-ink-muted)]">Delivery address</label>
              <textarea id="shop-address" name="address" required rows={2} placeholder="Shop address, city, pincode" className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
            >
              Confirm order
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
