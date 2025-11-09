"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export interface BlogPostFormData {
  title: string
  slug: string
  excerpt: string
  author: string
  published_at: string
  featured_image_url: string
  featured_image_alt: string
  featured: boolean
}

export async function createBlogPost(data: BlogPostFormData) {
  try {
    const supabase = getSupabaseServerClient()

    const { data: post, error } = await supabase.from("fireside_blog_posts").insert([data]).select().single()

    if (error) {
      console.error("Error creating blog post:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    revalidatePath("/")

    return { success: true, data: post }
  } catch (error) {
    console.error("Error creating blog post:", error)
    return { success: false, error: "Failed to create blog post" }
  }
}

export async function updateBlogPost(id: string, data: Partial<BlogPostFormData>) {
  try {
    const supabase = getSupabaseServerClient()

    const { data: post, error } = await supabase
      .from("fireside_blog_posts")
      .update(data)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating blog post:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/admin/blog")
    revalidatePath("/blog")
    revalidatePath("/")

    return { success: true, data: post }
  } catch (error) {
    console.error("Error updating blog post:", error)
    return { success: false, error: "Failed to update blog post" }
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const supabase = getSupabaseServerClient()

    const { error } = await supabase.from("fireside_blog_posts").delete().eq("id", id)

    if (error) {
      console.error("Error deleting blog post:", error)
      return { success: false, error: error.message }
    }

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
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase.from("fireside_blog_posts").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching blog post:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return { success: false, error: "Failed to fetch blog post" }
  }
}

export async function getAllBlogPostsForAdmin() {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase
      .from("fireside_blog_posts")
      .select("*")
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Error fetching blog posts:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, data: data ?? [] }
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return { success: false, error: "Failed to fetch blog posts", data: [] }
  }
}
