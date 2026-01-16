"use server"

import { revalidatePath } from "next/cache"
import * as convex from "@/lib/convex/server"

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
    const data = await convex.fetchAboutPageContent()

    // Transform to snake_case for backwards compatibility
    return {
      success: true,
      data: {
        id: data.id,
        hero_title: data.heroTitle,
        hero_tagline: data.heroTagline,
        mission_title: data.missionTitle,
        mission_image_url: data.missionImageUrl,
        mission_image_alt: data.missionImageAlt,
        mission_paragraph_1: data.missionParagraph1,
        mission_paragraph_2: data.missionParagraph2,
        story_title: data.storyTitle,
        story_paragraph_1: data.storyParagraph1,
        story_paragraph_2: data.storyParagraph2,
        story_paragraph_3: data.storyParagraph3,
        what_we_do_title: data.whatWeDoTitle,
        podcast_card_title: data.podcastCardTitle,
        podcast_card_description: data.podcastCardDescription,
        blog_card_title: data.blogCardTitle,
        blog_card_description: data.blogCardDescription,
        artist_card_title: data.artistCardTitle,
        artist_card_description: data.artistCardDescription,
        cta_title: data.ctaTitle,
        cta_description: data.ctaDescription,
        cta_button_text: data.ctaButtonText,
        updated_at: data.updatedAt,
        updated_by: data.updatedBy,
      },
    }
  } catch (error) {
    console.error("[About CMS] Failed to load about page content", error)
    return { success: false, error: "Unable to load about page content" }
  }
}

export async function updateAboutPage(formData: AboutPageFormData) {
  try {
    await convex.updateAboutPage({
      heroTitle: formData.hero_title,
      heroTagline: formData.hero_tagline,
      missionTitle: formData.mission_title,
      missionImageUrl: formData.mission_image_url,
      missionImageAlt: formData.mission_image_alt,
      missionParagraph1: formData.mission_paragraph_1,
      missionParagraph2: formData.mission_paragraph_2,
      storyTitle: formData.story_title,
      storyParagraph1: formData.story_paragraph_1,
      storyParagraph2: formData.story_paragraph_2,
      storyParagraph3: formData.story_paragraph_3,
      whatWeDoTitle: formData.what_we_do_title,
      podcastCardTitle: formData.podcast_card_title,
      podcastCardDescription: formData.podcast_card_description,
      blogCardTitle: formData.blog_card_title,
      blogCardDescription: formData.blog_card_description,
      artistCardTitle: formData.artist_card_title,
      artistCardDescription: formData.artist_card_description,
      ctaTitle: formData.cta_title,
      ctaDescription: formData.cta_description,
      ctaButtonText: formData.cta_button_text,
      updatedBy: formData.updated_by ?? undefined,
    })

    revalidatePath("/about")
    revalidatePath("/admin/about")

    return { success: true }
  } catch (error) {
    console.error("[About CMS] Failed to update about page content", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to update" }
  }
}
