import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { SocialLinkInput, SocialLinkRecord, SocialLinkUpdate, SocialLinkView, SocialZone } from "@/lib/types/social-links"

const TABLE = "fireside_social_links"

const baseSelect = () =>
  getSupabaseServerClient()
    .from(TABLE)
    .select("*")
    .order("priority", { ascending: true })
    .order("created_at", { ascending: true })

const mapRecord = (record: SocialLinkRecord): SocialLinkView => ({
  id: record.id,
  platform: record.platform,
  label: record.label,
  url: record.url,
  iconSlug: record.icon_slug,
  priority: record.priority,
  zones: record.zones,
  isFeatured: record.is_featured,
})

export async function getSocialLinks(zone?: SocialZone): Promise<SocialLinkView[]> {
  let query = baseSelect()

  if (zone) {
    query = query.contains("zones", [zone])
  }

  const { data, error } = await query
  if (error || !data) {
    console.warn("[Supabase] Failed to load social links", error)
    return []
  }

  return (data as SocialLinkRecord[]).map(mapRecord)
}

export async function getSocialLinkById(id: string): Promise<SocialLinkView | null> {
  const { data, error } = await baseSelect().eq("id", id).single()

  if (error || !data) {
    console.warn("[Supabase] Failed to load social link", error)
    return null
  }

  return mapRecord(data as SocialLinkRecord)
}

export async function createSocialLink(payload: SocialLinkInput): Promise<SocialLinkView | null> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from(TABLE).insert([{ ...payload }]).select("*").single()

  if (error || !data) {
    console.error("[Supabase] Failed to create social link", error)
    return null
  }

  return mapRecord(data as SocialLinkRecord)
}

export async function updateSocialLink(id: string, payload: SocialLinkUpdate): Promise<SocialLinkView | null> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase.from(TABLE).update(payload).eq("id", id).select("*").single()

  if (error || !data) {
    console.error("[Supabase] Failed to update social link", error)
    return null
  }

  return mapRecord(data as SocialLinkRecord)
}

export async function deleteSocialLink(id: string): Promise<boolean> {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.from(TABLE).delete().eq("id", id)

  if (error) {
    console.error("[Supabase] Failed to delete social link", error)
    return false
  }

  return true
}
