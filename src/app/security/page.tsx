import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Security & Trust",
  description:
    "How ChazTalk protects your data: SOC 2 Type II, GDPR, HIPAA-aligned controls, encryption, and isolation.",
};

const pillars = [
  {
    title: "Encryption in transit and at rest",
    body: "TLS 1.3 for all traffic. AES-256 for data at rest. Per-tenant key envelopes and HSM-backed key management.",
  },
  {
    title: "Compliance",
    body: "SOC 2 Type II audited. GDPR-compliant. HIPAA Business Associate Agreement available on Scale.",
  },
  {
    title: "Never trained on your data",
    body: "We don't use customer conversations to train shared foundation models. Period.",
  },
  {
    title: "Role-based access + SSO",
    body: "SAML SSO, SCIM provisioning, granular roles, and signed audit logs streamed to your SIEM.",
  },
  {
    title: "PII redaction",
    body: "Automatic redaction of credit cards, SSNs, and customer-defined patterns before storage.",
  },
  {
    title: "Data residency",
    body: "Choose US, EU, or APAC residency. Per-tenant isolation in dedicated databases on Scale.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <SectionHeader
            eyebrow="Security & Trust"
            title="Built for businesses that take data seriously."
            description="Your customers trust you with their data. We treat that trust like our own product."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="card">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  🔒
                </div>
                <h3 className="mt-3 text-base font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-ink-600">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="section bg-ink-50/60">
        <Container tight>
          <div className="card">
            <h2 className="text-2xl font-bold">Need a deeper review?</h2>
            <p className="mt-1 text-sm text-ink-600">
              Request our SOC 2 report, security questionnaire responses, or DPA. We typically
              respond within one business day.
            </p>
            <a className="btn-primary mt-4" href="/contact?intent=sales&topic=security">
              Request security pack
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
