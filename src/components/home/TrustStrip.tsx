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
      <div className="grid divide-y divide-[var(--color-border)] rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-surface),var(--color-surface-sunken))] p-6 sm:grid-cols-2 sm:divide-y-0 sm:divide-x sm:p-8 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex flex-col gap-2.5 py-5 first:pt-0 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-gold-tint)] text-[var(--color-gold)]">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-[var(--color-ink)]">{item.title}</p>
            <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
