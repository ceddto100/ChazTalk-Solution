export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How long does it take to launch a voice agent?",
    a: "Most customers can launch quickly after we map their call flow, connect their knowledge base, choose a voice, and forward or connect their phone line.",
  },
  {
    q: "What can the AI voice agent handle?",
    a: "It can answer calls, capture lead details, qualify callers, schedule appointments, answer common customer questions, create tickets, and trigger follow-up workflows.",
  },
  {
    q: "How do you keep answers accurate?",
    a: "Every response is grounded in your business knowledge, FAQs, services, policies, and approved call rules. Out-of-scope or sensitive questions are escalated to a human.",
  },
  {
    q: "Can Chat Talk Solutions hand off to a human?",
    a: "Yes. Set rules by urgency, intent, sentiment, location, or VIP status. The voice agent can warm-transfer calls or alert your team with a transcript and summary.",
  },
  {
    q: "Is my data secure?",
    a: "Customer data is encrypted in transit and at rest and is never used to train shared models. We also support redaction, access controls, and custom security reviews.",
  },
  {
    q: "What does pricing include?",
    a: "Plans include voice AI setup, call handling, automation workflows, analytics, integrations, and unlimited team seats. We can also scope custom agency work for advanced workflows.",
  },
];
