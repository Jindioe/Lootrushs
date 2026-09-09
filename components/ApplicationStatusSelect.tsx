"use client";

import { useState } from "react";
import { applicationStatuses, statusClass, type ApplicationStatus } from "@/lib/application-status";

const selectClass =
  "w-full max-w-[8.5rem] rounded-md border border-line bg-bg px-1.5 py-1 text-xs outline-none transition focus:border-gold";

export function ApplicationStatusSelect({
  id,
  status,
  onChanged,
}: {
  id: string;
  status: ApplicationStatus;
  onChanged?: (status: ApplicationStatus) => void;
}) {
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);

  async function onChange(next: ApplicationStatus) {
    const previous = value;
    setValue(next);
    onChanged?.(next);
    setSaving(true);
    const response = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setSaving(false);
    if (!response.ok) {
      setValue(previous);
      onChanged?.(previous);
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      window.alert(payload.error || "Could not update status.");
    }
  }

  return (
    <select
      aria-label="Application status"
      className={`${selectClass} ${statusClass(value)}`}
      value={value}
      disabled={saving}
      onChange={(event) => onChange(event.target.value as ApplicationStatus)}
    >
      {applicationStatuses.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
