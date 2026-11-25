import { Handshake, PackageCheck, Percent, ShieldCheck } from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Verified sellers only",
    description: "Every seller is reviewed and rated by real retail buyers before they list.",
  },
  {
    icon: Percent,
    title: "True wholesale pricing",
    description: "Prices scale with order quantity — no retail markup hiding in the catalog.",
  },
  {
    icon: Handshake,
    title: "Enquire before you buy",
    description: "Ask a seller about fabric, sizing, or stock before committing to an order.",
  },
  {
    icon: PackageCheck,
    title: "Order protection",
    description: "Advance payments are held until your order is confirmed dispatched.",
  },
];

export function TrustStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex flex-col gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-tint)] text-[var(--color-primary-dark)]">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-[var(--color-ink)]">{item.title}</p>
            <p className="text-sm text-[var(--color-ink-muted)]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
