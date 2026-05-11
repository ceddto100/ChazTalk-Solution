"use client";

import { useEffect, useRef, useState } from "react";
import { demoScripts, type DemoNode, type DemoScript } from "@/lib/demoScript";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Transcript = { role: "user" | "assistant"; text: string; ts: number }[];

export function DemoExperience() {
  const [scenario, setScenario] = useState<DemoScript["id"]>("support");
  const script = demoScripts[scenario];
  const [nodeId, setNodeId] = useState(script.start);
  const [transcript, setTranscript] = useState<Transcript>([]);
  const [typing, setTyping] = useState(false);
  const [collectValue, setCollectValue] = useState("");
  const [ended, setEnded] = useState<{ outcome: string; message: string } | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNodeId(script.start);
    setTranscript([]);
    setEnded(null);
    setSavedId(null);
    void track("demo_start", { scenario });
    showBot(script.nodes[script.start]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [transcript, typing]);

  function pushBot(text: string) {
    setTyping(true);
    const delay = Math.min(900, 250 + text.length * 12);
    setTimeout(() => {
      setTyping(false);
      setTranscript((t) => [...t, { role: "assistant", text, ts: Date.now() }]);
    }, delay);
  }

  function showBot(node: DemoNode) {
    pushBot(node.bot);
    if (node.end) {
      setTimeout(() => setEnded(node.end!), 1100);
    }
  }

  function pickChoice(label: string, next: string) {
    setTranscript((t) => [...t, { role: "user", text: label, ts: Date.now() }]);
    void track("demo_turn", { scenario, next });
    const nextNode = script.nodes[next];
    setNodeId(next);
    showBot(nextNode);
  }

  function submitCollect(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const node = script.nodes[nodeId];
    if (!node.collect) return;
    if (!collectValue.trim()) return;
    setTranscript((t) => [...t, { role: "user", text: collectValue, ts: Date.now() }]);
    const next = node.collect.next;
    setCollectValue("");
    setNodeId(next);
    showBot(script.nodes[next]);
  }

  async function saveTranscript() {
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario, transcript, outcome: ended?.outcome ?? "abandoned" }),
      });
      const json = await res.json();
      if (json.id) setSavedId(json.id);
      void track("demo_save", { scenario });
    } catch {
      /* ignore */
    }
  }

  const current = script.nodes[nodeId];

  return (
    <div className="card overflow-hidden p-0">
      <div className="flex flex-wrap gap-2 border-b border-ink-100 bg-ink-50/60 p-3">
        {(Object.keys(demoScripts) as DemoScript["id"][]).map((id) => (
          <button
            key={id}
            onClick={() => setScenario(id)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              scenario === id
                ? "bg-brand-600 text-white shadow-soft"
                : "bg-white text-ink-700 hover:bg-ink-100",
            )}
          >
            {demoScripts[id].title}
          </button>
        ))}
      </div>

      <div className="grid gap-0 md:grid-cols-5">
        <div className="border-b border-ink-100 p-5 md:col-span-2 md:border-b-0 md:border-r">
          <p className="eyebrow">Scenario</p>
          <h3 className="mt-1 text-lg font-semibold">{script.title}</h3>
          <p className="mt-2 text-sm text-ink-600">{script.blurb}</p>
          {ended && (
            <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-3 text-sm text-brand-900">
              <p className="font-semibold capitalize">{ended.outcome}</p>
              <p className="mt-1 text-brand-800">{ended.message}</p>
              <button
                onClick={saveTranscript}
                className="btn-secondary mt-3 w-full text-xs"
                disabled={!!savedId}
              >
                {savedId ? "Transcript saved ✓" : "Save transcript"}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:col-span-3">
          <div
            ref={scrollRef}
            className="max-h-96 min-h-72 flex-1 space-y-2 overflow-y-auto bg-white p-4"
            aria-live="polite"
          >
            {transcript.map((m, i) => (
              <Bubble key={i} role={m.role}>
                {m.text}
              </Bubble>
            ))}
            {typing && (
              <Bubble role="assistant">
                <span className="inline-flex gap-1">
                  <Dot /> <Dot delay={0.15} /> <Dot delay={0.3} />
                </span>
              </Bubble>
            )}
          </div>

          <div className="border-t border-ink-100 p-3">
            {!ended && current.choices && !typing && (
              <div className="flex flex-wrap gap-2">
                {current.choices.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => pickChoice(c.label, c.next)}
                    className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-800 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
            {!ended && current.collect && !typing && (
              <form onSubmit={submitCollect} className="flex items-center gap-2">
                <input
                  className="input"
                  value={collectValue}
                  onChange={(e) => setCollectValue(e.target.value)}
                  placeholder={current.collect.placeholder}
                  type={current.collect.key === "email" ? "email" : "text"}
                  autoFocus
                />
                <button type="submit" className="btn-primary text-sm">
                  Send
                </button>
              </form>
            )}
            {ended && (
              <button
                onClick={() => setScenario(scenario)}
                className="btn-secondary w-full text-sm"
              >
                Replay scenario
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm",
          isUser
            ? "bg-brand-600 text-white rounded-br-sm"
            : "bg-ink-50 text-ink-900 rounded-bl-sm",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ink-400"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}
