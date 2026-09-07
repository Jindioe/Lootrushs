export const applicationStatuses = [
  "new apply",
  "pending",
  "scheduled",
  "success",
  "failed",
] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];

export const DEFAULT_APPLICATION_STATUS: ApplicationStatus = "new apply";

export function isApplicationStatus(value: string): value is ApplicationStatus {
  return (applicationStatuses as readonly string[]).includes(value);
}

export function statusClass(status: ApplicationStatus) {
  switch (status) {
    case "new apply":
      return "text-gold";
    case "scheduled":
      return "text-gold-soft";
    case "success":
      return "text-ink";
    case "failed":
      return "text-ember";
    default:
      return "text-muted";
  }
}
