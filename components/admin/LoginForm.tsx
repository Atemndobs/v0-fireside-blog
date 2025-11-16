"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { supabaseBrowserClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const LoginForm = () => {
  const router = useRouter()
  const supabase = useMemo(() => supabaseBrowserClient(), [])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState<"login" | "reset">("login")
  const [loginError, setLoginError] = useState<string | null>(null)
  const [resetError, setResetError] = useState<string | null>(null)
  const [resetSuccess, setResetSuccess] = useState<string | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoginLoading(true)
    setLoginError(null)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setLoginError(signInError.message)
      setLoginLoading(false)
      return
    }

    router.replace("/admin")
    router.refresh()
  }

  const handlePasswordReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResetLoading(true)
    setResetError(null)
    setResetSuccess(null)

    const redirectTo =
      typeof window !== "undefined" ? `${window.location.origin}/admin/reset-password` : undefined
    const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    })

    if (resetErr) {
      setResetError(resetErr.message)
    } else {
      setResetSuccess("Check your inbox for the secure link to finish setting your password.")
    }

    setResetLoading(false)
  }

  if (mode === "reset") {
    return (
      <form onSubmit={handlePasswordReset} className="space-y-6">
        <p className="text-sm text-slate-600">
          We&apos;ll send a secure link that lets you choose a permanent password. Use the same email your invite was sent
          to.
        </p>
        <div className="space-y-2">
          <Label htmlFor="reset-email">Email</Label>
          <Input
            id="reset-email"
            type="email"
            autoComplete="email"
            placeholder="you@firesidetribe.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <Button className="w-full" type="submit" disabled={resetLoading}>
          {resetLoading ? "Sending link..." : "Email me the link"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={() => {
            setMode("login")
            setResetError(null)
            setResetSuccess(null)
          }}
        >
          Back to sign in
        </Button>
        {resetError && (
          <Alert variant="destructive">
            <AlertDescription>{resetError}</AlertDescription>
          </Alert>
        )}
        {resetSuccess && (
          <Alert>
            <AlertDescription>{resetSuccess}</AlertDescription>
          </Alert>
        )}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@firesidetribe.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <Button className="w-full" type="submit" disabled={loginLoading}>
        {loginLoading ? "Signing in..." : "Sign in"}
      </Button>
      <button
        type="button"
        className="w-full text-sm font-semibold text-slate-600 underline-offset-2 hover:underline"
        onClick={() => {
          setMode("reset")
          setLoginError(null)
        }}
      >
        Create or reset your password
      </button>
      {loginError && (
        <Alert variant="destructive">
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
    </form>
  )
}
