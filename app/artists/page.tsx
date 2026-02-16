import { getAllArtists } from "@/lib/repositories/content"
import { notFound } from "next/navigation"
import { publicContentVisibility } from "@/lib/config/content-visibility"
import { ChartItem, FeaturedVideoHero, SectionHeader } from "@/components/design-system"

export default async function ArtistsPage() {
  if (!publicContentVisibility.artists) {
    notFound()
  }

  const artists = await getAllArtists()

  // Featured Artist (Hero)
  const featuredArtist = artists.find((artist) => artist.featured) || artists[0] || null

  // Remaining List
  const listArtists = featuredArtist
    ? artists.filter((artist) => artist.id !== featuredArtist.id)
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
              key={artist.id}
              rank={index + 1}
              title={artist.name}
              artist={artist.shortDescription || "Cameroon"}
              coverUrl={artist.profileImageUrl || '/placeholder.svg'}
              href={`/artists/${artist.slug}`}
              trend={index % 3 === 0 ? "up" : index % 3 === 1 ? "down" : "same"} // Mock trend for visuals
            />
          ))}
        </div>

        {artists.length === 0 && (
          <div className="rounded-lg border border-border p-8 text-muted-foreground">
            No artists are currently published.
          </div>
        )}
      </div>
    </div>
  )
}
