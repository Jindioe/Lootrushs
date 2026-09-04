import type { ReactNode } from "react";
import Image from "next/image";

export function BrandHero({
  eyebrow,
  title,
  children,
  tall = false,
  image,
  imageAlt = "",
  plain = false,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  tall?: boolean;
  image?: string;
  imageAlt?: string;
  plain?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {plain ? null : (
      <div className="absolute inset-0 bg-bg">
        {image ? (
          <>
            <Image src={image} alt={imageAlt} fill className="object-cover" sizes="100vw" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/50" />
          </>
        ) : (
          <>
            <div className="grid-fade absolute inset-0 opacity-70" />
            <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-ember/10 blur-3xl" />
          </>
        )}
      </div>
      )}
      <div
        className={`relative mx-auto flex max-w-6xl flex-col justify-end px-5 pb-16 pt-24 md:pb-20 ${
          tall ? "min-h-[480px] md:min-h-[560px]" : "min-h-[340px] md:min-h-[400px]"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight md:text-6xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}
