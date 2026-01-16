import { getAllArtists } from "@/lib/repositories/content"
import type { Artist } from "@/lib/types/content"
import { getAssetUrl } from "@/lib/utils/assets"
import { ChartItem, FeaturedVideoHero, SectionHeader } from "@/components/design-system"

const fallbackArtists = [
  {
    _id: "1",
    name: "Tayc",
    shortDescription: "French-Cameroonian R&B sensation taking Europe by storm",
    profileImageUrl: getAssetUrl("images/tayc-2.jpeg"),
    slug: "tayc",
    countryCode: "FR",
    featured: true
  },
  {
    _id: "2",
    name: "James BKS",
    shortDescription: "Producer and son of Manu Dibango blending African sounds with hip-hop",
    profileImageUrl: "https://chartroommedia.com/wp-content/uploads/2023/10/1R3A1242_JAMESBKS_FIFOU.jpg",
    slug: "james-bks",
    countryCode: "FR",
    featured: true
  },
  {
    _id: "3",
    name: "Yame",
    shortDescription: "Rising star with a unique blend of Afrobeats and contemporary R&B",
    profileImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZtvYLD7t1tmbgdQ_EVBwAmg3Apx2pnT7sUsYo0tGfW4M8smpyvtxE2hTnh7h1k7V6ZWM&usqp=CAU",
    slug: "yame",
    countryCode: "BE",
    featured: false
  },
  {
    _id: "4",
    name: "Kang",
    shortDescription: "Innovative artist pushing the boundaries of Afrobeats with electronic influences",
    profileImageUrl: getAssetUrl("images/kang_Gang.png"),
    slug: "kang",
    countryCode: "CM",
    featured: false
  },
  {
    _id: "5",
    name: "Ronid Goliath",
    shortDescription: "DJ and producer bringing Cameroonian rhythms to dance floors worldwide",
    profileImageUrl: "https://africanmusiclibrary.org/_next/image?url=https%3A%2F%2Fd31btwpnsku5px.cloudfront.net%2F9e53c72a1e06.jpg&w=3840&q=75",
    slug: "ronis-goliath",
    countryCode: "CM",
    featured: false
  },
  {
    _id: "6",
    name: "Haira Berylie",
    shortDescription: "Singer-songwriter known for her vibrant Afrobeat and pop-infused sound",
    profileImageUrl: getAssetUrl("images/haira_1.jpg"),
    slug: "haira-berylie",
    countryCode: "CM",
    featured: false
  },
  {
    _id: "7",
    name: "Clerel",
    shortDescription: "Cameroonian-born soul singer crafting vintage-inspired R&B from his base in Canada.",
    profileImageUrl: "https://mobile-img.lpcdn.ca/lpca/924x/r3996/e8d4f304-d35a-11ea-b8ad-02fe89184577.jpg",
    slug: "clerel",
    countryCode: "CA",
    featured: false
  },
] as any[]

export default async function ArtistsPage() {
  const rawArtists = await getAllArtists()
  const artists = rawArtists.length > 0 ? rawArtists : fallbackArtists

  // Featured Artist (Hero)
  const featuredArtist = artists.find(a => a.featured) || artists[0]

  // Remaining List
  const listArtists = featuredArtist
    ? artists.filter(a => a._id !== featuredArtist._id)
    : artists

  return (
    <div className="min-h-screen bg-background pb-20">

      {/* Featured Header */}
      {featuredArtist && (
        <FeaturedVideoHero
          title={featuredArtist.name}
          description={featuredArtist.shortDescription}
          subtitle="Featured Artist"
          thumbnailUrl={featuredArtist.profileImageUrl || '/placeholder.svg'}
          href={`/artists/${featuredArtist.slug}`}
          label="Spotlight"
          className="aspect-[4/3] md:aspect-[21/9]"
        />
      )}

      <div className="container mx-auto px-4 mt-16 max-w-5xl">
        <SectionHeader title="The Charts" />

        <div className="flex flex-col border-t border-border">
          {listArtists.map((artist, index) => (
            <ChartItem
              key={artist._id}
              rank={index + 1}
              title={artist.name}
              artist={artist.shortDescription || "Cameroon"}
              coverUrl={artist.profileImageUrl || '/placeholder.svg'}
              href={`/artists/${artist.slug}`}
              trend={index % 3 === 0 ? "up" : index % 3 === 1 ? "down" : "same"} // Mock trend for visuals
            />
          ))}
        </div>
      </div>
    </div>
  )
}
