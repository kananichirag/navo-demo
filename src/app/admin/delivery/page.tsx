"use client";

import { getSellerById } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { ORDER_STATUS_META, ORDER_STATUS_SEQUENCE, nextOrderStatus } from "@/lib/order-status";
import { setOrderStatus, useAllOrders } from "@/lib/use-seller-store";
import type { OrderStatus } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

const NEXT_ACTION_LABEL: Record<OrderStatus, string | null> = {
  pending: null,
  dispatched: "Mark out for delivery",
  "out-for-delivery": "Mark delivered",
  delivered: null,
};

export default function AdminDeliveryPage() {
  const orders = useAllOrders();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Delivery tracking</h1>
      <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
        Every order across every seller, by delivery stage. Sellers dispatch from their own dashboard — this is
        where the platform tracks it the rest of the way.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ORDER_STATUS_SEQUENCE.map((status) => (
          <div key={status} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-xs text-[var(--color-ink-muted)]">{ORDER_STATUS_META[status].label}</p>
            <p className="font-display mt-1 text-2xl font-semibold text-[var(--color-ink)]">
              {orders.filter((order) => order.status === status).length}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {orders.map((order) => {
          const seller = getSellerById(order.sellerId);
          const upcoming = nextOrderStatus(order.status);
          const actionLabel = NEXT_ACTION_LABEL[order.status];
          return (
            <div
              key={order.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
            >
              <div>
                <p className="font-medium text-[var(--color-ink)]">{order.id.toUpperCase()}</p>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  {seller?.name ?? "Seller"} · {order.buyerName} · {formatPrice(order.subtotal)} · {formatDate(order.placedAt)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone={ORDER_STATUS_META[order.status].tone}>{ORDER_STATUS_META[order.status].label}</Badge>
                {actionLabel && upcoming && (
                  <button
                    type="button"
                    onClick={() => setOrderStatus(order.id, upcoming)}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    {actionLabel}
                  </button>
                )}
                {order.status === "pending" && (
                  <span className="text-xs text-[var(--color-ink-muted)]">Awaiting seller dispatch</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
