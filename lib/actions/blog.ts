"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "@/lib/supabase/server"

type UpdateState = {
  message: string | null
  error: string | null
}

export async function updateBlogPost(prevState: UpdateState, formData: FormData): Promise<UpdateState> {
  const supabase = getSupabaseServerClient()

  const id = formData.get("id")?.toString()
  if (!id) {
    return { message: null, error: "Missing blog post id" }
  }

  const payload = {
    title: formData.get("title")?.toString(),
    slug: formData.get("slug")?.toString(),
    excerpt: formData.get("excerpt")?.toString() ?? null,
    author: formData.get("author")?.toString() ?? null,
    content: formData.get("content")?.toString() ?? null,
    published_at: formData.get("published_at")?.toString() || null,
    featured_image_url: formData.get("featured_image_url")?.toString() ?? null,
    featured_image_alt: formData.get("featured_image_alt")?.toString() ?? null,
    featured: formData.get("featured") === "on",
  }

  const { error } = await supabase.from("fireside_blog_posts").update(payload).eq("id", id)

  if (error) {
    return { message: null, error: error.message }
  }

  revalidatePath("/admin/blog")
  revalidatePath(`/admin/blog/${id}`)
  redirect("/admin/blog")
}
