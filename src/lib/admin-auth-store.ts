"use client";

import { useSyncExternalStore } from "react";

const AUTH_STORAGE_KEY = "ba-demo-admin-session";

export const ADMIN_DEMO_CREDENTIALS = {
  username: "baadmin",
  password: "admin123",
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

export function useAdminAuth(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function login(username: string, password: string): boolean {
  const matches =
    username.trim().toLowerCase() === ADMIN_DEMO_CREDENTIALS.username &&
    password === ADMIN_DEMO_CREDENTIALS.password;
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
