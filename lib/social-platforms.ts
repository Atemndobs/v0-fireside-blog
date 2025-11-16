import type { LucideIcon } from "lucide-react"
import { Music4, Youtube, Instagram, Music2 } from "lucide-react"
import type { SocialZone } from "@/lib/types/social-links"

export type PlatformKey = "spotify" | "youtube" | "instagram" | "tiktok" | "custom"

interface PlatformMeta {
  label: string
  bgClass: string
  textClass: string
  Icon: LucideIcon
}

export const SOCIAL_PLATFORM_META: Record<PlatformKey, PlatformMeta> = {
  spotify: {
    label: "Spotify",
    bgClass: "bg-green-500",
    textClass: "text-green-950",
    Icon: Music4,
  },
  youtube: {
    label: "YouTube",
    bgClass: "bg-red-500",
    textClass: "text-white",
    Icon: Youtube,
  },
  instagram: {
    label: "Instagram",
    bgClass: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400",
    textClass: "text-white",
    Icon: Instagram,
  },
  tiktok: {
    label: "TikTok",
    bgClass: "bg-gray-900",
    textClass: "text-white",
    Icon: Music2,
  },
  custom: {
    label: "Custom",
    bgClass: "bg-slate-800",
    textClass: "text-white",
    Icon: Music4,
  },
}

export const SOCIAL_PLATFORM_OPTIONS: { label: string; value: PlatformKey }[] = Object.entries(SOCIAL_PLATFORM_META).map(
  ([value, meta]) => ({
    value: value as PlatformKey,
    label: meta.label,
  }),
)

export const SOCIAL_ZONES: { value: SocialZone; label: string; description: string }[] = [
  {
    value: "episodes_cta",
    label: "Episodes CTA",
    description: "Appears on the /episodes page hero call-to-action.",
  },
  {
    value: "footer",
    label: "Footer",
    description: "Shown in the global footer connect section.",
  },
  {
    value: "connect_page",
    label: "Connect Page",
    description: "Used on the upcoming /connect hub page.",
  },
]

export function getPlatformMeta(platform: string | null | undefined): PlatformMeta {
  if (!platform) return SOCIAL_PLATFORM_META.custom
  const key = platform.toLowerCase() as PlatformKey
  return SOCIAL_PLATFORM_META[key] ?? SOCIAL_PLATFORM_META.custom
}
