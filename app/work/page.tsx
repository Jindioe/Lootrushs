import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { CtaBand } from "@/components/CtaBand";
import { WorkVisual } from "@/components/WorkVisual";
import { media, projects, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: `Selected Web3 and blockchain projects from ${site.name}.`,
};

export default function WorkPage() {
  const [featured, ...rest] = projects;

  return (
    <>
      <BrandHero eyebrow="Work" title="Selected projects" image={media.hero} imageAlt="Lootrushs team at work">
        <p className="mt-5 max-w-xl text-muted">
          Web3 and blockchain products {site.name} builds — real estate, DeFi, governance, gaming,
          bridges, and wallets — from first contract through launch.
        </p>
      </BrandHero>

      <div className="mx-auto max-w-6xl px-5 py-20">
        <article className="overflow-hidden rounded-3xl border border-line bg-card">
          <WorkVisual slug={featured.slug} className="aspect-[21/9] min-h-[280px]" />
          <div className="grid gap-6 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10">
            <div>
              <span className="text-xs uppercase tracking-[0.16em] text-gold">{featured.type}</span>
              <h2 className="mt-3 font-display text-4xl">{featured.name}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{featured.blurb}</p>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-muted">{featured.chain}</p>
              <Link href="/contact" className="mt-4 inline-block text-sm text-gold hover:text-gold-soft">
                Discuss a similar build →
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {rest.map((project) => (
            <article key={project.slug} className="overflow-hidden rounded-2xl border border-line bg-card">
              <WorkVisual slug={project.slug} className="aspect-[16/10]" />
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.16em] text-gold">{project.type}</span>
                  <span className="text-xs text-muted">{project.chain}</span>
                </div>
                <h2 className="mt-4 font-display text-3xl">{project.name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{project.blurb}</p>
                <Link href="/contact" className="mt-6 inline-block text-sm text-gold hover:text-gold-soft">
                  Discuss a similar build →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CtaBand />
    </>
  );
}
