"use client";

import { useCallback, useSyncExternalStore } from "react";
import * as store from "./seller-store";
import type { Enquiry, Order, Product, TeamMember } from "./types";

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

export function useAllOrders(): Order[] {
  return useSyncExternalStore(store.subscribe, store.getOrdersSnapshot, store.getOrdersServerSnapshot);
}

export function useAllEnquiries(): Enquiry[] {
  return useSyncExternalStore(store.subscribe, store.getEnquiriesSnapshot, store.getEnquiriesServerSnapshot);
}

export function useAllCatalogs(): Product[] {
  return useSyncExternalStore(store.subscribe, store.getAllCatalogsSnapshot, store.getCatalogServerSnapshot);
}

export function useTeamMembers(): TeamMember[] {
  return useSyncExternalStore(store.subscribe, store.getTeamMembersSnapshot, store.getTeamMembersServerSnapshot);
}

export const {
  recordOrder,
  setOrderStatus,
  setOrderPayoutStatus,
  recordEnquiry,
  setEnquiryStatus,
  addProductToCatalog,
  updateProductInCatalog,
  removeProductFromCatalog,
  addTeamMember,
  removeTeamMember,
} = store;
