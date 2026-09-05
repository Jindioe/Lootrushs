import { NextResponse } from "next/server";
import { submitApplication } from "@/lib/backend";
import { verifyCaptcha } from "@/lib/captcha";
import { engagementTypes, getJob, isEngagement } from "@/lib/jobs";

export const runtime = "nodejs";
export const maxDuration = 60;

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
    const engagement = text(form, "engagement");
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
    if (!isEngagement(engagement)) {
      return NextResponse.json(
        { error: "Choose full-time, part-time, or advisory." },
        { status: 400 },
      );
    }
    const job = roleSlug ? getJob(roleSlug) : undefined;
    const allowed = job?.engagements ?? engagementTypes;
    if (!allowed.includes(engagement)) {
      return NextResponse.json(
        { error: "That engagement is not open for this role." },
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
      engagement,
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
      message.startsWith("Captcha") ||
      message.startsWith("Complete the captcha") ||
      message.includes("3MB")
        ? message
        : /UNAUTHENTICATED|invalid_grant|Invalid JWT|invalid authentication|private key/i.test(message)
          ? "Could not open Firestore. The Firebase service account key is invalid or revoked."
          : message.startsWith("Could not open Firestore") && message.length < 200
            ? message
            : code === "5" || /NOT_FOUND|UNAVAILABLE|DEADLINE|PERMISSION_DENIED/i.test(message)
              ? "Could not open Firestore. Confirm the Firebase database exists and try again."
              : "Could not save this application.";
    return NextResponse.json({ error: safe }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
