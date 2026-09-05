import "server-only";
import { Firestore } from "@google-cloud/firestore";
import { JWT } from "google-auth-library";
import { serverConfig } from "@/lib/server-config";

type FirebaseJson = {
  projectId?: string;
  project_id?: string;
  clientEmail?: string;
  client_email?: string;
  privateKey?: string;
  private_key?: string;
};

type Credentials = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

function firebaseJson() {
  return serverConfig.firebase as FirebaseJson;
}

function loadServiceAccount(): Credentials {
  const fb = firebaseJson();
  const projectId = (fb.projectId || fb.project_id || "").trim();
  const clientEmail = (fb.clientEmail || fb.client_email || "").trim();
  const privateKey = (fb.privateKey || fb.private_key || "").replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Fill in firebase settings in lib/server-config.ts");
  }

  return { projectId, clientEmail, privateKey };
}

const globalForFirebase = globalThis as typeof globalThis & {
  lootrushsFirestore?: Firestore;
  lootrushsFirestorePromise?: Promise<Firestore>;
};

function createClient(databaseId: string) {
  const credentials = loadServiceAccount();
  return new Firestore({
    projectId: credentials.projectId,
    databaseId,
    ignoreUndefinedProperties: true,
    preferRest: true,
    credentials: {
      client_email: credentials.clientEmail,
      private_key: credentials.privateKey,
    },
  });
}

function databaseCandidates(listed: string[]) {
  const configured = serverConfig.firestoreDatabaseId?.trim();
  const aliases =
    configured === "default" || configured === "(default)" ? ["(default)", "default"] : [configured, "(default)", "default"];
  return [...new Set([...listed, ...aliases].filter((id): id is string => Boolean(id)))];
}

async function listDatabaseIds(credentials: Credentials) {
  try {
    const auth = new JWT({
      email: credentials.clientEmail,
      key: credentials.privateKey,
      scopes: ["https://www.googleapis.com/auth/datastore", "https://www.googleapis.com/auth/cloud-platform"],
    });
    const { token } = await auth.getAccessToken();
    if (!token) return [];
    const response = await fetch(`https://firestore.googleapis.com/v1/projects/${credentials.projectId}/databases`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      console.error("Firestore list databases failed:", response.status, await response.text());
      return [];
    }
    const body = (await response.json()) as { databases?: Array<{ name?: string }> };
    return (body.databases ?? [])
      .map((database) => database.name?.split("/databases/")[1] ?? "")
      .filter(Boolean);
  } catch (error) {
    console.error("Firestore list databases failed:", error);
    return [];
  }
}

async function probe(databaseId: string) {
  const db = createClient(databaseId);
  await db.collection("_connection_check").doc("ok").get();
  return db;
}

async function connectFirestore() {
  if (globalForFirebase.lootrushsFirestore) return globalForFirebase.lootrushsFirestore;

  const credentials = loadServiceAccount();
  let listed: string[] = [];
  let lastError: unknown;

  for (const id of databaseCandidates([])) {
    try {
      globalForFirebase.lootrushsFirestore = await probe(id);
      console.info(`Firestore connected using database "${id}"`);
      return globalForFirebase.lootrushsFirestore;
    } catch (error) {
      lastError = error;
      console.error(`Firestore probe failed for "${id}":`, error instanceof Error ? error.message : error);
    }
  }

  listed = await listDatabaseIds(credentials);
  for (const id of listed.filter((item) => !databaseCandidates([]).includes(item))) {
    try {
      globalForFirebase.lootrushsFirestore = await probe(id);
      console.info(`Firestore connected using database "${id}"`);
      return globalForFirebase.lootrushsFirestore;
    } catch (error) {
      lastError = error;
      console.error(`Firestore probe failed for "${id}":`, error instanceof Error ? error.message : error);
    }
  }

  const detail = lastError instanceof Error ? lastError.message : "NOT_FOUND";
  const listedText = listed.length ? `Found database id(s): ${listed.join(", ")}.` : "Could not list any Firestore databases.";
  throw new Error(
    `Could not open Firestore (${detail}). ${listedText} The console database named "default" is not the same as "(default)".`,
  );
}

export async function firestore() {
  if (!globalForFirebase.lootrushsFirestorePromise) {
    globalForFirebase.lootrushsFirestorePromise = connectFirestore().catch((error) => {
      globalForFirebase.lootrushsFirestorePromise = undefined;
      const message = error instanceof Error ? error.message : String(error);
      throw message.startsWith("Could not open Firestore") ? error : new Error(`Could not open Firestore (${message})`);
    });
  }
  return globalForFirebase.lootrushsFirestorePromise;
}
