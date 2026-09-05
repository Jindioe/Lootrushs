import type { Metadata } from "next";
import { BrandHero } from "@/components/BrandHero";
import { ContactForm } from "@/components/ContactForm";
import { FaqList } from "@/components/FaqList";
import { SectionHeading } from "@/components/SectionHeading";
import { clientProcess, media, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a Web3 build or staff a development team with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <BrandHero eyebrow="Contact" title="Tell us what you are building." image={media.contact} imageAlt="A project conversation">
        <p className="mt-5 max-w-xl text-muted">
          New protocol, dApp, RWA platform, or a team you need staffed through Lootrushs. We reply
          within two business days with scope, whether we can staff it, and a first step.
        </p>
      </BrandHero>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Direct</p>
          <a href={`mailto:${site.email}`} className="mt-3 block font-display text-2xl text-gold md:text-3xl">
            {site.email}
          </a>
          <p className="mt-6 text-sm leading-6 text-muted">{site.location}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{site.domain}</p>
          <ul className="mt-10 space-y-4 text-sm leading-6 text-muted">
            <li>Typical reply within two business days</li>
            <li>NDA available before a detailed brief</li>
            <li>An engineer reads what you send before we get on a call</li>
            <li>We say no if we are not the right team</li>
          </ul>
          <div className="mt-10 space-y-5 border-t border-line pt-8">
            {clientProcess.slice(0, 4).map((step) => (
              <div key={step.n}>
                <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{step.n}</p>
                <p className="mt-1 font-display text-xl">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>

      <section className="border-t border-line bg-raised">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <SectionHeading eyebrow="FAQ" title="Before you write." />
          <div className="mt-10">
            <FaqList />
          </div>
        </div>
      </section>
    </>
  );
}
