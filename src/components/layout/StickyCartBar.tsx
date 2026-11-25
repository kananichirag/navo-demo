"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { FREE_DELIVERY_THRESHOLD } from "@/lib/constants";
import { formatPrice } from "@/lib/format";

export function StickyCartBar() {
  const { subtotal, totalItems, isHydrated } = useCart();
  const pathname = usePathname();

  if (!isHydrated || totalItems === 0 || pathname === "/cart") return null;

  const remaining = Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0);
  const progress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_-8px_24px_-16px_rgba(38,24,15,0.35)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          {remaining > 0 ? (
            <div className="flex items-center gap-2 text-sm text-[var(--color-ink)]">
              <Truck className="h-4 w-4 shrink-0 text-[var(--color-success)]" aria-hidden="true" />
              <span>
                Add <strong>{formatPrice(remaining)}</strong> more to unlock free delivery
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-success)]">
              <Truck className="h-4 w-4 shrink-0" aria-hidden="true" />
              Free delivery unlocked on this order
            </div>
          )}
          <div className="mt-1.5 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-[var(--color-surface-sunken)]">
            <div
              className="h-full rounded-full bg-[var(--color-success)] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link
          href="/cart"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
        >
          View parcel · {formatPrice(subtotal)} ({totalItems})
        </Link>
      </div>
    </div>
  );
}
