"use client";

import { getSellerById, sellers } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { ORDER_STATUS_META, PAYOUT_STATUS_META } from "@/lib/order-status";
import { setOrderPayoutStatus, useAllOrders } from "@/lib/use-seller-store";
import { Badge } from "@/components/ui/Badge";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function AdminPaymentsPage() {
  const orders = useAllOrders();

  const totalOwed = orders.filter((o) => o.payoutStatus === "unpaid").reduce((sum, o) => sum + o.subtotal, 0);
  const totalPaid = orders.filter((o) => o.payoutStatus === "paid").reduce((sum, o) => sum + o.subtotal, 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Seller payments</h1>
      <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
        What the platform owes each seller for orders already placed, and what&rsquo;s already been paid out.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-xs text-[var(--color-ink-muted)]">Owed to sellers</p>
          <p className="font-display mt-1 text-2xl font-semibold text-[var(--color-accent)]">{formatPrice(totalOwed)}</p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <p className="text-xs text-[var(--color-ink-muted)]">Paid out</p>
          <p className="font-display mt-1 text-2xl font-semibold text-[var(--color-success)]">{formatPrice(totalPaid)}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">By seller</h2>
        <div className="mt-3 space-y-2">
          {sellers.map((seller) => {
            const sellerOrders = orders.filter((o) => o.sellerId === seller.id);
            const owed = sellerOrders.filter((o) => o.payoutStatus === "unpaid").reduce((sum, o) => sum + o.subtotal, 0);
            const paid = sellerOrders.filter((o) => o.payoutStatus === "paid").reduce((sum, o) => sum + o.subtotal, 0);
            return (
              <div
                key={seller.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{seller.name}</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">{seller.city}, {seller.state}</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-[var(--color-accent)]">Owed {formatPrice(owed)}</span>
                  <span className="text-[var(--color-success)]">Paid {formatPrice(paid)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Orders</h2>
        <div className="mt-3 space-y-2">
          {orders.map((order) => {
            const seller = getSellerById(order.sellerId);
            return (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{order.id.toUpperCase()} · {formatPrice(order.subtotal)}</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">
                    {seller?.name ?? "Seller"} · {ORDER_STATUS_META[order.status].label} · {formatDate(order.placedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={PAYOUT_STATUS_META[order.payoutStatus].tone}>{PAYOUT_STATUS_META[order.payoutStatus].label}</Badge>
                  {order.payoutStatus === "unpaid" ? (
                    <button
                      type="button"
                      onClick={() => setOrderPayoutStatus(order.id, "paid")}
                      className="rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)]"
                    >
                      Mark paid
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setOrderPayoutStatus(order.id, "unpaid")}
                      className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      Undo
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
