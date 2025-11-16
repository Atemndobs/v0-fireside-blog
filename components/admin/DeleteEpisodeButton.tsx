"use client"

import { ReactNode, useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
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
import { deleteEpisode } from "@/lib/actions/episodes"
import { useRouter } from "next/navigation"

interface DeleteEpisodeButtonProps extends ButtonProps {
  id: string
  title: string
  children?: ReactNode
}

export function DeleteEpisodeButton({
  id,
  title,
  className,
  children,
  variant = "destructive",
  size = "sm",
  ...buttonProps
}: DeleteEpisodeButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteEpisode(id)
      if (result.success) {
        router.refresh()
      } else {
        alert(`Failed to delete episode: ${result.error}`)
      }
    } catch (error) {
      alert("An error occurred while deleting the episode")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          disabled={isDeleting}
          className={className}
          {...buttonProps}
        >
          {children ?? "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-slate-800 bg-slate-900 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Episode</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300">
            Are you sure you want to delete &quot;{title}&quot;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
