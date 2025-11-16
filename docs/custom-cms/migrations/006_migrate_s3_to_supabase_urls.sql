-- =============================================================================
-- Migration: Convert S3 URLs to Supabase Storage URLs
-- Created: 2024-11-16
-- =============================================================================
-- This migration converts all S3 bucket URLs to Supabase storage URLs
-- Old format: https://fireside_assets.s3.amazonaws.com/images/file.jpg
-- New format: https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/images/file.jpg
-- =============================================================================

-- Step 1: Update Blog Post featured images
UPDATE fireside_blog_posts
SET featured_image_url = REPLACE(
  featured_image_url,
  'https://fireside_assets.s3.amazonaws.com/',
  'https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/'
)
WHERE featured_image_url LIKE 'https://fireside_assets.s3.amazonaws.com/%';

-- Step 2: Update Artist profile images
UPDATE fireside_artists
SET profile_image_url = REPLACE(
  profile_image_url,
  'https://fireside_assets.s3.amazonaws.com/',
  'https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/'
)
WHERE profile_image_url LIKE 'https://fireside_assets.s3.amazonaws.com/%';

-- Step 3: Update Episode cover images
UPDATE fireside_episodes
SET cover_image_url = REPLACE(
  cover_image_url,
  'https://fireside_assets.s3.amazonaws.com/',
  'https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/'
)
WHERE cover_image_url LIKE 'https://fireside_assets.s3.amazonaws.com/%';

-- Step 4: Update AAA Pages (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'fireside_aaa_pages') THEN
    -- Update featured_image_url
    UPDATE fireside_aaa_pages
    SET featured_image_url = REPLACE(
      featured_image_url,
      'https://fireside_assets.s3.amazonaws.com/',
      'https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/'
    )
    WHERE featured_image_url LIKE 'https://fireside_assets.s3.amazonaws.com/%';

    -- Update hero_image_url
    UPDATE fireside_aaa_pages
    SET hero_image_url = REPLACE(
      hero_image_url,
      'https://fireside_assets.s3.amazonaws.com/',
      'https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/'
    )
    WHERE hero_image_url LIKE 'https://fireside_assets.s3.amazonaws.com/%';
  END IF;
END $$;

-- =============================================================================
-- Verification: Show all remaining S3 URLs
-- =============================================================================

-- Check Blog Posts
SELECT 'Blog Posts' as table_name, COUNT(*) as s3_url_count
FROM fireside_blog_posts
WHERE featured_image_url LIKE 'https://fireside_assets.s3.amazonaws.com/%'

UNION ALL

-- Check Artists
SELECT 'Artists' as table_name, COUNT(*) as s3_url_count
FROM fireside_artists
WHERE profile_image_url LIKE 'https://fireside_assets.s3.amazonaws.com/%'

UNION ALL

-- Check Episodes
SELECT 'Episodes' as table_name, COUNT(*) as s3_url_count
FROM fireside_episodes
WHERE cover_image_url LIKE 'https://fireside_assets.s3.amazonaws.com/%';

-- =============================================================================
-- Show updated URLs for verification
-- =============================================================================

-- Show all artist image URLs
SELECT
  'Artists' as source,
  name,
  profile_image_url,
  CASE
    WHEN profile_image_url LIKE 'https://ytqwwxlqqpqhhcpcqxax.supabase.co/%' THEN 'Supabase ✓'
    WHEN profile_image_url LIKE 'https://fireside_assets.s3.amazonaws.com/%' THEN 'S3 (OLD)'
    ELSE 'External'
  END as url_type
FROM fireside_artists
WHERE profile_image_url IS NOT NULL
ORDER BY url_type, name;

-- Show all blog post image URLs
SELECT
  'Blog Posts' as source,
  title,
  featured_image_url,
  CASE
    WHEN featured_image_url LIKE 'https://ytqwwxlqqpqhhcpcqxax.supabase.co/%' THEN 'Supabase ✓'
    WHEN featured_image_url LIKE 'https://fireside_assets.s3.amazonaws.com/%' THEN 'S3 (OLD)'
    ELSE 'External'
  END as url_type
FROM fireside_blog_posts
WHERE featured_image_url IS NOT NULL
ORDER BY url_type, title;

-- Show all episode image URLs
SELECT
  'Episodes' as source,
  title,
  cover_image_url,
  CASE
    WHEN cover_image_url LIKE 'https://ytqwwxlqqpqhhcpcqxax.supabase.co/%' THEN 'Supabase ✓'
    WHEN cover_image_url LIKE 'https://fireside_assets.s3.amazonaws.com/%' THEN 'S3 (OLD)'
    ELSE 'External'
  END as url_type
FROM fireside_episodes
WHERE cover_image_url IS NOT NULL
ORDER BY url_type, title;
