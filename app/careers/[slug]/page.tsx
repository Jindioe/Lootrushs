import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/ApplyForm";
import { BrandHero } from "@/components/BrandHero";
import { advisoryNote, equityNote, getJob, hiringNote, jobComp, jobs, partTimeNote } from "@/lib/jobs";
import { media, site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Role" };
  return {
    title: job.title,
    description: `${job.title} at ${site.name} — ${job.summary}`,
  };
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();
  const comp = jobComp(job.salary);

  return (
    <>
      <BrandHero
        eyebrow={job.department}
        title={job.title}
        image={media.careers}
        imageAlt="Lootrushs engineering team"
      >
        <p className="mt-5 max-w-2xl text-muted">{job.summary}</p>
      </BrandHero>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.15fr_0.85fr]">
      <article>
        <Link href="/careers" className="text-sm text-gold hover:text-gold-soft">
          ← All roles
        </Link>
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          {job.engagements.map((item) => (
            <span key={item} className="rounded-full border border-line px-2.5 py-1 text-gold">
              {item}
            </span>
          ))}
          <span className="rounded-full border border-line px-2.5 py-1 text-muted">{job.level}</span>
          <span className="rounded-full border border-line px-2.5 py-1 text-muted">{job.location}</span>
          <span className="rounded-full border border-line px-2.5 py-1 text-gold">{job.stack}</span>
        </div>
        <div className="mt-8 rounded-2xl border border-line bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Compensation</p>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-muted">Full-time</dt>
              <dd className="mt-1 font-display text-2xl text-ink">
                {comp.fullTime} <span className="text-lg text-muted">/ year</span>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-muted">Part-time</dt>
              <dd className="mt-1 font-display text-2xl text-ink">
                {comp.partTime} <span className="text-lg text-muted">· 15–25 hrs / week</span>
              </dd>
              <p className="mt-1 text-sm leading-6 text-muted">{partTimeNote}</p>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-muted">Advisory</dt>
              <dd className="mt-1 font-display text-2xl text-ink">
                {comp.advisory} <span className="text-lg text-muted">· 1–4 days / month</span>
              </dd>
              <p className="mt-1 text-sm leading-6 text-muted">{advisoryNote}</p>
            </div>
          </dl>
          <p className="mt-5 text-sm leading-6 text-muted">{equityNote}</p>
        </div>
        <p className="mt-8 text-lg leading-8 text-muted">{job.summary}</p>
        <p className="mt-5 whitespace-pre-line text-base leading-8 text-muted">{job.about}</p>
        <div className="mt-8 rounded-2xl border border-line bg-raised p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">How hiring works</p>
          <p className="mt-3 text-sm leading-6 text-muted">{hiringNote}</p>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl">What you will do</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl">What you bring</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl">Nice to have</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {job.niceToHave.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </article>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <ApplyForm role={job.title} roleSlug={job.slug} engagements={job.engagements} />
      </aside>
    </div>
    </>
  );
}
