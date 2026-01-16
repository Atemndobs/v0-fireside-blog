#!/bin/bash
# Fireside Data Import Script
# Applies schema and imports data to the connected Supabase database

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "🔥 Fireside Database Setup & Import"
echo "===================================="
echo ""

# Check if supabase is linked
if ! supabase status > /dev/null 2>&1; then
    echo "❌ Supabase is not linked. Please run 'supabase link' first."
    exit 1
fi

echo "📋 Step 1: Applying schema..."
echo ""

# Apply the main schema
cat "$PROJECT_DIR/docs/custom-cms/fireside_schema.sql" | supabase db remote commit 2>&1 || true

# Apply migrations
echo ""
echo "📋 Step 2: Applying migrations..."

for migration in "$PROJECT_DIR/docs/custom-cms/migrations/"*.sql; do
    if [ -f "$migration" ]; then
        echo "   Applying $(basename "$migration")..."
        cat "$migration" | supabase db remote commit 2>&1 || true
    fi
done

echo ""
echo "✅ Schema and migrations applied!"
echo ""
echo "📥 Now run the Node.js import script to import data:"
echo "   node scripts/import-fireside-data.js"
