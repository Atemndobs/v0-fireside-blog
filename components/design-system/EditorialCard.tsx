"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface EditorialCardProps {
    title: string
    excerpt?: string
    author?: string
    date?: string
    imageUrl: string
    href: string
    category?: string
    variant?: "featured" | "standard" | "compact"
    className?: string
}

export function EditorialCard({
    title,
    excerpt,
    author,
    date,
    imageUrl,
    href,
    category,
    variant = "standard",
    className,
}: EditorialCardProps) {

    if (variant === "featured") {
        return (
            <Link href={href} className={cn("group block grid grid-cols-1 md:grid-cols-12 gap-6", className)}>
                <div className="md:col-span-8 relative aspect-[3/2] overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                </div>
                <div className="md:col-span-4 flex flex-col justify-center border-t md:border-t-0 border-primary/20 pt-4 md:pt-0">
                    {category && (
                        <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                            {category}
                        </span>
                    )}
                    <h3 className="font-editorial text-2xl md:text-4xl text-foreground leading-tight mb-4 group-hover:underline decoration-primary decoration-2 underline-offset-4">
                        {title}
                    </h3>
                    {excerpt && (
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                            {excerpt}
                        </p>
                    )}
                    <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        {author && <span className="text-foreground">{author}</span>}
                        {author && date && <span>•</span>}
                        {date && <span>{date}</span>}
                    </div>
                </div>
            </Link>
        )
    }

    if (variant === "compact") {
        return (
            <Link href={href} className={cn("group flex gap-4 items-start", className)}>
                <div className="w-24 h-24 flex-shrink-0 bg-muted overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="flex-1">
                    {category && (
                        <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1 block">
                            {category}
                        </span>
                    )}
                    <h3 className="font-editorial text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <div className="mt-2 text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                        {author && <span>by {author}</span>}
                    </div>
                </div>
            </Link>
        )
    }

    // Standard (Vertical Stack)
    return (
        <Link href={href} className={cn("group block", className)}>
            <div className="relative aspect-[4/3] w-full overflow-hidden mb-4 bg-muted border-b-2 border-transparent group-hover:border-primary transition-colors">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div>
                {category && (
                    <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">
                        {category}
                    </span>
                )}
                <h3 className="font-editorial text-xl md:text-2xl text-foreground leading-tight mb-2 group-hover:underline decoration-primary decoration-1 underline-offset-4">
                    {title}
                </h3>
                {excerpt && (
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {excerpt}
                    </p>
                )}
            </div>
        </Link>
    )
}
