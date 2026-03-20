import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllEpisodesForAdmin } from "@/lib/actions/episodes"
import { EpisodesAdminList } from "@/components/admin/EpisodesAdminList"
import { SyncEpisodesButton } from "@/components/admin/SyncEpisodesButton"

export default async function EpisodesAdminPage() {
  const result = await getAllEpisodesForAdmin()
  const episodes = result.data ?? []

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black">Episodes</h1>
          <p className="mt-2 text-slate-300">
            Manage podcast episodes, sync from Spotify, and feature episodes on the homepage.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <SyncEpisodesButton />
          <Link href="/admin/episodes/new">
            <Button className="w-full md:w-auto">Create Episode</Button>
          </Link>
        </div>
      </div>

      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle>All Episodes</CardTitle>
          <CardDescription className="text-slate-300">
            {episodes.length} episode{episodes.length !== 1 ? "s" : ""} total
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 pb-6 sm:px-6">
          {episodes.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              No episodes yet. Create your first episode to get started.
            </div>
          ) : (
            <EpisodesAdminList episodes={episodes} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
