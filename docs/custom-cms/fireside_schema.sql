-- ============================================================================
-- Fireside Tribe CMS bootstrap schema for Supabase (PostgreSQL 15)
-- Tables use the `fireside_` prefix to coexist with other applications
-- ============================================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'fireside_track_platform') THEN
    CREATE TYPE public.fireside_track_platform AS ENUM ('spotify', 'youtube', 'soundcloud', 'apple_music', 'other');
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION public.fireside_set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- --------------------------------------------------------------------------
-- Artists
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fireside_artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug citext NOT NULL UNIQUE,
  short_description text NOT NULL,
  bio jsonb DEFAULT '[]'::jsonb,
  profile_image_url text NOT NULL,
  profile_image_alt text NOT NULL,
  social_links jsonb DEFAULT '{}'::jsonb,
  genre text,
  featured boolean NOT NULL DEFAULT false,
  order_rank integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.fireside_artist_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id uuid NOT NULL REFERENCES public.fireside_artists(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  platform public.fireside_track_platform NOT NULL DEFAULT 'other',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS fireside_artist_tracks_artist_order_idx
  ON public.fireside_artist_tracks (artist_id, display_order);

-- --------------------------------------------------------------------------
-- Categories
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fireside_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug citext NOT NULL UNIQUE,
  description text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- --------------------------------------------------------------------------
-- Episodes
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fireside_episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug citext NOT NULL UNIQUE,
  description text,
  published_at timestamptz NOT NULL,
  cover_image_url text,
  cover_image_alt text,
  spotify_url text,
  spotify_id text,
  youtube_url text,
  youtube_id text,
  duration_seconds integer CHECK (duration_seconds IS NULL OR duration_seconds >= 0),
  show_notes jsonb DEFAULT '[]'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  auto_synced boolean NOT NULL DEFAULT false,
  last_synced_at timestamptz,
  seo jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS fireside_episodes_published_idx
  ON public.fireside_episodes (published_at DESC);

CREATE TABLE IF NOT EXISTS public.fireside_episode_guests (
  episode_id uuid NOT NULL REFERENCES public.fireside_episodes(id) ON DELETE CASCADE,
  artist_id uuid NOT NULL REFERENCES public.fireside_artists(id) ON DELETE CASCADE,
  PRIMARY KEY (episode_id, artist_id)
);

-- --------------------------------------------------------------------------
-- Blog posts
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fireside_blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug citext NOT NULL UNIQUE,
  excerpt text NOT NULL,
  author text DEFAULT 'The Fireside Tribe',
  featured_image_url text NOT NULL,
  featured_image_alt text NOT NULL,
  published_at timestamptz NOT NULL,
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  seo jsonb DEFAULT '{}'::jsonb,
  featured boolean NOT NULL DEFAULT false,
  reading_time_minutes smallint CHECK (reading_time_minutes IS NULL OR reading_time_minutes > 0),
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS fireside_blog_posts_published_idx
  ON public.fireside_blog_posts (published_at DESC);

CREATE TABLE IF NOT EXISTS public.fireside_blog_post_categories (
  blog_post_id uuid NOT NULL REFERENCES public.fireside_blog_posts(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES public.fireside_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, category_id)
);

CREATE TABLE IF NOT EXISTS public.fireside_blog_post_related_artists (
  blog_post_id uuid NOT NULL REFERENCES public.fireside_blog_posts(id) ON DELETE CASCADE,
  artist_id uuid NOT NULL REFERENCES public.fireside_artists(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, artist_id)
);

CREATE TABLE IF NOT EXISTS public.fireside_blog_post_related_episodes (
  blog_post_id uuid NOT NULL REFERENCES public.fireside_blog_posts(id) ON DELETE CASCADE,
  episode_id uuid NOT NULL REFERENCES public.fireside_episodes(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, episode_id)
);

-- --------------------------------------------------------------------------
-- About Page (singleton)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fireside_about_page (
  id uuid PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001'::uuid,
  hero_title text NOT NULL DEFAULT 'The Fireside Tribe',
  hero_tagline text NOT NULL,
  mission_title text NOT NULL DEFAULT 'Our Mission',
  mission_image_url text,
  mission_image_alt text,
  mission_paragraph_1 text NOT NULL,
  mission_paragraph_2 text NOT NULL,
  story_title text NOT NULL DEFAULT 'Our Story',
  story_paragraph_1 text NOT NULL,
  story_paragraph_2 text NOT NULL,
  story_paragraph_3 text NOT NULL,
  what_we_do_title text NOT NULL DEFAULT 'What We Do',
  podcast_card_title text NOT NULL DEFAULT 'The Podcast',
  podcast_card_description text NOT NULL,
  blog_card_title text NOT NULL DEFAULT 'The Blog',
  blog_card_description text NOT NULL,
  artist_card_title text NOT NULL DEFAULT 'Artist Spotlights',
  artist_card_description text NOT NULL,
  cta_title text NOT NULL DEFAULT 'Join The Tribe',
  cta_description text NOT NULL,
  cta_button_text text NOT NULL DEFAULT 'LISTEN TO OUR PODCAST',
  updated_by text,
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

INSERT INTO public.fireside_about_page (
  id,
  hero_tagline,
  mission_paragraph_1,
  mission_paragraph_2,
  story_paragraph_1,
  story_paragraph_2,
  story_paragraph_3,
  podcast_card_description,
  blog_card_description,
  artist_card_description,
  cta_description
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Celebrating and promoting Cameroonian music and Afrobeats through podcasts, articles, and artist features.',
  'The Fireside Tribe was created with a singular mission: to showcase the incredible talent and rich musical heritage of Cameroon to the world.',
  'Through our podcast, blog, and artist features, we aim to create a platform that celebrates Cameroonian artists both at home and in the diaspora, highlighting their contributions to the global music scene.',
  'The Fireside Tribe began as a passion project by a group of Cameroonian music enthusiasts who felt that the country''s vibrant music scene deserved more international recognition.',
  'What started as casual conversations about our favorite artists evolved into a podcast, and eventually into this comprehensive platform dedicated to all things Cameroonian music.',
  'Today, we''re proud to be a growing community of music lovers, artists, producers, and fans united by our appreciation for Cameroon''s unique sounds and rhythms.',
  'Our flagship podcast features interviews with artists, producers, and industry insiders, deep dives into Cameroonian music history, and discussions about the latest trends.',
  'Our blog offers thoughtful articles, artist profiles, and analysis of Cameroonian music''s influence on the global scene.',
  'We regularly feature both established and emerging Cameroonian artists, helping to amplify their voices and music.',
  'Whether you''re a longtime fan of Cameroonian music or just discovering it, we invite you to join our community and explore the rich sounds and stories we have to share.'
)
ON CONFLICT (id) DO NOTHING;

-- --------------------------------------------------------------------------
-- A³ Page content
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fireside_aaa_page_settings (
  id uuid PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000002'::uuid,
  hero_subtitle text NOT NULL DEFAULT 'THE VOICES BEHIND THE TRIBE',
  hero_description text NOT NULL DEFAULT 'Three voices, one mission: to amplify Cameroonian music and culture through The Fireside Tribe podcast',
  power_section_title text NOT NULL DEFAULT 'THE POWER OF A³',
  power_section_description text NOT NULL,
  curator_title text NOT NULL DEFAULT 'THE CURATOR',
  curator_description text NOT NULL,
  storyteller_title text NOT NULL DEFAULT 'THE STORYTELLER',
  storyteller_description text NOT NULL,
  connector_title text NOT NULL DEFAULT 'THE CONNECTOR',
  connector_description text NOT NULL,
  cta_button_text text NOT NULL DEFAULT 'HEAR THEM IN ACTION',
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

INSERT INTO public.fireside_aaa_page_settings (
  id,
  power_section_description,
  curator_description,
  storyteller_description,
  connector_description
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'When Atem, Atem, and Anyang come together, something magical happens. Their unique perspectives, skills, and passions combine to create a podcast that''s more than the sum of its parts.',
  'Atem A. selects the music and artists that form the backbone of each episode.',
  'Atem N. crafts the narratives and conversations that bring the music to life.',
  'Anyang bridges cultures and opens doors for Cameroonian music globally.'
)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.fireside_aaa_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  author_name text NOT NULL,
  order_rank integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS fireside_aaa_quotes_order_idx
  ON public.fireside_aaa_quotes (order_rank);

CREATE TABLE IF NOT EXISTS public.fireside_aaa_authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug citext NOT NULL UNIQUE,
  name text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL,
  color_bg text NOT NULL,
  color_text text NOT NULL,
  color_border text NOT NULL,
  color_shadow text NOT NULL,
  bio text NOT NULL,
  profile_image_url text,
  profile_image_alt text,
  order_rank integer NOT NULL DEFAULT 0,
  featured boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS fireside_aaa_authors_order_idx
  ON public.fireside_aaa_authors (order_rank);

CREATE TABLE IF NOT EXISTS public.fireside_aaa_fun_facts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES public.fireside_aaa_authors(id) ON DELETE CASCADE,
  fact text NOT NULL,
  order_rank integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS fireside_aaa_fun_facts_author_idx
  ON public.fireside_aaa_fun_facts (author_id, order_rank);

-- --------------------------------------------------------------------------
-- Site-wide settings (singleton row)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fireside_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton_key text NOT NULL UNIQUE DEFAULT 'default',
  site_title text NOT NULL,
  site_description text,
  youtube_channel_id text,
  spotify_show_id text,
  social_links jsonb DEFAULT '{}'::jsonb,
  contact_email text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

-- --------------------------------------------------------------------------
-- Automation + sync audit
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.fireside_sync_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL CHECK (source IN ('youtube', 'spotify', 'manual')),
  status text NOT NULL CHECK (status IN ('pending', 'success', 'failed')),
  started_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  finished_at timestamptz,
  item_count integer NOT NULL DEFAULT 0,
  payload jsonb DEFAULT '{}'::jsonb,
  error_message text
);

-- --------------------------------------------------------------------------
-- Trigger wiring
-- --------------------------------------------------------------------------
DO $$
DECLARE
  _tbl text;
BEGIN
  FOR _tbl IN SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name IN (
        'fireside_artists',
        'fireside_categories',
        'fireside_episodes',
        'fireside_blog_posts',
        'fireside_settings',
        'fireside_about_page',
        'fireside_aaa_page_settings',
        'fireside_aaa_quotes',
        'fireside_aaa_authors'
      )
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS %I ON public.%I;',
      _tbl || '_set_updated_at',
      _tbl
    );
    EXECUTE format(
      'CREATE TRIGGER %I BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.fireside_set_updated_at();',
      _tbl || '_set_updated_at',
      _tbl
    );
  END LOOP;
END
$$;

COMMIT;
