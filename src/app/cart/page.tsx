import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your parcel — BA Enterprises",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display mb-6 text-3xl font-semibold text-[var(--color-ink)]">Your parcel</h1>
      <CartView />
    </div>
  );
}
