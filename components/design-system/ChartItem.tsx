"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface ChartItemProps {
    rank: number
    title: string
    artist: string
    coverUrl: string
    href: string
    trend?: "up" | "down" | "same" | "new"
    lastWeek?: number | string
    peakPosition?: number | string
    weeksOnChart?: number | string
    className?: string
}

export function ChartItem({
    rank,
    title,
    artist,
    coverUrl,
    href,
    trend,
    lastWeek,
    prefix = "#",
    className,
}: ChartItemProps & { prefix?: string }) {
    return (
        <Link
            href={href}
            className={cn(
                "group flex items-center gap-4 py-4 border-b border-border hover:bg-secondary/40 transition-colors px-2",
                className
            )}
        >
            {/* Rank Section */}
            <div className="flex flex-col items-center justify-center min-w-[3rem]">
                <span className="font-heading font-black text-2xl text-foreground italic">
                    {rank}
                </span>
                {trend === "new" && (
                    <span className="text-[10px] uppercase font-bold text-primary tracking-wider mt-1">
                        New
                    </span>
                )}
            </div>

            {/* Artwork */}
            <div className="relative h-16 w-16 flex-shrink-0 bg-muted overflow-hidden">
                <img
                    src={coverUrl}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Metadata */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h3 className="font-heading font-bold text-foreground text-lg truncate leading-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm font-medium truncate">
                    {artist}
                </p>
            </div>

            {/* Stats (Optional - Desktop) */}
            {lastWeek && (
                <div className="hidden md:flex flex-col items-end text-xs text-muted-foreground font-mono">
                    <span>Last Wk: {lastWeek}</span>
                </div>
            )}
        </Link>
    )
}
