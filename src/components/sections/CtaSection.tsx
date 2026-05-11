import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/LeadForm";

export function CtaSection() {
  return (
    <section className="section bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h-section text-white">Ready to never miss another customer?</h2>
            <p className="mt-3 max-w-xl text-brand-50/90">
              Book a 20-minute demo. We'll bring an assistant trained on your website live, and
              show you the conversations it would have handled last night.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-brand-50/90">
              {[
                "Set up in a day, not a quarter",
                "Connected to your CRM and calendar",
                "No long-term contracts",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 text-white">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-6 text-ink-900 shadow-soft">
            <LeadForm defaultIntent="demo" source="home_cta" />
          </div>
        </div>
      </Container>
    </section>
  );
}
