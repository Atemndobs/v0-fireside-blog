"use client"

import { useTransition } from "react"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { syncEpisodesFromYoutube } from "@/lib/actions/episodes"

export function SyncEpisodesButton() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const handleSync = () => {
    startTransition(async () => {
      const result = await syncEpisodesFromYoutube()
      if (result.success) {
        toast({
          title: "Sync complete",
          description: "Latest YouTube uploads have been pulled into Supabase.",
        })
      } else {
        toast({
          title: "Sync failed",
          description: result.error ?? "Unable to sync episodes. Please check the logs.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full md:w-auto flex items-center gap-2"
      onClick={handleSync}
      disabled={isPending}
    >
      <RefreshCw size={16} className={isPending ? "animate-spin" : ""} />
      {isPending ? "Syncing…" : "Sync from YouTube"}
    </Button>
  )
}
