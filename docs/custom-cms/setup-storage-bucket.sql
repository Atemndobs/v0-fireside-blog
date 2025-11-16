-- =============================================================================
-- Supabase Storage Bucket Setup for Fireside Tribe
-- =============================================================================
-- This script creates the fireside_assets storage bucket and sets up
-- Row Level Security (RLS) policies for public read and authenticated write access.
--
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ytqwwxlqqpqhhcpcqxax/sql
-- =============================================================================

-- Step 1: Create the storage bucket (if it doesn't exist)
-- Note: You may need to create the bucket via the UI first, then run these policies
-- Or use this SQL if you have permissions:

INSERT INTO storage.buckets (id, name, public)
VALUES ('fireside_assets', 'fireside_assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- =============================================================================
-- Step 2: Set up Row Level Security (RLS) Policies
-- =============================================================================

-- Ensure RLS is enabled on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts when re-running)
DROP POLICY IF EXISTS "Public read access for fireside_assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to fireside_assets" ON storage.objects;
DROP POLICY IF EXISTS "Service role has full access to fireside_assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update fireside_assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete from fireside_assets" ON storage.objects;

-- =============================================================================
-- Policy 1: Allow public read access (SELECT) to all files in fireside_assets
-- This allows anyone to view/download images from the bucket
-- =============================================================================

CREATE POLICY "Public read access for fireside_assets"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'fireside_assets');

-- =============================================================================
-- Policy 2: Allow authenticated users to upload (INSERT) to fireside_assets
-- This allows logged-in admin users to upload files
-- =============================================================================

CREATE POLICY "Authenticated users can upload to fireside_assets"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'fireside_assets');

-- =============================================================================
-- Policy 3: Service role has full access
-- This allows server-side operations (using SUPABASE_SERVICE_ROLE_KEY) to
-- perform all operations without restrictions
-- =============================================================================

CREATE POLICY "Service role has full access to fireside_assets"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'fireside_assets')
WITH CHECK (bucket_id = 'fireside_assets');

-- =============================================================================
-- Policy 4: Allow authenticated users to update files (optional)
-- Uncomment if you want admins to be able to edit/replace uploaded files
-- =============================================================================

CREATE POLICY "Authenticated users can update fireside_assets"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'fireside_assets')
WITH CHECK (bucket_id = 'fireside_assets');

-- =============================================================================
-- Policy 5: Allow authenticated users to delete files (optional)
-- Uncomment if you want admins to be able to delete uploaded files
-- =============================================================================

CREATE POLICY "Authenticated users can delete from fireside_assets"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'fireside_assets');

-- =============================================================================
-- Verification Queries
-- Run these to verify the setup is correct
-- =============================================================================

-- Check if the bucket exists and is public
SELECT id, name, public, created_at
FROM storage.buckets
WHERE id = 'fireside_assets';

-- List all policies on storage.objects related to fireside_assets
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
  AND policyname LIKE '%fireside_assets%'
ORDER BY policyname;

-- =============================================================================
-- Test Queries (optional)
-- =============================================================================

-- Count how many files are currently in the fireside_assets bucket
SELECT COUNT(*) as file_count,
       pg_size_pretty(SUM((metadata->>'size')::bigint)) as total_size
FROM storage.objects
WHERE bucket_id = 'fireside_assets';

-- List recent uploads to fireside_assets
SELECT
    name,
    id,
    created_at,
    pg_size_pretty((metadata->>'size')::bigint) as file_size,
    metadata->>'mimetype' as mime_type
FROM storage.objects
WHERE bucket_id = 'fireside_assets'
ORDER BY created_at DESC
LIMIT 10;

-- =============================================================================
-- Cleanup (only run if you need to start over)
-- =============================================================================

-- CAUTION: This will delete all files in the bucket!
-- Uncomment only if you're sure you want to delete everything

-- DELETE FROM storage.objects WHERE bucket_id = 'fireside_assets';
-- DELETE FROM storage.buckets WHERE id = 'fireside_assets';
