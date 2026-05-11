"use client";

import Link from "next/link";
import { useState } from "react";
import type { Plan } from "@/content/plans";
import { cn, formatCurrency } from "@/lib/utils";
import { track } from "@/lib/analytics";

export function PricingTable({ plans }: { plans: Plan[] }) {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <>
      <div className="mb-8 flex items-center justify-center gap-2">
        <ToggleButton active={billing === "monthly"} onClick={() => setBilling("monthly")}>
          Monthly
        </ToggleButton>
        <ToggleButton active={billing === "annual"} onClick={() => setBilling("annual")}>
          Annual <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">-20%</span>
        </ToggleButton>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const price = billing === "annual" ? p.annual : p.monthly;
          return (
            <div
              key={p.id}
              className={cn(
                "card relative flex flex-col",
                p.featured && "border-brand-500 ring-2 ring-brand-500/40",
              )}
            >
              {p.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-soft">
                  Most popular
                </span>
              )}
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                {p.best_for}
              </p>
              <h3 className="mt-2 text-xl font-bold">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-600">{p.tagline}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">
                  {formatCurrency(price)}
                </span>
                <span className="text-sm text-ink-500">/ month</span>
              </div>
              {billing === "annual" && (
                <p className="mt-1 text-xs text-ink-500">Billed annually</p>
              )}
              <ul className="mt-5 space-y-2 text-sm">
                {p.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand-600">✓</span>
                    <span className="text-ink-700">{i}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-2">
                <Link
                  href={p.cta.href}
                  onClick={() => void track("cta_click", { location: "pricing", plan: p.id })}
                  className={p.featured ? "btn-primary w-full" : "btn-secondary w-full"}
                >
                  {p.cta.label}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-semibold transition",
        active ? "bg-ink-900 text-white shadow-soft" : "text-ink-600 hover:bg-ink-100",
      )}
    >
      {children}
    </button>
  );
}
