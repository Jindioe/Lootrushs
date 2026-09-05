"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";

export function FaqList({ items = faqs }: { items?: typeof faqs }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-start justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="font-display text-lg text-ink md:text-xl">{item.q}</span>
              <span className="mt-1 shrink-0 text-gold">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen ? <p className="pb-6 text-sm leading-7 text-muted">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
