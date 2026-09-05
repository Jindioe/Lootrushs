import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-20">
      <h1 className="font-display text-4xl">Privacy policy</h1>
      <p className="mt-6 text-sm leading-7 text-muted">
        {site.name} ({site.domain}) collects contact-form details, job applications (including
        uploaded resumes), and basic analytics so we can recruit, match candidates to client work,
        and reply. Applications are stored in our private recruitment database. We do not sell
        personal data. Questions: {site.email}.
      </p>
    </article>
  );
}
