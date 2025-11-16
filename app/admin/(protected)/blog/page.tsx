import Link from "next/link"
import { fetchAdminBlogPosts } from "@/lib/repositories/admin-blog"
import { Button } from "@/components/ui/button"

export default async function AdminBlogIndex() {
  const posts = await fetchAdminBlogPosts()

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">Editorial</p>
          <h1 className="text-3xl font-black">Blog posts</h1>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        {posts.length === 0 ? (
          <div className="px-4 py-6 text-center text-slate-400">
            No posts found. Add content via Supabase to get started.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 md:hidden">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-slate-50 shadow-lg shadow-black/20"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : "Draft"}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">{post.title}</h2>
                  <p className="text-sm text-slate-400">/{post.slug}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-slate-800 px-3 py-1">
                      {post.featured ? "Featured" : "Standard"}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 ${post.published ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-300"}`}
                    >
                      {post.published ? "Published" : "Hidden"}
                    </span>
                  </div>
                  <Button asChild size="sm" className="mt-4 w-full" variant="secondary">
                    <Link href={`/admin/blog/${post.id}`}>Edit post</Link>
                  </Button>
                </article>
              ))}
            </div>
            <div className="hidden md:block">
              <table className="min-w-full text-left text-sm text-slate-200">
                <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Published</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Featured</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-t border-slate-800">
                      <td className="px-4 py-3 font-medium">{post.title}</td>
                      <td className="px-4 py-3 text-slate-400">{post.slug}</td>
                      <td className="px-4 py-3">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${post.published ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-800 text-slate-300"}`}
                        >
                          {post.published ? "Published" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-4 py-3">{post.featured ? "Yes" : "No"}</td>
                      <td className="px-4 py-3">
                        <Button asChild size="sm" variant="secondary">
                          <Link href={`/admin/blog/${post.id}`}>Edit</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
