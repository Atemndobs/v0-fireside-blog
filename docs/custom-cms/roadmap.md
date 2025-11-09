# Fireside Tribe CMS Roadmap

This plan tracks the work required to move from the current static content setup to a custom Supabase-backed CMS with an internal admin experience and full analytics coverage.

## Phase 0 – Instrumentation & Observability
1. ✅ **Wire PostHog in Next.js** (client provider, SPA page views, env-driven host). _Status: Completed in this change._
2. ✅ **Global page view & landing metrics events** (`fireside_page_view`, `landing_page_view`) emitted on every navigation for visitor counting.
3. 🔲 **Create baseline dashboards inside PostHog** (traffic, artist/episode engagement, funnel from homepage → episode).
4. 🔲 **Instrument critical UI interactions** (podcast play CTA, artist profile clicks, outbound links) via `posthog.capture` hooks once Supabase auth layer is in place.

## Phase 1 – Deployment Hygiene
1. 🔲 **Audit current Vercel project** (environment variables parity with `.env.local`, ensure preview deployments enabled).
2. 🔲 **Add health checks & error tracking** (Sentry DSN already available; confirm `next.config.mjs` + build step upload source maps).
3. 🔲 **Set up release checklist** (lint/test gates, manual QA checklist covering new CMS-powered surfaces).

## Phase 2 – Supabase Data Foundation
1. ✅ **Author canonical schema** (`docs/custom-cms/fireside_schema.sql`) with the `fireside_` prefix for all tables plus automation logs.
2. 🔲 **Apply schema to Supabase** (run via SQL editor or `supabase db push`; verify extensions `pgcrypto`/`citext` are enabled).
3. 🔲 **Configure Row Level Security**  
   - Public read-only access for published episodes, artists, posts.  
   - Authenticated editor role with full CRUD.  
   - Service role for Next.js server actions.
4. 🔲 **Set up storage buckets** for media (artist avatars, blog hero images) with signed URL helpers.
5. 🔲 **Seed initial content** (migrate hard-coded data into Supabase via seed scripts or admin UI placeholder forms).

## Phase 3 – Backend & Admin Experience
1. 🔲 **Server layer**  
   - Create `lib/supabase/server.ts` helpers + typed repositories per entity.  
   - Add server actions / route handlers for CRUD, applying prefix-aware tables.
2. 🔲 **Authentication & authorization**  
   - Use Supabase Auth (Google + magic link).  
   - Define `cms_admin` role for internal editors.  
   - Add middleware to protect `/admin`.
3. 🔲 **Admin UI**  
   - Build `/admin` app segment with TanStack Table or similar.  
   - Forms powered by React Hook Form + Zod, including image uploads + PostHog identify events.
4. 🔲 **Content API contracts** (shared Zod schemas, caching strategy, ISR revalidation hooks per entity).

## Phase 4 – Automation & Integrations
1. 🔲 **YouTube + Spotify ingestion**  
   - Supabase Edge Functions scheduled daily.  
   - Persist runs in `fireside_sync_runs`; mark affected episodes as `auto_synced`.
2. 🔲 **Webhook-triggered rebuilds** (call Vercel deploy hook whenever CMS content changes).
3. 🔲 **Analytics enrichment** (link Supabase user IDs to PostHog distinct IDs, send CMS action events for auditing).

## Phase 5 – Launch Readiness
1. 🔲 **Migration dry run** (flip pages to fetch from Supabase, compare against static content).
2. 🔲 **Performance budgeting** (measure TTFB/LCP after CMS switch, ensure PostHog snippet remains deferred).
3. 🔲 **Documentation & handoff** (update runbooks, admin guides, incident response tied to PostHog + Sentry alerts).

## Open Questions
- Desired hosting region for Supabase (affects latency and compliance).
- Target editor workflows (do we need draft/review states or scheduled publishing on day one?).
- Requirements for multi-language support or future multi-brand use of the shared database.

> _Next immediate actions_: Publish the PostHog dashboard, run the schema against Supabase with the `fireside_` prefix, then scaffold the `/admin` area backed by Supabase auth.
