import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  scenario: z.enum(["support", "lead", "personal"]),
  transcript: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        text: z.string().max(2000),
        ts: z.number().optional(),
      }),
    )
    .max(200),
  outcome: z.enum(["qualified", "resolved", "abandoned"]).optional(),
  email: z.string().email().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  try {
    const session = await prisma.demoSession.create({
      data: {
        scenario: parsed.data.scenario,
        transcript: JSON.stringify(parsed.data.transcript),
        outcome: parsed.data.outcome ?? null,
        email: parsed.data.email ?? null,
      },
      select: { id: true },
    });
    return NextResponse.json({ ok: true, id: session.id }, { status: 201 });
  } catch (err) {
    console.error("[/api/demo]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
