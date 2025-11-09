"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { ImageUploadField } from "@/components/admin/ImageUploadField"
import { createAAAAuthor, updateAAAAuthor, type AAAAuthorFormData, type AuthorFunFactInput } from "@/lib/actions/aaa-page"

type AuthorRecord = AAAAuthorFormData & {
  id: string
}

type Props = {
  initialData?: AuthorRecord
  initialFunFacts?: AuthorFunFactInput[]
}

type LocalFact = {
  id: string
  value: string
}

const makeClientId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}

export function AAAAuthorForm({ initialData, initialFunFacts = [] }: Props) {
  const { toast } = useToast()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<AAAAuthorFormData>({
    slug: initialData?.slug ?? "",
    name: initialData?.name ?? "",
    full_name: initialData?.full_name ?? "",
    role: initialData?.role ?? "",
    color_bg: initialData?.color_bg ?? "bg-red-500",
    color_text: initialData?.color_text ?? "text-red-500",
    color_border: initialData?.color_border ?? "border-red-500",
    color_shadow: initialData?.color_shadow ?? "shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]",
    bio: initialData?.bio ?? "",
    profile_image_url: initialData?.profile_image_url ?? "",
    profile_image_alt: initialData?.profile_image_alt ?? "",
    order_rank: initialData?.order_rank ?? 1,
    featured: initialData?.featured ?? true,
  })

  const [funFacts, setFunFacts] = useState<LocalFact[]>(
    initialFunFacts.length
      ? initialFunFacts.map((fact) => ({ id: fact.id ?? makeClientId(), value: fact.fact }))
      : [{ id: makeClientId(), value: "" }],
  )

  const colorPreviewClasses = useMemo(
    () => `${formData.color_bg} ${formData.color_text} ${formData.color_shadow}`,
    [formData.color_bg, formData.color_shadow, formData.color_text],
  )

  const handleChange = (field: keyof AAAAuthorFormData, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const normalizeFacts = (): AuthorFunFactInput[] =>
    funFacts
      .map((fact, index) => ({ fact: fact.value.trim(), order_rank: index + 1 }))
      .filter((fact) => fact.fact.length > 0)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
    const payloadFacts = normalizeFacts()

    const result = initialData
      ? await updateAAAAuthor(initialData.id, formData, payloadFacts)
      : await createAAAAuthor(formData, payloadFacts)

    if (result.success) {
      toast({ title: "Author saved", description: "The A³ profile has been updated." })
      router.push("/admin/aaa/authors")
      router.refresh()
    } else {
      toast({ title: "Failed to save author", description: result.error ?? "Unknown error", variant: "destructive" })
    }

    setIsSaving(false)
  }

  const updateFact = (id: string, value: string) => {
    setFunFacts((prev) => prev.map((fact) => (fact.id === id ? { ...fact, value } : fact)))
  }

  const addFact = () => setFunFacts((prev) => [...prev, { id: makeClientId(), value: "" }])

  const removeFact = (id: string) => setFunFacts((prev) => (prev.length === 1 ? prev : prev.filter((fact) => fact.id !== id)))

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>{initialData ? "Edit Author" : "New Author"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Display name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(event) => {
                  handleChange("name", event.target.value)
                  if (!initialData) {
                    const slug = event.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "")
                    handleChange("slug", slug)
                  }
                }}
                className="border-slate-700 bg-slate-800 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full_name">Full name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(event) => handleChange("full_name", event.target.value)}
                className="border-slate-700 bg-slate-800 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(event) => handleChange("slug", event.target.value)}
                className="border-slate-700 bg-slate-800 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role / Title</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(event) => handleChange("role", event.target.value)}
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Visual Theme</h3>
              <div className="space-y-2">
                <Label htmlFor="color_bg">Background class</Label>
                <Input
                  id="color_bg"
                  value={formData.color_bg}
                  onChange={(event) => handleChange("color_bg", event.target.value)}
                  className="border-slate-700 bg-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color_text">Accent text class</Label>
                <Input
                  id="color_text"
                  value={formData.color_text}
                  onChange={(event) => handleChange("color_text", event.target.value)}
                  className="border-slate-700 bg-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color_border">Border class</Label>
                <Input
                  id="color_border"
                  value={formData.color_border}
                  onChange={(event) => handleChange("color_border", event.target.value)}
                  className="border-slate-700 bg-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color_shadow">Shadow class</Label>
                <Input
                  id="color_shadow"
                  value={formData.color_shadow}
                  onChange={(event) => handleChange("color_shadow", event.target.value)}
                  className="border-slate-700 bg-slate-800 text-white"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Preview</h3>
              <div className={`mt-4 rounded-lg border border-slate-800 p-6 text-center ${colorPreviewClasses}`}>
                <p className="text-sm uppercase tracking-wide opacity-80">Preview</p>
                <p className="text-2xl font-black">{formData.name || "Author name"}</p>
                <p className="text-base font-semibold opacity-80">{formData.role || "Role"}</p>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Enter valid Tailwind classes. Add new colors to the Tailwind safelist before using them publicly.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Image</h3>
            <ImageUploadField
              label="Profile image"
              value={formData.profile_image_url}
              folder="aaa"
              onChange={(url) => handleChange("profile_image_url", url)}
            />
            <div className="space-y-2">
              <Label htmlFor="profile_image_alt">Alt text</Label>
              <Input
                id="profile_image_alt"
                value={formData.profile_image_alt}
                onChange={(event) => handleChange("profile_image_alt", event.target.value)}
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-semibold">Bio (supports HTML)</h3>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(event) => handleChange("bio", event.target.value)}
              rows={10}
              className="border-slate-700 bg-slate-800 text-white"
            />
            <p className="text-xs text-slate-400">You can paste HTML paragraphs from a rich text editor.</p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Fun facts</h3>
              <Button type="button" size="sm" variant="secondary" onClick={addFact}>
                Add fact
              </Button>
            </div>
            <div className="space-y-3">
              {funFacts.map((fact, index) => (
                <div key={fact.id} className="flex flex-col gap-2 rounded-lg border border-slate-800 p-4 md:flex-row md:items-center">
                  <Label className="text-sm text-slate-400">#{index + 1}</Label>
                  <Input
                    value={fact.value}
                    onChange={(event) => updateFact(fact.id, event.target.value)}
                    placeholder="Owns a collection of vinyl..."
                    className="flex-1 border-slate-700 bg-slate-800 text-white"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    disabled={funFacts.length === 1}
                    onClick={() => removeFact(fact.id)}
                    className="text-slate-300 hover:text-white"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="order_rank">Order</Label>
              <Input
                id="order_rank"
                type="number"
                min={1}
                value={formData.order_rank}
                onChange={(event) => handleChange("order_rank", Number(event.target.value))}
                className="border-slate-700 bg-slate-800 text-white"
              />
              <p className="text-xs text-slate-400">Lower numbers appear closer to the top.</p>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="featured" checked={formData.featured} onCheckedChange={(checked) => handleChange("featured", checked)} />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured on page
              </Label>
            </div>
          </section>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : initialData ? "Update Author" : "Create Author"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              onClick={() => router.push("/admin/aaa/authors")}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
