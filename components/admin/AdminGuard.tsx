"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

const PUBLIC_ROUTES = ["/admin/login"]

export const AdminGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded && !isSignedIn && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/admin/login")
    }
  }, [isLoaded, isSignedIn, pathname, router])

  if (PUBLIC_ROUTES.includes(pathname)) {
    return <>{children}</>
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-sm text-slate-400">Preparing admin dashboard…</p>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  return <>{children}</>
}
