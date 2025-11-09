"use client"

import { useRouter } from "next/navigation"
import { supabaseBrowserClient } from "@/lib/supabase/client"

export const LogoutButton = () => {
  const router = useRouter()
  const handleSignOut = async () => {
    const supabase = supabaseBrowserClient()
    await supabase.auth.signOut()
    router.replace("/admin/login")
  }

  return (
    <button
      onClick={handleSignOut}
      className="rounded border border-slate-500 px-3 py-1 text-xs text-slate-200 transition hover:border-white hover:text-white"
      type="button"
    >
      Sign out
    </button>
  )
}
