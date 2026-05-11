export interface RoiInput {
  monthlyCalls: number;
  avgHandleMin: number;
  agentHourlyCost: number;
  automationRate: number; // 0..1
}

export interface RoiResult {
  hoursSaved: number;
  monthlySavings: number;
  annualSavings: number;
  paybackMonths: number;
}

const PLAN_MONTHLY_COST = 199; // base plan used for payback estimation

export function calculateRoi(input: RoiInput): RoiResult {
  const calls = Math.max(0, input.monthlyCalls);
  const handle = Math.max(0, input.avgHandleMin);
  const cost = Math.max(0, input.agentHourlyCost);
  const automation = Math.min(1, Math.max(0, input.automationRate));

  const totalMinutes = calls * handle;
  const totalHours = totalMinutes / 60;
  const hoursSaved = totalHours * automation;
  const monthlySavings = hoursSaved * cost;
  const annualSavings = monthlySavings * 12;
  const paybackMonths =
    monthlySavings > 0
      ? Math.max(0.1, PLAN_MONTHLY_COST / monthlySavings)
      : Number.POSITIVE_INFINITY;

  return {
    hoursSaved: round(hoursSaved, 1),
    monthlySavings: round(monthlySavings, 0),
    annualSavings: round(annualSavings, 0),
    paybackMonths: Number.isFinite(paybackMonths) ? round(paybackMonths, 1) : Infinity,
  };
}

function round(n: number, decimals: number) {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}
