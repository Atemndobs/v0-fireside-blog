"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { LayoutGrid, List, PenSquare, Trash2, Star, Minus, ArrowUp, ArrowDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteArtistButton } from "@/components/admin/DeleteArtistButton"

interface ArtistRow {
  id: string
  name: string
  slug: string
  short_description: string
  profile_image_url: string | null
  profile_image_alt: string | null
  order_rank: number
  featured: boolean
}

interface ArtistsAdminListProps {
  artists: ArtistRow[]
}

export function ArtistsAdminList({ artists }: ArtistsAdminListProps) {
  const [view, setView] = useState<"cards" | "table">("cards")

  const compactName = (name: string) => (name.length > 3 ? `${name.slice(0, 3)}…` : name)

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setView("table")
    }
  }, [])

  const baseToggleClasses =
    "flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition-colors"

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="inline-flex rounded-full border border-slate-700 bg-slate-800/80 p-1">
          <button
            type="button"
            onClick={() => setView("cards")}
            className={`${baseToggleClasses} ${view === "cards" ? "bg-white text-black" : "text-slate-400 hover:text-white"}`}
          >
            <LayoutGrid size={14} />
            Cards
          </button>
          <button
            type="button"
            onClick={() => setView("table")}
            className={`${baseToggleClasses} ${view === "table" ? "bg-white text-black" : "text-slate-400 hover:text-white"}`}
          >
            <List size={14} />
            Table
          </button>
        </div>
      </div>

      {view === "cards" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {artists.map((artist) => (
            <div key={artist.id} className="rounded-xl bg-slate-900/80 px-3 py-4 shadow-sm shadow-black/10">
              <div className="flex items-center gap-3">
                {artist.profile_image_url && (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={artist.profile_image_url}
                      alt={artist.profile_image_alt || artist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="font-semibold">{artist.name}</div>
                  <p className="text-sm text-slate-400">/{artist.slug}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-300">{artist.short_description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="rounded-full bg-slate-800 px-3 py-1 text-white/70">Order #{artist.order_rank}</span>
                {artist.featured && (
                  <Badge variant="default" className="bg-red-500 text-white">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/admin/artists/${artist.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">
                    Edit
                  </Button>
                </Link>
                <DeleteArtistButton
                  id={artist.id}
                  name={artist.name}
                  className="flex-1 justify-center w-full"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table className="text-sm">
          <TableHeader className="text-xs uppercase tracking-wide text-slate-400">
            <TableRow className="border-slate-800">
              <TableHead className="w-14 px-2 text-slate-300">Photo</TableHead>
              <TableHead className="w-1/3 px-2 text-slate-300">Artist</TableHead>
              <TableHead className="w-20 px-2 text-slate-300">
                <div className="flex items-center gap-1 text-slate-300">
                  <ArrowUp size={14} />
                  <ArrowDown size={14} />
                </div>
              </TableHead>
              <TableHead className="w-16 px-2 text-center text-slate-300">Status</TableHead>
              <TableHead className="px-2 text-right text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artists.map((artist) => (
              <TableRow key={artist.id} className="border-slate-800">
                <TableCell className="px-2 py-3">
                  {artist.profile_image_url && (
                    <div className="relative mt-1 h-10 w-10 overflow-hidden rounded-full lg:hidden">
                      <Image
                        src={artist.profile_image_url}
                        alt={artist.profile_image_alt || artist.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="font-medium truncate">{compactName(artist.name)}</div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">/{artist.slug}</div>
                </TableCell>
                <TableCell className="px-2 py-3 text-slate-300">{artist.order_rank}</TableCell>
                <TableCell className="px-2 py-3 text-center">
                  {artist.featured ? (
                    <span className="inline-flex items-center justify-center rounded-full bg-yellow-400/20 p-1 text-yellow-300">
                      <Star size={14} aria-label="Featured" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center rounded-full bg-slate-700/40 p-1 text-slate-400">
                      <Minus size={14} aria-label="Standard" />
                    </span>
                  )}
                </TableCell>
                <TableCell className="px-2 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link href={`/admin/artists/${artist.id}`} className="inline-flex">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-300 hover:bg-slate-800"
                        aria-label={`Edit ${artist.name}`}
                      >
                        <PenSquare size={16} />
                      </Button>
                    </Link>
                    <DeleteArtistButton
                      id={artist.id}
                      name={artist.name}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 justify-center rounded-md text-slate-300 hover:bg-slate-800"
                      aria-label={`Delete ${artist.name}`}
                    >
                      <>
                        <Trash2 size={16} />
                        <span className="sr-only">Delete {artist.name}</span>
                      </>
                    </DeleteArtistButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
