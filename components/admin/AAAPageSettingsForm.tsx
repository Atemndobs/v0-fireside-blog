"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { updateAAAPageSettings, type AAAPageSettingsFormData } from "@/lib/actions/aaa-page"

type Props = {
  initialData?: Partial<AAAPageSettingsFormData>
}

const withDefaults = (data?: Partial<AAAPageSettingsFormData>): AAAPageSettingsFormData => ({
  hero_subtitle: data?.hero_subtitle ?? "THE VOICES BEHIND THE TRIBE",
  hero_description:
    data?.hero_description ??
    "Three voices, one mission: to amplify Cameroonian music and culture through The Fireside Tribe podcast",
  power_section_title: data?.power_section_title ?? "THE POWER OF A³",
  power_section_description:
    data?.power_section_description ??
    "When Atem, Atem, and Anyang come together, something magical happens. Their unique perspectives, skills, and passions combine to create a podcast that's more than the sum of its parts.",
  curator_title: data?.curator_title ?? "THE CURATOR",
  curator_description: data?.curator_description ?? "",
  storyteller_title: data?.storyteller_title ?? "THE STORYTELLER",
  storyteller_description: data?.storyteller_description ?? "",
  connector_title: data?.connector_title ?? "THE CONNECTOR",
  connector_description: data?.connector_description ?? "",
  cta_button_text: data?.cta_button_text ?? "HEAR THEM IN ACTION",
})

export function AAAPageSettingsForm({ initialData }: Props) {
  const { toast } = useToast()
  const hydratedDefaults = useMemo(() => withDefaults(initialData), [initialData])
  const [formData, setFormData] = useState<AAAPageSettingsFormData>(hydratedDefaults)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setFormData(hydratedDefaults)
  }, [hydratedDefaults])

  const handleChange = (field: keyof AAAPageSettingsFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    const result = await updateAAAPageSettings(formData)

    if (result.success) {
      toast({ title: "Settings updated", description: "A³ page content has been refreshed." })
    } else {
      toast({ title: "Failed to save settings", description: result.error ?? "Unknown error", variant: "destructive" })
    }

    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>A³ Page Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Hero</h3>
            <div className="space-y-2">
              <Label htmlFor="hero_subtitle">Subtitle</Label>
              <Input
                id="hero_subtitle"
                value={formData.hero_subtitle}
                onChange={(event) => handleChange("hero_subtitle", event.target.value)}
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_description">Description</Label>
              <Textarea
                id="hero_description"
                value={formData.hero_description}
                onChange={(event) => handleChange("hero_description", event.target.value)}
                rows={3}
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Power Section</h3>
            <div className="space-y-2">
              <Label htmlFor="power_section_title">Title</Label>
              <Input
                id="power_section_title"
                value={formData.power_section_title}
                onChange={(event) => handleChange("power_section_title", event.target.value)}
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="power_section_description">Description</Label>
              <Textarea
                id="power_section_description"
                value={formData.power_section_description}
                onChange={(event) => handleChange("power_section_description", event.target.value)}
                rows={4}
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {(["curator", "storyteller", "connector"] as const).map((role) => (
              <div key={role} className="space-y-4">
                <h3 className="text-lg font-semibold capitalize">{role} Card</h3>
                <div className="space-y-2">
                  <Label htmlFor={`${role}_title`}>Title</Label>
                  <Input
                    id={`${role}_title`}
                    value={formData[`${role}_title`]}
                    onChange={(event) => handleChange(`${role}_title`, event.target.value)}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${role}_description`}>Description</Label>
                  <Textarea
                    id={`${role}_description`}
                    value={formData[`${role}_description`]}
                    onChange={(event) => handleChange(`${role}_description`, event.target.value)}
                    rows={3}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Call to Action</h3>
            <div className="space-y-2">
              <Label htmlFor="cta_button_text">Button Label</Label>
              <Input
                id="cta_button_text"
                value={formData.cta_button_text}
                onChange={(event) => handleChange("cta_button_text", event.target.value)}
                className="border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </section>

          <div className="flex flex-wrap gap-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              onClick={() => setFormData(hydratedDefaults)}
              disabled={saving}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
