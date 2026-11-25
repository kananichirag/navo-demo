import type { OrderStatus, PayoutStatus } from "./types";

type Tone = "primary" | "accent" | "gold" | "success" | "neutral";

interface StatusMeta {
  label: string;
  tone: Tone;
}

export const ORDER_STATUS_META: Record<OrderStatus, StatusMeta> = {
  pending: { label: "Pending", tone: "accent" },
  dispatched: { label: "Dispatched", tone: "primary" },
  "out-for-delivery": { label: "Out for delivery", tone: "gold" },
  delivered: { label: "Delivered", tone: "success" },
};

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = ["pending", "dispatched", "out-for-delivery", "delivered"];

export function nextOrderStatus(status: OrderStatus): OrderStatus | null {
  const index = ORDER_STATUS_SEQUENCE.indexOf(status);
  return index >= 0 && index < ORDER_STATUS_SEQUENCE.length - 1 ? ORDER_STATUS_SEQUENCE[index + 1] : null;
}

export const PAYOUT_STATUS_META: Record<PayoutStatus, StatusMeta> = {
  unpaid: { label: "Unpaid", tone: "accent" },
  paid: { label: "Paid", tone: "success" },
};
