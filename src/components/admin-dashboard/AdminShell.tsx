"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ShoppingBag,
  Store,
  Truck,
  Users,
  Wallet,
  X,
} from "lucide-react";
import clsx from "clsx";
import { logout, useAdminAuth } from "@/lib/admin-auth-store";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/sellers", label: "Sellers", icon: Store },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders & enquiries", icon: ShoppingBag },
  { href: "/admin/delivery", label: "Delivery", icon: Truck },
  { href: "/admin/payments", label: "Payments", icon: Wallet },
  { href: "/admin/team", label: "Team", icon: Users },
];

function SidebarNav({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="Admin sections" className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={clsx(
              "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition",
              isActive ? "bg-[var(--color-primary)] text-white" : "text-slate-400 hover:bg-white/10 hover:text-white"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthed = useAdminAuth();
  const isLoginRoute = pathname === "/admin/login";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!isAuthed && !isLoginRoute) {
      router.replace("/admin/login");
    } else if (isAuthed && isLoginRoute) {
      router.replace("/admin");
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
    router.replace("/admin/login");
  };

  const brand = (
    <div className="flex items-center justify-between px-4 py-4">
      <Link href="/admin" className="font-display flex items-center gap-1.5 text-lg font-semibold text-white">
        <span className="text-[var(--color-primary)]">BA</span> Platform Admin
      </Link>
      <button
        type="button"
        onClick={() => setMobileNavOpen(false)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-white lg:hidden"
        aria-label="Close menu"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );

  const footerLinks = (
    <div className="space-y-1 border-t border-white/10 px-3 py-4">
      <Link href="/" className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white">
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
        Back to storefront
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white"
      >
        <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
        Log out
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[var(--color-surface-sunken)]">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#14161c] lg:flex">
        {brand}
        <SidebarNav pathname={pathname} />
        {footerLinks}
      </aside>

      {/* Mobile off-canvas sidebar */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} aria-hidden="true" />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-[#14161c] shadow-xl">
            {brand}
            <SidebarNav pathname={pathname} onNavigate={() => setMobileNavOpen(false)} />
            {footerLinks}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 border-b border-[var(--color-primary)] bg-[#14161c] px-4 py-3 text-white lg:hidden">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-300 hover:text-white"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="font-display flex items-center gap-1.5 text-base font-semibold">
            <span className="text-[var(--color-primary)]">BA</span> Admin
          </span>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
