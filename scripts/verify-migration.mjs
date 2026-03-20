#!/usr/bin/env node
/**
 * Quick Migration Verification Script
 * 
 * Checks if data was successfully migrated to Payload
 * 
 * Usage: node scripts/verify-migration.mjs
 */

const PAYLOAD_URL = 'http://localhost:3000';

async function fetchCollection(collection) {
  try {
    const response = await fetch(`${PAYLOAD_URL}/api/${collection}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`❌ Failed to fetch ${collection}: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🔍 Verifying Payload Migration...\n');
  console.log(`Checking: ${PAYLOAD_URL}\n`);
  
  // Check if Payload is running
  try {
    const response = await fetch(`${PAYLOAD_URL}/admin`);
    if (!response.ok) {
      console.error('❌ Payload is not running!');
      console.error('   Start it with: npm run dev');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Cannot connect to Payload at http://localhost:3000');
    console.error('   Make sure Payload is running: npm run dev');
    process.exit(1);
  }
  
  console.log('✅ Payload is running\n');
  
  // Fetch collections
  const [artists, episodes, posts] = await Promise.all([
    fetchCollection('artists'),
    fetchCollection('episodes'),
    fetchCollection('posts'),
  ]);
  
  // Display results
  console.log('📊 MIGRATION VERIFICATION RESULTS');
  console.log('='.repeat(60));
  
  if (artists) {
    console.log(`\n🎤 Artists: ${artists.totalDocs} records`);
    if (artists.totalDocs > 0) {
      console.log('   Sample records:');
      artists.docs.slice(0, 5).forEach((artist, i) => {
        console.log(`   ${i + 1}. ${artist.name} (${artist.slug})`);
      });
      if (artists.totalDocs > 5) {
        console.log(`   ... and ${artists.totalDocs - 5} more`);
      }
    }
  }
  
  if (episodes) {
    console.log(`\n📺 Episodes: ${episodes.totalDocs} records`);
    if (episodes.totalDocs > 0) {
      console.log('   Sample records:');
      episodes.docs.slice(0, 5).forEach((episode, i) => {
        console.log(`   ${i + 1}. ${episode.title}`);
      });
      if (episodes.totalDocs > 5) {
        console.log(`   ... and ${episodes.totalDocs - 5} more`);
      }
    }
  }
  
  if (posts) {
    console.log(`\n📝 Posts: ${posts.totalDocs} records`);
    if (posts.totalDocs > 0) {
      console.log('   Sample records:');
      posts.docs.slice(0, 5).forEach((post, i) => {
        console.log(`   ${i + 1}. ${post.title}`);
      });
      if (posts.totalDocs > 5) {
        console.log(`   ... and ${posts.totalDocs - 5} more`);
      }
    } else {
      console.log('   ⚠️ No blog posts found (this is normal if none existed in Convex)');
    }
  }
  
  console.log('\n' + '='.repeat(60));
  
  const totalRecords = (artists?.totalDocs || 0) + (episodes?.totalDocs || 0) + (posts?.totalDocs || 0);
  
  if (totalRecords > 0) {
    console.log(`\n✅ SUCCESS! ${totalRecords} total records found in Payload`);
    console.log('\n📱 View in Payload Admin:');
    console.log(`   ${PAYLOAD_URL}/admin/collections/artists`);
    console.log(`   ${PAYLOAD_URL}/admin/collections/episodes`);
    console.log(`   ${PAYLOAD_URL}/admin/collections/posts`);
  } else {
    console.log('\n⚠️ WARNING: No records found in Payload');
    console.log('   Run the migration script: node scripts/migrate-via-api.mjs');
  }
  
  console.log('\n');
}

main().catch(error => {
  console.error('\n💥 Verification failed:', error.message);
  process.exit(1);
});
