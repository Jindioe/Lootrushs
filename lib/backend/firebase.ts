import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, initializeFirestore, type Firestore } from "firebase-admin/firestore";
import { serverConfig } from "@/lib/server-config";

type Credentials = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

function normalizePrivateKey(value: string) {
  let key = value.trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1);
  }
  key = key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();
  if (!key.includes("BEGIN PRIVATE KEY") || !key.includes("END PRIVATE KEY")) {
    throw new Error("Firebase private key is missing or malformed");
  }
  return key;
}

function loadServiceAccount(): Credentials {
  const fb = serverConfig.firebase;
  const projectId = (fb.project_id || "").trim();
  const clientEmail = (fb.client_email || "").trim();
  const privateKey = fb.private_key ? normalizePrivateKey(fb.private_key) : "";

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Could not open Firestore. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in Vercel environment variables.",
    );
  }

  return { projectId, clientEmail, privateKey };
}

function databaseIds() {
  const configured = serverConfig.firestoreDatabaseId?.trim();
  const aliases =
    !configured || configured === "default" || configured === "(default)"
      ? ["(default)", "default"]
      : [configured, "(default)", "default"];
  return [...new Set(aliases)];
}

const globalForFirebase = globalThis as typeof globalThis & {
  lootrushsAdminApp?: App;
  lootrushsFirestore?: Firestore;
  lootrushsFirestorePromise?: Promise<Firestore>;
};

function adminApp() {
  if (globalForFirebase.lootrushsAdminApp) return globalForFirebase.lootrushsAdminApp;
  if (getApps().length) {
    globalForFirebase.lootrushsAdminApp = getApps()[0];
    return globalForFirebase.lootrushsAdminApp;
  }

  const credentials = loadServiceAccount();
  globalForFirebase.lootrushsAdminApp = initializeApp({
    credential: cert({
      projectId: credentials.projectId,
      clientEmail: credentials.clientEmail,
      privateKey: credentials.privateKey,
    }),
    projectId: credentials.projectId,
  });
  return globalForFirebase.lootrushsAdminApp;
}

function createClient(databaseId: string) {
  const app = adminApp();
  try {
    return initializeFirestore(app, { preferRest: true }, databaseId);
  } catch {
    return getFirestore(app, databaseId);
  }
}

async function probe(databaseId: string) {
  const db = createClient(databaseId);
  await db.collection("_connection_check").doc("ok").get();
  return db;
}

async function connectFirestore() {
  if (globalForFirebase.lootrushsFirestore) return globalForFirebase.lootrushsFirestore;

  loadServiceAccount();

  let lastError: unknown;
  for (const id of databaseIds()) {
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
  throw new Error(`Could not open Firestore (${detail})`);
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
