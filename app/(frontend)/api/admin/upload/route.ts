import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
const bucket = (process.env.NEXT_PUBLIC_ASSET_BUCKET ?? "fireside_assets").trim()

let supabaseClient: ReturnType<typeof createClient> | null = null
const getSupabaseClient = () => {
  if (!supabaseUrl || !serviceKey) {
    return null
  }
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, serviceKey)
  }
  return supabaseClient
}

export async function POST(request: Request) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase environment variables are missing for uploads." },
      { status: 500 }
    )
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null
  const folder = (formData.get("folder") as string) || "uploads"

  if (!file) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const ext = file.name.split(".").pop() || "jpg"
  const path = `${folder}/${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`

  const { error } = await supabase.storage.from(bucket).upload(path, Buffer.from(arrayBuffer), {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Manually construct the public URL to avoid any newlines from environment variables
  // Format: https://{project}.supabase.co/storage/v1/object/public/{bucket}/{path}
  const cleanedUrl = supabaseUrl?.trim()
  const cleanedBucket = bucket.trim()
  const publicUrl = `${cleanedUrl}/storage/v1/object/public/${cleanedBucket}/${path}`

  return NextResponse.json({ url: publicUrl })
}
