"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { createAAAQuote, updateAAAQuote, type AAAQuoteFormData } from "@/lib/actions/aaa-page"

type QuoteRecord = {
  id: string
  quote: string
  author_name: string
  order_rank: number
  active: boolean
}

type Props = {
  initialData?: QuoteRecord
  defaultOrder?: number
}

export function AAAQuoteForm({ initialData, defaultOrder = 1 }: Props) {
  const { toast } = useToast()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<AAAQuoteFormData>({
    quote: initialData?.quote ?? "",
    author_name: initialData?.author_name ?? "",
    order_rank: initialData?.order_rank ?? defaultOrder,
    active: initialData?.active ?? true,
  })

  const handleChange = (field: keyof AAAQuoteFormData, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    const result = initialData ? await updateAAAQuote(initialData.id, formData) : await createAAAQuote(formData)

    if (result.success) {
      toast({
        title: "Quote saved",
        description: initialData ? "Quote updated successfully." : "New quote added to the carousel.",
      })
      router.push("/admin/aaa/quotes")
      router.refresh()
    } else {
      toast({ title: "Failed to save quote", description: result.error ?? "Unknown error", variant: "destructive" })
    }

    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>{initialData ? "Edit Quote" : "New Quote"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="quote">Quote</Label>
            <Textarea
              id="quote"
              value={formData.quote}
              onChange={(event) => handleChange("quote", event.target.value)}
              rows={5}
              className="border-slate-700 bg-slate-800 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author_name">Author</Label>
            <Input
              id="author_name"
              value={formData.author_name}
              onChange={(event) => handleChange("author_name", event.target.value)}
              className="border-slate-700 bg-slate-800 text-white"
              required
            />
          </div>

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
            <p className="text-xs text-slate-400">Lower numbers appear first in the carousel.</p>
          </div>

          <div className="flex items-center gap-3">
            <Switch id="active" checked={formData.active} onCheckedChange={(checked) => handleChange("active", checked)} />
            <Label htmlFor="active" className="cursor-pointer">
              Active in carousel
            </Label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : initialData ? "Update Quote" : "Create Quote"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              disabled={saving}
              onClick={() => router.push("/admin/aaa/quotes")}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
