import { NextResponse } from "next/server";
import { getApplication } from "@/lib/backend";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const id = (await context.params).id?.trim();
  if (!id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const application = await getApplication(id);
  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ application });
}
