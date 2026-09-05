import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand({
  title = site.tagline,
  body = `Tell us the chain, the product, and whether you need a build, a team, or both. We will tell you what it takes to ship it.`,
  href = "/contact",
  action = "Start a project",
}: {
  title?: string;
  body?: string;
  href?: string;
  action?: string;
}) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center">
        <p className="font-display text-4xl md:text-5xl">{title}</p>
        <p className="mx-auto mt-4 max-w-md text-muted">{body}</p>
        <Link
          href={href}
          className="mt-8 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-[#1a1406] transition hover:bg-gold-soft"
        >
          {action}
        </Link>
      </div>
    </section>
  );
}
