"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
    title: string
    href?: string
    linkText?: string
    className?: string
}

export function SectionHeader({
    title,
    href,
    linkText = "See All",
    className,
}: SectionHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between mb-6 border-b border-border pb-2", className)}>
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tighter text-foreground">
                <span className="bg-primary w-2 h-6 inline-block mr-3 align-middle skew-x-[-10deg]"></span>
                {title}
            </h2>

            {href && (
                <Link
                    href={href}
                    className="group flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                >
                    {linkText}
                    <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            )}
        </div>
    )
}
