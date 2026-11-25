"use client";

import { formatPrice } from "@/lib/format";
import { ORDER_STATUS_META, PAYOUT_STATUS_META } from "@/lib/order-status";
import {
  setEnquiryStatus,
  setOrderStatus,
  useSelectedSellerId,
  useSellerEnquiries,
  useSellerOrders,
} from "@/lib/use-seller-store";
import { Badge } from "@/components/ui/Badge";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function SellerOrdersPage() {
  const [sellerId] = useSelectedSellerId();
  const orders = useSellerOrders(sellerId);
  const enquiries = useSellerEnquiries(sellerId);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Orders ({orders.length})</h1>
        {orders.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-ink-muted)]">
            No orders yet. Place a test order from the storefront cart to see it appear here.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-[var(--color-ink)]">{order.id.toUpperCase()}</p>
                    <p className="text-xs text-[var(--color-ink-muted)]">{formatDate(order.placedAt)}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <Badge tone={ORDER_STATUS_META[order.status].tone}>{ORDER_STATUS_META[order.status].label}</Badge>
                    <Badge tone={PAYOUT_STATUS_META[order.payoutStatus].tone}>
                      Payout: {PAYOUT_STATUS_META[order.payoutStatus].label}
                    </Badge>
                  </div>
                </div>

                <div className="mt-3 rounded-xl bg-[var(--color-surface-sunken)] p-3 text-sm text-[var(--color-ink-muted)]">
                  <p className="font-medium text-[var(--color-ink)]">{order.buyerName}</p>
                  <p>{order.buyerPhone}</p>
                  <p>{order.buyerAddress}</p>
                </div>

                <ul className="mt-3 space-y-1 text-sm text-[var(--color-ink)]">
                  {order.lines.map((line) => (
                    <li key={`${line.productId}-${line.variantLabel}`} className="flex flex-wrap justify-between gap-x-3">
                      <span>
                        {line.productName} ({line.variantLabel}) × {line.quantity}
                      </span>
                      <span className="shrink-0">{formatPrice(line.priceAtOrder * line.quantity)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-3">
                  <span className="font-semibold text-[var(--color-ink)]">{formatPrice(order.subtotal)}</span>
                  {order.status === "pending" && (
                    <button
                      type="button"
                      onClick={() => setOrderStatus(order.id, "dispatched")}
                      className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    >
                      Mark as dispatched
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Enquiries ({enquiries.length})</h2>
        {enquiries.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-ink-muted)]">
            No enquiries yet. Use &ldquo;Ask the seller&rdquo; on a product page to see it appear here.
          </p>
        ) : (
          <div className="mt-4 space-y-2">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{enquiry.productName}</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">{formatDate(enquiry.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={enquiry.status === "open" ? "accent" : "success"}>
                    {enquiry.status === "open" ? "Awaiting response" : "Responded"}
                  </Badge>
                  {enquiry.status === "open" && (
                    <button
                      type="button"
                      onClick={() => setEnquiryStatus(enquiry.id, "responded")}
                      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    >
                      Mark responded
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
