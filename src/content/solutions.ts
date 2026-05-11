export interface Solution {
  slug: "smb-support" | "lead-qualification" | "personal-assistant";
  title: string;
  audience: string;
  hero: string;
  description: string;
  bullets: string[];
  outcomes: { metric: string; label: string }[];
  scenario: "support" | "lead" | "personal";
}

export const solutions: Solution[] = [
  {
    slug: "smb-support",
    title: "SMB Support Automation",
    audience: "Local services, clinics, retailers, and SaaS teams under 50.",
    hero: "Answer every call, ticket, and chat — even at 2 AM.",
    description:
      "ChazTalk replaces missed-call voicemail and burnt-out helpdesk staffing with a grounded assistant that resolves up to 70% of tier-1 questions and warm-transfers the rest.",
    bullets: [
      "Voice + chat + SMS + email in one inbox",
      "Grounded answers from your knowledge base with citations",
      "Smart escalation on sentiment and intent",
      "CSAT, deflection, and resolution analytics out of the box",
    ],
    outcomes: [
      { metric: "63%", label: "average ticket deflection" },
      { metric: "<2s", label: "first response time" },
      { metric: "5/5", label: "post-resolution CSAT" },
    ],
    scenario: "support",
  },
  {
    slug: "lead-qualification",
    title: "Lead Qualification on Autopilot",
    audience: "Sales teams who want demos, not raw form fills.",
    hero: "Stop chasing tire-kickers. Start meeting buyers.",
    description:
      "Plug ChazTalk into your site and ad funnels to greet every visitor, ask the right questions, and route only the qualified ones — to the right AE, with full context.",
    bullets: [
      "Configurable BANT or MEDDIC qualification flows",
      "Calendar booking with round-robin AE routing",
      "Native HubSpot, Salesforce, and Pipedrive sync",
      "Re-engagement on cold leads via outbound email + SMS",
    ],
    outcomes: [
      { metric: "2.1×", label: "qualified demos / quarter" },
      { metric: "38%", label: "increase in pipeline" },
      { metric: "60s", label: "average qualification time" },
    ],
    scenario: "lead",
  },
  {
    slug: "personal-assistant",
    title: "Your Personal AI Assistant",
    audience: "Founders, consultants, and busy operators.",
    hero: "Run your day from a single chat window.",
    description:
      "ChazTalk Personal triages your inbox, drafts replies in your voice, manages your calendar, and remembers every promise you make so you don't have to.",
    bullets: [
      "Inbox triage with one-click reply drafts",
      "Calendar protection and conflict resolution",
      "Promise tracking + automatic follow-ups",
      "Encrypted memory you control",
    ],
    outcomes: [
      { metric: "8 hrs", label: "saved per week" },
      { metric: "0", label: "missed follow-ups" },
      { metric: "1", label: "tool to rule them all" },
    ],
    scenario: "personal",
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug) || null;
}
