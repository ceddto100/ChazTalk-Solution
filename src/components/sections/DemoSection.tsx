import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import { DemoExperience } from "@/components/DemoExperience";

export function DemoSection() {
  return (
    <section className="section bg-ink-50/60" id="demo">
      <Container>
        <SectionHeader
          eyebrow="Try it now"
          title="A 60-second taste of an AI voice agent."
          description="Pick a scenario and see how an automated phone conversation can capture details, route requests, and trigger follow-up."
        />
        <DemoExperience />
      </Container>
    </section>
  );
}
