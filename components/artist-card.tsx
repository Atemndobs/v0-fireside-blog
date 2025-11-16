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
      <div className="group bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
        <div className="relative h-[250px] mb-4 border-4 border-black overflow-hidden">
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
        <p className="text-gray-700 line-clamp-1">{description}</p>

        <div className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 font-bold border-2 border-black">
          VIEW PROFILE
        </div>
      </div>
    </Link>
  )
}
