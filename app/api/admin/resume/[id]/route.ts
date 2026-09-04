import { NextResponse } from "next/server";
import { getApplication, readResume } from "@/lib/backend";

export const runtime = "nodejs";

function safeFileName(name: string | null) {
  return (name || "resume").replace(/[/\\]/g, "_");
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const id = (await context.params).id?.trim();
  if (!id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const application = await getApplication(id);
  if (!application?.resume_path) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  try {
    const data = await readResume(application.resume_path);
    return new NextResponse(data, {
      headers: {
        "Content-Type": application.resume_mime || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${safeFileName(application.resume_original_name)}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Resume file is missing" }, { status: 404 });
  }
}
