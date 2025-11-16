"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"

export type InviteUserState = {
  status: "idle" | "success" | "error"
  message: string | null
}

const redirectUrl = process.env.SUPABASE_INVITE_REDIRECT_URL || process.env.NEXT_PUBLIC_SITE_URL
const hasServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)

export async function inviteAdminUser(prevState: InviteUserState, formData: FormData): Promise<InviteUserState> {
  const email = formData.get("email")?.toString().trim().toLowerCase()

  if (!email) {
    return { status: "error", message: "Email is required." }
  }

  if (!hasServiceRole) {
    return { status: "error", message: "SUPABASE_SERVICE_ROLE_KEY is required to send invites." }
  }

  try {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: redirectUrl || undefined,
      data: {
        invited_via: "fireside-admin",
      },
    })

    if (error) {
      console.error("[Invites] Failed to send invite", error)
      return { status: "error", message: error.message }
    }

    return { status: "success", message: `Invitation sent to ${email}.` }
  } catch (error) {
    console.error("[Invites] Unexpected error", error)
    return { status: "error", message: "Unable to send invite right now." }
  }
}


export type AdminUserSummary = {
  id: string
  email: string
  invitedAt: string | null
  confirmedAt: string | null
  lastSignInAt: string | null
}

export async function getAdminUsers(): Promise<{
  success: boolean
  data: AdminUserSummary[]
  error?: string
}> {
  if (!hasServiceRole) {
    return { success: false, data: [], error: "Set SUPABASE_SERVICE_ROLE_KEY to view invite statuses." }
  }

  try {
    const supabase = getSupabaseServerClient()
    const {
      data,
      error,
    } = await supabase.auth.admin.listUsers({ perPage: 200 })

    if (error) {
      throw error
    }

    const summaries = (data?.users ?? []).map((user) => ({
      id: user.id,
      email: user.email ?? "",
      invitedAt: user.invited_at,
      confirmedAt: user.email_confirmed_at,
      lastSignInAt: user.last_sign_in_at,
    }))

    return { success: true, data: summaries }
  } catch (error) {
    console.error("[Invites] Failed to list users", error)
    return { success: false, data: [], error: "Unable to load invite statuses." }
  }
}

export async function resendAdminInvite(email: string) {
  if (!email) {
    return { success: false, message: "Missing email address." }
  }

  if (!hasServiceRole) {
    return { success: false, message: "SUPABASE_SERVICE_ROLE_KEY is required to resend invites." }
  }

  try {
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: redirectUrl || undefined,
      data: {
        invited_via: "fireside-admin",
        resent_at: new Date().toISOString(),
      },
    })

    if (error) {
      throw error
    }

    return { success: true, message: `Invite resent to ${email}.` }
  } catch (error) {
    console.error("[Invites] Failed to resend invite", error)
    return { success: false, message: error instanceof Error ? error.message : "Unable to resend invite." }
  }
}
