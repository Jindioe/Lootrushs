"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const fieldClass =
  "mt-2 w-full rounded-lg border border-line bg-bg px-3 py-2 text-ink outline-none focus:border-gold";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    const body = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/admin/login", { method: "POST", body });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Could not sign in.");
      }
      const next = searchParams.get("next");
      router.replace(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not sign in.");
    }
  }

  return (
    <form className="rounded-2xl border border-line bg-card p-6" onSubmit={onSubmit}>
      <h1 className="font-display text-2xl">Hiring admin</h1>
      <p className="mt-2 text-sm text-muted">Sign in to review applications.</p>

      <label className="mt-5 block text-sm text-muted" htmlFor="admin-email">
        Email
      </label>
      <input id="admin-email" name="email" type="email" required autoComplete="username" className={fieldClass} />

      <label className="mt-5 block text-sm text-muted" htmlFor="admin-password">
        Password
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        className={fieldClass}
      />

      {error ? <p className="mt-4 text-sm text-ember">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "saving"}
        className="mt-6 w-full rounded-full bg-gold py-3 text-sm font-semibold text-[#1a1406] transition hover:bg-gold-soft disabled:opacity-60"
      >
        {status === "saving" ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
