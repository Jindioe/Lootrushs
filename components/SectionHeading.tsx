import type { ReactNode } from "react";
import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  body,
  href,
  action,
}: {
  eyebrow: string;
  title: string;
  body?: ReactNode;
  href?: string;
  action?: string;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl leading-tight md:text-5xl">{title}</h2>
        {body ? <div className="mt-4 max-w-xl text-sm leading-7 text-muted">{body}</div> : null}
      </div>
      {href && action ? (
        <Link href={href} className="shrink-0 text-sm text-gold hover:text-gold-soft">
          {action} →
        </Link>
      ) : null}
    </div>
  );
}
