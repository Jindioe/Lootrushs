import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceVisual } from "@/components/ServiceVisual";
import { StatBar } from "@/components/StatBar";
import { WorkVisual } from "@/components/WorkVisual";
import { formatSalary, jobs } from "@/lib/jobs";
import {
  audiences,
  chains,
  engagements,
  media,
  processSteps,
  projects,
  services,
  site,
} from "@/lib/site";

export default function HomePage() {
  const featured = projects[0];
  const rest = projects.slice(1, 4);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image src={media.hero} alt="Lootrushs engineering bench" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/88 to-bg/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
          <p className="rise text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
            Web3 development and talent · {site.location}
          </p>
          <h1 className="rise rise-d1 mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Blockchain products for clients.
            <span className="gold-text"> Built and staffed.</span>
          </h1>
          <p className="rise rise-d2 mt-6 max-w-2xl text-lg leading-8 text-muted">
            {site.name} designs, ships, and supports on-chain products for Web3 companies — and hires
            the developers who do that work. You work through Lootrushs. The product belongs to the
            client.
          </p>
          <div className="rise rise-d3 mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-[#1a1406] transition hover:bg-gold-soft"
            >
              Start a build
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-line bg-bg/40 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:border-gold/40 hover:text-gold"
            >
              See case studies
            </Link>
            <Link href="/careers" className="text-sm text-gold hover:text-gold-soft">
              Open roles →
            </Link>
          </div>
          <div className="rise rise-d4 mt-16 grid gap-4 md:grid-cols-3">
            {engagements.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="rounded-2xl border border-line bg-bg/50 p-5 backdrop-blur transition hover:border-gold/35"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{item.n}</p>
                <h2 className="mt-3 font-display text-2xl">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                <p className="mt-4 text-sm text-gold">{item.action} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StatBar
        items={[
          { value: String(services.length), label: "capability areas" },
          { value: String(chains.length), label: "chains we ship on" },
          { value: String(projects.length), label: "published case studies" },
          { value: String(jobs.length), label: "open seats on the bench" },
        ]}
      />

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Networks we build on
          </p>
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
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="Who we work with"
            title="Route by your context."
            body="Every path leads to a capability, a case study, or a hiring conversation — not a generic landing."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience) => (
              <Link
                key={audience.slug}
                href={audience.href}
                className="group rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-0.5 hover:border-gold/35"
              >
                <h3 className="font-display text-2xl group-hover:text-gold-soft">{audience.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{audience.blurb}</p>
                <p className="mt-5 text-sm text-gold">Continue →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="Capabilities"
            title="The stack a Web3 product actually needs."
            body="Contracts, product UI, and infrastructure — staffed as one team through Lootrushs."
            href="/services"
            action="All services"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="overflow-hidden rounded-2xl border border-line bg-card transition hover:-translate-y-0.5"
              >
                <ServiceVisual slug={service.slug} className="aspect-[16/10]" />
                <div className="p-6">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-gold">{service.stack}</span>
                  <h3 className="mt-3 font-display text-2xl">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{service.blurb}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-ink/80">
                    {service.items.slice(0, 3).map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-raised">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="Case studies"
            title="Client products we delivered."
            body="BrickFi and the rest of the bench are client work. We stay responsible for development, completion, and delivery."
            href="/work"
            action="View all work"
          />
          <article className="mt-10 overflow-hidden rounded-3xl border border-line bg-card lg:grid lg:grid-cols-2">
            <WorkVisual slug={featured.slug} className="aspect-[16/11] lg:min-h-full" />
            <div className="flex flex-col justify-center p-8 md:p-10">
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-line px-2.5 py-1 text-[11px] uppercase tracking-wide text-gold">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 font-display text-3xl md:text-4xl">{featured.name}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{featured.blurb}</p>
              <p className="mt-4 text-xs text-muted">{featured.chain}</p>
              <Link href={`/work/${featured.slug}`} className="mt-6 text-sm text-gold hover:text-gold-soft">
                Read the case study →
              </Link>
            </div>
          </article>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {rest.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="overflow-hidden rounded-2xl border border-line bg-card transition hover:-translate-y-0.5"
              >
                <WorkVisual slug={project.slug} className="aspect-[16/10]" />
                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{project.type}</p>
                  <h3 className="mt-3 font-display text-2xl">{project.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{project.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="How we work"
            title="From brief to a staffed, shipped product."
            href="/how-we-work"
            action="Full process"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.n} className="border-t border-gold/30 pt-6">
                <p className="font-display text-sm text-gold">{step.n}</p>
                <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-raised">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="Careers"
            title={`${jobs.length} seats we can staff now.`}
            body="We hire under our name, then match you to client work. After our process you may interview with the client."
            href="/careers"
            action="View open seats"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {jobs
              .filter((job) =>
                ["web3-designer", "senior-blockchain-developer", "product-manager-web3"].includes(job.slug),
              )
              .map((job) => (
                <Link
                  key={job.slug}
                  href={`/careers/${job.slug}`}
                  className="rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-0.5"
                >
                  <span className="text-[11px] uppercase tracking-[0.16em] text-gold">{job.department}</span>
                  <h3 className="mt-5 font-display text-2xl">{job.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{job.summary}</p>
                  <p className="mt-4 text-sm text-gold">{formatSalary(job.salary.min, job.salary.max)}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading eyebrow="FAQ" title="Straight answers before a call." />
          <div className="mt-10">
            <FaqList />
          </div>
        </div>
      </section>

      <CtaBand title="Tell us what you are building." action="Start a build" />
    </>
  );
}
