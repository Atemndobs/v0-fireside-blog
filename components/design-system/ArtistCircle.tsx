"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface ArtistCircleProps {
    name: string
    imageUrl: string
    href: string
    className?: string
}

export function ArtistCircle({
    name,
    imageUrl,
    href,
    className,
}: ArtistCircleProps) {
    return (
        <Link
            href={href}
            className={cn(
                "group flex flex-col items-center gap-2 min-w-[5rem]",
                className
            )}
        >
            <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full p-[2px] bg-gradient-to-tr from-primary to-primary/20 group-hover:from-foreground group-hover:to-foreground transition-all duration-300">
                <div className="h-full w-full rounded-full border-2 border-border overflow-hidden bg-background">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            </div>
            <span className="text-foreground text-xs md:text-sm font-medium text-center line-clamp-2 max-w-[6rem] group-hover:text-primary transition-colors">
                {name}
            </span>
        </Link>
    )
}
