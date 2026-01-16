import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Convex Mutations for Fireside Admin
 * These replace the Supabase server actions
 */

// ============================================
// Artists Mutations
// ============================================

export const createArtist = mutation({
    args: {
        name: v.string(),
        slug: v.string(),
        shortDescription: v.string(),
        profileImageUrl: v.string(),
        profileImageAlt: v.string(),
        genre: v.optional(v.string()),
        countryCode: v.optional(v.string()),
        featured: v.boolean(),
        orderRank: v.number(),
        bio: v.optional(v.array(v.any())),
        socialLinks: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const artistId = await ctx.db.insert("artists", {
            ...args,
            createdAt: now,
            updatedAt: now,
        });
        return artistId;
    },
});

export const updateArtist = mutation({
    args: {
        id: v.id("artists"),
        name: v.optional(v.string()),
        slug: v.optional(v.string()),
        shortDescription: v.optional(v.string()),
        profileImageUrl: v.optional(v.string()),
        profileImageAlt: v.optional(v.string()),
        genre: v.optional(v.string()),
        countryCode: v.optional(v.string()),
        featured: v.optional(v.boolean()),
        orderRank: v.optional(v.number()),
        bio: v.optional(v.array(v.any())),
        socialLinks: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const existing = await ctx.db.get(id);
        if (!existing) {
            throw new Error("Artist not found");
        }
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
        return id;
    },
});

export const deleteArtist = mutation({
    args: { id: v.id("artists") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return { success: true };
    },
});

// ============================================
// Episodes Mutations
// ============================================

export const createEpisode = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        description: v.optional(v.string()),
        publishedAt: v.number(),
        coverImageUrl: v.optional(v.string()),
        coverImageAlt: v.optional(v.string()),
        spotifyUrl: v.optional(v.string()),
        spotifyId: v.optional(v.string()),
        youtubeUrl: v.optional(v.string()),
        youtubeId: v.optional(v.string()),
        durationSeconds: v.optional(v.number()),
        showNotes: v.optional(v.array(v.any())),
        featured: v.boolean(),
        autoSynced: v.optional(v.boolean()),
        seo: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const episodeId = await ctx.db.insert("episodes", {
            ...args,
            autoSynced: args.autoSynced ?? false,
            createdAt: now,
            updatedAt: now,
        });
        return episodeId;
    },
});

export const updateEpisode = mutation({
    args: {
        id: v.id("episodes"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        description: v.optional(v.string()),
        publishedAt: v.optional(v.number()),
        coverImageUrl: v.optional(v.string()),
        coverImageAlt: v.optional(v.string()),
        spotifyUrl: v.optional(v.string()),
        spotifyId: v.optional(v.string()),
        youtubeUrl: v.optional(v.string()),
        youtubeId: v.optional(v.string()),
        durationSeconds: v.optional(v.number()),
        showNotes: v.optional(v.array(v.any())),
        featured: v.optional(v.boolean()),
        autoSynced: v.optional(v.boolean()),
        seo: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const existing = await ctx.db.get(id);
        if (!existing) {
            throw new Error("Episode not found");
        }
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
        return id;
    },
});

export const deleteEpisode = mutation({
    args: { id: v.id("episodes") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return { success: true };
    },
});

// ============================================
// Blog Posts Mutations
// ============================================

export const createBlogPost = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        excerpt: v.string(),
        author: v.optional(v.string()),
        featuredImageUrl: v.string(),
        featuredImageAlt: v.string(),
        publishedAt: v.number(),
        content: v.optional(v.any()),
        seo: v.optional(v.any()),
        featured: v.boolean(),
        published: v.boolean(),
        readingTimeMinutes: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const postId = await ctx.db.insert("blogPosts", {
            ...args,
            createdAt: now,
            updatedAt: now,
        });
        return postId;
    },
});

export const updateBlogPost = mutation({
    args: {
        id: v.id("blogPosts"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        excerpt: v.optional(v.string()),
        author: v.optional(v.string()),
        featuredImageUrl: v.optional(v.string()),
        featuredImageAlt: v.optional(v.string()),
        publishedAt: v.optional(v.number()),
        content: v.optional(v.any()),
        seo: v.optional(v.any()),
        featured: v.optional(v.boolean()),
        published: v.optional(v.boolean()),
        readingTimeMinutes: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const existing = await ctx.db.get(id);
        if (!existing) {
            throw new Error("Blog post not found");
        }
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
        return id;
    },
});

export const deleteBlogPost = mutation({
    args: { id: v.id("blogPosts") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return { success: true };
    },
});

// ============================================
// Social Links Mutations
// ============================================

export const createSocialLink = mutation({
    args: {
        platform: v.string(),
        label: v.string(),
        url: v.string(),
        iconSlug: v.optional(v.string()),
        priority: v.number(),
        zones: v.array(v.string()),
        isFeatured: v.boolean(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const linkId = await ctx.db.insert("socialLinks", {
            ...args,
            createdAt: now,
            updatedAt: now,
        });
        return linkId;
    },
});

export const updateSocialLink = mutation({
    args: {
        id: v.id("socialLinks"),
        platform: v.optional(v.string()),
        label: v.optional(v.string()),
        url: v.optional(v.string()),
        iconSlug: v.optional(v.string()),
        priority: v.optional(v.number()),
        zones: v.optional(v.array(v.string())),
        isFeatured: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const existing = await ctx.db.get(id);
        if (!existing) {
            throw new Error("Social link not found");
        }
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
        return id;
    },
});

export const deleteSocialLink = mutation({
    args: { id: v.id("socialLinks") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return { success: true };
    },
});

// ============================================
// About Page Mutations
// ============================================

export const updateAboutPage = mutation({
    args: {
        id: v.optional(v.id("aboutPage")),
        heroTitle: v.optional(v.string()),
        heroTagline: v.optional(v.string()),
        missionTitle: v.optional(v.string()),
        missionImageUrl: v.optional(v.string()),
        missionImageAlt: v.optional(v.string()),
        missionParagraph1: v.optional(v.string()),
        missionParagraph2: v.optional(v.string()),
        storyTitle: v.optional(v.string()),
        storyParagraph1: v.optional(v.string()),
        storyParagraph2: v.optional(v.string()),
        storyParagraph3: v.optional(v.string()),
        whatWeDoTitle: v.optional(v.string()),
        podcastCardTitle: v.optional(v.string()),
        podcastCardDescription: v.optional(v.string()),
        blogCardTitle: v.optional(v.string()),
        blogCardDescription: v.optional(v.string()),
        artistCardTitle: v.optional(v.string()),
        artistCardDescription: v.optional(v.string()),
        ctaTitle: v.optional(v.string()),
        ctaDescription: v.optional(v.string()),
        ctaButtonText: v.optional(v.string()),
        updatedBy: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;

        // Get existing or create new
        const existing = await ctx.db.query("aboutPage").first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                ...updates,
                updatedAt: Date.now(),
            });
            return existing._id;
        } else {
            // Create new about page with defaults
            const pageId = await ctx.db.insert("aboutPage", {
                heroTitle: updates.heroTitle ?? "The Fireside Tribe",
                heroTagline: updates.heroTagline ?? "",
                missionTitle: updates.missionTitle ?? "Our Mission",
                missionImageUrl: updates.missionImageUrl,
                missionImageAlt: updates.missionImageAlt,
                missionParagraph1: updates.missionParagraph1 ?? "",
                missionParagraph2: updates.missionParagraph2 ?? "",
                storyTitle: updates.storyTitle ?? "Our Story",
                storyParagraph1: updates.storyParagraph1 ?? "",
                storyParagraph2: updates.storyParagraph2 ?? "",
                storyParagraph3: updates.storyParagraph3 ?? "",
                whatWeDoTitle: updates.whatWeDoTitle ?? "What We Do",
                podcastCardTitle: updates.podcastCardTitle ?? "The Podcast",
                podcastCardDescription: updates.podcastCardDescription ?? "",
                blogCardTitle: updates.blogCardTitle ?? "The Blog",
                blogCardDescription: updates.blogCardDescription ?? "",
                artistCardTitle: updates.artistCardTitle ?? "Artist Spotlights",
                artistCardDescription: updates.artistCardDescription ?? "",
                ctaTitle: updates.ctaTitle ?? "Join The Tribe",
                ctaDescription: updates.ctaDescription ?? "",
                ctaButtonText: updates.ctaButtonText ?? "LISTEN NOW",
                updatedBy: updates.updatedBy,
                updatedAt: Date.now(),
            });
            return pageId;
        }
    },
});

// ============================================
// AAA Page Mutations
// ============================================

export const updateAAAPageSettings = mutation({
    args: {
        heroSubtitle: v.optional(v.string()),
        heroDescription: v.optional(v.string()),
        powerSectionTitle: v.optional(v.string()),
        powerSectionDescription: v.optional(v.string()),
        curatorTitle: v.optional(v.string()),
        curatorDescription: v.optional(v.string()),
        storytellerTitle: v.optional(v.string()),
        storytellerDescription: v.optional(v.string()),
        connectorTitle: v.optional(v.string()),
        connectorDescription: v.optional(v.string()),
        ctaButtonText: v.optional(v.string()),
        published: v.optional(v.boolean()),
        publishAt: v.optional(v.number()),
        unpublishAt: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("aaaPageSettings").first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                ...args,
                updatedAt: Date.now(),
            });
            return existing._id;
        } else {
            const settingsId = await ctx.db.insert("aaaPageSettings", {
                heroSubtitle: args.heroSubtitle ?? "",
                heroDescription: args.heroDescription ?? "",
                powerSectionTitle: args.powerSectionTitle ?? "",
                powerSectionDescription: args.powerSectionDescription ?? "",
                curatorTitle: args.curatorTitle ?? "",
                curatorDescription: args.curatorDescription ?? "",
                storytellerTitle: args.storytellerTitle ?? "",
                storytellerDescription: args.storytellerDescription ?? "",
                connectorTitle: args.connectorTitle ?? "",
                connectorDescription: args.connectorDescription ?? "",
                ctaButtonText: args.ctaButtonText ?? "",
                published: args.published ?? false,
                publishAt: args.publishAt,
                unpublishAt: args.unpublishAt,
                updatedAt: Date.now(),
            });
            return settingsId;
        }
    },
});

export const createAAAAuthor = mutation({
    args: {
        slug: v.string(),
        name: v.string(),
        fullName: v.string(),
        role: v.string(),
        colorBg: v.string(),
        colorText: v.string(),
        colorBorder: v.string(),
        colorShadow: v.string(),
        bio: v.string(),
        profileImageUrl: v.optional(v.string()),
        profileImageAlt: v.optional(v.string()),
        orderRank: v.number(),
        featured: v.boolean(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const authorId = await ctx.db.insert("aaaAuthors", {
            ...args,
            createdAt: now,
            updatedAt: now,
        });
        return authorId;
    },
});

export const updateAAAAuthor = mutation({
    args: {
        id: v.id("aaaAuthors"),
        slug: v.optional(v.string()),
        name: v.optional(v.string()),
        fullName: v.optional(v.string()),
        role: v.optional(v.string()),
        colorBg: v.optional(v.string()),
        colorText: v.optional(v.string()),
        colorBorder: v.optional(v.string()),
        colorShadow: v.optional(v.string()),
        bio: v.optional(v.string()),
        profileImageUrl: v.optional(v.string()),
        profileImageAlt: v.optional(v.string()),
        orderRank: v.optional(v.number()),
        featured: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const existing = await ctx.db.get(id);
        if (!existing) {
            throw new Error("Author not found");
        }
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
        return id;
    },
});

export const deleteAAAAuthor = mutation({
    args: { id: v.id("aaaAuthors") },
    handler: async (ctx, args) => {
        // Also delete associated fun facts
        const funFacts = await ctx.db
            .query("aaaFunFacts")
            .withIndex("by_author", (q) => q.eq("authorId", args.id))
            .collect();

        for (const fact of funFacts) {
            await ctx.db.delete(fact._id);
        }

        await ctx.db.delete(args.id);
        return { success: true };
    },
});

export const createAAAQuote = mutation({
    args: {
        quote: v.string(),
        authorName: v.string(),
        orderRank: v.number(),
        active: v.boolean(),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const quoteId = await ctx.db.insert("aaaQuotes", {
            ...args,
            createdAt: now,
            updatedAt: now,
        });
        return quoteId;
    },
});

export const updateAAAQuote = mutation({
    args: {
        id: v.id("aaaQuotes"),
        quote: v.optional(v.string()),
        authorName: v.optional(v.string()),
        orderRank: v.optional(v.number()),
        active: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        const existing = await ctx.db.get(id);
        if (!existing) {
            throw new Error("Quote not found");
        }
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
        return id;
    },
});

export const deleteAAAQuote = mutation({
    args: { id: v.id("aaaQuotes") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return { success: true };
    },
});

export const createAAAFunFact = mutation({
    args: {
        authorId: v.id("aaaAuthors"),
        fact: v.string(),
        orderRank: v.number(),
    },
    handler: async (ctx, args) => {
        const factId = await ctx.db.insert("aaaFunFacts", {
            ...args,
            createdAt: Date.now(),
        });
        return factId;
    },
});

export const updateAAAFunFact = mutation({
    args: {
        id: v.id("aaaFunFacts"),
        fact: v.optional(v.string()),
        orderRank: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
        return id;
    },
});

export const deleteAAAFunFact = mutation({
    args: { id: v.id("aaaFunFacts") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
        return { success: true };
    },
});

export const replaceAuthorFunFacts = mutation({
    args: {
        authorId: v.id("aaaAuthors"),
        funFacts: v.array(v.object({
            fact: v.string(),
            orderRank: v.number(),
        })),
    },
    handler: async (ctx, args) => {
        // Delete all existing fun facts for this author
        const existing = await ctx.db
            .query("aaaFunFacts")
            .withIndex("by_author", (q) => q.eq("authorId", args.authorId))
            .collect();

        for (const fact of existing) {
            await ctx.db.delete(fact._id);
        }

        // Insert new fun facts
        const now = Date.now();
        for (const fact of args.funFacts) {
            await ctx.db.insert("aaaFunFacts", {
                authorId: args.authorId,
                fact: fact.fact,
                orderRank: fact.orderRank,
                createdAt: now,
            });
        }

        return { success: true };
    },
});
