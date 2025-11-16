-- =============================================================================
-- Migration: Fix Image URLs with Newline Characters
-- Created: 2024-11-16
-- =============================================================================
-- This migration removes any newline characters (%0A, %0D) from image URLs
-- in the database that were accidentally inserted during upload.
--
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ytqwwxlqqpqhhcpcqxax/sql
-- =============================================================================

-- Fix blog post featured images
UPDATE fireside_blog_posts
SET featured_image_url = REPLACE(REPLACE(featured_image_url, E'\n', ''), E'\r', '')
WHERE featured_image_url IS NOT NULL
  AND (featured_image_url LIKE '%' || E'\n' || '%' OR featured_image_url LIKE '%' || E'\r' || '%');

-- Fix artist profile images
UPDATE fireside_artists
SET profile_image_url = REPLACE(REPLACE(profile_image_url, E'\n', ''), E'\r', '')
WHERE profile_image_url IS NOT NULL
  AND (profile_image_url LIKE '%' || E'\n' || '%' OR profile_image_url LIKE '%' || E'\r' || '%');

-- Fix episode cover images
UPDATE fireside_episodes
SET cover_image_url = REPLACE(REPLACE(cover_image_url, E'\n', ''), E'\r', '')
WHERE cover_image_url IS NOT NULL
  AND (cover_image_url LIKE '%' || E'\n' || '%' OR cover_image_url LIKE '%' || E'\r' || '%');

-- Fix AAA (Artists/Albums/Archives) page images (only if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'fireside_aaa_pages') THEN
    UPDATE fireside_aaa_pages
    SET featured_image_url = REPLACE(REPLACE(featured_image_url, E'\n', ''), E'\r', '')
    WHERE featured_image_url IS NOT NULL
      AND (featured_image_url LIKE '%' || E'\n' || '%' OR featured_image_url LIKE '%' || E'\r' || '%');

    UPDATE fireside_aaa_pages
    SET hero_image_url = REPLACE(REPLACE(hero_image_url, E'\n', ''), E'\r', '')
    WHERE hero_image_url IS NOT NULL
      AND (hero_image_url LIKE '%' || E'\n' || '%' OR hero_image_url LIKE '%' || E'\r' || '%');
  END IF;
END $$;

-- =============================================================================
-- Verification: Check if any URLs still contain newlines
-- =============================================================================

-- Blog posts
SELECT id, title, featured_image_url
FROM fireside_blog_posts
WHERE featured_image_url LIKE '%' || E'\n' || '%'
   OR featured_image_url LIKE '%' || E'\r' || '%';

-- Artists
SELECT id, name, profile_image_url
FROM fireside_artists
WHERE profile_image_url LIKE '%' || E'\n' || '%'
   OR profile_image_url LIKE '%' || E'\r' || '%';

-- Episodes
SELECT id, title, cover_image_url
FROM fireside_episodes
WHERE cover_image_url LIKE '%' || E'\n' || '%'
   OR cover_image_url LIKE '%' || E'\r' || '%';

-- AAA Pages (only if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'fireside_aaa_pages') THEN
    RAISE NOTICE 'Checking fireside_aaa_pages...';
    PERFORM id, page_type, featured_image_url, hero_image_url
    FROM fireside_aaa_pages
    WHERE featured_image_url LIKE '%' || E'\n' || '%'
       OR featured_image_url LIKE '%' || E'\r' || '%'
       OR hero_image_url LIKE '%' || E'\n' || '%'
       OR hero_image_url LIKE '%' || E'\r' || '%';
  ELSE
    RAISE NOTICE 'Table fireside_aaa_pages does not exist, skipping verification.';
  END IF;
END $$;

-- =============================================================================
-- Show all blog post URLs for manual verification
-- =============================================================================

SELECT
    id,
    title,
    featured_image_url,
    LENGTH(featured_image_url) as url_length,
    LENGTH(REPLACE(REPLACE(featured_image_url, E'\n', ''), E'\r', '')) as clean_length
FROM fireside_blog_posts
WHERE featured_image_url IS NOT NULL
ORDER BY created_at DESC;
