import type { Seller } from "@/lib/types";
import { SellerCard } from "@/components/seller/SellerCard";
import { Rail } from "@/components/ui/Rail";

type Props = {
  title: string;
  subtitle?: string;
  sellers: Seller[];
};

export function SellerRail({ title, subtitle, sellers }: Props) {
  return (
    <Rail title={title} subtitle={subtitle}>
      {sellers.map((seller) => (
        <div key={seller.id} className="w-60 shrink-0">
          <SellerCard seller={seller} />
        </div>
      ))}
    </Rail>
  );
}
