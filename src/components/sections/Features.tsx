import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import { features } from "@/content/features";

export function Features() {
  return (
    <section className="section bg-white">
      <Container>
        <SectionHeader
          eyebrow="Features"
          title="One assistant. Every channel. Zero downtime."
          description="ChazTalk is grounded in your knowledge, tuned to your voice, and built for the workflows your team already loves."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card transition hover:shadow-glow">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-xl">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{f.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
