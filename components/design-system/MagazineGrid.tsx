"use client"

import Link from "next/link"
import Image from "next/image"
import { formatDate, cn } from "@/lib/utils"

interface GridItem {
  title: string
  excerpt?: string
  imageUrl: string
  href: string
  category: string
  publishedAt: string
}

interface MagazineGridProps {
  items: GridItem[]
  className?: string
}

/**
 * Billboard-style magazine grid with varied card sizes
 * First item spans 2 columns and 2 rows (featured large item)
 * Remaining items in standard grid layout
 */
export function MagazineGrid({ items, className }: MagazineGridProps) {
  if (items.length === 0) return null

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {items.map((item, index) => {
        // First item is always large and featured
        const isLarge = index === 0
        
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group",
              isLarge && "md:col-span-2 md:row-span-2"
            )}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-[16/9] mb-3 bg-muted">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes={isLarge 
                  ? "(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 66vw"
                  : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />
            </div>
            
            {/* Content */}
            <div>
              {/* Category Badge */}
              <span className="inline-block bg-secondary text-secondary-foreground border border-border px-2.5 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 skew-x-[-5deg]">
                {item.category}
              </span>
              
              {/* Title */}
              <h3 className={cn(
                "font-heading font-bold group-hover:text-primary transition-colors leading-tight mb-2 uppercase tracking-tight",
                isLarge ? "text-2xl md:text-3xl lg:text-4xl" : "text-lg md:text-xl"
              )}>
                {item.title}
              </h3>
              
              {/* Excerpt (only for large featured item) */}
              {isLarge && item.excerpt && (
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-2 mb-3">
                  {item.excerpt}
                </p>
              )}
              
              {/* Timestamp */}
              <time className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                {formatDate(item.publishedAt)}
              </time>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
