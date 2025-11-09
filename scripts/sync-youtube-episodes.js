#!/usr/bin/env node

/**
 * Sync latest YouTube videos into the fireside_episodes table.
 * Requires yt-dlp to be installed (already used elsewhere in the repo).
 */

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")
const { createClient } = require("@supabase/supabase-js")

const CHANNEL_URL = "https://www.youtube.com/@TheFiresideTribe/videos"

function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.local")
  if (!fs.existsSync(envPath)) return
  const envContent = fs.readFileSync(envPath, "utf8")
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/)
    if (!match) return
    const key = match[1].trim()
    const value = match[2].trim()
    if (key && !process.env[key]) {
      process.env[key] = value
    }
  })
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function toIsoDate(uploadDate) {
  if (!uploadDate || uploadDate.length !== 8) return new Date().toISOString()
  const [year, month, day] = [uploadDate.slice(0, 4), uploadDate.slice(4, 6), uploadDate.slice(6, 8)]
  return new Date(`${year}-${month}-${day}T12:00:00Z`).toISOString()
}

async function main() {
  loadEnv()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.")
    process.exit(1)
  }

  console.log("📺 Fetching YouTube metadata...")
  const rawJson = execSync(`yt-dlp -J ${CHANNEL_URL}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
    maxBuffer: 1024 * 1024 * 50,
  })
  const playlist = JSON.parse(rawJson)
  const videos = (playlist.entries || []).filter((entry) => entry && entry.upload_date && entry.title)

  console.log(`   → Found ${videos.length} videos on the channel`)

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data: existing, error: existingError } = await supabase.from("fireside_episodes").select("id, slug")

  if (existingError) {
    console.error("Failed to load existing episodes:", existingError.message)
    process.exit(1)
  }

  const existingSlugs = new Set(existing?.map((ep) => ep.slug))

  const episodesToInsert = []
  const slugCounts = {}

  for (const video of videos) {
    let slug = slugify(video.title)
    if (!slug) continue
    if (existingSlugs.has(slug)) {
      continue
    }

    if (slugCounts[slug] !== undefined) {
      slugCounts[slug] += 1
      slug = `${slug}-${slugCounts[slug]}`
    } else {
      slugCounts[slug] = 0
    }

    episodesToInsert.push({
      title: video.title.trim(),
      slug,
      description: video.description?.trim() ?? "",
      published_at: toIsoDate(video.upload_date),
      cover_image_url: video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
      cover_image_alt: `${video.title} thumbnail`,
      spotify_url: null,
      youtube_url: video.webpage_url || `https://www.youtube.com/watch?v=${video.id}`,
      featured: false,
      auto_synced: true,
    })
  }

  if (episodesToInsert.length === 0) {
    console.log("✅ No new episodes to insert. Everything is up to date.")
    return
  }

  console.log(`📝 Inserting ${episodesToInsert.length} new episode(s)...`)
  const { error: insertError } = await supabase.from("fireside_episodes").insert(episodesToInsert)
  if (insertError) {
    console.error("Failed to insert episodes:", insertError.message)
    process.exit(1)
  }

  console.log("🎉 Episodes synced successfully! Refresh /admin/episodes to review.")
}

main().catch((error) => {
  console.error("Unexpected error:", error)
  process.exit(1)
})
