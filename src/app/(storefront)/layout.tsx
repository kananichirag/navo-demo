import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCartBar } from "@/components/layout/StickyCartBar";
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
  title: "BA Enterprises — Wholesale Saree Marketplace (Demo)",
  description:
    "BA Enterprises connects wholesale saree sellers with retail shop owners for bulk ordering — a product demo.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1 pb-24">{children}</main>
          <Footer />
          <StickyCartBar />
        </CartProvider>
      </body>
    </html>
  );
}
