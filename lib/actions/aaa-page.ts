"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "@/lib/supabase/server"

const AAA_SETTINGS_ID = "00000000-0000-0000-0000-000000000002"

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
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase.from("fireside_aaa_page_settings").select("*").eq("id", AAA_SETTINGS_ID).single()
    if (error) {
      throw error
    }
    return { success: true, data }
  } catch (error) {
    console.error("[AAA CMS] Failed to load settings", error)
    return { success: false, error: "Unable to load AAA settings" }
  }
}

export async function updateAAAPageSettings(data: AAAPageSettingsFormData) {
  const supabase = getSupabaseServerClient()

  const { error, data: payload } = await supabase
    .from("fireside_aaa_page_settings")
    .upsert({ id: AAA_SETTINGS_ID, ...data, updated_at: new Date().toISOString() }, { onConflict: "id" })
    .select()
    .single()

  if (error) {
    console.error("[AAA CMS] Failed to update settings", error)
    return { success: false, error: error.message }
  }

  revalidateAAAPaths()
  return { success: true, data: payload }
}

export async function getAllAAAQuotes() {
  try {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from("fireside_aaa_quotes")
      .select("*")
      .order("order_rank", { ascending: true })

    if (error) {
      throw error
    }

    return { success: true, data: data ?? [] }
  } catch (error) {
    console.error("[AAA CMS] Failed to load quotes", error)
    return { success: false, error: "Unable to load quotes", data: [] }
  }
}

export async function getAAAQuoteById(id: string) {
  try {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase.from("fireside_aaa_quotes").select("*").eq("id", id).single()
    if (error) {
      throw error
    }
    return { success: true, data }
  } catch (error) {
    console.error("[AAA CMS] Failed to load quote", error)
    return { success: false, error: "Unable to load quote" }
  }
}

export async function createAAAQuote(data: AAAQuoteFormData) {
  const supabase = getSupabaseServerClient()

  const { data: record, error } = await supabase.from("fireside_aaa_quotes").insert([data]).select().single()

  if (error) {
    console.error("[AAA CMS] Failed to create quote", error)
    return { success: false, error: error.message }
  }

  revalidateAAAPaths()
  return { success: true, data: record }
}

export async function updateAAAQuote(id: string, data: Partial<AAAQuoteFormData>) {
  const supabase = getSupabaseServerClient()

  const { data: record, error } = await supabase.from("fireside_aaa_quotes").update(data).eq("id", id).select().single()

  if (error) {
    console.error("[AAA CMS] Failed to update quote", error)
    return { success: false, error: error.message }
  }

  revalidateAAAPaths()
  return { success: true, data: record }
}

export async function deleteAAAQuote(id: string) {
  const supabase = getSupabaseServerClient()

  const { error } = await supabase.from("fireside_aaa_quotes").delete().eq("id", id)

  if (error) {
    console.error("[AAA CMS] Failed to delete quote", error)
    return { success: false, error: error.message }
  }

  revalidateAAAPaths()
  return { success: true }
}

export async function reorderAAAQuotes(order: { id: string; order_rank: number }[]) {
  if (!order.length) {
    return { success: true }
  }

  const supabase = getSupabaseServerClient()

  const updates = order.map(({ id, order_rank }) =>
    supabase.from("fireside_aaa_quotes").update({ order_rank }).eq("id", id),
  )

  const results = await Promise.all(updates)
  const failure = results.find((result) => result.error)

  if (failure?.error) {
    console.error("[AAA CMS] Failed to reorder quotes", failure.error)
    return { success: false, error: failure.error.message }
  }

  revalidateAAAPaths()
  return { success: true }
}

export async function getAllAAAAuthors() {
  try {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from("fireside_aaa_authors")
      .select("*")
      .order("order_rank", { ascending: true })

    if (error) {
      throw error
    }

    return { success: true, data: data ?? [] }
  } catch (error) {
    console.error("[AAA CMS] Failed to load authors", error)
    return { success: false, error: "Unable to load authors", data: [] }
  }
}

export async function getAAAAuthorById(id: string) {
  try {
    const supabase = getSupabaseServerClient()
    const [{ data, error }, { data: facts, error: factsError }] = await Promise.all([
      supabase.from("fireside_aaa_authors").select("*").eq("id", id).single(),
      supabase
        .from("fireside_aaa_fun_facts")
        .select("*")
        .eq("author_id", id)
        .order("order_rank", { ascending: true }),
    ])

    if (error) {
      throw error
    }

    if (factsError) {
      throw factsError
    }

    return { success: true, data, funFacts: facts ?? [] }
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
      order_rank: fact.order_rank ?? index + 1,
    }))

async function replaceFunFacts(authorId: string, facts: AuthorFunFactInput[]) {
  const supabase = getSupabaseServerClient()

  const filtered = filterFunFacts(facts)

  const { error: deleteError } = await supabase.from("fireside_aaa_fun_facts").delete().eq("author_id", authorId)
  if (deleteError) {
    throw deleteError
  }

  if (filtered.length === 0) {
    return
  }

  const records = filtered.map((fact, index) => ({
    author_id: authorId,
    fact: fact.fact,
    order_rank: fact.order_rank ?? index + 1,
  }))

  const { error: insertError } = await supabase.from("fireside_aaa_fun_facts").insert(records)
  if (insertError) {
    throw insertError
  }
}

export async function createAAAAuthor(data: AAAAuthorFormData, funFacts: AuthorFunFactInput[] = []) {
  const supabase = getSupabaseServerClient()

  const { data: record, error } = await supabase.from("fireside_aaa_authors").insert([data]).select().single()

  if (error) {
    console.error("[AAA CMS] Failed to create author", error)
    return { success: false, error: error.message }
  }

  try {
    await replaceFunFacts(record.id, funFacts)
  } catch (funFactsError) {
    console.error("[AAA CMS] Failed to save fun facts", funFactsError)
    return { success: false, error: "Saved author, but failed to save fun facts." }
  }

  revalidateAAAPaths()
  return { success: true, data: record }
}

export async function updateAAAAuthor(id: string, data: Partial<AAAAuthorFormData>, funFacts: AuthorFunFactInput[] = []) {
  const supabase = getSupabaseServerClient()

  const { data: record, error } = await supabase.from("fireside_aaa_authors").update(data).eq("id", id).select().single()

  if (error) {
    console.error("[AAA CMS] Failed to update author", error)
    return { success: false, error: error.message }
  }

  try {
    await replaceFunFacts(id, funFacts)
  } catch (funFactsError) {
    console.error("[AAA CMS] Failed to save fun facts", funFactsError)
    return { success: false, error: "Updated author, but failed to save fun facts." }
  }

  revalidateAAAPaths()
  return { success: true, data: record }
}

export async function deleteAAAAuthor(id: string) {
  const supabase = getSupabaseServerClient()

  const { error } = await supabase.from("fireside_aaa_authors").delete().eq("id", id)

  if (error) {
    console.error("[AAA CMS] Failed to delete author", error)
    return { success: false, error: error.message }
  }

  revalidateAAAPaths()
  return { success: true }
}

export async function getAuthorFunFacts(authorId: string) {
  try {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from("fireside_aaa_fun_facts")
      .select("*")
      .eq("author_id", authorId)
      .order("order_rank", { ascending: true })

    if (error) {
      throw error
    }

    return { success: true, data: data ?? [] }
  } catch (error) {
    console.error("[AAA CMS] Failed to load fun facts", error)
    return { success: false, error: "Unable to load fun facts", data: [] }
  }
}

export async function updateAuthorFunFacts(authorId: string, funFacts: AuthorFunFactInput[]) {
  try {
    await replaceFunFacts(authorId, funFacts)
    revalidateAAAPaths()
    return { success: true }
  } catch (error) {
    console.error("[AAA CMS] Failed to update fun facts", error)
    return { success: false, error: "Unable to update fun facts" }
  }
}
