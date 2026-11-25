"use client";

import { getSellerById } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { setEnquiryStatus, setOrderStatus, useAllEnquiries, useAllOrders } from "@/lib/use-seller-store";
import { Badge } from "@/components/ui/Badge";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function AdminOrdersPage() {
  const orders = useAllOrders();
  const enquiries = useAllEnquiries();

  return (
    <div className="space-y-10">
      <section>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Orders ({orders.length})</h1>
        <div className="mt-4 space-y-3">
          {orders.map((order) => {
            const seller = getSellerById(order.sellerId);
            return (
              <div key={order.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-[var(--color-ink)]">{order.id.toUpperCase()}</p>
                    <p className="text-xs text-[var(--color-ink-muted)]">
                      {seller?.name ?? "Seller"} · {formatDate(order.placedAt)}
                    </p>
                  </div>
                  <Badge tone={order.status === "dispatched" ? "success" : "accent"}>
                    {order.status === "dispatched" ? "Dispatched" : "Pending"}
                  </Badge>
                </div>

                <div className="mt-3 rounded-xl bg-[var(--color-surface-sunken)] p-3 text-sm text-[var(--color-ink-muted)]">
                  <p className="font-medium text-[var(--color-ink)]">{order.buyerName}</p>
                  <p>{order.buyerPhone}</p>
                  <p>{order.buyerAddress}</p>
                </div>

                <ul className="mt-3 space-y-1 text-sm text-[var(--color-ink)]">
                  {order.lines.map((line) => (
                    <li key={`${line.productId}-${line.variantLabel}`} className="flex justify-between">
                      <span>
                        {line.productName} ({line.variantLabel}) × {line.quantity}
                      </span>
                      <span>{formatPrice(line.priceAtOrder * line.quantity)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
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
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Enquiries ({enquiries.length})</h2>
        <div className="mt-4 space-y-2">
          {enquiries.map((enquiry) => {
            const seller = getSellerById(enquiry.sellerId);
            return (
              <div
                key={enquiry.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{enquiry.productName}</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">
                    {seller?.name ?? "Seller"} · {formatDate(enquiry.createdAt)}
                  </p>
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
            );
          })}
        </div>
      </section>
    </div>
  );
}
