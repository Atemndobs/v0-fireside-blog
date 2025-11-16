export type SocialZone = "episodes_cta" | "footer" | "connect_page"

export interface SocialLinkRecord {
  id: string
  platform: string
  label: string
  url: string
  icon_slug: string | null
  priority: number
  zones: SocialZone[]
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface SocialLinkInput {
  platform: string
  label: string
  url: string
  icon_slug?: string | null
  priority?: number
  zones: SocialZone[]
  is_featured?: boolean
}

export interface SocialLinkUpdate extends Partial<SocialLinkInput> {}

export interface SocialLinkView {
  id: string
  platform: string
  label: string
  url: string
  iconSlug: string | null
  priority: number
  zones: SocialZone[]
  isFeatured: boolean
}
