import Link from "next/link";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { nav, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-100 bg-ink-50/60">
      <Container className="grid gap-10 py-14 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink-600">{site.description}</p>
          <p className="mt-4 text-sm text-ink-600">
            <a className="hover:text-brand-700" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
          </p>
        </div>
        {nav.footer.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              {col.title}
            </h4>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-700 hover:text-brand-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-ink-100">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 md:flex-row">
          <p className="text-xs text-ink-500">© {year} ChazTalk. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-ink-500">
            <Link href="/security">Security</Link>
            <Link href="/contact">Contact</Link>
            <span aria-hidden>·</span>
            <span>Made for businesses that never sleep.</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
