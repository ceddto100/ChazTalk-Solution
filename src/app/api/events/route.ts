import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { eventSchema } from "@/lib/validation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, path, sessionId, payload, utm } = parsed.data;

  try {
    await prisma.event.create({
      data: {
        name,
        path: path ?? null,
        sessionId: sessionId ?? null,
        payload: payload ? JSON.stringify(payload) : null,
        userAgent: req.headers.get("user-agent")?.slice(0, 240) ?? null,
        utmSource: utm?.source,
        utmMedium: utm?.medium,
        utmCampaign: utm?.campaign,
      },
    });
    return NextResponse.json({ ok: true }, { status: 202 });
  } catch (err) {
    console.error("[/api/events]", err);
    // Never fail the client because of analytics.
    return NextResponse.json({ ok: true, persisted: false }, { status: 202 });
  }
}
