"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import * as convex from "@/lib/convex/server"

type UpdateState = {
  message: string | null
  error: string | null
}

export async function updateBlogPost(prevState: UpdateState, formData: FormData): Promise<UpdateState> {
  const id = formData.get("id")?.toString()
  if (!id) {
    return { message: null, error: "Missing blog post id" }
  }

  try {
    await convex.updateBlogPost(id, {
      title: formData.get("title")?.toString(),
      slug: formData.get("slug")?.toString(),
      excerpt: formData.get("excerpt")?.toString() ?? undefined,
      author: formData.get("author")?.toString() ?? undefined,
      content: formData.get("content")?.toString() ?? undefined,
      publishedAt: formData.get("published_at")?.toString()
        ? new Date(formData.get("published_at")!.toString()).getTime()
        : undefined,
      featuredImageUrl: formData.get("featured_image_url")?.toString() ?? undefined,
      featuredImageAlt: formData.get("featured_image_alt")?.toString() ?? undefined,
      featured: formData.get("featured") === "on",
      published: formData.get("published") === "on",
    })

    revalidatePath("/admin/blog")
    revalidatePath(`/admin/blog/${id}`)
    revalidatePath("/blog")
    revalidatePath("/")
  } catch (error) {
    return { message: null, error: error instanceof Error ? error.message : "Failed to update" }
  }

  redirect("/admin/blog")
}
