const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL?.trim().replace(/\/$/, "")

export const getAssetUrl = (path: string) => {
  if (!path) return ""

  // Clean the path of any whitespace or newline characters
  const cleanPath = path.trim().replace(/\s+/g, '')

  // If the path is already a full URL (starts with http:// or https://), return it cleaned
  if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
    // Remove any encoded newlines (%0A, %0D) from the URL
    return cleanPath.replace(/%0A|%0D/g, '')
  }

  // Otherwise, treat it as a relative path and prepend the base URL
  const normalizedPath = cleanPath.replace(/^\/+/, "")

  if (base) {
    return `${base}/${normalizedPath}`
  }

  return `/${normalizedPath}`
}
