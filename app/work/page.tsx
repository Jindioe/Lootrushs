import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { CtaBand } from "@/components/CtaBand";
import { JumpNav } from "@/components/JumpNav";
import { WorkVisual } from "@/components/WorkVisual";
import { media, projects, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: `Selected client Web3 products developed and delivered by ${site.name}.`,
};

export default function WorkPage() {
  const types = [...new Set(projects.map((project) => project.type))];

  return (
    <>
      <BrandHero eyebrow="Work" title="Client products we delivered" image={media.hero} imageAlt="Lootrushs team at work">
        <p className="mt-5 max-w-2xl text-muted">
          Case studies from {site.name} engagements — real estate, DeFi, governance, gaming,
          bridges, and wallets — from first contract through launch. BrickFi is a client product,
          not ours.
        </p>
      </BrandHero>

      <div className="border-t border-line bg-raised">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <JumpNav items={types.map((type) => ({ href: `#${projects.find((project) => project.type === type)?.slug}`, label: type }))} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-5 py-16">
        {projects.map((project) => (
          <article
            id={project.slug}
            key={project.slug}
            className="scroll-mt-24 overflow-hidden rounded-3xl border border-line bg-card md:grid md:grid-cols-[1.05fr_0.95fr]"
          >
            <WorkVisual slug={project.slug} className="aspect-[16/10] md:min-h-full" />
            <div className="flex flex-col justify-center p-6 md:p-10">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line px-2.5 py-1 text-[11px] uppercase tracking-wide text-gold">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-4 font-display text-3xl md:text-4xl">{project.name}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{project.blurb}</p>
              <p className="mt-4 text-xs text-muted">{project.chain}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href={`/work/${project.slug}`} className="text-sm text-gold hover:text-gold-soft">
                  Read case study →
                </Link>
                <Link href="/contact" className="text-sm text-muted hover:text-gold">
                  Discuss a similar build
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <CtaBand />
    </>
  );
}
