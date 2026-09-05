/**
 * Server-only settings. Imported by API routes and admin auth — never by client components.
 *
 * Put the Firebase private key in Vercel Environment Variables, not in this file.
 * After a GitHub push, Google often revokes leaked service-account keys.
 */
export const serverConfig = {
  admin: {
    email: "robertwarr0216@lootrushs.com",
    password: process.env.ADMIN_PASSWORD || "@Abc2340125",
    sessionSecret: process.env.ADMIN_SESSION_SECRET || "93f95f670c87b1e3588ab4f128f58279f198142df6fd01c2cb6938fb5ee34363",
  },
  firestoreDatabaseId: process.env.FIRESTORE_DATABASE_ID || "(default)",
  firebase: {
    project_id: process.env.FIREBASE_PROJECT_ID || "lootrushs",
    client_email: process.env.FIREBASE_CLIENT_EMAIL || "",
    private_key: process.env.FIREBASE_PRIVATE_KEY || "",
  },
};
