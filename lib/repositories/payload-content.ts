/**
 * Payload CMS Content Repository
 * Replaces the Convex-based data fetching for public content.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

// ---------------------------------------------------------------------------
// Types (matching what the frontend pages expect)
// ---------------------------------------------------------------------------

export interface Episode {
    id: string
    title: string
    slug: string
    description: string | null
    publishedAt: string | null
    coverImageUrl: string | null
    spotifyUrl: string | null
    youtubeUrl: string | null
    youtubeId?: string | null
    spotifyId?: string | null
    durationSeconds?: number | null
    featured: boolean
}

export interface Artist {
    id: string
    name: string
    slug: string
    shortDescription: string | null
    profileImageUrl: string | null
    countryCode: string | null
    orderRank: number
    featured: boolean
}

export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string | null
    author: string | null
    publishedAt: string | null
    featuredImageUrl: string | null
    featured: boolean
    published: boolean
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mapEpisode(doc: any): Episode {
    return {
        id: String(doc.id),
        title: doc.title ?? '',
        slug: doc.slug ?? '',
        description: doc.description ?? null,
        publishedAt: doc.publishedAt ?? null,
        coverImageUrl: doc.coverImageUrl ?? null,
        spotifyUrl: doc.spotifyUrl ?? null,
        youtubeUrl: doc.youtubeUrl ?? null,
        youtubeId: doc.youtubeId ?? null,
        spotifyId: doc.spotifyId ?? null,
        durationSeconds: doc.durationSeconds ?? null,
        featured: Boolean(doc.featured),
    }
}

function mapArtist(doc: any): Artist {
    return {
        id: String(doc.id),
        name: doc.name ?? '',
        slug: doc.slug ?? '',
        shortDescription: doc.shortDescription ?? null,
        profileImageUrl: doc.profileImageUrl ?? null,
        countryCode: doc.countryCode ?? null,
        orderRank: doc.orderRank ?? 0,
        featured: Boolean(doc.featured),
    }
}

function mapBlogPost(doc: any): BlogPost {
    return {
        id: String(doc.id),
        title: doc.title ?? '',
        slug: doc.slug ?? '',
        excerpt: doc.excerpt ?? null,
        author: doc.author ?? null,
        publishedAt: doc.publishedAt ?? null,
        featuredImageUrl: doc.featuredImageUrl ?? null,
        featured: Boolean(doc.featured),
        published: Boolean(doc.published),
    }
}

// ---------------------------------------------------------------------------
// Episodes
// ---------------------------------------------------------------------------

export async function getFeaturedEpisodes(limit = 2): Promise<Episode[]> {
    try {
        const payload = await getPayload({ config })
        const result = await payload.find({
            collection: 'episodes',
            limit,
            where: { featured: { equals: true } },
            sort: '-publishedAt',
        })
        return result.docs.map(mapEpisode)
    } catch (e) {
        console.error('[Payload] getFeaturedEpisodes error:', e)
        return []
    }
}

export async function getLatestEpisodes(limit = 2): Promise<Episode[]> {
    try {
        const payload = await getPayload({ config })
        const result = await payload.find({
            collection: 'episodes',
            limit,
            sort: '-publishedAt',
        })
        return result.docs.map(mapEpisode)
    } catch (e) {
        console.error('[Payload] getLatestEpisodes error:', e)
        return []
    }
}

export async function getAllEpisodes(): Promise<Episode[]> {
    try {
        const payload = await getPayload({ config })
        const result = await payload.find({
            collection: 'episodes',
            limit: 100,
            sort: '-publishedAt',
        })
        return result.docs.map(mapEpisode)
    } catch (e) {
        console.error('[Payload] getAllEpisodes error:', e)
        return []
    }
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
    try {
        const payload = await getPayload({ config })
        const result = await payload.find({
            collection: 'episodes',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        if (result.docs.length === 0) return null
        return mapEpisode(result.docs[0])
    } catch (e) {
        console.error('[Payload] getEpisodeBySlug error:', e)
        return null
    }
}

// ---------------------------------------------------------------------------
// Artists
// ---------------------------------------------------------------------------

export async function getFeaturedArtists(limit = 3): Promise<Artist[]> {
    try {
        const payload = await getPayload({ config })
        const result = await payload.find({
            collection: 'artists',
            limit,
            where: { featured: { equals: true } },
            sort: '-orderRank',
        })
        return result.docs.map(mapArtist)
    } catch (e) {
        console.error('[Payload] getFeaturedArtists error:', e)
        return []
    }
}

export async function getAllArtists(): Promise<Artist[]> {
    try {
        const payload = await getPayload({ config })
        const result = await payload.find({
            collection: 'artists',
            limit: 100,
            sort: '-orderRank',
        })
        return result.docs.map(mapArtist)
    } catch (e) {
        console.error('[Payload] getAllArtists error:', e)
        return []
    }
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
    try {
        const payload = await getPayload({ config })
        const result = await payload.find({
            collection: 'artists',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        if (result.docs.length === 0) return null
        return mapArtist(result.docs[0])
    } catch (e) {
        console.error('[Payload] getArtistBySlug error:', e)
        return null
    }
}

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

export async function getLatestBlogPosts(limit = 3): Promise<BlogPost[]> {
    try {
        const payload = await getPayload({ config })
        const result = await payload.find({
            collection: 'posts',
            limit,
            where: { published: { equals: true } },
            sort: '-publishedAt',
        })
        return result.docs.map(mapBlogPost)
    } catch (e) {
        console.error('[Payload] getLatestBlogPosts error:', e)
        return []
    }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    try {
        const payload = await getPayload({ config })
        const result = await payload.find({
            collection: 'posts',
            limit: 100,
            where: { published: { equals: true } },
            sort: '-publishedAt',
        })
        return result.docs.map(mapBlogPost)
    } catch (e) {
        console.error('[Payload] getAllBlogPosts error:', e)
        return []
    }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const payload = await getPayload({ config })
        const result = await payload.find({
            collection: 'posts',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        if (result.docs.length === 0) return null
        return mapBlogPost(result.docs[0])
    } catch (e) {
        console.error('[Payload] getBlogPostBySlug error:', e)
        return null
    }
}

// ---------------------------------------------------------------------------
// Admin helpers (for admin-blog.ts)
// ---------------------------------------------------------------------------

export async function getAllBlogPostsForAdmin(): Promise<BlogPost[]> {
    try {
        const payload = await getPayload({ config })
        const result = await payload.find({
            collection: 'posts',
            limit: 200,
            sort: '-publishedAt',
        })
        return result.docs.map(mapBlogPost)
    } catch (e) {
        console.error('[Payload] getAllBlogPostsForAdmin error:', e)
        return []
    }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
    try {
        const payload = await getPayload({ config })
        const doc = await payload.findByID({ collection: 'posts', id: Number(id) })
        if (!doc) return null
        return mapBlogPost(doc)
    } catch (e) {
        console.error('[Payload] getBlogPostById error:', e)
        return null
    }
}
