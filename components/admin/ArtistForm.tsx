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
import { createArtist, updateArtist, type ArtistFormData } from "@/lib/actions/artists"

interface ArtistFormProps {
  initialData?: any
}

export function ArtistForm({ initialData }: ArtistFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ArtistFormData>({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    short_description: initialData?.short_description || "",
    profile_image_url: initialData?.profile_image_url || "",
    profile_image_alt: initialData?.profile_image_alt || "",
    genre: initialData?.genre || "",
    featured: initialData?.featured || false,
    order_rank: initialData?.order_rank || 0,
  })

  const handleChange = (field: keyof ArtistFormData, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Auto-generate slug from name if slug is empty
    if (field === "name" && !initialData) {
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
      const result = initialData ? await updateArtist(initialData.id, formData) : await createArtist(formData)

      if (result.success) {
        router.push("/admin/artists")
        router.refresh()
      } else {
        alert(`Failed to save artist: ${result.error}`)
      }
    } catch (error) {
      alert("An error occurred while saving the artist")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Artist Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
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
            <Label htmlFor="short_description">Short Description *</Label>
            <Textarea
              id="short_description"
              value={formData.short_description}
              onChange={(e) => handleChange("short_description", e.target.value)}
              rows={3}
              required
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <ImageUploadField
            label="Profile Image *"
            value={formData.profile_image_url}
            folder="artists"
            onChange={(url) => handleChange("profile_image_url", url)}
          />

          <div className="space-y-2">
            <Label htmlFor="profile_image_alt">Profile Image Alt Text *</Label>
            <Input
              id="profile_image_alt"
              value={formData.profile_image_alt}
              onChange={(e) => handleChange("profile_image_alt", e.target.value)}
              required
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleChange("genre", e.target.value)}
                placeholder="e.g., Afrobeats, R&B, Hip-Hop"
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_rank">Display Order</Label>
              <Input
                id="order_rank"
                type="number"
                value={formData.order_rank}
                onChange={(e) => handleChange("order_rank", parseInt(e.target.value, 10))}
                className="border-slate-700 bg-slate-800 text-white"
              />
              <p className="text-xs text-slate-400">Lower numbers appear first</p>
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
              {isSubmitting ? "Saving..." : initialData ? "Update Artist" : "Create Artist"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/artists")}
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
