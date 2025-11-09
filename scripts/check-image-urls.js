const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ytqwwxlqqpqhhcpcqxax.supabase.co';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cXd3eGxxcXBxaGhjcGNxeGF4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDI2MjUyMywiZXhwIjoyMDQ5ODM4NTIzfQ.mSQ1tt_JZsqnZYGZuj6XGHNQphfKjO1BzsIYIJywWM4';

const supabase = createClient(supabaseUrl, serviceKey);

async function checkURLs() {
  console.log('Checking episode image URLs...\n');
  const { data: episodes } = await supabase
    .from('fireside_episodes')
    .select('id, title, cover_image_url')
    .limit(3);

  console.log('Episodes:', JSON.stringify(episodes, null, 2));

  console.log('\n\nChecking artist image URLs...\n');
  const { data: artists } = await supabase
    .from('fireside_artists')
    .select('id, name, profile_image_url')
    .limit(3);

  console.log('Artists:', JSON.stringify(artists, null, 2));

  console.log('\n\nChecking blog post image URLs...\n');
  const { data: posts } = await supabase
    .from('fireside_blog_posts')
    .select('id, title, featured_image_url')
    .limit(3);

  console.log('Blog Posts:', JSON.stringify(posts, null, 2));
}

checkURLs().catch(console.error);
