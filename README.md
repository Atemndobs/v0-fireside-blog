# Fireside Tribe CMS

This project powers the Fireside Tribe site and admin dashboard (Next.js + Supabase). Content for Episodes, Artists, Blog, About, and the A³ page is fully managed through Supabase + the admin UI.

## Manual Episode Sync (YouTube → Supabase)

Until we wire up an automated job, run the provided script whenever you want the Episodes table to mirror the YouTube channel:

```bash
npm run sync:episodes
```

What the command does:

1. Loads `.env.local` so it can talk to Supabase (requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`).
2. Uses `yt-dlp` to fetch metadata for every video at https://www.youtube.com/@TheFiresideTribe/videos (install `yt-dlp` locally if you haven’t already).
3. Inserts any videos that aren’t already in `fireside_episodes`, marking them with `auto_synced = true`.

> Tip: run this weekly (or whenever new videos drop) so `/episodes` stays current. The script is idempotent—it only adds missing entries.

## Development

```bash
npm install
npm run dev
```

The admin dashboard lives at `/admin`, and new CMS features (About + A³) are in `app/admin/(protected)/about` and `app/admin/(protected)/aaa`.
