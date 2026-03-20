# Convex → Payload Migration Guide

## ✅ Migration Status: COMPLETE

**Date:** February 24, 2026  
**Duration:** ~2 minutes  
**Success Rate:** 100% (all unique records migrated)

---

## 📊 Final Results

| Collection | Total Records | Status |
|------------|--------------|--------|
| **Artists** | 11 | ✅ All migrated |
| **Episodes** | 16 | ✅ All migrated |
| **Posts** | 0 | ⚠️ No data in Convex |

**Total: 27 records successfully migrated to Payload CMS**

---

## 🎯 What Was Accomplished

### 1. **Created Custom Migration Script**
   - **Location:** `scripts/migrate-via-api.mjs`
   - **Approach:** Uses Payload HTTP API (bypasses broken environment loader)
   - **Features:**
     - ✅ Manual .env.local loading with dotenv
     - ✅ Convex data fetching via ConvexHttpClient
     - ✅ HTTP API authentication (JWT)
     - ✅ Dry-run mode for testing
     - ✅ Limit mode for controlled testing
     - ✅ Comprehensive error handling
     - ✅ Progress reporting with emoji indicators
     - ✅ Detailed migration reports

### 2. **Successfully Migrated All Data**
   - **11 Artists:** Tayc, Lebianca, James BKS, Kocee, Kang, Jovi, Haira Berylie, DJ Bizi Brown, Ronis Goliath, Yame, lubiana
   - **16 Episodes:** All podcast episodes from Convex
   - **0 Posts:** No blog posts existed in Convex (this is normal)

### 3. **Verified Data in Payload**
   - All artists visible at: http://localhost:3000/admin/collections/artists
   - All episodes visible at: http://localhost:3000/admin/collections/episodes
   - Data integrity confirmed via API queries

---

## 🚀 How to Use the Migration Script

### Basic Usage

```bash
# Dry run (preview what will be migrated)
node scripts/migrate-via-api.mjs --dry-run

# Test migration (limit to 5 records per collection)
node scripts/migrate-via-api.mjs --limit 5

# Full migration (all records)
node scripts/migrate-via-api.mjs

# Migrate specific collections only
node scripts/migrate-via-api.mjs --only artists
node scripts/migrate-via-api.mjs --only episodes,posts
```

### Prerequisites

1. **Payload must be running:**
   ```bash
   npm run dev
   # Payload should be accessible at http://localhost:3000
   ```

2. **Admin credentials configured:**
   - Email: `atemndobs@gmail.com`
   - Password: `Atemkeng2022`

3. **Environment variables in `.env.local`:**
   ```env
   POSTGRES_URL=postgresql://...
   PAYLOAD_SECRET=...
   NEXT_PUBLIC_CONVEX_URL=https://agile-owl-76.convex.cloud
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

---

## 🔍 Verifying the Migration

### Method 1: Payload Admin UI
1. Open http://localhost:3000/admin
2. Login with: `atemndobs@gmail.com` / `Atemkeng2022`
3. Navigate to:
   - Artists: http://localhost:3000/admin/collections/artists
   - Episodes: http://localhost:3000/admin/collections/episodes
   - Posts: http://localhost:3000/admin/collections/posts

### Method 2: API Queries
```bash
# Count artists
curl -s http://localhost:3000/api/artists | jq '.totalDocs'

# Count episodes
curl -s http://localhost:3000/api/episodes | jq '.totalDocs'

# List all artists
curl -s http://localhost:3000/api/artists | jq '.docs[] | {name, slug}'
```

### Method 3: Database Query
```sql
-- Connect to Neon Postgres
psql "postgresql://neondb_owner:npg_bkRFrB6m0WEV@ep-late-water-aikkmzsg.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"

-- Check record counts
SELECT 'artists' as collection, COUNT(*) FROM artists
UNION ALL
SELECT 'episodes', COUNT(*) FROM episodes
UNION ALL
SELECT 'posts', COUNT(*) FROM posts;
```

---

## 🐛 Troubleshooting

### Error: "Cannot destructure property 'loadEnvConfig'"
**This is the bug we bypassed!** The migration script doesn't use Payload's broken environment loader.

### Error: "Authentication failed"
**Solution:**
1. Make sure Payload is running: `npm run dev`
2. Verify admin user exists at http://localhost:3000/admin
3. Check credentials: `atemndobs@gmail.com` / `Atemkeng2022`

### Error: "Value must be unique"
**This is normal!** It means the record already exists in Payload. The script will skip it and continue.

### Error: "Convex client not initialized"
**Solution:** Add `NEXT_PUBLIC_CONVEX_URL=https://agile-owl-76.convex.cloud` to `.env.local`

---

## 📝 Next Steps for Atem

### 1. **Verify Data Quality** ✅ (Already Done)
   - [x] Check all artists in Payload admin
   - [x] Check all episodes in Payload admin
   - [x] Verify data integrity (slugs, images, links)

### 2. **Update Frontend to Use Payload API**
   - [ ] Replace Convex queries with Payload queries in:
     - `app/artists/page.tsx`
     - `app/episodes/page.tsx`
     - `app/artists/[slug]/page.tsx`
     - `app/episodes/[slug]/page.tsx`
   - [ ] Update API routes in `app/api/`
   - [ ] Test ISR revalidation

### 3. **Create Blog Posts**
   - [ ] No blog posts were in Convex (0 found)
   - [ ] Create new posts directly in Payload admin
   - [ ] Or create a separate script to import from another source

### 4. **Media Migration (Optional)**
   - Current setup uses external URLs (Supabase, YouTube thumbnails)
   - If you want to host images in Payload:
     1. Download images from Supabase
     2. Upload to Payload Media collection
     3. Update `coverImage` and `profileImage` fields

### 5. **Deploy to Production**
   - [ ] Update environment variables in Vercel
   - [ ] Test Payload admin in production
   - [ ] Verify API endpoints work
   - [ ] Test ISR revalidation

### 6. **Cleanup (Optional)**
   - [ ] Remove Convex dependency: `npm uninstall convex`
   - [ ] Delete `convex/` directory
   - [ ] Remove `lib/convex/server.ts`
   - [ ] Archive old migration script: `scripts/migrate-convex-to-payload.ts`

---

## 📚 Technical Details

### How the Script Works

1. **Environment Loading:**
   ```javascript
   // Manual dotenv loading (bypasses Payload's broken loader)
   import { config as dotenvConfig } from 'dotenv';
   dotenvConfig({ path: '.env.local' });
   ```

2. **Convex Connection:**
   ```javascript
   import { ConvexHttpClient } from 'convex/browser';
   const convexClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
   ```

3. **Payload Authentication:**
   ```javascript
   const response = await fetch('http://localhost:3000/api/users/login', {
     method: 'POST',
     body: JSON.stringify({ email, password })
   });
   const { token } = await response.json();
   ```

4. **Record Creation:**
   ```javascript
   await fetch('http://localhost:3000/api/artists', {
     method: 'POST',
     headers: {
       'Authorization': `JWT ${token}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(artistData)
   });
   ```

### Data Transformations

**Artists:**
- `socialLinks.spotify` → `socialLinks.spotifyUrl`
- `socialLinks.youtube` → `socialLinks.youtubeUrl`
- `socialLinks.instagram` → `socialLinks.instagramUrl`
- `socialLinks.twitter` → `socialLinks.twitterUrl`

**Episodes:**
- `publishedAt` (timestamp) → ISO date string
- `showNotes` (rich text) → preserved as-is
- `featured` defaults to `false` if missing

**Posts:**
- `publishedAt` (timestamp) → ISO date string
- `published` defaults to `true` if missing
- `author` defaults to "The Fireside Tribe"

---

## 🎉 Success Metrics

✅ **100% migration success rate** (27/27 unique records)  
✅ **Zero data loss** (all Convex data preserved)  
✅ **Zero downtime** (Convex still running during migration)  
✅ **Verified data integrity** (all slugs, links, images work)  
✅ **Detailed error reporting** (MIGRATION_RESULTS.md)  
✅ **Reusable script** (works for future migrations)

---

## 📞 Support

If you encounter issues:
1. Check `MIGRATION_RESULTS.md` for detailed error logs
2. Review Payload admin at http://localhost:3000/admin
3. Run dry-run to test: `node scripts/migrate-via-api.mjs --dry-run`
4. Check script comments for debugging tips

---

**Migration completed by:** OpenClaw Subagent  
**Date:** February 24, 2026  
**Status:** ✅ SUCCESS
