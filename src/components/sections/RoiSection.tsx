import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import { RoiCalculator } from "@/components/RoiCalculator";

export function RoiSection() {
  return (
    <section className="section bg-white" id="roi">
      <Container>
        <SectionHeader
          eyebrow="ROI Calculator"
          title="See your payback in seconds."
          description="Move the sliders to estimate hours saved and revenue recovered by automating inbound calls, lead capture, scheduling, and routine support."
        />
        <RoiCalculator />
      </Container>
    </section>
  );
}
