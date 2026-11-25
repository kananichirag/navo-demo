"use client";

import { Clock, MessageSquare, Package, ShoppingBag, Star, Users } from "lucide-react";
import { getSellerById } from "@/lib/data";
import { formatCompact, formatPrice } from "@/lib/format";
import { sellerTierMeta } from "@/lib/seller-tier";
import { useSelectedSellerId, useSellerCatalog, useSellerEnquiries, useSellerOrders } from "@/lib/use-seller-store";
import { StatCard } from "@/components/seller-dashboard/StatCard";
import { Badge } from "@/components/ui/Badge";

export default function SellerOverviewPage() {
  const [sellerId] = useSelectedSellerId();
  const seller = getSellerById(sellerId);
  const catalog = useSellerCatalog(sellerId);
  const orders = useSellerOrders(sellerId);
  const enquiries = useSellerEnquiries(sellerId);

  if (!seller) return null;

  const tier = sellerTierMeta[seller.tier];
  const totalOrderValue = orders.reduce((sum, order) => sum + order.subtotal, 0);
  const openEnquiries = enquiries.filter((enquiry) => enquiry.status === "open").length;

  const activity = [
    ...orders.map((order) => ({
      id: order.id,
      type: "order" as const,
      label: `Order ${order.id.toUpperCase()} · ${formatPrice(order.subtotal)}`,
      detail: `${order.buyerName} · ${order.lines.length} item${order.lines.length === 1 ? "" : "s"}`,
      at: order.placedAt,
    })),
    ...enquiries.map((enquiry) => ({
      id: enquiry.id,
      type: "enquiry" as const,
      label: `Enquiry about ${enquiry.productName}`,
      detail: enquiry.status === "open" ? "Awaiting your response" : "Responded",
      at: enquiry.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 6);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">{seller.name}</h1>
        <Badge tone="gold" icon={<tier.icon className="h-3.5 w-3.5" aria-hidden="true" />}>
          {tier.label}
        </Badge>
      </div>
      <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{seller.city}, {seller.state}</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Rating" value={seller.rating.toFixed(1)} icon={Star} />
        <StatCard label="Followers" value={formatCompact(seller.followerCount)} icon={Users} />
        <StatCard label="Response time" value={seller.responseTime} icon={Clock} />
        <StatCard label="Catalog size" value={String(catalog.length)} icon={Package} />
        <StatCard label="Orders" value={`${orders.length} · ${formatPrice(totalOrderValue)}`} icon={ShoppingBag} />
        <StatCard label="Open enquiries" value={String(openEnquiries)} icon={MessageSquare} />
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Recent activity</h2>
        {activity.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-ink-muted)]">
            No orders or enquiries yet this session. Place an order or send an enquiry from the storefront to see it
            show up here.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {activity.map((item) => (
              <li
                key={`${item.type}-${item.id}`}
                className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
              >
                <div className="min-w-0">
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
