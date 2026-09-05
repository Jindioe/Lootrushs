import "server-only";
import { firestore } from "./firebase";
import type { DocumentData, Timestamp } from "firebase-admin/firestore";

export const APPLICATIONS_COLLECTION = "applications";

export type ApplicationRow = {
  id: string;
  created_at: Date;
  role: string;
  role_slug: string | null;
  engagement: string | null;
  full_name: string;
  email: string;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
  message: string;
  resume_original_name: string | null;
  resume_stored_name: string | null;
  resume_mime: string | null;
  resume_size: number | null;
  resume_path: string | null;
};

function asDate(value: unknown) {
  if (value instanceof Date) return value;
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as Timestamp).toDate();
  }
  return new Date();
}

function asString(value: unknown) {
  return typeof value === "string" && value.length ? value : null;
}

function fromDoc(id: string, data: DocumentData): ApplicationRow {
  return {
    id,
    created_at: asDate(data.created_at),
    role: typeof data.role === "string" ? data.role : "",
    role_slug: asString(data.role_slug),
    engagement: asString(data.engagement),
    full_name: typeof data.full_name === "string" ? data.full_name : "",
    email: typeof data.email === "string" ? data.email : "",
    location: asString(data.location),
    linkedin: asString(data.linkedin),
    github: asString(data.github),
    portfolio: asString(data.portfolio),
    message: typeof data.message === "string" ? data.message : "",
    resume_original_name: asString(data.resume_original_name),
    resume_stored_name: asString(data.resume_stored_name),
    resume_mime: asString(data.resume_mime),
    resume_size: typeof data.resume_size === "number" ? data.resume_size : null,
    resume_path: asString(data.resume_path),
  };
}

export async function insertApplication(input: {
  role: string;
  roleSlug: string | null;
  engagement: string | null;
  fullName: string;
  email: string;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
  message: string;
  resumeOriginalName: string | null;
  resumeStoredName: string | null;
  resumeMime: string | null;
  resumeSize: number | null;
  resumePath: string | null;
}): Promise<ApplicationRow> {
  const createdAt = new Date();
  const doc = {
    created_at: createdAt,
    role: input.role,
    role_slug: input.roleSlug,
    engagement: input.engagement,
    full_name: input.fullName,
    email: input.email,
    location: input.location,
    linkedin: input.linkedin,
    github: input.github,
    portfolio: input.portfolio,
    message: input.message,
    resume_original_name: input.resumeOriginalName,
    resume_stored_name: input.resumeStoredName,
    resume_mime: input.resumeMime,
    resume_size: input.resumeSize,
    resume_path: input.resumePath,
  };
  const ref = await (await firestore()).collection(APPLICATIONS_COLLECTION).add(doc);
  return fromDoc(ref.id, doc);
}

export async function listApplications(): Promise<ApplicationRow[]> {
  const snap = await (await firestore()).collection(APPLICATIONS_COLLECTION).orderBy("created_at", "desc").get();
  return snap.docs.map((item) => fromDoc(item.id, item.data()));
}

export async function getApplication(id: string): Promise<ApplicationRow | null> {
  if (!id) return null;
  const snap = await (await firestore()).collection(APPLICATIONS_COLLECTION).doc(id).get();
  if (!snap.exists) return null;
  return fromDoc(snap.id, snap.data() ?? {});
}
