export const site = {
  name: "Chat Talk Solutions",
  tagline: "Voice AI agents for businesses.",
  description:
    "Chat Talk Solutions is an AI agency that builds voice AI agents and automation systems to answer calls, qualify leads, schedule appointments, support customers, and trigger follow-up workflows automatically.",
  url: "https://chaztalk.com",
  socials: {
    twitter: "@chaztalk",
    linkedin: "https://www.linkedin.com/company/chaztalk",
  },
  contactEmail: "hello@chaztalk.com",
};

export const nav = {
  primary: [
    {
      label: "Solutions",
      children: [
        { label: "SMB Support", href: "/solutions/smb-support" },
        { label: "Lead Qualification", href: "/solutions/lead-qualification" },
        { label: "Workflow Automation", href: "/solutions/personal-assistant" },
      ],
    },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/integrations" },
    { label: "Security", href: "/security" },
    { label: "Blog", href: "/blog" },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { label: "Solutions", href: "/solutions/smb-support" },
        { label: "Pricing", href: "/pricing" },
        { label: "Integrations", href: "/integrations" },
        { label: "Security", href: "/security" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Get started",
      links: [
        { label: "Book a demo", href: "/contact?intent=demo" },
        { label: "Try the demo", href: "/#demo" },
      ],
    },
  ],
};
