"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeroFeature {
  title: string
  excerpt?: string
  imageUrl: string
  href: string
  category: string
}

interface BillboardHeroProps {
  mainFeature: HeroFeature
  secondaryFeatures: HeroFeature[]
  className?: string
}

/**
 * Billboard-style hero section with large main feature and stacked secondary features
 * Matches Billboard.com's magazine-style layout with Fireside brand colors
 */
export function BillboardHero({ mainFeature, secondaryFeatures, className }: BillboardHeroProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8", className)}>
      {/* Main Feature - Takes 2 columns on desktop */}
      <Link 
        href={mainFeature.href}
        className="lg:col-span-2 group relative overflow-hidden aspect-[16/9] lg:aspect-[21/9] bg-muted"
      >
        <Image
          src={mainFeature.imageUrl}
          alt={mainFeature.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
          <span className="inline-block bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold uppercase tracking-wider mb-3 skew-x-[-5deg]">
            {mainFeature.category}
          </span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 leading-tight tracking-tighter uppercase">
            {mainFeature.title}
          </h1>
          {mainFeature.excerpt && (
            <p className="text-gray-200 text-base md:text-lg leading-relaxed line-clamp-2 max-w-3xl">
              {mainFeature.excerpt}
            </p>
          )}
        </div>
      </Link>

      {/* Secondary Features - Stack vertically */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {secondaryFeatures.slice(0, 2).map((feature, index) => (
          <Link
            key={index}
            href={feature.href}
            className="group relative overflow-hidden aspect-[16/9] bg-muted"
          >
            <Image
              src={feature.imageUrl}
              alt={feature.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
            
            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <span className="inline-block bg-primary text-primary-foreground px-2.5 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2 skew-x-[-5deg]">
                {feature.category}
              </span>
              <h3 className="font-heading text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight line-clamp-2 tracking-tight uppercase">
                {feature.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
