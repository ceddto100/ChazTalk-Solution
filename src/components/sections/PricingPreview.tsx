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
          title="Simple, conversation-based pricing"
          description="Unlimited team seats on every plan. Pay for conversations, not chairs."
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
