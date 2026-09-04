import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrandHero } from "@/components/BrandHero";
import { JobBoard } from "@/components/JobBoard";
import { jobs, departments } from "@/lib/jobs";
import { media, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: `Open Web3 jobs at ${site.name}. Design, engineering, product, and leadership roles — apply on ${site.domain}.`,
};

export default function CareersPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src={media.careers}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/55 via-bg/78 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-bg/40 to-bg/25" />
      </div>

      <BrandHero plain eyebrow="Careers" title="We're hiring.">
        <p className="mt-5 max-w-2xl text-muted">
          {jobs.length} open roles. Mid, senior, staff, lead, and executive. Base pay is listed on
          every posting, plus token or equity. Apply with a resume. Applications stay private.
        </p>
        <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8">
          <div>
            <dt className="font-display text-3xl text-gold">{jobs.length}</dt>
            <dd className="mt-1 text-xs uppercase tracking-wide text-muted">open postings</dd>
          </div>
          <div>
            <dt className="font-display text-3xl text-gold">{departments.length}</dt>
            <dd className="mt-1 text-xs uppercase tracking-wide text-muted">departments</dd>
          </div>
          <div>
            <dt className="font-display text-3xl text-gold">Remote</dt>
            <dd className="mt-1 text-xs uppercase tracking-wide text-muted">all roles</dd>
          </div>
        </dl>
      </BrandHero>

      <div className="relative mx-auto max-w-6xl px-5 py-16">
        <JobBoard />

        <div className="mt-12 rounded-3xl border border-line bg-raised/90 p-8 backdrop-blur-sm md:flex md:items-center md:justify-between md:gap-10 md:p-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">Don&apos;t see your role?</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              We still want specialists we have not named. Submit an open application with your resume.
            </p>
          </div>
          <Link
            href="/careers/apply"
            className="mt-6 inline-flex shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-[#1a1406] hover:bg-gold-soft md:mt-0"
          >
            Send an open application
          </Link>
        </div>
      </div>
    </div>
  );
}
