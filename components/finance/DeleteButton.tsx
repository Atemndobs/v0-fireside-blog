"use client"

import { useActionState } from "react"
import { deleteTransaction, type ActionState } from "@/app/(frontend)/finance/actions"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    deleteTransaction,
    { success: false }
  )

  useEffect(() => {
    if (state.success) {
      router.push("/finance/history")
    }
  }, [state, router])

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Delete this transaction?")) {
          e.preventDefault()
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      {state.error && (
        <p className="text-red-500 text-xs mb-2">{state.error}</p>
      )}
      <Button
        type="submit"
        variant="outline"
        disabled={isPending}
        className="w-full text-red-500 border-red-300 hover:bg-red-50"
      >
        {isPending ? "Deleting..." : "Delete Transaction"}
      </Button>
    </form>
  )
}
