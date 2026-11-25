import type { Enquiry, Order } from "./types";

const HOUR = 60 * 60 * 1000;
const now = Date.now();
const hoursAgo = (hours: number) => new Date(now - hours * HOUR).toISOString();

export const SEED_ORDERS: Order[] = [
  {
    id: "BA-482193-s1",
    sellerId: "s1",
    lines: [
      { productId: "p1", productName: "Banarasi Silk Saree — Sunset Weave", variantLabel: "Rust", quantity: 6, priceAtOrder: 1850 },
    ],
    subtotal: 11100,
    buyerName: "Shree Textiles",
    buyerPhone: "9876543210",
    buyerAddress: "14 Lal Darwaza Market, Surat, Gujarat 395003",
    placedAt: hoursAgo(5),
    status: "pending",
  },
  {
    id: "BA-471820-s1",
    sellerId: "s1",
    lines: [
      { productId: "p9", productName: "Paithani Silk Saree — Heirloom Gold", variantLabel: "Gold", quantity: 2, priceAtOrder: 4200 },
      { productId: "p11", productName: "Tussar Silk Saree — Ivory Trail", variantLabel: "Ivory", quantity: 8, priceAtOrder: 1340 },
    ],
    subtotal: 19120,
    buyerName: "Radha Fashions",
    buyerPhone: "9823456710",
    buyerAddress: "22 Gandhi Road, Ahmedabad, Gujarat 380001",
    placedAt: hoursAgo(30),
    status: "dispatched",
  },
  {
    id: "BA-490244-s6",
    sellerId: "s6",
    lines: [
      { productId: "p2", productName: "Chanderi Cotton Saree — Dawn Mist", variantLabel: "Sand", quantity: 10, priceAtOrder: 980 },
    ],
    subtotal: 9800,
    buyerName: "Meena Collection",
    buyerPhone: "9911223344",
    buyerAddress: "8 Station Road, Jodhpur, Rajasthan 342001",
    placedAt: hoursAgo(2),
    status: "pending",
  },
  {
    id: "BA-465310-s6",
    sellerId: "s6",
    lines: [
      { productId: "p10", productName: "Banarasi Zari Saree — Crimson Lattice", variantLabel: "Crimson", quantity: 4, priceAtOrder: 2980 },
    ],
    subtotal: 11920,
    buyerName: "Krishna Sarees",
    buyerPhone: "9845123067",
    buyerAddress: "56 Chandpole Bazaar, Jaipur, Rajasthan 302001",
    placedAt: hoursAgo(50),
    status: "dispatched",
  },
  {
    id: "BA-499102-s7",
    sellerId: "s7",
    lines: [
      { productId: "p3", productName: "Kanjivaram Saree — Heritage Gold", variantLabel: "Gold", quantity: 4, priceAtOrder: 3200 },
    ],
    subtotal: 12800,
    buyerName: "Lakshmi Textiles",
    buyerPhone: "9034567812",
    buyerAddress: "19 New Market, Kolkata, West Bengal 700087",
    placedAt: hoursAgo(8),
    status: "pending",
  },
  {
    id: "BA-452871-s7",
    sellerId: "s7",
    lines: [
      { productId: "p8", productName: "Bomkai Cotton Saree — Olive Temple", variantLabel: "Olive", quantity: 12, priceAtOrder: 890 },
    ],
    subtotal: 10680,
    buyerName: "Durga Emporium",
    buyerPhone: "9798765432",
    buyerAddress: "3 Gariahat Road, Kolkata, West Bengal 700019",
    placedAt: hoursAgo(70),
    status: "dispatched",
  },
];

export const SEED_ENQUIRIES: Enquiry[] = [
  { id: "enq-seed-1", sellerId: "s1", productId: "p4", productName: "Linen Saree — Monsoon Grey", createdAt: hoursAgo(1), status: "open" },
  { id: "enq-seed-2", sellerId: "s1", productId: "p5", productName: "Jamdani Silk Saree — Midnight Bloom", createdAt: hoursAgo(20), status: "responded" },
  { id: "enq-seed-3", sellerId: "s6", productId: "p6", productName: "Bandhani Georgette Saree — Royal Violet", createdAt: hoursAgo(3), status: "open" },
  { id: "enq-seed-4", sellerId: "s6", productId: "p12", productName: "Dhanekhali Cotton Saree — Market Check", createdAt: hoursAgo(40), status: "responded" },
  { id: "enq-seed-5", sellerId: "s7", productId: "p7", productName: "Banarasi Silk Saree — Royal Menagerie", createdAt: hoursAgo(6), status: "open" },
  { id: "enq-seed-6", sellerId: "s7", productId: "p3", productName: "Kanjivaram Saree — Heritage Gold", createdAt: hoursAgo(45), status: "responded" },
];
