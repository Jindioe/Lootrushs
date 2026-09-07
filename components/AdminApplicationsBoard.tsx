"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ApplicationDeleteButton } from "@/components/ApplicationDeleteButton";
import { ApplicationStatusSelect } from "@/components/ApplicationStatusSelect";
import { DEFAULT_APPLICATION_STATUS, type ApplicationStatus } from "@/lib/application-status";

export type AdminApplicationListItem = {
  id: string;
  created_at: string;
  status: ApplicationStatus;
  full_name: string;
  email: string;
  linkedin: string | null;
  role: string;
  engagement: string | null;
  resume_stored_name: string | null;
  resume_original_name: string | null;
};

function formatWhen(value: string) {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function AdminApplicationsBoard({
  initialApplications,
}: {
  initialApplications: AdminApplicationListItem[];
}) {
  const [rows, setRows] = useState(initialApplications);
  const count = useMemo(() => rows.length, [rows]);

  function setStatus(id: string, status: ApplicationStatus) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status } : row)));
  }

  if (count === 0) {
    return (
      <p className="mt-12 rounded-2xl border border-line bg-card px-5 py-10 text-sm text-muted">
        No applications yet.
      </p>
    );
  }

  return (
    <>
      <p className="mt-3 text-sm text-muted">
        {count} {count === 1 ? "application" : "applications"} in Firebase.
      </p>
      <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[1080px] text-left text-sm">
          <thead className="bg-raised text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Submitted</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">LinkedIn</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Engagement</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Resume</th>
              <th className="px-4 py-3 font-medium"> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((application) => (
              <tr key={application.id} className="border-t border-line bg-card">
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
                <td className="px-4 py-3">{application.engagement || "—"}</td>
                <td className="px-4 py-3">
                  <ApplicationStatusSelect
                    id={application.id}
                    status={application.status || DEFAULT_APPLICATION_STATUS}
                    onChanged={(status) => setStatus(application.id, status)}
                  />
                </td>
                <td className="px-4 py-3">
                  {application.resume_stored_name ? (
                    <a href={`/api/admin/resume/${application.id}`} className="text-gold hover:text-gold-soft">
                      {application.resume_original_name || "Download"}
                    </a>
                  ) : (
                    <span className="text-muted">None</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <ApplicationDeleteButton
                    id={application.id}
                    name={application.full_name}
                    onDeleted={() => setRows((current) => current.filter((row) => row.id !== application.id))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
