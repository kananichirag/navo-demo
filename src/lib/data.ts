import type { Category, Product, Seller } from "./types";

// Scoped to Sarees only for now — other categories (kurti, lehenga, menswear,
// western, kids) will come back once this vertical is validated.
export const categories: Category[] = [
  { id: "saree", name: "Sarees", slug: "sarees", icon: "Ribbon", swatch: "terracotta" },
];

export const sellers: Seller[] = [
  {
    id: "s1", slug: "surat-silk-house", name: "Surat Silk House", city: "Surat", state: "Gujarat",
    tier: "super-seller", rating: 4.8, reviewCount: 2140, followerCount: 18900, responseTime: "~15 min",
    memberSince: 2019, categories: ["saree"], swatch: "terracotta",
  },
  {
    id: "s6", slug: "jodhpur-heritage-textiles", name: "Jodhpur Heritage Textiles", city: "Jodhpur", state: "Rajasthan",
    tier: "verified", rating: 4.4, reviewCount: 760, followerCount: 4800, responseTime: "~45 min",
    memberSince: 2021, categories: ["saree"], swatch: "clay",
  },
  {
    id: "s7", slug: "kolkata-fab-collective", name: "Kolkata Fab Collective", city: "Kolkata", state: "West Bengal",
    tier: "top-seller", rating: 4.5, reviewCount: 980, followerCount: 6700, responseTime: "~25 min",
    memberSince: 2020, categories: ["saree"], swatch: "forest",
  },
];

export const products: Product[] = [
  {
    id: "p1", slug: "banarasi-silk-sunset-weave", name: "Banarasi Silk Saree — Sunset Weave",
    categoryId: "saree", sellerId: "s1", price: 1850, compareAtPrice: 2400, moq: 6, rating: 4.8,
    reviewCount: 312, stock: "in-stock", tags: ["Bestseller", "Festive"], swatch: "terracotta", pattern: "diagonal",
    image: {
      src: "/images/product-banarasi.jpg",
      alt: "Close-up of a red Banarasi silk saree with a gold zari brocade border",
      credit: "आशीष भटनागर, Public Domain, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Banarasi_sari_pallu_by_ashish4.JPG",
    },
    variants: [{ label: "Rust", swatch: "terracotta" }, { label: "Berry", swatch: "berry" }, { label: "Plum", swatch: "plum" }],
    description: "Handloom Banarasi silk with a zari border, woven in small batches by Surat master weavers.",
    highlights: ["Pure silk blend", "Zari border", "Includes matching blouse piece", "Dry clean only"],
  },
  {
    id: "p2", slug: "chanderi-cotton-dawn-mist", name: "Chanderi Cotton Saree — Dawn Mist",
    categoryId: "saree", sellerId: "s6", price: 980, moq: 10, rating: 4.5, reviewCount: 128,
    stock: "in-stock", tags: ["New", "Trending"], swatch: "clay", pattern: "wave",
    image: {
      src: "/images/product-chanderi.jpg",
      alt: "Sheer light grey Chanderi saree with small woven motifs, draped on a mannequin",
      credit: "Hiart, CC0, via Wikimedia Commons (Honolulu Museum of Art)",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Sari_from_Madhya_Pradesh,_India,_Honolulu_Museum_of_Art_3965.1.JPG",
    },
    variants: [{ label: "Sand", swatch: "clay" }, { label: "Teal", swatch: "teal" }],
    description: "Lightweight Chanderi cotton with a subtle sheen, ideal for everyday retail stock.",
    highlights: ["Breathable cotton-silk mix", "Fade-resistant dye", "Machine washable"],
  },
  {
    id: "p3", slug: "kanjivaram-heritage-gold", name: "Kanjivaram Saree — Heritage Gold",
    categoryId: "saree", sellerId: "s7", price: 3200, compareAtPrice: 4100, moq: 4, rating: 4.9,
    reviewCount: 201, stock: "made-to-order", tags: ["Festive", "Bestseller"], swatch: "mustard", pattern: "grid",
    image: {
      src: "/images/product-kanjivaram.jpg",
      alt: "Draped gold and olive silk saree with an ornate brocade border",
      credit: "Ekabhishek, CC BY-SA 3.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Saree_on_display_at_Dilli_Haat.JPG",
    },
    variants: [{ label: "Gold", swatch: "mustard" }, { label: "Maroon", swatch: "berry" }],
    description: "Traditional Kanjivaram weave with temple border, made to order in batches of 4+.",
    highlights: ["Authentic Kanjivaram weave", "Temple border motif", "7–10 day production time"],
  },
  {
    id: "p4", slug: "linen-saree-monsoon-grey", name: "Linen Saree — Monsoon Grey",
    categoryId: "saree", sellerId: "s1", price: 1120, moq: 8, rating: 4.4, reviewCount: 96,
    stock: "low-stock", tags: ["Trending"], swatch: "forest", pattern: "diagonal",
    image: {
      src: "/images/product-linen.jpg",
      alt: "Grey-green linen saree with a dark woven border, draped on a mannequin",
      credit: "Hiart, CC0, via Wikimedia Commons (Honolulu Museum of Art)",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Sari_from_India,_Honolulu_Museum_of_Art_3964.1.JPG",
    },
    variants: [{ label: "Grey", swatch: "forest" }, { label: "Clay", swatch: "clay" }],
    description: "Pure linen saree with a minimal pallu print, popular for summer retail collections.",
    highlights: ["100% pure linen", "Minimal print pallu", "Pre-shrunk fabric"],
  },
  {
    id: "p5", slug: "jamdani-silk-midnight-bloom", name: "Jamdani Silk Saree — Midnight Bloom",
    categoryId: "saree", sellerId: "s1", price: 1650, moq: 8, rating: 4.6, reviewCount: 142,
    stock: "in-stock", tags: ["Trending"], swatch: "teal", pattern: "dot",
    image: {
      src: "/images/product-jamdani.jpg",
      alt: "Deep blue Jamdani silk saree with fine woven star motifs",
      credit: "A Junaid Alam Khan, Public Domain, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Blue_jamdani.JPG",
    },
    variants: [{ label: "Midnight Blue", swatch: "teal" }, { label: "Charcoal", swatch: "plum" }],
    description: "Hand-woven Jamdani silk with fine star motifs, a Bengal weaving tradition prized for its sheer, lightweight drape.",
    highlights: ["Hand-woven Jamdani technique", "Sheer, lightweight drape", "Motifs woven directly into the weave", "Dry clean only"],
  },
  {
    id: "p6", slug: "bandhani-georgette-royal-violet", name: "Bandhani Georgette Saree — Royal Violet",
    categoryId: "saree", sellerId: "s6", price: 1120, moq: 10, rating: 4.5, reviewCount: 167,
    stock: "in-stock", tags: ["New", "Festive"], swatch: "plum", pattern: "dot",
    image: {
      src: "/images/product-bandhani.jpg",
      alt: "Deep violet Bandhani tie-dye saree with white dot motifs",
      credit: "Mandayamr, Public Domain, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Bandhani_print_open.JPG",
    },
    variants: [{ label: "Violet", swatch: "plum" }, { label: "Berry", swatch: "berry" }],
    description: "Traditional Rajasthani bandhani tie-dye on soft georgette, a festive staple for Navratri and wedding-season stock.",
    highlights: ["Hand tie-dye bandhani work", "Soft georgette base", "Festive-season fast mover", "Pairs well with a contrast blouse"],
  },
  {
    id: "p7", slug: "banarasi-silk-royal-menagerie", name: "Banarasi Silk Saree — Royal Menagerie",
    categoryId: "saree", sellerId: "s7", price: 2650, compareAtPrice: 3200, moq: 5, rating: 4.8,
    reviewCount: 189, stock: "made-to-order", tags: ["Festive", "Bestseller"], swatch: "plum", pattern: "grid",
    image: {
      src: "/images/product-banarasi-brocade.jpg",
      alt: "Purple silk Banarasi saree with gold zari elephant and peacock motifs",
      credit: "Anilbhardwajnoida, CC BY-SA 3.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Benaras_brocade_sari.jpg",
    },
    variants: [{ label: "Violet", swatch: "plum" }, { label: "Emerald", swatch: "forest" }],
    description: "Pure silk Banarasi brocade woven with elephants, peacocks, and florals in gold zari — a statement piece for bridal counters.",
    highlights: ["Pure silk Banarasi brocade", "Hand-woven animal and floral motifs", "Gold zari throughout", "7-day production for bulk orders"],
  },
  {
    id: "p8", slug: "bomkai-cotton-olive-temple", name: "Bomkai Cotton Saree — Olive Temple",
    categoryId: "saree", sellerId: "s7", price: 890, moq: 12, rating: 4.3, reviewCount: 74,
    stock: "in-stock", tags: ["New"], swatch: "forest", pattern: "grid",
    image: {
      src: "/images/product-bomkai.jpg",
      alt: "Olive-green Bomkai cotton saree with a maroon temple-border pallu",
      credit: "Nayansatya, CC BY-SA 3.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Bomkai.jpg",
    },
    variants: [{ label: "Olive", swatch: "forest" }, { label: "Maroon", swatch: "berry" }],
    description: "Odisha handloom Bomkai cotton with a temple-border pallu, a distinctive everyday weave for regional retail counters.",
    highlights: ["Odisha handloom weave", "Temple-border pallu", "Pure cotton, breathable", "Hand-finished edges"],
  },
  {
    id: "p9", slug: "paithani-silk-heirloom-gold", name: "Paithani Silk Saree — Heirloom Gold",
    categoryId: "saree", sellerId: "s1", price: 4200, compareAtPrice: 5400, moq: 2, rating: 4.9,
    reviewCount: 96, stock: "made-to-order", tags: ["Festive", "Bestseller"], swatch: "mustard", pattern: "dot",
    image: {
      src: "/images/product-paithani.jpg",
      alt: "Gold Paithani silk saree with an all-over buti weave and floral pallu, museum flat lay",
      credit: "LACMA, Public Domain, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Paithani_Bridal_Sari_LACMA_M.75.4.23_(1_of_2).jpg",
    },
    variants: [{ label: "Gold", swatch: "mustard" }, { label: "Ivory", swatch: "blush" }],
    description: "Heirloom-grade Paithani silk with an all-over buti weave and a floral pallu, woven for bridal and heirloom retail collections.",
    highlights: ["Heirloom Paithani weave", "All-over gold buti motifs", "Floral pallu design", "10-day production lead time"],
  },
  {
    id: "p10", slug: "banarasi-zari-crimson-lattice", name: "Banarasi Zari Saree — Crimson Lattice",
    categoryId: "saree", sellerId: "s6", price: 2980, compareAtPrice: 3600, moq: 4, rating: 4.7,
    reviewCount: 112, stock: "in-stock", tags: ["Festive"], swatch: "berry", pattern: "grid",
    image: {
      src: "/images/product-banarasi-lattice.jpg",
      alt: "Maroon and gold Banarasi silk saree with a dense geometric zari lattice, museum hanging display",
      credit: "Hiart, CC0, via Wikimedia Commons (Honolulu Museum of Art)",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Sari_from_India,_Honolulu_Museum_of_Art,_5139.1.JPG",
    },
    variants: [{ label: "Crimson", swatch: "berry" }, { label: "Gold", swatch: "mustard" }],
    description: "Dense gold zari lattice work on a deep crimson base, a formal Banarasi weave for festive and wedding retail stock.",
    highlights: ["Dense gold zari lattice weave", "Deep crimson silk base", "Festive and bridal crossover", "Dry clean only"],
  },
  {
    id: "p11", slug: "tussar-silk-ivory-trail", name: "Tussar Silk Saree — Ivory Trail",
    categoryId: "saree", sellerId: "s1", price: 1340, moq: 8, rating: 4.4, reviewCount: 88,
    stock: "in-stock", tags: ["Trending"], swatch: "clay", pattern: "wave",
    image: {
      src: "/images/product-tussar.jpg",
      alt: "Cream and grey Tussar silk sarees with temple-border pallus hanging on display",
      credit: "Sailesh Patnaik, CC BY-SA 4.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Tasar_Sarees.jpg",
    },
    variants: [{ label: "Ivory", swatch: "clay" }, { label: "Charcoal", swatch: "plum" }],
    description: "Raw Tussar silk with a contrast temple-border pallu, valued for its natural texture and understated sheen.",
    highlights: ["Raw Tussar silk texture", "Contrast temple-border pallu", "Natural fibre sheen", "Lightweight for daily-wear retail"],
  },
  {
    id: "p12", slug: "dhanekhali-cotton-market-check", name: "Dhanekhali Cotton Saree — Market Check",
    categoryId: "saree", sellerId: "s6", price: 620, moq: 15, rating: 4.2, reviewCount: 59,
    stock: "low-stock", tags: [], swatch: "clay", pattern: "grid",
    image: {
      src: "/images/product-dhanekhali.jpg",
      alt: "Red, green, and cream checked Dhanekhali cotton saree fabric close-up",
      credit: "Atudu, CC BY-SA 4.0, via Wikimedia Commons",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Dhanekhali_DSC_0511.JPG",
    },
    variants: [{ label: "Red Check", swatch: "terracotta" }, { label: "Green Check", swatch: "forest" }],
    description: "Hand-woven Dhanekhali cotton in a classic checked pattern, a dependable volume mover for everyday retail stock.",
    highlights: ["Hand-woven Bengal cotton", "Classic checked pattern", "High-volume reorder item", "Pre-washed and colorfast"],
  },
];

export function getCategoryById(id: string) {
  return categories.find((category) => category.id === id);
}

export function getSellerById(id: string) {
  return sellers.find((seller) => seller.id === id);
}

export function getSellerBySlug(slug: string) {
  return sellers.find((seller) => seller.slug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductsBySeller(sellerId: string) {
  return products.filter((product) => product.sellerId === sellerId);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((candidate) => candidate.id !== product.id && candidate.categoryId === product.categoryId)
    .slice(0, limit);
}

export function getProductsByTag(tag: Product["tags"][number], limit?: number) {
  const matches = products.filter((product) => product.tags.includes(tag));
  return limit ? matches.slice(0, limit) : matches;
}

export function getTopSellers(limit = 6) {
  return [...sellers].sort((a, b) => b.followerCount - a.followerCount).slice(0, limit);
}
