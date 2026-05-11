export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We went from missing 1 in 4 after-hours calls to capturing every single one. ChazTalk paid for itself in the first three weeks.",
    name: "Maya Alvarez",
    role: "Owner",
    company: "Bayside Dental Group",
    metric: "+42% booked appointments",
  },
  {
    quote:
      "Our SDRs only get pre-qualified, BANT-scored leads now. Same headcount, double the demos.",
    name: "Daniel Park",
    role: "VP Revenue",
    company: "Northwind SaaS",
    metric: "2.1× demo pipeline",
  },
  {
    quote:
      "Setup took an afternoon. Within a week we deflected 63% of tier-1 tickets without lowering CSAT.",
    name: "Priya Shankar",
    role: "Head of Support",
    company: "Loomly",
    metric: "63% ticket deflection",
  },
];

export const logos = [
  "Loomly",
  "Northwind",
  "Bayside Dental",
  "Hearth & Hammer",
  "Crestline Auto",
  "Inkwell Studio",
];
