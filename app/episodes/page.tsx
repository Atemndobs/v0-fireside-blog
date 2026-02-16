import { getAllEpisodes } from "@/lib/repositories/content"
import { FeaturedVideoHero, VideoCard, SectionHeader } from "@/components/design-system"

export default async function EpisodesPage() {
  const episodes = await getAllEpisodes()

  // Strategy: Find first featured episode, or default to first episode
  const featuredEpisode = episodes.find((e) => e.featured) || episodes[0] || null

  // Remaining episodes (exclude featured if found, otherwise exclude first)
  const otherEpisodes = featuredEpisode
    ? episodes.filter(e => e.id !== featuredEpisode.id)
    : []

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      {featuredEpisode && (
        <FeaturedVideoHero
          title={featuredEpisode.title}
          description={featuredEpisode.description}
          subtitle={`Episode • ${featuredEpisode.publishedAt || 'New'}`}
          thumbnailUrl={featuredEpisode.coverImageUrl || '/placeholder.svg'}
          href={`/episodes/${featuredEpisode.slug}`}
          label="Featured Episode"
        />
      )}

      {/* Main Grid Content */}
      <div className="container mx-auto px-4 mt-12 md:mt-16">
        <SectionHeader title="Latest Episodes" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
          {otherEpisodes.map((episode) => (
            <VideoCard
              key={episode.id}
              title={episode.title}
              thumbnailUrl={episode.coverImageUrl || '/placeholder.svg'}
              duration="45:00" /* Placeholder duration or mapped if available */
              href={`/episodes/${episode.slug}`}
              category="Podcast"
            />
          ))}

          {/* Empty state when no episodes are currently available */}
          {(!featuredEpisode && otherEpisodes.length === 0) && (
            <div className="col-span-full text-center text-gray-500 py-20">
              No episodes found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
