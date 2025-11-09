# Supabase Setup Guide

## Prerequisites
- Supabase account with project created
- Environment variables already set in `.env.local` ✅

## Step 1: Apply Database Schema

1. Go to your Supabase project: https://app.supabase.com/project/ytqwwxlqqpqhhcpcqxax
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire content from `docs/custom-cms/fireside_schema.sql`
5. Paste it into the SQL editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

**Expected Result**: You should see "Success. No rows returned" - this creates all the tables.

## Step 2: Load Initial Content

1. Still in **SQL Editor**, create another **New Query**
2. Copy the entire content from `docs/custom-cms/seeds/initial_content.sql`
3. Paste it into the SQL editor
4. Click **Run**

**Expected Result**: You should see "Success. 3 rows affected" (or similar) - this creates 3 episodes, 5 artists, and 3 blog posts.

## Step 3: Verify Data

Check if data was loaded:

```sql
-- Check episodes
SELECT id, title, slug, featured FROM fireside_episodes;

-- Check artists
SELECT id, name, slug, featured FROM fireside_artists;

-- Check blog posts
SELECT id, title, slug, featured FROM fireside_blog_posts;
```

## Step 4: Test the Website

1. **Homepage**: Visit http://localhost:3000 - you should see featured content
2. **Episodes**: Visit http://localhost:3000/episodes - you should see all episodes
3. **Artists**: Visit http://localhost:3000/artists - you should see all artists
4. **Blog**: Visit http://localhost:3000/blog - you should see all blog posts

## Step 5: Test the Admin CMS

1. **Login**: Visit http://localhost:3000/admin/login
2. **Manage Content**:
   - Episodes: http://localhost:3000/admin/episodes
   - Artists: http://localhost:3000/admin/artists
   - Blog: http://localhost:3000/admin/blog

## How Changes Flow

```
Admin CMS
   ↓
Create/Update/Delete
   ↓
Supabase Database
   ↓
Auto-revalidation (server actions)
   ↓
Website Updates
```

When you create/edit content in the admin:
1. Server action saves to Supabase
2. `revalidatePath()` clears Next.js cache
3. Website automatically shows new content

## Troubleshooting

### Content not showing on website?
- Check Supabase SQL Editor to verify data exists
- Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
- Restart the dev server: `npm run dev`

### Can't login to admin?
- You need to create a Supabase Auth user first
- Go to Supabase Dashboard → Authentication → Users → Add User
- Use email/password authentication

### "Error fetching data" in admin?
- Verify SUPABASE_SERVICE_ROLE_KEY is set in `.env.local`
- Check Supabase project is active and not paused

## Next Steps

After setup is complete:
1. Browse the website to see seeded content
2. Login to admin and create new content
3. Refresh the website to see your changes appear
4. Set up RLS (Row Level Security) policies for production (optional)
