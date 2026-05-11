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
          description="Move the sliders to estimate hours saved and dollars freed across your phone, chat, and ticket queue."
        />
        <RoiCalculator />
      </Container>
    </section>
  );
}
