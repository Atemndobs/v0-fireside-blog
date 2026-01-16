import { mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

/**
 * Migration functions to import data from Supabase JSON export
 * 
 * Run these in order:
 * 1. importArtists
 * 2. importEpisodes
 * 3. importBlogPosts
 * 4. importSocialLinks
 * 5. importAboutPage
 * 6. importAaaAuthors
 * 7. importAaaFunFacts (after authors are imported)
 * 8. importAaaPageSettings
 * 9. importAaaQuotes
 */

// Helper to convert ISO date string to Unix timestamp
function isoToTimestamp(isoString: string | null | undefined): number {
    if (!isoString) return Date.now();
    return new Date(isoString).getTime();
}

// Import Artists
export const importArtists = mutation({
    args: {
        artists: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        const results = [];
        for (const artist of args.artists) {
            const id = await ctx.db.insert("artists", {
                supabaseId: artist.id,
                name: artist.name,
                slug: artist.slug,
                shortDescription: artist.short_description,
                bio: artist.bio || [],
                profileImageUrl: artist.profile_image_url,
                profileImageAlt: artist.profile_image_alt,
                socialLinks: artist.social_links || {},
                genre: artist.genre || undefined,
                featured: artist.featured ?? false,
                orderRank: artist.order_rank ?? 0,
                countryCode: artist.country_code || undefined,
                createdAt: isoToTimestamp(artist.created_at),
                updatedAt: isoToTimestamp(artist.updated_at),
            });
            results.push({ supabaseId: artist.id, convexId: id });
        }
        return results;
    },
});

// Import Episodes
export const importEpisodes = mutation({
    args: {
        episodes: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        const results = [];
        for (const episode of args.episodes) {
            const id = await ctx.db.insert("episodes", {
                supabaseId: episode.id,
                title: episode.title,
                slug: episode.slug,
                description: episode.description || undefined,
                publishedAt: isoToTimestamp(episode.published_at),
                coverImageUrl: episode.cover_image_url || undefined,
                coverImageAlt: episode.cover_image_alt || undefined,
                spotifyUrl: episode.spotify_url || undefined,
                spotifyId: episode.spotify_id || undefined,
                youtubeUrl: episode.youtube_url || undefined,
                youtubeId: episode.youtube_id || undefined,
                durationSeconds: episode.duration_seconds || undefined,
                showNotes: episode.show_notes || [],
                featured: episode.featured ?? false,
                autoSynced: episode.auto_synced ?? false,
                lastSyncedAt: episode.last_synced_at ? isoToTimestamp(episode.last_synced_at) : undefined,
                seo: episode.seo || {},
                createdAt: isoToTimestamp(episode.created_at),
                updatedAt: isoToTimestamp(episode.updated_at),
            });
            results.push({ supabaseId: episode.id, convexId: id });
        }
        return results;
    },
});

// Import Blog Posts
export const importBlogPosts = mutation({
    args: {
        blogPosts: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        const results = [];
        for (const post of args.blogPosts) {
            const id = await ctx.db.insert("blogPosts", {
                supabaseId: post.id,
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                author: post.author || "The Fireside Tribe",
                featuredImageUrl: post.featured_image_url,
                featuredImageAlt: post.featured_image_alt,
                publishedAt: isoToTimestamp(post.published_at),
                content: post.content || [],
                seo: post.seo || {},
                featured: post.featured ?? false,
                published: post.published ?? true,
                readingTimeMinutes: post.reading_time_minutes || undefined,
                createdAt: isoToTimestamp(post.created_at),
                updatedAt: isoToTimestamp(post.updated_at),
            });
            results.push({ supabaseId: post.id, convexId: id });
        }
        return results;
    },
});

// Import Social Links
export const importSocialLinks = mutation({
    args: {
        socialLinks: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        const results = [];
        for (const link of args.socialLinks) {
            const id = await ctx.db.insert("socialLinks", {
                supabaseId: link.id,
                platform: link.platform,
                label: link.label,
                url: link.url,
                iconSlug: link.icon_slug || undefined,
                priority: link.priority ?? 0,
                zones: link.zones || [],
                isFeatured: link.is_featured ?? false,
                createdAt: isoToTimestamp(link.created_at),
                updatedAt: isoToTimestamp(link.updated_at),
            });
            results.push({ supabaseId: link.id, convexId: id });
        }
        return results;
    },
});

// Import About Page
export const importAboutPage = mutation({
    args: {
        aboutPage: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        const results = [];
        for (const page of args.aboutPage) {
            const id = await ctx.db.insert("aboutPage", {
                supabaseId: page.id,
                heroTitle: page.hero_title,
                heroTagline: page.hero_tagline,
                missionTitle: page.mission_title,
                missionImageUrl: page.mission_image_url || undefined,
                missionImageAlt: page.mission_image_alt || undefined,
                missionParagraph1: page.mission_paragraph_1,
                missionParagraph2: page.mission_paragraph_2,
                storyTitle: page.story_title,
                storyParagraph1: page.story_paragraph_1,
                storyParagraph2: page.story_paragraph_2,
                storyParagraph3: page.story_paragraph_3,
                whatWeDoTitle: page.what_we_do_title,
                podcastCardTitle: page.podcast_card_title,
                podcastCardDescription: page.podcast_card_description,
                blogCardTitle: page.blog_card_title,
                blogCardDescription: page.blog_card_description,
                artistCardTitle: page.artist_card_title,
                artistCardDescription: page.artist_card_description,
                ctaTitle: page.cta_title,
                ctaDescription: page.cta_description,
                ctaButtonText: page.cta_button_text,
                updatedBy: page.updated_by || undefined,
                updatedAt: isoToTimestamp(page.updated_at),
            });
            results.push({ supabaseId: page.id, convexId: id });
        }
        return results;
    },
});

// Import AAA Authors
export const importAaaAuthors = mutation({
    args: {
        authors: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        const results = [];
        for (const author of args.authors) {
            const id = await ctx.db.insert("aaaAuthors", {
                supabaseId: author.id,
                slug: author.slug,
                name: author.name,
                fullName: author.full_name,
                role: author.role,
                colorBg: author.color_bg,
                colorText: author.color_text,
                colorBorder: author.color_border,
                colorShadow: author.color_shadow,
                bio: author.bio,
                profileImageUrl: author.profile_image_url || undefined,
                profileImageAlt: author.profile_image_alt || undefined,
                orderRank: author.order_rank ?? 0,
                featured: author.featured ?? true,
                createdAt: isoToTimestamp(author.created_at),
                updatedAt: isoToTimestamp(author.updated_at),
            });
            results.push({ supabaseId: author.id, convexId: id });
        }
        return results;
    },
});

// Import AAA Fun Facts (requires authors to be imported first)
export const importAaaFunFacts = mutation({
    args: {
        funFacts: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        const results = [];
        const errors = [];

        for (const fact of args.funFacts) {
            // Look up the Convex author ID by Supabase author ID
            const author = await ctx.db
                .query("aaaAuthors")
                .withIndex("by_supabaseId", (q) => q.eq("supabaseId", fact.author_id))
                .first();

            if (!author) {
                errors.push({
                    supabaseId: fact.id,
                    error: `Author not found for supabase ID: ${fact.author_id}`
                });
                continue;
            }

            const id = await ctx.db.insert("aaaFunFacts", {
                supabaseId: fact.id,
                authorId: author._id,
                supabaseAuthorId: fact.author_id,
                fact: fact.fact,
                orderRank: fact.order_rank ?? 0,
                createdAt: isoToTimestamp(fact.created_at),
            });
            results.push({ supabaseId: fact.id, convexId: id });
        }

        return { results, errors };
    },
});

// Import AAA Page Settings
export const importAaaPageSettings = mutation({
    args: {
        pageSettings: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        const results = [];
        for (const settings of args.pageSettings) {
            const id = await ctx.db.insert("aaaPageSettings", {
                supabaseId: settings.id,
                heroSubtitle: settings.hero_subtitle,
                heroDescription: settings.hero_description,
                powerSectionTitle: settings.power_section_title,
                powerSectionDescription: settings.power_section_description,
                curatorTitle: settings.curator_title,
                curatorDescription: settings.curator_description,
                storytellerTitle: settings.storyteller_title,
                storytellerDescription: settings.storyteller_description,
                connectorTitle: settings.connector_title,
                connectorDescription: settings.connector_description,
                ctaButtonText: settings.cta_button_text,
                published: settings.published ?? false,
                publishAt: settings.publish_at ? isoToTimestamp(settings.publish_at) : undefined,
                unpublishAt: settings.unpublish_at ? isoToTimestamp(settings.unpublish_at) : undefined,
                updatedAt: isoToTimestamp(settings.updated_at),
            });
            results.push({ supabaseId: settings.id, convexId: id });
        }
        return results;
    },
});

// Import AAA Quotes
export const importAaaQuotes = mutation({
    args: {
        quotes: v.array(v.any()),
    },
    handler: async (ctx, args) => {
        const results = [];
        for (const quote of args.quotes) {
            const id = await ctx.db.insert("aaaQuotes", {
                supabaseId: quote.id,
                quote: quote.quote,
                authorName: quote.author_name,
                orderRank: quote.order_rank ?? 0,
                active: quote.active ?? true,
                createdAt: isoToTimestamp(quote.created_at),
                updatedAt: isoToTimestamp(quote.updated_at),
            });
            results.push({ supabaseId: quote.id, convexId: id });
        }
        return results;
    },
});

// Clear all data (for re-running migration)
export const clearAllData = mutation({
    args: {},
    handler: async (ctx) => {
        const tables = [
            "aaaFunFacts", // Delete first due to foreign key
            "aaaAuthors",
            "aaaQuotes",
            "aaaPageSettings",
            "aboutPage",
            "socialLinks",
            "blogPosts",
            "episodes",
            "artists",
        ];

        const counts: Record<string, number> = {};

        for (const table of tables) {
            const docs = await ctx.db.query(table as any).collect();
            for (const doc of docs) {
                await ctx.db.delete(doc._id);
            }
            counts[table] = docs.length;
        }

        return counts;
    },
});
