# Vercel Environment Variables Setup

This guide helps you set up all required environment variables for the Fireside Tribe project on Vercel.

## Prerequisites

- Vercel CLI installed (`npm i -g vercel`)
- Logged into Vercel (`vercel login`)
- Project linked to Vercel (`vercel link`)

## Required Environment Variables

Based on your `vercel env ls` output, you have most variables set. However, you need to ensure the **service role key** is properly configured.

## Quick Setup Script

Run these commands in your terminal:

### 1. Check Current Environment Variables

```bash
vercel env ls
```

### 2. Add Missing SUPABASE_SERVICE_ROLE_KEY (if not set)

```bash
# This will prompt you to enter the value
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

When prompted:
1. Select environments: **Production**, **Preview**, **Development** (use space to select, enter to confirm)
2. Paste the service role key when asked:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXd3eGxxcXBxaGhjcGNxeGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDI2MjUyMywiZXhwIjoyMDQ5ODM4NTIzfQ.mSQ1tt_JZsqnZYGZuj6XGHNQphfKjO1BzsIYIJywWM4
   ```

### 3. Add NEXT_PUBLIC_ASSET_BUCKET (if not set)

```bash
vercel env add NEXT_PUBLIC_ASSET_BUCKET
```

When prompted, enter: `fireside_assets`

### 4. Verify All Variables Are Set

```bash
vercel env ls
```

You should see output similar to:

```
name                                       value               environments
SUPABASE_SERVICE_ROLE_KEY                  Encrypted           Production, Preview, Development
NEXT_PUBLIC_ASSET_BUCKET                   Encrypted           Production, Preview, Development
NEXT_PUBLIC_SUPABASE_URL                   Encrypted           Production, Preview, Development
NEXT_PUBLIC_SUPABASE_ANON_KEY              Encrypted           Production, Preview, Development
```

## Alternative: Add Variables via Vercel Dashboard

If you prefer using the web interface:

1. **Go to Vercel Dashboard**
   - Navigate to: https://vercel.com/dashboard
   - Select your project

2. **Navigate to Environment Variables**
   - Click **Settings** → **Environment Variables**

3. **Add Each Variable**

   Click **Add New** and enter:

   **Variable 1: SUPABASE_SERVICE_ROLE_KEY**
   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXd3eGxxcXBxaGhjcGNxeGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDI2MjUyMywiZXhwIjoyMDQ5ODM4NTIzfQ.mSQ1tt_JZsqnZYGZuj6XGHNQphfKjO1BzsIYIJywWM4`
   - Environments: Check all (Production, Preview, Development)
   - Click **Save**

   **Variable 2: NEXT_PUBLIC_ASSET_BUCKET**
   - Name: `NEXT_PUBLIC_ASSET_BUCKET`
   - Value: `fireside_assets`
   - Environments: Check all
   - Click **Save**

## Verify Setup

### Method 1: Pull Environment Variables Locally

```bash
# Pull all environment variables from Vercel
vercel env pull .env.vercel

# Compare with your local .env.local
cat .env.vercel
```

### Method 2: Test in Preview Deployment

```bash
# Create a preview deployment
git add .
git commit -m "Test: Verify environment variables"
git push

# Or directly deploy
vercel --prod
```

Then check the deployment logs for any environment variable errors.

## Full Environment Variables Checklist

Make sure ALL these variables are set in Vercel:

### Supabase Configuration
- [ ] `NEXT_PUBLIC_SUPABASE_URL` = `https://ytqwwxlqqpqhhcpcqxax.supabase.co`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXd3eGxxcXBxaGhjcGNxeGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNjI1MjMsImV4cCI6MjA0OTgzODUyM30.604P0qRCkPkktKO0trTS0BkUQUD2RuelkbuL55aEdbc`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXd3eGxxcXBxaGhjcGNxeGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDI2MjUyMywiZXhwIjoyMDQ5ODM4NTIzfQ.mSQ1tt_JZsqnZYGZuj6XGHNQphfKjO1BzsIYIJywWM4`

### Asset Storage
- [ ] `NEXT_PUBLIC_ASSET_BUCKET` = `fireside_assets`
- [ ] `NEXT_PUBLIC_ASSET_BASE_URL` = `https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets` (optional, or keep S3 URL for backward compatibility)

### PostHog Analytics (Already Set)
- [x] `NEXT_PUBLIC_POSTHOG_API_KEY`
- [x] `NEXT_PUBLIC_POSTHOG_API_HOST`
- [x] `NEXT_PUBLIC_POSTHOG_UI_HOST`
- [x] `NEXT_PUBLIC_POSTHOG_USE_PROXY`
- [x] `NEXT_PUBLIC_POSTHOG_PROXY_ENABLED`
- [x] `NEXT_PUBLIC_POSTHOG_PROXY_HOST`
- [x] `POSTHOG_HOST`
- [x] `POSTHOG_ASSETS_HOST`
- [x] `POSTHOG_PROXY_ENABLED`
- [x] `POSTHOG_REGION`
- [x] `POSTHOG_PROXY_TIMEOUT`
- [x] `POSTHOG_PROXY_DEBUG`

### Other
- [ ] `SUPABASE_INVITE_REDIRECT_URL` (Already set)

## Common Issues

### Issue: "Environment variable not found" during build

**Solution**: Make sure the variable is added to all three environments (Production, Preview, Development)

```bash
# Check which environments have the variable
vercel env ls

# Add to missing environments
vercel env add VARIABLE_NAME
```

### Issue: Variables not updating after deployment

**Solution**: Redeploy the application

```bash
# Redeploy to production
vercel --prod

# Or trigger a redeploy from the dashboard
# Go to Deployments → Click on latest deployment → Redeploy
```

### Issue: Can't access service role key

**Solution**: Retrieve it from Supabase

1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Settings** → **API**
4. Find **service_role** key under **Project API keys**
5. Click **Reveal** to see the key

## After Adding Variables

1. **Trigger a new deployment** to apply the changes:
   ```bash
   vercel --prod
   ```

2. **Test the upload functionality**:
   - Go to your production site's admin panel
   - Try uploading an image
   - Verify it displays correctly

3. **Monitor deployment logs** for any errors:
   ```bash
   vercel logs
   ```

## Security Best Practices

- ✅ **NEVER** commit `.env.local` or `.env.vercel` to Git
- ✅ **NEVER** share your `SUPABASE_SERVICE_ROLE_KEY` publicly
- ✅ Use Vercel's encrypted environment variables
- ✅ Rotate keys periodically for enhanced security
- ✅ Use different Supabase projects for development and production (optional but recommended)

## Quick Reference Commands

```bash
# List all environment variables
vercel env ls

# Add a new environment variable
vercel env add VARIABLE_NAME

# Remove an environment variable
vercel env rm VARIABLE_NAME

# Pull environment variables to local file
vercel env pull .env.vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# Check current project
vercel project ls
```

---

**Last Updated**: November 16, 2024
**Related Documentation**:
- [Supabase Storage Setup](SUPABASE_STORAGE_SETUP.md)
- [Setup Supabase](SETUP_SUPABASE.md)
