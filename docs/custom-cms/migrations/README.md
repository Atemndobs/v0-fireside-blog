# Database Migrations

This directory contains SQL migration files for the Fireside CMS.

## How to Run Migrations

### Option 1: Supabase Dashboard (Recommended)

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New query**
5. Copy and paste the SQL from the migration file
6. Click **Run** to execute

### Option 2: Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase db push --db-url postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]
```

Or connect to your database directly:

```bash
psql postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE] < docs/custom-cms/migrations/001_add_country_to_artists.sql
```

### Option 3: Use psql directly

If you have PostgreSQL client installed:

1. Get your database connection string from Supabase Dashboard > Settings > Database
2. Run:

```bash
psql "<your-connection-string>" -f docs/custom-cms/migrations/001_add_country_to_artists.sql
```

## Migration Files

- `001_add_country_to_artists.sql` - Adds country_code column to fireside_artists table

## After Running Migrations

After running a migration, verify it was successful by checking:

1. Go to **Table Editor** in Supabase Dashboard
2. Select the `fireside_artists` table
3. Verify the `country_code` column exists with type `varchar(2)` and default value `CM`
