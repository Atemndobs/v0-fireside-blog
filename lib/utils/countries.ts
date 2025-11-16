/**
 * Country utilities for displaying country names and flag emojis
 * Uses ISO 3166-1 alpha-2 country codes
 */

export interface Country {
  code: string // ISO 3166-1 alpha-2 (e.g., "CM", "FR")
  name: string
  flag: string // Unicode flag emoji
}

/**
 * Convert country code to flag emoji
 * Uses Unicode Regional Indicator Symbols
 */
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌍" // Earth emoji as fallback

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map(char => 127397 + char.charCodeAt(0))

  return String.fromCodePoint(...codePoints)
}

/**
 * Popular countries for artist selection
 * Focusing on African countries + diaspora
 */
export const POPULAR_COUNTRIES: Country[] = [
  { code: "CM", name: "Cameroon", flag: "🇨🇲" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "SN", name: "Senegal", flag: "🇸🇳" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
]

/**
 * Get country by code
 */
export function getCountryByCode(code: string): Country | undefined {
  return POPULAR_COUNTRIES.find(c => c.code === code)
}

/**
 * Get country name by code
 */
export function getCountryName(code: string): string {
  const country = getCountryByCode(code)
  return country?.name || code
}
