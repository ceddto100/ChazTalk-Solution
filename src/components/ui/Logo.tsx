import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2 ${className ?? ""}`}>
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft transition group-hover:shadow-glow"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M5 8a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H10l-4 3v-3a4 4 0 0 1-1-4Z" />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">
        Chaz<span className="text-brand-600">Talk</span>
      </span>
    </Link>
  );
}
