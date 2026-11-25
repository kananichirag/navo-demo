import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { Rail } from "@/components/ui/Rail";

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
  seeAllHref?: string;
};

export function ProductRail({ title, subtitle, products, seeAllHref }: Props) {
  return (
    <Rail title={title} subtitle={subtitle} seeAllHref={seeAllHref}>
      {products.map((product) => (
        <div key={product.id} className="w-56 shrink-0 sm:w-64">
          <ProductCard product={product} />
        </div>
      ))}
    </Rail>
  );
}
