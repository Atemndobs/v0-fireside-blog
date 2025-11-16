import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { PodcastCard } from "@/components/podcast-card"
import { ArtistCard } from "@/components/artist-card"
import { BlogCard } from "@/components/blog-card"
import { getFeaturedArtists, getLatestEpisodes, getLatestBlogPosts } from "@/lib/repositories/content"
import type { Artist, BlogPost, Episode } from "@/lib/types/content"
import { getAssetUrl } from "@/lib/utils/assets"

type PodcastCardData = {
  title: string
  description: string
  date: string
  spotifyUrl: string
  youtubeUrl: string
  imageSrc: string
}

type ArtistCardData = {
  name: string
  description: string
  imageSrc: string
  slug: string
}

type BlogCardData = {
  title: string
  excerpt: string
  date: string
  author: string
  imageSrc: string
  slug: string
}

const fallbackEpisodes: PodcastCardData[] = [
  {
    title: "Exploring Cameroon's Afrobeats Scene",
    description: "Dive into the rich sounds and rhythms of Cameroon's growing Afrobeats movement.",
    date: "April 20, 2025",
    spotifyUrl: "https://open.spotify.com/episode/4qxmv4JdlfIwJM0nUFOhCJ?si=121bab7159174929",
    youtubeUrl: "https://youtu.be/kD-wI-jZQBY",
    imageSrc: getAssetUrl("images/jovi3.png"),
  },
  {
    title: "The Rise of Cameroonian Artists Globally",
    description: "Discover how Cameroonian artists are making waves on the international music scene.",
    date: "March 15, 2025",
    spotifyUrl: "https://open.spotify.com/episode/4MLpsIqPq6fdhAsDfN5lP5?si=a32a205a9ed64ee3",
    youtubeUrl: "https://youtu.be/mw4xLb59QO0",
    imageSrc:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.byPUWkyhJy3cnZmiGVzu8QHaHb%26pid%3DApi&f=1",
  },
]

const fallbackArtists: ArtistCardData[] = [
  {
    name: "Tayc",
    description: "Blending French R&B with Cameroonian roots, Tayc is a global sensation.",
    imageSrc: getAssetUrl("images/tayc-1.jpg"),
    slug: "tayc",
  },
  {
    name: "James BKS",
    description: "Producer and son of Manu Dibango blending African sounds with hip-hop",
    imageSrc: "https://chartroommedia.com/wp-content/uploads/2023/10/1R3A1242_JAMESBKS_FIFOU.jpg",
    slug: "james-bks",
  },
  {
    name: "Kang",
    description: "Afrobeats and urban music innovator from Cameroon.",
    imageSrc: getAssetUrl("images/kang_Gang.png"),
    slug: "kang",
  },
]

const fallbackPosts: BlogCardData[] = [
  {
    title: "How Tayc is Redefining French R&B with Cameroonian Influences",
    excerpt: "Explore how Tayc's Cameroonian heritage shapes his unique sound and international appeal.",
    date: "April 15, 2025",
    author: "The Fireside Tribe",
    imageSrc: "https://resources.tidal.com/images/d49938db/8882/4b34/86ba/9811e589222b/640x640.jpg",
    slug: "tayc-redefining-french-rb",
  },
  {
    title: "The Legacy of Manu Dibango Through James BKS",
    excerpt: "How James BKS is carrying forward his father's musical legacy while creating his own path.",
    date: "March 28, 2025",
    author: "The Fireside Tribe",
    imageSrc: "https://pan-african-music.com/wp-content/uploads/2019/11/37eed9ff-james-bks.jpg",
    slug: "james-bks-legacy",
  },
  {
    title: "5 Cameroonian Artists Making Waves Internationally",
    excerpt: "From Kang to Ronis Goliath, these artists are putting Cameroon on the global music map.",
    date: "March 10, 2025",
    author: "The Fireside Tribe",
    imageSrc:
      "https://static.wixstatic.com/media/5e0aaf_4333086aaa1f43d88a26581b7dc5e2fc~mv2.jpg/v1/fill/w_640,h_640,al_c,q_85,usm_2.00_1.00_0.00,enc_avif,quality_auto/Image-empty-state_edited_edited.jpg",
    slug: "cameroonian-artists-global",
  },
]

const toPodcastCardData = (episodes: Episode[]): PodcastCardData[] =>
  episodes.map((episode) => ({
    title: episode.title,
    description: episode.description ?? "New conversations from the Fireside Tribe.",
    date: episode.publishedAt ?? "Fresh episode",
    spotifyUrl: episode.spotifyUrl ?? "",
    youtubeUrl: episode.youtubeUrl ?? "",
    imageSrc: episode.coverImageUrl ?? "/placeholder.svg",
  }))

const toArtistCardData = (artists: Artist[]): ArtistCardData[] =>
  artists.map((artist) => ({
    name: artist.name,
    description: artist.shortDescription ?? "Cameroonian talent spotlight.",
    imageSrc: artist.profileImageUrl ?? "/placeholder.svg",
    slug: artist.slug,
  }))

const toBlogCardData = (posts: BlogPost[]): BlogCardData[] =>
  posts.map((post) => ({
    title: post.title,
    excerpt: post.excerpt ?? "Read the latest editorial from The Fireside Tribe newsroom.",
    date: post.publishedAt ?? "Coming soon",
    author: post.author ?? "The Fireside Tribe",
    imageSrc: post.featuredImageUrl ?? "/placeholder.svg",
    slug: post.slug,
  }))

export default async function Home() {
  const [episodes, artists, posts] = await Promise.all([
    getLatestEpisodes(2),
    getFeaturedArtists(3),
    getLatestBlogPosts(3),
  ])

  const episodeCards = episodes.length ? toPodcastCardData(episodes) : fallbackEpisodes
  const artistCards = artists.length ? toArtistCardData(artists) : fallbackArtists
  const blogCards = posts.length ? toBlogCardData(posts) : fallbackPosts

  const bannerUrl = "https://ytqwwxlqqpqhhcpcqxax.supabase.co/storage/v1/object/public/fireside_assets/Banner.jpg"

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-16 md:py-24 px-4 border-b-8 border-red-500 overflow-hidden">
        {/* Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={bannerUrl}
            alt="The Fireside Tribe Banner"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-red-500 px-4 py-2 text-black font-black rotate-1">PODCAST</div>
              <h1 className="text-5xl md:text-7xl font-headline leading-tight">The Fireside Tribe</h1>
              <p className="text-xl md:text-2xl font-bold">Celebrating Cameroon's Talents in Afrobeats Scene</p>
              <Link
                href="#latest-episodes"
                className="inline-block bg-white text-black px-8 py-4 font-bold text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
              >
                LISTEN NOW
              </Link>
            </div>

            {/* Optional: Display banner prominently on right side for larger screens */}
            <div className="hidden md:block">
              <img
                src={bannerUrl}
                alt="The Fireside Tribe"
                className="w-full rounded-lg border-4 border-red-500 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Episodes */}
      <section id="latest-episodes" className="py-16 px-4 bg-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-black">LATEST EPISODES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {episodeCards.map((episode) => (
              <PodcastCard key={episode.title} {...episode} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/episodes"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
            >
              ALL EPISODES <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 px-4 bg-blue-100 border-y-8 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-black">FEATURED ARTISTS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistCards.map((artist) => (
              <ArtistCard key={artist.slug} {...artist} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/artists"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 font-bold text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
            >
              ALL ARTISTS <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4 bg-yellow-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-black">LATEST ARTICLES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogCards.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 font-bold text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
            >
              READ THE BLOG <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-red-500 text-white border-y-8 border-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">JOIN THE TRIBE</h2>
          <p className="text-xl mb-8">
            Get the latest episodes, artist features, and Cameroonian music news delivered to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 text-black border-4 border-black focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
