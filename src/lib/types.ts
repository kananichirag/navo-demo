export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  swatch: SwatchKey;
}

export type SellerTier = "verified" | "top-seller" | "super-seller";

export interface Seller {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  tier: SellerTier;
  rating: number;
  reviewCount: number;
  followerCount: number;
  responseTime: string;
  memberSince: number;
  categories: string[];
  swatch: SwatchKey;
}

export type SwatchKey =
  | "terracotta"
  | "berry"
  | "mustard"
  | "teal"
  | "plum"
  | "blush"
  | "clay"
  | "forest";

export interface ProductVariant {
  label: string;
  swatch: SwatchKey;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  sellerId: string;
  price: number;
  compareAtPrice?: number;
  moq: number;
  rating: number;
  reviewCount: number;
  stock: "in-stock" | "low-stock" | "made-to-order";
  tags: Array<"New" | "Trending" | "Bestseller" | "Festive">;
  swatch: SwatchKey;
  pattern: "diagonal" | "dot" | "grid" | "wave";
  /** Real product photo, shown instead of the generated swatch art when set. */
  image?: ProductImage;
  variants: ProductVariant[];
  description: string;
  highlights: string[];
}

export interface ProductImage {
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
}

export interface CartLine {
  productId: string;
  variantLabel: string;
  quantity: number;
}

export type OrderStatus = "pending" | "dispatched" | "out-for-delivery" | "delivered";

export type PayoutStatus = "unpaid" | "paid";

export interface OrderLine {
  productId: string;
  productName: string;
  variantLabel: string;
  quantity: number;
  priceAtOrder: number;
}

export interface Order {
  id: string;
  sellerId: string;
  lines: OrderLine[];
  subtotal: number;
  buyerName: string;
  buyerPhone: string;
  buyerAddress: string;
  placedAt: string;
  status: OrderStatus;
  payoutStatus: PayoutStatus;
}

export type EnquiryStatus = "open" | "responded";

export interface Enquiry {
  id: string;
  sellerId: string;
  productId: string;
  productName: string;
  createdAt: string;
  status: EnquiryStatus;
}

export type NewProductInput = Pick<
  Product,
  "name" | "price" | "moq" | "stock" | "description"
> & {
  compareAtPrice?: number;
  tags: Product["tags"];
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email?: string;
  joinedAt: string;
}

export type NewTeamMemberInput = Pick<TeamMember, "name" | "role" | "phone" | "email">;
