import { getFeaturedArtists, getLatestEpisodes, getLatestBlogPosts } from "@/lib/repositories/content"
import { publicContentVisibility } from "@/lib/config/content-visibility"
import {
  MultiPlatformHero,
  VideoCard,
  EditorialCard,
  ChartItem,
  SectionHeader
} from "@/components/design-system"
import { ArtistCircle } from "@/components/design-system/ArtistCircle"

export const revalidate = 0 // Force dynamic rendering

export default async function Home() {
  const { artists: showArtists, blog: showBlog } = publicContentVisibility

  const [episodes, artists, posts] = await Promise.all([
    getLatestEpisodes(4),
    showArtists ? getFeaturedArtists(5) : Promise.resolve([]),
    showBlog ? getLatestBlogPosts(3) : Promise.resolve([]),
  ])

  // TikTok and YouTube video IDs for multi-platform hero
  const tiktokVideoIds = [
    "7537815820701879608",
    "7588315471515110664",
    "7584791817955183879",
    "7571594930435476744",
  ]

  const youtubeVideoIds = [
    "ieUD7NY_WxU",
    "4rTi2TUzWTI",
    "eath6AJfh3Y",
    "ndoTJ0ApWU4",
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">

      {/* 1. HERO SECTION (Multi-Platform Showcase) */}
      <MultiPlatformHero
        tiktokVideoIds={tiktokVideoIds}
        youtubeVideoIds={youtubeVideoIds}
        instagramUsername="thefiresidetribe"
        autoPlayInterval={10000}
      />

      <div className="container mx-auto px-4 space-y-20 mt-12">
        {showArtists && artists.length > 0 && (
          <>
            {/* 2. TRENDING ARTISTS (Horizontal Scroll) */}
            <section>
              <SectionHeader title="Trending Artists" href="/artists" linkText="All Artists" />
              <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide snap-x">
                {artists.map((artist) => (
                  <ArtistCircle
                    key={artist.id}
                    name={artist.name}
                    imageUrl={artist.profileImageUrl || "/placeholder.svg"}
                    href={`/artists/${artist.slug}`}
                  />
                ))}
              </div>
            </section>

            {/* 3. CHART TOPPERS (List Style) */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="col-span-1 lg:col-span-8">
                <SectionHeader title="Fireside Charts" href="/artists" linkText="Full Chart" />
                <div className="flex flex-col">
                  {artists.slice(0, 5).map((artist, index) => (
                    <ChartItem
                      key={artist.id}
                      rank={index + 1}
                      title={artist.name}
                      artist={artist.shortDescription || "Cameroon"}
                      coverUrl={artist.profileImageUrl || "/placeholder.svg"}
                      href={`/artists/${artist.slug}`}
                      trend={index === 0 ? "same" : index === 1 ? "up" : "down"}
                      lastWeek={index + 2}
                    />
                  ))}
                </div>
              </div>

              {/* Sidebar: Newsletter or Ad space */}
              <div className="col-span-1 lg:col-span-4 hidden lg:block">
                <div className="bg-secondary/50 p-8 h-full flex flex-col justify-center text-center border border-border">
                  <h3 className="font-heading font-bold text-2xl uppercase mb-4">Join The Tribe</h3>
                  <p className="text-muted-foreground mb-6 text-sm">
                    Get the weekly chart rundown and exclusive artist interviews.
                  </p>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-background border border-border p-3 text-foreground mb-3 text-sm focus:border-primary outline-none"
                  />
                  <button className="w-full bg-primary text-primary-foreground font-bold uppercase py-3 text-sm hover:bg-foreground hover:text-background transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* 4. LATEST EPISODES (Grid) */}
        <section>
          <SectionHeader title="Latest Episodes" href="/episodes" />
          {episodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodes.map((episode) => (
                <VideoCard
                  key={episode.id}
                  title={episode.title}
                  thumbnailUrl={episode.coverImageUrl || "/placeholder.svg"}
                  href={`/episodes/${episode.slug}`}
                  category="Podcast"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border p-8 text-sm text-muted-foreground">
              No episodes are published yet.
            </div>
          )}
        </section>

        {showBlog && posts.length > 0 && (
          <section>
            <SectionHeader title="Editorial" href="/blog" linkText="Read More" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <EditorialCard
                  key={post.id}
                  title={post.title}
                  excerpt={idx === 0 ? post.excerpt : undefined}
                  date={post.publishedAt}
                  imageUrl={post.featuredImageUrl || "/placeholder.svg"}
                  href={`/blog/${post.slug}`}
                  category="News"
                  variant="standard"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
