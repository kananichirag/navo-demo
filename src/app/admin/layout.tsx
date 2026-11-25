import type { Metadata } from "next";
import { AdminShell } from "@/components/admin-dashboard/AdminShell";

export const metadata: Metadata = {
  title: "Platform Admin — BA Enterprises",
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AdminShell>{children}</AdminShell>;
}
