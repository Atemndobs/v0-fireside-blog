-- =============================================================================
-- Quick Fix: Remove Newline Characters from Image URLs
-- Run this immediately to fix the image loading issue
-- =============================================================================

-- Fix blog post featured images (both URL-encoded and literal newlines)
UPDATE fireside_blog_posts
SET featured_image_url = REPLACE(REPLACE(REPLACE(REPLACE(featured_image_url, '%0A', ''), '%0D', ''), E'\n', ''), E'\r', '')
WHERE featured_image_url IS NOT NULL
  AND (
    featured_image_url LIKE '%' || E'\n' || '%'
    OR featured_image_url LIKE '%' || E'\r' || '%'
    OR featured_image_url LIKE '%0A%'
    OR featured_image_url LIKE '%0D%'
  );

-- Fix artist profile images (both URL-encoded and literal newlines)
UPDATE fireside_artists
SET profile_image_url = REPLACE(REPLACE(REPLACE(REPLACE(profile_image_url, '%0A', ''), '%0D', ''), E'\n', ''), E'\r', '')
WHERE profile_image_url IS NOT NULL
  AND (
    profile_image_url LIKE '%' || E'\n' || '%'
    OR profile_image_url LIKE '%' || E'\r' || '%'
    OR profile_image_url LIKE '%0A%'
    OR profile_image_url LIKE '%0D%'
  );

-- Fix episode cover images (both URL-encoded and literal newlines)
UPDATE fireside_episodes
SET cover_image_url = REPLACE(REPLACE(REPLACE(REPLACE(cover_image_url, '%0A', ''), '%0D', ''), E'\n', ''), E'\r', '')
WHERE cover_image_url IS NOT NULL
  AND (
    cover_image_url LIKE '%' || E'\n' || '%'
    OR cover_image_url LIKE '%' || E'\r' || '%'
    OR cover_image_url LIKE '%0A%'
    OR cover_image_url LIKE '%0D%'
  );

-- Verify the fix (check for both literal and URL-encoded newlines)
SELECT
  'Blog Posts' as table_name,
  COUNT(*) as total_rows,
  COUNT(featured_image_url) as rows_with_images,
  SUM(CASE WHEN
    featured_image_url LIKE '%' || E'\n' || '%'
    OR featured_image_url LIKE '%' || E'\r' || '%'
    OR featured_image_url LIKE '%0A%'
    OR featured_image_url LIKE '%0D%'
  THEN 1 ELSE 0 END) as rows_with_newlines
FROM fireside_blog_posts

UNION ALL

SELECT
  'Artists' as table_name,
  COUNT(*) as total_rows,
  COUNT(profile_image_url) as rows_with_images,
  SUM(CASE WHEN
    profile_image_url LIKE '%' || E'\n' || '%'
    OR profile_image_url LIKE '%' || E'\r' || '%'
    OR profile_image_url LIKE '%0A%'
    OR profile_image_url LIKE '%0D%'
  THEN 1 ELSE 0 END) as rows_with_newlines
FROM fireside_artists

UNION ALL

SELECT
  'Episodes' as table_name,
  COUNT(*) as total_rows,
  COUNT(cover_image_url) as rows_with_images,
  SUM(CASE WHEN
    cover_image_url LIKE '%' || E'\n' || '%'
    OR cover_image_url LIKE '%' || E'\r' || '%'
    OR cover_image_url LIKE '%0A%'
    OR cover_image_url LIKE '%0D%'
  THEN 1 ELSE 0 END) as rows_with_newlines
FROM fireside_episodes;
