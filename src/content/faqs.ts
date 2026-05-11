export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How long does it take to launch?",
    a: "Most customers go live in under a day. Connect your website, pick a voice, and forward your phone line — ChazTalk handles the rest.",
  },
  {
    q: "What languages do you support?",
    a: "English, Spanish, French, Portuguese, German, and Japanese out of the box. More on request for Scale plans.",
  },
  {
    q: "How do you keep answers accurate?",
    a: "Every response is grounded in your knowledge base with citations. Out-of-scope questions are escalated to a human instead of hallucinated.",
  },
  {
    q: "Can ChazTalk hand off to a human?",
    a: "Yes. Set rules by intent, sentiment, or VIP customer. ChazTalk warm-transfers with full context to your team in Slack, Zendesk, or by phone.",
  },
  {
    q: "Is my data secure?",
    a: "SOC 2 Type II, GDPR, and HIPAA-aligned controls. Customer data is encrypted in transit and at rest and never used to train shared models.",
  },
  {
    q: "What does pricing include?",
    a: "All plans include voice + chat, integrations, analytics, and unlimited team seats. You pay for conversations, not seats.",
  },
];
