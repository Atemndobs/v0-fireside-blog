# Convex → Payload Migration Results

**Date:** 2026-02-24T14:26:36.517Z
**Mode:** LIVE MIGRATION
**Limit:** None (full migration)
**Collections:** All

## Summary

- ✅ Created: 23
- ❌ Failed: 4
- ⏭️ Skipped: 0

## Details

### Artists

- Total: 11
- Created: 9
- Failed: 2
- Skipped: 0

### Posts

- Total: 0
- Created: 0
- Failed: 0
- Skipped: 0

### Episodes

- Total: 16
- Created: 14
- Failed: 2
- Skipped: 0

## Errors

1. Failed to create artist: Tayc - HTTP 400: {"errors":[{"name":"ValidationError","data":{"collection":"artists","errors":[{"message":"Value must be unique","path":"slug"}]},"message":"The following field is invalid: slug"}]}
2. Failed to create artist: Lebianca - HTTP 400: {"errors":[{"name":"ValidationError","data":{"collection":"artists","errors":[{"message":"Value must be unique","path":"slug"}]},"message":"The following field is invalid: slug"}]}
3. Failed to create episode: Cameroonian Songwriting;  Lyrics that Resonate. - HTTP 400: {"errors":[{"name":"ValidationError","data":{"collection":"episodes","errors":[{"message":"Value must be unique","path":"slug"}]},"message":"The following field is invalid: slug"}]}
4. Failed to create episode: The Rise of Cameroonian Dancers: And their Impact in the Music Game - HTTP 400: {"errors":[{"name":"ValidationError","data":{"collection":"episodes","errors":[{"message":"Value must be unique","path":"slug"}]},"message":"The following field is invalid: slug"}]}

## Next Steps

1. ⚠️ Some records failed to migrate (see errors above)
2. Check Payload admin at http://localhost:3000/admin
3. Review error messages and fix data issues
4. Re-run migration for failed records

## Verification

To verify the migration:

```bash
# Check record counts in Payload
curl -H "Authorization: JWT <token>" http://localhost:3000/api/artists
curl -H "Authorization: JWT <token>" http://localhost:3000/api/posts
curl -H "Authorization: JWT <token>" http://localhost:3000/api/episodes
```

Or visit the Payload admin:
- Artists: http://localhost:3000/admin/collections/artists
- Posts: http://localhost:3000/admin/collections/posts
- Episodes: http://localhost:3000/admin/collections/episodes
