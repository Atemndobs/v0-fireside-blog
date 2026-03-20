# Payload vs Sanity: Agentic-Friendly CMS for FireSide Tribe

## Executive Summary

**Recommendation: Payload CMS** for FireSide Tribe due to superior agentic workflow compatibility.

**Why?** Your current stack + existing custom admin + "agentic-friendly" requirements make Payload the clear winner.

---

## Current State Analysis

### What You Have
```
✅ Next.js 15 App Router
✅ Convex in package.json (not fully utilized?)
✅ Supabase (auth + storage)
✅ Clerk (auth)
✅ Custom admin UI (`/admin` routes already built)
✅ TypeScript
✅ Vercel deployment
```

### What You Need
```
❌ Content is still hardcoded (despite admin UI existing)
❌ No database layer for content
❌ No agent-editable schema
❌ No programmatic content mutations
```

---

## The "Agentic-Friendly" Test

### What Makes a CMS Agentic-Friendly?

1. **Schema-as-Code** (Git-trackable, agent can edit schema files)
2. **TypeScript-Native** (agent gets type safety, autocomplete)
3. **Single Codebase** (agent doesn't need to context-switch)
4. **Programmatic API** (agent can CRUD via code, not just UI)
5. **No External Dependencies** (agent can work offline/locally)

### Scorecard

| Criterion | Payload | Sanity | Custom Supabase |
|-----------|---------|--------|-----------------|
| Schema-as-Code | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| TypeScript-Native | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Single Codebase | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Programmatic API | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| No External Deps | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **TOTAL** | **24/25** | **17/25** | **19/25** |

---

## Deep Dive: Why Payload Wins

### 1. Schema-as-Code (Payload Advantage)

**Payload:**
```typescript
// collections/episodes.ts
import { CollectionConfig } from 'payload/types'

export const Episodes: CollectionConfig = {
  slug: 'episodes',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
    },
    {
      name: 'spotifyUrl',
      type: 'text',
    },
    {
      name: 'youtubeUrl',
      type: 'text',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
```

**Agent can:**
- ✅ Read the file to understand schema
- ✅ Edit the file to add new fields
- ✅ Commit changes to Git
- ✅ See TypeScript types auto-generate

**Sanity:**
```typescript
// sanity/schemas/episode.ts
export default {
  name: 'episode',
  title: 'Episode',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    { name: 'description', type: 'text' },
    // ...
  ]
}
```

**Agent can:**
- ✅ Read the file
- ✅ Edit the file
- ⚠️ Must deploy Sanity Studio separately
- ⚠️ Schema lives in separate Sanity.io project

### 2. Single Codebase (Payload Wins)

**Payload:**
```
your-next-app/
├── payload.config.ts         ← CMS config
├── collections/              ← Schema definitions
│   ├── episodes.ts
│   ├── artists.ts
│   └── posts.ts
├── app/                      ← Next.js app
│   ├── (frontend)/
│   │   ├── episodes/
│   │   └── artists/
│   └── (payload)/            ← Admin UI (auto-generated)
│       └── admin/[[...segments]]/
├── package.json              ← Single package.json
└── .env                      ← Single env file
```

**Sanity:**
```
your-next-app/                ← Next.js app
├── app/
│   ├── episodes/
│   └── artists/
├── lib/sanity.ts             ← Sanity client
└── package.json

sanity-studio/                ← Separate Sanity Studio project
├── sanity.config.ts
├── schemas/
│   ├── episode.ts
│   └── artist.ts
├── package.json              ← Separate package.json
└── .env.local                ← Separate env file
```

**Agent challenge with Sanity:**
- Must manage 2 codebases
- Must deploy 2 apps (Next.js + Studio)
- Schema changes require Studio deployment

### 3. TypeScript Type Safety

**Payload:**
```typescript
// Auto-generated types from your schema
import { Episode } from 'payload/generated-types'

const episode: Episode = await payload.findByID({
  collection: 'episodes',
  id: '123',
})

// TypeScript knows:
episode.title         // ✅ string
episode.publishedAt   // ✅ Date
episode.spotifyUrl    // ✅ string | undefined
episode.coverImage    // ✅ Media (with nested types)
```

**Sanity:**
```typescript
// Must manually define types OR use codegen
import { Episode } from './types/sanity'

const episode = await client.fetch<Episode>(
  `*[_type == "episode" && _id == $id][0]`,
  { id: '123' }
)

// TypeScript knows types, but:
// - Must run `sanity typegen` manually
// - Types can drift from actual schema
// - GROQ queries are strings (no autocomplete)
```

### 4. Programmatic Access (Both Good, Payload Slightly Better)

**Payload (REST + Local API):**
```typescript
import payload from 'payload'

// In API routes or server components
const episodes = await payload.find({
  collection: 'episodes',
  where: {
    featured: { equals: true }
  },
  sort: '-publishedAt',
  limit: 10,
})

// TypeScript autocomplete for all options ✅
```

**Sanity (GROQ):**
```typescript
import { client } from '@/lib/sanity'

const episodes = await client.fetch(
  `*[_type == "episode" && featured == true] | order(publishedAt desc) [0...10]`
)

// GROQ is powerful but:
// - String-based queries (no autocomplete)
// - Must learn GROQ syntax
// - Harder for agents to generate
```

---

## The Vercel Deployment Question

### The Caveat from Your Analysis

> "Vercel + 'no server management' is only clean if you stay inside Next.js and accept some serverless constraints. Payload historically runs on Express, and deploying an Express app on Vercel can involve workarounds."

### The Truth (2026 Reality)

**Payload 3.x (current) is specifically designed for Next.js:**

```typescript
// payload.config.ts
import { buildConfig } from 'payload/config'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

export default buildConfig({
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  }),
  // ...
})
```

**Deployment on Vercel:**
1. ✅ Payload 3.x integrates directly into Next.js App Router
2. ✅ Uses Vercel Postgres (serverless DB)
3. ✅ No separate Express server needed
4. ✅ Admin UI is just Next.js pages

**Constraints:**
- ⚠️ Cold starts (like any serverless)
- ⚠️ No long-running background jobs (use Vercel Cron instead)
- ⚠️ File uploads must use cloud storage (S3/R2, not local filesystem)

**These are the same constraints you'd have with Sanity on Vercel.**

---

## Recommended Stack for FireSide Tribe

### Option 1: Payload + Vercel (Recommended)

```
┌─────────────────────────────────────────────┐
│           Next.js 15 App                     │
│  ┌────────────────────────────────────────┐ │
│  │     Frontend (app/routes)              │ │
│  │  - /episodes                           │ │
│  │  - /artists                            │ │
│  │  - /blog                               │ │
│  └────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────┐ │
│  │  Payload Admin (auto-generated)        │ │
│  │  - /admin                              │ │
│  └────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────┐ │
│  │  Payload Collections (schema-as-code)  │ │
│  │  - collections/episodes.ts             │ │
│  │  - collections/artists.ts              │ │
│  │  - collections/posts.ts                │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
                    ↓
        ┌─────────────────────┐
        │  Vercel Postgres    │
        │  (Content DB)       │
        └─────────────────────┘
                    ↓
        ┌─────────────────────┐
        │  Cloudflare R2      │
        │  (Media Storage)    │
        └─────────────────────┘
```

**Agent Workflow:**
```bash
# 1. Agent reads schema
cat collections/episodes.ts

# 2. Agent adds new field
# Edit collections/episodes.ts, add "duration: number"

# 3. Commit
git add collections/episodes.ts
git commit -m "Add duration field to episodes"

# 4. Push
git push

# 5. Vercel auto-deploys
# 6. Payload auto-migrates DB schema
# 7. TypeScript types auto-regenerate
```

**Cost:**
- Payload: $0 (open source)
- Vercel: $0 (Hobby) or $20/mo (Pro)
- Vercel Postgres: $0 (free tier covers ~10K rows)
- Cloudflare R2: $0 (10GB free, then $0.015/GB)

**Total: $0-20/mo**

### Option 2: Sanity + Vercel (Your Original Plan)

```
┌─────────────────────────────────────────────┐
│           Next.js 15 App                     │
│  ┌────────────────────────────────────────┐ │
│  │     Frontend (app/routes)              │ │
│  │  - /episodes                           │ │
│  │  - /artists                            │ │
│  └────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────┐ │
│  │  Sanity Client (lib/sanity.ts)         │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
                    ↓
        ┌─────────────────────┐
        │   Sanity.io Cloud   │
        │  (Content Lake)     │
        └─────────────────────┘

┌─────────────────────────────────────────────┐
│     Sanity Studio (Separate Deployment)     │
│  - Hosted on Vercel or Sanity Cloud         │
│  - Different repo or subfolder              │
└─────────────────────────────────────────────┘
```

**Agent Workflow:**
```bash
# 1. Agent must work in TWO repos
cd sanity-studio
cat schemas/episode.ts

# 2. Edit schema
# Edit schemas/episode.ts

# 3. Deploy Studio
npm run deploy  # OR git push (if Studio on Vercel)

# 4. Then edit Next.js app
cd ../next-app
# Update types, queries, etc.

# 5. Deploy Next.js app
git push
```

**Cost:**
- Sanity: $0 (free tier: 3 users, 10GB, 100K requests)
- Vercel: $0 (Hobby) or $20/mo (Pro)

**Total: $0-20/mo (Year 1), $99-119/mo (Year 2+ when you need more users/storage)**

### Option 3: Supabase + Custom Admin (What You're Building Now)

**Pros:**
- Full control
- You've already started
- Supabase is great for programmatic access

**Cons:**
- ❌ No admin UI (you're building from scratch)
- ❌ No schema-as-code (must write SQL migrations)
- ❌ More maintenance (security, validation, UI, etc.)
- ❌ 3-4 weeks development time (per your plan)

**Cost:**
- Supabase: $0 (free tier) or $25/mo (Pro)
- Vercel: $0 (Hobby) or $20/mo (Pro)

**Total: $0-45/mo + 3-4 weeks dev time**

---

## Decision Matrix

| Factor | Payload | Sanity | Custom Supabase |
|--------|---------|--------|-----------------|
| **Agentic-Friendly** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Setup Time** | 1-2 weeks | 1-2 weeks | 3-4 weeks |
| **Admin UI** | ✅ Auto-generated | ✅ Excellent | ❌ Build yourself |
| **TypeScript DX** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Single Codebase** | ✅ Yes | ⚠️ Studio separate | ✅ Yes |
| **Schema-as-Code** | ✅ Git-tracked | ⚠️ Studio repo | ❌ SQL migrations |
| **Vendor Lock-In** | ❌ None (OSS) | ⚠️ Medium | ❌ None |
| **Year 1 Cost** | $0-20 | $0-20 | $0-45 |
| **Year 2+ Cost** | $0-20 | $99-119 | $0-45 |
| **Maintenance** | Low | Low | High |

---

## Concrete Migration Plan: Payload

### Phase 1: Install Payload (Week 1, Days 1-3)

```bash
cd /Users/atem/sites/fireside/v0-fireside-blog

# Install Payload
npm install payload @payloadcms/db-vercel-postgres @payloadcms/richtext-lexical

# Install Cloudflare R2 plugin for media
npm install @payloadcms/plugin-cloud-storage

# Create Payload config
touch payload.config.ts

# Create collections directory
mkdir -p collections
```

**payload.config.ts:**
```typescript
import { buildConfig } from 'payload/config'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { Episodes } from './collections/Episodes'
import { Artists } from './collections/Artists'
import { Posts } from './collections/Posts'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
  },
  collections: [
    Episodes,
    Artists,
    Posts,
  ],
  editor: lexicalEditor({}),
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  }),
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter: 'r2', // or 's3'
        },
      },
    }),
  ],
  typescript: {
    outputFile: './payload-types.ts',
  },
})
```

### Phase 2: Define Collections (Week 1, Days 4-5)

**collections/Episodes.ts:**
```typescript
import { CollectionConfig } from 'payload/types'

export const Episodes: CollectionConfig = {
  slug: 'episodes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'featured'],
  },
  access: {
    read: () => true, // Public
    create: ({ req }) => !!req.user, // Logged in
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'spotifyUrl',
      type: 'text',
      admin: {
        placeholder: 'https://open.spotify.com/episode/...',
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      admin: {
        placeholder: 'https://www.youtube.com/watch?v=...',
      },
    },
    {
      name: 'youtubeId',
      type: 'text',
      admin: {
        description: 'Auto-extracted from YouTube URL',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'autoSynced',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Was this episode auto-synced from YouTube/Spotify?',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Auto-extract YouTube ID from URL
        if (data.youtubeUrl && !data.youtubeId) {
          const match = data.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
          if (match) data.youtubeId = match[1]
        }
        return data
      },
    ],
  },
}
```

**Repeat for Artists, Posts, etc.**

### Phase 3: Integrate with Next.js (Week 1-2)

**app/episodes/page.tsx (before):**
```typescript
// Hardcoded data
const episodes = [
  { title: 'Episode 1', date: '2024-01-01', ... },
  { title: 'Episode 2', date: '2024-01-08', ... },
]
```

**app/episodes/page.tsx (after):**
```typescript
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export default async function EpisodesPage() {
  const payload = await getPayloadHMR({ config: configPromise })
  
  const { docs: episodes } = await payload.find({
    collection: 'episodes',
    sort: '-publishedAt',
    limit: 50,
  })

  return (
    <div className="container mx-auto py-12">
      <h1>Episodes</h1>
      <div className="grid gap-6">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  )
}
```

### Phase 4: Migrate Existing Content (Week 2)

**Option A: Manual (via Admin UI)**
1. Start local dev: `npm run dev`
2. Go to `http://localhost:3000/admin`
3. Create episodes/artists/posts one by one

**Option B: Seed Script (Recommended)**

**scripts/seed-payload.ts:**
```typescript
import payload from 'payload'
import { Episodes } from './collections/Episodes'

const hardcodedEpisodes = [
  { title: 'Episode 1', publishedAt: '2024-01-01', ... },
  // ...
]

async function seed() {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    // ...
  })

  for (const ep of hardcodedEpisodes) {
    await payload.create({
      collection: 'episodes',
      data: ep,
    })
  }

  console.log('Seeded episodes!')
}

seed()
```

### Phase 5: Replace Custom Admin (Week 2-3)

**Before:**
```
app/admin/(protected)/
├── episodes/
│   ├── page.tsx         (custom list)
│   ├── new/page.tsx     (custom form)
│   └── [id]/page.tsx    (custom edit form)
├── artists/
├── blog/
└── ...
```

**After:**
```
app/(payload)/
└── admin/[[...segments]]/page.tsx    ← Payload auto-generates EVERYTHING

// Delete custom admin routes
// Payload gives you:
// - /admin/collections/episodes (list)
// - /admin/collections/episodes/create (form)
// - /admin/collections/episodes/:id (edit)
// - Dashboard, media library, user management, etc.
```

### Phase 6: Agent Workflow Examples (Week 3)

**Example 1: Agent adds "duration" field to episodes**

```bash
# Agent edits schema file
cat <<EOF >> collections/Episodes.ts
    {
      name: 'duration',
      type: 'number',
      admin: {
        description: 'Episode duration in seconds',
      },
    },
EOF

# Commit
git add collections/Episodes.ts
git commit -m "Add duration field to episodes"
git push

# Payload auto-generates migration
# TypeScript types auto-update
```

**Example 2: Agent creates new episode via API**

```typescript
// API route: app/api/sync-youtube/route.ts
import payload from 'payload'

export async function POST() {
  const latestVideo = await fetchYouTubeAPI()
  
  const episode = await payload.create({
    collection: 'episodes',
    data: {
      title: latestVideo.title,
      description: latestVideo.description,
      youtubeUrl: latestVideo.url,
      youtubeId: latestVideo.id,
      publishedAt: latestVideo.publishedAt,
      autoSynced: true,
    },
  })
  
  return Response.json({ success: true, episode })
}
```

**Example 3: Agent queries episodes**

```typescript
const featuredEpisodes = await payload.find({
  collection: 'episodes',
  where: {
    and: [
      { featured: { equals: true } },
      { publishedAt: { greater_than: '2024-01-01' } },
    ],
  },
  sort: '-publishedAt',
  limit: 5,
})
```

---

## Final Recommendation

### For FireSide Tribe: Choose Payload

**Why:**

1. ✅ **Perfect for agentic workflows** - schema-as-code, TypeScript-native, single codebase
2. ✅ **Saves 3-4 weeks** - no need to build custom admin UI
3. ✅ **Open source** - no vendor lock-in, no surprise costs
4. ✅ **Vercel-friendly** - Payload 3.x is designed for Next.js on Vercel
5. ✅ **Auto-generated admin** - better than what you'd build in 4 weeks
6. ✅ **Future-proof** - as your project grows, Payload grows with you

**Skip Sanity because:**
- ⚠️ Separate Studio codebase (harder for agents)
- ⚠️ GROQ learning curve (agents prefer TypeScript)
- ⚠️ Costs scale up ($99/mo in Year 2)

**Skip Custom Supabase because:**
- ❌ 3-4 weeks dev time
- ❌ Ongoing maintenance
- ❌ No schema-as-code
- ❌ Build admin UI from scratch

### Next Steps

1. **This week:** Install Payload, define 3 core collections (Episodes, Artists, Posts)
2. **Next week:** Migrate content, test admin UI
3. **Week 3:** Replace custom admin routes, deploy to Vercel
4. **Week 4:** Polish, train agents on Payload API, automate YouTube/Spotify sync

---

**Ready to start?** I can walk you through installing Payload right now and converting your first collection (Episodes).
