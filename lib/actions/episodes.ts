"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "@/lib/supabase/server"

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
    const supabase = getSupabaseServerClient()

    const { data: episode, error } = await supabase
      .from("fireside_episodes")
      .insert([data])
      .select()
      .single()

    if (error) {
      console.error("Error creating episode:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/episodes")
    revalidatePath("/episodes")
    revalidatePath("/")

    return { success: true, data: episode }
  } catch (error) {
    console.error("Error creating episode:", error)
    return { success: false, error: "Failed to create episode" }
  }
}

export async function updateEpisode(id: string, data: Partial<EpisodeFormData>) {
  try {
    const supabase = getSupabaseServerClient()

    const { data: episode, error } = await supabase
      .from("fireside_episodes")
      .update(data)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating episode:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/episodes")
    revalidatePath("/episodes")
    revalidatePath("/")

    return { success: true, data: episode }
  } catch (error) {
    console.error("Error updating episode:", error)
    return { success: false, error: "Failed to update episode" }
  }
}

export async function deleteEpisode(id: string) {
  try {
    const supabase = getSupabaseServerClient()

    const { error } = await supabase.from("fireside_episodes").delete().eq("id", id)

    if (error) {
      console.error("Error deleting episode:", error)
      return { success: false, error: error.message }
    }

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
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase.from("fireside_episodes").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching episode:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error fetching episode:", error)
    return { success: false, error: "Failed to fetch episode" }
  }
}

export async function getAllEpisodesForAdmin() {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from("fireside_episodes")
      .select("*")
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Error fetching episodes:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, data: data ?? [] }
  } catch (error) {
    console.error("Error fetching episodes:", error)
    return { success: false, error: "Failed to fetch episodes", data: [] }
  }
}
