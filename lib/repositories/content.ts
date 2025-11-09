import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Artist, BlogPost, Episode } from "@/lib/types/content"

const formatDate = (value?: string | null) => {
  if (!value) return null

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

const mapEpisode = (episode: any): Episode => ({
  id: episode.id,
  title: episode.title,
  slug: episode.slug,
  description: episode.description,
  publishedAt: formatDate(episode.published_at),
  coverImageUrl: episode.cover_image_url,
  spotifyUrl: episode.spotify_url,
  youtubeUrl: episode.youtube_url,
  featured: Boolean(episode.featured),
})

const mapArtist = (artist: any): Artist => ({
  id: artist.id,
  name: artist.name,
  slug: artist.slug,
  shortDescription: artist.short_description,
  profileImageUrl: artist.profile_image_url,
  orderRank: artist.order_rank ?? 0,
})

const mapBlogPost = (post: any): BlogPost => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  author: post.author,
  publishedAt: formatDate(post.published_at),
  featuredImageUrl: post.featured_image_url,
  featured: Boolean(post.featured),
})

async function queryEpisodes(limit?: number) {
  const supabase = getSupabaseServerClient()
  let builder = supabase
    .from("fireside_episodes")
    .select(
      `
        id,
        title,
        slug,
        description,
        published_at,
        cover_image_url,
        spotify_url,
        youtube_url,
        featured
      `,
    )
    .order("published_at", { ascending: false })

  if (limit) {
    builder = builder.limit(limit)
  }

  const { data, error } = await builder
  if (error) {
    console.warn("[Supabase] Failed to load episodes", error)
    return []
  }

  return (data ?? []).map(mapEpisode)
}

async function queryArtists(limit?: number) {
  const supabase = getSupabaseServerClient()
  let builder = supabase
    .from("fireside_artists")
    .select(
      `
        id,
        name,
        slug,
        short_description,
        profile_image_url,
        order_rank
      `,
    )
    .order("order_rank", { ascending: true })

  if (limit) {
    builder = builder.limit(limit)
  }

  const { data, error } = await builder
  if (error) {
    console.warn("[Supabase] Failed to load artists", error)
    return []
  }

  return (data ?? []).map(mapArtist)
}

async function queryBlogPosts(limit?: number) {
  const supabase = getSupabaseServerClient()
  let builder = supabase
    .from("fireside_blog_posts")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        author,
        published_at,
        featured_image_url,
        featured
      `,
    )
    .order("published_at", { ascending: false })

  if (limit) {
    builder = builder.limit(limit)
  }

  const { data, error } = await builder
  if (error) {
    console.warn("[Supabase] Failed to load blog posts", error)
    return []
  }

  return (data ?? []).map(mapBlogPost)
}

export const getFeaturedEpisodes = (limit = 2): Promise<Episode[]> => queryEpisodes(limit)
export const getAllEpisodes = (): Promise<Episode[]> => queryEpisodes()

export const getFeaturedArtists = (limit = 3): Promise<Artist[]> => queryArtists(limit)
export const getAllArtists = (): Promise<Artist[]> => queryArtists()

export const getLatestBlogPosts = (limit = 3): Promise<BlogPost[]> => queryBlogPosts(limit)
export const getAllBlogPosts = (): Promise<BlogPost[]> => queryBlogPosts()
