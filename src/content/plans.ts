export interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  annual: number; // per month when billed annually
  featured?: boolean;
  includes: string[];
  cta: { label: string; href: string };
  best_for: string;
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Basic AI call answering for small teams.",
    monthly: 49,
    annual: 39,
    best_for: "Solo operators & small offices",
    includes: [
      "AI voice agent for inbound calls",
      "Business FAQ and service knowledge setup",
      "Lead capture and call summaries",
      "Basic appointment request intake",
      "Email support",
    ],
    cta: { label: "Start free", href: "/contact?intent=demo&plan=starter" },
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Lead qualification, scheduling, and support for SMBs.",
    monthly: 199,
    annual: 159,
    featured: true,
    best_for: "5–50 person teams",
    includes: [
      "High-volume AI voice call handling",
      "SMS follow-up and optional web intake",
      "CRM + calendar integrations",
      "Custom qualification and scheduling flows",
      "Live transcripts + call analytics",
      "Priority support",
    ],
    cta: { label: "Book a demo", href: "/contact?intent=demo&plan=growth" },
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Custom AI agency buildouts for multi-location operations.",
    monthly: 599,
    annual: 479,
    best_for: "Mid-market & multi-location",
    includes: [
      "Unlimited voice conversations",
      "Multi-agent + multi-language call flows",
      "Advanced workflow automation",
      "Custom data residency",
      "Advanced QA + redaction",
      "Dedicated success manager",
    ],
    cta: { label: "Talk to sales", href: "/contact?intent=sales&plan=scale" },
  },
];
