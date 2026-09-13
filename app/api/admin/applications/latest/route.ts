import { NextResponse } from "next/server";
import { getLatestApplication } from "@/lib/backend";

export const runtime = "nodejs";
export const maxDuration = 30;

/** One Firestore read — used by desktop alerts instead of listing every application. */
export async function GET() {
  try {
    const latest = await getLatestApplication();
    return NextResponse.json({
      latest: latest
        ? {
            id: latest.id,
            created_at:
              latest.created_at instanceof Date
                ? latest.created_at.toISOString()
                : String(latest.created_at),
            full_name: latest.full_name,
            role: latest.role,
          }
        : null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not check applications.";
    const quota = /quota exceeded/i.test(message);
    return NextResponse.json({ error: message }, { status: quota ? 429 : 500 });
  }
}
