export type Role = "user" | "assistant";

export interface DemoMessage {
  role: Role;
  text: string;
}

export interface DemoChoice {
  label: string;
  next: string; // next node id
}

export interface DemoNode {
  id: string;
  bot: string;
  choices?: DemoChoice[];
  collect?: { key: "name" | "email" | "phone"; placeholder: string; next: string };
  end?: { outcome: "qualified" | "resolved" | "abandoned"; message: string };
}

export interface DemoScript {
  id: "support" | "lead" | "personal";
  title: string;
  blurb: string;
  start: string;
  nodes: Record<string, DemoNode>;
}

export const demoScripts: Record<string, DemoScript> = {
  support: {
    id: "support",
    title: "SMB Support",
    blurb: "A customer calls after hours about a billing issue.",
    start: "intro",
    nodes: {
      intro: {
        id: "intro",
        bot: "Thanks for calling Bayside Dental — I'm the AI voice agent handling after-hours calls. How can I help tonight?",
        choices: [
          { label: "I have a billing question", next: "billing" },
          { label: "I need to reschedule", next: "reschedule" },
          { label: "It's a dental emergency", next: "emergency" },
        ],
      },
      billing: {
        id: "billing",
        bot: "Got it — billing. I can pull your invoice if you share the email on file.",
        collect: { key: "email", placeholder: "you@email.com", next: "billing_after" },
      },
      billing_after: {
        id: "billing_after",
        bot: "Thanks! I found a $42 balance from your June 14th visit. I can text a secure pay link, schedule a callback, or transfer you in the morning.",
        choices: [
          { label: "Text me the pay link", next: "resolved_pay" },
          { label: "Schedule a callback", next: "resolved_callback" },
        ],
      },
      resolved_pay: {
        id: "resolved_pay",
        bot: "Sent. You should receive it within a minute. Anything else?",
        end: {
          outcome: "resolved",
          message: "Resolved in 4 turns — no human required. CSAT: 5/5.",
        },
      },
      resolved_callback: {
        id: "resolved_callback",
        bot: "Booked: 9:15 AM tomorrow. I'll text a reminder 15 minutes prior.",
        end: { outcome: "resolved", message: "Callback booked. CRM updated." },
      },
      reschedule: {
        id: "reschedule",
        bot: "Of course. Your next appointment is Thursday at 2 PM. Would 10 AM Friday work?",
        choices: [
          { label: "Yes, that works", next: "resolved_callback" },
          { label: "Let me check, I'll call back", next: "abandoned" },
        ],
      },
      emergency: {
        id: "emergency",
        bot: "I'm escalating to Dr. Alvarez's on-call line right now. Stay on, connecting you in 5 seconds…",
        end: { outcome: "resolved", message: "Warm-transferred with full context." },
      },
      abandoned: {
        id: "abandoned",
        bot: "No problem — I'll be here whenever you're ready. 👋",
        end: { outcome: "abandoned", message: "Saved context for next session." },
      },
    },
  },
  lead: {
    id: "lead",
    title: "Lead Qualification",
    blurb: "A prospect calls after seeing an ad at 11 PM.",
    start: "intro",
    nodes: {
      intro: {
        id: "intro",
        bot: "Thanks for calling Northwind. I can qualify your request and help schedule the right next step. What brings you in?",
        choices: [
          { label: "Comparing vendors", next: "vendor" },
          { label: "Replacing an existing tool", next: "replace" },
          { label: "Just exploring", next: "explore" },
        ],
      },
      vendor: {
        id: "vendor",
        bot: "Great — we love a bake-off. How many seats are you sizing for?",
        choices: [
          { label: "1–10", next: "small" },
          { label: "11–100", next: "qualified" },
          { label: "100+", next: "qualified" },
        ],
      },
      replace: {
        id: "replace",
        bot: "Smart move. What's the #1 thing the current tool can't do?",
        choices: [
          { label: "Voice support", next: "qualified" },
          { label: "CRM hand-off", next: "qualified" },
          { label: "Reporting", next: "qualified" },
        ],
      },
      explore: {
        id: "explore",
        bot: "All good — want me to send a 3-minute overview to your inbox?",
        collect: { key: "email", placeholder: "you@company.com", next: "explored" },
      },
      small: {
        id: "small",
        bot: "We have a Starter plan that's perfect for that size. Want me to send the link?",
        end: { outcome: "resolved", message: "Self-serve link delivered. Nurture sequence started." },
      },
      qualified: {
        id: "qualified",
        bot: "You're a fit — let me grab your work email so an AE can confirm a time.",
        collect: { key: "email", placeholder: "you@company.com", next: "qualified_done" },
      },
      qualified_done: {
        id: "qualified_done",
        bot: "Perfect. I'll put Daniel on it — he'll reach out in the next business hour.",
        end: { outcome: "qualified", message: "Routed to AE with BANT summary attached." },
      },
      explored: {
        id: "explored",
        bot: "Sent. I'll check in next week — sound good?",
        end: { outcome: "resolved", message: "Added to nurture. No human time required." },
      },
    },
  },
  personal: {
    id: "personal",
    title: "Personal Assistant",
    blurb: "A completed call triggers scheduling and follow-up automation.",
    start: "intro",
    nodes: {
      intro: {
        id: "intro",
        bot: "A qualified caller needs an appointment, CRM update, and follow-up reminder. What should happen next?",
        choices: [
          { label: "Book appointment", next: "moved" },
          { label: "Send follow-up", next: "reschedule_call" },
        ],
      },
      moved: {
        id: "moved",
        bot: "Done — the appointment is booked, the CRM record is updated, and the confirmation text is sent.",
        end: { outcome: "resolved", message: "Workflow completed automatically after the call." },
      },
      reschedule_call: {
        id: "reschedule_call",
        bot: "Done — the follow-up email and SMS were sent, and a callback task was assigned to the sales owner.",
        end: { outcome: "resolved", message: "Follow-up workflow triggered from the voice interaction." },
      },
    },
  },
};
