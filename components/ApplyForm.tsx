"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { ApplyCaptcha } from "@/components/ApplyCaptcha";

const MAX_RESUME_BYTES = 3 * 1024 * 1024;

const fieldClass =
  "mt-2 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-ink outline-none transition focus:border-gold";

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm text-muted" htmlFor={id}>
        {label}
        {hint ? <span className="ml-2 text-xs text-muted/70">{hint}</span> : null}
      </label>
      {children}
    </div>
  );
}

export function ApplyForm({ role, roleSlug = "" }: { role: string; roleSlug?: string }) {
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    const form = event.currentTarget;
    const resume = form.elements.namedItem("resume");
    const file = resume instanceof HTMLInputElement ? resume.files?.[0] : undefined;
    if (file && file.size > MAX_RESUME_BYTES) {
      setStatus("error");
      setError("Resume must be 3MB or smaller");
      return;
    }
    const body = new FormData(form);

    try {
      const response = await fetch("/api/apply", { method: "POST", body });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Could not submit this application.");
      }
      setStatus("done");
      form.reset();
      setFileName("");
    } catch (err) {
      setCaptchaKey((value) => value + 1);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not submit this application.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-gold/25 bg-card p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Received</p>
        <h2 className="mt-2 font-display text-2xl">Application submitted</h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          We saved your details, resume, and the role you applied for. If there is a fit, we will
          follow up by email.
        </p>
        <button
          type="button"
          className="mt-6 w-full rounded-full border border-line py-3 text-sm font-semibold text-ink hover:border-gold/40 hover:text-gold"
          onClick={() => setStatus("idle")}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form id="apply" className="relative overflow-hidden rounded-2xl border border-line bg-card" onSubmit={onSubmit}>
      <div className="border-b border-line bg-raised/70 px-6 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Application</p>
        <h2 className="mt-1 font-display text-2xl">Apply for this role</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{role}</p>
      </div>

      <div className="space-y-5 p-6">
        <input type="hidden" name="role" value={role} />
        <input type="hidden" name="roleSlug" value={roleSlug} />
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Full name">
            <input id="name" name="name" required autoComplete="name" className={fieldClass} />
          </Field>
          <Field id="email" label="Email">
            <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
          </Field>
        </div>

        <Field id="location" label="Location">
          <input id="location" name="location" required placeholder="City, country" autoComplete="address-level2" className={fieldClass} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="linkedin" label="LinkedIn">
            <input id="linkedin" name="linkedin" type="url" required placeholder="https://" className={fieldClass} />
          </Field>
          <Field id="github" label="GitHub / GitLab" hint="optional">
            <input id="github" name="github" type="url" placeholder="https://" className={fieldClass} />
          </Field>
        </div>

        <Field id="portfolio" label="Portfolio / website" hint="optional">
          <input id="portfolio" name="portfolio" type="url" placeholder="https://" className={fieldClass} />
        </Field>

        <div>
          <p className="text-sm text-muted">Resume / CV</p>
          <label
            htmlFor="resume"
            className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-line bg-bg px-4 py-7 text-center transition hover:border-gold/40"
          >
            <span className="text-sm text-ink">{fileName || "Drop a PDF or Word file, or browse"}</span>
            <span className="mt-1 text-xs text-muted">Required · PDF or Word · up to 3MB</span>
            <input
              id="resume"
              name="resume"
              type="file"
              required
              accept=".pdf,.doc,.docx,.rtf,.odt,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file && file.size > MAX_RESUME_BYTES) {
                  event.target.value = "";
                  setFileName("");
                  setError("Resume must be 3MB or smaller");
                  setStatus("error");
                  return;
                }
                setError("");
                setFileName(file?.name ?? "");
              }}
            />
          </label>
        </div>

        <Field id="message" label="Why Lootrushs, and this role?">
          <textarea id="message" name="message" required rows={5} className={`${fieldClass} resize-y`} />
        </Field>

        <ApplyCaptcha key={captchaKey} />

        {error ? <p className="text-sm text-ember">{error}</p> : null}

        <button
          type="submit"
          disabled={status === "saving"}
          className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-[#1a1406] transition hover:bg-gold-soft disabled:opacity-60"
        >
          {status === "saving" ? "Submitting…" : "Submit application"}
        </button>
        <p className="text-center text-[11px] leading-5 text-muted">
          Your application is stored privately. We use it only for recruiting.
        </p>
      </div>
    </form>
  );
}
