"use client";

import { useState } from "react";
import { getUtm, track } from "@/lib/analytics";

type Intent = "demo" | "contact" | "sales";

interface Props {
  defaultIntent?: Intent;
  source?: string;
  compact?: boolean;
}

export function LeadForm({ defaultIntent = "contact", source, compact }: Props) {
  const [intent, setIntent] = useState<Intent>(defaultIntent);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      phone: String(data.get("phone") || ""),
      message: String(data.get("message") || ""),
      intent,
      source: source || (typeof window !== "undefined" ? window.location.pathname : undefined),
      utm: getUtm() ?? undefined,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      void track("form_submit", { form: "lead", intent });
      setStatus("success");
      form.reset();
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600">
          ✓
        </div>
        <h3 className="text-lg font-semibold">Thanks — we're on it.</h3>
        <p className="mt-1 text-sm text-ink-600">
          A ChazTalk specialist will reach out within one business day.
        </p>
        <button
          className="btn-secondary mt-4"
          onClick={() => setStatus("idle")}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <div className="flex flex-wrap gap-2">
        {(["demo", "contact", "sales"] as Intent[]).map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIntent(i)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize transition ${
              intent === i
                ? "border-brand-600 bg-brand-50 text-brand-700"
                : "border-ink-200 bg-white text-ink-700 hover:border-ink-300"
            }`}
            aria-pressed={intent === i}
          >
            {i === "demo" ? "Book a demo" : i === "sales" ? "Talk to sales" : "Contact"}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            Full name
          </label>
          <input id="name" name="name" required minLength={2} className="input" placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="email" className="label">
            Work email
          </label>
          <input id="email" name="email" type="email" required className="input" placeholder="jane@company.com" />
        </div>
        <div>
          <label htmlFor="company" className="label">
            Company
          </label>
          <input id="company" name="company" className="input" placeholder="Acme Inc." />
        </div>
        <div>
          <label htmlFor="phone" className="label">
            Phone (optional)
          </label>
          <input id="phone" name="phone" className="input" placeholder="+1 555 123 4567" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label">
          What would you like ChazTalk to handle?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="textarea"
          placeholder="Tell us about your volume, channels, and goals."
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary w-full md:w-auto" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : intent === "demo" ? "Book my demo" : "Send"}
      </button>
      <p className="text-xs text-ink-500">
        By submitting, you agree to be contacted about ChazTalk. We don't share your info.
      </p>
    </form>
  );
}
