import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { roiSchema } from "@/lib/validation";
import { calculateRoi } from "@/lib/roi";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = roiSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { monthlyCalls, avgHandleMin, agentHourlyCost, automationRate, email } = parsed.data;
  const result = calculateRoi({ monthlyCalls, avgHandleMin, agentHourlyCost, automationRate });

  try {
    const report = await prisma.roiReport.create({
      data: {
        email: email ?? null,
        monthlyCalls,
        avgHandleMin,
        agentHourlyCost,
        automationRate,
        hoursSaved: result.hoursSaved,
        monthlySavings: result.monthlySavings,
        annualSavings: result.annualSavings,
        paybackMonths: Number.isFinite(result.paybackMonths) ? result.paybackMonths : 0,
      },
      select: { id: true },
    });
    return NextResponse.json({ ok: true, id: report.id, result }, { status: 201 });
  } catch (err) {
    console.error("[/api/roi]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
