"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { resendAdminInvite } from "@/lib/actions/users"

interface ResendInviteButtonProps {
  email: string
}

export function ResendInviteButton({ email }: ResendInviteButtonProps) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const result = await resendAdminInvite(email)
      toast({
        title: result.success ? "Invite sent" : "Invite failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    })
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <RefreshCw className={isPending ? "animate-spin" : ""} size={14} />
      Resend
    </Button>
  )
}
