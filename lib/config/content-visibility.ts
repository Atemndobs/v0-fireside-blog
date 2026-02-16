const TRUE_VALUES = new Set(["1", "true", "yes", "on"])
const FALSE_VALUES = new Set(["0", "false", "no", "off"])

const parseBooleanEnv = (value: string | undefined, defaultValue: boolean) => {
  if (typeof value !== "string") return defaultValue

  const normalized = value.trim().toLowerCase()
  if (TRUE_VALUES.has(normalized)) return true
  if (FALSE_VALUES.has(normalized)) return false

  return defaultValue
}

/**
 * Public content switches.
 * Defaults keep episodes visible while hiding editorial + artist writeups.
 */
export const publicContentVisibility = {
  episodes: parseBooleanEnv(process.env.NEXT_PUBLIC_SHOW_EPISODES_CONTENT, true),
  artists: parseBooleanEnv(process.env.NEXT_PUBLIC_SHOW_ARTISTS_CONTENT, false),
  blog: parseBooleanEnv(process.env.NEXT_PUBLIC_SHOW_BLOG_CONTENT, false),
}
