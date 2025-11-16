"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Music, Youtube } from "lucide-react"

interface PodcastCardProps {
  title: string
  description: string
  date: string
  spotifyUrl: string
  youtubeUrl: string
  imageSrc: string
}

export function PodcastCard({ title, description, date, spotifyUrl, youtubeUrl, imageSrc }: PodcastCardProps) {
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
    <div className="bg-white border-4 border-black p-3 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="relative h-[120px] md:h-[200px] border-2 md:border-4 border-black overflow-hidden">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>

        <h3 className="text-sm md:text-2xl font-bold line-clamp-2">{title}</h3>

        <div className="hidden md:flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          <span>{date}</span>
        </div>

        <p className="hidden md:block text-gray-700 line-clamp-2">{truncatedDescription}</p>

        <div className="mt-2 md:mt-4 hidden md:block">
          <div className="flex border-b-4 border-black">
            <button
              onClick={() => setActiveTab("spotify")}
              className={`flex-1 py-2 font-bold ${activeTab === "spotify" ? "bg-green-500 text-white" : "bg-gray-100"}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Music size={18} />
                Spotify
              </div>
            </button>
            <button
              onClick={() => setActiveTab("youtube")}
              className={`flex-1 py-2 font-bold ${activeTab === "youtube" ? "bg-red-500 text-white" : "bg-gray-100"}`}
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
                className="border-2 border-black"
              ></iframe>
            ) : (
              <iframe
                width="100%"
                height="152"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-2 border-black"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
