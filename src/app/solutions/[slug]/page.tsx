import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/LeadForm";
import { DemoExperience } from "@/components/DemoExperience";
import { TrackedLink } from "@/components/TrackedLink";
import { getSolution, solutions } from "@/content/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getSolution(params.slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    openGraph: { title: s.title, description: s.description },
  };
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const sol = getSolution(params.slug);
  if (!sol) return notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden className="absolute inset-0 bg-hero-radial" />
        <Container className="relative py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow">{sol.audience}</p>
            <h1 className="mt-3 h-display">{sol.hero}</h1>
            <p className="mt-5 text-lg text-ink-600">{sol.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLink
                href={`/contact?intent=demo&solution=${sol.slug}`}
                event="cta_click"
                payload={{ location: `solution_${sol.slug}_hero`, label: "book_demo" }}
                className="btn-primary"
              >
                Book a demo
              </TrackedLink>
              <TrackedLink
                href="#demo"
                event="cta_click"
                payload={{ location: `solution_${sol.slug}_hero`, label: "try_demo" }}
                className="btn-secondary"
              >
                Try this scenario
              </TrackedLink>
            </div>

            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6">
              {sol.outcomes.map((o) => (
                <div key={o.label}>
                  <dt className="text-3xl font-extrabold text-ink-900">{o.metric}</dt>
                  <dd className="text-xs text-ink-500">{o.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="section bg-ink-50/60">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="h-section">Built for the way your team actually works.</h2>
              <ul className="mt-5 space-y-3">
                {sol.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-ink-700">
                    <span className="mt-0.5 text-brand-600">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div id="demo">
              <DemoExperience />
            </div>
          </div>
        </Container>
      </section>

      <section className="section bg-white">
        <Container tight>
          <div className="card">
            <h2 className="text-2xl font-bold">Get a tailored walkthrough</h2>
            <p className="mt-1 text-sm text-ink-600">
              Tell us about your stack and goals — we'll bring a demo trained on your knowledge.
            </p>
            <div className="mt-5">
              <LeadForm defaultIntent="demo" source={`solution_${sol.slug}`} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
