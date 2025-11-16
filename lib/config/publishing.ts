export type PublishWindow = {
  published?: boolean | null
  publishAt?: string | null
  unpublishAt?: string | null
}

const parseDate = (value?: string | null) => {
  if (!value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export const isContentLive = (window?: PublishWindow | null, now = new Date()) => {
  if (!window || !window.published) return false

  const publishAt = parseDate(window.publishAt)
  if (publishAt && now < publishAt) {
    return false
  }

  const unpublishAt = parseDate(window.unpublishAt)
  if (unpublishAt && now >= unpublishAt) {
    return false
  }

  return true
}
