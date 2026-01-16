"use server"

import { revalidatePath } from "next/cache"
import * as convex from "@/lib/convex/server"

export interface ArtistFormData {
  name: string
  slug: string
  short_description: string
  profile_image_url: string
  profile_image_alt: string
  genre?: string
  country_code?: string
  featured: boolean
  order_rank: number
}

export async function createArtist(data: ArtistFormData) {
  try {
    const artistId = await convex.createArtist({
      name: data.name,
      slug: data.slug,
      shortDescription: data.short_description,
      profileImageUrl: data.profile_image_url,
      profileImageAlt: data.profile_image_alt,
      genre: data.genre,
      countryCode: data.country_code,
      featured: data.featured,
      orderRank: data.order_rank,
    })

    revalidatePath("/admin/artists")
    revalidatePath("/artists")
    revalidatePath("/")

    return { success: true, data: { id: artistId } }
  } catch (error) {
    console.error("Error creating artist:", error)
    return { success: false, error: "Failed to create artist" }
  }
}

export async function updateArtist(id: string, data: Partial<ArtistFormData>) {
  try {
    await convex.updateArtist(id, {
      name: data.name,
      slug: data.slug,
      shortDescription: data.short_description,
      profileImageUrl: data.profile_image_url,
      profileImageAlt: data.profile_image_alt,
      genre: data.genre,
      countryCode: data.country_code,
      featured: data.featured,
      orderRank: data.order_rank,
    })

    revalidatePath("/admin/artists")
    revalidatePath("/artists")
    revalidatePath("/")

    return { success: true, data: { id } }
  } catch (error) {
    console.error("Error updating artist:", error)
    return { success: false, error: "Failed to update artist" }
  }
}

export async function deleteArtist(id: string) {
  try {
    await convex.deleteArtist(id)

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
    const data = await convex.getArtistById(id)

    if (!data) {
      return { success: false, error: "Artist not found" }
    }

    // Transform to snake_case for backwards compatibility
    return {
      success: true,
      data: {
        id: data.id,
        name: data.name,
        slug: data.slug,
        short_description: data.shortDescription,
        profile_image_url: data.profileImageUrl,
        profile_image_alt: data.profileImageAlt,
        genre: data.genre,
        country_code: data.countryCode,
        featured: data.featured,
        order_rank: data.orderRank,
      },
    }
  } catch (error) {
    console.error("Error fetching artist:", error)
    return { success: false, error: "Failed to fetch artist" }
  }
}

export async function getAllArtistsForAdmin() {
  try {
    const data = await convex.getAllArtistsForAdmin()

    // Transform to snake_case for backwards compatibility
    const transformedData = data.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      slug: artist.slug,
      short_description: artist.shortDescription,
      profile_image_url: artist.profileImageUrl,
      profile_image_alt: artist.profileImageAlt,
      genre: artist.genre,
      country_code: artist.countryCode,
      featured: artist.featured,
      order_rank: artist.orderRank,
    }))

    return { success: true, data: transformedData }
  } catch (error) {
    console.error("Error fetching artists:", error)
    return { success: false, error: "Failed to fetch artists", data: [] }
  }
}
