import { notFound } from "next/navigation"
import { fetchAdminBlogPost } from "@/lib/repositories/admin-blog"
import { BlogForm } from "@/components/admin/BlogForm"

type Props = {
  params: {
    id: string
  }
}

export default async function EditBlogPage({ params }: Props) {
  const post = await fetchAdminBlogPost(params.id)
  if (!post) {
    notFound()
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-400">Editorial</p>
        <h1 className="text-3xl font-black">Edit blog post</h1>
        <p className="text-slate-400">Update metadata, featured image, and content below.</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <BlogForm post={post} />
      </div>
    </section>
  )
}
