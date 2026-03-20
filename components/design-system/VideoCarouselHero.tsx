"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface VideoSlide {
  title: string
  description?: string
  thumbnailUrl: string
  href: string
  label?: string
}

interface VideoCarouselHeroProps {
  slides: VideoSlide[]
  autoPlayInterval?: number
  className?: string
}

// Truncate description helper
function truncateDescription(text: string, maxLength = 150): string {
  if (!text) return ""
  let cleaned = text
    .replace(/#\w+/g, "")
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
    .replace(/[✨🔥🎵🎤💡]/g, "")
    .replace(/\s+/g, " ")
    .trim()
  const stopMarkers = ["Topics Covered", "Join the", "Subscribe", "Follow us"]
  for (const marker of stopMarkers) {
    const idx = cleaned.indexOf(marker)
    if (idx > 0) cleaned = cleaned.substring(0, idx).trim()
  }
  if (cleaned.length <= maxLength) return cleaned
  return cleaned.substring(0, maxLength).trim() + "..."
}

export function VideoCarouselHero({
  slides,
  autoPlayInterval = 6000,
  className,
}: VideoCarouselHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play
  useEffect(() => {
    if (isPaused || slides.length <= 1) return
    const timer = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide, autoPlayInterval, slides.length])

  if (!slides.length) return null

  const currentSlide = slides[currentIndex]
  const truncatedDesc = currentSlide.description ? truncateDescription(currentSlide.description) : ""

  return (
    <section
      className={cn("relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={currentSlide.thumbnailUrl}
            alt={currentSlide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent" />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-6 md:px-12 py-8 md:py-12 z-10">
        <div className="max-w-2xl">
          {/* Label Badge */}
          <motion.div
            key={`label-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block bg-primary text-primary-foreground text-xs md:text-sm font-bold uppercase tracking-widest px-3 py-1 mb-4"
          >
            {currentSlide.label || "Latest Episode"}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-heading font-black text-2xl md:text-4xl lg:text-5xl text-white uppercase leading-[0.95] mb-4 drop-shadow-lg"
            >
              {currentSlide.title}
            </motion.h1>
          </AnimatePresence>

          {truncatedDesc && (
            <motion.p
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:block text-white/60 text-sm md:text-base max-w-lg mb-6"
            >
              {truncatedDesc}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href={currentSlide.href}
              className="inline-flex items-center gap-3 bg-white text-black hover:bg-primary hover:text-white transition-colors font-bold uppercase tracking-wide px-6 py-3 text-sm"
            >
              <Play className="h-4 w-4 fill-current" />
              Watch Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary w-6 md:w-8"
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {slides.length > 1 && !isPaused && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
            className="h-full bg-primary"
          />
        </div>
      )}
    </section>
  )
}
