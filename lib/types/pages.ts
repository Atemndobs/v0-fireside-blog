export type AboutPageContent = {
  id: string
  heroTitle: string
  heroTagline: string
  missionTitle: string
  missionImageUrl: string | null
  missionImageAlt: string | null
  missionParagraph1: string
  missionParagraph2: string
  storyTitle: string
  storyParagraph1: string
  storyParagraph2: string
  storyParagraph3: string
  whatWeDoTitle: string
  podcastCardTitle: string
  podcastCardDescription: string
  blogCardTitle: string
  blogCardDescription: string
  artistCardTitle: string
  artistCardDescription: string
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  updatedAt: string | null
  updatedBy: string | null
}

export type AAAQuote = {
  id: string
  quote: string
  authorName: string
  orderRank: number
  active: boolean
}

export type AAAFunFact = {
  id: string
  authorId: string
  fact: string
  orderRank: number
}

export type AAAAuthor = {
  id: string
  slug: string
  name: string
  fullName: string
  role: string
  colorBg: string
  colorText: string
  colorBorder: string
  colorShadow: string
  bio: string
  profileImageUrl: string | null
  profileImageAlt: string | null
  orderRank: number
  featured: boolean
  funFacts: AAAFunFact[]
}

export type AAAPageSettings = {
  id: string
  heroSubtitle: string
  heroDescription: string
  powerSectionTitle: string
  powerSectionDescription: string
  curatorTitle: string
  curatorDescription: string
  storytellerTitle: string
  storytellerDescription: string
  connectorTitle: string
  connectorDescription: string
  ctaButtonText: string
  updatedAt: string | null
}

export type AAAPageData = {
  settings: AAAPageSettings
  quotes: AAAQuote[]
  authors: AAAAuthor[]
}
