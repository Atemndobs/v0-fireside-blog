#!/usr/bin/env bash

# Usage: ./scripts/set-vercel-envs.sh [environment]
# Default environment is "production". Pass "preview" to configure Preview envs.
set -euo pipefail

ENVIRONMENT="${1:-production}"

vercel_env_add() {
  local key="$1"
  local value="$2"
  printf '%s\n' "$value" | vercel env add "$key" "$ENVIRONMENT"
}

echo "Configuring Vercel environment variables for '$ENVIRONMENT'..."

vercel_env_add NEXT_PUBLIC_SUPABASE_URL "https://ytqwwxlqqpqhhcpcqxax.supabase.co"
vercel_env_add NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXd3eGxxcXBxaGhjcGNxeGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNjI1MjMsImV4cCI6MjA0OTgzODUyM30.604P0qRCkPkktKO0trTS0BkUQUD2RuelkbuL55aEdbc"
vercel_env_add SUPABASE_SERVICE_ROLE_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXd3eGxxcXBxaGhjcGNxeGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDI2MjUyMywiZXhwIjoyMDQ5ODM4NTIzfQ.mSQ1tt_JZsqnZYGZuj6XGHNQphfKjO1BzsIYIJywWM4"
vercel_env_add NEXT_PUBLIC_ASSET_BUCKET "fireside_assets"
vercel_env_add NEXT_PUBLIC_ASSET_BASE_URL "https://fireside_assets.s3.amazonaws.com"

vercel_env_add NEXT_PUBLIC_POSTHOG_API_KEY "phc_aDJZsYri5GyzxdavXEQ23UYeDXO5DVcDrfDeCA5KDl1"
vercel_env_add NEXT_PUBLIC_POSTHOG_API_HOST "https://us.i.posthog.com"
vercel_env_add NEXT_PUBLIC_POSTHOG_UI_HOST "https://us.posthog.com"
vercel_env_add NEXT_PUBLIC_POSTHOG_USE_PROXY "false"
vercel_env_add NEXT_PUBLIC_POSTHOG_PROXY_ENABLED "false"
vercel_env_add NEXT_PUBLIC_POSTHOG_PROXY_HOST "/posthog"

vercel_env_add POSTHOG_HOST "https://us.i.posthog.com"
vercel_env_add POSTHOG_ASSETS_HOST "https://us-assets.i.posthog.com"
vercel_env_add POSTHOG_PROXY_ENABLED "false"
vercel_env_add POSTHOG_REGION "us"
vercel_env_add POSTHOG_PROXY_TIMEOUT "30000"
vercel_env_add POSTHOG_PROXY_DEBUG "true"

echo "Done. Re-run with './scripts/set-vercel-envs.sh preview' to configure Preview envs."
