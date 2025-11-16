import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllArtistsForAdmin } from "@/lib/actions/artists"
import { ArtistsAdminList } from "@/components/admin/ArtistsAdminList"

export default async function ArtistsAdminPage() {
  const result = await getAllArtistsForAdmin()
  const artists = result.data ?? []

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black">Artists</h1>
          <p className="mt-2 text-slate-300">
            Manage featured artists, their profiles, and display order on the site.
          </p>
        </div>
        <Link href="/admin/artists/new">
          <Button className="w-full md:w-auto">Create Artist</Button>
        </Link>
      </div>

      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle>All Artists</CardTitle>
          <CardDescription className="text-slate-300">
            {artists.length} artist{artists.length !== 1 ? "s" : ""} total
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 pb-6 sm:px-6">
          {artists.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              No artists yet. Create your first artist profile to get started.
            </div>
          ) : (
            <ArtistsAdminList artists={artists} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
