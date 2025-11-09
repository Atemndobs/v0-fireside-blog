import { getSupabaseServerClient } from "@/lib/supabase/server"

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
}

export async function fetchAdminBlogPosts(): Promise<AdminBlogPost[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from("fireside_blog_posts")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        author,
        content,
        published_at,
        featured_image_url,
        featured_image_alt,
        featured
      `,
    )
    .order("published_at", { ascending: false })

  if (error || !data) {
    console.warn("[Admin] Failed to load blog posts", error)
    return []
  }

  return data as AdminBlogPost[]
}

export async function fetchAdminBlogPost(id: string): Promise<AdminBlogPost | null> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from("fireside_blog_posts")
    .select(
      `
        id,
        title,
        slug,
        excerpt,
        author,
        content,
        published_at,
        featured_image_url,
        featured_image_alt,
        featured
      `,
    )
    .eq("id", id)
    .single()

  if (error || !data) {
    console.warn("[Admin] Failed to load blog post", error)
    return null
  }

  return data as AdminBlogPost
}
