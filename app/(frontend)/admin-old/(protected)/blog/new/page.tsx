import { BlogPostForm } from "@/components/admin/BlogPostForm"

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Create New Blog Post</h1>
        <p className="mt-2 text-slate-300">Publish a new article for your blog.</p>
      </div>

      <BlogPostForm />
    </div>
  )
}
