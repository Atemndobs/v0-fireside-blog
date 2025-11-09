const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ytqwwxlqqpqhhcpcqxax.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXd3eGxxcXBxaGhjcGNxeGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDI2MjUyMywiZXhwIjoyMDQ5ODM4NTIzfQ.mSQ1tt_JZsqnZYGZuj6XGHNQphfKjO1BzsIYIJywWM4';

const supabase = createClient(supabaseUrl, serviceKey);

// Convert S3 URL to Supabase URL
function convertS3ToSupabase(s3Url) {
  if (!s3Url || !s3Url.includes('fireside_assets.s3.amazonaws.com')) {
    return s3Url; // Return unchanged if not an S3 URL
  }

  // Extract the path after /images/
  // From: https://fireside_assets.s3.amazonaws.com/images/kang_Gang.png
  // To: https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/kang_Gang.png

  const match = s3Url.match(/\/images\/(.+)$/);
  if (match && match[1]) {
    const filename = match[1];
    return `https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/${filename}`;
  }

  return s3Url;
}

async function migrateURLs() {
  console.log('🔄 Starting URL migration from S3 to Supabase...\n');

  // Migrate Episodes
  console.log('📺 Migrating Episodes...');
  const { data: episodes } = await supabase
    .from('fireside_episodes')
    .select('id, title, cover_image_url');

  let episodeCount = 0;
  for (const episode of episodes || []) {
    if (episode.cover_image_url && episode.cover_image_url.includes('fireside_assets.s3.amazonaws.com')) {
      const newUrl = convertS3ToSupabase(episode.cover_image_url);
      console.log(`  ✓ ${episode.title}`);
      console.log(`    Old: ${episode.cover_image_url}`);
      console.log(`    New: ${newUrl}`);

      await supabase
        .from('fireside_episodes')
        .update({ cover_image_url: newUrl })
        .eq('id', episode.id);

      episodeCount++;
    }
  }
  console.log(`✅ Updated ${episodeCount} episodes\n`);

  // Migrate Artists
  console.log('🎤 Migrating Artists...');
  const { data: artists } = await supabase
    .from('fireside_artists')
    .select('id, name, profile_image_url');

  let artistCount = 0;
  for (const artist of artists || []) {
    if (artist.profile_image_url && artist.profile_image_url.includes('fireside_assets.s3.amazonaws.com')) {
      const newUrl = convertS3ToSupabase(artist.profile_image_url);
      console.log(`  ✓ ${artist.name}`);
      console.log(`    Old: ${artist.profile_image_url}`);
      console.log(`    New: ${newUrl}`);

      await supabase
        .from('fireside_artists')
        .update({ profile_image_url: newUrl })
        .eq('id', artist.id);

      artistCount++;
    }
  }
  console.log(`✅ Updated ${artistCount} artists\n`);

  // Migrate Blog Posts
  console.log('📝 Migrating Blog Posts...');
  const { data: posts } = await supabase
    .from('fireside_blog_posts')
    .select('id, title, featured_image_url');

  let postCount = 0;
  for (const post of posts || []) {
    if (post.featured_image_url && post.featured_image_url.includes('fireside_assets.s3.amazonaws.com')) {
      const newUrl = convertS3ToSupabase(post.featured_image_url);
      console.log(`  ✓ ${post.title}`);
      console.log(`    Old: ${post.featured_image_url}`);
      console.log(`    New: ${newUrl}`);

      await supabase
        .from('fireside_blog_posts')
        .update({ featured_image_url: newUrl })
        .eq('id', post.id);

      postCount++;
    }
  }
  console.log(`✅ Updated ${postCount} blog posts\n`);

  console.log('🎉 Migration complete!');
  console.log(`Total updates: ${episodeCount + artistCount + postCount}`);
}

migrateURLs().catch(console.error);
