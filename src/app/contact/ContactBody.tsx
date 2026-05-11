"use client";

import { useSearchParams } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";

export function ContactBody() {
  const params = useSearchParams();
  const intent = params.get("intent");
  const valid = intent === "demo" || intent === "contact" || intent === "sales" ? intent : "contact";
  const source = `contact_page${params.get("plan") ? `:plan=${params.get("plan")}` : ""}${
    params.get("solution") ? `:solution=${params.get("solution")}` : ""
  }`;
  return <LeadForm defaultIntent={valid} source={source} />;
}
