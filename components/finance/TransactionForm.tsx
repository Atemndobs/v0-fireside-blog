"use client"

import { useActionState, useEffect, useRef } from "react"
import { createTransaction, updateTransaction, type ActionState } from "@/app/(frontend)/finance/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

const expenseCategories = [
  { value: "shield-editor", label: "Shield (Editor)" },
  { value: "lumiere-editor", label: "Lumiere (Shorts)" },
  { value: "promotion", label: "Promotion" },
  { value: "guest-data", label: "Guest Data" },
  { value: "other", label: "Other" },
]

interface TransactionData {
  id: string
  type: "contribution" | "expense"
  amount: number
  date: string
  description: string
  category: string
  person: string
  notes?: string | null
}

interface TransactionFormProps {
  initialData?: TransactionData
  mode?: "create" | "edit"
}

export function TransactionForm({ initialData, mode = "create" }: TransactionFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const action = mode === "edit" ? updateTransaction : createTransaction
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    action,
    { success: false }
  )

  useEffect(() => {
    if (state.success) {
      if (mode === "create") {
        formRef.current?.reset()
      } else {
        router.push("/finance/history")
      }
    }
  }, [state, mode, router])

  const defaultDate = initialData?.date
    ? new Date(initialData.date).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0]

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {mode === "edit" && initialData && (
        <input type="hidden" name="id" value={initialData.id} />
      )}

      {state.error && (
        <div className="border border-red-300 bg-red-50 text-red-700 text-sm p-3 rounded-sm">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="border border-green-300 bg-green-50 text-green-700 text-sm p-3 rounded-sm">
          {mode === "edit" ? "Transaction updated." : "Transaction added."}
        </div>
      )}

      {/* Type */}
      <div className="space-y-1.5">
        <Label htmlFor="type" className="text-xs">Type</Label>
        <Select name="type" defaultValue={initialData?.type || "expense"}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contribution">Contribution (Money In)</SelectItem>
            <SelectItem value="expense">Expense (Money Out)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Amount */}
      <div className="space-y-1.5">
        <Label htmlFor="amount" className="text-xs">Amount (USD)</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          required
          className="font-mono"
          defaultValue={initialData?.amount}
        />
      </div>

      {/* Date */}
      <div className="space-y-1.5">
        <Label htmlFor="date" className="text-xs">Date</Label>
        <Input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={defaultDate}
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-xs">Description</Label>
        <Input
          id="description"
          name="description"
          type="text"
          placeholder="e.g., Shield March editing"
          required
          defaultValue={initialData?.description}
        />
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <Label htmlFor="category" className="text-xs">Category</Label>
        <Select name="category" defaultValue={initialData?.category || "contribution"}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contribution">Contribution</SelectItem>
            {expenseCategories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Person */}
      <div className="space-y-1.5">
        <Label htmlFor="person" className="text-xs">Person</Label>
        <Select name="person" defaultValue={initialData?.person} required>
          <SelectTrigger>
            <SelectValue placeholder="Who?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="atem">Atem</SelectItem>
            <SelectItem value="anyang">Anyang</SelectItem>
            <SelectItem value="eunice">Eunice</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <Label htmlFor="notes" className="text-xs">Notes (optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Any additional context..."
          rows={2}
          defaultValue={initialData?.notes || ""}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-foreground text-background hover:bg-foreground/90"
      >
        {isPending ? "Saving..." : mode === "edit" ? "Update Transaction" : "Add Transaction"}
      </Button>
    </form>
  )
}
