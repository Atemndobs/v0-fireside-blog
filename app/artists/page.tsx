import { ArtistCard } from "@/components/artist-card"
import { getAllArtists } from "@/lib/repositories/content"
import type { Artist } from "@/lib/types/content"
import { getAssetUrl } from "@/lib/utils/assets"

const fallbackArtists = [
  {
    name: "Tayc",
    description: "French-Cameroonian R&B sensation taking Europe by storm",
    imageSrc: getAssetUrl("images/tayc-2.jpeg"),
    slug: "tayc",
    countryCode: "FR",
  },
  {
    name: "James BKS",
    description: "Producer and son of Manu Dibango blending African sounds with hip-hop",
    imageSrc: "https://s.rfi.fr/media/display/f7d06e02-06bd-11ed-9bb2-005056a90284/w:980/p:16x9/000_9C79L4.jpg",
    slug: "james-bks",
    countryCode: "FR",
  },
  {
    name: "Yame",
    description: "Rising star with a unique blend of Afrobeats and contemporary R&B",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZtvYLD7t1tmbgdQ_EVBwAmg3Apx2pnT7sUsYo0tGfW4M8smpyvtxE2hTnh7h1k7V6ZWM&usqp=CAU",
    slug: "yame",
    countryCode: "BE",
  },
  {
    name: "Kang",
    description: "Innovative artist pushing the boundaries of Afrobeats with electronic influences",
    imageSrc: getAssetUrl("images/kang_Gang.png"),
    slug: "kang",
    countryCode: "CM",
  },
  {
    name: "Ronid Goliath",
    description: "DJ and producer bringing Cameroonian rhythms to dance floors worldwide",
    imageSrc: "https://africanmusiclibrary.org/_next/image?url=https%3A%2F%2Fd31btwpnsku5px.cloudfront.net%2F9e53c72a1e06.jpg&w=3840&q=75",
    slug: "ronis-goliath",
    countryCode: "CM",
  },
  {
    name: "Haira Berylie",
    description: "Singer-songwriter known for her vibrant Afrobeat and pop-infused sound",
    imageSrc: getAssetUrl("images/haira_1.jpg"),
    slug: "haira-berylie",
    countryCode: "CM",
  },
  {
    name: "Clerel",
    description: "Cameroonian-born soul singer crafting vintage-inspired R&B from his base in Canada.",
    imageSrc: "https://mobile-img.lpcdn.ca/lpca/924x/r3996/e8d4f304-d35a-11ea-b8ad-02fe89184577.jpg",
    slug: "clerel",
    countryCode: "CA",
  },
]

const toCardData = (artists: Artist[]) =>
  artists.map((artist) => ({
    name: artist.name,
    description: artist.shortDescription ?? "Cameroon's vibrant talent.",
    imageSrc: artist.profileImageUrl ?? "/placeholder.svg",
    slug: artist.slug,
    countryCode: artist.countryCode,
  }))

export default async function ArtistsPage() {
  const artists = await getAllArtists()
  const cards = artists.length ? toCardData(artists) : fallbackArtists

  return (
    <div className="min-h-screen bg-blue-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-600 px-4 py-2 text-white font-black rotate-1 mb-4">ARTISTS</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">CAMEROONIAN TALENT</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover the artists who are putting Cameroon on the global music map with their innovative sounds and
            cultural pride.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-black">FEATURED ARTISTS</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((artist) => (
            <ArtistCard key={artist.slug} {...artist} />
          ))}
        </div>
      </div>
    </div>
  )
}
