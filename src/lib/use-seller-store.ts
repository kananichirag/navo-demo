"use client";

import { useCallback, useSyncExternalStore } from "react";
import * as store from "./seller-store";
import type { Order } from "./types";

export function useSelectedSellerId(): [string, (sellerId: string) => void] {
  const sellerId = useSyncExternalStore(
    store.subscribe,
    store.getSelectedSellerIdSnapshot,
    store.getSelectedSellerIdServerSnapshot
  );
  return [sellerId, store.setSelectedSellerId];
}

export function useSellerOrders(sellerId: string): Order[] {
  const allOrders = useSyncExternalStore(store.subscribe, store.getOrdersSnapshot, store.getOrdersServerSnapshot);
  return allOrders.filter((order) => order.sellerId === sellerId);
}

export function useSellerEnquiries(sellerId: string) {
  const allEnquiries = useSyncExternalStore(
    store.subscribe,
    store.getEnquiriesSnapshot,
    store.getEnquiriesServerSnapshot
  );
  return allEnquiries.filter((enquiry) => enquiry.sellerId === sellerId);
}

export function useSellerCatalog(sellerId: string) {
  const getSnapshot = useCallback(() => store.getCatalogSnapshot(sellerId), [sellerId]);
  return useSyncExternalStore(store.subscribe, getSnapshot, store.getCatalogServerSnapshot);
}

export const {
  recordOrder,
  setOrderStatus,
  recordEnquiry,
  setEnquiryStatus,
  addProductToCatalog,
  updateProductInCatalog,
  removeProductFromCatalog,
} = store;
