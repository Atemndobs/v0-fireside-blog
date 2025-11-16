"use client"

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import type { CheckedState } from "@radix-ui/react-checkbox"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { createSocialLinkAction, updateSocialLinkAction } from "@/lib/actions/social-links"
import type { SocialLinkView, SocialZone } from "@/lib/types/social-links"
import { SOCIAL_PLATFORM_OPTIONS, SOCIAL_ZONES } from "@/lib/social-platforms"

interface SocialLinkFormProps {
  initialData?: SocialLinkView
}

interface FormState {
  platform: string
  label: string
  url: string
  icon_slug: string
  priority: number
  zones: SocialZone[]
  is_featured: boolean
}

const DEFAULT_STATE: FormState = {
  platform: "spotify",
  label: "",
  url: "",
  icon_slug: "",
  priority: 0,
  zones: ["footer"],
  is_featured: false,
}

export function SocialLinkForm({ initialData }: SocialLinkFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormState>(() => ({
    ...DEFAULT_STATE,
    platform: initialData?.platform ?? DEFAULT_STATE.platform,
    label: initialData?.label ?? DEFAULT_STATE.label,
    url: initialData?.url ?? DEFAULT_STATE.url,
    icon_slug: initialData?.iconSlug ?? DEFAULT_STATE.icon_slug,
    priority: initialData?.priority ?? DEFAULT_STATE.priority,
    zones: initialData?.zones ?? DEFAULT_STATE.zones,
    is_featured: initialData?.isFeatured ?? DEFAULT_STATE.is_featured,
  }))

  const handleZoneToggle = (zone: SocialZone, checked: CheckedState) => {
    setFormData((prev) => {
      const hasZone = prev.zones.includes(zone)
      const isChecked = checked === true

      if (isChecked && !hasZone) {
        return { ...prev, zones: [...prev.zones, zone] }
      }
      if (!isChecked && hasZone) {
        const nextZones = prev.zones.filter((z) => z !== zone)
        return { ...prev, zones: nextZones.length ? nextZones : ["footer"] }
      }
      return prev
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const payload = { ...formData }

    try {
      const result = initialData
        ? await updateSocialLinkAction(initialData.id, payload)
        : await createSocialLinkAction(payload)

      if (!result.success) {
        setError(result.error ?? "Something went wrong")
        return
      }

      router.push("/admin/social-links")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save social link")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>{initialData ? "Edit Social Link" : "Create Social Link"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={formData.platform} onValueChange={(value) => setFormData((prev) => ({ ...prev, platform: value }))}>
                <SelectTrigger className="border-slate-700 bg-slate-800 text-white">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-900 text-white">
                  {SOCIAL_PLATFORM_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                type="number"
                min={0}
                value={formData.priority}
                onChange={(event) => setFormData((prev) => ({ ...prev, priority: Number(event.target.value) }))}
                className="border-slate-700 bg-slate-800 text-white"
              />
              <p className="text-xs text-slate-400">Lower numbers appear first.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">Link label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, label: event.target.value }))
              }
              placeholder="Follow on Spotify"
              required
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, url: event.target.value }))
              }
              placeholder="https://"
              required
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon_slug">Icon override (optional)</Label>
            <Input
              id="icon_slug"
              value={formData.icon_slug}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, icon_slug: event.target.value }))
              }
              placeholder="Defaults to platform icon"
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="space-y-3">
            <Label>Zones</Label>
            <div className="grid gap-3 md:grid-cols-2">
              {SOCIAL_ZONES.map((zone) => (
                <label key={zone.value} className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                  <Checkbox
                    checked={formData.zones.includes(zone.value)}
                    onCheckedChange={(checked) => handleZoneToggle(zone.value, Boolean(checked))}
                  />
                  <div>
                    <p className="font-semibold">{zone.label}</p>
                    <p className="text-xs text-slate-400">{zone.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_featured: checked }))}
            />
            <div>
              <Label htmlFor="is_featured" className="font-semibold">
                Feature this link
              </Label>
              <p className="text-xs text-slate-400">Featured links show up first on every surface.</p>
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex flex-wrap gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : initialData ? "Update link" : "Create link"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/social-links")}
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
