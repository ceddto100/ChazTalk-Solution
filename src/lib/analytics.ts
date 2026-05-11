// Lightweight client-side analytics abstraction.
// Persists UTM params on first visit and posts structured events to /api/events.

const UTM_KEY = "ct_utm";
const SESSION_KEY = "ct_sid";

export type Utm = Partial<
  Record<"source" | "medium" | "campaign" | "term" | "content", string>
>;

export function captureUtm(): Utm | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const u: Utm = {};
  (["source", "medium", "campaign", "term", "content"] as const).forEach((k) => {
    const v = params.get(`utm_${k}`);
    if (v) u[k] = v.slice(0, 120);
  });
  if (Object.keys(u).length > 0) {
    try {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(u));
    } catch {
      /* ignore */
    }
    return u;
  }
  return getUtm();
}

export function getUtm(): Utm | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    return raw ? (JSON.parse(raw) as Utm) : null;
  } catch {
    return null;
  }
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = cryptoRandomId();
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return "anon";
  }
}

function cryptoRandomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function track(name: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        name,
        path: window.location.pathname,
        sessionId: getSessionId(),
        payload,
        utm: getUtm() ?? undefined,
      }),
    });
  } catch {
    // never break UX on tracking failure
  }
}
