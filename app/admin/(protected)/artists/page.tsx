import Link from "next/link"
import Image from "next/image"
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
import { getAllArtistsForAdmin } from "@/lib/actions/artists"
import { DeleteArtistButton } from "@/components/admin/DeleteArtistButton"

export default async function ArtistsAdminPage() {
  const result = await getAllArtistsForAdmin()
  const artists = result.data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Artists</h1>
          <p className="mt-2 text-slate-300">
            Manage featured artists, their profiles, and display order on the site.
          </p>
        </div>
        <Link href="/admin/artists/new">
          <Button>Create Artist</Button>
        </Link>
      </div>

      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>All Artists</CardTitle>
          <CardDescription className="text-slate-300">
            {artists.length} artist{artists.length !== 1 ? "s" : ""} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {artists.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              No artists yet. Create your first artist profile to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800">
                  <TableHead className="text-slate-300">Artist</TableHead>
                  <TableHead className="text-slate-300">Description</TableHead>
                  <TableHead className="text-slate-300">Order</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-right text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {artists.map((artist) => (
                  <TableRow key={artist.id} className="border-slate-800">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {artist.profile_image_url && (
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={artist.profile_image_url}
                              alt={artist.profile_image_alt || artist.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{artist.name}</div>
                          <div className="text-sm text-slate-400">/{artist.slug}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-slate-300">
                      {artist.short_description}
                    </TableCell>
                    <TableCell className="text-slate-300">{artist.order_rank}</TableCell>
                    <TableCell>
                      {artist.featured && (
                        <Badge variant="default" className="bg-red-500 text-white">
                          Featured
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/artists/${artist.id}`}>
                          <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                            Edit
                          </Button>
                        </Link>
                        <DeleteArtistButton id={artist.id} name={artist.name} />
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
