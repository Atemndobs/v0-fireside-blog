import type React from "react"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function FinanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  return (
    <div className="paper min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6">
        <header className="mb-6">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back to site
          </Link>
          <h1 className="text-xl font-semibold text-foreground mt-1 tracking-tight">
            Fireside Finances
          </h1>
          <p className="text-xs text-muted-foreground">A³ Production Fund</p>
          <nav className="flex gap-4 mt-4 border-b border-dashed border-border pb-2">
            <Link
              href="/finance"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/finance/add"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Add Entry
            </Link>
            <Link
              href="/finance/history"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              History
            </Link>
          </nav>
        </header>
        {children}
      </div>
    </div>
  )
}
