import { NextResponse } from "next/server";
import { submitApplication } from "@/lib/backend";
import { verifyCaptcha } from "@/lib/captcha";

export const runtime = "nodejs";

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseUrl(value: string) {
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return value;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const role = text(form, "role");
    const roleSlug = text(form, "roleSlug") || null;
    const fullName = text(form, "name");
    const email = text(form, "email");
    const location = text(form, "location");
    const linkedinRaw = text(form, "linkedin");
    const linkedin = parseUrl(linkedinRaw);
    const github = parseUrl(text(form, "github"));
    const portfolio = parseUrl(text(form, "portfolio"));
    const message = text(form, "message");
    const resume = form.get("resume");

    if (text(form, "website")) {
      return NextResponse.json({ error: "Could not submit this application." }, { status: 400 });
    }
    try {
      await verifyCaptcha(text(form, "captchaToken"), text(form, "captchaAnswer"));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Complete the captcha";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    if (!role || !fullName || !email || !location || !linkedinRaw || !message) {
      return NextResponse.json(
        { error: "Name, email, location, LinkedIn, role, and message are required." },
        { status: 400 },
      );
    }
    if (!linkedin) {
      return NextResponse.json({ error: "Enter a valid LinkedIn URL." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json({ error: "Please upload a resume or CV." }, { status: 400 });
    }

    await submitApplication({
      role,
      roleSlug,
      fullName,
      email,
      location,
      linkedin,
      github,
      portfolio,
      message,
      resume,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Application submit failed:", error);
    const message = error instanceof Error ? error.message : "";
    const code = error && typeof error === "object" && "code" in error ? String((error as { code: unknown }).code) : "";
    const safe =
      message.startsWith("Resume") ||
      message.startsWith("Upload") ||
      message.startsWith("Could not open Firestore") ||
      message.startsWith("Captcha") ||
      message.startsWith("Complete the captcha") ||
      message.includes("3MB")
        ? message
        : code === "5" || message.includes("NOT_FOUND")
          ? "Could not open Firestore. Restart npm run dev. If the database is Enterprise edition, create a Standard edition database named (default) and submit again."
          : "Could not save this application.";
    return NextResponse.json({ error: safe }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
