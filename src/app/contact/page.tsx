import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { ContactBody } from "./ContactBody";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a demo, talk to sales, or send us a note.",
};

export default function ContactPage() {
  return (
    <section className="bg-white">
      <Container className="py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h1 className="mt-3 h-display">Let's build your assistant.</h1>
            <p className="mt-4 text-lg text-ink-600">
              Tell us about your channels, volume, and goals. We'll bring a tailored demo trained
              on your knowledge base.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ink-700">
              <li className="flex gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  ⚡
                </span>
                Reply within 1 business day
              </li>
              <li className="flex gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  🔒
                </span>
                Your info is never shared
              </li>
              <li className="flex gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  💬
                </span>
                Prefer email? Write{" "}
                <a className="text-brand-700 hover:underline" href="mailto:hello@chaztalk.com">
                  hello@chaztalk.com
                </a>
              </li>
            </ul>
          </div>
          <div className="card">
            <Suspense fallback={<div className="text-sm text-ink-500">Loading form…</div>}>
              <ContactBody />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
