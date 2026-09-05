"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 shadow-[inset_0_1px_0_0_rgba(232,184,74,0.28)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5 text-gold" onClick={() => setOpen(false)}>
          <Logo className="h-7 w-7" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        {isAdmin ? (
          <nav className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-gold">
              Applications
            </Link>
          </nav>
        ) : (
          <nav className="hidden items-center gap-5 lg:gap-7 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition ${
                  active ? "text-gold" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-[#1a1406] transition hover:bg-gold-soft"
          >
            Start a project
          </Link>
          </nav>
        )}

        {isAdmin ? null : (
          <button
          type="button"
          className="rounded-md border border-line px-3 py-1.5 text-sm text-ink lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
            Menu
          </button>
        )}
      </div>

      {open && !isAdmin ? (
        <nav className="border-t border-line bg-raised px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-sm text-gold"
              onClick={() => setOpen(false)}
            >
              Start a project
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
