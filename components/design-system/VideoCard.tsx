"use client"

import Link from "next/link"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoCardProps {
    title: string
    thumbnailUrl: string
    duration?: string
    href: string
    category?: string
    className?: string
}

export function VideoCard({
    title,
    thumbnailUrl,
    duration,
    href,
    category,
    className,
}: VideoCardProps) {
    return (
        <Link
            href={href}
            className={cn(
                "group block relative w-full",
                className
            )}
        >
            {/* Thumbnail Container - 16:9 Aspect Ratio, Sharp Corners */}
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img
                    src={thumbnailUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-primary text-white rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play className="h-6 w-6 fill-current" />
                    </div>
                </div>

                {/* Duration Badge */}
                {duration && (
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-1.5 py-0.5 uppercase tracking-wider">
                        {duration}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="mt-3">
                {category && (
                    <div className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                        {category}
                    </div>
                )}
                <h3 className="font-heading text-foreground text-lg leading-tight uppercase font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>
            </div>
        </Link>
    )
}
