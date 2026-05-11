import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import { PricingTable } from "@/components/PricingTable";
import { plans } from "@/content/plans";
import { faqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, conversation-based pricing for ChazTalk. Unlimited seats on every plan.",
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <SectionHeader
            center
            eyebrow="Pricing"
            title="Pay for conversations, not seats."
            description="Every plan includes unlimited team members, voice + chat, and the full integration library."
          />
          <PricingTable plans={plans} />
        </Container>
      </section>

      <section className="section bg-ink-50/60">
        <Container tight>
          <SectionHeader center eyebrow="Compare" title="What's included on every plan" />
          <div className="overflow-x-auto rounded-2xl border border-ink-100 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink-50 text-xs uppercase tracking-wider text-ink-500">
                <tr>
                  <th className="px-4 py-3">Capability</th>
                  {plans.map((p) => (
                    <th key={p.id} className="px-4 py-3 text-center">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {[
                  ["Chat widget", true, true, true],
                  ["Voice channel", false, true, true],
                  ["SMS + WhatsApp", false, true, true],
                  ["CRM integrations", false, true, true],
                  ["Custom qualification flows", false, true, true],
                  ["SSO + SCIM", false, false, true],
                  ["Data residency options", false, false, true],
                  ["Dedicated success manager", false, false, true],
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 font-medium text-ink-800">{row[0]}</td>
                    {(row.slice(1) as boolean[]).map((v, j) => (
                      <td key={j} className="px-4 py-3 text-center text-ink-600">
                        {v ? "✓" : "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container tight>
          <SectionHeader center eyebrow="Pricing FAQ" title="Common questions" />
          <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100">
            {faqs.slice(0, 4).map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between font-semibold">
                  {f.q}
                  <span className="text-ink-400 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm text-ink-600">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
