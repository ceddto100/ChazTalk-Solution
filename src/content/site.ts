export const site = {
  name: "ChazTalk",
  tagline: "AI conversations that never sleep.",
  description:
    "ChazTalk is an AI conversational assistant for businesses and individuals — voice and chat automation that captures leads, resolves support, and runs your day, 24/7.",
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
        { label: "Personal Assistant", href: "/solutions/personal-assistant" },
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
