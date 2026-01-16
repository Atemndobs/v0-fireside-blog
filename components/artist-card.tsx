import Image from "next/image"
import Link from "next/link"
import { getFlagEmoji } from "@/lib/utils/countries"

interface ArtistCardProps {
  name: string
  description: string
  imageSrc: string
  slug: string
  countryCode?: string | null
}

export function ArtistCard({ name, description, imageSrc, slug, countryCode }: ArtistCardProps) {
  return (
    <Link href={`/artists/${slug}`}>
      <div className="group bg-card border border-border p-6 shadow-lg hover:shadow-xl transition-all">
        <div className="relative h-[250px] mb-4 overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-2xl font-bold line-clamp-1 flex-1">{name}</h3>
          {countryCode && (
            <span className="text-2xl flex-shrink-0">{getFlagEmoji(countryCode)}</span>
          )}
        </div>
        <p className="text-muted-foreground line-clamp-1">{description}</p>

        <div className="mt-4 inline-block bg-primary text-primary-foreground px-4 py-2 font-bold">
          VIEW PROFILE
        </div>
      </div>
    </Link>
  )
}
