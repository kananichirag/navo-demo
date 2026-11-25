import { Hero } from "@/components/home/Hero";
import { FeaturedLookbook } from "@/components/home/FeaturedLookbook";
import { ProductRail } from "@/components/home/ProductRail";
import { SellerRail } from "@/components/home/SellerRail";
import { TrustStrip } from "@/components/home/TrustStrip";
import { getProductsByTag, getTopSellers } from "@/lib/data";

export default function HomePage() {
  const trending = getProductsByTag("Trending", 8);
  const newArrivals = getProductsByTag("New", 8);
  const festive = getProductsByTag("Festive", 8);
  const topSellers = getTopSellers(6);

  return (
    <>
      <Hero />
      <FeaturedLookbook />
      <ProductRail title="Trending this week" subtitle="What retail buyers are enquiring about most" products={trending} seeAllHref="/products" />
      <SellerRail title="Top sellers" subtitle="Highly rated, fast-responding wholesale sellers" sellers={topSellers} />
      <ProductRail title="New arrivals" subtitle="Fresh catalog drops from this week" products={newArrivals} seeAllHref="/products" />
      <TrustStrip />
      <ProductRail title="Festive & bestsellers" subtitle="Reliable reorders for the season ahead" products={festive} seeAllHref="/products" />
    </>
  );
}
