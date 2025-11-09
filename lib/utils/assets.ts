const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.replace(/\/$/, "")

export const getAssetUrl = (path: string) => {
  if (!path) return ""

  // If the path is already a full URL (starts with http:// or https://), return it as-is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  // Otherwise, treat it as a relative path and prepend the base URL
  const normalizedPath = path.replace(/^\/+/, "")

  if (base) {
    return `${base}/${normalizedPath}`
  }

  return `/${normalizedPath}`
}
