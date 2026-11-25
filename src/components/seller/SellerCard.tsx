import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import type { Seller } from "@/lib/types";
import { swatchGradient } from "@/lib/swatches";
import { formatCompact } from "@/lib/format";
import { sellerTierMeta } from "@/lib/seller-tier";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";

type Props = {
  seller: Seller;
};

export function SellerCard({ seller }: Props) {
  const tier = sellerTierMeta[seller.tier];
  const initials = seller.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <Link
      href={`/sellers/${seller.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[rgba(38,24,15,0.08)]"
    >
      <div className="h-16" style={{ backgroundImage: swatchGradient(seller.swatch) }} />
      <div className="relative px-4 pb-4">
        <div
          className="-mt-7 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[var(--color-surface)] text-base font-semibold text-white"
          style={{ backgroundImage: swatchGradient(seller.swatch) }}
        >
          {initials}
        </div>

        <p className="mt-2 font-medium text-[var(--color-ink)]">{seller.name}</p>
        <p className="flex items-center gap-1 text-xs text-[var(--color-ink-muted)]">
          <MapPin className="h-3 w-3" aria-hidden="true" />
          {seller.city}, {seller.state}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <Badge tone="gold" icon={<tier.icon className="h-3 w-3" aria-hidden="true" />}>
            {tier.label}
          </Badge>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-ink-muted)]">
          <RatingStars rating={seller.rating} reviewCount={seller.reviewCount} />
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" aria-hidden="true" />
            {formatCompact(seller.followerCount)}
          </span>
        </div>
      </div>
    </Link>
  );
}
