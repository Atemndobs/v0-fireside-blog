# Asset Storage Configuration

## Overview

The Fireside Blog supports a **dual-storage architecture** for images and assets. This allows you to:
- Keep existing assets in S3
- Upload new assets to Supabase Storage
- Seamlessly work with both storage locations

## Storage Locations

### 1. Legacy S3 Bucket
- **URL Base**: `https://fireside_assets.s3.amazonaws.com`
- **Usage**: Existing assets that were uploaded before the CMS migration
- **Example URL**: `https://fireside_assets.s3.amazonaws.com/images/sepo.jpg`

### 2. Supabase Storage (New Uploads)
- **URL Base**: `https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets`
- **Usage**: New assets uploaded via the admin CMS
- **Folders**:
  - `episodes/` - Episode cover images
  - `artists/` - Artist profile images
  - `blog/` - Blog post featured images
- **Example URL**: `https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/episodes/1732712345-123456.jpg`

## How It Works

### Smart URL Detection (`lib/utils/assets.ts`)

The `getAssetUrl()` function automatically detects whether a path is:

1. **Full URL** (starts with `http://` or `https://`)
   - Returns the URL as-is
   - Example: `https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/episodes/123.jpg`
   - Output: Same URL (unchanged)

2. **Relative Path** (e.g., `images/logo.png`)
   - Prepends `NEXT_PUBLIC_ASSET_BASE_URL`
   - Example input: `images/logo.png`
   - Output: `https://fireside_assets.s3.amazonaws.com/images/logo.png`

### Upload Flow

When you upload an image via the admin CMS:

1. Image is uploaded to **Supabase Storage** via `/api/admin/upload`
2. The full Supabase URL is returned and saved to the database
3. Frontend renders the image using this full URL
4. No transformation is applied (thanks to smart URL detection)

## Environment Variables

```bash
# Supabase Storage (for new uploads)
NEXT_PUBLIC_SUPABASE_URL=https://ytqwwxlqqpqhhcpcqxax.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_ASSET_BUCKET=fireside_assets

# S3 Base URL (for legacy assets and relative paths)
NEXT_PUBLIC_ASSET_BASE_URL=https://fireside_assets.s3.amazonaws.com
```

## Next.js Image Configuration

The app is configured to load images from multiple remote domains in `next.config.mjs`:

```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'fireside_assets.s3.amazonaws.com' },      // S3
    { protocol: 'https', hostname: '*.supabase.co' },                         // Supabase
    { protocol: 'https', hostname: 's.rfi.fr' },                              // External CDN
    { protocol: 'https', hostname: 'i.scdn.co' },                             // Spotify
    { protocol: 'https', hostname: 'resources.tidal.com' },                   // Tidal
    // ... more domains as needed
  ]
}
```

## Admin CMS Image Upload

### Features
- ✅ **Preview existing images** from both S3 and Supabase
- ✅ **Upload new images** to Supabase Storage
- ✅ **Organized folders** (episodes/, artists/, blog/)
- ✅ **Error handling** for failed image loads
- ✅ **Dark theme styling** matching admin interface

### Component: ImageUploadField

Located at: `components/admin/ImageUploadField.tsx`

Usage:
```tsx
<ImageUploadField
  label="Cover Image"
  value={formData.cover_image_url}
  folder="episodes"  // Uploads to episodes/ folder in Supabase
  onChange={(url) => handleChange("cover_image_url", url)}
/>
```

## Database Schema

Image URLs are stored as **full URLs** in the database:

```sql
-- Example data
cover_image_url: https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/episodes/123.jpg
profile_image_url: https://fireside_assets.s3.amazonaws.com/images/artist.jpg
featured_image_url: https://i.scdn.co/image/external.jpg
```

## Migration Path (Optional)

If you want to consolidate all assets into one storage location:

### Option A: Move Everything to Supabase
1. Copy all S3 assets to Supabase Storage
2. Update database records with new Supabase URLs
3. Update `NEXT_PUBLIC_ASSET_BASE_URL` to point to Supabase
4. Keep S3 as fallback or decommission

### Option B: Move Everything to S3
1. Keep new uploads in Supabase temporarily
2. Periodically sync Supabase → S3
3. Update database with S3 URLs
4. Continue using S3 as primary storage

### Option C: Keep Dual Storage (Current Setup)
- ✅ No migration needed
- ✅ Legacy assets stay in S3
- ✅ New uploads go to Supabase
- ✅ Both work seamlessly
- ✅ Flexible and scalable

## Troubleshooting

### Image Not Loading in Admin Preview

**Symptom**: Broken image icon in admin form

**Possible Causes**:
1. URL is not in `next.config.mjs` remotePatterns
2. Image file doesn't exist at the URL
3. CORS issue with external CDN

**Solution**:
1. Check the image URL in browser DevTools
2. Add the domain to `next.config.mjs` if needed
3. Verify the file exists at the URL

### Upload Failing

**Symptom**: Error message when uploading

**Possible Causes**:
1. Supabase bucket doesn't exist
2. Service role key is invalid
3. File size too large

**Solution**:
1. Verify bucket exists in Supabase dashboard
2. Check `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
3. Check file size limits in Supabase settings

## Best Practices

1. **Always use full URLs** in the database
2. **Never prepend base URL** to full URLs (handled automatically)
3. **Use folders** to organize uploads (episodes/, artists/, blog/)
4. **Test image previews** after uploading to ensure they load correctly
5. **Monitor storage usage** in both S3 and Supabase dashboards
