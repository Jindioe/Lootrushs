"use client";

import { useRouter } from "next/navigation";

export function ApplicationDeleteButton({
  id,
  name,
  redirectTo,
  onDeleted,
}: {
  id: string;
  name: string;
  redirectTo?: string;
  onDeleted?: () => void;
}) {
  const router = useRouter();

  async function onDelete() {
    const ok = window.confirm(`Delete ${name}'s application? This cannot be undone.`);
    if (!ok) return;
    const response = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      window.alert(payload.error || "Could not delete this application.");
      return;
    }
    onDeleted?.();
    if (redirectTo) {
      router.replace(redirectTo);
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      className="text-xs text-ember hover:text-gold"
    >
      Delete
    </button>
  );
}
