"use server"

import { revalidatePath } from "next/cache"
import { createSocialLink, deleteSocialLink, getSocialLinkById, getSocialLinks, updateSocialLink } from "@/lib/repositories/social-links"
import type { SocialLinkInput, SocialLinkUpdate, SocialLinkView, SocialZone } from "@/lib/types/social-links"

const REVALIDATE_PATHS = ["/", "/episodes", "/admin/social-links", "/connect"] as const

const sanitizeZones = (zones: SocialZone[]): SocialZone[] => {
  const unique = Array.from(new Set(zones)) as SocialZone[]
  return unique.length ? unique : ["footer"]
}

const sanitizePayload = <T extends SocialLinkInput | SocialLinkUpdate>(data: T): T => {
  const normalized: Partial<SocialLinkInput> = {
    ...data,
    icon_slug: data.icon_slug?.trim() || null,
    zones: data.zones ? sanitizeZones(data.zones) : undefined,
    priority: typeof data.priority === "number" ? data.priority : 0,
    is_featured: typeof data.is_featured === "boolean" ? data.is_featured : false,
  }

  return normalized as T
}

const revalidateAll = () => {
  REVALIDATE_PATHS.forEach((path) => revalidatePath(path))
}

export async function getAllSocialLinksForAdmin() {
  try {
    const data = await getSocialLinks()
    return { success: true as const, data }
  } catch (error) {
    console.error("[Admin] Failed to fetch social links", error)
    return { success: false as const, data: [], error: "Unable to load social links" }
  }
}

export async function getSocialLinkForAdmin(id: string) {
  try {
    const link = await getSocialLinkById(id)
    if (!link) {
      return { success: false as const, error: "Link not found" }
    }
    return { success: true as const, data: link }
  } catch (error) {
    console.error("[Admin] Failed to fetch social link", error)
    return { success: false as const, error: "Unable to load social link" }
  }
}

export async function createSocialLinkAction(payload: SocialLinkInput) {
  try {
    const result = await createSocialLink(sanitizePayload(payload))
    if (!result) {
      throw new Error("Failed to create social link")
    }
    revalidateAll()
    return { success: true as const, data: result }
  } catch (error) {
    console.error("[Admin] Failed to create social link", error)
    return { success: false as const, error: error instanceof Error ? error.message : "Failed to create social link" }
  }
}

export async function updateSocialLinkAction(id: string, payload: SocialLinkUpdate) {
  try {
    const result = await updateSocialLink(id, sanitizePayload(payload))
    if (!result) {
      throw new Error("Failed to update social link")
    }
    revalidateAll()
    return { success: true as const, data: result }
  } catch (error) {
    console.error("[Admin] Failed to update social link", error)
    return { success: false as const, error: error instanceof Error ? error.message : "Failed to update social link" }
  }
}

export async function deleteSocialLinkAction(id: string) {
  try {
    const success = await deleteSocialLink(id)
    if (!success) {
      throw new Error("Failed to delete social link")
    }
    revalidateAll()
    return { success: true as const }
  } catch (error) {
    console.error("[Admin] Failed to delete social link", error)
    return { success: false as const, error: error instanceof Error ? error.message : "Failed to delete social link" }
  }
}
