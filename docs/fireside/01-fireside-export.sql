-- ============================================
-- FIRESIDE APP - Full Data Export as INSERT Statements
-- Run this ONCE in Supabase Dashboard SQL Editor
-- Copy the entire output to use for import
-- ============================================

-- This query generates INSERT statements for ALL fireside tables
-- Run each CTE section separately if needed

WITH export_data AS (
  SELECT 
    'fireside_settings' as table_name,
    (SELECT json_agg(t) FROM fireside_settings t) as data
  UNION ALL
  SELECT 
    'fireside_artists',
    (SELECT json_agg(t) FROM fireside_artists t)
  UNION ALL
  SELECT 
    'fireside_artist_tracks',
    (SELECT json_agg(t) FROM fireside_artist_tracks t)
  UNION ALL
  SELECT 
    'fireside_categories',
    (SELECT json_agg(t) FROM fireside_categories t)
  UNION ALL
  SELECT 
    'fireside_episodes',
    (SELECT json_agg(t) FROM fireside_episodes t)
  UNION ALL
  SELECT 
    'fireside_episode_guests',
    (SELECT json_agg(t) FROM fireside_episode_guests t)
  UNION ALL
  SELECT 
    'fireside_blog_posts',
    (SELECT json_agg(t) FROM fireside_blog_posts t)
  UNION ALL
  SELECT 
    'fireside_blog_post_categories',
    (SELECT json_agg(t) FROM fireside_blog_post_categories t)
  UNION ALL
  SELECT 
    'fireside_blog_post_related_artists',
    (SELECT json_agg(t) FROM fireside_blog_post_related_artists t)
  UNION ALL
  SELECT 
    'fireside_blog_post_related_episodes',
    (SELECT json_agg(t) FROM fireside_blog_post_related_episodes t)
  UNION ALL
  SELECT 
    'fireside_social_links',
    (SELECT json_agg(t) FROM fireside_social_links t)
  UNION ALL
  SELECT 
    'fireside_about_page',
    (SELECT json_agg(t) FROM fireside_about_page t)
  UNION ALL
  SELECT 
    'fireside_aaa_authors',
    (SELECT json_agg(t) FROM fireside_aaa_authors t)
  UNION ALL
  SELECT 
    'fireside_aaa_fun_facts',
    (SELECT json_agg(t) FROM fireside_aaa_fun_facts t)
  UNION ALL
  SELECT 
    'fireside_aaa_page_settings',
    (SELECT json_agg(t) FROM fireside_aaa_page_settings t)
  UNION ALL
  SELECT 
    'fireside_aaa_quotes',
    (SELECT json_agg(t) FROM fireside_aaa_quotes t)
  UNION ALL
  SELECT 
    'fireside_sync_runs',
    (SELECT json_agg(t) FROM fireside_sync_runs t)
)
SELECT 
  table_name,
  data
FROM export_data
WHERE data IS NOT NULL;
