"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabaseBrowserClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const ResetPasswordScreen = () => {
  const supabase = useMemo(() => supabaseBrowserClient(), [])
  const router = useRouter()
  const redirectTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessionReady(Boolean(data.session))
      setChecking(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setSessionReady(Boolean(session))
      }
    })

    return () => {
      subscription.unsubscribe()
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current)
      }
    }
  }, [supabase])

  const handlePasswordUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!sessionReady) {
      setError("Open the password reset link from your email to continue.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
    } else {
      setSuccess("Password updated! Redirecting you to the dashboard…")
      redirectTimerRef.current = setTimeout(() => {
        router.replace("/admin")
      }, 1500)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/60 p-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-red-400">Fireside CMS</p>
            <h1 className="text-4xl font-black leading-tight">Choose a permanent password</h1>
            <p className="text-slate-300">
              You&apos;ve been invited to the Fireside Tribe admin. Use the secure link from your email to access this page
              and set your permanent password.
            </p>
            <p className="text-sm text-slate-500">
              Didn&apos;t get an email? Return to the{" "}
              <Link href="/admin/login" className="font-semibold text-red-300 hover:text-red-100">
                login screen
              </Link>{" "}
              and request a new link.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-white p-6 text-slate-900">
            <h2 className="text-xl font-semibold">Finalize your access</h2>
            <p className="text-sm text-slate-500">
              Set a password that you&apos;ll use every time you sign in to the CMS.
            </p>
            <div className="mt-6 space-y-4">
              {!checking && !sessionReady ? (
                <Alert>
                  <AlertDescription>
                    Use the latest password-reset email from Fireside Tribe to open this page. The secure link grants access
                    to change your password.
                  </AlertDescription>
                </Alert>
              ) : null}

              {sessionReady ? (
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="Re-enter the password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      required
                    />
                  </div>
                  <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save password"}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                  <p>Waiting for the secure link…</p>
                  <p>
                    If you already clicked the reset email, refresh this page. Otherwise go back to{" "}
                    <Link href="/admin/login" className="font-semibold text-red-500">
                      request a new link
                    </Link>
                    .
                  </p>
                </div>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
