"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-line bg-raised">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-12 md:flex-row md:items-center">
        <div>
          <p className="font-display text-2xl">Need a product built or a team staffed?</p>
          <p className="mt-2 text-sm text-muted">{site.location} · {site.email}</p>
        </div>
        <Link
          href="/contact"
          className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-[#1a1406] hover:bg-gold-soft"
        >
          Start a project
        </Link>
      </div>
      <div className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2.5 text-gold">
            <Logo className="h-7 w-7" />
            <span className="font-display text-lg font-semibold text-ink">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            {site.description}
          </p>
          <p className="mt-4 text-sm text-gold">{site.domain}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Site</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink/90 hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Company</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/careers" className="text-sm text-ink/90 hover:text-gold">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm text-ink/90 hover:text-gold">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-ink/90 hover:text-gold">
                Terms
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-sm text-ink/90 hover:text-gold">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. {site.location}. All rights reserved.
        </p>
      </div>
      </div>
    </footer>
  );
}
