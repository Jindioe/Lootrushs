import type { Metadata } from "next";
import Link from "next/link";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { listApplications } from "@/lib/backend";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Applications",
  robots: { index: false, follow: false },
};

function formatWhen(value: Date | string) {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminApplicationsPage() {
  const applications = await listApplications();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Admin</p>
          <h1 className="mt-3 font-display text-4xl">Applications</h1>
          <p className="mt-3 text-sm text-muted">
            {applications.length} {applications.length === 1 ? "application" : "applications"} in
            Firebase.
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      {applications.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-line bg-card px-5 py-10 text-sm text-muted">
          No applications yet.
        </p>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[840px] text-left text-sm">
            <thead className="bg-raised text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">LinkedIn</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} className="border-t border-line bg-card">
                  <td className="px-4 py-3 text-muted">{application.id}</td>
                  <td className="px-4 py-3 text-muted">{formatWhen(application.created_at)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/applications/${application.id}`} className="text-ink hover:text-gold">
                      {application.full_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${application.email}`} className="text-ink hover:text-gold">
                      {application.email}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    {application.linkedin ? (
                      <a
                        href={application.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-gold hover:text-gold-soft"
                      >
                        {application.linkedin}
                      </a>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{application.role}</td>
                  <td className="px-4 py-3">
                    {application.resume_stored_name ? (
                      <a href={`/api/admin/resume/${application.id}`} className="text-gold hover:text-gold-soft">
                        {application.resume_original_name || "Download"}
                      </a>
                    ) : (
                      <span className="text-muted">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
