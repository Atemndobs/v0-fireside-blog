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
  const [activeTab, setActiveTab] = useState<"spotify" | "youtube">("spotify")

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
      <div className="flex flex-col gap-4">
        <div className="relative h-[200px] border-4 border-black overflow-hidden">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>

        <h3 className="text-2xl font-bold">{title}</h3>

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          <span>{date}</span>
        </div>

        <p className="text-gray-700">{description}</p>

        <div className="mt-4">
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
                src={`https://www.youtube.com/embed/${youtubeUrl.split("/").pop()}`}
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
