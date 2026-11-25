import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getCategoryById, getProductBySlug, getRelatedProducts, getSellerById, products } from "@/lib/data";
import { ProductDetailInteractive } from "@/components/product/ProductDetailInteractive";
import { ProductRail } from "@/components/home/ProductRail";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} — BA Enterprises` : "Product — BA Enterprises" };
}

export default async function ProductDetailPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const seller = getSellerById(product.sellerId);
  const category = getCategoryById(product.categoryId);
  if (!seller || !category) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-6 flex min-w-0 items-center gap-1.5 text-sm text-[var(--color-ink-muted)]">
        <Link href="/" className="shrink-0 hover:text-[var(--color-primary)]">Home</Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <Link href={`/products?category=${category.id}`} className="shrink-0 hover:text-[var(--color-primary)]">
          {category.name}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="line-clamp-1 min-w-0 text-[var(--color-ink)]">{product.name}</span>
      </nav>

      <ProductDetailInteractive product={product} seller={seller} categoryIcon={category.icon} />

      {related.length > 0 && (
        <div className="mt-8 -mx-4">
          <ProductRail title="You may also like" products={related} />
        </div>
      )}
    </div>
  );
}
