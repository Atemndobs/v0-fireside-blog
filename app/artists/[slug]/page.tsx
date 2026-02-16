import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { publicContentVisibility } from "@/lib/config/content-visibility"
import { getArtistBySlug } from "@/lib/repositories/content"

interface ArtistPageProps {
  params: {
    slug: string
  }
}

const normalizeBio = (value: unknown): string[] => {
  if (!value) return []

  if (typeof value === "string") {
    return value
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeBio(item))
  }

  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap((item) => normalizeBio(item))
  }

  return []
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  if (!publicContentVisibility.artists) {
    notFound()
  }

  const artist = await getArtistBySlug(params.slug)
  if (!artist) {
    notFound()
  }

  const bioParagraphs = normalizeBio(artist.bio)
  const description = bioParagraphs.length > 0 ? bioParagraphs : [artist.shortDescription].filter(Boolean)

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/artists"
          className="inline-flex items-center gap-2 mb-8 text-sm uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Artists
        </Link>

        <article className="bg-card border border-border rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-1">
              <div className="relative h-[320px] overflow-hidden rounded-md border border-border">
                <Image
                  src={artist.profileImageUrl || "/placeholder.svg"}
                  alt={artist.profileImageAlt || artist.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-5xl font-black mb-3">{artist.name}</h1>
              {artist.genre && (
                <p className="text-sm uppercase tracking-wide text-muted-foreground mb-6">{artist.genre}</p>
              )}
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground/90">
                {description.map((paragraph, index) => (
                  <p key={`${artist.id}-bio-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
