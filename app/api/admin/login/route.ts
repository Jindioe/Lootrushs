import { NextResponse } from "next/server";
import { adminCookieName, adminCookieOptions, createAdminSession, credentialsMatch } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = typeof form.get("email") === "string" ? form.get("email") : "";
  const password = typeof form.get("password") === "string" ? form.get("password") : "";

  if (!credentialsMatch(String(email), String(password))) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName(), await createAdminSession(String(email)), adminCookieOptions());
  return response;
}
