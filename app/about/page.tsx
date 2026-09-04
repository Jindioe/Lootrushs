import type { Metadata } from "next";
import { BrandHero } from "@/components/BrandHero";
import { CtaBand } from "@/components/CtaBand";
import { WorkVisual } from "@/components/WorkVisual";
import { chains, media, site, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, a Web3 and blockchain development company.`,
};

export default function AboutPage() {
  return (
    <>
      <BrandHero
        eyebrow="About"
        title="A Web3 company that actually ships the chain work."
        image={media.about}
        imageAlt="Collaborators in the studio"
      >
        <p className="mt-5 max-w-xl text-base leading-8 text-muted">
          Independent studio. Production blockchain software — not a weekend hackathon demo.
        </p>
      </BrandHero>

      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-20 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 text-base leading-8 text-muted">
          <p>
            {site.name} is an independent Web3 development company. We exist for founders, studios,
            and protocols that need production blockchain software.
          </p>
          <p>
            Our team covers smart contracts, decentralized apps, DeFi, real estate platforms like
            BrickFi, NFT and game economies, wallets, and the infrastructure that keeps those
            products alive after launch. We work across Ethereum, L2s, Solana, and adjacent
            ecosystems, and we stay through deploy.
          </p>
          <p>
            You will find us at {site.domain}. If you have a chain, a product idea, and a date you
            cannot miss, that is the conversation we want.
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-card p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Studio</p>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Presence</dt>
              <dd className="mt-1 text-ink">{site.location}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Focus</dt>
              <dd className="mt-1 text-ink">Protocol, product, and launch</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Contact</dt>
              <dd className="mt-1 text-gold">{site.email}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-line bg-raised">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-4 md:grid-cols-3">
            <WorkVisual slug="brickfi" className="aspect-[16/10] rounded-2xl border border-line" />
            <WorkVisual slug="vaultlayer" className="aspect-[16/10] rounded-2xl border border-line" />
            <WorkVisual slug="keystone-aa" className="aspect-[16/10] rounded-2xl border border-line" />
          </div>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-gold">Networks</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {chains.map((chain) => (
              <span key={chain} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink/90">
                {chain}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl md:text-4xl">How we work</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-line bg-card p-6">
              <h3 className="font-display text-2xl text-gold-soft">{value.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{value.body}</p>
            </article>
          ))}
        </div>
      </div>

      <CtaBand />
    </>
  );
}
