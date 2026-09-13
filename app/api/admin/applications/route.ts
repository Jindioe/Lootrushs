import { NextResponse } from "next/server";
import { listApplications } from "@/lib/backend";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET() {
  try {
    const applications = await listApplications();
    return NextResponse.json({ applications });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load applications.";
    const quota = /quota exceeded/i.test(message);
    return NextResponse.json({ error: message }, { status: quota ? 429 : 500 });
  }
}
