import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { CtaBand } from "@/components/CtaBand";
import { JumpNav } from "@/components/JumpNav";
import { ServiceVisual } from "@/components/ServiceVisual";
import { media, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Web3 product development and specialized teams from ${site.name}.`,
};

export default function ServicesPage() {
  return (
    <>
      <BrandHero
        eyebrow="Services"
        title="Every layer of a Web3 product, plus the team that ships it."
        image={media.hero}
        imageAlt="Engineers collaborating"
      >
        <p className="mt-5 max-w-2xl text-muted">
          Route by capability. Each page has the engineering detail, related case studies, and a way
          to start. People on the work are hired through {site.name}.
        </p>
      </BrandHero>

      <div className="border-t border-line bg-raised">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <JumpNav
            items={services.map((service) => ({
              href: `#${service.slug}`,
              label: service.name,
              count: service.items.length,
            }))}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-5 py-16">
        {services.map((service, index) => (
          <article
            id={service.slug}
            key={service.slug}
            className="scroll-mt-24 overflow-hidden rounded-3xl border border-line bg-card lg:grid lg:grid-cols-[0.9fr_1.1fr]"
          >
            <ServiceVisual slug={service.slug} className="aspect-[16/10] lg:min-h-full" />
            <div className="p-6 md:p-10">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gold">
                {String(index + 1).padStart(2, "0")} · {service.stack}
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">{service.name}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{service.blurb}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {service.items.map((item) => (
                  <li key={item} className="border-t border-line pt-3 text-sm leading-6 text-ink/90">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={`/services/${service.slug}`} className="text-sm text-gold hover:text-gold-soft">
                  Capability detail →
                </Link>
                <Link href="/contact" className="text-sm text-muted hover:text-gold">
                  Start this work
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <CtaBand
        title="Need a mix of all of this?"
        body="Most client work is a protocol plus a product surface. We hire through Lootrushs and staff contracts, indexers, and frontend as one team."
        action="Talk about a build"
      />
    </>
  );
}
