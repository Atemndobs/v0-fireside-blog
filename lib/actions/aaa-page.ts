"use server"

import { revalidatePath } from "next/cache"
import * as convex from "@/lib/convex/server"

export interface AAAPageSettingsFormData {
  hero_subtitle: string
  hero_description: string
  power_section_title: string
  power_section_description: string
  curator_title: string
  curator_description: string
  storyteller_title: string
  storyteller_description: string
  connector_title: string
  connector_description: string
  cta_button_text: string
  published: boolean
  publish_at: string | null
  unpublish_at: string | null
}

export interface AAAQuoteFormData {
  quote: string
  author_name: string
  order_rank: number
  active: boolean
}

export interface AAAAuthorFormData {
  slug: string
  name: string
  full_name: string
  role: string
  color_bg: string
  color_text: string
  color_border: string
  color_shadow: string
  bio: string
  profile_image_url: string
  profile_image_alt: string
  order_rank: number
  featured: boolean
}

export interface AuthorFunFactInput {
  id?: string
  fact: string
  order_rank?: number
}

const revalidateAAAPaths = () => {
  revalidatePath("/AAA")
  revalidatePath("/admin/aaa")
  revalidatePath("/admin/aaa/settings")
  revalidatePath("/admin/aaa/quotes")
  revalidatePath("/admin/aaa/authors")
}

export async function getAAAPageSettings() {
  try {
    const data = await convex.getAAAPageSettings()
    if (!data) {
      return { success: false, error: "Settings not found" }
    }

    // Transform to snake_case
    return {
      success: true,
      data: {
        id: data.id,
        hero_subtitle: data.heroSubtitle,
        hero_description: data.heroDescription,
        power_section_title: data.powerSectionTitle,
        power_section_description: data.powerSectionDescription,
        curator_title: data.curatorTitle,
        curator_description: data.curatorDescription,
        storyteller_title: data.storytellerTitle,
        storyteller_description: data.storytellerDescription,
        connector_title: data.connectorTitle,
        connector_description: data.connectorDescription,
        cta_button_text: data.ctaButtonText,
        published: data.published,
        publish_at: data.publishAt ? new Date(data.publishAt).toISOString() : null,
        unpublish_at: data.unpublishAt ? new Date(data.unpublishAt).toISOString() : null,
        updated_at: data.updatedAt,
      },
    }
  } catch (error) {
    console.error("[AAA CMS] Failed to load settings", error)
    return { success: false, error: "Unable to load AAA settings" }
  }
}

export async function updateAAAPageSettings(data: AAAPageSettingsFormData) {
  try {
    await convex.updateAAAPageSettings({
      heroSubtitle: data.hero_subtitle,
      heroDescription: data.hero_description,
      powerSectionTitle: data.power_section_title,
      powerSectionDescription: data.power_section_description,
      curatorTitle: data.curator_title,
      curatorDescription: data.curator_description,
      storytellerTitle: data.storyteller_title,
      storytellerDescription: data.storyteller_description,
      connectorTitle: data.connector_title,
      connectorDescription: data.connector_description,
      ctaButtonText: data.cta_button_text,
      published: data.published,
      publishAt: data.publish_at ? new Date(data.publish_at).getTime() : undefined,
      unpublishAt: data.unpublish_at ? new Date(data.unpublish_at).getTime() : undefined,
    })

    revalidateAAAPaths()
    return { success: true }
  } catch (error) {
    console.error("[AAA CMS] Failed to update settings", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to update" }
  }
}

export async function getAllAAAQuotes() {
  try {
    const data = await convex.getAllAAAQuotes()

    // Transform to snake_case
    const transformedData = data.map((q: any) => ({
      id: q.id,
      quote: q.quote,
      author_name: q.authorName,
      order_rank: q.orderRank,
      active: q.active,
    }))

    return { success: true, data: transformedData }
  } catch (error) {
    console.error("[AAA CMS] Failed to load quotes", error)
    return { success: false, error: "Unable to load quotes", data: [] }
  }
}

export async function getAAAQuoteById(id: string) {
  try {
    const data = await convex.getAAAQuoteById(id)
    if (!data) {
      return { success: false, error: "Quote not found" }
    }

    return {
      success: true,
      data: {
        id: data.id,
        quote: data.quote,
        author_name: data.authorName,
        order_rank: data.orderRank,
        active: data.active,
      },
    }
  } catch (error) {
    console.error("[AAA CMS] Failed to load quote", error)
    return { success: false, error: "Unable to load quote" }
  }
}

export async function createAAAQuote(data: AAAQuoteFormData) {
  try {
    const quoteId = await convex.createAAAQuote({
      quote: data.quote,
      authorName: data.author_name,
      orderRank: data.order_rank,
      active: data.active,
    })

    revalidateAAAPaths()
    return { success: true, data: { id: quoteId } }
  } catch (error) {
    console.error("[AAA CMS] Failed to create quote", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to create" }
  }
}

export async function updateAAAQuote(id: string, data: Partial<AAAQuoteFormData>) {
  try {
    await convex.updateAAAQuote(id, {
      quote: data.quote,
      authorName: data.author_name,
      orderRank: data.order_rank,
      active: data.active,
    })

    revalidateAAAPaths()
    return { success: true, data: { id } }
  } catch (error) {
    console.error("[AAA CMS] Failed to update quote", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to update" }
  }
}

export async function deleteAAAQuote(id: string) {
  try {
    await convex.deleteAAAQuote(id)
    revalidateAAAPaths()
    return { success: true }
  } catch (error) {
    console.error("[AAA CMS] Failed to delete quote", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete" }
  }
}

export async function reorderAAAQuotes(order: { id: string; order_rank: number }[]) {
  if (!order.length) {
    return { success: true }
  }

  try {
    // Update each quote's order rank
    for (const { id, order_rank } of order) {
      await convex.updateAAAQuote(id, { orderRank: order_rank })
    }

    revalidateAAAPaths()
    return { success: true }
  } catch (error) {
    console.error("[AAA CMS] Failed to reorder quotes", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to reorder" }
  }
}

export async function getAllAAAAuthors() {
  try {
    const data = await convex.getAllAAAAuthors()

    // Transform to snake_case
    const transformedData = data.map((author: any) => ({
      id: author.id,
      slug: author.slug,
      name: author.name,
      full_name: author.fullName,
      role: author.role,
      color_bg: author.colorBg,
      color_text: author.colorText,
      color_border: author.colorBorder,
      color_shadow: author.colorShadow,
      bio: author.bio,
      profile_image_url: author.profileImageUrl,
      profile_image_alt: author.profileImageAlt,
      order_rank: author.orderRank,
      featured: author.featured,
    }))

    return { success: true, data: transformedData }
  } catch (error) {
    console.error("[AAA CMS] Failed to load authors", error)
    return { success: false, error: "Unable to load authors", data: [] }
  }
}

export async function getAAAAuthorById(id: string) {
  try {
    const data = await convex.getAAAAuthorById(id)
    if (!data) {
      return { success: false, error: "Author not found" }
    }

    // Transform fun facts
    const funFacts = (data.funFacts || []).map((f: any) => ({
      id: f.id,
      fact: f.fact,
      order_rank: f.orderRank,
    }))

    return {
      success: true,
      data: {
        id: data.id,
        slug: data.slug,
        name: data.name,
        full_name: data.fullName,
        role: data.role,
        color_bg: data.colorBg,
        color_text: data.colorText,
        color_border: data.colorBorder,
        color_shadow: data.colorShadow,
        bio: data.bio,
        profile_image_url: data.profileImageUrl,
        profile_image_alt: data.profileImageAlt,
        order_rank: data.orderRank,
        featured: data.featured,
      },
      funFacts,
    }
  } catch (error) {
    console.error("[AAA CMS] Failed to load author", error)
    return { success: false, error: "Unable to load author" }
  }
}

const filterFunFacts = (facts: AuthorFunFactInput[]) =>
  facts
    .filter((fact) => fact.fact.trim().length > 0)
    .map((fact, index) => ({
      fact: fact.fact.trim(),
      orderRank: fact.order_rank ?? index + 1,
    }))

export async function createAAAAuthor(data: AAAAuthorFormData, funFacts: AuthorFunFactInput[] = []) {
  try {
    const authorId = await convex.createAAAAuthor({
      slug: data.slug,
      name: data.name,
      fullName: data.full_name,
      role: data.role,
      colorBg: data.color_bg,
      colorText: data.color_text,
      colorBorder: data.color_border,
      colorShadow: data.color_shadow,
      bio: data.bio,
      profileImageUrl: data.profile_image_url,
      profileImageAlt: data.profile_image_alt,
      orderRank: data.order_rank,
      featured: data.featured,
    })

    // Save fun facts
    if (funFacts.length > 0) {
      const filtered = filterFunFacts(funFacts)
      if (filtered.length > 0) {
        await convex.replaceAuthorFunFacts(authorId as string, filtered)
      }
    }

    revalidateAAAPaths()
    return { success: true, data: { id: authorId } }
  } catch (error) {
    console.error("[AAA CMS] Failed to create author", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to create" }
  }
}

export async function updateAAAAuthor(id: string, data: Partial<AAAAuthorFormData>, funFacts: AuthorFunFactInput[] = []) {
  try {
    await convex.updateAAAAuthor(id, {
      slug: data.slug,
      name: data.name,
      fullName: data.full_name,
      role: data.role,
      colorBg: data.color_bg,
      colorText: data.color_text,
      colorBorder: data.color_border,
      colorShadow: data.color_shadow,
      bio: data.bio,
      profileImageUrl: data.profile_image_url,
      profileImageAlt: data.profile_image_alt,
      orderRank: data.order_rank,
      featured: data.featured,
    })

    // Replace fun facts
    const filtered = filterFunFacts(funFacts)
    await convex.replaceAuthorFunFacts(id, filtered)

    revalidateAAAPaths()
    return { success: true, data: { id } }
  } catch (error) {
    console.error("[AAA CMS] Failed to update author", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to update" }
  }
}

export async function deleteAAAAuthor(id: string) {
  try {
    await convex.deleteAAAAuthor(id)
    revalidateAAAPaths()
    return { success: true }
  } catch (error) {
    console.error("[AAA CMS] Failed to delete author", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete" }
  }
}

export async function getAuthorFunFacts(authorId: string) {
  try {
    const data = await convex.getAuthorFunFacts(authorId)

    const transformedData = data.map((f: any) => ({
      id: f.id,
      author_id: f.authorId,
      fact: f.fact,
      order_rank: f.orderRank,
    }))

    return { success: true, data: transformedData }
  } catch (error) {
    console.error("[AAA CMS] Failed to load fun facts", error)
    return { success: false, error: "Unable to load fun facts", data: [] }
  }
}

export async function updateAuthorFunFacts(authorId: string, funFacts: AuthorFunFactInput[]) {
  try {
    const filtered = filterFunFacts(funFacts)
    await convex.replaceAuthorFunFacts(authorId, filtered)
    revalidateAAAPaths()
    return { success: true }
  } catch (error) {
    console.error("[AAA CMS] Failed to update fun facts", error)
    return { success: false, error: "Unable to update fun facts" }
  }
}
