import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    status: "healthy",
    service: "chaztalk-web",
    timestamp: new Date().toISOString(),
  });
}
