import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getPost, posts } from "@/content/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return notFound();

  return (
    <article className="bg-white">
      <Container tight className="py-16 md:py-24">
        <Link href="/blog" className="text-sm text-brand-700 hover:underline">
          ← All posts
        </Link>
        <span className="chip mt-4">{post.tag}</span>
        <h1 className="mt-3 h-display">{post.title}</h1>
        <p className="mt-3 text-sm text-ink-500">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          · {post.readMin} min read · {post.author}
        </p>
        <div className="prose-styled mt-8">
          {post.body.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-8 text-2xl font-bold">
                  {block.slice(3)}
                </h2>
              );
            }
            if (block.startsWith("- ")) {
              return (
                <ul key={i} className="my-4 list-disc space-y-1 pl-5 text-ink-700">
                  {block.split("\n").map((li, j) => (
                    <li key={j}>{li.replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\. /.test(block)) {
              return (
                <ol key={i} className="my-4 list-decimal space-y-1 pl-5 text-ink-700">
                  {block.split("\n").map((li, j) => (
                    <li key={j}>{li.replace(/^\d+\.\s/, "")}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p
                key={i}
                className="my-4 text-base leading-relaxed text-ink-700"
                dangerouslySetInnerHTML={{
                  __html: block.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            );
          })}
        </div>
      </Container>
    </article>
  );
}
