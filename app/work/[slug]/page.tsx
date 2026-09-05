import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandHero } from "@/components/BrandHero";
import { CtaBand } from "@/components/CtaBand";
import { WorkVisual } from "@/components/WorkVisual";
import { getProject, getService, projects } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return { title: project.name, description: project.blurb };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const service = getService(project.service);
  const others = projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <>
      <BrandHero eyebrow={project.type} title={project.name} image={project.photo} imageAlt={project.name}>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-2.5 py-1 text-[11px] uppercase tracking-wide text-gold">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-5 max-w-2xl text-muted">{project.blurb}</p>
      </BrandHero>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <article>
          <Link href="/work" className="text-sm text-gold hover:text-gold-soft">
            ← All case studies
          </Link>
          <h2 className="mt-8 font-display text-3xl">The brief</h2>
          <p className="mt-4 text-base leading-8 text-muted">{project.challenge}</p>
          <h2 className="mt-12 font-display text-3xl">What Lootrushs delivered</h2>
          <ul className="mt-6 space-y-3">
            {project.delivered.map((item) => (
              <li key={item} className="border-t border-line pt-3 text-sm leading-7 text-muted">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-7 text-muted">
            This is a client product. Lootrushs was responsible for development, completion, and
            delivery. People on the project worked through Lootrushs.
          </p>
        </article>
        <aside className="space-y-6">
          <WorkVisual slug={project.slug} className="aspect-[16/11] rounded-3xl border border-line" />
          <div className="rounded-2xl border border-line bg-card p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold">Stack</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-line px-3 py-1 text-sm">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-xs uppercase tracking-wide text-muted">Networks</p>
            <p className="mt-1 text-sm text-ink">{project.chain}</p>
            {service ? (
              <Link href={`/services/${service.slug}`} className="mt-6 inline-block text-sm text-gold hover:text-gold-soft">
                {service.name} capability →
              </Link>
            ) : null}
          </div>
        </aside>
      </div>

      <div className="border-t border-line bg-raised">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">More work</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {others.map((item) => (
              <Link key={item.slug} href={`/work/${item.slug}`} className="rounded-2xl border border-line bg-card p-6 hover:border-gold/35">
                <p className="text-[11px] uppercase tracking-[0.16em] text-gold">{item.type}</p>
                <h3 className="mt-3 font-display text-2xl">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CtaBand title="Need a similar build?" action="Start a brief" />
    </>
  );
}
