import { cache } from "react"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set")
}

if (!supabaseAnonKey && !supabaseServiceKey) {
  throw new Error("Supabase key is not configured. Provide NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY.")
}

export const getSupabaseServerClient = cache(() =>
  createClient(supabaseUrl, supabaseServiceKey ?? supabaseAnonKey!, {
    auth: {
      persistSession: false,
    },
  }),
)
