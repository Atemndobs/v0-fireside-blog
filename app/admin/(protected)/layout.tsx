import type { ReactNode } from "react"
import Link from "next/link"
import { AdminGuard } from "@/components/admin/AdminGuard"
import { LogoutButton } from "@/components/admin/LogoutButton"

export default function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="dark min-h-screen bg-slate-950 text-white">
        <header className="border-b border-slate-800 bg-slate-900">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/admin" className="font-black tracking-wide">
              Fireside Tribe · Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm text-slate-300">
              <Link href="/admin" className="hover:text-white">
                Dashboard
              </Link>
              <Link href="/" className="hover:text-white">
                View site
              </Link>
              <LogoutButton />
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
      </div>
    </AdminGuard>
  )
}
