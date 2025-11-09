export interface Episode {
  id: string
  title: string
  slug: string
  description: string | null
  publishedAt: string | null
  coverImageUrl: string | null
  spotifyUrl: string | null
  youtubeUrl: string | null
  featured: boolean
}

export interface Artist {
  id: string
  name: string
  slug: string
  shortDescription: string | null
  profileImageUrl: string | null
  orderRank: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  author: string | null
  publishedAt: string | null
  featuredImageUrl: string | null
  featured: boolean
}
