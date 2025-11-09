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
import { createEpisode, updateEpisode, type EpisodeFormData } from "@/lib/actions/episodes"

interface EpisodeFormProps {
  initialData?: any
}

export function EpisodeForm({ initialData }: EpisodeFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<EpisodeFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    published_at: initialData?.published_at
      ? new Date(initialData.published_at).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    cover_image_url: initialData?.cover_image_url || "",
    cover_image_alt: initialData?.cover_image_alt || "",
    spotify_url: initialData?.spotify_url || "",
    youtube_url: initialData?.youtube_url || "",
    featured: initialData?.featured || false,
  })

  const handleChange = (field: keyof EpisodeFormData, value: string | boolean) => {
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
        ? await updateEpisode(initialData.id, formData)
        : await createEpisode(formData)

      if (result.success) {
        router.push("/admin/episodes")
        router.refresh()
      } else {
        alert(`Failed to save episode: ${result.error}`)
      }
    } catch (error) {
      alert("An error occurred while saving the episode")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Episode Details</CardTitle>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
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

          <ImageUploadField
            label="Cover Image"
            value={formData.cover_image_url}
            folder="episodes"
            onChange={(url) => handleChange("cover_image_url", url)}
          />

          <div className="space-y-2">
            <Label htmlFor="cover_image_alt">Cover Image Alt Text</Label>
            <Input
              id="cover_image_alt"
              value={formData.cover_image_alt}
              onChange={(e) => handleChange("cover_image_alt", e.target.value)}
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="spotify_url">Spotify URL</Label>
              <Input
                id="spotify_url"
                type="url"
                value={formData.spotify_url}
                onChange={(e) => handleChange("spotify_url", e.target.value)}
                placeholder="https://open.spotify.com/episode/..."
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube_url">YouTube URL</Label>
              <Input
                id="youtube_url"
                type="url"
                value={formData.youtube_url}
                onChange={(e) => handleChange("youtube_url", e.target.value)}
                placeholder="https://youtu.be/..."
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
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
              {isSubmitting ? "Saving..." : initialData ? "Update Episode" : "Create Episode"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/episodes")}
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
