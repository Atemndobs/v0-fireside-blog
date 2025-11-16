/**
 * Get the exact image URL for a specific blog post
 * Usage: node scripts/get-blog-image-url.js <blog-post-id>
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey)

async function getBlogPostImageUrl(blogId) {
  const { data, error } = await supabase
    .from('fireside_blog_posts')
    .select('id, title, featured_image_url, featured_image_alt')
    .eq('id', blogId)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error.message)
    return
  }

  if (!data) {
    console.error('Blog post not found')
    return
  }

  console.log('='.repeat(80))
  console.log('BLOG POST IMAGE URL')
  console.log('='.repeat(80))
  console.log('\nBlog Post:', data.title)
  console.log('ID:', data.id)
  console.log('\n--- Raw URL from Database ---')
  console.log(data.featured_image_url || '(null)')

  if (data.featured_image_url) {
    console.log('\n--- URL Details ---')
    console.log('Length:', data.featured_image_url.length)
    console.log('Contains newline:', data.featured_image_url.includes('\n') ? 'YES ❌' : 'NO ✓')
    console.log('Contains carriage return:', data.featured_image_url.includes('\r') ? 'YES ❌' : 'NO ✓')

    // Show hex dump of the URL to see hidden characters
    console.log('\n--- Character Analysis ---')
    const chars = data.featured_image_url.split('')
    let hasIssues = false
    chars.forEach((char, i) => {
      const code = char.charCodeAt(0)
      if (code < 32 || code > 126) {
        console.log(`Position ${i}: '${char}' (code: ${code}, hex: 0x${code.toString(16)})`)
        hasIssues = true
      }
    })

    if (!hasIssues) {
      console.log('No hidden characters detected ✓')
    }

    // Show URL encoded version
    console.log('\n--- URL Encoded Version ---')
    console.log(encodeURI(data.featured_image_url))

    // Show cleaned version
    const cleaned = data.featured_image_url.trim().replace(/\s+/g, '').replace(/%0A|%0D/g, '')
    console.log('\n--- Cleaned URL (what it should be) ---')
    console.log(cleaned)

    if (cleaned !== data.featured_image_url) {
      console.log('\n⚠️  URL needs cleaning! Run the migration: docs/custom-cms/migrations/005_fix_image_url_newlines_simple.sql')
    }
  }

  console.log('\n--- Image Alt Text ---')
  console.log(data.featured_image_alt || '(null)')

  console.log('\n' + '='.repeat(80))
}

// Get blog ID from command line or use default
const blogId = process.argv[2] || '13c82de6-4330-4055-b554-daca0dd1c00b'

getBlogPostImageUrl(blogId).catch(console.error)
