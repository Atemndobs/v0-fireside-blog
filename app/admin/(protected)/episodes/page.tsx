import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getAllEpisodesForAdmin } from "@/lib/actions/episodes"
import { DeleteEpisodeButton } from "@/components/admin/DeleteEpisodeButton"

export default async function EpisodesAdminPage() {
  const result = await getAllEpisodesForAdmin()
  const episodes = result.data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Episodes</h1>
          <p className="mt-2 text-slate-300">
            Manage podcast episodes, sync from Spotify, and feature episodes on the homepage.
          </p>
        </div>
        <Link href="/admin/episodes/new">
          <Button>Create Episode</Button>
        </Link>
      </div>

      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>All Episodes</CardTitle>
          <CardDescription className="text-slate-300">
            {episodes.length} episode{episodes.length !== 1 ? "s" : ""} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {episodes.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              No episodes yet. Create your first episode to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800">
                  <TableHead className="text-slate-300">Title</TableHead>
                  <TableHead className="text-slate-300">Published</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-right text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {episodes.map((episode) => (
                  <TableRow key={episode.id} className="border-slate-800">
                    <TableCell>
                      <div>
                        <div className="font-medium">{episode.title}</div>
                        <div className="text-sm text-slate-400">/{episode.slug}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {new Date(episode.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
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
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/episodes/${episode.id}`}>
                          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                            Edit
                          </Button>
                        </Link>
                        <DeleteEpisodeButton id={episode.id} title={episode.title} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
