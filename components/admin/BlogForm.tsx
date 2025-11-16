"use client"

import { useMemo, useState, useTransition, useActionState } from "react"
import { useRouter } from "next/navigation"
import { AdminBlogPost } from "@/lib/repositories/admin-blog"
import { updateBlogPost } from "@/lib/actions/blog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ImageUploadField } from "@/components/admin/ImageUploadField"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Props = {
  post: AdminBlogPost
}

const initialState = { message: null, error: null }

export const BlogForm = ({ post }: Props) => {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState(post.featured_image_url ?? "")
  const [featured, setFeatured] = useState(post.featured ?? false)
  const [published, setPublished] = useState(post.published ?? true)
  const [state, formAction] = useActionState(updateBlogPost, initialState)
  const [isPending, startTransition] = useTransition()

  const publishedAtValue = useMemo(() => {
    if (!post.published_at) return ""
    const date = new Date(post.published_at)
    const iso = date.toISOString()
    return iso.slice(0, 16)
  }, [post.published_at])

  return (
    <form
      action={(formData) => {
        formData.set("featured_image_url", imageUrl)
        startTransition(() => formAction(formData))
      }}
      className="space-y-6"
    >
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="featured" value={featured ? "on" : "off"} />
      <input type="hidden" name="published" value={published ? "on" : "off"} />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" defaultValue={post.title} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" name="slug" defaultValue={post.slug} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" name="excerpt" defaultValue={post.excerpt ?? ""} rows={3} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input id="author" name="author" defaultValue={post.author ?? ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (optional)</Label>
        <Textarea id="content" name="content" defaultValue={post.content ?? ""} rows={6} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="published_at">Published date</Label>
          <Input
            type="datetime-local"
            id="published_at"
            name="published_at"
            defaultValue={publishedAtValue}
            step={60}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="featured_image_alt">Featured image alt text</Label>
          <Input id="featured_image_alt" name="featured_image_alt" defaultValue={post.featured_image_alt ?? ""} />
        </div>
      </div>

      <ImageUploadField label="Featured image" value={imageUrl} folder="blog" onChange={setImageUrl} />

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch id="published" checked={published} onCheckedChange={setPublished} />
          <div>
            <Label htmlFor="published">Visible on site</Label>
            <p className="text-sm text-muted-foreground">Toggle off to hide this story until it&apos;s ready.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
          <div>
            <Label htmlFor="featured">Featured on homepage</Label>
            <p className="text-sm text-muted-foreground">Appears in the Latest Articles carousel.</p>
          </div>
        </div>
      </div>

      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Update post"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
