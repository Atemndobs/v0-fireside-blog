"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Upload, Loader2, ImageOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type Props = {
  label: string
  value?: string | null
  folder?: string
  onChange: (url: string) => void
}

export const ImageUploadField = ({ label, value, folder = "uploads", onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)

  const handleUpload = async (file: File) => {
    setUploading(true)
    setError(null)
    setImageError(false)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
    setUploading(false)

    if (!response.ok) {
      setError(data.error ?? "Upload failed")
      return
    }

    onChange(data.url)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      void handleUpload(file)
    }
  }

  return (
    <div className="space-y-2">
      <Label className="text-white">{label}</Label>
      {value ? (
        <div className="relative h-64 overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
          {imageError ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
              <ImageOff className="h-12 w-12" />
              <p className="text-sm">Failed to load image</p>
              <p className="max-w-md truncate text-xs text-slate-500">{value}</p>
            </div>
          ) : (
            <Image
              src={value}
              alt={label}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          )}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-800/50 text-sm text-slate-400">
          No image selected
        </div>
      )}
      <div className="flex items-center gap-3">
        <Input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <Button
          type="button"
          variant="secondary"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Uploading..." : value ? "Change image" : "Upload image"}
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              onChange("")
              setImageError(false)
            }}
            className="text-slate-300 hover:text-white"
          >
            Remove
          </Button>
        )}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {value && !imageError && (
        <p className="text-xs text-slate-500">
          Current URL: <span className="text-slate-400">{value}</span>
        </p>
      )}
    </div>
  )
}
