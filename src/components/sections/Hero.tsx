import { Container } from "@/components/ui/Container";
import { TrackedLink } from "@/components/TrackedLink";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden className="absolute inset-0 bg-hero-radial" />
      <div aria-hidden className="absolute inset-0 surface-grid opacity-60" />
      <Container className="relative py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="chip mb-5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live · 24/7 · &lt;2s response
            </span>
            <h1 className="h-display">
              AI conversations that <span className="gradient-text">never sleep.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-600">
              ChazTalk answers every call, chat, and message — qualifying leads, resolving support,
              and running your day around the clock. Set it up before lunch. Sleep tonight.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <TrackedLink
                href="/contact?intent=demo"
                event="cta_click"
                payload={{ location: "hero", label: "book_demo" }}
                className="btn-primary"
              >
                Book a demo →
              </TrackedLink>
              <TrackedLink
                href="#demo"
                event="cta_click"
                payload={{ location: "hero", label: "try_demo" }}
                className="btn-secondary"
              >
                Try the demo
              </TrackedLink>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-left">
              <Stat k="<2s" v="response time" />
              <Stat k="70%" v="ticket deflection" />
              <Stat k="2.1×" v="qualified leads" />
            </dl>
          </div>

          <div className="relative animate-fade-up">
            <div className="rounded-3xl border border-ink-100 bg-white p-3 shadow-soft">
              <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-white p-5">
                <div className="flex items-center justify-between border-b border-ink-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-semibold text-ink-500">live · web chat</span>
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <Msg role="user">Hey, do you have anyone available tonight for a tooth chip?</Msg>
                  <Msg role="bot">
                    Yes — Dr. Alvarez is on call. I can warm-transfer you now or book first thing
                    tomorrow at 8 AM. Which works?
                  </Msg>
                  <Msg role="user">Transfer me please.</Msg>
                  <Msg role="bot">
                    Connecting in 4 seconds. I've forwarded your insurance and last visit notes.
                  </Msg>
                </div>
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-3 py-2 text-xs text-ink-500">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-brand-700">
                    AI
                  </span>
                  ChazTalk · resolved in 3 turns · CSAT 5/5
                </div>
              </div>
            </div>
            <div className="absolute -right-6 -top-6 hidden h-24 w-24 rounded-2xl bg-brand-100 blur-2xl lg:block" />
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-wider text-ink-500">
          <span>Trusted by teams at</span>
          {["Loomly", "Northwind", "Bayside", "Hearth & Hammer", "Crestline", "Inkwell"].map(
            (n) => (
              <span key={n} className="font-semibold text-ink-700/70">
                {n}
              </span>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-2xl font-extrabold text-ink-900">{k}</dt>
      <dd className="text-xs text-ink-500">{v}</dd>
    </div>
  );
}

function Msg({ role, children }: { role: "user" | "bot"; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="rounded-2xl rounded-br-sm bg-brand-600 px-3 py-2 text-white">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-sm border border-ink-100 bg-white px-3 py-2 text-ink-900">
        {children}
      </div>
    </div>
  );
}
