import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Fireside Tribe - Convex Schema
 * Migrated from Supabase PostgreSQL schema
 * 
 * Original tables mapped to Convex tables:
 * - fireside_artists -> artists
 * - fireside_episodes -> episodes  
 * - fireside_blog_posts -> blogPosts
 * - fireside_social_links -> socialLinks
 * - fireside_about_page -> aboutPage
 * - fireside_aaa_authors -> aaaAuthors
 * - fireside_aaa_fun_facts -> aaaFunFacts
 * - fireside_aaa_page_settings -> aaaPageSettings
 * - fireside_aaa_quotes -> aaaQuotes
 */

export default defineSchema({
    // Artists table
    artists: defineTable({
        // Original Supabase UUID stored for reference during migration
        supabaseId: v.optional(v.string()),
        name: v.string(),
        slug: v.string(),
        shortDescription: v.string(),
        bio: v.optional(v.array(v.any())),
        profileImageUrl: v.string(),
        profileImageAlt: v.string(),
        socialLinks: v.optional(v.any()),
        genre: v.optional(v.string()),
        featured: v.boolean(),
        orderRank: v.number(),
        countryCode: v.optional(v.string()),
        createdAt: v.number(), // Unix timestamp
        updatedAt: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_featured", ["featured", "orderRank"])
        .index("by_supabaseId", ["supabaseId"]),

    // Episodes table
    episodes: defineTable({
        supabaseId: v.optional(v.string()),
        title: v.string(),
        slug: v.string(),
        description: v.optional(v.string()),
        publishedAt: v.number(), // Unix timestamp
        coverImageUrl: v.optional(v.string()),
        coverImageAlt: v.optional(v.string()),
        spotifyUrl: v.optional(v.string()),
        spotifyId: v.optional(v.string()),
        youtubeUrl: v.optional(v.string()),
        youtubeId: v.optional(v.string()),
        durationSeconds: v.optional(v.number()),
        showNotes: v.optional(v.array(v.any())),
        featured: v.boolean(),
        autoSynced: v.boolean(),
        lastSyncedAt: v.optional(v.number()),
        seo: v.optional(v.any()),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_published", ["publishedAt"])
        .index("by_featured", ["featured"])
        .index("by_supabaseId", ["supabaseId"]),

    // Blog Posts table
    blogPosts: defineTable({
        supabaseId: v.optional(v.string()),
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
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_published", ["publishedAt"])
        .index("by_featured", ["featured"])
        .index("by_supabaseId", ["supabaseId"]),

    // Social Links table
    socialLinks: defineTable({
        supabaseId: v.optional(v.string()),
        platform: v.string(),
        label: v.string(),
        url: v.string(),
        iconSlug: v.optional(v.string()),
        priority: v.number(),
        zones: v.array(v.string()),
        isFeatured: v.boolean(),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_priority", ["priority"])
        .index("by_platform", ["platform"])
        .index("by_supabaseId", ["supabaseId"]),

    // About Page (singleton-like)
    aboutPage: defineTable({
        supabaseId: v.optional(v.string()),
        heroTitle: v.string(),
        heroTagline: v.string(),
        missionTitle: v.string(),
        missionImageUrl: v.optional(v.string()),
        missionImageAlt: v.optional(v.string()),
        missionParagraph1: v.string(),
        missionParagraph2: v.string(),
        storyTitle: v.string(),
        storyParagraph1: v.string(),
        storyParagraph2: v.string(),
        storyParagraph3: v.string(),
        whatWeDoTitle: v.string(),
        podcastCardTitle: v.string(),
        podcastCardDescription: v.string(),
        blogCardTitle: v.string(),
        blogCardDescription: v.string(),
        artistCardTitle: v.string(),
        artistCardDescription: v.string(),
        ctaTitle: v.string(),
        ctaDescription: v.string(),
        ctaButtonText: v.string(),
        updatedBy: v.optional(v.string()),
        updatedAt: v.number(),
    })
        .index("by_supabaseId", ["supabaseId"]),

    // AAA Authors (About page authors)
    aaaAuthors: defineTable({
        supabaseId: v.optional(v.string()),
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
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_order", ["orderRank"])
        .index("by_supabaseId", ["supabaseId"]),

    // AAA Fun Facts
    aaaFunFacts: defineTable({
        supabaseId: v.optional(v.string()),
        authorId: v.id("aaaAuthors"), // Reference to aaaAuthors
        supabaseAuthorId: v.optional(v.string()), // Original Supabase author ID for migration
        fact: v.string(),
        orderRank: v.number(),
        createdAt: v.number(),
    })
        .index("by_author", ["authorId", "orderRank"])
        .index("by_supabaseId", ["supabaseId"])
        .index("by_supabaseAuthorId", ["supabaseAuthorId"]),

    // AAA Page Settings (singleton-like)
    aaaPageSettings: defineTable({
        supabaseId: v.optional(v.string()),
        heroSubtitle: v.string(),
        heroDescription: v.string(),
        powerSectionTitle: v.string(),
        powerSectionDescription: v.string(),
        curatorTitle: v.string(),
        curatorDescription: v.string(),
        storytellerTitle: v.string(),
        storytellerDescription: v.string(),
        connectorTitle: v.string(),
        connectorDescription: v.string(),
        ctaButtonText: v.string(),
        published: v.boolean(),
        publishAt: v.optional(v.number()),
        unpublishAt: v.optional(v.number()),
        updatedAt: v.number(),
    })
        .index("by_supabaseId", ["supabaseId"]),

    // AAA Quotes
    aaaQuotes: defineTable({
        supabaseId: v.optional(v.string()),
        quote: v.string(),
        authorName: v.string(),
        orderRank: v.number(),
        active: v.boolean(),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_order", ["orderRank"])
        .index("by_active", ["active"])
        .index("by_supabaseId", ["supabaseId"]),
});
