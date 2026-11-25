"use client";

import { sellers } from "@/lib/data";
import { formatCompact, formatPrice } from "@/lib/format";
import { sellerTierMeta } from "@/lib/seller-tier";
import { useAllCatalogs, useAllOrders } from "@/lib/use-seller-store";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";

export default function AdminSellersPage() {
  const orders = useAllOrders();
  const catalog = useAllCatalogs();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Sellers ({sellers.length})</h1>

      <div className="mt-5 space-y-3">
        {sellers.map((seller) => {
          const tier = sellerTierMeta[seller.tier];
          const sellerOrders = orders.filter((order) => order.sellerId === seller.id);
          const revenue = sellerOrders.reduce((sum, order) => sum + order.subtotal, 0);
          const catalogSize = catalog.filter((product) => product.sellerId === seller.id).length;

          return (
            <div key={seller.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-[var(--color-ink)]">{seller.name}</p>
                  <p className="text-xs text-[var(--color-ink-muted)]">{seller.city}, {seller.state} · Member since {seller.memberSince}</p>
                </div>
                <Badge tone="gold" icon={<tier.icon className="h-3.5 w-3.5" aria-hidden="true" />}>
                  {tier.label}
                </Badge>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                <div>
                  <p className="text-xs text-[var(--color-ink-muted)]">Rating</p>
                  <RatingStars rating={seller.rating} reviewCount={seller.reviewCount} />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-ink-muted)]">Followers</p>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{formatCompact(seller.followerCount)}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-ink-muted)]">Catalog</p>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{catalogSize} products</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-ink-muted)]">Orders</p>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{sellerOrders.length}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--color-ink-muted)]">Revenue</p>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{formatPrice(revenue)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
