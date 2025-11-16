/**
 * Check file organization in Supabase storage
 * This script identifies files that are in the wrong location
 *
 * Usage: node scripts/check-file-organization.js
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
const bucket = 'fireside_assets'

if (!supabaseUrl || !serviceKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey)

async function checkOrganization() {
  console.log('='.repeat(80))
  console.log('FILE ORGANIZATION CHECK')
  console.log('='.repeat(80))
  console.log('')

  // Get all files in bucket root
  const { data: rootFiles, error: rootError } = await supabase.storage
    .from(bucket)
    .list('', { limit: 1000 })

  if (rootError) {
    console.error('❌ Error listing root files:', rootError.message)
    return
  }

  console.log('📁 Files in BUCKET ROOT (should be moved to folders):')
  const imageFiles = rootFiles.filter(f => !f.id && /\.(jpg|jpeg|png|gif|webp)$/i.test(f.name))

  if (imageFiles.length === 0) {
    console.log('  ✓ No loose image files in root - perfect!')
  } else {
    imageFiles.forEach(file => {
      console.log(`  ⚠️  ${file.name}`)
      console.log(`     URL: ${supabaseUrl}/storage/v1/object/public/${bucket}/${file.name}`)
    })
  }

  // Check database URLs
  console.log('\n📊 DATABASE URL ANALYSIS:')

  // Check artists
  const { data: artists } = await supabase
    .from('fireside_artists')
    .select('id, name, profile_image_url')
    .not('profile_image_url', 'is', null)

  console.log('\n🎤 ARTISTS:')
  const artistsNeedingReupload = []
  for (const artist of artists || []) {
    const url = artist.profile_image_url
    const inArtistsFolder = url.includes('/artists/')
    const inRootOrImages = url.includes('/fireside_assets/') &&
                            !url.includes('/artists/') &&
                            !url.includes('/blog/') &&
                            !url.includes('/episodes/')

    if (inArtistsFolder) {
      console.log(`  ✓ ${artist.name} - Correctly in artists/ folder`)
    } else if (inRootOrImages) {
      console.log(`  ⚠️  ${artist.name} - In root/images, should be in artists/`)
      console.log(`     Current: ${url}`)
      artistsNeedingReupload.push(artist)
    } else {
      console.log(`  ℹ️  ${artist.name} - External URL`)
    }
  }

  // Check blog posts
  const { data: posts } = await supabase
    .from('fireside_blog_posts')
    .select('id, title, featured_image_url')
    .not('featured_image_url', 'is', null)

  console.log('\n📝 BLOG POSTS:')
  const postsNeedingReupload = []
  for (const post of posts || []) {
    const url = post.featured_image_url
    const inBlogFolder = url.includes('/blog/')
    const inRootOrImages = url.includes('/fireside_assets/') &&
                           !url.includes('/artists/') &&
                           !url.includes('/blog/') &&
                           !url.includes('/episodes/')

    if (inBlogFolder) {
      console.log(`  ✓ "${post.title}" - Correctly in blog/ folder`)
    } else if (inRootOrImages) {
      console.log(`  ⚠️  "${post.title}" - In root/images, should be in blog/`)
      console.log(`     Current: ${url}`)
      postsNeedingReupload.push(post)
    } else {
      console.log(`  ℹ️  "${post.title}" - External URL`)
    }
  }

  // Check episodes
  const { data: episodes } = await supabase
    .from('fireside_episodes')
    .select('id, title, cover_image_url')
    .not('cover_image_url', 'is', null)

  console.log('\n📺 EPISODES:')
  const episodesNeedingReupload = []
  for (const episode of episodes || []) {
    const url = episode.cover_image_url
    const inEpisodesFolder = url.includes('/episodes/')
    const inRootOrImages = url.includes('/fireside_assets/') &&
                           !url.includes('/artists/') &&
                           !url.includes('/blog/') &&
                           !url.includes('/episodes/')

    if (inEpisodesFolder) {
      console.log(`  ✓ "${episode.title}" - Correctly in episodes/ folder`)
    } else if (inRootOrImages) {
      console.log(`  ⚠️  "${episode.title}" - In root/images, should be in episodes/`)
      console.log(`     Current: ${url}`)
      episodesNeedingReupload.push(episode)
    } else {
      console.log(`  ℹ️  "${episode.title}" - External URL`)
    }
  }

  // Summary
  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`Loose files in bucket root: ${imageFiles.length}`)
  console.log(`Artists needing re-upload: ${artistsNeedingReupload.length}`)
  console.log(`Blog posts needing re-upload: ${postsNeedingReupload.length}`)
  console.log(`Episodes needing re-upload: ${episodesNeedingReupload.length}`)

  if (artistsNeedingReupload.length + postsNeedingReupload.length + episodesNeedingReupload.length > 0) {
    console.log('\n📋 ACTION ITEMS:')
    console.log('1. Re-upload images through the admin panel for items marked with ⚠️')
    console.log('2. The upload will automatically put them in the correct folders')
    console.log('3. Optionally delete old files from bucket root to keep it clean')
  } else {
    console.log('\n✅ All files are properly organized!')
  }
}

checkOrganization().catch(console.error)
