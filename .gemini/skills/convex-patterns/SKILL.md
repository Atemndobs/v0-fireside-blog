---
name: Convex Patterns
description: Backend patterns for Convex queries, mutations, and Clerk authentication integration
---

# Convex Patterns Skill

Guidance for implementing Convex backend patterns in Fireside Tribe.

## ⚠️ Type Safety Rules

**Avoid `as any` when working with Convex.**

### Typing Convex IDs
```typescript
// ❌ BAD - Don't coerce IDs
const id = someString as any;
await ctx.db.get(id);

// ✅ GOOD - Use the proper Id type
import { Id } from "@/convex/_generated/dataModel";
const id: Id<"episodes"> = episode._id;
await ctx.db.get(id);
```

### Typing Query Results
```typescript
// ❌ BAD - Untyped fallback
const episodes = rawData || [] as any[];

// ✅ GOOD - Type the fallback array
import { Doc } from "@/convex/_generated/dataModel";
const episodes: Doc<"episodes">[] = rawData || [];
```

### Server-Side HTTP Client
When using `ConvexHttpClient` in Server Components, type the result:
```typescript
const result = await convexClient.query(api.queries.getEpisodes, {}) as Doc<"episodes">[];
```

## Schema Definition

Define tables in `convex/schema.ts`:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  episodes: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    youtubeId: v.string(),
    thumbnail: v.optional(v.string()),
    publishedAt: v.string(),
    duration: v.optional(v.string()),
    autoSynced: v.optional(v.boolean()),
  }).index("by_youtube_id", ["youtubeId"]),

  artists: defineTable({
    name: v.string(),
    bio: v.optional(v.string()),
    image: v.optional(v.string()),
    socialLinks: v.optional(v.object({
      instagram: v.optional(v.string()),
      spotify: v.optional(v.string()),
      youtube: v.optional(v.string()),
    })),
  }),
});
```

## Query Patterns

### Public Query (No Auth)
```typescript
import { query } from "./_generated/server";

export const listEpisodes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("episodes")
      .order("desc")
      .take(20);
  },
});
```

### Query with Arguments
```typescript
export const getEpisodeByYoutubeId = query({
  args: { youtubeId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("episodes")
      .withIndex("by_youtube_id", (q) => q.eq("youtubeId", args.youtubeId))
      .first();
  },
});
```

### Protected Query (Requires Auth)
```typescript
export const getAdminStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    // Admin-only logic
  },
});
```

## Mutation Patterns

### Basic Mutation
```typescript
import { mutation } from "./_generated/server";

export const createEpisode = mutation({
  args: {
    title: v.string(),
    youtubeId: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    return await ctx.db.insert("episodes", {
      ...args,
      publishedAt: new Date().toISOString(),
      autoSynced: false,
    });
  },
});
```

### Update Mutation
```typescript
export const updateEpisode = mutation({
  args: {
    id: v.id("episodes"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const { id, ...updates } = args;
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );

    await ctx.db.patch(id, filtered);
    return id;
  },
});
```

### Delete Mutation
```typescript
export const deleteEpisode = mutation({
  args: { id: v.id("episodes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    await ctx.db.delete(args.id);
  },
});
```

## Frontend Integration

### Using Queries
```typescript
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function EpisodesList() {
  const episodes = useQuery(api.episodes.listEpisodes);

  if (episodes === undefined) return <Loading />;
  if (episodes.length === 0) return <EmptyState />;

  return episodes.map((ep) => <EpisodeCard key={ep._id} episode={ep} />);
}
```

### Using Mutations
```typescript
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function CreateEpisodeForm() {
  const createEpisode = useMutation(api.episodes.createEpisode);

  const handleSubmit = async (data: FormData) => {
    await createEpisode({
      title: data.title,
      youtubeId: data.youtubeId,
    });
  };
}
```

## Clerk Auth Integration

Convex is configured with Clerk in `convex/auth.config.ts`. The `ctx.auth.getUserIdentity()` call returns the Clerk user identity with fields:
- `tokenIdentifier` - Unique user ID
- `name` - User's name
- `email` - User's email (if available)
