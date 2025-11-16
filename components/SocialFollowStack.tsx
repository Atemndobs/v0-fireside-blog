import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getSocialLinks } from "@/lib/repositories/social-links"
import type { SocialLinkView, SocialZone } from "@/lib/types/social-links"
import { getPlatformMeta } from "@/lib/social-platforms"

type SocialFollowStackProps = {
  zone: SocialZone
  variant?: "stack" | "inline"
  heading?: string
}

const FALLBACK_LINKS: Record<SocialZone, SocialLinkView[]> = {
  episodes_cta: [
    {
      id: "spotify-fallback",
      platform: "spotify",
      label: "Follow on Spotify",
      url: "https://open.spotify.com/show/4Pmd0zCt4r1UCEI2mTJdtl",
      iconSlug: null,
      priority: 0,
      zones: ["episodes_cta"],
      isFeatured: true,
    },
    {
      id: "youtube-fallback",
      platform: "youtube",
      label: "Watch on YouTube",
      url: "https://youtube.com/@TheFiresideTribe",
      iconSlug: null,
      priority: 1,
      zones: ["episodes_cta"],
      isFeatured: false,
    },
    {
      id: "instagram-fallback",
      platform: "instagram",
      label: "Follow on Instagram",
      url: "https://www.instagram.com/firesidetribe",
      iconSlug: null,
      priority: 2,
      zones: ["episodes_cta"],
      isFeatured: false,
    },
    {
      id: "tiktok-fallback",
      platform: "tiktok",
      label: "Join us on TikTok",
      url: "https://www.tiktok.com/@thefiresidetribe1",
      iconSlug: null,
      priority: 3,
      zones: ["episodes_cta"],
      isFeatured: false,
    },
  ],
  footer: [
    {
      id: "spotify-footer",
      platform: "spotify",
      label: "Spotify",
      url: "https://open.spotify.com/show/4Pmd0zCt4r1UCEI2mTJdtl",
      iconSlug: null,
      priority: 0,
      zones: ["footer"],
      isFeatured: true,
    },
    {
      id: "youtube-footer",
      platform: "youtube",
      label: "YouTube",
      url: "https://youtube.com/@TheFiresideTribe",
      iconSlug: null,
      priority: 1,
      zones: ["footer"],
      isFeatured: false,
    },
    {
      id: "instagram-footer",
      platform: "instagram",
      label: "Instagram",
      url: "https://instagram.com/thefiresidetribe",
      iconSlug: null,
      priority: 2,
      zones: ["footer"],
      isFeatured: false,
    },
    {
      id: "tiktok-footer",
      platform: "tiktok",
      label: "TikTok",
      url: "https://www.tiktok.com/@thefiresidetribe",
      iconSlug: null,
      priority: 3,
      zones: ["footer"],
      isFeatured: false,
    },
  ],
  connect_page: [],
}

export async function SocialFollowStack({ zone, variant = "stack", heading }: SocialFollowStackProps) {
  const links = await getSocialLinks(zone)
  const items = links.length ? links : FALLBACK_LINKS[zone] ?? []

  if (!items.length) {
    return null
  }

  if (variant === "inline") {
    return (
      <div className="space-y-3">
        {heading && <p className="text-sm text-gray-400">{heading}</p>}
        <div className="flex flex-wrap gap-3">
          {items.map((link) => {
            const meta = getPlatformMeta(link.platform)
            return (
              <Link
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white bg-black px-4 py-2 text-sm font-semibold text-white shadow-[3px_3px_0px_0px_rgba(239,68,68,1)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                aria-label={`Follow The Fireside Tribe on ${link.label}`}
              >
                <meta.Icon size={16} />
                {link.label}
                <ArrowUpRight size={14} />
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {heading && <p className="text-base font-semibold text-gray-800">{heading}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((link) => {
          const meta = getPlatformMeta(link.platform)
          return (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 min-w-[220px] rounded-2xl border-4 border-black bg-black text-white shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] transition hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(239,68,68,1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
              aria-label={`Follow The Fireside Tribe on ${link.label}`}
            >
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                  <meta.Icon size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm uppercase tracking-wide text-slate-300">Follow</p>
                  <p className="text-lg font-semibold">{link.label}</p>
                </div>
                <ArrowUpRight className="text-slate-400 transition group-hover:text-white" size={20} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
