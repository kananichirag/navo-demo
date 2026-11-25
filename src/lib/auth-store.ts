"use client";

import { useSyncExternalStore } from "react";

const AUTH_STORAGE_KEY = "ba-demo-seller-session";

export const SELLER_DEMO_CREDENTIALS = {
  username: "baseller",
  password: "saller123",
};

let authenticated = false;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  authenticated = window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): boolean {
  ensureHydrated();
  return authenticated;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useSellerAuth(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function login(username: string, password: string): boolean {
  const matches =
    username.trim().toLowerCase() === SELLER_DEMO_CREDENTIALS.username &&
    password === SELLER_DEMO_CREDENTIALS.password;
  if (matches) {
    authenticated = true;
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
    emit();
  }
  return matches;
}

export function logout() {
  authenticated = false;
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  emit();
}
