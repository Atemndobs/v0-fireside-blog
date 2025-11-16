# Supabase Storage Setup Guide

This guide will help you fix the "Failed to load image" error by properly configuring your Supabase storage bucket.

## Problem

Images uploaded through the admin panel fail to load because:
- The Supabase storage bucket `fireside_assets` may not be properly configured
- Row Level Security (RLS) policies may be blocking public access
- The service role key needs to be verified

## Solution

### Step 1: Create the Storage Bucket in Supabase

1. **Go to Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project: `ytqwwxlqqpqhhcpcqxax`

2. **Create the Storage Bucket**
   - Click on **Storage** in the left sidebar
   - Click **New bucket** button
   - Enter bucket name: `fireside_assets`
   - **IMPORTANT**: Check the **Public bucket** checkbox
     - This allows public read access to all files
     - Files can still only be uploaded with proper authentication
   - Click **Create bucket**

### Step 2: Configure Row Level Security (RLS) Policies

Even if the bucket is public, you need to ensure RLS policies allow public reads.

#### Option A: Using the Supabase Dashboard

1. **Navigate to Storage Policies**
   - Go to **Storage** → **Policies**
   - Select the `fireside_assets` bucket

2. **Add Public Read Policy**
   - Click **New policy**
   - Choose **For full customization** → **Create policy**
   - Policy name: `Public read access`
   - Allowed operation: **SELECT** (this means read/download)
   - Target roles: Check **public** (or `anon`)
   - USING expression: `true` (this allows all reads)
   - Click **Review** → **Save policy**

3. **Add Authenticated Write Policy**
   - Click **New policy** again
   - Policy name: `Authenticated users can upload`
   - Allowed operation: **INSERT**
   - Target roles: Check **authenticated**
   - USING expression: `true`
   - WITH CHECK expression: `true`
   - Click **Review** → **Save policy**

4. **Add Authenticated Update/Delete Policies** (Optional)
   - Repeat for **UPDATE** and **DELETE** operations if you want admins to be able to modify/delete files

#### Option B: Using SQL (Recommended)

Run this SQL in the **SQL Editor** in your Supabase dashboard:

```sql
-- Enable RLS on the storage.objects table (should already be enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to fireside_assets bucket
CREATE POLICY "Public read access for fireside_assets"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'fireside_assets');

-- Policy: Allow authenticated users to upload to fireside_assets
CREATE POLICY "Authenticated users can upload to fireside_assets"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'fireside_assets');

-- Policy: Allow service role to do everything (for server-side operations)
CREATE POLICY "Service role has full access to fireside_assets"
ON storage.objects
TO service_role
USING (bucket_id = 'fireside_assets')
WITH CHECK (bucket_id = 'fireside_assets');

-- Policy: Allow authenticated users to update their own files (optional)
CREATE POLICY "Authenticated users can update fireside_assets"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'fireside_assets')
WITH CHECK (bucket_id = 'fireside_assets');

-- Policy: Allow authenticated users to delete files (optional)
CREATE POLICY "Authenticated users can delete from fireside_assets"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'fireside_assets');
```

### Step 3: Verify Environment Variables

#### Local Environment (`.env.local`)

Your current `.env.local` file looks correct:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ytqwwxlqqpqhhcpcqxax.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_ASSET_BUCKET=fireside_assets
```

**✅ This is already correct!**

#### Vercel Environment (Production/Preview)

You need to ensure these variables are set in Vercel:

1. **Go to Vercel Dashboard**
   - Navigate to your project: https://vercel.com/dashboard
   - Go to **Settings** → **Environment Variables**

2. **Verify/Add These Variables**

   | Variable Name | Value | Environments |
   |--------------|-------|--------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://ytqwwxlqqpqhhcpcqxax.supabase.co` | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |
   | `NEXT_PUBLIC_ASSET_BUCKET` | `fireside_assets` | Production, Preview, Development |

3. **How to Add/Update Variables via CLI**

   ```bash
   # Add SUPABASE_SERVICE_ROLE_KEY to all environments
   vercel env add SUPABASE_SERVICE_ROLE_KEY production preview development

   # When prompted, paste the service role key value:
   # eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXd3eGxxcXBxaGhjcGNxeGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDI2MjUyMywiZXhwIjoyMDQ5ODM4NTIzfQ.mSQ1tt_JZsqnZYGZuj6XGHNQphfKjO1BzsIYIJywWM4
   ```

### Step 4: Test the Configuration

#### Test 1: Check if Bucket Exists

Run this in your terminal:

```bash
curl "https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/bucket/fireside_assets" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

You should get a JSON response with bucket details.

#### Test 2: Upload a Test File

Create a simple test file and try uploading via the admin panel:

1. Go to your admin panel: http://localhost:3000/admin/blog
2. Edit a blog post
3. Try uploading an image
4. Check the browser console (F12) for any errors
5. Check the Network tab to see the upload request and response

#### Test 3: Check Public URL Access

After uploading, copy the image URL from the error message and try accessing it directly in your browser. It should look like:

```
https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/blog/1234567890-123456.jpg
```

If it returns a 404 or 403 error, the RLS policies need to be fixed.

### Step 5: Update Asset Base URL (Optional)

If you want to use Supabase storage as your primary asset source, update your `.env.local`:

```bash
# Change from S3
# NEXT_PUBLIC_ASSET_BASE_URL=https://fireside_assets.s3.amazonaws.com

# To Supabase storage
NEXT_PUBLIC_ASSET_BASE_URL=https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets
```

Also update this in Vercel environment variables.

## Troubleshooting

### Issue: "Failed to load image" Error

**Check:**
1. Bucket exists and is public
2. RLS policies allow public SELECT
3. Image URL is correct format
4. Service role key is set in Vercel

**Debug:**
```bash
# Check Vercel environment variables
vercel env ls

# Pull Vercel environment to local
vercel env pull .env.vercel

# Compare with .env.local
diff .env.local .env.vercel
```

### Issue: "Upload failed" Error

**Check:**
1. `SUPABASE_SERVICE_ROLE_KEY` is set correctly
2. Network connectivity to Supabase
3. File size limits (default is 50MB)
4. File type restrictions

**Debug:**
Check the browser console and network tab for the exact error message from the upload API.

### Issue: Images Upload but Don't Display

**Check:**
1. RLS policies allow public SELECT/read access
2. Bucket is marked as public
3. Image URL format is correct

**Test:**
Open the image URL directly in an incognito browser window. If it works in incognito but not when logged in, there's likely a CORS or authentication issue.

### Issue: CORS Errors

If you see CORS errors in the browser console, you may need to configure CORS in Supabase:

1. Go to **Storage** → **Configuration**
2. Add allowed origins:
   - `http://localhost:3000`
   - `https://your-domain.vercel.app`
   - `https://*.vercel.app` (for preview deployments)

## Quick Verification Checklist

- [ ] Supabase storage bucket `fireside_assets` exists
- [ ] Bucket is marked as **Public**
- [ ] RLS policy for public SELECT exists
- [ ] RLS policy for authenticated INSERT exists
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel (all environments)
- [ ] `NEXT_PUBLIC_ASSET_BUCKET=fireside_assets` is set
- [ ] Test upload works in local development
- [ ] Test upload works in production/preview
- [ ] Uploaded images display correctly
- [ ] Public URLs are accessible without authentication

## Getting Your Service Role Key

If you need to retrieve your service role key:

1. Go to Supabase Dashboard
2. Navigate to **Settings** → **API**
3. Scroll down to **Project API keys**
4. Find **service_role** key (marked as secret)
5. Click **Reveal** to see the key
6. Copy and use in your environment variables

**⚠️ IMPORTANT**: Never commit the service role key to your Git repository. It has full access to your database and storage!

## Next Steps

After completing this setup:

1. Redeploy your Vercel application to pick up new environment variables
2. Test image uploads in production
3. Migrate any existing S3 images to Supabase storage (optional)
4. Update documentation with new storage configuration

---

**Last Updated**: November 16, 2024
**Related Documentation**:
- [Setup Supabase](SETUP_SUPABASE.md)
- [Vercel Environment Setup](VERCEL_ENV_SETUP.md)
- [Asset Storage](asset-storage.md)
- [SQL Setup Script](custom-cms/setup-storage-bucket.sql)
