"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check, Plus } from "lucide-react";

export function FollowButton() {
  const [following, setFollowing] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFollowing((value) => !value)}
      aria-pressed={following}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-5 py-2 text-sm font-semibold transition",
        following
          ? "border-[var(--color-success)] bg-[var(--color-success-tint)] text-[var(--color-success)]"
          : "border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-tint)]"
      )}
    >
      {following ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
      {following ? "Following" : "Follow"}
    </button>
  );
}
