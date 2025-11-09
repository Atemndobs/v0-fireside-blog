"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { User } from "lucide-react"
import { supabaseBrowserClient } from "@/lib/supabase/client"

export const AdminNavIcon = () => {
  const [visible, setVisible] = useState(false)
  const supabase = useMemo(() => supabaseBrowserClient(), [])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setVisible(Boolean(data.session))
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setVisible(Boolean(session))
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  if (!visible) {
    return null
  }

  return (
    <Link
      href="/admin"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/70 transition hover:border-white hover:text-white"
      aria-label="Open admin dashboard"
    >
      <User size={18} strokeWidth={1.5} />
    </Link>
  )
}
