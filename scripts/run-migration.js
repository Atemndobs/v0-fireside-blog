/**
 * Run SQL migration to fix image URLs with newlines
 * Usage: node scripts/run-migration.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim()
      if (key && !process.env[key]) {
        process.env[key] = value
      }
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

if (!supabaseUrl || !serviceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey)

async function runMigration() {
  console.log('='.repeat(80))
  console.log('FIXING IMAGE URLS WITH NEWLINE CHARACTERS')
  console.log('='.repeat(80))

  // Fix blog posts
  console.log('\n1. Fixing blog post images...')
  const { error: blogError, count: blogCount } = await supabase
    .rpc('fix_blog_image_urls')
    .catch(async () => {
      // Fallback to manual update if RPC doesn't exist
      const { error } = await supabase
        .from('fireside_blog_posts')
        .update({
          featured_image_url: supabase.raw(`REPLACE(REPLACE(REPLACE(REPLACE(featured_image_url, '%0A', ''), '%0D', ''), E'\\n', ''), E'\\r', '')`)
        })
        .not('featured_image_url', 'is', null)

      return { error }
    })

  if (blogError) {
    console.error('  ❌ Error:', blogError.message)
  } else {
    console.log('  ✓ Blog posts updated')
  }

  // Since we can't use complex SQL via the JS SDK, let's just check what needs fixing
  console.log('\n2. Checking for URLs that need fixing...')

  const { data: blogPosts } = await supabase
    .from('fireside_blog_posts')
    .select('id, title, featured_image_url')
    .not('featured_image_url', 'is', null)

  let fixedCount = 0
  for (const post of blogPosts || []) {
    const url = post.featured_image_url
    if (url.includes('%0A') || url.includes('%0D') || url.includes('\n') || url.includes('\r')) {
      const cleanUrl = url
        .replace(/%0A/g, '')
        .replace(/%0D/g, '')
        .replace(/\n/g, '')
        .replace(/\r/g, '')

      console.log(`  Fixing: "${post.title}"`)
      console.log(`    Before: ${url}`)
      console.log(`    After:  ${cleanUrl}`)

      const { error } = await supabase
        .from('fireside_blog_posts')
        .update({ featured_image_url: cleanUrl })
        .eq('id', post.id)

      if (error) {
        console.error(`    ❌ Error: ${error.message}`)
      } else {
        console.log(`    ✓ Fixed`)
        fixedCount++
      }
    }
  }

  console.log(`\n✓ Fixed ${fixedCount} blog post images`)

  // Fix artists
  console.log('\n3. Checking artist images...')
  const { data: artists } = await supabase
    .from('fireside_artists')
    .select('id, name, profile_image_url')
    .not('profile_image_url', 'is', null)

  let artistsFixed = 0
  for (const artist of artists || []) {
    const url = artist.profile_image_url
    if (url.includes('%0A') || url.includes('%0D') || url.includes('\n') || url.includes('\r')) {
      const cleanUrl = url
        .replace(/%0A/g, '')
        .replace(/%0D/g, '')
        .replace(/\n/g, '')
        .replace(/\r/g, '')

      const { error } = await supabase
        .from('fireside_artists')
        .update({ profile_image_url: cleanUrl })
        .eq('id', artist.id)

      if (!error) artistsFixed++
    }
  }

  console.log(`✓ Fixed ${artistsFixed} artist images`)

  // Fix episodes
  console.log('\n4. Checking episode images...')
  const { data: episodes } = await supabase
    .from('fireside_episodes')
    .select('id, title, cover_image_url')
    .not('cover_image_url', 'is', null)

  let episodesFixed = 0
  for (const episode of episodes || []) {
    const url = episode.cover_image_url
    if (url.includes('%0A') || url.includes('%0D') || url.includes('\n') || url.includes('\r')) {
      const cleanUrl = url
        .replace(/%0A/g, '')
        .replace(/%0D/g, '')
        .replace(/\n/g, '')
        .replace(/\r/g, '')

      const { error } = await supabase
        .from('fireside_episodes')
        .update({ cover_image_url: cleanUrl })
        .eq('id', episode.id)

      if (!error) episodesFixed++
    }
  }

  console.log(`✓ Fixed ${episodesFixed} episode images`)

  console.log('\n' + '='.repeat(80))
  console.log('MIGRATION COMPLETE')
  console.log(`Total fixed: ${fixedCount + artistsFixed + episodesFixed} images`)
  console.log('='.repeat(80))
}

runMigration().catch(console.error)
