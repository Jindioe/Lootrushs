import "server-only";
import { runFirestore } from "./firebase";
import type { DocumentData, Timestamp } from "firebase-admin/firestore";
import {
  DEFAULT_APPLICATION_STATUS,
  isApplicationStatus,
  type ApplicationStatus,
} from "@/lib/application-status";

export const APPLICATIONS_COLLECTION = "applications";

/** Keep admin list reads down on the free 50k/day cap. */
const LIST_CACHE_TTL_MS = 3 * 60 * 1000;

export type ApplicationRow = {
  id: string;
  created_at: Date;
  status: ApplicationStatus;
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

export type ApplicationLatest = {
  id: string;
  created_at: Date;
  full_name: string;
  role: string;
};

type ListCache = {
  expiresAt: number;
  rows: ApplicationRow[];
};

const globalCache = globalThis as typeof globalThis & {
  lootrushsApplicationListCache?: ListCache;
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
    status: isApplicationStatus(typeof data.status === "string" ? data.status : "")
      ? (data.status as ApplicationStatus)
      : DEFAULT_APPLICATION_STATUS,
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

function invalidateListCache() {
  globalCache.lootrushsApplicationListCache = undefined;
}

function setListCache(rows: ApplicationRow[]) {
  globalCache.lootrushsApplicationListCache = {
    expiresAt: Date.now() + LIST_CACHE_TTL_MS,
    rows,
  };
}

function readListCache() {
  const cache = globalCache.lootrushsApplicationListCache;
  if (!cache) return null;
  if (Date.now() > cache.expiresAt) {
    globalCache.lootrushsApplicationListCache = undefined;
    return null;
  }
  return cache.rows;
}

function patchListCache(mutator: (rows: ApplicationRow[]) => ApplicationRow[]) {
  const cache = globalCache.lootrushsApplicationListCache;
  if (!cache) return;
  cache.rows = mutator(cache.rows);
  cache.expiresAt = Date.now() + LIST_CACHE_TTL_MS;
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
    status: DEFAULT_APPLICATION_STATUS,
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
  const ref = await runFirestore((db) => db.collection(APPLICATIONS_COLLECTION).add(doc));
  const row = fromDoc(ref.id, doc);
  patchListCache((rows) => [row, ...rows]);
  return row;
}

export async function listApplications(options?: {
  bypassCache?: boolean;
}): Promise<ApplicationRow[]> {
  if (!options?.bypassCache) {
    const cached = readListCache();
    if (cached) return cached;
  }

  const snap = await runFirestore((db) =>
    db.collection(APPLICATIONS_COLLECTION).orderBy("created_at", "desc").get(),
  );
  const rows = snap.docs.map((item) => fromDoc(item.id, item.data()));
  setListCache(rows);
  return rows;
}

/** One document read — for new-apply alerts without listing the whole collection. */
export async function getLatestApplication(): Promise<ApplicationLatest | null> {
  const snap = await runFirestore((db) =>
    db.collection(APPLICATIONS_COLLECTION).orderBy("created_at", "desc").limit(1).get(),
  );
  const doc = snap.docs[0];
  if (!doc) return null;
  const data = doc.data();
  return {
    id: doc.id,
    created_at: asDate(data.created_at),
    full_name: typeof data.full_name === "string" ? data.full_name : "",
    role: typeof data.role === "string" ? data.role : "",
  };
}

export async function getApplication(id: string): Promise<ApplicationRow | null> {
  if (!id) return null;
  const cached = readListCache()?.find((row) => row.id === id);
  if (cached) return cached;

  const snap = await runFirestore((db) => db.collection(APPLICATIONS_COLLECTION).doc(id).get());
  if (!snap.exists) return null;
  return fromDoc(snap.id, snap.data() ?? {});
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
): Promise<ApplicationRow | null> {
  if (!id) return null;
  return runFirestore(async (db) => {
    const ref = db.collection(APPLICATIONS_COLLECTION).doc(id);
    // Prefer cache for the returned row so we do not spend an extra read.
    const cached = readListCache()?.find((row) => row.id === id);
    try {
      await ref.update({ status });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (/NOT_FOUND|No document to update/i.test(message)) return null;
      throw error;
    }
    if (cached) {
      const next = { ...cached, status };
      patchListCache((rows) => rows.map((row) => (row.id === id ? next : row)));
      return next;
    }
    const snap = await ref.get();
    if (!snap.exists) return null;
    return fromDoc(ref.id, { ...snap.data(), status });
  });
}

export async function deleteApplication(id: string): Promise<ApplicationRow | null> {
  if (!id) return null;
  return runFirestore(async (db) => {
    const ref = db.collection(APPLICATIONS_COLLECTION).doc(id);
    const cached = readListCache()?.find((row) => row.id === id);
    let row = cached ?? null;
    if (!row) {
      const snap = await ref.get();
      if (!snap.exists) return null;
      row = fromDoc(ref.id, snap.data() ?? {});
    }
    await ref.delete();
    patchListCache((rows) => rows.filter((item) => item.id !== id));
    return row;
  });
}

export function clearApplicationListCache() {
  invalidateListCache();
}
