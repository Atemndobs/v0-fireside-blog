# Migration Scripts

## 📁 Available Scripts

### ✅ **migrate-via-api.mjs** (USE THIS ONE!)
The **production-ready** migration script that works around Payload's environment loader bug.

**Usage:**
```bash
# Dry run (preview only)
node scripts/migrate-via-api.mjs --dry-run

# Test with limited records
node scripts/migrate-via-api.mjs --limit 5

# Full migration
node scripts/migrate-via-api.mjs

# Migrate specific collections
node scripts/migrate-via-api.mjs --only artists
node scripts/migrate-via-api.mjs --only episodes,posts
```

**Features:**
- ✅ Bypasses Payload environment loader bug
- ✅ Uses HTTP API with JWT authentication
- ✅ Comprehensive error handling
- ✅ Progress reporting
- ✅ Generates MIGRATION_RESULTS.md

---

### 🔍 **verify-migration.mjs**
Quick verification tool to check if migration succeeded.

**Usage:**
```bash
node scripts/verify-migration.mjs
```

**Output:**
- Shows record counts for each collection
- Lists sample records
- Provides admin panel links

---

### ⚠️ **migrate-convex-to-payload.ts** (BROKEN - DO NOT USE)
The original migration script that fails due to Payload's environment loader bug.

**Error:**
```
Cannot destructure property 'loadEnvConfig'
```

**Status:** Deprecated - Use `migrate-via-api.mjs` instead

---

### 🧪 **migrate-simple.mjs** (EXPERIMENTAL)
A simplified test script created during debugging.

**Status:** Not needed - Use `migrate-via-api.mjs` instead

---

## 📊 Migration Status

**Last Run:** February 24, 2026  
**Status:** ✅ **SUCCESS**  
**Records Migrated:** 27 (11 artists, 16 episodes, 0 posts)

See `MIGRATION_RESULTS.md` for detailed report.

---

## 🆘 Need Help?

1. Check `../MIGRATION_GUIDE.md` for complete documentation
2. Check `../MIGRATION_COMPLETE.md` for quick start guide
3. Run `node scripts/verify-migration.mjs` to verify data

---

## 🔄 Re-running Migrations

The script is **idempotent** - it won't create duplicates!

If a record already exists (same slug), it will:
- Detect the unique constraint violation
- Log a "failed" message (this is normal)
- Continue with remaining records

**Example:**
```bash
# Safe to re-run multiple times
node scripts/migrate-via-api.mjs
# Output: "Value must be unique" = record already exists (good!)
```

---

## 🎯 Quick Commands

```bash
# Verify migration worked
node scripts/verify-migration.mjs

# Check what would be migrated (dry run)
node scripts/migrate-via-api.mjs --dry-run

# Migrate just artists
node scripts/migrate-via-api.mjs --only artists

# Test with 2 records per collection
node scripts/migrate-via-api.mjs --limit 2
```

---

**All scripts created by:** OpenClaw Subagent  
**Date:** February 24, 2026
