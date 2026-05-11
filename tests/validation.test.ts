import { describe, expect, it } from "vitest";
import { leadSchema, roiSchema, eventSchema } from "@/lib/validation";

describe("leadSchema", () => {
  it("accepts a minimal valid lead", () => {
    const result = leadSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.intent).toBe("contact");
  });

  it("rejects an invalid email", () => {
    const result = leadSchema.safeParse({ name: "Jane", email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects a too-short name", () => {
    const result = leadSchema.safeParse({ name: "A", email: "a@b.co" });
    expect(result.success).toBe(false);
  });

  it("accepts utm metadata", () => {
    const result = leadSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      intent: "demo",
      utm: { source: "google", medium: "cpc", campaign: "launch" },
    });
    expect(result.success).toBe(true);
  });
});

describe("roiSchema", () => {
  it("requires numeric inputs", () => {
    const ok = roiSchema.safeParse({
      monthlyCalls: 1000,
      avgHandleMin: 5,
      agentHourlyCost: 25,
      automationRate: 0.5,
    });
    expect(ok.success).toBe(true);
  });

  it("rejects out-of-range automation rate", () => {
    const bad = roiSchema.safeParse({
      monthlyCalls: 100,
      avgHandleMin: 5,
      agentHourlyCost: 25,
      automationRate: 2,
    });
    expect(bad.success).toBe(false);
  });
});

describe("eventSchema", () => {
  it("accepts a minimal event", () => {
    expect(eventSchema.safeParse({ name: "cta_click" }).success).toBe(true);
  });
  it("rejects empty name", () => {
    expect(eventSchema.safeParse({ name: "" }).success).toBe(false);
  });
});
