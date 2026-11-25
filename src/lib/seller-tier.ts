import { Award, BadgeCheck, Crown, type LucideIcon } from "lucide-react";
import type { SellerTier } from "./types";

interface TierMeta {
  label: string;
  icon: LucideIcon;
}

export const sellerTierMeta: Record<SellerTier, TierMeta> = {
  verified: { label: "Verified seller", icon: BadgeCheck },
  "top-seller": { label: "Top seller", icon: Award },
  "super-seller": { label: "Super seller", icon: Crown },
};
