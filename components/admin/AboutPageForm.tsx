"use client"

import { useEffect, useMemo, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadField } from "@/components/admin/ImageUploadField"
import { useToast } from "@/components/ui/use-toast"
import type { AboutPageContent } from "@/lib/types/pages"
import { updateAboutPage, type AboutPageFormData } from "@/lib/actions/about-page"

type AboutPageFormProps = {
  initialData: AboutPageContent
}

const toFormData = (data: AboutPageContent): AboutPageFormData => ({
  hero_title: data.heroTitle ?? "",
  hero_tagline: data.heroTagline ?? "",
  mission_title: data.missionTitle ?? "",
  mission_image_url: data.missionImageUrl ?? "",
  mission_image_alt: data.missionImageAlt ?? "",
  mission_paragraph_1: data.missionParagraph1 ?? "",
  mission_paragraph_2: data.missionParagraph2 ?? "",
  story_title: data.storyTitle ?? "",
  story_paragraph_1: data.storyParagraph1 ?? "",
  story_paragraph_2: data.storyParagraph2 ?? "",
  story_paragraph_3: data.storyParagraph3 ?? "",
  what_we_do_title: data.whatWeDoTitle ?? "",
  podcast_card_title: data.podcastCardTitle ?? "",
  podcast_card_description: data.podcastCardDescription ?? "",
  blog_card_title: data.blogCardTitle ?? "",
  blog_card_description: data.blogCardDescription ?? "",
  artist_card_title: data.artistCardTitle ?? "",
  artist_card_description: data.artistCardDescription ?? "",
  cta_title: data.ctaTitle ?? "",
  cta_description: data.ctaDescription ?? "",
  cta_button_text: data.ctaButtonText ?? "",
})

export function AboutPageForm({ initialData }: AboutPageFormProps) {
  const { toast } = useToast()
  const initialFormData = useMemo(() => toFormData(initialData), [initialData])
  const [formData, setFormData] = useState<AboutPageFormData>(initialFormData)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setFormData(initialFormData)
  }, [initialFormData])

  const handleChange = (field: keyof AboutPageFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)

    const result = await updateAboutPage(formData)

    if (result.success) {
      toast({ title: "About page updated", description: "Changes will be live momentarily." })
    } else {
      toast({ title: "Failed to save", description: result.error ?? "Unknown error", variant: "destructive" })
    }

    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>About Page Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Accordion type="multiple" defaultValue={["hero", "mission", "story", "what-we-do", "cta"]}>
            <AccordionItem value="hero">
              <AccordionTrigger>Hero</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="hero_title">Title</Label>
                  <Input
                    id="hero_title"
                    value={formData.hero_title}
                    onChange={(event) => handleChange("hero_title", event.target.value)}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero_tagline">Tagline</Label>
                  <Textarea
                    id="hero_tagline"
                    value={formData.hero_tagline}
                    onChange={(event) => handleChange("hero_tagline", event.target.value)}
                    rows={2}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mission">
              <AccordionTrigger>Mission</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="mission_title">Title</Label>
                  <Input
                    id="mission_title"
                    value={formData.mission_title}
                    onChange={(event) => handleChange("mission_title", event.target.value)}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
                <ImageUploadField
                  label="Mission Image"
                  value={formData.mission_image_url}
                  folder="about"
                  onChange={(url) => handleChange("mission_image_url", url)}
                />
                <div className="space-y-2">
                  <Label htmlFor="mission_image_alt">Image Alt Text</Label>
                  <Input
                    id="mission_image_alt"
                    value={formData.mission_image_alt}
                    onChange={(event) => handleChange("mission_image_alt", event.target.value)}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mission_paragraph_1">Paragraph 1</Label>
                    <Textarea
                      id="mission_paragraph_1"
                      value={formData.mission_paragraph_1}
                      onChange={(event) => handleChange("mission_paragraph_1", event.target.value)}
                      rows={4}
                      className="border-slate-700 bg-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mission_paragraph_2">Paragraph 2</Label>
                    <Textarea
                      id="mission_paragraph_2"
                      value={formData.mission_paragraph_2}
                      onChange={(event) => handleChange("mission_paragraph_2", event.target.value)}
                      rows={4}
                      className="border-slate-700 bg-slate-800 text-white"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="story">
              <AccordionTrigger>Story</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="story_title">Title</Label>
                  <Input
                    id="story_title"
                    value={formData.story_title}
                    onChange={(event) => handleChange("story_title", event.target.value)}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {(["story_paragraph_1", "story_paragraph_2", "story_paragraph_3"] as const).map((field, index) => (
                    <div className="space-y-2" key={field}>
                      <Label htmlFor={field}>Paragraph {index + 1}</Label>
                      <Textarea
                        id={field}
                        value={formData[field]}
                        onChange={(event) => handleChange(field, event.target.value)}
                        rows={4}
                        className="border-slate-700 bg-slate-800 text-white"
                      />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="what-we-do">
              <AccordionTrigger>What We Do</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="what_we_do_title">Section Title</Label>
                  <Input
                    id="what_we_do_title"
                    value={formData.what_we_do_title}
                    onChange={(event) => handleChange("what_we_do_title", event.target.value)}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="podcast_card_title">Podcast Card Title</Label>
                    <Input
                      id="podcast_card_title"
                      value={formData.podcast_card_title}
                      onChange={(event) => handleChange("podcast_card_title", event.target.value)}
                      className="border-slate-700 bg-slate-800 text-white"
                    />
                    <Textarea
                      id="podcast_card_description"
                      value={formData.podcast_card_description}
                      onChange={(event) => handleChange("podcast_card_description", event.target.value)}
                      rows={3}
                      className="border-slate-700 bg-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blog_card_title">Blog Card Title</Label>
                    <Input
                      id="blog_card_title"
                      value={formData.blog_card_title}
                      onChange={(event) => handleChange("blog_card_title", event.target.value)}
                      className="border-slate-700 bg-slate-800 text-white"
                    />
                    <Textarea
                      id="blog_card_description"
                      value={formData.blog_card_description}
                      onChange={(event) => handleChange("blog_card_description", event.target.value)}
                      rows={3}
                      className="border-slate-700 bg-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="artist_card_title">Artist Card Title</Label>
                    <Input
                      id="artist_card_title"
                      value={formData.artist_card_title}
                      onChange={(event) => handleChange("artist_card_title", event.target.value)}
                      className="border-slate-700 bg-slate-800 text-white"
                    />
                    <Textarea
                      id="artist_card_description"
                      value={formData.artist_card_description}
                      onChange={(event) => handleChange("artist_card_description", event.target.value)}
                      rows={3}
                      className="border-slate-700 bg-slate-800 text-white"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cta">
              <AccordionTrigger>Call to Action</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="cta_title">Title</Label>
                  <Input
                    id="cta_title"
                    value={formData.cta_title}
                    onChange={(event) => handleChange("cta_title", event.target.value)}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta_description">Description</Label>
                  <Textarea
                    id="cta_description"
                    value={formData.cta_description}
                    onChange={(event) => handleChange("cta_description", event.target.value)}
                    rows={4}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta_button_text">Button Text</Label>
                  <Input
                    id="cta_button_text"
                    value={formData.cta_button_text}
                    onChange={(event) => handleChange("cta_button_text", event.target.value)}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-wrap gap-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              onClick={() => setFormData(initialFormData)}
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
