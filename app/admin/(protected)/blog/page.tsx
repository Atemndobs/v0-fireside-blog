import Link from "next/link"
import { fetchAdminBlogPosts } from "@/lib/repositories/admin-blog"
import { Button } from "@/components/ui/button"

export default async function AdminBlogIndex() {
  const posts = await fetchAdminBlogPosts()

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">Editorial</p>
          <h1 className="text-3xl font-black">Blog posts</h1>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <table className="min-w-full text-left text-sm text-slate-200">
          <thead className="bg-slate-800 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-slate-800">
                <td className="px-4 py-3 font-medium">{post.title}</td>
                <td className="px-4 py-3 text-slate-400">{post.slug}</td>
                <td className="px-4 py-3">{post.published_at ? new Date(post.published_at).toLocaleDateString() : "—"}</td>
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
        {posts.length === 0 && (
          <div className="px-4 py-6 text-center text-slate-400">No posts found. Add content via Supabase to get started.</div>
        )}
      </div>
    </section>
  )
}
