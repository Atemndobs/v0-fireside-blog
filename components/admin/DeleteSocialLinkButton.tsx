"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { deleteSocialLinkAction } from "@/lib/actions/social-links"

interface DeleteSocialLinkButtonProps extends ButtonProps {
  id: string
  label: string
  children?: ReactNode
}

export function DeleteSocialLinkButton({
  id,
  label,
  className,
  children,
  variant = "destructive",
  size = "sm",
  ...buttonProps
}: DeleteSocialLinkButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteSocialLinkAction(id)
      if (result.success) {
        router.refresh()
      } else {
        alert(result.error ?? "Failed to delete social link")
      }
    } catch (error) {
      alert("An unexpected error occurred while deleting the link")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size} disabled={isDeleting} className={className} {...buttonProps}>
          {children ?? "Delete"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-slate-800 bg-slate-900 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Social Link</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300">
            Are you sure you want to delete "{label}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-500 text-white hover:bg-red-600">
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
