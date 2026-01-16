"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SignIn, useAuth } from "@clerk/nextjs"

export const LoginScreen = () => {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/admin")
    }
  }, [isLoaded, isSignedIn, router])

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/60 p-4 sm:p-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-red-400">Fireside CMS</p>
            <h1 className="text-4xl font-black leading-tight">Sign in to manage the tribe</h1>
            <p className="text-slate-300">
              Sign in with your Google account to access the admin dashboard.
            </p>
            <p className="text-sm text-slate-500">
              Need access?{" "}
              <Link href="mailto:hello@firesidetribe.com" className="font-semibold text-red-300 hover:text-red-100">
                Contact the platform team
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center justify-center">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-white shadow-2xl",
                }
              }}
              redirectUrl="/admin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
