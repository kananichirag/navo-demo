import clsx from "clsx";
import type { ReactNode } from "react";

type Tone = "primary" | "accent" | "gold" | "success" | "neutral";

const toneClasses: Record<Tone, string> = {
  primary: "bg-[var(--color-primary-tint)] text-[var(--color-primary-dark)]",
  accent: "bg-[var(--color-accent-tint)] text-[var(--color-accent)]",
  gold: "bg-[var(--color-gold-tint)] text-[var(--color-gold)]",
  success: "bg-[var(--color-success-tint)] text-[var(--color-success)]",
  neutral: "bg-[var(--color-surface-sunken)] text-[var(--color-ink-muted)]",
};

type Props = {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
};

export function Badge({ children, tone = "neutral", icon, className }: Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

const TAG_TONE: Record<string, Tone> = {
  New: "success",
  Trending: "accent",
  Bestseller: "primary",
  Festive: "gold",
};

export function tagTone(tag: string): Tone {
  return TAG_TONE[tag] ?? "neutral";
}
