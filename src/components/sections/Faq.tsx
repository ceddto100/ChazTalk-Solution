import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import { faqs } from "@/content/faqs";

export function Faq() {
  return (
    <section className="section bg-white">
      <Container tight>
        <SectionHeader center eyebrow="FAQ" title="The short answers." />
        <div className="divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer items-center justify-between text-base font-semibold text-ink-900">
                {f.q}
                <span className="ml-4 text-ink-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-ink-600">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
