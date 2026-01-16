import { getAllEpisodes } from "@/lib/repositories/content"
import type { Episode } from "@/lib/types/content"
import { getAssetUrl } from "@/lib/utils/assets"
import { FeaturedVideoHero, VideoCard, SectionHeader } from "@/components/design-system"

// Fallback data for development if no episodes exist
const fallbackEpisodes = [
  {
    id: "1",
    title: "The Rise of Cameroonian Artists Globally",
    description: "Discover how Cameroonian artists are making waves on the international music scene.",
    publishedAt: "March 15, 2025",
    spotifyUrl: "https://open.spotify.com/episode/4MLpsIqPq6fdhAsDfN5lP5",
    youtubeUrl: "https://youtu.be/mw4xLb59QO0",
    coverImageUrl: getAssetUrl("images/sepo.jpg"),
    slug: "rise-of-cameroonian-artists",
    featured: true
  },
  {
    id: "2",
    title: "Exploring Cameroon's Afrobeats Scene",
    description: "Dive into the rich sounds and rhythms of Cameroon's growing Afrobeats movement.",
    publishedAt: "April 20, 2025",
    spotifyUrl: "https://open.spotify.com/episode/4qxmv4JdlfIwJM0nUFOhCJ",
    youtubeUrl: "https://youtu.be/kD-wI-jZQBY",
    coverImageUrl: getAssetUrl("images/jail_time_records_cover.png"),
    slug: "exploring-cameroon-afrobeats",
    featured: false
  },
  {
    id: "3",
    title: "Spotlight on Douala's Music Scene",
    description: "Exploring the vibrant underground music culture in Cameroon's largest city.",
    publishedAt: "May 5, 2025",
    spotifyUrl: "https://open.spotify.com/episode/4MLpsIqPq6fdhAsDfN5lP5",
    youtubeUrl: "https://youtu.be/mw4xLb59QO0",
    coverImageUrl: getAssetUrl("images/ber_boys.jpg"),
    slug: "douala-music-scene",
    featured: false
  },
] as any[]

export default async function EpisodesPage() {
  const rawEpisodes = await getAllEpisodes()
  const episodes = rawEpisodes.length > 0 ? rawEpisodes : fallbackEpisodes

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

          {/* If simplified fallback logic resulted in duplicates or empty, ensure we show the rest */}
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
