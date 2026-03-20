import { getFeaturedArtists, getLatestEpisodes, getLatestBlogPosts } from "@/lib/repositories/content"
import { publicContentVisibility } from "@/lib/config/content-visibility"
import {
  BillboardHero,
  NewsTicker,
  MagazineGrid,
  SectionHeader
} from "@/components/design-system"
import { ArtistCircle } from "@/components/design-system/ArtistCircle"

export const revalidate = 0 // Force dynamic rendering

export default async function Home() {
  const { artists: showArtists, blog: showBlog } = publicContentVisibility

  // Fetch all content in parallel
  const [episodes, artists, posts] = await Promise.all([
    getLatestEpisodes(12), // Get more episodes for hero + grids
    showArtists ? getFeaturedArtists(8) : Promise.resolve([]),
    showBlog ? getLatestBlogPosts(9) : Promise.resolve([]),
  ])

  // Prepare hero content (use latest 3 episodes)
  const heroEpisodes = episodes.slice(0, 3)
  const mainFeature = heroEpisodes[0] ? {
    title: heroEpisodes[0].title,
    excerpt: heroEpisodes[0].description || "",
    imageUrl: heroEpisodes[0].coverImageUrl || "/placeholder.svg",
    href: `/episodes/${heroEpisodes[0].slug}`,
    category: "Latest Episode"
  } : null

  const secondaryFeatures = heroEpisodes.slice(1, 3).map(ep => ({
    title: ep.title,
    imageUrl: ep.coverImageUrl || "/placeholder.svg",
    href: `/episodes/${ep.slug}`,
    category: "Episode"
  }))

  // News ticker items - mix of latest episodes and posts
  const tickerItems = [
    ...episodes.slice(0, 6).map(ep => ({
      title: ep.title,
      href: `/episodes/${ep.slug}`
    })),
    ...(showBlog ? posts.slice(0, 4).map(post => ({
      title: post.title,
      href: `/blog/${post.slug}`
    })) : [])
  ]

  // Episodes for magazine grid (skip first 3 used in hero)
  const gridEpisodes = episodes.slice(3, 9)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        
        {/* 1. BILLBOARD-STYLE HERO - Large feature + 2 secondary */}
        {mainFeature && (
          <BillboardHero
            mainFeature={mainFeature}
            secondaryFeatures={secondaryFeatures}
          />
        )}

        {/* 2. NEWS TICKER - Horizontal scrolling latest items */}
        {tickerItems.length > 0 && <NewsTicker items={tickerItems} />}

        {/* 3. LATEST EPISODES - Magazine Grid (first item featured) */}
        {gridEpisodes.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              title="Latest Episodes" 
              href="/episodes" 
              linkText="All Episodes" 
            />
            <MagazineGrid
              items={gridEpisodes.map(ep => ({
                title: ep.title,
                excerpt: ep.description,
                imageUrl: ep.coverImageUrl || "/placeholder.svg",
                href: `/episodes/${ep.slug}`,
                category: "Podcast",
                publishedAt: ep.publishedAt
              }))}
            />
          </section>
        )}

        {/* 4. TRENDING ARTISTS - Grid Layout (not horizontal scroll) */}
        {showArtists && artists.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              title="Trending Artists" 
              href="/artists" 
              linkText="All Artists" 
            />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
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
        )}

        {/* 5. EDITORIAL - Magazine Grid */}
        {showBlog && posts.length > 0 && (
          <section className="mb-16">
            <SectionHeader 
              title="Editorial" 
              href="/blog" 
              linkText="Read More" 
            />
            <MagazineGrid
              items={posts.map(post => ({
                title: post.title,
                excerpt: post.excerpt,
                imageUrl: post.featuredImageUrl || "/placeholder.svg",
                href: `/blog/${post.slug}`,
                category: "News",
                publishedAt: post.publishedAt
              }))}
            />
          </section>
        )}
      </div>
    </div>
  )
}
