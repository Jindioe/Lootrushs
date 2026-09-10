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
  location: string | null;
  linkedin: string | null;
  role: string;
  engagement: string | null;
  resume_stored_name: string | null;
  resume_original_name: string | null;
};

function formatWhen(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function AdminApplicationsBoard({
  initialApplications,
}: {
  initialApplications: AdminApplicationListItem[];
}) {
  const [rows, setRows] = useState(initialApplications);
  const [nameQuery, setNameQuery] = useState("");

  const filtered = useMemo(() => {
    const query = nameQuery.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) => row.full_name.toLowerCase().includes(query));
  }, [rows, nameQuery]);

  function setStatus(id: string, status: ApplicationStatus) {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, status } : row)));
  }

  if (rows.length === 0) {
    return (
      <p className="mt-12 rounded-2xl border border-line bg-card px-5 py-10 text-sm text-muted">
        No applications yet.
      </p>
    );
  }

  return (
    <>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <p className="text-sm text-muted">
          {filtered.length === rows.length
            ? `${rows.length} ${rows.length === 1 ? "application" : "applications"} in Firebase.`
            : `${filtered.length} of ${rows.length} applications`}
        </p>
        <label className="block min-w-[16rem] flex-1 sm:max-w-xs">
          <span className="sr-only">Filter by name</span>
          <input
            type="search"
            value={nameQuery}
            onChange={(event) => setNameQuery(event.target.value)}
            placeholder="Filter by name"
            className="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted focus:border-gold"
          />
        </label>
      </div>
      <div className="mt-6 rounded-2xl border border-line">
        <table className="w-full table-fixed text-left text-xs">
          <colgroup>
            <col className="w-[9%]" />
            <col className="w-[18%]" />
            <col className="w-[12%]" />
            <col className="w-[7%]" />
            <col className="w-[16%]" />
            <col className="w-[10%]" />
            <col className="w-[12%]" />
            <col className="w-[6%]" />
            <col className="w-[5%]" />
            <col className="w-[5%]" />
          </colgroup>
          <thead className="bg-raised text-[10px] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-2 py-2.5 font-medium">Submitted</th>
              <th className="px-2 py-2.5 font-medium">Applicant</th>
              <th className="px-2 py-2.5 font-medium">Location</th>
              <th className="px-2 py-2.5 font-medium">Links</th>
              <th className="px-2 py-2.5 font-medium">Role</th>
              <th className="px-2 py-2.5 font-medium">Engagement</th>
              <th className="px-2 py-2.5 font-medium">Status</th>
              <th className="px-2 py-2.5 font-medium">Resume</th>
              <th className="px-2 py-2.5 font-medium"> </th>
              <th className="px-2 py-2.5 font-medium"> </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr className="border-t border-line bg-card">
                <td colSpan={10} className="px-4 py-8 text-sm text-muted">
                  No applicants match “{nameQuery.trim()}”.
                </td>
              </tr>
            ) : (
              filtered.map((application) => (
              <tr key={application.id} className="border-t border-line bg-card align-top">
                <td className="px-2 py-2.5 text-muted whitespace-nowrap">{formatWhen(application.created_at)}</td>
                <td className="px-2 py-2.5">
                  <Link
                    href={`/admin/applications/${application.id}`}
                    className="block truncate font-medium text-ink hover:text-gold"
                    title={application.full_name}
                  >
                    {application.full_name}
                  </Link>
                  <a
                    href={`mailto:${application.email}`}
                    className="mt-0.5 block truncate text-muted hover:text-gold"
                    title={application.email}
                  >
                    {application.email}
                  </a>
                </td>
                <td className="px-2 py-2.5">
                  <span className="block truncate text-ink" title={application.location || undefined}>
                    {application.location || "—"}
                  </span>
                </td>
                <td className="px-2 py-2.5">
                  {application.linkedin ? (
                    <a
                      href={application.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gold hover:text-gold-soft"
                      title={application.linkedin}
                    >
                      LinkedIn
                    </a>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-2 py-2.5">
                  <span className="block truncate text-ink" title={application.role}>
                    {application.role}
                  </span>
                </td>
                <td className="px-2 py-2.5">
                  <span className="block truncate text-ink" title={application.engagement || undefined}>
                    {application.engagement || "—"}
                  </span>
                </td>
                <td className="px-2 py-2.5">
                  <ApplicationStatusSelect
                    id={application.id}
                    status={application.status || DEFAULT_APPLICATION_STATUS}
                    onChanged={(status) => setStatus(application.id, status)}
                  />
                </td>
                <td className="px-2 py-2.5">
                  {application.resume_stored_name ? (
                    <a
                      href={`/api/admin/resume/${application.id}`}
                      className="text-gold hover:text-gold-soft"
                      title={application.resume_original_name || "Download"}
                    >
                      CV
                    </a>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-2 py-2.5">
                  <Link
                    href={`/admin/applications/${application.id}`}
                    className="text-muted hover:text-gold"
                  >
                    Open
                  </Link>
                </td>
                <td className="px-2 py-2.5">
                  <ApplicationDeleteButton
                    id={application.id}
                    name={application.full_name}
                    onDeleted={() => setRows((current) => current.filter((row) => row.id !== application.id))}
                  />
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
