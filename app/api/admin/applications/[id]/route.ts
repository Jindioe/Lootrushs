import { NextResponse } from "next/server";
import { deleteApplication, deleteResume, getApplication, updateApplicationStatus } from "@/lib/backend";
import { isApplicationStatus } from "@/lib/application-status";

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

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const id = (await context.params).id?.trim();
  if (!id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  let body: { status?: string } = {};
  try {
    body = (await request.json()) as { status?: string };
  } catch {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }
  const status = typeof body.status === "string" ? body.status : "";
  if (!isApplicationStatus(status)) {
    return NextResponse.json({ error: "Choose a valid status." }, { status: 400 });
  }
  const application = await updateApplicationStatus(id, status);
  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ application });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const id = (await context.params).id?.trim();
  if (!id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const application = await deleteApplication(id);
  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    await deleteResume(application.resume_path);
  } catch (error) {
    console.error("Resume delete failed:", error);
  }
  return NextResponse.json({ ok: true });
}
