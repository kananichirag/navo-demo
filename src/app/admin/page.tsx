"use client";

import Link from "next/link";
import { MessageSquare, Package, ShoppingBag, Store } from "lucide-react";
import { getSellerById, sellers } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { useAllCatalogs, useAllEnquiries, useAllOrders } from "@/lib/use-seller-store";
import { StatCard } from "@/components/seller-dashboard/StatCard";

export default function AdminOverviewPage() {
  const orders = useAllOrders();
  const enquiries = useAllEnquiries();
  const catalog = useAllCatalogs();

  const totalRevenue = orders.reduce((sum, order) => sum + order.subtotal, 0);
  const openEnquiries = enquiries.filter((enquiry) => enquiry.status === "open").length;

  const activity = [
    ...orders.map((order) => ({
      id: order.id,
      type: "order" as const,
      label: `Order ${order.id.toUpperCase()} · ${formatPrice(order.subtotal)}`,
      detail: `${getSellerById(order.sellerId)?.name ?? "Seller"} · ${order.buyerName}`,
      at: order.placedAt,
    })),
    ...enquiries.map((enquiry) => ({
      id: enquiry.id,
      type: "enquiry" as const,
      label: `Enquiry about ${enquiry.productName}`,
      detail: `${getSellerById(enquiry.sellerId)?.name ?? "Seller"} · ${enquiry.status === "open" ? "Awaiting response" : "Responded"}`,
      at: enquiry.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 8);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Marketplace overview</h1>
      <p className="mt-1 text-sm text-[var(--color-ink-muted)]">Across every seller on BA Enterprises.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Sellers" value={String(sellers.length)} icon={Store} />
        <StatCard label="Products listed" value={String(catalog.length)} icon={Package} />
        <StatCard label="Orders" value={String(orders.length)} icon={ShoppingBag} />
        <StatCard label="Platform revenue" value={formatPrice(totalRevenue)} icon={ShoppingBag} />
        <StatCard label="Open enquiries" value={String(openEnquiries)} icon={MessageSquare} />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Top sellers</h2>
        <Link href="/admin/sellers" className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
          View all sellers
        </Link>
      </div>
      <div className="mt-3 space-y-2">
        {[...sellers]
          .map((seller) => ({
            seller,
            revenue: orders.filter((order) => order.sellerId === seller.id).reduce((sum, order) => sum + order.subtotal, 0),
          }))
          .sort((a, b) => b.revenue - a.revenue)
          .map(({ seller, revenue }) => (
            <div
              key={seller.id}
              className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-[var(--color-ink)]">{seller.name}</p>
                <p className="text-xs text-[var(--color-ink-muted)]">{seller.city}, {seller.state}</p>
              </div>
              <span className="font-display text-sm font-semibold text-[var(--color-ink)]">{formatPrice(revenue)}</span>
            </div>
          ))}
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Recent activity</h2>
        {activity.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-ink-muted)]">
            No orders or enquiries yet.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {activity.map((item) => (
              <li
                key={`${item.type}-${item.id}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{item.label}</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">{item.detail}</p>
                </div>
                <span className="shrink-0 text-xs text-[var(--color-ink-muted)]">
                  {new Date(item.at).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
