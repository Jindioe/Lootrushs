import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { SectionHeading } from "@/components/SectionHeading";
import { clientProcess, engagements, hiringSteps, media, principles, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How we work",
  description: `How ${site.name} scopes client builds, staffs developers, and delivers blockchain products.`,
};

export default function HowWeWorkPage() {
  return (
    <>
      <BrandHero
        eyebrow="How we work"
        title="The work starts before any contract."
        image={media.hero}
        imageAlt="A project conversation"
      >
        <p className="mt-5 max-w-2xl text-muted">
          Tell us what you are building. An engineer reads it before the call. You get a written
          plan: scope, who we would staff, and a first step — or a clear no.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-[#1a1406] hover:bg-gold-soft"
          >
            Send a brief
          </Link>
          <Link href="/careers" className="rounded-full border border-line px-6 py-3 text-sm text-ink hover:border-gold/40">
            Apply to the bench
          </Link>
        </div>
      </BrandHero>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="Engagement"
            title="Three ways clients work with us."
            body="Build, staff, or both. The product stays the client’s. People on the project work through Lootrushs."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {engagements.map((item) => (
              <article key={item.slug} className="rounded-2xl border border-line bg-card p-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold">{item.n}</p>
                <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
                <Link href={item.href} className="mt-6 inline-block text-sm text-gold hover:text-gold-soft">
                  {item.action} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-raised">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading eyebrow="For clients" title="From first message to a staffed bench." />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {clientProcess.map((step) => (
              <div key={step.n} className="border-t border-gold/30 pt-6">
                <p className="font-display text-sm text-gold">{step.n}</p>
                <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="For candidates"
            title="Apply to Lootrushs. Join a client project."
            body="Roles are posted under our name. A client can also introduce someone. After our hiring process you may interview with the client."
            href="/careers"
            action="Open roles"
          />
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
      </section>

      <section className="border-t border-line bg-raised">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading eyebrow="Principles" title="What we tell you straight." />
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
          <SectionHeading eyebrow="FAQ" title="Process questions." />
          <div className="mt-10">
            <FaqList />
          </div>
        </div>
      </section>

      <CtaBand title="Ready to describe the build?" action="Start a project" />
    </>
  );
}
