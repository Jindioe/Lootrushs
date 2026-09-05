import type { Metadata } from "next";
import { BrandHero } from "@/components/BrandHero";
import { CtaBand } from "@/components/CtaBand";
import { WorkVisual } from "@/components/WorkVisual";
import { chains, hiringSteps, media, site, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, a Web3 development and talent company that builds blockchain products for clients.`,
};

export default function AboutPage() {
  return (
    <>
      <BrandHero
        eyebrow="About"
        title="A Web3 development and talent company."
        image={media.about}
        imageAlt="Collaborators in the studio"
      >
        <p className="mt-5 max-w-xl text-base leading-8 text-muted">
          We build blockchain products for client companies, and we hire and manage the people who
          do that work.
        </p>
      </BrandHero>

      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-20 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 text-base leading-8 text-muted">
          <p>
            {site.name} works with Web3 companies that need specialized blockchain products,
            development teams, and technical expertise. The model is services plus staffing — not a
            single in-house product company.
          </p>
          <p>
            We recruit, hire, and manage experienced Web3 developers under our own name. Once hired,
            they work through Lootrushs while they develop, maintain, and support the client’s
            product. BrickFi is one example: a real estate investment platform we developed and
            delivered for a client.
          </p>
          <p>
            You will find us at {site.domain}. If you need a product built, a team staffed, or both,
            that is the conversation we want.
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-card p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Company</p>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Presence</dt>
              <dd className="mt-1 text-ink">{site.location}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Focus</dt>
              <dd className="mt-1 text-ink">Client products, talent, and delivery</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Contact</dt>
              <dd className="mt-1 text-gold">{site.email}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Hiring</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">How people join a project.</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {hiringSteps.map((step) => (
              <div key={step.n} className="border-t border-gold/30 pt-6">
                <p className="font-display text-sm text-gold">{step.n}</p>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-raised">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Client work</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            BrickFi and other selected products were developed by Lootrushs for client companies. We
            stay responsible for development, completion, and delivery.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
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
