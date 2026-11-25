import { Star } from "lucide-react";
import { formatCompact } from "@/lib/format";

type Props = {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
};

export function RatingStars({ rating, reviewCount, size = "sm" }: Props) {
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  if (reviewCount === 0) {
    return (
      <span className={`inline-flex items-center gap-1 ${textSize} text-[var(--color-ink-muted)]`}>
        <Star className={`${iconSize} text-[var(--color-ink-muted)]`} aria-hidden="true" />
        No ratings yet
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 ${textSize} text-[var(--color-ink-muted)]`}>
      <Star className={`${iconSize} fill-[var(--color-gold)] text-[var(--color-gold)]`} aria-hidden="true" />
      <span className="font-medium text-[var(--color-ink)]">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && <span>({formatCompact(reviewCount)})</span>}
    </span>
  );
}
