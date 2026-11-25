import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { AdminShell } from "@/components/admin-dashboard/AdminShell";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Platform Admin — BA Enterprises",
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
