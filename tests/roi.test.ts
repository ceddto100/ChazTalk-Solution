import { describe, expect, it } from "vitest";
import { calculateRoi } from "@/lib/roi";

describe("calculateRoi", () => {
  it("computes monthly + annual savings from inputs", () => {
    const r = calculateRoi({
      monthlyCalls: 1000,
      avgHandleMin: 6,
      agentHourlyCost: 30,
      automationRate: 0.5,
    });
    // 1000 * 6 / 60 = 100 hours; 50 saved; 50 * 30 = 1500 / mo; 18000 / yr
    expect(r.hoursSaved).toBe(50);
    expect(r.monthlySavings).toBe(1500);
    expect(r.annualSavings).toBe(18000);
    expect(r.paybackMonths).toBeGreaterThan(0);
    expect(r.paybackMonths).toBeLessThan(1);
  });

  it("clamps inputs and returns zero savings when automation is 0", () => {
    const r = calculateRoi({
      monthlyCalls: 100,
      avgHandleMin: 5,
      agentHourlyCost: 25,
      automationRate: 0,
    });
    expect(r.hoursSaved).toBe(0);
    expect(r.monthlySavings).toBe(0);
    expect(r.annualSavings).toBe(0);
    expect(r.paybackMonths).toBe(Infinity);
  });

  it("treats negative inputs as zero", () => {
    const r = calculateRoi({
      monthlyCalls: -50,
      avgHandleMin: -5,
      agentHourlyCost: -10,
      automationRate: 1.5,
    });
    expect(r.hoursSaved).toBe(0);
    expect(r.monthlySavings).toBe(0);
  });
});
