import { serverConfig } from "./server-config";

const COOKIE = "lr_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function encoder() {
  return new TextEncoder();
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function timingSafeEqualString(left: string, right: string) {
  const leftBytes = encoder().encode(left);
  const rightBytes = encoder().encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length, 1);
  const a = new Uint8Array(length);
  const b = new Uint8Array(length);
  a.set(leftBytes);
  b.set(rightBytes);
  let mismatch = leftBytes.length === rightBytes.length ? 0 : 1;
  for (let i = 0; i < length; i += 1) mismatch |= a[i] ^ b[i];
  return mismatch === 0;
}

async function hmacKey(secret: string) {
  return crypto.subtle.importKey("raw", encoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
  ]);
}

async function sign(value: string, secret: string) {
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(secret), encoder().encode(value));
  return toBase64Url(signature);
}

export function adminCookieName() {
  return COOKIE;
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === "production",
  };
}

export function getAdminCredentials() {
  return {
    email: serverConfig.admin.email.trim().toLowerCase(),
    password: serverConfig.admin.password,
    secret: serverConfig.admin.sessionSecret.trim(),
  };
}

export async function createAdminSession(email: string) {
  const { secret } = getAdminCredentials();
  if (!secret) throw new Error("Admin session secret is missing in lib/server-config.ts");
  const exp = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${email.toLowerCase()}|${exp}`;
  return `${toBase64Url(encoder().encode(payload))}.${await sign(payload, secret)}`;
}

export async function verifyAdminSession(token: string | undefined) {
  if (!token) return null;
  const { email, secret } = getAdminCredentials();
  if (!email || !secret) return null;
  const [payloadPart, signature] = token.split(".");
  if (!payloadPart || !signature) return null;
  try {
    const payload = new TextDecoder().decode(fromBase64Url(payloadPart));
    const expected = await sign(payload, secret);
    if (!timingSafeEqualString(signature, expected)) return null;
    const [sessionEmail, expRaw] = payload.split("|");
    const exp = Number(expRaw);
    if (!sessionEmail || !Number.isFinite(exp) || exp < Date.now()) return null;
    if (!timingSafeEqualString(sessionEmail, email)) return null;
    return sessionEmail;
  } catch {
    return null;
  }
}

export function credentialsMatch(email: string, password: string) {
  const expected = getAdminCredentials();
  if (!expected.email || !expected.password) return false;
  return (
    timingSafeEqualString(email.trim().toLowerCase(), expected.email) &&
    timingSafeEqualString(password, expected.password)
  );
}
