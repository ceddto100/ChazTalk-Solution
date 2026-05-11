import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadSchema } from "@/lib/validation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        company: emptyToNull(data.company),
        phone: emptyToNull(data.phone),
        message: emptyToNull(data.message),
        intent: data.intent,
        source: data.source,
        utmSource: data.utm?.source,
        utmMedium: data.utm?.medium,
        utmCampaign: data.utm?.campaign,
        utmTerm: data.utm?.term,
        utmContent: data.utm?.content,
      },
      select: { id: true, createdAt: true },
    });

    if (process.env.LEAD_WEBHOOK_URL) {
      void fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "lead.created", lead: { id: lead.id, ...data } }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true, id: lead.id, createdAt: lead.createdAt }, { status: 201 });
  } catch (err) {
    console.error("[/api/leads]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

function emptyToNull(v: string | undefined | null): string | null {
  if (!v) return null;
  const trimmed = v.trim();
  return trimmed.length ? trimmed : null;
}
