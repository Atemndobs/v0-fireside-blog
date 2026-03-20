"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Youtube, Instagram } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// TikTok icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )
}

interface MultiPlatformHeroProps {
  tiktokVideoIds: string[]
  youtubeVideoIds: string[]
  instagramUsername: string
  autoPlayInterval?: number
  className?: string
}

type PlatformSlide = "tiktok" | "instagram" | "youtube"

const platforms: { id: PlatformSlide; label: string; color: string }[] = [
  { id: "tiktok", label: "TikTok", color: "from-black to-[#25F4EE]" },
  { id: "instagram", label: "Instagram", color: "from-[#833AB4] via-[#FD1D1D] to-[#F77737]" },
  { id: "youtube", label: "YouTube", color: "from-[#FF0000] to-[#282828]" },
]

export function MultiPlatformHero({
  tiktokVideoIds,
  youtubeVideoIds,
  instagramUsername,
  autoPlayInterval = 8000,
  className,
}: MultiPlatformHeroProps) {
  const [currentPlatform, setCurrentPlatform] = useState<number>(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentPlatform((prev) => (prev + 1) % platforms.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentPlatform((prev) => (prev - 1 + platforms.length) % platforms.length)
  }, [])

  // Auto-play
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide, autoPlayInterval])

  const platform = platforms[currentPlatform]

  return (
    <section
      className={cn("relative w-full bg-background overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Platform Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-3"
                >
                  {platform.id === "tiktok" && <TikTokIcon className="w-6 h-6" />}
                  {platform.id === "instagram" && <Instagram className="w-6 h-6" />}
                  {platform.id === "youtube" && <Youtube className="w-6 h-6 text-red-500" />}
                  <span className="font-heading font-bold text-lg uppercase tracking-wide">
                    {platform.label}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Platform Pills */}
            <div className="flex items-center gap-2">
              {platforms.map((p, index) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentPlatform(index)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-full transition-all",
                    index === currentPlatform
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[400px] md:min-h-[500px]">
        <AnimatePresence mode="wait">
          {platform.id === "tiktok" && (
            <motion.div
              key="tiktok"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="p-4 md:p-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
                {tiktokVideoIds.slice(0, 4).map((videoId, index) => (
                  <div
                    key={videoId}
                    className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-xl"
                  >
                    <iframe
                      src={`https://www.tiktok.com/embed/v2/${videoId}?lang=en-US`}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                      allow="encrypted-media"
                    />
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-4 text-sm">
                Follow us on TikTok{" "}
                <a
                  href="https://www.tiktok.com/@thefiresidetribe1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  @thefiresidetribe1
                </a>
              </p>
            </motion.div>
          )}

          {platform.id === "instagram" && (
            <motion.div
              key="instagram"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="p-4 md:p-8"
            >
              <div className="max-w-4xl mx-auto">
                {/* Instagram Embed using LightWidget or similar */}
                <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-1 rounded-2xl">
                  <div className="bg-background rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-0.5">
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                          <Instagram className="w-8 h-8" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">@{instagramUsername}</h3>
                        <p className="text-muted-foreground text-sm">The Fireside Tribe</p>
                      </div>
                      <a
                        href={`https://www.instagram.com/${instagramUsername}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition"
                      >
                        Follow
                      </a>
                    </div>

                    {/* Instagram Feed Placeholder - Replace with actual embed */}
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <a
                          key={i}
                          href={`https://www.instagram.com/${instagramUsername}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aspect-square bg-secondary rounded-lg overflow-hidden hover:opacity-80 transition group"
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <Instagram className="w-8 h-8 text-muted-foreground group-hover:scale-110 transition" />
                          </div>
                        </a>
                      ))}
                    </div>

                    <p className="text-center text-muted-foreground mt-4 text-sm">
                      View our latest posts on Instagram
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {platform.id === "youtube" && (
            <motion.div
              key="youtube"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="p-4 md:p-8"
            >
              <div className="max-w-6xl mx-auto">
                {/* Featured Video */}
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoIds[0]}?rel=0`}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>

                {/* Video Thumbnails */}
                <div className="grid grid-cols-3 gap-3">
                  {youtubeVideoIds.slice(1, 4).map((videoId) => (
                    <a
                      key={videoId}
                      href={`https://www.youtube.com/watch?v=${videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-video bg-black rounded-lg overflow-hidden group"
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <p className="text-center text-muted-foreground mt-4 text-sm">
                  Subscribe on YouTube{" "}
                  <a
                    href="https://youtube.com/@TheFiresideTribe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline font-semibold"
                  >
                    @TheFiresideTribe
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        aria-label="Previous platform"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        aria-label="Next platform"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Progress Bar */}
      {!isPaused && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            key={currentPlatform}
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
