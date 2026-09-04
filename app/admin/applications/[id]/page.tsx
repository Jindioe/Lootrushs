import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { getApplication } from "@/lib/backend";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Application",
  robots: { index: false, follow: false },
};

function formatWhen(value: Date | string) {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function AdminApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id?.trim();
  if (!id) notFound();
  const application = await getApplication(id);
  if (!application) notFound();

  const links = [
    ["LinkedIn", application.linkedin],
    ["GitHub", application.github],
    ["Portfolio", application.portfolio],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/admin" className="text-sm text-gold hover:text-gold-soft">
          ← All applications
        </Link>
        <AdminLogoutButton />
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
        Application {application.id.slice(0, 8)}
      </p>
      <h1 className="mt-3 font-display text-4xl">{application.full_name}</h1>
      <p className="mt-3 text-muted">
        {application.role}
        {application.location ? ` · ${application.location}` : ""}
      </p>
      <p className="mt-2 text-sm text-muted">{formatWhen(application.created_at)}</p>

      <dl className="mt-10 space-y-5 rounded-2xl border border-line bg-card p-6 text-sm">
        <div>
          <dt className="text-muted">Email</dt>
          <dd className="mt-1">
            <a href={`mailto:${application.email}`} className="text-gold hover:text-gold-soft">
              {application.email}
            </a>
          </dd>
        </div>
        {links.map(([label, href]) => (
          <div key={label}>
            <dt className="text-muted">{label}</dt>
            <dd className="mt-1 break-all">
              <a href={href} className="text-gold hover:text-gold-soft" target="_blank" rel="noreferrer">
                {href}
              </a>
            </dd>
          </div>
        ))}
        <div>
          <dt className="text-muted">Resume</dt>
          <dd className="mt-1">
            {application.resume_stored_name ? (
              <a href={`/api/admin/resume/${application.id}`} className="text-gold hover:text-gold-soft">
                {application.resume_original_name || "Download resume"}
                {application.resume_size ? ` · ${formatSize(application.resume_size)}` : ""}
              </a>
            ) : (
              "None"
            )}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Message</dt>
          <dd className="mt-2 whitespace-pre-wrap leading-7 text-ink">{application.message}</dd>
        </div>
      </dl>
    </div>
  );
}
