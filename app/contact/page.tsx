import type { Metadata } from "next";
import { BrandHero } from "@/components/BrandHero";
import { site, media } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a Web3 project with ${site.name}.`,
};

const fieldClass =
  "mt-2 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-ink outline-none focus:border-gold";

export default function ContactPage() {
  return (
    <>
      <BrandHero eyebrow="Contact" title="Start a build." image={media.contact} imageAlt="A project conversation">
        <p className="mt-5 max-w-md text-muted">
          New protocol, dApp, audit-ready rewrite, or a chain migration — send the brief. We reply
          with scope, timeline, and whether we are the right bench.
        </p>
      </BrandHero>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Direct</p>
          <a href={`mailto:${site.email}`} className="mt-3 block font-display text-2xl text-gold">
            {site.email}
          </a>
          <p className="mt-6 text-sm leading-6 text-muted">{site.location}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{site.domain}</p>
          <ul className="mt-10 space-y-3 text-sm leading-6 text-muted">
            <li>Typical reply within two business days</li>
            <li>NDA available before a detailed brief</li>
            <li>We say no if we are not the right team</li>
          </ul>
        </div>

        <form
          className="rounded-2xl border border-line bg-card p-6 md:p-8"
          action={`mailto:${site.email}`}
          method="post"
          encType="text/plain"
        >
          <p className="font-display text-2xl">Project brief</p>
          <label className="mt-6 block text-sm text-muted" htmlFor="name">
            Name
          </label>
          <input id="name" name="name" required className={fieldClass} />

          <label className="mt-5 block text-sm text-muted" htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" required className={fieldClass} />

          <label className="mt-5 block text-sm text-muted" htmlFor="topic">
            What do you need?
          </label>
          <select id="topic" name="topic" className={fieldClass}>
            <option>Smart contracts</option>
            <option>dApp / product UI</option>
            <option>DeFi protocol</option>
            <option>Real estate / RWA</option>
            <option>NFT / gaming</option>
            <option>Wallet / identity</option>
            <option>Infrastructure</option>
            <option>Something else</option>
          </select>

          <label className="mt-5 block text-sm text-muted" htmlFor="message">
            Tell us about the work
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Chain, product, timeline, and what already exists."
            className={`${fieldClass} resize-y`}
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-gold py-3 text-sm font-semibold text-[#1a1406] transition hover:bg-gold-soft"
          >
            Send brief
          </button>
        </form>
      </div>
    </>
  );
}
