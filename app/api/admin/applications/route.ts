import { NextResponse } from "next/server";
import { listApplications } from "@/lib/backend";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET() {
  const applications = await listApplications();
  return NextResponse.json({ applications });
}
