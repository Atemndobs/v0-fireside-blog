import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getFeaturedArtists, getLatestEpisodes, getLatestBlogPosts } from "@/lib/repositories/content"
import type { Artist, BlogPost, Episode } from "@/lib/types/content"
import { getAssetUrl } from "@/lib/utils/assets"
import {
  FeaturedVideoHero,
  VideoCard,
  EditorialCard,
  ChartItem,
  SectionHeader
} from "@/components/design-system"
import { ArtistCircle } from "@/components/design-system/ArtistCircle"

export const revalidate = 0 // Force dynamic rendering

// --- FALLBACK DATA ---
const fallbackEpisodes = [
  {
    id: "1",
    title: "Exploring Cameroon's Afrobeats Scene",
    description: "Dive into the rich sounds and rhythms of Cameroon's growing Afrobeats movement.",
    publishedAt: "April 20, 2025",
    spotifyUrl: "https://open.spotify.com/episode/4qxmv4JdlfIwJM0nUFOhCJ",
    youtubeUrl: "https://youtu.be/kD-wI-jZQBY",
    coverImageUrl: getAssetUrl("images/jovi3.png"),
    slug: "exploring-cameroons-afrobeats-scene",
  },
  {
    id: "2",
    title: "The Rise of Cameroonian Artists Globally",
    description: "Discover how Cameroonian artists are making waves on the international music scene.",
    publishedAt: "March 15, 2025",
    spotifyUrl: "https://open.spotify.com/episode/4MLpsIqPq6fdhAsDfN5lP5",
    youtubeUrl: "https://youtu.be/mw4xLb59QO0",
    coverImageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.byPUWkyhJy3cnZmiGVzu8QHaHb%26pid%3DApi&f=1",
    slug: "the-rise-of-cameroonian-artists-globally",
  },
] as any[]

const fallbackArtists = [
  {
    id: "1",
    name: "Lebianca",
    shortDescription: "Rising Cameroonian star known for soulful Afrobeats and R&B.",
    profileImageUrl: "https://i.ytimg.com/vi/wBRe8D-PKOs/maxresdefault.jpg",
    slug: "lebianca",
    orderRank: 1,
  },
  {
    id: "2",
    name: "Kocee",
    shortDescription: "Cameroonian Afrobeats artist with infectious rhythms.",
    profileImageUrl: "https://i.ytimg.com/vi/wBRe8D-PKOs/maxresdefault.jpg",
    slug: "kocee",
    orderRank: 2,
  },
  {
    id: "3",
    name: "Jovi",
    shortDescription: "Le Monstre - Pioneering Cameroonian rapper and producer.",
    profileImageUrl: getAssetUrl("images/jovi3.png"),
    slug: "jovi",
    orderRank: 3,
  },
  {
    id: "4",
    name: "DJ Bizi Brown",
    shortDescription: "Legendary Cameroonian DJ and music curator.",
    profileImageUrl: "/placeholder.svg",
    slug: "dj-bizi-brown",
    orderRank: 4,
  },
  {
    id: "5",
    name: "Yame",
    shortDescription: "Cameroonian artist blending traditional and modern sounds.",
    profileImageUrl: "https://i.ytimg.com/vi/lukT_WB5IB0/maxresdefault.jpg",
    slug: "yame",
    orderRank: 5,
  },
] as any[]

const fallbackPosts = [
  {
    id: "1",
    title: "How Tayc is Redefining French R&B with Cameroonian Influences",
    excerpt: "Explore how Tayc's Cameroonian heritage shapes his unique sound and international appeal.",
    publishedAt: "April 15, 2025",
    author: "The Fireside Tribe",
    featuredImageUrl: "https://resources.tidal.com/images/d49938db/8882/4b34/86ba/9811e589222b/640x640.jpg",
    slug: "tayc-redefining-french-rb",
  },
  {
    id: "2",
    title: "The Legacy of Manu Dibango Through James BKS",
    excerpt: "How James BKS is carrying forward his father's musical legacy while creating his own path.",
    publishedAt: "March 28, 2025",
    author: "The Fireside Tribe",
    featuredImageUrl: "https://pan-african-music.com/wp-content/uploads/2019/11/37eed9ff-james-bks.jpg",
    slug: "james-bks-legacy",
  },
  {
    id: "3",
    title: "5 Cameroonian Artists Making Waves Internationally",
    excerpt: "From Kang to Ronis Goliath, these artists are putting Cameroon on the global music map.",
    publishedAt: "March 10, 2025",
    author: "The Fireside Tribe",
    featuredImageUrl: "https://static.wixstatic.com/media/5e0aaf_4333086aaa1f43d88a26581b7dc5e2fc~mv2.jpg/v1/fill/w_640,h_640,al_c,q_85,usm_2.00_1.00_0.00,enc_avif,quality_auto/Image-empty-state_edited_edited.jpg",
    slug: "cameroonian-artists-global",
  },
] as any[]

export default async function Home() {
  // Fetch real data parallely
  const [episodesRaw, artistsRaw, postsRaw] = await Promise.all([
    getLatestEpisodes(4),
    getFeaturedArtists(5),
    getLatestBlogPosts(3),
  ])

  // Use fallbacks if empty
  const episodes = episodesRaw.length > 0 ? episodesRaw : fallbackEpisodes
  const artists = artistsRaw.length > 0 ? artistsRaw : fallbackArtists
  const posts = postsRaw.length > 0 ? postsRaw : fallbackPosts

  const featuredEpisode = episodes[0]
  const recentEpisodes = episodes.slice(1)

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">

      {/* 1. HERO SECTION (Featured Episode) */}
      {featuredEpisode && (
        <FeaturedVideoHero
          title={featuredEpisode.title}
          description={featuredEpisode.description}
          subtitle="New Episode Out Now"
          thumbnailUrl="/images/hero-banner.jpg"
          href={`/episodes/${featuredEpisode.slug}`}
          label="Latest Release"
          className="aspect-[4/5] md:aspect-[21/9]"
        />
      )}

      <div className="container mx-auto px-4 space-y-20 mt-12">

        {/* 2. TRENDING ARTISTS (Horizontal Scroll) */}
        <section>
          <SectionHeader title="Trending Artists" href="/artists" linkText="All Artists" />
          <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide snap-x">
            {artists.map(artist => (
              <ArtistCircle
                key={artist.id}
                name={artist.name}
                imageUrl={artist.profileImageUrl || '/placeholder.svg'}
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
              {artists.slice(0, 5).map((artist: any, index: number) => (
                <ChartItem
                  key={artist.id}
                  rank={index + 1}
                  title={artist.name}
                  artist={artist.shortDescription || "Cameroon"}
                  coverUrl={artist.profileImageUrl || '/placeholder.svg'}
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
              <p className="text-muted-foreground mb-6 text-sm">Get the weekly chart rundown and exclusive artist interviews.</p>
              <input type="email" placeholder="Email Address" className="w-full bg-background border border-border p-3 text-foreground mb-3 text-sm focus:border-primary outline-none" />
              <button className="w-full bg-primary text-primary-foreground font-bold uppercase py-3 text-sm hover:bg-foreground hover:text-background transition-colors">Subscribe</button>
            </div>
          </div>
        </section>

        {/* 4. LATEST EPISODES (Grid) */}
        <section>
          <SectionHeader title="Latest Episodes" href="/episodes" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentEpisodes.map(episode => (
              <VideoCard
                key={episode.id}
                title={episode.title}
                thumbnailUrl={episode.coverImageUrl || '/placeholder.svg'}
                href={`/episodes/${episode.slug}`}
                category="Podcast"
              />
            ))}
          </div>
        </section>

        {/* 5. EDITORIAL (Blog) */}
        <section>
          <SectionHeader title="Editorial" href="/blog" linkText="Read More" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <EditorialCard
                key={post.id}
                title={post.title}
                excerpt={idx === 0 ? post.excerpt : undefined} // Only show excerpt for first
                date={post.publishedAt}
                imageUrl={post.featuredImageUrl || '/placeholder.svg'}
                href={`/blog/${post.slug}`}
                category="News"
                variant="standard"
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
