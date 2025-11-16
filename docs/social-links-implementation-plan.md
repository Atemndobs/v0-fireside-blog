# Social Links & Follow Experience Implementation Plan

Last updated: Nov 16, 2025

## 1. Centralized social links data + CMS controls (Foundation)

1. **Database schema**
   - Create a new table (prefix required per AGENT rules, e.g., `fs_social_links`) via migration `docs/custom-cms/migrations/004_add_social_links.sql`.
   - Columns: `id uuid PK`, `platform text`, `label text`, `url text`, `icon_slug text`, `priority int`, `zones text[]` (surfaces such as `episodes_cta`, `footer`, `connect_page`), `is_featured boolean`, timestamps.
   - Seed initial rows for Spotify, YouTube, Instagram, TikTok in `docs/custom-cms/seeds/initial_content.sql` or follow-up seed.

2. **Data access layer**
   - Add `lib/repositories/social-links.ts` with helpers: `getSocialLinks(zone?)`, `createSocialLink`, `updateSocialLink`, `deleteSocialLink`.
   - Ensure existing Supabase client is used consistently and that RLS policies mirror other public-facing tables.

3. **CMS management UI**
   - Extend the custom CMS (check `/app/(admin)` area) with a "Social Links" section.
   - Provide list view (sortable by `priority`) and form modal (fields: platform select, label, URL, icon, zones multi-select, featured toggle).
   - Reuse shared form components, add validation, and surface success/error toasts.

4. **Shared constants**
   - Introduce `lib/social-platforms.ts` mapping platforms to default colors, icons (SVG paths), and recommended copy.

## 2. Stacked social pill pattern (Episodes page & footer)

1. **Component**
   - Build `components/SocialFollowStack.tsx` (server component) that accepts `{ zone, variant }` and renders pills from `getSocialLinks(zone)`.
   - Each pill includes icon chip, platform label, "Follow" microcopy, platform color background, and keyboard-friendly focus styles.

2. **Usage**
   - Replace the hard-coded Spotify CTA on `app/episodes/page.tsx` with `<SocialFollowStack zone="episodes_cta" />`.
   - Replace the footer's link list in `app/layout.tsx` with `<SocialFollowStack zone="footer" variant="inline" />`, keeping existing heading.

3. **Styling**
   - Maintain current offset shadow aesthetic (black base + red offset) via utility classes or a small CSS module.
   - Add responsive behavior: scrollable row on mobile, multi-column grid on desktop.

4. **Analytics**
   - Emit PostHog events (e.g., `social_follow_click`) with platform + zone payload to measure engagement.

## 3. `/connect` "Follow the Tribe" hub (Deep experience)

1. **Page setup**
   - Create `app/connect/page.tsx` fetching featured social links and optional highlights (episodes, blog posts) for cross-promotion.
   - Layout sections: hero banner with follow stack, grouped cards ("Listen", "Watch", "Join"), optional embeds (Spotify player, YouTube playlist) configured via CMS fields.

2. **Components**
   - Reuse `SocialFollowStack` and introduce `SocialPlatformCard` for detailed cards (description, CTA, stats).
   - Placeholder `SocialHighlights` component for future API-driven content (TikTok/IG embeds) with server-side caching.

3. **Navigation**
   - Add `/connect` link to header nav + footer Quick Links once content finalized.
   - Optionally gate behind feature flag until CMS content ready.

4. **Rollout sequencing**
   - Finish foundation (DB + CMS) → deploy stacked pills (Episodes + footer) → launch `/connect` once data populated.
   - Document CMS usage in `docs/custom-cms/social-links.md` after build.

## Open Questions / Next Steps

- Confirm required table prefix naming convention from `AGENT.md` (file location currently unknown in repo).
- Decide whether zones should be free-form or constrained enum.
- Determine whether social API syncing is needed in v1 or deferred.
