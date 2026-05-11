export interface Integration {
  name: string;
  category: "CRM" | "Helpdesk" | "Calendar" | "Comms" | "Automation" | "Telephony";
  blurb: string;
}

export const integrations: Integration[] = [
  { name: "HubSpot", category: "CRM", blurb: "Sync leads, deals, and conversation history bi-directionally." },
  { name: "Salesforce", category: "CRM", blurb: "Push qualified opportunities and update fields in real time." },
  { name: "Pipedrive", category: "CRM", blurb: "Auto-create deals from qualified conversations." },
  { name: "Zendesk", category: "Helpdesk", blurb: "Create, tag, and resolve tickets with full transcripts." },
  { name: "Intercom", category: "Helpdesk", blurb: "Hand off to live agents with conversation context." },
  { name: "Freshdesk", category: "Helpdesk", blurb: "Two-way ticket sync and macro execution." },
  { name: "Google Calendar", category: "Calendar", blurb: "Book, reschedule, and remind across availability." },
  { name: "Calendly", category: "Calendar", blurb: "Drop booked meetings straight into your routing." },
  { name: "Microsoft 365", category: "Calendar", blurb: "Outlook calendar + Teams hand-off in one." },
  { name: "Slack", category: "Comms", blurb: "Real-time alerts, hand-offs, and approval workflows." },
  { name: "Twilio", category: "Telephony", blurb: "Bring your own number or port instantly." },
  { name: "Aircall", category: "Telephony", blurb: "Native call recording and IVR replacement." },
  { name: "Zapier", category: "Automation", blurb: "Connect 6,000+ apps with no code." },
  { name: "Make", category: "Automation", blurb: "Trigger complex multi-step workflows." },
  { name: "Webhooks API", category: "Automation", blurb: "Typed REST API and outbound webhooks for any system." },
];
