"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, LayoutDashboard, LogOut, Package, ShoppingBag } from "lucide-react";
import clsx from "clsx";
import { sellers } from "@/lib/data";
import { useSelectedSellerId } from "@/lib/use-seller-store";
import { logout, useSellerAuth } from "@/lib/auth-store";

const NAV_ITEMS = [
  { href: "/seller", label: "Overview", icon: LayoutDashboard },
  { href: "/seller/products", label: "Products", icon: Package },
  { href: "/seller/orders", label: "Orders & enquiries", icon: ShoppingBag },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthed = useSellerAuth();
  const isLoginRoute = pathname === "/seller/login";
  const [selectedSellerId, setSelectedSellerId] = useSelectedSellerId();

  useEffect(() => {
    if (!isAuthed && !isLoginRoute) {
      router.replace("/seller/login");
    } else if (isAuthed && isLoginRoute) {
      router.replace("/seller");
    }
  }, [isAuthed, isLoginRoute, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (!isAuthed) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.replace("/seller/login");
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface-sunken)]">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-primary)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to storefront
          </Link>

          <span className="font-display ml-2 text-lg font-semibold text-[var(--color-primary)]">
            Seller Dashboard
          </span>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="seller-switcher" className="text-xs font-medium text-[var(--color-ink-muted)]">
                Viewing as
              </label>
              <select
                id="seller-switcher"
                value={selectedSellerId}
                onChange={(event) => setSelectedSellerId(event.target.value)}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-sm text-[var(--color-ink)]"
              >
                {sellers.map((seller) => (
                  <option key={seller.id} value={seller.id}>
                    {seller.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm font-medium text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Log out
            </button>
          </div>
        </div>

        <nav aria-label="Dashboard sections" className="scroll-rail mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition",
                  isActive
                    ? "bg-[var(--color-primary-tint)] text-[var(--color-primary-dark)]"
                    : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-sunken)]"
                )}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
