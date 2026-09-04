"use client";

import { useCallback, useEffect, useState } from "react";

type Challenge = { token: string; image: string };

export function ApplyCaptcha() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/captcha", { cache: "no-store" });
      const payload = (await response.json()) as Challenge & { error?: string };
      if (!response.ok || !payload.token || !payload.image) {
        throw new Error(payload.error || "Could not load verification image");
      }
      setChallenge(payload);
    } catch (err) {
      setChallenge(null);
      setError(err instanceof Error ? err.message : "Could not load verification image");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <section className="mt-8 rounded-2xl border border-gold/20 bg-raised/80 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Verification</p>
          <h3 className="mt-1 font-display text-lg text-ink">Confirm you are human</h3>
          <p className="mt-1 text-xs leading-5 text-muted">
            Type the five characters shown in the image. This keeps bulk applications out.
          </p>
        </div>
        <span className="mt-1 hidden rounded-full border border-line px-2.5 py-1 text-[10px] uppercase tracking-wide text-muted sm:inline">
          Secure
        </span>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-line bg-[#0b0a0e] shadow-[inset_0_0_0_1px_rgba(232,184,74,0.08)]">
        {loading ? (
          <div className="flex h-[108px] w-full items-center justify-center bg-[linear-gradient(110deg,#121018_20%,#1c1810_40%,#121018_60%)] bg-[length:200%_100%] animate-pulse">
            <span className="text-xs text-muted">Loading image…</span>
          </div>
        ) : challenge?.image ? (
          // Server-generated captcha image (data URI). Not a remote/user URL.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={challenge.image}
            alt="Verification characters to type"
            width={340}
            height={108}
            className="h-[108px] w-full object-cover"
          />
        ) : (
          <div className="flex h-[108px] items-center justify-center text-sm text-ember">Image unavailable</div>
        )}
      </div>

      <div className="mt-4 flex items-end gap-3">
        <div className="min-w-0 flex-1">
          <label className="block text-xs font-medium text-muted" htmlFor="captchaAnswer">
            Enter the characters
          </label>
          <input
            id="captchaAnswer"
            name="captchaAnswer"
            required
            autoComplete="off"
            spellCheck={false}
            inputMode="text"
            maxLength={8}
            placeholder="•••••"
            className="mt-2 w-full rounded-lg border border-line bg-bg px-3 py-2.5 font-mono text-sm tracking-[0.35em] text-ink outline-none placeholder:tracking-normal placeholder:text-muted/50 focus:border-gold"
          />
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-line px-3 text-sm text-muted transition hover:border-gold/40 hover:text-gold"
          aria-label="Load a new verification image"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 12a8 8 0 1 1-2.2-5.5" strokeLinecap="round" />
            <path d="M20 4v6h-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">New image</span>
        </button>
      </div>

      <input type="hidden" name="captchaToken" value={challenge?.token ?? ""} />
      {error ? <p className="mt-3 text-sm text-ember">{error}</p> : null}
    </section>
  );
}
