/**
 * Social Links Repository - Now using Convex for reads
 * Write operations (create, update, delete) need Convex mutations to be implemented
 */
import { getSocialLinks as getConvexSocialLinks } from "@/lib/convex/server"
import type { SocialLinkView, SocialZone } from "@/lib/types/social-links"

export async function getSocialLinks(zone?: SocialZone): Promise<SocialLinkView[]> {
  const links = await getConvexSocialLinks(zone)
  return links as SocialLinkView[]
}

// TODO: Implement these with Convex mutations
export async function getSocialLinkById(id: string): Promise<SocialLinkView | null> {
  console.warn("[Convex] getSocialLinkById not yet implemented")
  return null
}

export async function createSocialLink(payload: any): Promise<SocialLinkView | null> {
  console.warn("[Convex] createSocialLink not yet implemented - needs Convex mutation")
  return null
}

export async function updateSocialLink(id: string, payload: any): Promise<SocialLinkView | null> {
  console.warn("[Convex] updateSocialLink not yet implemented - needs Convex mutation")
  return null
}

export async function deleteSocialLink(id: string): Promise<boolean> {
  console.warn("[Convex] deleteSocialLink not yet implemented - needs Convex mutation")
  return false
}
