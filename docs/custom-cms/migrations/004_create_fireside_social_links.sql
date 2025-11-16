-- Creates fireside_social_links table for centralized social CTAs
BEGIN;

CREATE TABLE IF NOT EXISTS public.fireside_social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  label text NOT NULL,
  url text NOT NULL,
  icon_slug text,
  priority integer NOT NULL DEFAULT 0,
  zones text[] NOT NULL DEFAULT ARRAY[]::text[],
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS fireside_social_links_priority_idx
  ON public.fireside_social_links (priority DESC);

DROP TRIGGER IF EXISTS fireside_social_links_set_updated_at ON public.fireside_social_links;
CREATE TRIGGER fireside_social_links_set_updated_at
  BEFORE UPDATE ON public.fireside_social_links
  FOR EACH ROW
  EXECUTE FUNCTION public.fireside_set_updated_at();

COMMIT;
