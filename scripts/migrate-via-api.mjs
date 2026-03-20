#!/usr/bin/env node
/**
 * Convex → Payload Migration Script (HTTP API Version)
 * 
 * This script migrates content from Convex to Payload CMS using HTTP API
 * to bypass the Payload environment loader bug.
 * 
 * USAGE:
 *   # Dry run (fetch and validate without creating records)
 *   node scripts/migrate-via-api.mjs --dry-run
 * 
 *   # Real migration (limited to 5 records per collection for testing)
 *   node scripts/migrate-via-api.mjs --limit 5
 * 
 *   # Full migration
 *   node scripts/migrate-via-api.mjs
 * 
 *   # Migrate specific collections only
 *   node scripts/migrate-via-api.mjs --only artists
 *   node scripts/migrate-via-api.mjs --only episodes,posts
 * 
 * REQUIREMENTS:
 *   - Payload admin must be running at http://localhost:3000/admin
 *   - .env.local must contain POSTGRES_URL and PAYLOAD_SECRET
 *   - Admin credentials: atemndobs@gmail.com / Atemkeng2022
 * 
 * TECHNICAL DETAILS:
 *   - Loads .env.local manually with dotenv
 *   - Fetches from Convex using ConvexHttpClient
 *   - Creates records via Payload HTTP API (POST /api/[collection])
 *   - Includes authentication using admin credentials
 *   - Progress reporting with emoji indicators
 *   - Error handling with detailed logs
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { config as dotenvConfig } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// ============================================
// Load Environment Variables
// ============================================
console.log('🔧 Loading environment variables...');
const envPath = join(projectRoot, '.env.local');
dotenvConfig({ path: envPath });

// Set Convex URL (discovered from .claude/settings.local.json)
process.env.NEXT_PUBLIC_CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || 'https://agile-owl-76.convex.cloud';

console.log(`✅ Convex URL: ${process.env.NEXT_PUBLIC_CONVEX_URL}`);
console.log(`✅ Payload URL: ${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}`);
console.log(`✅ Database: ${process.env.POSTGRES_URL ? 'Connected' : '❌ Not configured'}\n`);

if (!process.env.POSTGRES_URL) {
  console.error('❌ POSTGRES_URL is not set in .env.local');
  process.exit(1);
}

// ============================================
// Import Convex Client (ESM-compatible)
// ============================================
const { ConvexHttpClient } = await import('convex/browser');

// Create Convex client
const convexClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// ============================================
// Convex API Functions (dynamic imports)
// ============================================
// Load convex/_generated/api.js dynamically
const apiModule = await import('../convex/_generated/api.js');
const api = apiModule.api;

// Fetch functions
async function getAllEpisodes() {
  return await convexClient.query(api.queries.getEpisodes, {});
}

async function getAllArtists() {
  return await convexClient.query(api.queries.getArtists, {});
}

async function getAllBlogPosts() {
  return await convexClient.query(api.queries.getBlogPosts, {});
}

// ============================================
// Payload HTTP API Client
// ============================================
const PAYLOAD_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
const ADMIN_EMAIL = 'atemndobs@gmail.com';
const ADMIN_PASSWORD = 'Atemkeng2022';

let authToken = null;

/**
 * Authenticate with Payload and get JWT token
 */
async function authenticate() {
  console.log('🔐 Authenticating with Payload...');
  
  try {
    const response = await fetch(`${PAYLOAD_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Authentication failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    authToken = data.token;
    
    console.log('✅ Authentication successful\n');
    return authToken;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    console.error('\nMake sure:');
    console.error('  1. Payload is running at http://localhost:3000');
    console.error('  2. Admin user exists with email: atemndobs@gmail.com');
    console.error('  3. Password is correct: Atemkeng2022\n');
    throw error;
  }
}

/**
 * Create a record in Payload via HTTP API
 */
async function createPayloadRecord(collection, data) {
  if (!authToken) {
    throw new Error('Not authenticated. Call authenticate() first.');
  }

  const response = await fetch(`${PAYLOAD_URL}/api/${collection}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${authToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return await response.json();
}

// ============================================
// Migration Functions
// ============================================

async function migrateEpisodes({ dryRun = false, limit = null } = {}) {
  console.log('\n📺 Migrating Episodes from Convex...');
  
  const convexEpisodes = await getAllEpisodes();
  console.log(`Found ${convexEpisodes.length} episodes in Convex`);
  
  const episodesToMigrate = limit ? convexEpisodes.slice(0, limit) : convexEpisodes;
  console.log(`Will migrate ${episodesToMigrate.length} episodes${limit ? ` (limited to ${limit})` : ''}`);
  
  if (dryRun) {
    console.log('🔍 DRY RUN - No records will be created\n');
    episodesToMigrate.forEach((ep, i) => {
      console.log(`  ${i + 1}. ${ep.title} (${ep.slug})`);
    });
    return { total: episodesToMigrate.length, created: 0, failed: 0, skipped: episodesToMigrate.length };
  }
  
  let created = 0;
  let failed = 0;
  const errors = [];
  
  for (const episode of episodesToMigrate) {
    try {
      const payloadData = {
        title: episode.title,
        slug: episode.slug,
        description: episode.description || '',
        publishedAt: new Date(episode.publishedAt).toISOString(),
        coverImageUrl: episode.coverImageUrl,
        coverImageAlt: episode.coverImageAlt || episode.title,
        spotifyUrl: episode.spotifyUrl,
        spotifyId: episode.spotifyId,
        youtubeUrl: episode.youtubeUrl,
        youtubeId: episode.youtubeId,
        durationSeconds: episode.durationSeconds,
        // Convert rich text if needed
        showNotes: episode.showNotes || null,
        featured: episode.featured || false,
        autoSynced: episode.autoSynced || false,
        lastSyncedAt: episode.lastSyncedAt ? new Date(episode.lastSyncedAt).toISOString() : null,
      };
      
      await createPayloadRecord('episodes', payloadData);
      created++;
      console.log(`  ✅ [${created}/${episodesToMigrate.length}] ${episode.title}`);
    } catch (err) {
      failed++;
      const errorMsg = `Failed to create episode: ${episode.title} - ${err.message}`;
      errors.push(errorMsg);
      console.error(`  ❌ [${failed} failed] ${episode.title}`);
      console.error(`     Error: ${err.message}`);
    }
  }
  
  console.log(`\n✨ Episodes: ${created} created, ${failed} failed`);
  return { total: episodesToMigrate.length, created, failed, skipped: 0, errors };
}

async function migrateArtists({ dryRun = false, limit = null } = {}) {
  console.log('\n🎤 Migrating Artists from Convex...');
  
  const convexArtists = await getAllArtists();
  console.log(`Found ${convexArtists.length} artists in Convex`);
  
  const artistsToMigrate = limit ? convexArtists.slice(0, limit) : convexArtists;
  console.log(`Will migrate ${artistsToMigrate.length} artists${limit ? ` (limited to ${limit})` : ''}`);
  
  if (dryRun) {
    console.log('🔍 DRY RUN - No records will be created\n');
    artistsToMigrate.forEach((artist, i) => {
      console.log(`  ${i + 1}. ${artist.name} (${artist.slug})`);
    });
    return { total: artistsToMigrate.length, created: 0, failed: 0, skipped: artistsToMigrate.length };
  }
  
  let created = 0;
  let failed = 0;
  const errors = [];
  
  for (const artist of artistsToMigrate) {
    try {
      // Extract social links from Convex format
      const socialLinks = artist.socialLinks || {};
      
      const payloadData = {
        name: artist.name,
        slug: artist.slug,
        shortDescription: artist.shortDescription || '',
        bio: artist.bio || null,
        profileImageUrl: artist.profileImageUrl,
        profileImageAlt: artist.profileImageAlt || artist.name,
        genre: artist.genre,
        countryCode: artist.countryCode || 'CM',
        socialLinks: {
          spotifyUrl: socialLinks.spotify || '',
          youtubeUrl: socialLinks.youtube || '',
          instagramUrl: socialLinks.instagram || '',
          twitterUrl: socialLinks.twitter || '',
        },
        featured: artist.featured || false,
        orderRank: artist.orderRank || 0,
      };
      
      await createPayloadRecord('artists', payloadData);
      created++;
      console.log(`  ✅ [${created}/${artistsToMigrate.length}] ${artist.name}`);
    } catch (err) {
      failed++;
      const errorMsg = `Failed to create artist: ${artist.name} - ${err.message}`;
      errors.push(errorMsg);
      console.error(`  ❌ [${failed} failed] ${artist.name}`);
      console.error(`     Error: ${err.message}`);
    }
  }
  
  console.log(`\n✨ Artists: ${created} created, ${failed} failed`);
  return { total: artistsToMigrate.length, created, failed, skipped: 0, errors };
}

async function migrateBlogPosts({ dryRun = false, limit = null } = {}) {
  console.log('\n📝 Migrating Blog Posts from Convex...');
  
  const convexPosts = await getAllBlogPosts();
  console.log(`Found ${convexPosts.length} blog posts in Convex`);
  
  const postsToMigrate = limit ? convexPosts.slice(0, limit) : convexPosts;
  console.log(`Will migrate ${postsToMigrate.length} posts${limit ? ` (limited to ${limit})` : ''}`);
  
  if (dryRun) {
    console.log('🔍 DRY RUN - No records will be created\n');
    postsToMigrate.forEach((post, i) => {
      console.log(`  ${i + 1}. ${post.title} (${post.slug})`);
    });
    return { total: postsToMigrate.length, created: 0, failed: 0, skipped: postsToMigrate.length };
  }
  
  let created = 0;
  let failed = 0;
  const errors = [];
  
  for (const post of postsToMigrate) {
    try {
      const payloadData = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        author: post.author || 'The Fireside Tribe',
        featuredImageUrl: post.featuredImageUrl,
        featuredImageAlt: post.featuredImageAlt || post.title,
        publishedAt: new Date(post.publishedAt).toISOString(),
        content: post.content || null,
        featured: post.featured || false,
        published: post.published !== false, // default to true
        readingTimeMinutes: post.readingTimeMinutes,
      };
      
      await createPayloadRecord('posts', payloadData);
      created++;
      console.log(`  ✅ [${created}/${postsToMigrate.length}] ${post.title}`);
    } catch (err) {
      failed++;
      const errorMsg = `Failed to create blog post: ${post.title} - ${err.message}`;
      errors.push(errorMsg);
      console.error(`  ❌ [${failed} failed] ${post.title}`);
      console.error(`     Error: ${err.message}`);
    }
  }
  
  console.log(`\n✨ Blog Posts: ${created} created, ${failed} failed`);
  return { total: postsToMigrate.length, created, failed, skipped: 0, errors };
}

// ============================================
// Main Migration Logic
// ============================================

async function main() {
  console.log('🚀 Starting Convex → Payload Migration (HTTP API)\n');
  
  // Parse command-line arguments
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const limitIndex = args.indexOf('--limit');
  const limit = limitIndex !== -1 && args[limitIndex + 1] ? parseInt(args[limitIndex + 1]) : null;
  const onlyIndex = args.indexOf('--only');
  const only = onlyIndex !== -1 && args[onlyIndex + 1] ? args[onlyIndex + 1].split(',') : null;
  
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No data will be created\n');
  }
  
  if (limit) {
    console.log(`📊 LIMIT MODE - Maximum ${limit} records per collection\n`);
  }
  
  if (only) {
    console.log(`🎯 SELECTIVE MODE - Only migrating: ${only.join(', ')}\n`);
  }
  
  // Authenticate with Payload (not needed for dry run)
  if (!dryRun) {
    await authenticate();
  }
  
  // Track results
  const results = {
    artists: null,
    posts: null,
    episodes: null,
  };
  
  // Run migrations in order (artists first, then posts, then episodes)
  // This ensures relationships work correctly
  
  if (!only || only.includes('artists')) {
    results.artists = await migrateArtists({ dryRun, limit });
  }
  
  if (!only || only.includes('posts')) {
    results.posts = await migrateBlogPosts({ dryRun, limit });
  }
  
  if (!only || only.includes('episodes')) {
    results.episodes = await migrateEpisodes({ dryRun, limit });
  }
  
  // ============================================
  // Summary Report
  // ============================================
  console.log('\n' + '='.repeat(60));
  console.log('📊 MIGRATION SUMMARY');
  console.log('='.repeat(60));
  
  let totalCreated = 0;
  let totalFailed = 0;
  let totalSkipped = 0;
  const allErrors = [];
  
  for (const [collection, result] of Object.entries(results)) {
    if (result) {
      console.log(`\n${collection.toUpperCase()}:`);
      console.log(`  Total: ${result.total}`);
      console.log(`  Created: ${result.created}`);
      console.log(`  Failed: ${result.failed}`);
      console.log(`  Skipped: ${result.skipped}`);
      
      totalCreated += result.created;
      totalFailed += result.failed;
      totalSkipped += result.skipped;
      
      if (result.errors && result.errors.length > 0) {
        allErrors.push(...result.errors);
      }
    }
  }
  
  console.log('\n' + '-'.repeat(60));
  console.log(`TOTAL: ${totalCreated} created, ${totalFailed} failed, ${totalSkipped} skipped`);
  console.log('='.repeat(60));
  
  // ============================================
  // Save Results to File
  // ============================================
  const reportPath = join(projectRoot, 'MIGRATION_RESULTS.md');
  const timestamp = new Date().toISOString();
  
  let report = `# Convex → Payload Migration Results\n\n`;
  report += `**Date:** ${timestamp}\n`;
  report += `**Mode:** ${dryRun ? 'DRY RUN' : 'LIVE MIGRATION'}\n`;
  report += `**Limit:** ${limit || 'None (full migration)'}\n`;
  report += `**Collections:** ${only ? only.join(', ') : 'All'}\n\n`;
  
  report += `## Summary\n\n`;
  report += `- ✅ Created: ${totalCreated}\n`;
  report += `- ❌ Failed: ${totalFailed}\n`;
  report += `- ⏭️ Skipped: ${totalSkipped}\n\n`;
  
  report += `## Details\n\n`;
  for (const [collection, result] of Object.entries(results)) {
    if (result) {
      report += `### ${collection.charAt(0).toUpperCase() + collection.slice(1)}\n\n`;
      report += `- Total: ${result.total}\n`;
      report += `- Created: ${result.created}\n`;
      report += `- Failed: ${result.failed}\n`;
      report += `- Skipped: ${result.skipped}\n\n`;
    }
  }
  
  if (allErrors.length > 0) {
    report += `## Errors\n\n`;
    allErrors.forEach((error, i) => {
      report += `${i + 1}. ${error}\n`;
    });
    report += `\n`;
  }
  
  report += `## Next Steps\n\n`;
  
  if (dryRun) {
    report += `1. ✅ Dry run completed successfully\n`;
    report += `2. Run again without --dry-run to perform actual migration\n`;
    report += `3. Consider using --limit 5 first to test with a small batch\n\n`;
  } else if (totalFailed > 0) {
    report += `1. ⚠️ Some records failed to migrate (see errors above)\n`;
    report += `2. Check Payload admin at http://localhost:3000/admin\n`;
    report += `3. Review error messages and fix data issues\n`;
    report += `4. Re-run migration for failed records\n\n`;
  } else {
    report += `1. ✅ All records migrated successfully!\n`;
    report += `2. Visit http://localhost:3000/admin to verify data\n`;
    report += `3. Update frontend pages to use Payload API\n`;
    report += `4. Test ISR revalidation\n`;
    report += `5. Deploy to Vercel\n\n`;
  }
  
  report += `## Verification\n\n`;
  report += `To verify the migration:\n\n`;
  report += `\`\`\`bash\n`;
  report += `# Check record counts in Payload\n`;
  report += `curl -H "Authorization: JWT <token>" http://localhost:3000/api/artists\n`;
  report += `curl -H "Authorization: JWT <token>" http://localhost:3000/api/posts\n`;
  report += `curl -H "Authorization: JWT <token>" http://localhost:3000/api/episodes\n`;
  report += `\`\`\`\n\n`;
  
  report += `Or visit the Payload admin:\n`;
  report += `- Artists: http://localhost:3000/admin/collections/artists\n`;
  report += `- Posts: http://localhost:3000/admin/collections/posts\n`;
  report += `- Episodes: http://localhost:3000/admin/collections/episodes\n`;
  
  // Write report to file
  await import('fs/promises').then(fs => fs.writeFile(reportPath, report, 'utf-8'));
  
  console.log(`\n📄 Full report saved to: MIGRATION_RESULTS.md\n`);
  
  if (!dryRun) {
    console.log('🎉 Migration complete!');
    console.log('\nNext steps:');
    console.log('  1. Visit http://localhost:3000/admin to verify data');
    console.log('  2. Check MIGRATION_RESULTS.md for detailed report');
    
    if (totalFailed > 0) {
      console.log('  3. ⚠️ Review errors above and re-run migration if needed\n');
    } else {
      console.log('  3. Update frontend pages to use Payload API');
      console.log('  4. Test and deploy!\n');
    }
  } else {
    console.log('🔍 Dry run complete!');
    console.log('\nTo perform the actual migration:');
    console.log('  node scripts/migrate-via-api.mjs --limit 5   # Test with 5 records');
    console.log('  node scripts/migrate-via-api.mjs             # Full migration\n');
  }
  
  process.exit(totalFailed > 0 ? 1 : 0);
}

// ============================================
// Run Migration
// ============================================
main().catch((err) => {
  console.error('\n💥 Migration failed with error:', err);
  console.error('\nStack trace:', err.stack);
  process.exit(1);
});
