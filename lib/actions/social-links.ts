"use server"

import { revalidatePath } from "next/cache"
import * as convex from "@/lib/convex/server"
import type { SocialLinkInput, SocialLinkUpdate, SocialZone } from "@/lib/types/social-links"

const REVALIDATE_PATHS = ["/", "/episodes", "/admin/social-links", "/connect"] as const

const sanitizeZones = (zones: SocialZone[]): string[] => {
  const unique = Array.from(new Set(zones))
  return unique.length ? unique : ["footer"]
}

const revalidateAll = () => {
  REVALIDATE_PATHS.forEach((path) => revalidatePath(path))
}

export async function getAllSocialLinksForAdmin() {
  try {
    const data = await convex.getAllSocialLinksForAdmin()

    // Transform to snake_case for backwards compatibility
    const transformedData = data.map((link: any) => ({
      id: link.id,
      platform: link.platform,
      label: link.label,
      url: link.url,
      icon_slug: link.iconSlug,
      priority: link.priority,
      zones: link.zones,
      is_featured: link.isFeatured,
    }))

    return { success: true as const, data: transformedData }
  } catch (error) {
    console.error("[Admin] Failed to fetch social links", error)
    return { success: false as const, data: [], error: "Unable to load social links" }
  }
}

export async function getSocialLinkForAdmin(id: string) {
  try {
    const link = await convex.getSocialLinkById(id)
    if (!link) {
      return { success: false as const, error: "Link not found" }
    }

    // Transform to snake_case for backwards compatibility
    return {
      success: true as const,
      data: {
        id: link.id,
        platform: link.platform,
        label: link.label,
        url: link.url,
        icon_slug: link.iconSlug,
        priority: link.priority,
        zones: link.zones,
        is_featured: link.isFeatured,
      },
    }
  } catch (error) {
    console.error("[Admin] Failed to fetch social link", error)
    return { success: false as const, error: "Unable to load social link" }
  }
}

export async function createSocialLinkAction(payload: SocialLinkInput) {
  try {
    const linkId = await convex.createSocialLink({
      platform: payload.platform,
      label: payload.label,
      url: payload.url,
      iconSlug: payload.icon_slug?.trim() || undefined,
      priority: typeof payload.priority === "number" ? payload.priority : 0,
      zones: payload.zones ? sanitizeZones(payload.zones) : ["footer"],
      isFeatured: typeof payload.is_featured === "boolean" ? payload.is_featured : false,
    })

    revalidateAll()
    return { success: true as const, data: { id: linkId } }
  } catch (error) {
    console.error("[Admin] Failed to create social link", error)
    return { success: false as const, error: error instanceof Error ? error.message : "Failed to create social link" }
  }
}

export async function updateSocialLinkAction(id: string, payload: SocialLinkUpdate) {
  try {
    await convex.updateSocialLink(id, {
      platform: payload.platform,
      label: payload.label,
      url: payload.url,
      iconSlug: payload.icon_slug?.trim() || undefined,
      priority: payload.priority,
      zones: payload.zones ? sanitizeZones(payload.zones) : undefined,
      isFeatured: payload.is_featured,
    })

    revalidateAll()
    return { success: true as const, data: { id } }
  } catch (error) {
    console.error("[Admin] Failed to update social link", error)
    return { success: false as const, error: error instanceof Error ? error.message : "Failed to update social link" }
  }
}

export async function deleteSocialLinkAction(id: string) {
  try {
    await convex.deleteSocialLink(id)
    revalidateAll()
    return { success: true as const }
  } catch (error) {
    console.error("[Admin] Failed to delete social link", error)
    return { success: false as const, error: error instanceof Error ? error.message : "Failed to delete social link" }
  }
}
