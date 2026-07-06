export interface Feature {
  title: string;
  description: string;
  icon: string; // emoji glyph for lightweight rendering
}

export const features: Feature[] = [
  {
    title: "AI voice agents",
    description:
      "Answer inbound phone calls with natural, branded voice conversations that collect details, respond accurately, and keep callers moving.",
    icon: "🎙️",
  },
  {
    title: "24/7 call handling",
    description:
      "Pick up every inquiry in under 2 seconds — nights, weekends, holidays, and demand spikes included. No more missed opportunities.",
    icon: "⏱️",
  },
  {
    title: "Lead capture + qualification",
    description:
      "Ask the right questions, capture contact details, score fit, and push qualified leads into your CRM with call summaries attached.",
    icon: "🎯",
  },
  {
    title: "Appointment scheduling",
    description:
      "Book, reschedule, and confirm appointments from the call using calendar availability, routing rules, and automated reminders.",
    icon: "📅",
  },
  {
    title: "Customer support automation",
    description:
      "Handle common questions about services, policies, pricing, billing, and status updates while escalating sensitive issues to your team.",
    icon: "🛟",
  },
  {
    title: "Workflow automation",
    description:
      "Trigger texts, emails, CRM updates, tickets, Slack alerts, and follow-up sequences automatically after each voice interaction.",
    icon: "🔌",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Map your call flow",
    description:
      "We learn how your team answers calls, qualifies leads, books appointments, handles support, and decides when to escalate.",
  },
  {
    step: "02",
    title: "Build the voice agent",
    description:
      "We design the agent's voice, tone, knowledge, call scripts, qualification questions, and guardrails around your business rules.",
  },
  {
    step: "03",
    title: "Connect your systems",
    description:
      "Forward calls and connect your CRM, calendar, helpdesk, SMS, email, and automation tools so every conversation creates action.",
  },
  {
    step: "04",
    title: "Optimize performance",
    description:
      "Review transcripts, lead quality, booked appointments, handoffs, and workflow outcomes so the automation keeps improving.",
  },
];
