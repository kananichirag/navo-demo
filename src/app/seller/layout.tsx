import type { Metadata } from "next";
import { DashboardShell } from "@/components/seller-dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "Seller Dashboard — BA Enterprises",
};

export default function SellerLayout({ children }: LayoutProps<"/seller">) {
  return <DashboardShell>{children}</DashboardShell>;
}
