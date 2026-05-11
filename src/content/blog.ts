export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO
  readMin: number;
  tag: string;
  body: string; // markdown-ish body
}

export const posts: BlogPost[] = [
  {
    slug: "missed-calls-are-revenue-leaks",
    title: "Missed calls are revenue leaks — here's the math",
    excerpt:
      "SMBs lose ~$1,200 per missed call on average. Here's how to measure your leak and plug it without hiring.",
    author: "Chaz Morales",
    date: "2026-04-12",
    readMin: 5,
    tag: "Growth",
    body: `Most businesses underestimate the cost of an unanswered phone. We surveyed 187 SMBs and found the average lifetime value of a missed inbound call was **$1,212**.

## Where the leak happens

- After-hours: 38% of inbound volume
- Lunch + handoff windows: 17%
- Surge events (campaigns, weather, news): 22%

## The fix

An always-on assistant captures the intent, qualifies the lead, and books the follow-up. Even a 50% capture rate on missed calls usually pays for the entire plan in the first month.`,
  },
  {
    slug: "from-tickets-to-conversations",
    title: "From tickets to conversations: rethinking support automation",
    excerpt:
      "Ticket-first systems were built for email. Modern support runs on grounded, multimodal conversations.",
    author: "Avery Chen",
    date: "2026-03-28",
    readMin: 7,
    tag: "Support",
    body: `Tickets were a workaround for slow email. Customers don't want tickets — they want *answers*. The shift from ticket-first to conversation-first systems is the biggest unlock in support since live chat.

## Three principles

1. Ground answers in your docs, not the model's memory.
2. Escalate on sentiment, not keyword.
3. Measure resolution, not response time.`,
  },
  {
    slug: "bant-is-dead-long-live-bant",
    title: "BANT is dead. Long live BANT (the AI version).",
    excerpt: "Why classic qualification frameworks are getting a second life through conversational AI.",
    author: "Jordan Reyes",
    date: "2026-03-09",
    readMin: 6,
    tag: "Sales",
    body: `BANT (Budget, Authority, Need, Timing) fell out of fashion because reps couldn't ask the questions without sounding like a script. Conversational AI doesn't have that problem.

ChazTalk weaves qualification into a natural flow and scores the result automatically — every time.`,
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug) || null;
}
