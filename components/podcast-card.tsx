"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Music, Youtube } from "lucide-react"

interface PodcastCardProps {
  title: string
  description: string
  date: string
  spotifyUrl: string
  youtubeUrl: string
  imageSrc: string
  slug: string
}

export function PodcastCard({ title, description, date, spotifyUrl, youtubeUrl, imageSrc, slug }: PodcastCardProps) {
  const [activeTab, setActiveTab] = useState<"spotify" | "youtube">("youtube")

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url: string) => {
    if (!url) return ""

    // Handle youtu.be/VIDEO_ID format
    if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1]?.split("?")[0] || ""
    }

    // Handle youtube.com/watch?v=VIDEO_ID format
    if (url.includes("watch?v=")) {
      const urlParams = new URLSearchParams(url.split("?")[1])
      return urlParams.get("v") || ""
    }

    // Fallback to splitting by /
    return url.split("/").pop()?.split("?")[0] || ""
  }

  // Truncate description to approximately 150 characters
  const truncatedDescription = description.length > 150
    ? description.substring(0, 150) + "..."
    : description

  return (
    <div className="bg-card border border-border p-3 md:p-6 shadow-lg hover:shadow-xl transition-all">
      <div className="flex flex-col gap-2 md:gap-4">
        <Link href={`/episodes/${slug}`} className="block">
          <div className="relative h-[120px] md:h-[200px] border border-border overflow-hidden">
            <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>

          <h3 className="text-sm md:text-2xl font-bold line-clamp-2 mt-2 md:mt-0">{title}</h3>

          <div className="flex items-center gap-2 text-muted-foreground text-xs md:text-base mt-1 md:mt-0">
            <Calendar size={16} />
            <span>{date}</span>
          </div>

          <p className="text-muted-foreground line-clamp-2 text-xs md:text-base mt-1 md:mt-0">{truncatedDescription}</p>
        </Link>

        <div className="mt-2 md:mt-4 hidden md:block">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("spotify")}
              className={`flex-1 py-2 font-bold transition-colors ${activeTab === "spotify" ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Music size={18} />
                Spotify
              </div>
            </button>
            <button
              onClick={() => setActiveTab("youtube")}
              className={`flex-1 py-2 font-bold transition-colors ${activeTab === "youtube" ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Youtube size={18} />
                YouTube
              </div>
            </button>
          </div>

          <div className="mt-4 h-[152px]">
            {activeTab === "spotify" ? (
              <iframe
                src={`https://open.spotify.com/embed/episode/${spotifyUrl.split("/").pop()?.split("?")[0]}`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="encrypted-media"
                className="border border-border"
              ></iframe>
            ) : (
              <iframe
                width="100%"
                height="152"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border border-border"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
