"use client"

import type { ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { supabaseBrowserClient } from "@/lib/supabase/client"

const PUBLIC_ROUTES = ["/admin/login"]

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = useMemo(() => supabaseBrowserClient(), [])
  const [status, setStatus] = useState<"checking" | "guest" | "authenticated">("checking")

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setStatus(data.session ? "authenticated" : "guest")
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? "authenticated" : "guest")
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  useEffect(() => {
    if (status === "guest" && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/admin/login")
    }
  }, [status, pathname, router])

  if (PUBLIC_ROUTES.includes(pathname)) {
    return <>{children}</>
  }

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-sm text-slate-400">Preparing admin dashboard…</p>
      </div>
    )
  }

  if (status === "guest") {
    return null
  }

  return <>{children}</>
}
