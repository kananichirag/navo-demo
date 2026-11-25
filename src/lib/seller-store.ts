import {
  ENQUIRIES_STORAGE_KEY,
  ORDERS_STORAGE_KEY,
  SELECTED_SELLER_STORAGE_KEY,
  SELLER_CATALOGS_STORAGE_KEY,
  TEAM_MEMBERS_STORAGE_KEY,
} from "./constants";
import { getProductsBySeller, sellers } from "./data";
import { SEED_ENQUIRIES, SEED_ORDERS, SEED_TEAM_MEMBERS } from "./seed-data";
import { generateId, slugify } from "./slug";
import type { Enquiry, NewProductInput, NewTeamMemberInput, Order, Product, TeamMember } from "./types";

type Listener = () => void;

const EMPTY_ORDERS: Order[] = [];
const EMPTY_ENQUIRIES: Enquiry[] = [];
const EMPTY_PRODUCTS: Product[] = [];
const EMPTY_TEAM_MEMBERS: TeamMember[] = [];
const DEFAULT_SELLER_ID = sellers[0]?.id ?? "s1";

let orders: Order[] = EMPTY_ORDERS;
let enquiries: Enquiry[] = EMPTY_ENQUIRIES;
let catalogs: Record<string, Product[]> = {};
let teamMembers: TeamMember[] = EMPTY_TEAM_MEMBERS;
let selectedSellerId: string = DEFAULT_SELLER_ID;
let hydrated = false;

const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener();
}

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  window.localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
  window.localStorage.setItem(SELLER_CATALOGS_STORAGE_KEY, JSON.stringify(catalogs));
  window.localStorage.setItem(SELECTED_SELLER_STORAGE_KEY, selectedSellerId);
  window.localStorage.setItem(TEAM_MEMBERS_STORAGE_KEY, JSON.stringify(teamMembers));
}

function readJSON<T>(key: string, fallback: T): T {
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  orders = readJSON(ORDERS_STORAGE_KEY, SEED_ORDERS);
  if (orders.length === 0) orders = SEED_ORDERS;
  // Backfill fields added after some browsers already had orders saved, so old data doesn't crash.
  orders = orders.map((order) => ({ ...order, payoutStatus: order.payoutStatus ?? "unpaid" }));
  enquiries = readJSON(ENQUIRIES_STORAGE_KEY, SEED_ENQUIRIES);
  if (enquiries.length === 0) enquiries = SEED_ENQUIRIES;
  catalogs = readJSON(SELLER_CATALOGS_STORAGE_KEY, {} as Record<string, Product[]>);
  selectedSellerId = window.localStorage.getItem(SELECTED_SELLER_STORAGE_KEY) ?? DEFAULT_SELLER_ID;
  teamMembers = readJSON(TEAM_MEMBERS_STORAGE_KEY, SEED_TEAM_MEMBERS);
  if (teamMembers.length === 0) teamMembers = SEED_TEAM_MEMBERS;
}

function ensureCatalogSeeded(sellerId: string) {
  if (catalogs[sellerId]) return;
  catalogs = { ...catalogs, [sellerId]: getProductsBySeller(sellerId).map((product) => ({ ...product })) };
}

let allProductsCache: Product[] = EMPTY_PRODUCTS;
let allProductsCacheKey: Record<string, Product[]> | null = null;

function ensureAllCatalogsSeeded() {
  for (const seller of sellers) ensureCatalogSeeded(seller.id);
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getOrdersSnapshot(): Order[] {
  ensureHydrated();
  return orders;
}

export function getOrdersServerSnapshot(): Order[] {
  return EMPTY_ORDERS;
}

export function getEnquiriesSnapshot(): Enquiry[] {
  ensureHydrated();
  return enquiries;
}

export function getEnquiriesServerSnapshot(): Enquiry[] {
  return EMPTY_ENQUIRIES;
}

export function getCatalogSnapshot(sellerId: string): Product[] {
  ensureHydrated();
  ensureCatalogSeeded(sellerId);
  return catalogs[sellerId] ?? EMPTY_PRODUCTS;
}

export function getCatalogServerSnapshot(): Product[] {
  return EMPTY_PRODUCTS;
}

export function getAllCatalogsSnapshot(): Product[] {
  ensureHydrated();
  ensureAllCatalogsSeeded();
  if (allProductsCacheKey !== catalogs) {
    allProductsCache = Object.values(catalogs).flat();
    allProductsCacheKey = catalogs;
  }
  return allProductsCache;
}

export function getSelectedSellerIdSnapshot(): string {
  ensureHydrated();
  return selectedSellerId;
}

export function getSelectedSellerIdServerSnapshot(): string {
  return DEFAULT_SELLER_ID;
}

export function setSelectedSellerId(sellerId: string) {
  selectedSellerId = sellerId;
  persist();
  emit();
}

export function recordOrder(order: Order) {
  orders = [order, ...orders];
  persist();
  emit();
}

export function setOrderStatus(orderId: string, status: Order["status"]) {
  orders = orders.map((order) => (order.id === orderId ? { ...order, status } : order));
  persist();
  emit();
}

export function setOrderPayoutStatus(orderId: string, payoutStatus: Order["payoutStatus"]) {
  orders = orders.map((order) => (order.id === orderId ? { ...order, payoutStatus } : order));
  persist();
  emit();
}

export function recordEnquiry(enquiry: Enquiry) {
  enquiries = [enquiry, ...enquiries];
  persist();
  emit();
}

export function setEnquiryStatus(enquiryId: string, status: Enquiry["status"]) {
  enquiries = enquiries.map((enquiry) => (enquiry.id === enquiryId ? { ...enquiry, status } : enquiry));
  persist();
  emit();
}

export function addProductToCatalog(sellerId: string, input: NewProductInput): Product {
  ensureCatalogSeeded(sellerId);
  const slugBase = slugify(input.name) || "product";
  const product: Product = {
    id: generateId("sp"),
    slug: `${slugBase}-${generateId("x").slice(-4)}`,
    name: input.name,
    categoryId: "saree",
    sellerId,
    price: input.price,
    compareAtPrice: input.compareAtPrice,
    moq: input.moq,
    rating: 0,
    reviewCount: 0,
    stock: input.stock,
    tags: input.tags,
    swatch: "terracotta",
    pattern: "diagonal",
    variants: [{ label: "Default", swatch: "terracotta" }],
    description: input.description,
    highlights: [],
  };
  catalogs = { ...catalogs, [sellerId]: [product, ...catalogs[sellerId]] };
  persist();
  emit();
  return product;
}

export function updateProductInCatalog(sellerId: string, productId: string, patch: Partial<NewProductInput>) {
  ensureCatalogSeeded(sellerId);
  catalogs = {
    ...catalogs,
    [sellerId]: catalogs[sellerId].map((product) =>
      product.id === productId ? { ...product, ...patch } : product
    ),
  };
  persist();
  emit();
}

export function removeProductFromCatalog(sellerId: string, productId: string) {
  ensureCatalogSeeded(sellerId);
  catalogs = { ...catalogs, [sellerId]: catalogs[sellerId].filter((product) => product.id !== productId) };
  persist();
  emit();
}

export function getTeamMembersSnapshot(): TeamMember[] {
  ensureHydrated();
  return teamMembers;
}

export function getTeamMembersServerSnapshot(): TeamMember[] {
  return EMPTY_TEAM_MEMBERS;
}

export function addTeamMember(input: NewTeamMemberInput): TeamMember {
  const member: TeamMember = {
    id: generateId("team"),
    name: input.name,
    role: input.role,
    phone: input.phone,
    email: input.email,
    joinedAt: new Date().toISOString(),
  };
  teamMembers = [member, ...teamMembers];
  persist();
  emit();
  return member;
}

export function removeTeamMember(memberId: string) {
  teamMembers = teamMembers.filter((member) => member.id !== memberId);
  persist();
  emit();
}
