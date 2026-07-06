import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import { plans } from "@/content/plans";
import { PricingTable } from "@/components/PricingTable";

export function PricingPreview() {
  return (
    <section className="section bg-white" id="pricing-preview">
      <Container>
        <SectionHeader
          center
          eyebrow="Pricing"
          title="Simple pricing for voice AI automation"
          description="Start with automated call handling, then expand into lead routing, appointment scheduling, support, and workflow automation."
        />
        <PricingTable plans={plans} />
        <div className="mt-8 text-center">
          <Link href="/pricing" className="btn-secondary">
            See full pricing details →
          </Link>
        </div>
      </Container>
    </section>
  );
}
