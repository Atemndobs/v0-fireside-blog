-- Add country_code column to fireside_artists table
-- Stores ISO 3166-1 alpha-2 country codes (e.g., CM, FR, US, NG)

BEGIN;

ALTER TABLE public.fireside_artists
ADD COLUMN IF NOT EXISTS country_code varchar(2) DEFAULT 'CM';

COMMENT ON COLUMN public.fireside_artists.country_code IS 'ISO 3166-1 alpha-2 country code (e.g., CM for Cameroon, FR for France)';

COMMIT;
