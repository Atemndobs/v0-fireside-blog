"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { LayoutGrid, List, PenSquare, Trash2, Star, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteEpisodeButton } from "@/components/admin/DeleteEpisodeButton"

interface EpisodeRow {
  id: string
  title: string
  slug: string
  published_at: string
  featured: boolean
  auto_synced?: boolean
}

interface EpisodesAdminListProps {
  episodes: EpisodeRow[]
}

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})

export function EpisodesAdminList({ episodes }: EpisodesAdminListProps) {
  const [view, setView] = useState<"cards" | "table">("cards")

  const formatDate = useMemo(() => formatter, [])

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setView("table")
    }
  }, [])

  const baseToggleClasses =
    "flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition-colors"

  const getDateLabel = (value: string | null) => {
    if (!value) return "Unscheduled"
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return "Unscheduled"
    return formatDate.format(date)
  }

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
          {episodes.map((episode) => (
            <div key={episode.id} className="rounded-xl bg-slate-900/80 px-3 py-4 shadow-sm shadow-black/10">
              <p className="text-xs uppercase tracking-wide text-slate-500">{getDateLabel(episode.published_at)}</p>
              <p className="mt-1 text-lg font-semibold text-white">{episode.title}</p>
              <p className="text-sm text-slate-400">/{episode.slug}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                {episode.featured && (
                  <Badge variant="default" className="bg-red-500 text-white">
                    Featured
                  </Badge>
                )}
                {episode.auto_synced && (
                  <Badge variant="secondary" className="bg-blue-500 text-white">
                    Auto-synced
                  </Badge>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/admin/episodes/${episode.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">
                    Edit
                  </Button>
                </Link>
                <DeleteEpisodeButton
                  id={episode.id}
                  title={episode.title}
                  className="flex-1 justify-center w-full"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table className="table-fixed text-sm">
          <TableHeader className="text-xs uppercase tracking-wide text-slate-400">
            <TableRow className="border-slate-800">
              <TableHead className="w-24 px-2 text-slate-300">Date</TableHead>
              <TableHead className="px-2 text-slate-300">Episode</TableHead>
              <TableHead className="w-24 px-2 text-center text-slate-300">Status</TableHead>
              <TableHead className="px-2 text-right text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {episodes.map((episode) => (
              <TableRow key={episode.id} className="border-slate-800">
                <TableCell className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {getDateLabel(episode.published_at)}
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="font-medium truncate">{episode.title}</div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">/{episode.slug}</div>
                </TableCell>
                <TableCell className="px-2 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {episode.featured && (
                      <span className="inline-flex items-center justify-center rounded-full bg-yellow-400/20 p-1 text-yellow-300">
                        <Star size={14} aria-label="Featured" />
                      </span>
                    )}
                    {episode.auto_synced && (
                      <span className="inline-flex items-center justify-center rounded-full bg-blue-500/20 p-1 text-blue-300">
                        <RefreshCw size={14} aria-label="Auto synced" />
                      </span>
                    )}
                    {!episode.featured && !episode.auto_synced && (
                      <span className="text-xs text-slate-500">—</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-2 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link href={`/admin/episodes/${episode.id}`} className="inline-flex">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-300 hover:bg-slate-800"
                        aria-label={`Edit ${episode.title}`}
                      >
                        <PenSquare size={16} />
                      </Button>
                    </Link>
                    <DeleteEpisodeButton
                      id={episode.id}
                      title={episode.title}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 justify-center rounded-md text-slate-300 hover:bg-slate-800"
                      aria-label={`Delete ${episode.title}`}
                    >
                      <>
                        <Trash2 size={16} />
                        <span className="sr-only">Delete {episode.title}</span>
                      </>
                    </DeleteEpisodeButton>
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
