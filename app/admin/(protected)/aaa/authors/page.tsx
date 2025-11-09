import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllAAAAuthors } from "@/lib/actions/aaa-page"
import { getAssetUrl } from "@/lib/utils/assets"

export default async function AdminAAAAuthorListPage() {
  const authors = await getAllAAAAuthors()

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">A³</p>
          <h1 className="text-3xl font-black">Authors</h1>
          <p className="mt-2 max-w-2xl text-slate-300">Manage bios, visuals, and ordering for the Triple-A team.</p>
        </div>
        <Button asChild>
          <Link href="/admin/aaa/authors/new">Create author</Link>
        </Button>
      </div>

      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Author Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          {authors.data?.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-200">
                <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Author</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Order</th>
                    <th className="px-4 py-3">Featured</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.data.map((author) => (
                    <tr key={author.id} className="border-t border-slate-800">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {author.profile_image_url ? (
                            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-700">
                              <Image
                                src={getAssetUrl(author.profile_image_url)}
                                alt={author.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-xs text-slate-500">
                              No image
                            </div>
                          )}
                          <div>
                            <p className="font-semibold">{author.name}</p>
                            <p className="text-xs text-slate-400">ID: {author.id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{author.role}</td>
                      <td className="px-4 py-3 text-slate-400">{author.slug}</td>
                      <td className="px-4 py-3">{author.order_rank}</td>
                      <td className="px-4 py-3">{author.featured ? "Yes" : "No"}</td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                        >
                          <Link href={`/admin/aaa/authors/${author.id}`}>Edit</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-slate-400">No authors created yet.</p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
