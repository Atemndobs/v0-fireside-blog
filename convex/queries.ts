import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Convex Query Functions for Fireside
 * These replace the Supabase repository functions
 */

// Helper to format timestamps to date strings
function formatDate(timestamp: number | undefined): string | null {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

// ============================================
// Episodes Queries
// ============================================

export const getEpisodes = query({
    args: {
        limit: v.optional(v.number()),
        featuredOnly: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        let results;

        if (args.featuredOnly) {
            results = await ctx.db
                .query("episodes")
                .withIndex("by_featured", (q) => q.eq("featured", true))
                .order("desc")
                .collect();
        } else {
            results = await ctx.db
                .query("episodes")
                .withIndex("by_published")
                .order("desc")
                .collect();
        }

        if (args.limit) {
            results = results.slice(0, args.limit);
        }

        return results.map((episode) => ({
            id: episode._id,
            title: episode.title,
            slug: episode.slug,
            description: episode.description,
            publishedAt: formatDate(episode.publishedAt),
            coverImageUrl: episode.coverImageUrl,
            spotifyUrl: episode.spotifyUrl,
            youtubeUrl: episode.youtubeUrl,
            featured: episode.featured,
        }));
    },
});

export const getEpisodeBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const episode = await ctx.db
            .query("episodes")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();

        if (!episode) return null;

        return {
            id: episode._id,
            title: episode.title,
            slug: episode.slug,
            description: episode.description,
            publishedAt: formatDate(episode.publishedAt),
            coverImageUrl: episode.coverImageUrl,
            coverImageAlt: episode.coverImageAlt,
            spotifyUrl: episode.spotifyUrl,
            youtubeUrl: episode.youtubeUrl,
            featured: episode.featured,
            showNotes: episode.showNotes,
            seo: episode.seo,
        };
    },
});

export const getEpisodeById = query({
    args: { id: v.id("episodes") },
    handler: async (ctx, args) => {
        const episode = await ctx.db.get(args.id);
        if (!episode) return null;

        return {
            id: episode._id,
            title: episode.title,
            slug: episode.slug,
            description: episode.description,
            publishedAt: episode.publishedAt, // Raw timestamp for admin
            publishedAtFormatted: formatDate(episode.publishedAt),
            coverImageUrl: episode.coverImageUrl,
            coverImageAlt: episode.coverImageAlt,
            spotifyUrl: episode.spotifyUrl,
            spotifyId: episode.spotifyId,
            youtubeUrl: episode.youtubeUrl,
            youtubeId: episode.youtubeId,
            durationSeconds: episode.durationSeconds,
            showNotes: episode.showNotes,
            featured: episode.featured,
            autoSynced: episode.autoSynced,
            seo: episode.seo,
        };
    },
});

export const getAllEpisodesForAdmin = query({
    args: {},
    handler: async (ctx) => {
        const results = await ctx.db
            .query("episodes")
            .withIndex("by_published")
            .order("desc")
            .collect();

        return results.map((episode) => ({
            id: episode._id,
            title: episode.title,
            slug: episode.slug,
            description: episode.description,
            publishedAt: episode.publishedAt,
            publishedAtFormatted: formatDate(episode.publishedAt),
            coverImageUrl: episode.coverImageUrl,
            spotifyUrl: episode.spotifyUrl,
            youtubeUrl: episode.youtubeUrl,
            featured: episode.featured,
            autoSynced: episode.autoSynced,
        }));
    },
});

// ============================================
// Artists Queries
// ============================================

export const getArtists = query({
    args: {
        limit: v.optional(v.number()),
        featuredOnly: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        let results;

        if (args.featuredOnly) {
            results = await ctx.db
                .query("artists")
                .withIndex("by_featured", (q) => q.eq("featured", true))
                .collect();
        } else {
            results = await ctx.db.query("artists").collect();
        }

        // Sort by orderRank
        results.sort((a, b) => a.orderRank - b.orderRank);

        if (args.limit) {
            results = results.slice(0, args.limit);
        }

        return results.map((artist) => ({
            id: artist._id,
            name: artist.name,
            slug: artist.slug,
            shortDescription: artist.shortDescription,
            profileImageUrl: artist.profileImageUrl,
            countryCode: artist.countryCode,
            orderRank: artist.orderRank,
            featured: artist.featured,
        }));
    },
});

export const getArtistBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const artist = await ctx.db
            .query("artists")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();

        if (!artist) return null;

        return {
            id: artist._id,
            name: artist.name,
            slug: artist.slug,
            shortDescription: artist.shortDescription,
            bio: artist.bio,
            profileImageUrl: artist.profileImageUrl,
            profileImageAlt: artist.profileImageAlt,
            socialLinks: artist.socialLinks,
            genre: artist.genre,
            countryCode: artist.countryCode,
            featured: artist.featured,
        };
    },
});

export const getArtistById = query({
    args: { id: v.id("artists") },
    handler: async (ctx, args) => {
        const artist = await ctx.db.get(args.id);
        if (!artist) return null;

        return {
            id: artist._id,
            name: artist.name,
            slug: artist.slug,
            shortDescription: artist.shortDescription,
            bio: artist.bio,
            profileImageUrl: artist.profileImageUrl,
            profileImageAlt: artist.profileImageAlt,
            socialLinks: artist.socialLinks,
            genre: artist.genre,
            countryCode: artist.countryCode,
            featured: artist.featured,
            orderRank: artist.orderRank,
        };
    },
});

export const getAllArtistsForAdmin = query({
    args: {},
    handler: async (ctx) => {
        const results = await ctx.db.query("artists").collect();
        results.sort((a, b) => a.orderRank - b.orderRank);

        return results.map((artist) => ({
            id: artist._id,
            name: artist.name,
            slug: artist.slug,
            shortDescription: artist.shortDescription,
            profileImageUrl: artist.profileImageUrl,
            profileImageAlt: artist.profileImageAlt,
            genre: artist.genre,
            countryCode: artist.countryCode,
            featured: artist.featured,
            orderRank: artist.orderRank,
        }));
    },
});

// ============================================
// Blog Posts Queries
// ============================================

export const getBlogPosts = query({
    args: {
        limit: v.optional(v.number()),
        featuredOnly: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        let results = await ctx.db
            .query("blogPosts")
            .withIndex("by_published")
            .order("desc")
            .collect();

        // Filter published posts
        results = results.filter((post) => post.published);

        if (args.featuredOnly) {
            results = results.filter((post) => post.featured);
        }

        if (args.limit) {
            results = results.slice(0, args.limit);
        }

        return results.map((post) => ({
            id: post._id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            author: post.author,
            publishedAt: formatDate(post.publishedAt),
            featuredImageUrl: post.featuredImageUrl,
            featured: post.featured,
            published: post.published,
        }));
    },
});

export const getBlogPostBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const post = await ctx.db
            .query("blogPosts")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();

        if (!post) return null;

        return {
            id: post._id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            author: post.author,
            publishedAt: formatDate(post.publishedAt),
            featuredImageUrl: post.featuredImageUrl,
            featuredImageAlt: post.featuredImageAlt,
            content: post.content,
            seo: post.seo,
            featured: post.featured,
            published: post.published,
            readingTimeMinutes: post.readingTimeMinutes,
        };
    },
});

export const getBlogPostById = query({
    args: { id: v.id("blogPosts") },
    handler: async (ctx, args) => {
        const post = await ctx.db.get(args.id);
        if (!post) return null;

        return {
            id: post._id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            author: post.author,
            publishedAt: post.publishedAt, // Raw timestamp for admin
            publishedAtFormatted: formatDate(post.publishedAt),
            featuredImageUrl: post.featuredImageUrl,
            featuredImageAlt: post.featuredImageAlt,
            content: post.content,
            seo: post.seo,
            featured: post.featured,
            published: post.published,
            readingTimeMinutes: post.readingTimeMinutes,
        };
    },
});

export const getAllBlogPostsForAdmin = query({
    args: {},
    handler: async (ctx) => {
        const results = await ctx.db
            .query("blogPosts")
            .withIndex("by_published")
            .order("desc")
            .collect();

        return results.map((post) => ({
            id: post._id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            author: post.author,
            publishedAt: post.publishedAt,
            publishedAtFormatted: formatDate(post.publishedAt),
            featuredImageUrl: post.featuredImageUrl,
            featured: post.featured,
            published: post.published,
        }));
    },
});

// ============================================
// Social Links Queries
// ============================================

export const getSocialLinks = query({
    args: {
        zone: v.optional(v.string()),
        featuredOnly: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        let results = await ctx.db
            .query("socialLinks")
            .withIndex("by_priority")
            .collect();

        if (args.zone) {
            results = results.filter((link) => link.zones.includes(args.zone!));
        }

        if (args.featuredOnly) {
            results = results.filter((link) => link.isFeatured);
        }

        // Sort by priority
        results.sort((a, b) => a.priority - b.priority);

        return results.map((link) => ({
            id: link._id,
            platform: link.platform,
            label: link.label,
            url: link.url,
            iconSlug: link.iconSlug,
            priority: link.priority,
            zones: link.zones,
            isFeatured: link.isFeatured,
        }));
    },
});

export const getSocialLinkById = query({
    args: { id: v.id("socialLinks") },
    handler: async (ctx, args) => {
        const link = await ctx.db.get(args.id);
        if (!link) return null;

        return {
            id: link._id,
            platform: link.platform,
            label: link.label,
            url: link.url,
            iconSlug: link.iconSlug,
            priority: link.priority,
            zones: link.zones,
            isFeatured: link.isFeatured,
        };
    },
});

export const getAllSocialLinksForAdmin = query({
    args: {},
    handler: async (ctx) => {
        const results = await ctx.db
            .query("socialLinks")
            .withIndex("by_priority")
            .collect();

        results.sort((a, b) => a.priority - b.priority);

        return results.map((link) => ({
            id: link._id,
            platform: link.platform,
            label: link.label,
            url: link.url,
            iconSlug: link.iconSlug,
            priority: link.priority,
            zones: link.zones,
            isFeatured: link.isFeatured,
        }));
    },
});

// ============================================
// About Page Queries
// ============================================

export const getAboutPage = query({
    args: {},
    handler: async (ctx) => {
        const page = await ctx.db.query("aboutPage").first();

        if (!page) return null;

        return {
            id: page._id,
            heroTitle: page.heroTitle,
            heroTagline: page.heroTagline,
            missionTitle: page.missionTitle,
            missionImageUrl: page.missionImageUrl,
            missionImageAlt: page.missionImageAlt,
            missionParagraph1: page.missionParagraph1,
            missionParagraph2: page.missionParagraph2,
            storyTitle: page.storyTitle,
            storyParagraph1: page.storyParagraph1,
            storyParagraph2: page.storyParagraph2,
            storyParagraph3: page.storyParagraph3,
            whatWeDoTitle: page.whatWeDoTitle,
            podcastCardTitle: page.podcastCardTitle,
            podcastCardDescription: page.podcastCardDescription,
            blogCardTitle: page.blogCardTitle,
            blogCardDescription: page.blogCardDescription,
            artistCardTitle: page.artistCardTitle,
            artistCardDescription: page.artistCardDescription,
            ctaTitle: page.ctaTitle,
            ctaDescription: page.ctaDescription,
            ctaButtonText: page.ctaButtonText,
            updatedAt: page.updatedAt,
            updatedBy: page.updatedBy,
        };
    },
});

// ============================================
// AAA Page Queries
// ============================================

export const getAAAPageData = query({
    args: {},
    handler: async (ctx) => {
        // Get settings
        const settings = await ctx.db.query("aaaPageSettings").first();

        // Get active quotes
        const quotes = await ctx.db
            .query("aaaQuotes")
            .withIndex("by_active", (q) => q.eq("active", true))
            .collect();
        quotes.sort((a, b) => a.orderRank - b.orderRank);

        // Get featured authors
        const authors = await ctx.db.query("aaaAuthors").collect();
        const featuredAuthors = authors
            .filter((a) => a.featured)
            .sort((a, b) => a.orderRank - b.orderRank);

        // Get fun facts for all authors
        const funFacts = await ctx.db.query("aaaFunFacts").collect();

        return {
            settings: settings
                ? {
                    id: settings._id,
                    heroSubtitle: settings.heroSubtitle,
                    heroDescription: settings.heroDescription,
                    powerSectionTitle: settings.powerSectionTitle,
                    powerSectionDescription: settings.powerSectionDescription,
                    curatorTitle: settings.curatorTitle,
                    curatorDescription: settings.curatorDescription,
                    storytellerTitle: settings.storytellerTitle,
                    storytellerDescription: settings.storytellerDescription,
                    connectorTitle: settings.connectorTitle,
                    connectorDescription: settings.connectorDescription,
                    ctaButtonText: settings.ctaButtonText,
                    published: settings.published,
                    publishAt: settings.publishAt,
                    unpublishAt: settings.unpublishAt,
                    updatedAt: settings.updatedAt,
                }
                : null,
            quotes: quotes.map((q) => ({
                id: q._id,
                quote: q.quote,
                authorName: q.authorName,
                orderRank: q.orderRank,
                active: q.active,
            })),
            authors: featuredAuthors.map((author) => ({
                id: author._id,
                slug: author.slug,
                name: author.name,
                fullName: author.fullName,
                role: author.role,
                colorBg: author.colorBg,
                colorText: author.colorText,
                colorBorder: author.colorBorder,
                colorShadow: author.colorShadow,
                bio: author.bio,
                profileImageUrl: author.profileImageUrl,
                profileImageAlt: author.profileImageAlt,
                orderRank: author.orderRank,
                featured: author.featured,
                funFacts: funFacts
                    .filter((f) => f.authorId === author._id)
                    .sort((a, b) => a.orderRank - b.orderRank)
                    .map((f) => ({
                        id: f._id,
                        authorId: f.authorId,
                        fact: f.fact,
                        orderRank: f.orderRank,
                    })),
            })),
        };
    },
});

export const getAAAPublishingWindow = query({
    args: {},
    handler: async (ctx) => {
        const settings = await ctx.db.query("aaaPageSettings").first();

        if (!settings) {
            return { published: false, publishAt: null, unpublishAt: null };
        }

        return {
            published: settings.published,
            publishAt: settings.publishAt,
            unpublishAt: settings.unpublishAt,
        };
    },
});

// ============================================
// AAA Admin Queries
// ============================================

export const getAAAPageSettings = query({
    args: {},
    handler: async (ctx) => {
        const settings = await ctx.db.query("aaaPageSettings").first();
        if (!settings) return null;

        return {
            id: settings._id,
            heroSubtitle: settings.heroSubtitle,
            heroDescription: settings.heroDescription,
            powerSectionTitle: settings.powerSectionTitle,
            powerSectionDescription: settings.powerSectionDescription,
            curatorTitle: settings.curatorTitle,
            curatorDescription: settings.curatorDescription,
            storytellerTitle: settings.storytellerTitle,
            storytellerDescription: settings.storytellerDescription,
            connectorTitle: settings.connectorTitle,
            connectorDescription: settings.connectorDescription,
            ctaButtonText: settings.ctaButtonText,
            published: settings.published,
            publishAt: settings.publishAt,
            unpublishAt: settings.unpublishAt,
            updatedAt: settings.updatedAt,
        };
    },
});

export const getAllAAAQuotes = query({
    args: {},
    handler: async (ctx) => {
        const results = await ctx.db.query("aaaQuotes").collect();
        results.sort((a, b) => a.orderRank - b.orderRank);

        return results.map((q) => ({
            id: q._id,
            quote: q.quote,
            authorName: q.authorName,
            orderRank: q.orderRank,
            active: q.active,
        }));
    },
});

export const getAAAQuoteById = query({
    args: { id: v.id("aaaQuotes") },
    handler: async (ctx, args) => {
        const quote = await ctx.db.get(args.id);
        if (!quote) return null;

        return {
            id: quote._id,
            quote: quote.quote,
            authorName: quote.authorName,
            orderRank: quote.orderRank,
            active: quote.active,
        };
    },
});

export const getAllAAAAuthors = query({
    args: {},
    handler: async (ctx) => {
        const results = await ctx.db.query("aaaAuthors").collect();
        results.sort((a, b) => a.orderRank - b.orderRank);

        return results.map((author) => ({
            id: author._id,
            slug: author.slug,
            name: author.name,
            fullName: author.fullName,
            role: author.role,
            colorBg: author.colorBg,
            colorText: author.colorText,
            colorBorder: author.colorBorder,
            colorShadow: author.colorShadow,
            bio: author.bio,
            profileImageUrl: author.profileImageUrl,
            profileImageAlt: author.profileImageAlt,
            orderRank: author.orderRank,
            featured: author.featured,
        }));
    },
});

export const getAAAAuthorById = query({
    args: { id: v.id("aaaAuthors") },
    handler: async (ctx, args) => {
        const author = await ctx.db.get(args.id);
        if (!author) return null;

        // Get fun facts for this author
        const funFacts = await ctx.db
            .query("aaaFunFacts")
            .withIndex("by_author", (q) => q.eq("authorId", args.id))
            .collect();
        funFacts.sort((a, b) => a.orderRank - b.orderRank);

        return {
            id: author._id,
            slug: author.slug,
            name: author.name,
            fullName: author.fullName,
            role: author.role,
            colorBg: author.colorBg,
            colorText: author.colorText,
            colorBorder: author.colorBorder,
            colorShadow: author.colorShadow,
            bio: author.bio,
            profileImageUrl: author.profileImageUrl,
            profileImageAlt: author.profileImageAlt,
            orderRank: author.orderRank,
            featured: author.featured,
            funFacts: funFacts.map((f) => ({
                id: f._id,
                fact: f.fact,
                orderRank: f.orderRank,
            })),
        };
    },
});

export const getAuthorFunFacts = query({
    args: { authorId: v.id("aaaAuthors") },
    handler: async (ctx, args) => {
        const funFacts = await ctx.db
            .query("aaaFunFacts")
            .withIndex("by_author", (q) => q.eq("authorId", args.authorId))
            .collect();
        funFacts.sort((a, b) => a.orderRank - b.orderRank);

        return funFacts.map((f) => ({
            id: f._id,
            authorId: f.authorId,
            fact: f.fact,
            orderRank: f.orderRank,
        }));
    },
});
