"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import * as cartStore from "./cart-store";
import { getProductById } from "./data";
import type { CartLine } from "./types";

interface CartContextValue {
  lines: CartLine[];
  addLine: (productId: string, variantLabel: string, quantity: number) => void;
  setQuantity: (productId: string, variantLabel: string, quantity: number) => void;
  removeLine: (productId: string, variantLabel: string) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

function subscribeClientFlag(): () => void {
  return () => {};
}

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getServerSnapshot);
  const isHydrated = useSyncExternalStore(
    subscribeClientFlag,
    () => true,
    () => false
  );

  const totalItems = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const product = getProductById(line.productId);
        return product ? sum + product.price * line.quantity : sum;
      }, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    addLine: cartStore.addLine,
    setQuantity: cartStore.setLineQuantity,
    removeLine: cartStore.removeLine,
    clear: cartStore.clearCart,
    totalItems,
    subtotal,
    isHydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
