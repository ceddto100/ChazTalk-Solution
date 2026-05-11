import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import { integrations } from "@/content/integrations";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Native CRM, helpdesk, calendar, and telephony integrations for ChazTalk.",
};

export default function IntegrationsPage() {
  const categories = Array.from(new Set(integrations.map((i) => i.category)));
  return (
    <>
      <section className="bg-white">
        <Container className="py-16 md:py-24">
          <SectionHeader
            eyebrow="Integrations"
            title="Plug into the stack you already love."
            description="Bi-directional sync with your CRM, helpdesk, calendar, and phone. Build anything with our typed REST API."
          />
          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-500">
                {cat}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {integrations
                  .filter((i) => i.category === cat)
                  .map((i) => (
                    <div key={i.name} className="card">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 font-bold text-brand-700">
                          {i.name[0]}
                        </span>
                        <h3 className="font-semibold">{i.name}</h3>
                      </div>
                      <p className="mt-3 text-sm text-ink-600">{i.blurb}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
