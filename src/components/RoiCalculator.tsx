"use client";

import { useMemo, useState } from "react";
import { calculateRoi } from "@/lib/roi";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { getUtm, track } from "@/lib/analytics";

export function RoiCalculator() {
  const [monthlyCalls, setMonthlyCalls] = useState(1500);
  const [avgHandleMin, setAvgHandleMin] = useState(6);
  const [agentHourlyCost, setAgentHourlyCost] = useState(28);
  const [automationRate, setAutomationRate] = useState(0.55);
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const result = useMemo(
    () => calculateRoi({ monthlyCalls, avgHandleMin, agentHourlyCost, automationRate }),
    [monthlyCalls, avgHandleMin, agentHourlyCost, automationRate],
  );

  async function saveReport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved("saving");
    void track("calculator_run", {
      monthlyCalls,
      avgHandleMin,
      agentHourlyCost,
      automationRate,
    });
    try {
      const res = await fetch("/api/roi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          monthlyCalls,
          avgHandleMin,
          agentHourlyCost,
          automationRate,
          email: email || undefined,
          utm: getUtm() ?? undefined,
        }),
      });
      if (!res.ok) throw new Error("save failed");
      setSaved("saved");
    } catch {
      setSaved("error");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="card lg:col-span-3">
        <h3 className="text-lg font-semibold">Your numbers</h3>
        <p className="mt-1 text-sm text-ink-600">
          Estimate the savings of automating tier-1 conversations with ChazTalk.
        </p>

        <div className="mt-6 space-y-5">
          <SliderRow
            label="Monthly conversations"
            value={monthlyCalls}
            min={100}
            max={50000}
            step={100}
            display={formatNumber(monthlyCalls)}
            onChange={setMonthlyCalls}
          />
          <SliderRow
            label="Avg handle time"
            value={avgHandleMin}
            min={1}
            max={30}
            step={1}
            display={`${avgHandleMin} min`}
            onChange={setAvgHandleMin}
          />
          <SliderRow
            label="Agent fully-loaded cost"
            value={agentHourlyCost}
            min={10}
            max={120}
            step={1}
            display={`${formatCurrency(agentHourlyCost)} / hr`}
            onChange={setAgentHourlyCost}
          />
          <SliderRow
            label="Automation rate"
            value={Math.round(automationRate * 100)}
            min={10}
            max={95}
            step={5}
            display={`${Math.round(automationRate * 100)}%`}
            onChange={(v) => setAutomationRate(v / 100)}
          />
        </div>
      </div>

      <div className="card lg:col-span-2 bg-gradient-to-br from-brand-50 via-white to-white">
        <p className="eyebrow">Estimated impact</p>
        <h3 className="mt-2 text-3xl font-extrabold text-brand-700">
          {formatCurrency(result.monthlySavings)}<span className="text-base font-medium text-ink-500">/mo</span>
        </h3>
        <p className="mt-1 text-sm text-ink-600">
          {formatCurrency(result.annualSavings)} per year · {formatNumber(result.hoursSaved)} hours back
        </p>
        <p className="mt-3 text-xs text-ink-500">
          Payback in {Number.isFinite(result.paybackMonths) ? `${result.paybackMonths} months` : "—"}
        </p>

        <form onSubmit={saveReport} className="mt-6 space-y-3">
          <label htmlFor="roi-email" className="label">
            Email me this report
          </label>
          <input
            id="roi-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn-primary w-full" disabled={saved === "saving"}>
            {saved === "saving" ? "Saving…" : saved === "saved" ? "Saved ✓" : "Save my ROI report"}
          </button>
          {saved === "error" && (
            <p className="text-xs text-red-600">Couldn't save. Please try again.</p>
          )}
          <p className="text-xs text-ink-500">
            We use these inputs to tailor your demo. No spam, unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-sm font-medium text-ink-800">{label}</label>
        <span className="text-sm font-semibold text-brand-700">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-600"
        aria-label={label}
      />
    </div>
  );
}
