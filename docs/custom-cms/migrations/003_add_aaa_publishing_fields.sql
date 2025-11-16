-- Adds publishing controls to the A³ page settings so editors can manage visibility from the CMS
ALTER TABLE public.fireside_aaa_page_settings
  ADD COLUMN IF NOT EXISTS published boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS publish_at timestamptz,
  ADD COLUMN IF NOT EXISTS unpublish_at timestamptz;

COMMENT ON COLUMN public.fireside_aaa_page_settings.published IS 'Controls whether the A³ page is visible on the public site';
COMMENT ON COLUMN public.fireside_aaa_page_settings.publish_at IS 'Optional timestamp to automatically publish the A³ page';
COMMENT ON COLUMN public.fireside_aaa_page_settings.unpublish_at IS 'Optional timestamp to automatically hide the A³ page';
