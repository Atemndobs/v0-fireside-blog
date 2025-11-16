/**
 * Debug script to verify Supabase storage configuration
 * Run with: node scripts/debug-storage.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Simple .env parser
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const bucket = process.env.NEXT_PUBLIC_ASSET_BUCKET || 'fireside_assets'

console.log('='.repeat(80))
console.log('SUPABASE STORAGE DEBUG SCRIPT')
console.log('='.repeat(80))

if (!supabaseUrl || !serviceKey) {
  console.error('❌ Missing environment variables!')
  console.error('SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
  console.error('SERVICE_KEY:', serviceKey ? '✓' : '✗')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey)

async function checkBucket() {
  console.log('\n📦 Checking if bucket exists...')
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets()

    if (error) {
      console.error('❌ Error listing buckets:', error.message)
      return false
    }

    console.log('✓ Found buckets:', buckets.map(b => b.name).join(', '))

    const targetBucket = buckets.find(b => b.name === bucket)
    if (targetBucket) {
      console.log(`✓ Bucket "${bucket}" exists`)
      console.log('  - Public:', targetBucket.public)
      console.log('  - ID:', targetBucket.id)
      console.log('  - Created:', targetBucket.created_at)
      return true
    } else {
      console.error(`❌ Bucket "${bucket}" does NOT exist`)
      console.log('\n💡 Create it by running this SQL in Supabase SQL Editor:')
      console.log(`   INSERT INTO storage.buckets (id, name, public) VALUES ('${bucket}', '${bucket}', true);`)
      return false
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
    return false
  }
}

async function listFiles() {
  console.log(`\n📁 Listing files in "${bucket}" bucket...`)
  try {
    const { data: files, error } = await supabase.storage
      .from(bucket)
      .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })

    if (error) {
      console.error('❌ Error listing files:', error.message)
      if (error.message.includes('not found')) {
        console.log('💡 This usually means the bucket does not exist or you don\'t have permissions')
      }
      return
    }

    if (!files || files.length === 0) {
      console.log('⚠️  No files found in bucket root')
    } else {
      console.log(`✓ Found ${files.length} items in root:`)
      files.forEach(file => {
        console.log(`  - ${file.name} ${file.id ? '(folder)' : `(${file.metadata?.size || 0} bytes)`}`)
      })
    }

    // List files in common folders
    const folders = ['blog', 'about', 'artists', 'episodes', 'uploads']
    for (const folder of folders) {
      const { data: folderFiles, error: folderError } = await supabase.storage
        .from(bucket)
        .list(folder, { limit: 10 })

      if (!folderError && folderFiles && folderFiles.length > 0) {
        console.log(`\n  📂 ${folder}/ (${folderFiles.length} files):`)
        folderFiles.forEach(file => {
          const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(`${folder}/${file.name}`)
          console.log(`     - ${file.name}`)
          console.log(`       URL: ${publicUrl.publicUrl}`)
        })
      }
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
  }
}

async function testPublicAccess() {
  console.log('\n🌐 Testing public access to bucket...')

  // Try to get a public URL for a test path
  const testPath = 'blog/test.jpg'
  const { data } = supabase.storage.from(bucket).getPublicUrl(testPath)

  console.log(`Test URL: ${data.publicUrl}`)

  try {
    const response = await fetch(data.publicUrl)
    console.log(`Response status: ${response.status}`)

    if (response.status === 404) {
      console.log('⚠️  File not found (expected if test file doesn\'t exist)')
    } else if (response.status === 403) {
      console.error('❌ Access forbidden - RLS policies may be blocking public access')
      console.log('\n💡 Run the SQL script: docs/custom-cms/setup-storage-bucket.sql')
    } else if (response.status === 400) {
      console.error('❌ Bad request - bucket may not exist')
    } else if (response.ok) {
      console.log('✓ Public access works!')
    } else {
      console.log(`⚠️  Unexpected status: ${response.status}`)
    }
  } catch (err) {
    console.error('❌ Network error:', err.message)
  }
}

async function checkBlogPost() {
  console.log('\n📝 Checking blog post image URLs in database...')
  try {
    const { data: posts, error } = await supabase
      .from('fireside_blog_posts')
      .select('id, title, featured_image_url')
      .limit(5)

    if (error) {
      console.error('❌ Error fetching blog posts:', error.message)
      return
    }

    if (!posts || posts.length === 0) {
      console.log('⚠️  No blog posts found in database')
      return
    }

    console.log(`✓ Found ${posts.length} blog posts:`)
    posts.forEach(post => {
      console.log(`\n  "${post.title}"`)
      console.log(`  - Image URL in DB: ${post.featured_image_url || '(null)'}`)

      if (post.featured_image_url) {
        // Check if it's a full URL or relative path
        const isFullUrl = post.featured_image_url.startsWith('http')
        console.log(`  - Type: ${isFullUrl ? 'Full URL' : 'Relative path'}`)

        if (isFullUrl) {
          console.log(`  - Direct access: ${post.featured_image_url}`)
        } else {
          const baseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL
          const fullUrl = `${baseUrl}/${post.featured_image_url.replace(/^\/+/, '')}`
          console.log(`  - Will resolve to: ${fullUrl}`)
        }
      }
    })
  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
  }
}

async function main() {
  const bucketExists = await checkBucket()

  if (bucketExists) {
    await listFiles()
    await testPublicAccess()
  }

  await checkBlogPost()

  console.log('\n' + '='.repeat(80))
  console.log('DEBUG COMPLETE')
  console.log('='.repeat(80))

  if (!bucketExists) {
    console.log('\n⚠️  ACTION REQUIRED:')
    console.log('1. Go to Supabase Dashboard: https://supabase.com/dashboard')
    console.log('2. Select your project')
    console.log('3. Go to Storage → Create bucket "fireside_assets" (mark as public)')
    console.log('4. Run SQL script: docs/custom-cms/setup-storage-bucket.sql')
    console.log('5. Re-run this script to verify')
  }
}

main().catch(console.error)
