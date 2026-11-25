import { CART_STORAGE_KEY } from "./constants";
import type { CartLine } from "./types";

type Listener = () => void;

const EMPTY_LINES: CartLine[] = [];

let lines: CartLine[] = EMPTY_LINES;
let hydrated = false;
const listeners = new Set<Listener>();

function sameLine(a: CartLine, b: { productId: string; variantLabel: string }): boolean {
  return a.productId === b.productId && a.variantLabel === b.variantLabel;
}

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
}

function emit() {
  for (const listener of listeners) listener();
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const raw = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return;
  try {
    lines = JSON.parse(raw) as CartLine[];
  } catch {
    lines = [];
  }
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): CartLine[] {
  ensureHydrated();
  return lines;
}

export function getServerSnapshot(): CartLine[] {
  return EMPTY_LINES;
}

export function addLine(productId: string, variantLabel: string, quantity: number) {
  const existing = lines.find((line) => sameLine(line, { productId, variantLabel }));
  lines = existing
    ? lines.map((line) =>
        sameLine(line, { productId, variantLabel }) ? { ...line, quantity: line.quantity + quantity } : line
      )
    : [...lines, { productId, variantLabel, quantity }];
  persist();
  emit();
}

export function setLineQuantity(productId: string, variantLabel: string, quantity: number) {
  lines =
    quantity <= 0
      ? lines.filter((line) => !sameLine(line, { productId, variantLabel }))
      : lines.map((line) => (sameLine(line, { productId, variantLabel }) ? { ...line, quantity } : line));
  persist();
  emit();
}

export function removeLine(productId: string, variantLabel: string) {
  lines = lines.filter((line) => !sameLine(line, { productId, variantLabel }));
  persist();
  emit();
}

export function clearCart() {
  lines = [];
  persist();
  emit();
}
