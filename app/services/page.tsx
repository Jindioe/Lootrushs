import type { Metadata } from "next";
import { BrandHero } from "@/components/BrandHero";
import { CtaBand } from "@/components/CtaBand";
import { ServiceVisual } from "@/components/ServiceVisual";
import { media, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Web3 and blockchain development services from ${site.name}.`,
};

export default function ServicesPage() {
  return (
    <>
      <BrandHero
        eyebrow="Services"
        title="Engineering for every layer of a Web3 product."
        image={media.hero}
        imageAlt="Engineers collaborating"
      >
        <p className="mt-5 max-w-xl text-muted">
          From first contract to production dApp, {site.name} covers the stack founders usually
          stitch together across three vendors.
        </p>
      </BrandHero>

      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.slug} className="overflow-hidden rounded-2xl border border-line bg-card">
              <ServiceVisual slug={service.slug} className="aspect-[16/9]" />
              <div className="p-6 md:p-8">
                <span className="text-xs uppercase tracking-[0.16em] text-gold">{service.stack}</span>
                <h2 className="mt-4 font-display text-3xl">{service.name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{service.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CtaBand
        title="Need a mix of all of this?"
        body="Most of our work is a protocol plus a product surface. We staff contracts, indexers, and frontend as one team."
        action="Talk about a build"
      />
    </>
  );
}
