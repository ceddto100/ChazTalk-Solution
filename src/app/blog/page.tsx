import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Operator-grade posts on AI conversation design, support automation, and growth.",
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return (
    <section className="bg-white">
      <Container className="py-16 md:py-24">
        <SectionHeader
          eyebrow="Blog"
          title="Operator-grade notes on AI conversations."
          description="Field reports, playbooks, and short reads on running ChazTalk in the real world."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card group transition hover:shadow-glow">
              <span className="chip">{p.tag}</span>
              <h3 className="mt-3 text-lg font-semibold group-hover:text-brand-700">{p.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{p.excerpt}</p>
              <p className="mt-4 text-xs text-ink-500">
                {new Date(p.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {p.readMin} min read · {p.author}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
