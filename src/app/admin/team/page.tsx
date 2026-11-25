"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, Plus, Trash2, UserPlus } from "lucide-react";
import { addTeamMember, removeTeamMember, useTeamMembers } from "@/lib/use-seller-store";

const ROLE_OPTIONS = ["Delivery Manager", "Operations", "Customer Support", "Finance", "Marketing"];

function formatJoined(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminTeamPage() {
  const members = useTeamMembers();
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState(ROLE_OPTIONS[0]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTeamMember({ name, role, phone, email: email || undefined });
    setName("");
    setPhone("");
    setEmail("");
    setFormOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Team ({members.length})</h1>
        {!formOpen && (
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
          >
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Add team member
          </button>
        )}
      </div>
      <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
        Internal staff — delivery, operations, support, and finance. Not sellers or customers.
      </p>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 grid gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:grid-cols-2"
        >
          <div>
            <label htmlFor="tm-name" className="text-xs font-medium text-[var(--color-ink-muted)]">
              Name
            </label>
            <input
              id="tm-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="tm-role" className="text-xs font-medium text-[var(--color-ink-muted)]">
              Role
            </label>
            <select
              id="tm-role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tm-phone" className="text-xs font-medium text-[var(--color-ink-muted)]">
              Phone
            </label>
            <input
              id="tm-phone"
              required
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="tm-email" className="text-xs font-medium text-[var(--color-ink-muted)]">
              Email (optional)
            </label>
            <input
              id="tm-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add member
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="rounded-full border border-[var(--color-border)] px-5 py-2 text-sm font-semibold text-[var(--color-ink)]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-5 space-y-2">
        {members.length === 0 && !formOpen && (
          <p className="rounded-2xl border border-dashed border-[var(--color-border)] p-8 text-center text-sm text-[var(--color-ink-muted)]">
            No team members yet. Add your first one above.
          </p>
        )}
        {members.map((member) => (
          <div
            key={member.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-[var(--color-ink)]">{member.name}</p>
              <p className="text-xs text-[var(--color-ink-muted)]">
                {member.role} · Joined {formatJoined(member.joinedAt)}
              </p>
              <div className="mt-1 flex flex-wrap gap-3 text-xs text-[var(--color-ink-muted)]">
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" aria-hidden="true" />
                  {member.phone}
                </span>
                {member.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" aria-hidden="true" />
                    {member.email}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              aria-label={`Remove ${member.name}`}
              onClick={() => removeTeamMember(member.id)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
