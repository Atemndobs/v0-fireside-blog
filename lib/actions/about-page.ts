"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { fetchAboutPageContent } from "@/lib/repositories/pages"

const ABOUT_PAGE_ID = "00000000-0000-0000-0000-000000000001"

export interface AboutPageFormData {
  hero_title: string
  hero_tagline: string
  mission_title: string
  mission_image_url: string
  mission_image_alt: string
  mission_paragraph_1: string
  mission_paragraph_2: string
  story_title: string
  story_paragraph_1: string
  story_paragraph_2: string
  story_paragraph_3: string
  what_we_do_title: string
  podcast_card_title: string
  podcast_card_description: string
  blog_card_title: string
  blog_card_description: string
  artist_card_title: string
  artist_card_description: string
  cta_title: string
  cta_description: string
  cta_button_text: string
  updated_by?: string | null
}

export async function getAboutPageContent() {
  try {
    const data = await fetchAboutPageContent()
    return { success: true, data }
  } catch (error) {
    console.error("[About CMS] Failed to load about page content", error)
    return { success: false, error: "Unable to load about page content" }
  }
}

export async function updateAboutPage(formData: AboutPageFormData) {
  const supabase = getSupabaseServerClient()

  const payload = {
    ...formData,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from("fireside_about_page")
    .upsert({ id: ABOUT_PAGE_ID, ...payload }, { onConflict: "id" })
    .select()
    .single()

  if (error) {
    console.error("[About CMS] Failed to update about page content", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/about")
  revalidatePath("/admin/about")

  return { success: true, data }
}
