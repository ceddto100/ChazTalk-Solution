import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section className="section bg-ink-50/60">
      <Container>
        <SectionHeader
          center
          eyebrow="Customer impact"
          title="The proof is in the pipeline."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card flex flex-col">
              {t.metric && (
                <span className="chip mb-3 border-brand-200 bg-brand-50 text-brand-700">
                  {t.metric}
                </span>
              )}
              <blockquote className="text-base text-ink-800">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-ink-600">
                <span className="font-semibold text-ink-900">{t.name}</span> · {t.role},{" "}
                {t.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
