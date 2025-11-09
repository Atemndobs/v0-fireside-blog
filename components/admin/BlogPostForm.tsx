"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ImageUploadField } from "@/components/admin/ImageUploadField"
import { createBlogPost, updateBlogPost, type BlogPostFormData } from "@/lib/actions/blog-posts"

interface BlogPostFormProps {
  initialData?: any
}

export function BlogPostForm({ initialData }: BlogPostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    author: initialData?.author || "The Fireside Tribe",
    published_at: initialData?.published_at
      ? new Date(initialData.published_at).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    featured_image_url: initialData?.featured_image_url || "",
    featured_image_alt: initialData?.featured_image_alt || "",
    featured: initialData?.featured || false,
  })

  const handleChange = (field: keyof BlogPostFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Auto-generate slug from title if slug is empty
    if (field === "title" && !initialData) {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = initialData
        ? await updateBlogPost(initialData.id, formData)
        : await createBlogPost(formData)

      if (result.success) {
        router.push("/admin/blog")
        router.refresh()
      } else {
        alert(`Failed to save blog post: ${result.error}`)
      }
    } catch (error) {
      alert("An error occurred while saving the blog post")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                required
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleChange("excerpt", e.target.value)}
              rows={3}
              required
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleChange("author", e.target.value)}
                required
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="published_at">Published Date *</Label>
              <Input
                id="published_at"
                type="datetime-local"
                value={formData.published_at}
                onChange={(e) => handleChange("published_at", e.target.value)}
                required
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </div>

          <ImageUploadField
            label="Featured Image *"
            value={formData.featured_image_url}
            folder="blog"
            onChange={(url) => handleChange("featured_image_url", url)}
          />

          <div className="space-y-2">
            <Label htmlFor="featured_image_alt">Featured Image Alt Text *</Label>
            <Input
              id="featured_image_alt"
              value={formData.featured_image_alt}
              onChange={(e) => handleChange("featured_image_alt", e.target.value)}
              required
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleChange("featured", checked)}
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Feature on homepage
            </Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : initialData ? "Update Post" : "Create Post"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/blog")}
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
