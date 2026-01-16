"use server"

import { revalidatePath } from "next/cache"
import * as convex from "@/lib/convex/server"
import path from "path"
import { promisify } from "util"
import { exec } from "child_process"

const execAsync = promisify(exec)

export interface EpisodeFormData {
  title: string
  slug: string
  description?: string
  published_at: string
  cover_image_url?: string
  cover_image_alt?: string
  spotify_url?: string
  youtube_url?: string
  featured: boolean
}

export async function createEpisode(data: EpisodeFormData) {
  try {
    const episodeId = await convex.createEpisode({
      title: data.title,
      slug: data.slug,
      description: data.description,
      publishedAt: new Date(data.published_at).getTime(),
      coverImageUrl: data.cover_image_url,
      coverImageAlt: data.cover_image_alt,
      spotifyUrl: data.spotify_url,
      youtubeUrl: data.youtube_url,
      featured: data.featured,
    })

    revalidatePath("/admin/episodes")
    revalidatePath("/episodes")
    revalidatePath("/")

    return { success: true, data: { id: episodeId } }
  } catch (error) {
    console.error("Error creating episode:", error)
    return { success: false, error: "Failed to create episode" }
  }
}

export async function updateEpisode(id: string, data: Partial<EpisodeFormData>) {
  try {
    await convex.updateEpisode(id, {
      title: data.title,
      slug: data.slug,
      description: data.description,
      publishedAt: data.published_at ? new Date(data.published_at).getTime() : undefined,
      coverImageUrl: data.cover_image_url,
      coverImageAlt: data.cover_image_alt,
      spotifyUrl: data.spotify_url,
      youtubeUrl: data.youtube_url,
      featured: data.featured,
    })

    revalidatePath("/admin/episodes")
    revalidatePath("/episodes")
    revalidatePath("/")

    return { success: true, data: { id } }
  } catch (error) {
    console.error("Error updating episode:", error)
    return { success: false, error: "Failed to update episode" }
  }
}

export async function deleteEpisode(id: string) {
  try {
    await convex.deleteEpisode(id)

    revalidatePath("/admin/episodes")
    revalidatePath("/episodes")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error deleting episode:", error)
    return { success: false, error: "Failed to delete episode" }
  }
}

export async function getEpisodeById(id: string) {
  try {
    const data = await convex.getEpisodeById(id)

    if (!data) {
      return { success: false, error: "Episode not found" }
    }

    // Transform to snake_case for backwards compatibility
    return {
      success: true,
      data: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        published_at: data.publishedAt ? new Date(data.publishedAt).toISOString() : null,
        cover_image_url: data.coverImageUrl,
        cover_image_alt: data.coverImageAlt,
        spotify_url: data.spotifyUrl,
        spotify_id: data.spotifyId,
        youtube_url: data.youtubeUrl,
        youtube_id: data.youtubeId,
        duration_seconds: data.durationSeconds,
        show_notes: data.showNotes,
        featured: data.featured,
        auto_synced: data.autoSynced,
        seo: data.seo,
      },
    }
  } catch (error) {
    console.error("Error fetching episode:", error)
    return { success: false, error: "Failed to fetch episode" }
  }
}

export async function getAllEpisodesForAdmin() {
  try {
    const data = await convex.getAllEpisodesForAdmin()

    // Transform to snake_case for backwards compatibility
    const transformedData = data.map((episode: any) => ({
      id: episode.id,
      title: episode.title,
      slug: episode.slug,
      description: episode.description,
      published_at: episode.publishedAt ? new Date(episode.publishedAt).toISOString() : null,
      cover_image_url: episode.coverImageUrl,
      spotify_url: episode.spotifyUrl,
      youtube_url: episode.youtubeUrl,
      featured: episode.featured,
      auto_synced: episode.autoSynced,
    }))

    return { success: true, data: transformedData }
  } catch (error) {
    console.error("Error fetching episodes:", error)
    return { success: false, error: "Failed to fetch episodes", data: [] }
  }
}

export async function syncEpisodesFromYoutube() {
  const scriptPath = path.join(process.cwd(), "scripts", "sync-youtube-episodes.js")

  try {
    const { stdout } = await execAsync(`node "${scriptPath}"`, {
      env: process.env,
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024 * 10,
    })

    revalidatePath("/admin/episodes")
    revalidatePath("/episodes")
    revalidatePath("/")

    return { success: true as const, message: stdout }
  } catch (error) {
    console.error("[Episode Sync] Failed to sync from YouTube", error)
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to sync episodes",
    }
  }
}
