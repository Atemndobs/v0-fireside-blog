# Fireside Tribe: Technical Architecture & Implementation Guide

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Data Models](#data-models)
4. [API Integration Patterns](#api-integration-patterns)
5. [Automation Workflows](#automation-workflows)
6. [Security Considerations](#security-considerations)
7. [Performance Optimization](#performance-optimization)
8. [Deployment Strategy](#deployment-strategy)

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FIRESIDE TRIBE SYSTEM                        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │           Next.js 15 Application (Vercel)                     │  │
│  │                                                                │  │
│  │  • App Router                                                  │  │
│  │  • React Server Components                                     │  │
│  │  • Static Site Generation (SSG)                               │  │
│  │  • Incremental Static Regeneration (ISR)                      │  │
│  │  • Server Actions                                             │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                                 ↕
                    ┌────────────────────────┐
                    │   Vercel Edge Network  │
                    │   (Global CDN)         │
                    └────────────────────────┘
                                 ↕
┌─────────────────────────────────────────────────────────────────────┐
│                        CONTENT LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Sanity CMS                                 │  │
│  │                                                                │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │  │
│  │  │   Content    │  │    Media     │  │   Sanity Studio  │   │  │
│  │  │     Lake     │  │   Pipeline   │  │   (Editor UI)    │   │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘   │  │
│  │                                                                │  │
│  │  • GROQ API (Content queries)                                 │  │
│  │  • Image CDN (Optimized delivery)                             │  │
│  │  • Webhooks (Build triggers)                                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                                 ↕
┌─────────────────────────────────────────────────────────────────────┐
│                       INTEGRATION LAYER                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │           Vercel Serverless Functions                         │  │
│  │                                                                │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │  │
│  │  │  YouTube Sync   │  │  Spotify Sync   │  │   Webhooks   │ │  │
│  │  │  /api/youtube   │  │  /api/spotify   │  │  /api/hooks  │ │  │
│  │  └─────────────────┘  └─────────────────┘  └──────────────┘ │  │
│  │                                                                │  │
│  │  • Scheduled with Vercel Cron                                 │  │
│  │  • Error handling & retry logic                               │  │
│  │  • Rate limiting                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                                 ↕
┌─────────────────────────────────────────────────────────────────────┐
│                       EXTERNAL SERVICES                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│  │  YouTube Data    │  │   Spotify Web    │  │     Vercel       │ │
│  │      API         │  │      API         │  │   Deployment     │ │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘ │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **Framework**: Next.js 15.2.4
- **React**: 19
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI (accessible primitives)
- **Animations**: Framer Motion 12.9.2
- **Theme**: next-themes 0.4.4

### Content Management
- **CMS**: Sanity.io
- **Query Language**: GROQ
- **Real-time**: Sanity Content Lake with live updates
- **Media**: Sanity Image Pipeline with CDN

### Backend/API
- **Runtime**: Vercel Serverless Functions (Node.js)
- **API Routes**: Next.js API Routes (App Router)
- **Cron Jobs**: Vercel Cron
- **Environment**: Vercel Edge Network

### External APIs
- **YouTube**: YouTube Data API v3
- **Spotify**: Spotify Web API
- **Images**: Sanity CDN

### Development
- **Language**: TypeScript 5
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git

---

## Data Models

### 1. Episode Model

```typescript
// Sanity Schema: schemas/episode.ts
import { defineType, defineField } from 'sanity'

export const episode = defineType({
  name: 'episode',
  title: 'Podcast Episode',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Episode Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.max(500)
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['lqip', 'palette']
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: Rule => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify Episode URL',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['https']
      })
    }),
    defineField({
      name: 'spotifyId',
      title: 'Spotify Episode ID',
      type: 'string',
      description: 'Extracted from Spotify URL'
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['https']
      })
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Extracted from YouTube URL'
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      description: 'Episode duration in seconds'
    }),
    defineField({
      name: 'showNotes',
      title: 'Show Notes',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true }
        }
      ]
    }),
    defineField({
      name: 'guests',
      title: 'Guest Artists',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'artist' }]
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'autoSynced',
      title: 'Auto-Synced',
      type: 'boolean',
      initialValue: false,
      description: 'Was this episode automatically synced from external API?',
      readOnly: true
    }),
    defineField({
      name: 'lastSyncedAt',
      title: 'Last Synced',
      type: 'datetime',
      readOnly: true,
      description: 'Last time this episode was synced'
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160)
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'coverImage'
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: new Date(subtitle).toLocaleDateString(),
        media
      }
    }
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }]
    }
  ]
})
```

### 2. Artist Model

```typescript
// schemas/artist.ts
import { defineType, defineField } from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(150).required(),
      description: 'Used in artist cards'
    }),
    defineField({
      name: 'bio',
      title: 'Full Biography',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['lqip', 'palette']
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'spotify', title: 'Spotify', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'website', title: 'Website', type: 'url' }
      ]
    }),
    defineField({
      name: 'genre',
      title: 'Primary Genre',
      type: 'string',
      options: {
        list: [
          { title: 'Afrobeats', value: 'afrobeats' },
          { title: 'R&B', value: 'rnb' },
          { title: 'Hip-Hop', value: 'hiphop' },
          { title: 'Bikutsi', value: 'bikutsi' },
          { title: 'Makossa', value: 'makossa' },
          { title: 'Electronic', value: 'electronic' },
          { title: 'Pop', value: 'pop' }
        ]
      }
    }),
    defineField({
      name: 'featuredTracks',
      title: 'Featured Tracks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Track Title' },
            { name: 'url', type: 'url', title: 'Track URL' },
            { name: 'platform', type: 'string', title: 'Platform',
              options: {
                list: ['Spotify', 'YouTube', 'SoundCloud', 'Apple Music']
              }
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'platform'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'genre',
      media: 'profileImage'
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }]
    }
  ]
})
```

### 3. Blog Post Model

```typescript
// schemas/blogPost.ts
import { defineType, defineField } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(200).required(),
      description: 'Used in blog post cards and meta description'
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['lqip', 'palette']
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'The Fireside Tribe'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: Rule => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text'
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }]
    }),
    defineField({
      name: 'relatedArtists',
      title: 'Related Artists',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
      description: 'Artists mentioned or featured in this post'
    }),
    defineField({
      name: 'relatedEpisodes',
      title: 'Related Episodes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'episode' }] }]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
      media: 'featuredImage'
    }
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ]
})
```

### 4. Category Model

```typescript
// schemas/category.ts
import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    })
  ]
})
```

### 5. Settings Model

```typescript
// schemas/settings.ts
import { defineType, defineField } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'youtubeChannelId',
      title: 'YouTube Channel ID',
      type: 'string',
      description: 'Used for auto-syncing episodes'
    }),
    defineField({
      name: 'spotifyShowId',
      title: 'Spotify Show ID',
      type: 'string',
      description: 'Used for auto-syncing episodes'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'spotify', title: 'Spotify', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' }
      ]
    })
  ]
})
```

---

## API Integration Patterns

### YouTube Data API Integration

```typescript
// lib/youtube.ts
interface YouTubeVideo {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnail: string
  duration: string
}

export class YouTubeService {
  private apiKey: string
  private baseUrl = 'https://www.googleapis.com/youtube/v3'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Fetch latest videos from a channel
   */
  async getChannelVideos(channelId: string, maxResults = 10): Promise<YouTubeVideo[]> {
    try {
      // Step 1: Get uploads playlist ID
      const channelResponse = await fetch(
        `${this.baseUrl}/channels?part=contentDetails&id=${channelId}&key=${this.apiKey}`
      )

      if (!channelResponse.ok) {
        throw new Error(`YouTube API error: ${channelResponse.statusText}`)
      }

      const channelData = await channelResponse.json()
      const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads

      if (!uploadsPlaylistId) {
        throw new Error('Could not find uploads playlist')
      }

      // Step 2: Get videos from playlist
      const playlistResponse = await fetch(
        `${this.baseUrl}/playlistItems?` +
        `part=snippet,contentDetails&` +
        `playlistId=${uploadsPlaylistId}&` +
        `maxResults=${maxResults}&` +
        `key=${this.apiKey}`
      )

      if (!playlistResponse.ok) {
        throw new Error(`YouTube API error: ${playlistResponse.statusText}`)
      }

      const playlistData = await playlistResponse.json()

      // Step 3: Get video details (including duration)
      const videoIds = playlistData.items.map((item: any) => item.contentDetails.videoId).join(',')

      const videosResponse = await fetch(
        `${this.baseUrl}/videos?` +
        `part=snippet,contentDetails&` +
        `id=${videoIds}&` +
        `key=${this.apiKey}`
      )

      const videosData = await videosResponse.json()

      // Step 4: Transform data
      return videosData.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high.url,
        duration: item.contentDetails.duration
      }))
    } catch (error) {
      console.error('Error fetching YouTube videos:', error)
      throw error
    }
  }

  /**
   * Convert ISO 8601 duration to seconds
   */
  parseDuration(duration: string): number {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return 0

    const hours = parseInt(match[1] || '0')
    const minutes = parseInt(match[2] || '0')
    const seconds = parseInt(match[3] || '0')

    return hours * 3600 + minutes * 60 + seconds
  }
}
```

### Spotify API Integration

```typescript
// lib/spotify.ts
interface SpotifyEpisode {
  id: string
  name: string
  description: string
  releaseDate: string
  images: Array<{ url: string; height: number; width: number }>
  durationMs: number
  externalUrls: {
    spotify: string
  }
}

export class SpotifyService {
  private clientId: string
  private clientSecret: string
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId
    this.clientSecret = clientSecret
  }

  /**
   * Get access token using client credentials flow
   */
  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')
      },
      body: 'grant_type=client_credentials'
    })

    if (!response.ok) {
      throw new Error(`Spotify auth error: ${response.statusText}`)
    }

    const data = await response.json()
    this.accessToken = data.access_token
    this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000 // Refresh 1 min early

    return this.accessToken
  }

  /**
   * Fetch episodes from a show
   */
  async getShowEpisodes(showId: string, limit = 20): Promise<SpotifyEpisode[]> {
    try {
      const token = await this.getAccessToken()

      const response = await fetch(
        `https://api.spotify.com/v1/shows/${showId}/episodes?limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.statusText}`)
      }

      const data = await response.json()

      return data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        releaseDate: item.release_date,
        images: item.images,
        durationMs: item.duration_ms,
        externalUrls: item.external_urls
      }))
    } catch (error) {
      console.error('Error fetching Spotify episodes:', error)
      throw error
    }
  }
}
```

### Sanity Client Configuration

```typescript
// lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-10-14',
  useCdn: true, // Use CDN for production
  token: process.env.SANITY_API_TOKEN, // For write operations
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper to fetch data with caching
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, any>
  tags?: string[]
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: 60, // Revalidate every 60 seconds
      tags,
    },
  })
}
```

---

## Automation Workflows

### Episode Sync Workflow

```typescript
// app/api/sync-episodes/route.ts
import { NextResponse } from 'next/server'
import { YouTubeService } from '@/lib/youtube'
import { SpotifyService } from '@/lib/spotify'
import { client } from '@/lib/sanity'

export const runtime = 'edge'
export const maxDuration = 60 // 60 seconds max

export async function POST(request: Request) {
  try {
    // 1. Verify authorization (e.g., cron secret)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const results = {
      youtube: { synced: 0, errors: [] as string[] },
      spotify: { synced: 0, errors: [] as string[] }
    }

    // 2. Fetch settings
    const settings = await client.fetch(`*[_type == "settings"][0]`)

    if (!settings) {
      throw new Error('Settings not configured')
    }

    // 3. Sync YouTube episodes
    if (settings.youtubeChannelId) {
      try {
        const youtube = new YouTubeService(process.env.YOUTUBE_API_KEY!)
        const videos = await youtube.getChannelVideos(settings.youtubeChannelId, 10)

        for (const video of videos) {
          // Check if episode already exists
          const existing = await client.fetch(
            `*[_type == "episode" && youtubeId == $id][0]`,
            { id: video.id }
          )

          if (!existing) {
            // Create new episode
            await client.create({
              _type: 'episode',
              title: video.title,
              description: video.description,
              publishedAt: video.publishedAt,
              youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
              youtubeId: video.id,
              duration: youtube.parseDuration(video.duration),
              autoSynced: true,
              lastSyncedAt: new Date().toISOString(),
              // Download and upload image to Sanity
              // (implementation omitted for brevity)
            })
            results.youtube.synced++
          }
        }
      } catch (error) {
        results.youtube.errors.push((error as Error).message)
      }
    }

    // 4. Sync Spotify episodes
    if (settings.spotifyShowId) {
      try {
        const spotify = new SpotifyService(
          process.env.SPOTIFY_CLIENT_ID!,
          process.env.SPOTIFY_CLIENT_SECRET!
        )
        const episodes = await spotify.getShowEpisodes(settings.spotifyShowId, 20)

        for (const episode of episodes) {
          // Check if episode exists
          const existing = await client.fetch(
            `*[_type == "episode" && spotifyId == $id][0]`,
            { id: episode.id }
          )

          if (existing) {
            // Update existing episode with Spotify data
            await client.patch(existing._id).set({
              spotifyUrl: episode.externalUrls.spotify,
              spotifyId: episode.id,
              lastSyncedAt: new Date().toISOString()
            }).commit()
          } else {
            // Create new episode
            await client.create({
              _type: 'episode',
              title: episode.name,
              description: episode.description,
              publishedAt: episode.releaseDate,
              spotifyUrl: episode.externalUrls.spotify,
              spotifyId: episode.id,
              duration: Math.floor(episode.durationMs / 1000),
              autoSynced: true,
              lastSyncedAt: new Date().toISOString()
            })
            results.spotify.synced++
          }
        }
      } catch (error) {
        results.spotify.errors.push((error as Error).message)
      }
    }

    // 5. Trigger rebuild if any content was synced
    if (results.youtube.synced > 0 || results.spotify.synced > 0) {
      await fetch(process.env.VERCEL_DEPLOY_HOOK_URL!, { method: 'POST' })
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { error: 'Sync failed', message: (error as Error).message },
      { status: 500 }
    )
  }
}
```

### Vercel Cron Configuration

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/sync-episodes",
      "schedule": "0 6 * * *"
    }
  ]
}
```

---

## Security Considerations

### 1. API Key Management
- Store all API keys in Vercel environment variables
- Never commit secrets to git
- Use different keys for dev/staging/production
- Rotate keys regularly

### 2. Authentication
- Protect sync endpoints with secret tokens
- Validate webhook signatures from external services
- Implement rate limiting on public endpoints

### 3. Data Validation
- Validate all external API responses
- Sanitize user input in Sanity Studio
- Implement content moderation workflows

### 4. CORS Configuration
- Configure allowed origins in Sanity
- Restrict API access to known domains

---

## Performance Optimization

### 1. Static Generation Strategy
```typescript
// app/episodes/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function EpisodesPage() {
  const episodes = await sanityFetch<Episode[]>({
    query: `*[_type == "episode"] | order(publishedAt desc)`,
    tags: ['episode']
  })

  return <EpisodeList episodes={episodes} />
}
```

### 2. Image Optimization
```typescript
// components/SanityImage.tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export function SanityImage({ image, alt, width, height }) {
  return (
    <Image
      src={urlFor(image).width(width).height(height).url()}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={urlFor(image).width(20).blur(50).url()}
    />
  )
}
```

### 3. Caching Strategy
- Use Sanity CDN for content delivery
- Implement Vercel Edge Caching
- Set appropriate revalidation times
- Use On-Demand Revalidation for instant updates

---

## Deployment Strategy

### Environment Variables

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-14
SANITY_API_TOKEN=your_write_token

# YouTube
YOUTUBE_API_KEY=your_youtube_key

# Spotify
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Vercel
VERCEL_DEPLOY_HOOK_URL=your_deploy_hook_url
CRON_SECRET=your_cron_secret
```

### Deployment Flow

1. **Development**: Local development with hot reload
2. **Preview**: Automatic preview deployments on pull requests
3. **Production**: Deploy to production on merge to main
4. **Webhook**: Sanity triggers rebuild on content publish

---

*This technical architecture provides a solid foundation for scalable, maintainable content management.*
