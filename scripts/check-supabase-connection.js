#!/usr/bin/env node

/**
 * Quick script to check Supabase connection and data
 * Run with: node scripts/check-supabase-connection.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load .env.local manually
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim()
      if (key && !process.env[key]) {
        process.env[key] = value
      }
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkConnection() {
  console.log('🔍 Checking Supabase connection...\n')
  console.log(`📡 URL: ${supabaseUrl}\n`)

  try {
    // Check episodes
    console.log('📺 Checking episodes...')
    const { data: episodes, error: episodesError } = await supabase
      .from('fireside_episodes')
      .select('id, title, slug, featured')
      .limit(5)

    if (episodesError) {
      console.error(`❌ Episodes error: ${episodesError.message}`)
      console.log('   → Run the schema SQL file in Supabase SQL Editor\n')
    } else {
      console.log(`✅ Found ${episodes.length} episode(s)`)
      if (episodes.length > 0) {
        episodes.forEach(ep => console.log(`   - ${ep.title} (${ep.featured ? 'Featured' : 'Not featured'})`))
      } else {
        console.log('   → Run the seed SQL file to add sample data')
      }
      console.log('')
    }

    // Check artists
    console.log('🎤 Checking artists...')
    const { data: artists, error: artistsError } = await supabase
      .from('fireside_artists')
      .select('id, name, slug, featured')
      .limit(5)

    if (artistsError) {
      console.error(`❌ Artists error: ${artistsError.message}`)
      console.log('   → Run the schema SQL file in Supabase SQL Editor\n')
    } else {
      console.log(`✅ Found ${artists.length} artist(s)`)
      if (artists.length > 0) {
        artists.forEach(artist => console.log(`   - ${artist.name} (${artist.featured ? 'Featured' : 'Not featured'})`))
      } else {
        console.log('   → Run the seed SQL file to add sample data')
      }
      console.log('')
    }

    // Check blog posts
    console.log('📝 Checking blog posts...')
    const { data: posts, error: postsError } = await supabase
      .from('fireside_blog_posts')
      .select('id, title, slug, featured')
      .limit(5)

    if (postsError) {
      console.error(`❌ Blog posts error: ${postsError.message}`)
      console.log('   → Run the schema SQL file in Supabase SQL Editor\n')
    } else {
      console.log(`✅ Found ${posts.length} blog post(s)`)
      if (posts.length > 0) {
        posts.forEach(post => console.log(`   - ${post.title} (${post.featured ? 'Featured' : 'Not featured'})`))
      } else {
        console.log('   → Run the seed SQL file to add sample data')
      }
      console.log('')
    }

    // Summary
    const hasData = episodes?.length > 0 || artists?.length > 0 || posts?.length > 0
    const hasErrors = episodesError || artistsError || postsError

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    if (hasErrors) {
      console.log('\n⚠️  SETUP REQUIRED')
      console.log('\n📋 Next steps:')
      console.log('   1. Go to https://app.supabase.com/project/ytqwwxlqqpqhhcpcqxax/sql')
      console.log('   2. Run: docs/custom-cms/fireside_schema.sql')
      console.log('   3. Run: docs/custom-cms/seeds/initial_content.sql')
      console.log('   4. Re-run this script to verify\n')
    } else if (!hasData) {
      console.log('\n⚠️  TABLES EXIST BUT NO DATA')
      console.log('\n📋 Next step:')
      console.log('   Run docs/custom-cms/seeds/initial_content.sql in Supabase SQL Editor\n')
    } else {
      console.log('\n✅ ALL SET!')
      console.log('\n🎉 Your CMS is connected and has data.')
      console.log('\n📋 Next steps:')
      console.log('   - Visit http://localhost:3000 to see the website')
      console.log('   - Visit http://localhost:3000/admin to manage content\n')
    }

  } catch (error) {
    console.error('\n❌ Connection failed:', error.message)
    console.log('\n📋 Check:')
    console.log('   - Supabase project is active (not paused)')
    console.log('   - Environment variables in .env.local are correct')
    console.log('   - Internet connection is working\n')
  }
}

checkConnection()
