"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export function TrackedLink({
  event,
  payload,
  href,
  className,
  children,
}: {
  event: string;
  payload?: Record<string, unknown>;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => void track(event, { href, ...payload })}
    >
      {children}
    </Link>
  );
}
