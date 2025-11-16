/**
 * Comprehensive Image URL Fix Script
 * This script:
 * 1. Removes newline characters (%0A, %0D, \n, \r) from URLs
 * 2. Converts S3 URLs to Supabase storage URLs
 *
 * Usage: node scripts/fix-all-image-urls.js
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
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey)

// Clean URL from newlines and convert S3 to Supabase
function cleanAndConvertUrl(url) {
  if (!url) return url

  // Step 1: Remove newline characters (both literal and URL-encoded)
  let cleanedUrl = url
    .replace(/%0A/g, '')
    .replace(/%0D/g, '')
    .replace(/\n/g, '')
    .replace(/\r/g, '')
    .trim()

  // Step 2: Convert S3 URLs to Supabase
  if (cleanedUrl.includes('fireside_assets.s3.amazonaws.com')) {
    const match = cleanedUrl.match(/fireside_assets\.s3\.amazonaws\.com\/(.+)$/)
    if (match && match[1]) {
      const path = match[1]
      cleanedUrl = `${supabaseUrl}/storage/v1/object/public/fireside_assets/${path}`
    }
  }

  return cleanedUrl
}

async function fixImageUrls() {
  console.log('='.repeat(80))
  console.log('COMPREHENSIVE IMAGE URL FIX')
  console.log('='.repeat(80))
  console.log('')

  let totalFixed = 0

  // Fix Blog Posts
  console.log('📝 Fixing Blog Post Images...')
  const { data: posts } = await supabase
    .from('fireside_blog_posts')
    .select('id, title, featured_image_url')
    .not('featured_image_url', 'is', null)

  let postsFixed = 0
  for (const post of posts || []) {
    const originalUrl = post.featured_image_url
    const cleanedUrl = cleanAndConvertUrl(originalUrl)

    if (originalUrl !== cleanedUrl) {
      console.log(`  ✓ "${post.title}"`)
      console.log(`    Before: ${originalUrl}`)
      console.log(`    After:  ${cleanedUrl}`)

      const { error } = await supabase
        .from('fireside_blog_posts')
        .update({ featured_image_url: cleanedUrl })
        .eq('id', post.id)

      if (error) {
        console.error(`    ❌ Error: ${error.message}`)
      } else {
        postsFixed++
      }
    }
  }
  console.log(`✅ Fixed ${postsFixed} blog post images\n`)
  totalFixed += postsFixed

  // Fix Artists
  console.log('🎤 Fixing Artist Images...')
  const { data: artists } = await supabase
    .from('fireside_artists')
    .select('id, name, profile_image_url')
    .not('profile_image_url', 'is', null)

  let artistsFixed = 0
  for (const artist of artists || []) {
    const originalUrl = artist.profile_image_url
    const cleanedUrl = cleanAndConvertUrl(originalUrl)

    if (originalUrl !== cleanedUrl) {
      console.log(`  ✓ ${artist.name}`)
      console.log(`    Before: ${originalUrl}`)
      console.log(`    After:  ${cleanedUrl}`)

      const { error } = await supabase
        .from('fireside_artists')
        .update({ profile_image_url: cleanedUrl })
        .eq('id', artist.id)

      if (error) {
        console.error(`    ❌ Error: ${error.message}`)
      } else {
        artistsFixed++
      }
    }
  }
  console.log(`✅ Fixed ${artistsFixed} artist images\n`)
  totalFixed += artistsFixed

  // Fix Episodes
  console.log('📺 Fixing Episode Images...')
  const { data: episodes } = await supabase
    .from('fireside_episodes')
    .select('id, title, cover_image_url')
    .not('cover_image_url', 'is', null)

  let episodesFixed = 0
  for (const episode of episodes || []) {
    const originalUrl = episode.cover_image_url
    const cleanedUrl = cleanAndConvertUrl(originalUrl)

    if (originalUrl !== cleanedUrl) {
      console.log(`  ✓ "${episode.title}"`)
      console.log(`    Before: ${originalUrl}`)
      console.log(`    After:  ${cleanedUrl}`)

      const { error } = await supabase
        .from('fireside_episodes')
        .update({ cover_image_url: cleanedUrl })
        .eq('id', episode.id)

      if (error) {
        console.error(`    ❌ Error: ${error.message}`)
      } else {
        episodesFixed++
      }
    }
  }
  console.log(`✅ Fixed ${episodesFixed} episode images\n`)
  totalFixed += episodesFixed

  console.log('='.repeat(80))
  console.log('FIX COMPLETE')
  console.log(`Total images fixed: ${totalFixed}`)
  console.log('='.repeat(80))

  // Show summary of remaining URLs
  console.log('\n📊 URL Summary:')

  const allUrls = [
    ...(posts || []).map(p => ({ type: 'Blog', name: p.title, url: cleanAndConvertUrl(p.featured_image_url) })),
    ...(artists || []).map(a => ({ type: 'Artist', name: a.name, url: cleanAndConvertUrl(a.profile_image_url) })),
    ...(episodes || []).map(e => ({ type: 'Episode', name: e.title, url: cleanAndConvertUrl(e.cover_image_url) }))
  ]

  const supabaseCount = allUrls.filter(u => u.url.includes('ytqwwxlqqpqhhcpcqxax.supabase.co')).length
  const s3Count = allUrls.filter(u => u.url.includes('s3.amazonaws.com')).length
  const externalCount = allUrls.filter(u => !u.url.includes('ytqwwxlqqpqhhcpcqxax.supabase.co') && !u.url.includes('s3.amazonaws.com')).length

  console.log(`  Supabase URLs: ${supabaseCount}`)
  console.log(`  S3 URLs (OLD): ${s3Count}`)
  console.log(`  External URLs: ${externalCount}`)
  console.log(`  Total: ${allUrls.length}`)
}

fixImageUrls().catch(console.error)
