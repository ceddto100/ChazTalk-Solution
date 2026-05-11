export interface Feature {
  title: string;
  description: string;
  icon: string; // emoji glyph for lightweight rendering
}

export const features: Feature[] = [
  {
    title: "Voice + Chat in one brain",
    description:
      "ChazTalk handles phone calls, web chat, SMS, and WhatsApp from a single assistant with consistent tone and memory.",
    icon: "🎙️",
  },
  {
    title: "24/7 instant response",
    description:
      "Pick up every inquiry in under 2 seconds — nights, weekends, and surges included. No more missed leads.",
    icon: "⏱️",
  },
  {
    title: "Smart lead qualification",
    description:
      "Custom scoring, budget/authority/need/timing capture, and CRM hand-off the moment a hot lead surfaces.",
    icon: "🎯",
  },
  {
    title: "Support automation",
    description:
      "Resolve up to 70% of tier-1 tickets with grounded answers from your docs, policies, and product data.",
    icon: "🛟",
  },
  {
    title: "Live transcripts + analytics",
    description:
      "Every conversation is logged, transcribed, and tagged. See intent trends and revenue impact in real time.",
    icon: "📊",
  },
  {
    title: "Plug into your stack",
    description:
      "Native HubSpot, Salesforce, Zendesk, Slack, Google Calendar, and Zapier — plus a typed REST API.",
    icon: "🔌",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Connect your knowledge",
    description:
      "Point ChazTalk at your website, docs, FAQs, and CRM. We index everything in minutes — no engineers needed.",
  },
  {
    step: "02",
    title: "Shape the persona",
    description:
      "Tune voice, tone, hours, escalation rules, and qualification questions in a no-code studio.",
  },
  {
    step: "03",
    title: "Launch on every channel",
    description:
      "Drop in a chat widget, forward your phone line, and connect WhatsApp/SMS — ChazTalk is live the same day.",
  },
  {
    step: "04",
    title: "Measure and improve",
    description:
      "Watch deflection, CSAT, and pipeline lift. Approve weekly suggestions to keep the assistant sharp.",
  },
];
