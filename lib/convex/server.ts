import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

/**
 * Convex HTTP client for Server Components
 * Use this to fetch data from Convex in Server Components and Server Actions
 */

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

const convexClient = new ConvexHttpClient(convexUrl);

/**
 * Fetch data from Convex in Server Components
 */
export async function fetchFromConvex<T>(
    queryFn: any,
    args: Record<string, any> = {}
): Promise<T> {
    return await convexClient.query(queryFn, args);
}

// ============================================
// Content Repository Functions (drop-in replacements)
// ============================================

export async function getFeaturedEpisodes(limit = 2) {
    return await convexClient.query(api.queries.getEpisodes, {
        limit,
        featuredOnly: true
    });
}

export async function getLatestEpisodes(limit = 2) {
    return await convexClient.query(api.queries.getEpisodes, { limit });
}

export async function getAllEpisodes() {
    return await convexClient.query(api.queries.getEpisodes, {});
}

export async function getEpisodeBySlug(slug: string) {
    return await convexClient.query(api.queries.getEpisodeBySlug, { slug });
}

export async function getFeaturedArtists(limit = 3) {
    return await convexClient.query(api.queries.getArtists, {
        limit,
        featuredOnly: true
    });
}

export async function getAllArtists() {
    return await convexClient.query(api.queries.getArtists, {});
}

export async function getArtistBySlug(slug: string) {
    return await convexClient.query(api.queries.getArtistBySlug, { slug });
}

export async function getLatestBlogPosts(limit = 3) {
    return await convexClient.query(api.queries.getBlogPosts, { limit });
}

export async function getAllBlogPosts() {
    return await convexClient.query(api.queries.getBlogPosts, {});
}

export async function getBlogPostBySlug(slug: string) {
    return await convexClient.query(api.queries.getBlogPostBySlug, { slug });
}

// ============================================
// Page Repository Functions
// ============================================

export async function fetchAboutPageContent() {
    const data = await convexClient.query(api.queries.getAboutPage, {});

    // Return fallback if no data
    if (!data) {
        return {
            id: "00000000-0000-0000-0000-000000000001",
            heroTitle: "The Fireside Tribe",
            heroTagline: "Celebrating and promoting Cameroonian music and Afrobeats through podcasts, articles, and artist features.",
            missionTitle: "Our Mission",
            missionImageUrl: "/images/tripleateam1.png",
            missionImageAlt: "The Fireside Tribe Podcast",
            missionParagraph1: "The Fireside Tribe was created with a singular mission: to showcase the incredible talent and rich musical heritage of Cameroon to the world.",
            missionParagraph2: "Through our podcast, blog, and artist features, we aim to create a platform that celebrates Cameroonian artists both at home and in the diaspora.",
            storyTitle: "Our Story",
            storyParagraph1: "The Fireside Tribe began as a passion project by a group of Cameroonian music enthusiasts.",
            storyParagraph2: "What started as casual conversations evolved into a podcast.",
            storyParagraph3: "Today, we're proud to be a growing community of music lovers.",
            whatWeDoTitle: "What We Do",
            podcastCardTitle: "The Podcast",
            podcastCardDescription: "Our flagship podcast features interviews with artists and producers.",
            blogCardTitle: "The Blog",
            blogCardDescription: "Our blog offers thoughtful articles and artist profiles.",
            artistCardTitle: "Artist Spotlights",
            artistCardDescription: "We regularly feature both established and emerging Cameroonian artists.",
            ctaTitle: "Join The Tribe",
            ctaDescription: "Whether you're a longtime fan or just discovering Cameroonian music, join us!",
            ctaButtonText: "LISTEN TO OUR PODCAST",
            updatedAt: null,
            updatedBy: null,
        };
    }

    return data;
}

export async function fetchAAAPageData() {
    return await convexClient.query(api.queries.getAAAPageData, {});
}

export async function getAAAPagePublishingWindow() {
    return await convexClient.query(api.queries.getAAAPublishingWindow, {});
}

// ============================================
// Social Links
// ============================================

export async function getSocialLinks(zone?: string, featuredOnly?: boolean) {
    return await convexClient.query(api.queries.getSocialLinks, {
        zone,
        featuredOnly
    });
}

// ============================================
// Admin Query Functions
// ============================================

export async function getAllArtistsForAdmin() {
    return await convexClient.query(api.queries.getAllArtistsForAdmin, {});
}

export async function getArtistById(id: string) {
    return await convexClient.query(api.queries.getArtistById, { id } as any);
}

export async function getAllEpisodesForAdmin() {
    return await convexClient.query(api.queries.getAllEpisodesForAdmin, {});
}

export async function getEpisodeById(id: string) {
    return await convexClient.query(api.queries.getEpisodeById, { id } as any);
}

export async function getAllBlogPostsForAdmin() {
    return await convexClient.query(api.queries.getAllBlogPostsForAdmin, {});
}

export async function getBlogPostById(id: string) {
    return await convexClient.query(api.queries.getBlogPostById, { id } as any);
}

export async function getAllSocialLinksForAdmin() {
    return await convexClient.query(api.queries.getAllSocialLinksForAdmin, {});
}

export async function getSocialLinkById(id: string) {
    return await convexClient.query(api.queries.getSocialLinkById, { id } as any);
}

// ============================================
// Mutation Functions (for Server Actions)
// ============================================

// Artists
export async function createArtist(data: {
    name: string;
    slug: string;
    shortDescription: string;
    profileImageUrl: string;
    profileImageAlt: string;
    genre?: string;
    countryCode?: string;
    featured: boolean;
    orderRank: number;
}) {
    return await convexClient.mutation(api.mutations.createArtist, data);
}

export async function updateArtist(id: string, data: {
    name?: string;
    slug?: string;
    shortDescription?: string;
    profileImageUrl?: string;
    profileImageAlt?: string;
    genre?: string;
    countryCode?: string;
    featured?: boolean;
    orderRank?: number;
}) {
    return await convexClient.mutation(api.mutations.updateArtist, { id, ...data } as any);
}

export async function deleteArtist(id: string) {
    return await convexClient.mutation(api.mutations.deleteArtist, { id } as any);
}

// Episodes
export async function createEpisode(data: {
    title: string;
    slug: string;
    description?: string;
    publishedAt: number;
    coverImageUrl?: string;
    coverImageAlt?: string;
    spotifyUrl?: string;
    spotifyId?: string;
    youtubeUrl?: string;
    youtubeId?: string;
    durationSeconds?: number;
    featured: boolean;
}) {
    return await convexClient.mutation(api.mutations.createEpisode, data);
}

export async function updateEpisode(id: string, data: {
    title?: string;
    slug?: string;
    description?: string;
    publishedAt?: number;
    coverImageUrl?: string;
    coverImageAlt?: string;
    spotifyUrl?: string;
    spotifyId?: string;
    youtubeUrl?: string;
    youtubeId?: string;
    durationSeconds?: number;
    featured?: boolean;
}) {
    return await convexClient.mutation(api.mutations.updateEpisode, { id, ...data } as any);
}

export async function deleteEpisode(id: string) {
    return await convexClient.mutation(api.mutations.deleteEpisode, { id } as any);
}

// Blog Posts
export async function createBlogPost(data: {
    title: string;
    slug: string;
    excerpt: string;
    author?: string;
    featuredImageUrl: string;
    featuredImageAlt: string;
    publishedAt: number;
    content?: any;
    featured: boolean;
    published: boolean;
    readingTimeMinutes?: number;
}) {
    return await convexClient.mutation(api.mutations.createBlogPost, data);
}

export async function updateBlogPost(id: string, data: {
    title?: string;
    slug?: string;
    excerpt?: string;
    author?: string;
    featuredImageUrl?: string;
    featuredImageAlt?: string;
    publishedAt?: number;
    content?: any;
    featured?: boolean;
    published?: boolean;
    readingTimeMinutes?: number;
}) {
    return await convexClient.mutation(api.mutations.updateBlogPost, { id, ...data } as any);
}

export async function deleteBlogPost(id: string) {
    return await convexClient.mutation(api.mutations.deleteBlogPost, { id } as any);
}

// Social Links
export async function createSocialLink(data: {
    platform: string;
    label: string;
    url: string;
    iconSlug?: string;
    priority: number;
    zones: string[];
    isFeatured: boolean;
}) {
    return await convexClient.mutation(api.mutations.createSocialLink, data);
}

export async function updateSocialLink(id: string, data: {
    platform?: string;
    label?: string;
    url?: string;
    iconSlug?: string;
    priority?: number;
    zones?: string[];
    isFeatured?: boolean;
}) {
    return await convexClient.mutation(api.mutations.updateSocialLink, { id, ...data } as any);
}

export async function deleteSocialLink(id: string) {
    return await convexClient.mutation(api.mutations.deleteSocialLink, { id } as any);
}

// About Page
export async function updateAboutPage(data: {
    heroTitle?: string;
    heroTagline?: string;
    missionTitle?: string;
    missionImageUrl?: string;
    missionImageAlt?: string;
    missionParagraph1?: string;
    missionParagraph2?: string;
    storyTitle?: string;
    storyParagraph1?: string;
    storyParagraph2?: string;
    storyParagraph3?: string;
    whatWeDoTitle?: string;
    podcastCardTitle?: string;
    podcastCardDescription?: string;
    blogCardTitle?: string;
    blogCardDescription?: string;
    artistCardTitle?: string;
    artistCardDescription?: string;
    ctaTitle?: string;
    ctaDescription?: string;
    ctaButtonText?: string;
    updatedBy?: string;
}) {
    return await convexClient.mutation(api.mutations.updateAboutPage, data);
}

// AAA Page
export async function getAAAPageSettings() {
    return await convexClient.query(api.queries.getAAAPageSettings, {});
}

export async function updateAAAPageSettings(data: {
    heroSubtitle?: string;
    heroDescription?: string;
    powerSectionTitle?: string;
    powerSectionDescription?: string;
    curatorTitle?: string;
    curatorDescription?: string;
    storytellerTitle?: string;
    storytellerDescription?: string;
    connectorTitle?: string;
    connectorDescription?: string;
    ctaButtonText?: string;
    published?: boolean;
    publishAt?: number;
    unpublishAt?: number;
}) {
    return await convexClient.mutation(api.mutations.updateAAAPageSettings, data);
}

// AAA Quotes
export async function getAllAAAQuotes() {
    return await convexClient.query(api.queries.getAllAAAQuotes, {});
}

export async function getAAAQuoteById(id: string) {
    return await convexClient.query(api.queries.getAAAQuoteById, { id } as any);
}

export async function createAAAQuote(data: {
    quote: string;
    authorName: string;
    orderRank: number;
    active: boolean;
}) {
    return await convexClient.mutation(api.mutations.createAAAQuote, data);
}

export async function updateAAAQuote(id: string, data: {
    quote?: string;
    authorName?: string;
    orderRank?: number;
    active?: boolean;
}) {
    return await convexClient.mutation(api.mutations.updateAAAQuote, { id, ...data } as any);
}

export async function deleteAAAQuote(id: string) {
    return await convexClient.mutation(api.mutations.deleteAAAQuote, { id } as any);
}

// AAA Authors
export async function getAllAAAAuthors() {
    return await convexClient.query(api.queries.getAllAAAAuthors, {});
}

export async function getAAAAuthorById(id: string) {
    return await convexClient.query(api.queries.getAAAAuthorById, { id } as any);
}

export async function createAAAAuthor(data: {
    slug: string;
    name: string;
    fullName: string;
    role: string;
    colorBg: string;
    colorText: string;
    colorBorder: string;
    colorShadow: string;
    bio: string;
    profileImageUrl?: string;
    profileImageAlt?: string;
    orderRank: number;
    featured: boolean;
}) {
    return await convexClient.mutation(api.mutations.createAAAAuthor, data);
}

export async function updateAAAAuthor(id: string, data: {
    slug?: string;
    name?: string;
    fullName?: string;
    role?: string;
    colorBg?: string;
    colorText?: string;
    colorBorder?: string;
    colorShadow?: string;
    bio?: string;
    profileImageUrl?: string;
    profileImageAlt?: string;
    orderRank?: number;
    featured?: boolean;
}) {
    return await convexClient.mutation(api.mutations.updateAAAAuthor, { id, ...data } as any);
}

export async function deleteAAAAuthor(id: string) {
    return await convexClient.mutation(api.mutations.deleteAAAAuthor, { id } as any);
}

// AAA Fun Facts
export async function getAuthorFunFacts(authorId: string) {
    return await convexClient.query(api.queries.getAuthorFunFacts, { authorId } as any);
}

export async function replaceAuthorFunFacts(authorId: string, funFacts: { fact: string; orderRank: number }[]) {
    return await convexClient.mutation(api.mutations.replaceAuthorFunFacts, { authorId, funFacts } as any);
}
