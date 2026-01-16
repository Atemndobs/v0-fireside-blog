"use client"

import Link from "next/link"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeaturedVideoHeroProps {
    title: string
    subtitle?: string
    description?: string
    thumbnailUrl: string
    href: string
    label?: string
    className?: string
}

// Truncate description: remove hashtags/emojis, get first 1-2 sentences
function truncateDescription(text: string, maxLength = 150): string {
    if (!text) return ""
    // Remove hashtags and common emojis
    let cleaned = text
        .replace(/#\w+/g, "")
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
        .replace(/[✨🔥🎵🎤💡]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    // Stop at "Topics Covered" or similar markers
    const stopMarkers = ["Topics Covered", "Join the", "Subscribe", "Follow us"]
    for (const marker of stopMarkers) {
        const idx = cleaned.indexOf(marker)
        if (idx > 0) cleaned = cleaned.substring(0, idx).trim()
    }
    // Get first sentence if short enough
    const sentences = cleaned.match(/[^.!?]+[.!?]+/g)
    if (sentences && sentences[0] && sentences[0].length <= maxLength) {
        return sentences[0].trim()
    }
    if (cleaned.length <= maxLength) return cleaned
    return cleaned.substring(0, maxLength).trim() + "..."
}

export function FeaturedVideoHero({
    title,
    subtitle,
    description,
    thumbnailUrl,
    href,
    label = "Featured Episode",
    className,
}: FeaturedVideoHeroProps) {
    const truncatedDesc = description ? truncateDescription(description) : ""

    return (
        <section className={cn("relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden group", className)}>
            {/* Background Image */}
            <img
                src={thumbnailUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-6 md:px-12 py-8 md:py-12 z-10">
                <div className="max-w-2xl">
                    {/* Label Badge */}
                    <div className="inline-block bg-primary text-primary-foreground text-xs md:text-sm font-bold uppercase tracking-widest px-3 py-1 mb-4">
                        {label}
                    </div>

                    <h1 className="font-heading font-black text-2xl md:text-4xl lg:text-5xl text-white uppercase leading-[0.95] mb-4 drop-shadow-lg">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="text-white/80 text-base md:text-lg font-medium mb-3 italic">
                            {subtitle}
                        </p>
                    )}

                    {truncatedDesc && (
                        <p className="hidden md:block text-white/60 text-sm md:text-base max-w-lg mb-6">
                            {truncatedDesc}
                        </p>
                    )}

                    <Link
                        href={href}
                        className="inline-flex items-center gap-3 bg-white text-black hover:bg-primary hover:text-white transition-colors font-bold uppercase tracking-wide px-6 py-3 text-sm group/btn"
                    >
                        <Play className="h-4 w-4 fill-current" />
                        Watch Now
                    </Link>
                </div>
            </div>
        </section>
    )
}
