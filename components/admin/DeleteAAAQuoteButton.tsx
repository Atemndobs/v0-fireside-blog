"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteAAAQuote } from "@/lib/actions/aaa-page"

type Props = {
  id: string
  preview: string
}

export function DeleteAAAQuoteButton({ id, preview }: Props) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    const result = await deleteAAAQuote(id)

    if (!result.success) {
      alert(result.error ?? "Failed to delete quote")
    } else {
      router.refresh()
    }

    setDeleting(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={deleting}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-slate-800 bg-slate-900 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Quote</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300">
            This will remove “{preview}” from the carousel immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {deleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
