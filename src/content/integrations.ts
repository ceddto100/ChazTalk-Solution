export interface Integration {
  name: string;
  category: "CRM" | "Helpdesk" | "Calendar" | "Comms" | "Automation" | "Telephony";
  blurb: string;
}

export const integrations: Integration[] = [
  { name: "HubSpot", category: "CRM", blurb: "Sync callers, qualified leads, call summaries, and deal updates bi-directionally." },
  { name: "Salesforce", category: "CRM", blurb: "Push qualified opportunities and update fields after each call." },
  { name: "Pipedrive", category: "CRM", blurb: "Auto-create deals from qualified phone conversations." },
  { name: "Zendesk", category: "Helpdesk", blurb: "Create, tag, and resolve tickets from voice interactions with full transcripts." },
  { name: "Intercom", category: "Helpdesk", blurb: "Hand off to live agents with call summaries and customer context." },
  { name: "Freshdesk", category: "Helpdesk", blurb: "Two-way ticket sync and support workflow execution." },
  { name: "Google Calendar", category: "Calendar", blurb: "Book, reschedule, and remind callers using live availability." },
  { name: "Calendly", category: "Calendar", blurb: "Drop booked appointments straight into your routing." },
  { name: "Microsoft 365", category: "Calendar", blurb: "Outlook calendar + Teams hand-off after qualified calls." },
  { name: "Slack", category: "Comms", blurb: "Real-time call alerts, hand-offs, approvals, and follow-up workflows." },
  { name: "Twilio", category: "Telephony", blurb: "Bring your own number, forward calls, or launch new AI voice lines." },
  { name: "Aircall", category: "Telephony", blurb: "Call recording, routing, and IVR replacement for AI-handled calls." },
  { name: "Zapier", category: "Automation", blurb: "Connect call outcomes to 6,000+ apps with no code." },
  { name: "Make", category: "Automation", blurb: "Trigger complex multi-step workflows after each call." },
  { name: "Webhooks API", category: "Automation", blurb: "Typed REST API and outbound webhooks for any business system." },
];
