import { NextResponse } from "next/server";
import { createCaptcha } from "@/lib/captcha";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const challenge = await createCaptcha();
  return NextResponse.json(challenge, {
    headers: { "Cache-Control": "no-store" },
  });
}
