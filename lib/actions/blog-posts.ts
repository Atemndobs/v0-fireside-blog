"use server"

import { revalidatePath } from "next/cache"
import * as convex from "@/lib/convex/server"

export interface BlogPostFormData {
  title: string
  slug: string
  excerpt: string
  author: string
  published_at: string
  featured_image_url: string
  featured_image_alt: string
  featured: boolean
  published?: boolean
}

export async function createBlogPost(data: BlogPostFormData) {
  try {
    const postId = await convex.createBlogPost({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      author: data.author,
      publishedAt: new Date(data.published_at).getTime(),
      featuredImageUrl: data.featured_image_url,
      featuredImageAlt: data.featured_image_alt,
      featured: data.featured,
      published: data.published ?? true,
    })

    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    revalidatePath("/")

    return { success: true, data: { id: postId } }
  } catch (error) {
    console.error("Error creating blog post:", error)
    return { success: false, error: "Failed to create blog post" }
  }
}

export async function updateBlogPost(id: string, data: Partial<BlogPostFormData>) {
  try {
    await convex.updateBlogPost(id, {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      author: data.author,
      publishedAt: data.published_at ? new Date(data.published_at).getTime() : undefined,
      featuredImageUrl: data.featured_image_url,
      featuredImageAlt: data.featured_image_alt,
      featured: data.featured,
      published: data.published,
    })

    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    revalidatePath("/")

    return { success: true, data: { id } }
  } catch (error) {
    console.error("Error updating blog post:", error)
    return { success: false, error: "Failed to update blog post" }
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await convex.deleteBlogPost(id)

    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return { success: false, error: "Failed to delete blog post" }
  }
}

export async function getBlogPostById(id: string) {
  try {
    const data = await convex.getBlogPostById(id)

    if (!data) {
      return { success: false, error: "Blog post not found" }
    }

    // Transform to snake_case for backwards compatibility
    return {
      success: true,
      data: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        author: data.author,
        published_at: data.publishedAt ? new Date(data.publishedAt).toISOString() : null,
        featured_image_url: data.featuredImageUrl,
        featured_image_alt: data.featuredImageAlt,
        content: data.content,
        seo: data.seo,
        featured: data.featured,
        published: data.published,
        reading_time_minutes: data.readingTimeMinutes,
      },
    }
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return { success: false, error: "Failed to fetch blog post" }
  }
}

export async function getAllBlogPostsForAdmin() {
  try {
    const data = await convex.getAllBlogPostsForAdmin()

    // Transform to snake_case for backwards compatibility
    const transformedData = data.map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      author: post.author,
      published_at: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
      featured_image_url: post.featuredImageUrl,
      featured: post.featured,
      published: post.published,
    }))

    return { success: true, data: transformedData }
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return { success: false, error: "Failed to fetch blog posts", data: [] }
  }
}
