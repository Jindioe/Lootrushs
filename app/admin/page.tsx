import type { Metadata } from "next";
import { AdminApplicationsBoard } from "@/components/AdminApplicationsBoard";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { DEFAULT_APPLICATION_STATUS } from "@/lib/application-status";
import { listApplications } from "@/lib/backend";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Applications",
  robots: { index: false, follow: false },
};

export default async function AdminApplicationsPage() {
  let applications: Awaited<ReturnType<typeof listApplications>> = [];
  let firestoreError = "";
  try {
    applications = await listApplications();
  } catch (error) {
    firestoreError = error instanceof Error ? error.message : "Could not open Firestore.";
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Admin</p>
          <h1 className="mt-3 font-display text-4xl">Applications</h1>
        </div>
        <AdminLogoutButton />
      </div>

      {firestoreError ? (
        <div className="mt-10 rounded-2xl border border-ember/40 bg-card p-6 text-sm leading-7 text-muted">
          <p className="font-semibold text-ember">Firestore is not connected.</p>
          <p className="mt-3">{firestoreError}</p>
          <p className="mt-3">
            Local: put the same three values you use on Vercel into{" "}
            <code className="text-ink">.env.local</code>, then restart{" "}
            <code className="text-ink">npm run dev</code>. Production: Vercel → Project → Settings
            → Environment Variables, then redeploy.
          </p>
        </div>
      ) : (
        <AdminApplicationsBoard
          initialApplications={applications.map((application) => ({
            id: application.id,
            created_at:
              application.created_at instanceof Date
                ? application.created_at.toISOString()
                : String(application.created_at),
            status: application.status || DEFAULT_APPLICATION_STATUS,
            full_name: application.full_name,
            email: application.email,
            linkedin: application.linkedin,
            role: application.role,
            engagement: application.engagement,
            resume_stored_name: application.resume_stored_name,
            resume_original_name: application.resume_original_name,
          }))}
        />
      )}
    </div>
  );
}
