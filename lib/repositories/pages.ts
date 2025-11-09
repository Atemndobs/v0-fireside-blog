import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { AAAAuthor, AAAPageData, AAAPageSettings, AAAFunFact, AAAQuote, AboutPageContent } from "@/lib/types/pages"

const ABOUT_PAGE_ID = "00000000-0000-0000-0000-000000000001"
const AAA_PAGE_SETTINGS_ID = "00000000-0000-0000-0000-000000000002"

const aboutFallback: AboutPageContent = {
  id: ABOUT_PAGE_ID,
  heroTitle: "The Fireside Tribe",
  heroTagline: "Celebrating and promoting Cameroonian music and Afrobeats through podcasts, articles, and artist features.",
  missionTitle: "Our Mission",
  missionImageUrl: "/images/tripleateam1.png",
  missionImageAlt: "The Fireside Tribe Podcast",
  missionParagraph1:
    "The Fireside Tribe was created with a singular mission: to showcase the incredible talent and rich musical heritage of Cameroon to the world.",
  missionParagraph2:
    "Through our podcast, blog, and artist features, we aim to create a platform that celebrates Cameroonian artists both at home and in the diaspora, highlighting their contributions to the global music scene.",
  storyTitle: "Our Story",
  storyParagraph1:
    "The Fireside Tribe began as a passion project by a group of Cameroonian music enthusiasts who felt that the country's vibrant music scene deserved more international recognition.",
  storyParagraph2:
    "What started as casual conversations about our favorite artists evolved into a podcast, and eventually into this comprehensive platform dedicated to all things Cameroonian music.",
  storyParagraph3:
    "Today, we're proud to be a growing community of music lovers, artists, producers, and fans united by our appreciation for Cameroon's unique sounds and rhythms.",
  whatWeDoTitle: "What We Do",
  podcastCardTitle: "The Podcast",
  podcastCardDescription:
    "Our flagship podcast features interviews with artists, producers, and industry insiders, deep dives into Cameroonian music history, and discussions about the latest trends.",
  blogCardTitle: "The Blog",
  blogCardDescription:
    "Our blog offers thoughtful articles, artist profiles, and analysis of Cameroonian music's influence on the global scene.",
  artistCardTitle: "Artist Spotlights",
  artistCardDescription:
    "We regularly feature both established and emerging Cameroonian artists, helping to amplify their voices and music.",
  ctaTitle: "Join The Tribe",
  ctaDescription:
    "Whether you're a longtime fan of Cameroonian music or just discovering it, we invite you to join our community and explore the rich sounds and stories we have to share.",
  ctaButtonText: "LISTEN TO OUR PODCAST",
  updatedAt: null,
  updatedBy: null,
}

const aaaFallback = (): AAAPageData => ({
  settings: {
    id: AAA_PAGE_SETTINGS_ID,
    heroSubtitle: "THE VOICES BEHIND THE TRIBE",
    heroDescription: "Three voices, one mission: to amplify Cameroonian music and culture through The Fireside Tribe podcast",
    powerSectionTitle: "THE POWER OF A³",
    powerSectionDescription:
      "When Atem, Atem, and Anyang come together, something magical happens. Their unique perspectives, skills, and passions combine to create a podcast that's more than the sum of its parts.",
    curatorTitle: "THE CURATOR",
    curatorDescription: "Atem A. selects the music and artists that form the backbone of each episode",
    storytellerTitle: "THE STORYTELLER",
    storytellerDescription: "Atem N. crafts the narratives and conversations that bring the music to life",
    connectorTitle: "THE CONNECTOR",
    connectorDescription: "Anyang bridges cultures and opens doors for Cameroonian music globally",
    ctaButtonText: "HEAR THEM IN ACTION",
    updatedAt: null,
  },
  quotes: [
    {
      id: "fallback-1",
      quote:
        "Music is the universal language that connects us all, but Cameroonian music speaks with a unique accent that the world needs to hear.",
      authorName: "Atem A.",
      orderRank: 1,
      active: true,
    },
    {
      id: "fallback-2",
      quote: "Our podcast is a campfire where stories and sounds from Cameroon can warm the hearts of listeners worldwide.",
      authorName: "Atem N.",
      orderRank: 2,
      active: true,
    },
    {
      id: "fallback-3",
      quote: "We don't just talk about music, we translate culture and build bridges between Cameroon and the global stage.",
      authorName: "Anyang",
      orderRank: 3,
      active: true,
    },
  ],
  authors: [
    {
      id: "fallback-atem-keng",
      slug: "atem-keng",
      name: "Atem Keng",
      fullName: "Atem Keng",
      role: "Music Enthusiast & Digital Innovator",
      colorBg: "bg-red-500",
      colorText: "text-red-500",
      colorBorder: "border-red-500",
      colorShadow: "shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]",
      bio: `<p class="mb-4">Atem Keng is the music technology enthusiast of The Fireside Tribe. With a passion for music discovery and curation, he's developed innovative ways to share and promote Cameroonian music through playlists and digital platforms.</p><p class="mb-4">Known for his insights on performance energy and the role of algorithms in music discovery, Atem K. brings a tech-savvy perspective to the podcast. He's particularly interested in how emerging artists can leverage digital platforms to gain exposure.</p><p>"Music discovery is influenced by personal connections and social media. Algorithms play a significant role in curating music preferences. Performance energy is crucial for an artist's success."</p>`,
      profileImageUrl: "/images/atemKeng_about.png",
      profileImageAlt: "Atem Keng portrait",
      orderRank: 1,
      featured: true,
      funFacts: [
        {
          id: "fallback-atem-keng-1",
          authorId: "fallback-atem-keng",
          fact: "Owns a collection of over 500 vinyl records from Cameroonian artists",
          orderRank: 1,
        },
        {
          id: "fallback-atem-keng-2",
          authorId: "fallback-atem-keng",
          fact: "Played drums in a makossa fusion band for 5 years",
          orderRank: 2,
        },
        {
          id: "fallback-atem-keng-3",
          authorId: "fallback-atem-keng",
          fact: "Can identify the region of Cameroon a song comes from within seconds",
          orderRank: 3,
        },
      ],
    },
    {
      id: "fallback-atem-eunice",
      slug: "atem-eunice",
      name: "Atem Eunice",
      fullName: "Atem Eunice",
      role: "Music Curator & Cultural Storyteller",
      colorBg: "bg-blue-600",
      colorText: "text-blue-600",
      colorBorder: "border-blue-600",
      colorShadow: "shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]",
      bio: `<p class="mb-4">Atem Eunice brings a cultural depth to The Fireside Tribe, exploring the connections between identity, food, music, and heritage. She delves into how these elements shape our understanding of ourselves and our communities.</p><p class="mb-4">Her discussions on the meaning of names and the role of food in cultural exchange highlight her interest in the personal stories that connect us. She's passionate about how music empowers African identity and raises self-esteem.</p><p>"Food serves as a powerful connection to cultural identity. Exploring one's cultural roots through names is important. Music plays a crucial role in raising self-esteem among Africans."</p>`,
      profileImageUrl: "/images/atem_e_about.png",
      profileImageAlt: "Atem Eunice portrait",
      orderRank: 2,
      featured: true,
      funFacts: [
        {
          id: "fallback-atem-eunice-1",
          authorId: "fallback-atem-eunice",
          fact: "Conducted over 200 interviews with musicians across Africa",
          orderRank: 1,
        },
        {
          id: "fallback-atem-eunice-2",
          authorId: "fallback-atem-eunice",
          fact: "Produces music documentaries in her spare time",
          orderRank: 2,
        },
        {
          id: "fallback-atem-eunice-3",
          authorId: "fallback-atem-eunice",
          fact: "Once traveled 500 miles to record a disappearing traditional music style",
          orderRank: 3,
        },
      ],
    },
    {
      id: "fallback-anyang",
      slug: "anyang",
      name: "Anyang",
      fullName: "Anyang",
      role: "Social Impact Advocate & Industry Analyst",
      colorBg: "bg-purple-600",
      colorText: "text-purple-600",
      colorBorder: "border-purple-600",
      colorShadow: "shadow-[8px_8px_0px_0px_rgba(147,51,234,1)]",
      bio: `<p class="mb-4">Anyang brings a unique perspective to The Fireside Tribe, focusing on the social impact of music and its role in mental health and rehabilitation. His discussions on projects like Jail Time Records highlight music's power beyond entertainment.</p><p class="mb-4">With keen insights on the music industry's challenges, Anyang analyzes the investment landscape, marketing strategies, and growth opportunities for Cameroonian artists. He emphasizes the importance of environment and public engagement in nurturing talent.</p><p>"You learn a lot from filling interviews. Music can be a form of therapy for prisoners. Creativity thrives even in challenging environments."</p>`,
      profileImageUrl: "/images/anyang_afro_zoom.png",
      profileImageAlt: "Anyang portrait",
      orderRank: 3,
      featured: true,
      funFacts: [
        {
          id: "fallback-anyang-1",
          authorId: "fallback-anyang",
          fact: "Has organized music festivals on three continents",
          orderRank: 1,
        },
        {
          id: "fallback-anyang-2",
          authorId: "fallback-anyang",
          fact: "Speaks five languages fluently",
          orderRank: 2,
        },
        {
          id: "fallback-anyang-3",
          authorId: "fallback-anyang",
          fact: "Helped negotiate international distribution deals for several Cameroonian artists",
          orderRank: 3,
        },
      ],
    },
  ],
})

const mapAboutRow = (row: any): AboutPageContent => ({
  id: row.id ?? ABOUT_PAGE_ID,
  heroTitle: row.hero_title ?? aboutFallback.heroTitle,
  heroTagline: row.hero_tagline ?? aboutFallback.heroTagline,
  missionTitle: row.mission_title ?? aboutFallback.missionTitle,
  missionImageUrl: row.mission_image_url ?? aboutFallback.missionImageUrl,
  missionImageAlt: row.mission_image_alt ?? aboutFallback.missionImageAlt,
  missionParagraph1: row.mission_paragraph_1 ?? aboutFallback.missionParagraph1,
  missionParagraph2: row.mission_paragraph_2 ?? aboutFallback.missionParagraph2,
  storyTitle: row.story_title ?? aboutFallback.storyTitle,
  storyParagraph1: row.story_paragraph_1 ?? aboutFallback.storyParagraph1,
  storyParagraph2: row.story_paragraph_2 ?? aboutFallback.storyParagraph2,
  storyParagraph3: row.story_paragraph_3 ?? aboutFallback.storyParagraph3,
  whatWeDoTitle: row.what_we_do_title ?? aboutFallback.whatWeDoTitle,
  podcastCardTitle: row.podcast_card_title ?? aboutFallback.podcastCardTitle,
  podcastCardDescription: row.podcast_card_description ?? aboutFallback.podcastCardDescription,
  blogCardTitle: row.blog_card_title ?? aboutFallback.blogCardTitle,
  blogCardDescription: row.blog_card_description ?? aboutFallback.blogCardDescription,
  artistCardTitle: row.artist_card_title ?? aboutFallback.artistCardTitle,
  artistCardDescription: row.artist_card_description ?? aboutFallback.artistCardDescription,
  ctaTitle: row.cta_title ?? aboutFallback.ctaTitle,
  ctaDescription: row.cta_description ?? aboutFallback.ctaDescription,
  ctaButtonText: row.cta_button_text ?? aboutFallback.ctaButtonText,
  updatedAt: row.updated_at ?? null,
  updatedBy: row.updated_by ?? null,
})

const mapAAASettings = (row: any): AAAPageSettings => ({
  id: row.id ?? AAA_PAGE_SETTINGS_ID,
  heroSubtitle: row.hero_subtitle ?? "THE VOICES BEHIND THE TRIBE",
  heroDescription:
    row.hero_description ?? "Three voices, one mission: to amplify Cameroonian music and culture through The Fireside Tribe podcast",
  powerSectionTitle: row.power_section_title ?? "THE POWER OF A³",
  powerSectionDescription:
    row.power_section_description ??
    "When Atem, Atem, and Anyang come together, something magical happens. Their unique perspectives create something greater than the sum of its parts.",
  curatorTitle: row.curator_title ?? "THE CURATOR",
  curatorDescription:
    row.curator_description ?? "Atem A. selects the music and artists that form the backbone of each episode",
  storytellerTitle: row.storyteller_title ?? "THE STORYTELLER",
  storytellerDescription:
    row.storyteller_description ?? "Atem N. crafts the narratives and conversations that bring the music to life",
  connectorTitle: row.connector_title ?? "THE CONNECTOR",
  connectorDescription:
    row.connector_description ?? "Anyang bridges cultures and opens doors for Cameroonian music globally",
  ctaButtonText: row.cta_button_text ?? "HEAR THEM IN ACTION",
  updatedAt: row.updated_at ?? null,
})

const mapAAAQuote = (row: any): AAAQuote => ({
  id: row.id,
  quote: row.quote,
  authorName: row.author_name,
  orderRank: row.order_rank ?? 0,
  active: Boolean(row.active ?? true),
})

const mapAAAFunFact = (row: any): AAAFunFact => ({
  id: row.id,
  authorId: row.author_id,
  fact: row.fact,
  orderRank: row.order_rank ?? 0,
})

const mapAAAAuthor = (row: any, facts: AAAFunFact[]): AAAAuthor => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  fullName: row.full_name,
  role: row.role,
  colorBg: row.color_bg ?? "bg-red-500",
  colorText: row.color_text ?? "text-red-500",
  colorBorder: row.color_border ?? "border-red-500",
  colorShadow: row.color_shadow ?? "shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]",
  bio: row.bio ?? "",
  profileImageUrl: row.profile_image_url ?? null,
  profileImageAlt: row.profile_image_alt ?? null,
  orderRank: row.order_rank ?? 0,
  featured: Boolean(row.featured ?? true),
  funFacts: facts.filter((fact) => fact.authorId === row.id).sort((a, b) => a.orderRank - b.orderRank),
})

export async function fetchAboutPageContent(): Promise<AboutPageContent> {
  try {
    const supabase = getSupabaseServerClient()

    const { data, error } = await supabase.from("fireside_about_page").select("*").eq("id", ABOUT_PAGE_ID).single()

    if (error || !data) {
      console.warn("[Supabase] Failed to load about page content", error)
      return aboutFallback
    }

    return mapAboutRow(data)
  } catch (error) {
    console.warn("[Supabase] Unexpected error loading about page content", error)
    return aboutFallback
  }
}

export async function fetchAAAPageData(): Promise<AAAPageData> {
  try {
    const supabase = getSupabaseServerClient()

    const [settingsResult, quotesResult, authorsResult] = await Promise.all([
      supabase.from("fireside_aaa_page_settings").select("*").eq("id", AAA_PAGE_SETTINGS_ID).single(),
      supabase.from("fireside_aaa_quotes").select("*").eq("active", true).order("order_rank", { ascending: true }),
      supabase.from("fireside_aaa_authors").select("*").eq("featured", true).order("order_rank", { ascending: true }),
    ])

    const settings = settingsResult.data ? mapAAASettings(settingsResult.data) : aaaFallback().settings
    const quotes = (quotesResult.data ?? []).map(mapAAAQuote)
    const authors = authorsResult.data ?? []

    const authorIds = authors.map((author) => author.id)

    let funFacts: AAAFunFact[] = []
    if (authorIds.length > 0) {
      const { data: factsData, error: factsError } = await supabase
        .from("fireside_aaa_fun_facts")
        .select("*")
        .in("author_id", authorIds)
        .order("order_rank", { ascending: true })

      if (factsError) {
        console.warn("[Supabase] Failed to load AAA fun facts", factsError)
      } else {
        funFacts = (factsData ?? []).map(mapAAAFunFact)
      }
    }

    const mappedAuthors = authors.map((author) => mapAAAAuthor(author, funFacts))

    return {
      settings,
      quotes: quotes.length > 0 ? quotes : aaaFallback().quotes,
      authors: mappedAuthors.length > 0 ? mappedAuthors : aaaFallback().authors,
    }
  } catch (error) {
    console.warn("[Supabase] Unexpected error loading AAA page content", error)
    return aaaFallback()
  }
}
