"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabaseBrowserClient } from "@/lib/supabase/client"
import { LoginForm } from "./LoginForm"

export const LoginScreen = () => {
  const router = useRouter()

  useEffect(() => {
    const supabase = supabaseBrowserClient()
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/admin")
      }
    })
  }, [router])

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/60 p-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-red-400">Fireside CMS</p>
            <h1 className="text-4xl font-black leading-tight">Sign in to manage the tribe</h1>
            <p className="text-slate-300">
              Enter your Fireside Tribe email and password. If you don&apos;t have an account yet, ask the platform team
              to invite you from Supabase.
            </p>
            <p className="text-sm text-slate-500">
              Need access?{" "}
              <Link href="mailto:hello@firesidetribe.com" className="font-semibold text-red-300 hover:text-red-100">
                Contact the platform team
              </Link>
              .
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-white p-6 text-slate-900">
            <h2 className="text-xl font-semibold">Admin Access</h2>
            <p className="text-sm text-slate-500">Use your Supabase credentials to continue.</p>
            <div className="mt-6">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
