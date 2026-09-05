import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { WorkVisual } from "@/components/WorkVisual";
import { chains, hiringSteps, media, principles, site, stack, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, a Web3 development and talent company that builds blockchain products for clients.`,
};

export default function AboutPage() {
  return (
    <>
      <BrandHero
        eyebrow="About"
        title="Engineering and talent behind client chain products."
        image={media.about}
        imageAlt="Collaborators in the studio"
      >
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
          {site.name} is a Web3 development and talent company. We build blockchain products for
          client companies, and we hire and manage the people who do that work.
        </p>
      </BrandHero>

      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5 text-base leading-8 text-muted">
          <p>
            The model is services plus staffing — not a single in-house product company. Clients
            come for specialized blockchain products, a development team, or both.
          </p>
          <p>
            We recruit under our own name. Once hired, developers work through Lootrushs while they
            develop, maintain, and support the client’s product. BrickFi is one example: a real
            estate investment platform we developed and delivered for a client.
          </p>
          <p>
            You will find us at {site.domain}. If you need a product built, a team staffed, or both,
            that is the conversation we want.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/how-we-work" className="text-sm text-gold hover:text-gold-soft">
              How we work →
            </Link>
            <Link href="/work" className="text-sm text-gold hover:text-gold-soft">
              Case studies →
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-line bg-card p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Company</p>
          <dl className="mt-6 space-y-5">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Presence</dt>
              <dd className="mt-1 text-ink">{site.location}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Model</dt>
              <dd className="mt-1 text-ink">Client products · talent · delivery</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Contact</dt>
              <dd className="mt-1 text-gold">{site.email}</dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="border-t border-line bg-raised">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading eyebrow="How we decide" title="Principles we will not trade." />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {principles.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-card p-6">
                <h3 className="font-display text-2xl text-gold-soft">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading eyebrow="Stack" title="What the bench works in." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {stack.map((group) => (
              <div key={group.group} className="rounded-2xl border border-line bg-card p-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{group.group}</p>
                <ul className="mt-4 space-y-2 text-sm text-ink/90">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Networks</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {chains.map((chain) => (
              <span key={chain} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink/90">
                {chain}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-raised">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionHeading
            eyebrow="Client work"
            title="Products we developed for other companies."
            href="/work"
            action="All case studies"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <WorkVisual slug="brickfi" className="aspect-[16/10] rounded-2xl border border-line" />
            <WorkVisual slug="vaultlayer" className="aspect-[16/10] rounded-2xl border border-line" />
            <WorkVisual slug="keystone-aa" className="aspect-[16/10] rounded-2xl border border-line" />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading eyebrow="Hiring" title="How people join a project." href="/careers" action="Open roles" />
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {hiringSteps.map((step) => (
              <div key={step.n} className="border-t border-gold/30 pt-6">
                <p className="font-display text-sm text-gold">{step.n}</p>
                <h3 className="mt-3 font-display text-xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {values.map((value) => (
              <article key={value.title} className="rounded-2xl border border-line bg-card p-6">
                <h3 className="font-display text-2xl text-gold-soft">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
