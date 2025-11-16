"use client"

import { useActionState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { inviteAdminUser } from "@/lib/actions/users"

export function InviteUserForm() {
  const initialState = { status: "idle", message: null }
  const [state, formAction] = useActionState(inviteAdminUser, initialState)
  const [isPending, startTransition] = useTransition()

  return (
    <Card className="border-slate-800 bg-slate-900 text-white">
      <CardHeader>
        <CardTitle>Invite a teammate</CardTitle>
        <CardDescription className="text-slate-300">
          Send an email invite with a single-use link to finish creating a password. The link will redirect to the URL
          you configured for this environment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={(formData) => startTransition(() => formAction(formData))}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="editor@firesidetribe.com"
              required
              className="border-slate-700 bg-slate-800 text-white"
            />
          </div>

          {state.status === "error" && state.message && (
            <Alert variant="destructive">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          {state.status === "success" && state.message && (
            <Alert>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isPending} className="w-full md:w-auto">
            {isPending ? "Sending invite…" : "Send invite"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
