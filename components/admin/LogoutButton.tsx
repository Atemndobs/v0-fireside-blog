"use client"

import { useClerk } from "@clerk/nextjs"

export const LogoutButton = () => {
  const { signOut } = useClerk()

  const handleSignOut = () => {
    signOut({ redirectUrl: "/admin/login" })
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
