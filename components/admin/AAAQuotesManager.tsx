"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { reorderAAAQuotes } from "@/lib/actions/aaa-page"
import { DeleteAAAQuoteButton } from "@/components/admin/DeleteAAAQuoteButton"

type QuoteRecord = {
  id: string
  quote: string
  author_name: string
  order_rank: number
  active: boolean
}

type Props = {
  quotes: QuoteRecord[]
}

export function AAAQuotesManager({ quotes }: Props) {
  const { toast } = useToast()
  const [order, setOrder] = useState(quotes)
  const [saving, setSaving] = useState(false)

  const move = (index: number, direction: "up" | "down") => {
    setOrder((prev) => {
      const copy = [...prev]
      const targetIndex = direction === "up" ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= copy.length) return prev
      ;[copy[index], copy[targetIndex]] = [copy[targetIndex], copy[index]]
      return copy
    })
  }

  const handleSaveOrder = async () => {
    setSaving(true)
    const payload = order.map((quote, index) => ({ id: quote.id, order_rank: index + 1 }))
    const result = await reorderAAAQuotes(payload)
    if (result.success) {
      toast({ title: "Order updated", description: "Quote order saved successfully." })
    } else {
      toast({ title: "Failed to update order", description: result.error ?? "Unknown error", variant: "destructive" })
    }
    setSaving(false)
  }

  return (
    <Card className="border-slate-800 bg-slate-900 text-white">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CardTitle>Quotes</CardTitle>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" variant="secondary" asChild>
            <Link href="/admin/aaa/quotes/new">New quote</Link>
          </Button>
          <Button size="sm" onClick={handleSaveOrder} disabled={saving || order.length === 0}>
            {saving ? "Saving..." : "Save order"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {order.length === 0 ? (
          <p className="text-slate-400">No quotes found yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead className="bg-slate-800 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Quote</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {order.map((quote, index) => (
                  <tr key={quote.id} className="border-t border-slate-800">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span>{index + 1}</span>
                        <div className="flex flex-col">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-slate-400"
                            onClick={() => move(index, "up")}
                            disabled={index === 0}
                          >
                            <ChevronUp size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-slate-400"
                            onClick={() => move(index, "down")}
                            disabled={index === order.length - 1}
                          >
                            <ChevronDown size={14} />
                          </Button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="line-clamp-2 max-w-xl text-slate-100">&ldquo;{quote.quote}&rdquo;</p>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{quote.author_name}</td>
                    <td className="px-4 py-3">
                      {quote.active ? <Badge variant="secondary">Active</Badge> : <Badge variant="outline">Hidden</Badge>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild size="sm" variant="outline" className="border-slate-700 bg-slate-800 text-white">
                          <Link href={`/admin/aaa/quotes/${quote.id}`} className="flex items-center gap-1">
                            <Pencil size={14} /> Edit
                          </Link>
                        </Button>
                        <DeleteAAAQuoteButton id={quote.id} preview={quote.quote.slice(0, 40)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
