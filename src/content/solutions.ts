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
    title: "AI Call Handling for SMBs",
    audience: "Local services, clinics, retailers, home services, and lean support teams.",
    hero: "Answer every customer call — even after hours.",
    description:
      "Chat Talk Solutions builds AI voice agents that answer inbound calls, resolve routine questions, capture caller details, and warm-transfer urgent issues with full context.",
    bullets: [
      "24/7 inbound call answering and caller intake",
      "Grounded answers from your website, FAQs, policies, and service data",
      "Warm transfers for emergencies, VIPs, or high-intent callers",
      "Call summaries, transcripts, tags, and follow-up tasks created automatically",
    ],
    outcomes: [
      { metric: "70%", label: "routine calls automated" },
      { metric: "<2s", label: "average answer time" },
      { metric: "24/7", label: "customer coverage" },
    ],
    scenario: "support",
  },
  {
    slug: "lead-qualification",
    title: "Voice Lead Capture + Qualification",
    audience: "Sales and service businesses that depend on fast follow-up.",
    hero: "Turn missed calls into qualified opportunities.",
    description:
      "Our AI voice agents greet callers, ask qualification questions, capture contact details, schedule appointments, and route high-value leads into your CRM automatically.",
    bullets: [
      "Custom qualification flows for budget, need, urgency, location, and fit",
      "Calendar booking with routing rules and automated confirmations",
      "Native HubSpot, Salesforce, Pipedrive, and webhook sync",
      "Follow-up SMS, email, and task creation triggered after each call",
    ],
    outcomes: [
      { metric: "2.1×", label: "qualified leads" },
      { metric: "38%", label: "increase in pipeline" },
      { metric: "60s", label: "average qualification time" },
    ],
    scenario: "lead",
  },
  {
    slug: "personal-assistant",
    title: "Business Workflow Automation",
    audience: "Operators who want voice conversations connected to real work.",
    hero: "Connect every call to the next business action.",
    description:
      "Chat Talk Solutions is more than a voice agent vendor. We design automation systems that turn calls into appointments, CRM updates, support tickets, reminders, and follow-up workflows.",
    bullets: [
      "CRM, calendar, helpdesk, SMS, email, and Slack automations",
      "Automated reminders, callbacks, confirmations, and nurture sequences",
      "Escalation rules for urgent requests and high-value opportunities",
      "Operational reporting across call volume, outcomes, and revenue impact",
    ],
    outcomes: [
      { metric: "8 hrs", label: "saved per week" },
      { metric: "0", label: "missed follow-ups" },
      { metric: "1", label: "connected automation system" },
    ],
    scenario: "personal",
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug) || null;
}
