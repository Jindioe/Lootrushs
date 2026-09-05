import { site } from "@/lib/site";

const fieldClass =
  "mt-2 w-full rounded-lg border border-line bg-bg px-3 py-2.5 text-ink outline-none focus:border-gold";

export function ContactForm() {
  return (
    <form
      className="rounded-2xl border border-line bg-card p-6 md:p-8"
      action={`mailto:${site.email}`}
      method="post"
      encType="text/plain"
    >
      <p className="font-display text-2xl">Project brief</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        Tell us what you are building. A repo or product link helps. A clear description is enough.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm text-muted" htmlFor="name">
          Name
          <input id="name" name="name" required className={fieldClass} />
        </label>
        <label className="block text-sm text-muted" htmlFor="email">
          Email
          <input id="email" name="email" type="email" required className={fieldClass} />
        </label>
      </div>

      <label className="mt-5 block text-sm text-muted" htmlFor="company">
        Company
        <input id="company" name="company" className={fieldClass} />
      </label>

      <label className="mt-5 block text-sm text-muted" htmlFor="topic">
        What do you need?
        <select id="topic" name="topic" className={fieldClass}>
          <option>Build a product</option>
          <option>Staff a development team</option>
          <option>Build and staff</option>
          <option>Smart contracts</option>
          <option>dApp / product UI</option>
          <option>DeFi protocol</option>
          <option>Real estate / RWA</option>
          <option>NFT / gaming</option>
          <option>Wallet / identity</option>
          <option>Infrastructure</option>
          <option>Introduce a candidate</option>
          <option>Something else</option>
        </select>
      </label>

      <label className="mt-5 block text-sm text-muted" htmlFor="link">
        Repo, demo, or product site
        <input id="link" name="link" type="url" placeholder="https://" className={fieldClass} />
      </label>

      <label className="mt-5 block text-sm text-muted" htmlFor="message">
        Tell us about the work
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Chain, product, timeline, what already exists, and the date you cannot miss."
          className={`${fieldClass} resize-y`}
        />
      </label>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-gold py-3 text-sm font-semibold text-[#1a1406] transition hover:bg-gold-soft"
      >
        Send brief
      </button>
    </form>
  );
}
