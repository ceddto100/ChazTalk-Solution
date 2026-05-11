import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-white">
      <Container tight className="py-24 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 h-display">We couldn't find that page.</h1>
        <p className="mt-3 text-ink-600">
          The conversation is alive, the page isn't. Try one of these instead:
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Home
          </Link>
          <Link href="/pricing" className="btn-secondary">
            Pricing
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact
          </Link>
        </div>
      </Container>
    </section>
  );
}
