import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const bucket = process.env.NEXT_PUBLIC_ASSET_BUCKET ?? "fireside_assets"

if (!supabaseUrl || !serviceKey) {
  throw new Error("Supabase environment variables are missing for uploads.")
}

const supabase = createClient(supabaseUrl, serviceKey)

export async function POST(request: Request) {
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

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(path)

  return NextResponse.json({ url: publicUrl.publicUrl })
}
