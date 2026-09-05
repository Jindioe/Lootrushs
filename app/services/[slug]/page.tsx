import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandHero } from "@/components/BrandHero";
import { CtaBand } from "@/components/CtaBand";
import { ServiceVisual } from "@/components/ServiceVisual";
import { getService, projects, services } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return { title: service.name, description: service.blurb };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = projects.filter((project) => project.service === service.slug);

  return (
    <>
      <BrandHero eyebrow="Services" title={service.name} image={service.photo} imageAlt={service.name}>
        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-gold">{service.stack}</p>
        <p className="mt-5 max-w-2xl text-muted">{service.blurb}</p>
      </BrandHero>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Link href="/services" className="text-sm text-gold hover:text-gold-soft">
            ← All services
          </Link>
          <h2 className="mt-8 font-display text-3xl">What we ship in this area</h2>
          <ul className="mt-6 space-y-4">
            {service.items.map((item) => (
              <li key={item} className="border-t border-line pt-4 text-sm leading-7 text-muted">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-7 text-muted">
            Developers on this work are hired through Lootrushs. After our process they may
            interview with you, then join the project through us.
          </p>
        </div>
        <ServiceVisual slug={service.slug} className="aspect-[16/11] rounded-3xl border border-line" />
      </div>

      {related.length ? (
        <div className="border-t border-line bg-raised">
          <div className="mx-auto max-w-7xl px-5 py-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Related work</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="rounded-2xl border border-line bg-card p-6 hover:border-gold/35"
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{project.type}</p>
                  <h3 className="mt-3 font-display text-2xl">{project.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{project.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <CtaBand title={`Start a ${service.name.toLowerCase()} brief.`} action="Contact Lootrushs" />
    </>
  );
}
