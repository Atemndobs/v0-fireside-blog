"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export interface ArtistFormData {
  name: string
  slug: string
  short_description: string
  profile_image_url: string
  profile_image_alt: string
  genre?: string
  featured: boolean
  order_rank: number
}

export async function createArtist(data: ArtistFormData) {
  try {
    const supabase = getSupabaseServerClient()

    const { data: artist, error } = await supabase.from("fireside_artists").insert([data]).select().single()

    if (error) {
      console.error("Error creating artist:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/artists")
    revalidatePath("/artists")
    revalidatePath("/")

    return { success: true, data: artist }
  } catch (error) {
    console.error("Error creating artist:", error)
    return { success: false, error: "Failed to create artist" }
  }
}

export async function updateArtist(id: string, data: Partial<ArtistFormData>) {
  try {
    const supabase = getSupabaseServerClient()

    const { data: artist, error } = await supabase
      .from("fireside_artists")
      .update(data)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating artist:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/artists")
    revalidatePath("/artists")
    revalidatePath("/")

    return { success: true, data: artist }
  } catch (error) {
    console.error("Error updating artist:", error)
    return { success: false, error: "Failed to update artist" }
  }
}

export async function deleteArtist(id: string) {
  try {
    const supabase = getSupabaseServerClient()

    const { error } = await supabase.from("fireside_artists").delete().eq("id", id)

    if (error) {
      console.error("Error deleting artist:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/artists")
    revalidatePath("/artists")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error deleting artist:", error)
    return { success: false, error: "Failed to delete artist" }
  }
}

export async function getArtistById(id: string) {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase.from("fireside_artists").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching artist:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error fetching artist:", error)
    return { success: false, error: "Failed to fetch artist" }
  }
}

export async function getAllArtistsForAdmin() {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from("fireside_artists")
      .select("*")
      .order("order_rank", { ascending: true })

    if (error) {
      console.error("Error fetching artists:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, data: data ?? [] }
  } catch (error) {
    console.error("Error fetching artists:", error)
    return { success: false, error: "Failed to fetch artists", data: [] }
  }
}
