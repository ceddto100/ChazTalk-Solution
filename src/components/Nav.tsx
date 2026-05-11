"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/80 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/65">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {nav.primary.map((item) =>
            "children" in item && item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
                  aria-expanded={solutionsOpen}
                >
                  {item.label}
                  <span className="ml-1 text-ink-400">▾</span>
                </button>
                <div
                  className={cn(
                    "absolute left-0 top-full pt-2",
                    solutionsOpen ? "block" : "hidden",
                  )}
                >
                  <div className="w-64 rounded-2xl border border-ink-100 bg-white p-2 shadow-soft">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-lg px-3 py-2 text-sm text-ink-800 hover:bg-ink-50"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/contact" className="btn-ghost text-sm">
            Sign in
          </Link>
          <Link href="/contact?intent=demo" className="btn-primary text-sm">
            Book a demo
          </Link>
        </div>
        <button
          aria-label="Open menu"
          className="rounded-lg p-2 text-ink-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </Container>
      {open && (
        <div className="border-t border-ink-100 bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {nav.primary.map((item) =>
              "children" in item && item.children ? (
                <div key={item.label} className="py-1">
                  <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-ink-500">
                    {item.label}
                  </div>
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-2 py-2 text-sm text-ink-800 hover:bg-ink-50"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-ink-800 hover:bg-ink-50"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/contact?intent=demo"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Book a demo
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
