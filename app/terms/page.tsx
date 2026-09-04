import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-20">
      <h1 className="font-display text-4xl">Terms of use</h1>
      <p className="mt-6 text-sm leading-7 text-muted">
        By using {site.domain} you agree to use the site lawfully. Project work, timelines, and
        fees are agreed in a separate statement of work with {site.name}. For legal questions,
        write {site.email}.
      </p>
    </article>
  );
}
