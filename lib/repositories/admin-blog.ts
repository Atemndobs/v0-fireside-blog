import * as convex from "@/lib/convex/server"

export type AdminBlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  author: string | null
  content: string | null
  published_at: string | null
  featured_image_url: string | null
  featured_image_alt: string | null
  featured: boolean
  published: boolean
}

export async function fetchAdminBlogPosts(): Promise<AdminBlogPost[]> {
  try {
    const data = await convex.getAllBlogPostsForAdmin()

    return data.map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? null,
      author: post.author ?? null,
      content: null, // Content not returned in list view
      published_at: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
      featured_image_url: post.featuredImageUrl ?? null,
      featured_image_alt: null,
      featured: Boolean(post.featured),
      published: Boolean(post.published),
    }))
  } catch (error) {
    console.warn("[Admin] Failed to load blog posts", error)
    return []
  }
}

export async function fetchAdminBlogPost(id: string): Promise<AdminBlogPost | null> {
  try {
    const data = await convex.getBlogPostById(id)

    if (!data) {
      return null
    }

    return {
      id: data.id as string,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt ?? null,
      author: data.author ?? null,
      content: data.content ?? null,
      published_at: data.publishedAt ? new Date(data.publishedAt).toISOString() : null,
      featured_image_url: data.featuredImageUrl ?? null,
      featured_image_alt: data.featuredImageAlt ?? null,
      featured: Boolean(data.featured),
      published: Boolean(data.published),
    }
  } catch (error) {
    console.warn("[Admin] Failed to load blog post", error)
    return null
  }
}
