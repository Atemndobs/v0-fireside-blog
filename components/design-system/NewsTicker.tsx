"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface NewsItem {
  title: string
  href: string
}

interface NewsTickerProps {
  items: NewsItem[]
  className?: string
}

/**
 * Billboard-style news ticker - horizontal scrolling bar with latest updates
 * Subtle background using brand secondary color
 */
export function NewsTicker({ items, className }: NewsTickerProps) {
  if (items.length === 0) return null

  return (
    <div className={cn("bg-secondary/80 border-y border-border py-3 mb-8", className)}>
      <div className="container mx-auto px-4 flex items-center gap-6 overflow-x-auto scrollbar-hide">
        {/* Latest label - fixed on the left */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <div className="bg-primary w-1.5 h-5 skew-x-[-10deg]" />
          <span className="font-bold text-xs uppercase text-foreground tracking-wider whitespace-nowrap">
            Latest:
          </span>
        </div>
        
        {/* Scrolling news items */}
        <div className="flex gap-8 items-center">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap font-medium tracking-wide"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
