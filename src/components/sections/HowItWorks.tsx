import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import { howItWorks } from "@/content/features";

export function HowItWorks() {
  return (
    <section className="section bg-ink-50/60">
      <Container>
        <SectionHeader
          center
          eyebrow="How it works"
          title="Live in a day. Smarter every week."
        />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((s) => (
            <li key={s.step} className="card">
              <span className="text-xs font-extrabold tracking-widest text-brand-600">{s.step}</span>
              <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{s.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
