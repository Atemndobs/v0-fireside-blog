# Fireside Tribe – Custom CMS & Automation Architecture

This document extends the original Sanity-focused proposal with the approved **Supabase + Next.js** stack, outlines the Spotify/Riverside automation flows, and enumerates immediate implementation steps (including analytics coverage).

## 1. Target Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Database/Auth/Storage | **Supabase** | PostgreSQL (shared project) with `fireside_` prefix for every table/storage bucket. Supabase Auth for CMS editors, Storage for cover art, transcripts, and audio masters. |
| API & Functions | **Supabase Edge Functions** + Next.js **Route Handlers/Server Actions** | Edge Functions handle scheduled imports/webhooks (Spotify, Riverside). App Router actions power admin CRUD & preview endpoints. |
| Frontend | **Next.js 15 (App Router)** + Shadcn UI | Existing site, plus `/admin` tools for editorial workflows. |
| Analytics | **PostHog** (client + server events), **Sentry** (next phase) | All pages already emit `fireside_page_view` + `landing_page_view`; we continue instrumenting admin interactions and data-sync jobs. |

## 2. Data Model (Supabase)

> Full SQL lives in `docs/custom-cms/fireside_schema.sql`. Every table/trigger already uses the `fireside_` prefix so it can coexist in the shared account.

Key tables:
- `fireside_episodes`, `fireside_artists`, `fireside_blog_posts`, `fireside_categories`
- Junction tables for relations (episode guests, blog-post relationships, etc.)
- `fireside_settings` for global config (Spotify show ID, YouTube channel ID, playlist curation day, etc.)
- `fireside_sync_runs` to log each Spotify/Riverside import (status, payload, errors)

### Storage Buckets
- `fireside-media` – images (artist hero, blog cover). Public read, signed writes from admin.
- `fireside-transcripts` – raw + cleaned transcripts per episode. Private by default.
- `fireside-audio` – optional archive of mastered audio (private).
- **External Asset CDN** – static marketing assets now live in `fireside_assets` (S3).  
  - Next.js resolves assets via `NEXT_PUBLIC_ASSET_BASE_URL` (see `lib/utils/assets.ts`).  
  - Upload `/public/icons/*`, `/public/images/*`, and `icons/manifest.json` to `fireside_assets/icons/*` + `fireside_assets/images/*` so production never depends on the repo’s `public` directory.

## 3. Automation & Integrations

### Spotify Ingestion
1. **Scheduled Edge Function (`sync-spotify-episodes`)**
   - Runs nightly (or manual trigger via `/admin` button).
   - Uses Spotify Web API `GET /shows/{id}/episodes`.
   - Maps to `fireside_episodes` (title, description, published date, duration, episode URL, cover art).
   - De-duplicates by `spotify_id`. New episodes inserted, existing rows updated with status flags (`auto_synced`, `last_synced_at`).
   - Emits PostHog events:
     - `spotify_sync_started`
     - `spotify_sync_completed` (with `new_episodes_count`)
     - `spotify_sync_failed`

2. **Webhook Trigger (Optional)**
   - Spotify does not ship push webhooks for podcasts, so we rely on the scheduled sync. Optionally we can poll Spotify every hour only when a new Riverside recording is detected.

3. **Admin UI**
   - `/admin/episodes` list shows if an episode is synced (`auto_synced`) vs. manually curated.
   - Editors can override metadata (SEO, hero image, transcript status) and toggle “featured”.

### Riverside Transcript Workflow
1. **Riverside Export**
   - Riverside can send an email or webhook when a recording is finalized. If webhook access is limited, we support manual upload.
2. **Transcript Ingestion Route (`/api/transcripts/upload`)**
   - Accepts `.txt`/`.srt`/`.json` transcripts, stores them in `fireside-transcripts` bucket with metadata row in `fireside_episode_transcripts`.
   - Links to episode by `riverside_session_id` or manual selection.
3. **Optional AI Cleanup**
   - Supabase Edge Function can call OpenAI or other LLM to normalize transcripts into structured show notes. Logged in `fireside_sync_runs`.

### Weekly Playlist & Editorial Sync
- `fireside_playlists` table to reference Spotify playlist IDs and editorial notes.
- Admin tool to choose weekly “Spotlight artist”, “Trending track”, etc., tying into homepage sections.
- All updates trigger PostHog events (`cms_playlist_update`, `cms_editorial_publish`) for observability.

## 4. Analytics Coverage (per requirement)

| Surface | Events |
|---------|--------|
| Public site pages | Already capture `$pageview`, `fireside_page_view`, `landing_page_view` via `components/posthog-provider.tsx`. |
| Admin portal | Wrap `/admin` routes with the same provider, capture `cms_page_view`, `cms_item_saved`, `cms_sync_triggered`. |
| Edge functions | Send server-side PostHog events via REST (`POST /capture`) when sync jobs run. |

Sentry will be added in Phase 2 to monitor admin errors & failed imports.

## 5. Codex Agent Brief (for future automation)

When spinning up new Codex agents/tasks, share this canonical architecture:

```
Stack:
  - Next.js 15 (App Router, Shadcn UI)
  - Supabase (DB/Auth/Edge Functions/Storage) — all resources prefixed `fireside_`
  - Supabase Edge Functions for Spotify & Riverside automations
  - PostHog analytics on every public + admin page; Sentry pending
Key folders:
  - docs/custom-cms/*.md (architecture, roadmap, events, schema)
  - docs/custom-cms/fireside_schema.sql (authoritative DB schema)
  - components/posthog-provider.tsx (analytics bootstrap)
  - /app/admin (future CMS UI)
```

## 6. Immediate Next Steps (Week 0–1)

1. **Apply Supabase Schema**
   - Run `docs/custom-cms/fireside_schema.sql` in Supabase SQL editor.
   - Enable extensions `pgcrypto`, `citext`.
   - Create storage buckets `fireside-media`, `fireside-transcripts`, `fireside-audio`.
2. **RLS + Auth**
   - Public read policies for published episodes/artists/blog posts.
   - `cms_admin` role (Supabase Auth) with full CRUD.
3. **Next.js Integration**
   - Add Supabase client helpers (`lib/supabase/server.ts` & `/client.ts`).
   - Replace hardcoded homepage data with Supabase queries (incrementally).
4. **Admin Shell**
   - Scaffold `/admin` layout + route guard (requires Supabase session with `cms_admin` role).
   - Basic episodes list with Supabase data + PostHog `cms_page_view`.
5. **Spotify Edge Function Skeleton**
   - Add `supabase/functions/spotify-sync/index.ts`.
   - Store Spotify credentials in Supabase secrets.
   - Implement `GET /shows/{id}/episodes` fetch + upsert into `fireside_episodes`.
6. **Monitoring Hooks**
   - Each sync job posts to PostHog (`sync_start`, `sync_complete`, `sync_error`) and logs to `fireside_sync_runs`.

Once the above is in place, we can layer on Riverside transcript ingestion, playlist workflow, and editorial automation.

---

## 7. Admin Access & Onboarding

- `/admin/login` uses Supabase email + password (standard `signInWithPassword`). Only existing Supabase Auth users can get in; the password is set when you create/invite the user in the Supabase dashboard.
- `/admin` routes are wrapped in a client-side guard that checks the Supabase session (via `supabase.auth.getSession()`). Guests are redirected to `/admin/login`; authenticated editors keep their session locally, so they reach the dashboard immediately after logging in.
- To invite a new editor:
  1. Supabase Dashboard → Auth → Users → “Invite user” (or “Add user”) and configure their email/password.
  2. Assign the `cms_admin` role via metadata once RLS policies exist.
  3. Share `/admin/login`. After they authenticate, the guard lets them into `/admin`.
