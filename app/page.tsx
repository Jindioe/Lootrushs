import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ServiceVisual } from "@/components/ServiceVisual";
import { WorkVisual } from "@/components/WorkVisual";
import { formatSalary, jobs } from "@/lib/jobs";
import { chains, media, processSteps, projects, services, site, values } from "@/lib/site";

export default function HomePage() {
  const featured = projects[0];
  const rest = projects.slice(1, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image src={media.hero} alt="Lootrushs engineering bench" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
          <p className="rise text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Web3 development and talent · {site.location}
          </p>
          <h1 className="rise rise-d1 mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Client products.
            <span className="gold-text"> Built and staffed.</span>
          </h1>
          <p className="rise rise-d2 mt-6 max-w-xl text-lg leading-8 text-muted">
            {site.name} builds blockchain products for Web3 companies and hires the developers who
            do that work. You work through Lootrushs. The product belongs to the client.
          </p>
          <div className="rise rise-d3 mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-[#1a1406] transition hover:bg-gold-soft"
            >
              See our work
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-line bg-bg/40 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition hover:border-gold/40 hover:text-gold"
            >
              Start a project
            </Link>
          </div>
          <dl className="rise rise-d4 mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8">
            {[
              ["Build", "client products"],
              ["Hire", "Web3 talent"],
              ["8", "chains we ship on"],
            ].map(([stat, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl text-gold">{stat}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wide text-muted">{label}</dd>
              </div>
            ))}
          </dl>
          </div>
          <WorkVisual slug="brickfi" className="aspect-[4/3] rounded-3xl border border-line" />
        </div>
      </section>

      <section className="border-t border-line bg-raised">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            Chains we build on
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {chains.map((chain) => (
              <span key={chain} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink/90">
                {chain}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Services</p>
              <h2 className="mt-3 max-w-lg font-display text-3xl md:text-4xl">
                Blockchain software, plus the team to ship it.
              </h2>
            </div>
            <Link href="/services" className="hidden text-sm text-gold hover:text-gold-soft md:inline">
              All services →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.slice(0, 3).map((service) => (
              <article key={service.slug} className="overflow-hidden rounded-2xl border border-line bg-card transition hover:-translate-y-0.5">
                <ServiceVisual slug={service.slug} className="aspect-[16/10]" />
                <div className="p-6">
                  <span className="text-xs uppercase tracking-[0.16em] text-gold">{service.stack}</span>
                  <h3 className="mt-3 font-display text-2xl">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{service.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-raised">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Selected work</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">Client products we delivered.</h2>
            </div>
            <Link href="/work" className="hidden text-sm text-gold hover:text-gold-soft md:inline">
              View all work →
            </Link>
          </div>

          <article className="mt-10 overflow-hidden rounded-3xl border border-line bg-card md:grid md:grid-cols-2">
            <WorkVisual slug={featured.slug} className="aspect-[16/11] md:min-h-full" />
            <div className="flex flex-col justify-center p-8 md:p-10">
              <span className="text-xs uppercase tracking-[0.16em] text-gold">{featured.type}</span>
              <h3 className="mt-3 font-display text-3xl md:text-4xl">{featured.name}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{featured.blurb}</p>
              <p className="mt-4 text-xs text-muted">{featured.chain}</p>
              <Link href="/work" className="mt-6 text-sm text-gold hover:text-gold-soft">
                See the work →
              </Link>
            </div>
          </article>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {rest.map((project) => (
              <article key={project.slug} className="overflow-hidden rounded-2xl border border-line bg-card">
                <WorkVisual slug={project.slug} className="aspect-[16/9]" />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.16em] text-gold">{project.type}</span>
                    <span className="text-xs text-muted">{project.chain}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl">{project.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{project.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">How we work</p>
          <h2 className="mt-3 max-w-lg font-display text-3xl md:text-4xl">
            A path from brief to a staffed, shipped product.
          </h2>
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
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
          <WorkVisual slug="vaultlayer" className="aspect-[4/3] rounded-3xl border border-line" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Company</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Why clients work with Lootrushs.</h2>
            <div className="mt-8 space-y-5">
              {values.slice(0, 3).map((value) => (
                <div key={value.title}>
                  <h3 className="font-display text-xl text-gold-soft">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{value.body}</p>
                </div>
              ))}
            </div>
            <Link href="/about" className="mt-8 inline-block text-sm text-gold hover:text-gold-soft">
              About the company →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Careers</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">{jobs.length} roles, posted by Lootrushs.</h2>
            </div>
            <Link href="/careers" className="hidden text-sm text-gold hover:text-gold-soft md:inline">
              View all jobs →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {jobs
              .filter((job) =>
                ["web3-designer", "senior-blockchain-developer", "cto"].includes(job.slug),
              )
              .map((job) => (
                <Link
                  key={job.slug}
                  href={`/careers/${job.slug}`}
                  className="rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-0.5"
                >
                  <span className="text-xs uppercase tracking-[0.16em] text-gold">{job.department}</span>
                  <h3 className="mt-5 font-display text-2xl">{job.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{job.summary}</p>
                  <p className="mt-4 text-sm text-gold">{formatSalary(job.salary.min, job.salary.max)}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
