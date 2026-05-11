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
    tagline: "For solo operators and side projects.",
    monthly: 49,
    annual: 39,
    best_for: "Individuals & freelancers",
    includes: [
      "1,000 conversations / month",
      "Chat + email channels",
      "Knowledge base from 1 website",
      "Basic lead capture form",
      "Email support",
    ],
    cta: { label: "Start free", href: "/contact?intent=demo&plan=starter" },
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Lead qualification + support for SMBs.",
    monthly: 199,
    annual: 159,
    featured: true,
    best_for: "5–50 person teams",
    includes: [
      "10,000 conversations / month",
      "Voice + chat + SMS + WhatsApp",
      "CRM + calendar integrations",
      "Custom qualification flows",
      "Live transcripts + analytics",
      "Priority support",
    ],
    cta: { label: "Book a demo", href: "/contact?intent=demo&plan=growth" },
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "High-volume contact centers and teams.",
    monthly: 599,
    annual: 479,
    best_for: "Mid-market & multi-location",
    includes: [
      "Unlimited conversations",
      "Multi-agent + multi-language",
      "SSO + SCIM provisioning",
      "Custom data residency",
      "Advanced QA + redaction",
      "Dedicated success manager",
    ],
    cta: { label: "Talk to sales", href: "/contact?intent=sales&plan=scale" },
  },
];
