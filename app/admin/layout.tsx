import { AdminNewApplyAlerts } from "@/components/AdminNewApplyAlerts";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNewApplyAlerts />
      {children}
    </>
  );
}
