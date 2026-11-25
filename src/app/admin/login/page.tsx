"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { ADMIN_DEMO_CREDENTIALS, login } from "@/lib/admin-auth-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login(username, password)) {
      router.replace("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-ink)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
      >
        <p className="font-display text-xl font-semibold text-[var(--color-primary)]">BA Enterprises</p>
        <div className="mt-1 flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-[var(--color-ink-muted)]" aria-hidden="true" />
          <h1 className="text-lg font-semibold text-[var(--color-ink)]">Platform admin sign in</h1>
        </div>

        <p className="mt-3 rounded-lg bg-[var(--color-primary-tint)] px-3 py-2 text-xs text-[var(--color-primary-dark)]">
          Demo credentials — username <strong>{ADMIN_DEMO_CREDENTIALS.username}</strong>, password{" "}
          <strong>{ADMIN_DEMO_CREDENTIALS.password}</strong>
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="admin-login-username" className="text-xs font-medium text-[var(--color-ink-muted)]">
              Username
            </label>
            <input
              id="admin-login-username"
              required
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError(false);
              }}
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="admin-login-password" className="text-xs font-medium text-[var(--color-ink-muted)]">
              Password
            </label>
            <input
              id="admin-login-password"
              type="password"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(false);
              }}
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-[var(--color-accent)]">Incorrect username or password.</p>}

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
