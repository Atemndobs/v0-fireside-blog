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
import { deleteArtist } from "@/lib/actions/artists"
import { useRouter } from "next/navigation"

interface DeleteArtistButtonProps extends ButtonProps {
  id: string
  name: string
  children?: ReactNode
}

export function DeleteArtistButton({
  id,
  name,
  className,
  children,
  variant = "destructive",
  size = "sm",
  ...buttonProps
}: DeleteArtistButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteArtist(id)
      if (result.success) {
        router.refresh()
      } else {
        alert(`Failed to delete artist: ${result.error}`)
      }
    } catch (error) {
      alert("An error occurred while deleting the artist")
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
          <AlertDialogTitle>Delete Artist</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300">
            Are you sure you want to delete &quot;{name}&quot;? This action cannot be undone.
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
