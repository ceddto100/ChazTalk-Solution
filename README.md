# ChazTalk

> AI conversations that never sleep.

A production-oriented marketing + lead-generation site for **ChazTalk** — an AI conversational
assistant for businesses and individuals (voice + chat automation, lead capture, support
automation, and personal productivity).

This is a from-scratch rebuild using a modern Next.js architecture. The previous static site has
been intentionally retired; only `CNAME` and favicon assets were preserved.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) + React 18 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + custom design tokens |
| Validation | Zod |
| Database | SQLite via Prisma (swap `provider` to `postgresql` for prod) |
| Tests | Vitest |
| Lint / Format | ESLint (Next config) + Prettier + `prettier-plugin-tailwindcss` |

---

## Quick start

```bash
cp .env.example .env
npm install
npx prisma db push       # creates prisma/dev.db
npm run dev              # http://localhost:3000
```

Other useful scripts:

```bash
npm run build            # generates Prisma client + Next.js production build
npm start                # serve the production build
npm test                 # run unit/integration tests
npm run lint             # eslint
npm run format           # prettier --write
```

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | yes | Connection string. SQLite by default (`file:./prisma/dev.db`). For Postgres, set to a `postgresql://…` URL and change the `provider` in `prisma/schema.prisma`. |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical site URL. Used for metadata, sitemap, and JSON-LD. |
| `LEAD_WEBHOOK_URL` | no | Optional outbound webhook fired on each new lead. |

---

## Architecture

```
src/
├─ app/                       # Next.js App Router
│  ├─ api/
│  │  ├─ health/route.ts      # GET  /api/health
│  │  ├─ leads/route.ts       # POST /api/leads
│  │  ├─ roi/route.ts         # POST /api/roi
│  │  ├─ events/route.ts      # POST /api/events
│  │  └─ demo/route.ts        # POST /api/demo  (transcript save)
│  ├─ blog/                   # /blog and /blog/[slug]
│  ├─ contact/                # /contact (uses UTM-aware lead form)
│  ├─ integrations/           # /integrations
│  ├─ pricing/                # /pricing
│  ├─ security/               # /security
│  ├─ solutions/[slug]/       # /solutions/{smb-support|lead-qualification|personal-assistant}
│  ├─ layout.tsx              # Root layout (Nav + Footer + Analytics)
│  ├─ page.tsx                # Home page
│  ├─ sitemap.ts              # /sitemap.xml
│  ├─ robots.ts               # /robots.txt
│  └─ not-found.tsx
├─ components/
│  ├─ sections/               # Composable home page sections
│  ├─ ui/                     # Primitives (Container, SectionHeader, Logo)
│  ├─ Nav.tsx · Footer.tsx
│  ├─ LeadForm.tsx            # Lead capture form (server-validated)
│  ├─ RoiCalculator.tsx       # Live ROI calculator
│  ├─ DemoExperience.tsx      # Interactive scripted demo
│  ├─ PricingTable.tsx        # Monthly/annual toggle + featured plan
│  ├─ TrackedLink.tsx         # Tracks CTA clicks via /api/events
│  └─ AnalyticsProvider.tsx   # Mounts UTM capture + page_view on first render
├─ content/                   # CMS-like typed content layer
│  ├─ site.ts                 # Site metadata + navigation
│  ├─ features.ts             # Feature list + "How it works" steps
│  ├─ plans.ts                # Pricing plans
│  ├─ solutions.ts            # /solutions/* content
│  ├─ testimonials.ts
│  ├─ integrations.ts
│  ├─ faqs.ts
│  └─ blog.ts                 # Inline markdown-ish blog posts
└─ lib/
   ├─ db.ts                   # Prisma client singleton
   ├─ roi.ts                  # ROI calculation (pure function, tested)
   ├─ validation.ts           # Zod schemas for all API inputs
   ├─ analytics.ts            # Client-side UTM/session/event helpers
   ├─ demoScript.ts           # Branching scripts for the Demo Experience
   └─ utils.ts                # cn(), currency/number formatters, SITE_URL
```

### Data model (Prisma)

- **Lead** — name, email, company, phone, message, intent, source, UTM fields.
- **RoiReport** — calculator inputs + computed results.
- **Event** — generic event log (page_view, cta_click, form_submit, calculator_run, demo_start…).
- **DemoSession** — saved transcripts from the on-page demo.

Switching to Postgres in production:

1. Change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma`.
2. Set `DATABASE_URL` to your Postgres URL.
3. Run `npx prisma migrate deploy` (or `prisma db push` for dev).

---

## What's dynamic

- **Lead form** (used on contact, home CTA, and every solution page) posts to `/api/leads`,
  validated server-side with Zod, persisted in Prisma, and optionally forwarded to a webhook.
- **ROI calculator** runs on every slider move, then can save the report to `/api/roi`.
- **Demo experience** plays a branching scripted conversation (3 scenarios) with typing
  indicators and a `Save transcript` action that posts to `/api/demo`.
- **UTM capture** persists `utm_*` query params for the session and attaches them to every
  lead, ROI report, and event.
- **Event tracking** — every CTA click, page view, form submit, calculator run, and demo
  turn streams to `/api/events`.
- **Pricing toggle** (monthly vs. annual) re-prices the plans live.
- **Sitemap** is generated from the content layer at build time.

---

## Tests

```bash
npm test
```

Current suites:

- `tests/roi.test.ts` — pure ROI calculation (math, clamping, edge cases).
- `tests/validation.test.ts` — Zod schemas for the lead, ROI, and event APIs.

The build is also a meaningful smoke test: `npm run build` compiles, type-checks, lints, and
statically renders every page.

---

## Deployment

The app is a stock Next.js application and runs anywhere Next.js does:

- **Vercel:** zero-config. Set `DATABASE_URL` (Postgres recommended) + `NEXT_PUBLIC_SITE_URL`.
- **Docker / Node host:** `npm run build && npm start`.

`CNAME` and the favicon assets live in `public/` and are served at the site root.

---

## What was implemented

- Modern Next.js 14 App Router scaffold with strict TypeScript and Tailwind.
- Nine pages: Home, three Solutions, Pricing, Integrations, Security, Blog (index + post),
  Contact, plus a 404.
- Sticky nav with dropdown, mobile menu, and accessible focus states.
- Hero, Features, How-it-works, ROI calculator, Demo experience, Testimonials, Pricing
  preview, FAQ, and a closing CTA section with the lead form embedded.
- Typed content layer for plans, features, testimonials, FAQs, integrations, solutions,
  and blog posts.
- Five API routes (`health`, `leads`, `roi`, `events`, `demo`), each validated with Zod and
  persisted via Prisma.
- Per-page metadata, Open Graph, Twitter cards, `sitemap.xml`, `robots.txt`, and JSON-LD for
  Organization + SoftwareApplication on the home page.
- ESLint + Prettier + Tailwind-aware formatting + Vitest with 11 passing tests.

## What is dynamic vs. static

- **Static (prerendered):** marketing pages, blog index and posts, solution pages.
- **Dynamic (server-rendered on demand):** all `/api/*` routes.
- **Client-interactive:** Nav dropdown, pricing toggle, lead form, ROI calculator,
  demo experience, analytics provider.

## Future enhancements

- Replace inline blog content with MDX files or a headless CMS (Contentful, Sanity).
- Plug a real LLM into the Demo Experience for free-form messages (currently scripted
  branching).
- Add Playwright end-to-end tests for the lead funnel.
- Email + Slack notifications on `lead.created`.
- Per-tenant data residency + multi-region Prisma setup.
- Internationalization (English, Spanish, French to start).
- Lighthouse + Core Web Vitals dashboards.
