# Image URL Fix Guide

This guide explains how to fix all image URL issues in the Fireside Tribe application.

## 🐛 Problems Fixed

1. **Newline characters in URLs** (`%0A`, `%0D`, `\n`, `\r`)
2. **S3 URLs pointing to old bucket** (`https://fireside_assets.s3.amazonaws.com/`)
3. **Uploads creating broken URLs**
4. **UI not showing full URLs**

## ✅ Solutions Applied

### Code Changes

1. **[Upload API](../app/api/admin/upload/route.ts)** - Now manually constructs URLs to avoid newlines
2. **[Asset URL Helper](../lib/utils/assets.ts)** - Cleans URLs on-the-fly, removing `%0A` and `%0D`
3. **[Image Upload Field](../components/admin/ImageUploadField.tsx)** - Shows full URL with copy button

### Database Migrations

1. **[005_fix_image_url_newlines_simple.sql](custom-cms/migrations/005_fix_image_url_newlines_simple.sql)** - Removes newlines from existing URLs
2. **[006_migrate_s3_to_supabase_urls.sql](custom-cms/migrations/006_migrate_s3_to_supabase_urls.sql)** - Converts S3 URLs to Supabase storage

### Helper Scripts

1. **[fix-all-image-urls.js](../scripts/fix-all-image-urls.js)** - Comprehensive fix (newlines + S3 migration)
2. **[migrate-s3-to-supabase.js](../scripts/migrate-s3-to-supabase.js)** - S3 to Supabase migration only
3. **[debug-storage.js](../scripts/debug-storage.js)** - Debug storage configuration

## 🚀 How to Fix Your Database

### Option 1: Run the Comprehensive Script (Recommended)

This fixes **both** newlines AND S3 URLs in one go:

```bash
npm run fix:images
```

Or:

```bash
node scripts/fix-all-image-urls.js
```

This will:
- Remove all newline characters (`%0A`, `%0D`, `\n`, `\r`)
- Convert S3 URLs to Supabase storage URLs
- Show before/after for each change
- Provide a summary of all URLs

### Option 2: Run SQL Migrations

#### Step 1: Fix Newlines

Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/ytqwwxlqqpqhhcpcqxax/sql) and run:

```sql
-- Copy content from docs/custom-cms/migrations/005_fix_image_url_newlines_simple.sql
```

#### Step 2: Migrate S3 to Supabase

```sql
-- Copy content from docs/custom-cms/migrations/006_migrate_s3_to_supabase_urls.sql
```

### Option 3: Run Individual Scripts

**Fix newlines only:**
```bash
node scripts/run-migration.js
```

**Migrate S3 URLs only:**
```bash
npm run migrate:s3
```

## 🧪 How to Test

### 1. Debug Current State

```bash
npm run debug:storage
```

This shows:
- All files in Supabase storage
- All image URLs in database
- Which URLs have issues

### 2. Test New Uploads

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Go to admin panel and upload a new image

3. Check the URL - it should be:
   ```
   https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/blog/123456.jpg
   ```

   NOT:
   ```
   https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets%0A/blog/123456.jpg
   ```

### 3. Verify in Production

After deploying:

1. Check admin panel - images should load
2. Check public pages - images should display
3. Inspect URLs in browser DevTools - no `%0A` or S3 URLs

## 📊 URL Format Reference

### ✅ Correct Supabase URL Format

```
https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/{path}
```

Examples:
```
https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/blog/1234.jpg
https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/images/artist.png
https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/about/team.jpg
```

### ❌ Incorrect Formats

**With newline:**
```
https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets%0A/blog/1234.jpg
```

**Old S3:**
```
https://fireside_assets.s3.amazonaws.com/images/artist.jpg
```

## 🔧 Troubleshooting

### Images Still Not Loading

1. **Check the URL in browser DevTools**:
   - Right-click the broken image → Inspect
   - Look at the `src` attribute
   - Copy and test the URL in a new tab

2. **Run debug script**:
   ```bash
   npm run debug:storage
   ```

3. **Check database**:
   ```sql
   SELECT id, title, featured_image_url
   FROM fireside_blog_posts
   WHERE featured_image_url LIKE '%0A%'
      OR featured_image_url LIKE '%s3.amazonaws%';
   ```

4. **Check Supabase storage**:
   - Go to [Storage Dashboard](https://supabase.com/dashboard/project/ytqwwxlqqpqhhcpcqxax/storage/buckets/fireside_assets)
   - Verify files exist at the expected paths

### New Uploads Still Creating Bad URLs

1. **Restart dev server**:
   ```bash
   npm run dev
   ```

2. **Check environment variables**:
   ```bash
   grep "NEXT_PUBLIC_ASSET_BASE_URL" .env.local
   ```

   Should be:
   ```
   NEXT_PUBLIC_ASSET_BASE_URL=https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets
   ```

3. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

## 📝 Next Steps After Fixing

1. **Deploy to production**:
   ```bash
   git add .
   git commit -m "Fix all image URL issues (newlines and S3 migration)"
   git push
   vercel --prod
   ```

2. **Update Vercel environment variables**:
   ```bash
   vercel env add NEXT_PUBLIC_ASSET_BASE_URL
   # Enter: https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets
   ```

3. **Monitor for issues**:
   - Check admin panel
   - Check public pages
   - Check browser console for errors

## 🎯 Summary of NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run fix:images` | Fix ALL image URLs (newlines + S3) |
| `npm run debug:storage` | Debug storage configuration |
| `npm run migrate:s3` | Migrate S3 URLs to Supabase only |

---

**Last Updated**: November 16, 2024
**Related Files**:
- [Upload API](../app/api/admin/upload/route.ts)
- [Asset Helper](../lib/utils/assets.ts)
- [Image Upload Field](../components/admin/ImageUploadField.tsx)
