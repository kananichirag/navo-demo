import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Clock, Users, CalendarDays } from "lucide-react";
import { getProductsBySeller, getSellerBySlug, sellers } from "@/lib/data";
import { swatchGradient } from "@/lib/swatches";
import { sellerTierMeta } from "@/lib/seller-tier";
import { categories } from "@/lib/data";
import { RatingStars } from "@/components/ui/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/product/ProductCard";
import { formatCompact } from "@/lib/format";

export function generateStaticParams() {
  return sellers.map((seller) => ({ slug: seller.slug }));
}

export async function generateMetadata(props: PageProps<"/sellers/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const seller = getSellerBySlug(slug);
  return { title: seller ? `${seller.name} — BA Enterprises` : "Seller — BA Enterprises" };
}

export default async function SellerProfilePage(props: PageProps<"/sellers/[slug]">) {
  const { slug } = await props.params;
  const seller = getSellerBySlug(slug);
  if (!seller) notFound();

  const catalog = getProductsBySeller(seller.id);
  const tier = sellerTierMeta[seller.tier];
  const initials = seller.name.split(" ").slice(0, 2).map((word) => word[0]).join("");
  const sellerCategories = categories.filter((category) => seller.categories.includes(category.id));

  return (
    <div>
      <div className="h-32 sm:h-40" style={{ backgroundImage: swatchGradient(seller.swatch) }} />

      <div className="mx-auto max-w-6xl px-4">
        <div className="-mt-10 flex items-end gap-4 sm:-mt-12">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-[var(--color-bg)] text-xl font-semibold text-white sm:h-24 sm:w-24"
            style={{ backgroundImage: swatchGradient(seller.swatch) }}
          >
            {initials}
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)] sm:text-3xl">{seller.name}</h1>
            <p className="flex items-center gap-1 text-sm text-[var(--color-ink-muted)]">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {seller.city}, {seller.state}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge tone="gold" icon={<tier.icon className="h-3.5 w-3.5" aria-hidden="true" />}>
            {tier.label}
          </Badge>
          {sellerCategories.map((category) => (
            <Badge key={category.id} tone="neutral">
              {category.name}
            </Badge>
          ))}
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:grid-cols-4">
          <div>
            <dt className="text-xs text-[var(--color-ink-muted)]">Rating</dt>
            <dd className="mt-1"><RatingStars rating={seller.rating} reviewCount={seller.reviewCount} size="md" /></dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-xs text-[var(--color-ink-muted)]">
              <Users className="h-3.5 w-3.5" aria-hidden="true" /> Followers
            </dt>
            <dd className="mt-1 font-display text-lg font-semibold text-[var(--color-ink)]">{formatCompact(seller.followerCount)}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-xs text-[var(--color-ink-muted)]">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> Response time
            </dt>
            <dd className="mt-1 font-display text-lg font-semibold text-[var(--color-ink)]">{seller.responseTime}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-xs text-[var(--color-ink-muted)]">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Member since
            </dt>
            <dd className="mt-1 font-display text-lg font-semibold text-[var(--color-ink)]">{seller.memberSince}</dd>
          </div>
        </dl>

        <div className="py-8">
          <h2 className="font-display text-xl font-semibold text-[var(--color-ink)]">Catalog ({catalog.length})</h2>
          {catalog.length === 0 ? (
            <p className="mt-4 text-sm text-[var(--color-ink-muted)]">This seller hasn&rsquo;t listed any products yet.</p>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {catalog.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
