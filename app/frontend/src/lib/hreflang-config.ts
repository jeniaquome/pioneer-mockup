/**
 * Hreflang configuration for multilingual SEO
 * Defines all supported languages and their locale codes
 */

export interface LanguageConfig {
  code: string
  locale: string // Full BCP 47 language tag for hreflang
  name: string
}

/**
 * Supported languages with proper locale codes
 * Using ISO 639-1 language codes with region when appropriate
 */
export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', locale: 'en-US', name: 'English' },
  { code: 'es', locale: 'es-419', name: 'Spanish' },
  { code: 'fr', locale: 'fr-FR', name: 'French' },
  { code: 'zh', locale: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'ar', locale: 'ar', name: 'Arabic' },      // No region specified - used across multiple regions
  { code: 'sw', locale: 'sw', name: 'Swahili' },     // No region specified - used across multiple regions
  { code: 'ne', locale: 'ne-NP', name: 'Nepali' },
  { code: 'ps', locale: 'ps-AF', name: 'Pashto' },
  { code: 'uz', locale: 'uz-UZ', name: 'Uzbek' },
  { code: 'fa', locale: 'fa-IR', name: 'Farsi' },
  { code: 'ja', locale: 'ja-JP', name: 'Japanese' },
  { code: 'de', locale: 'de-DE', name: 'German' },
  { code: 'pt', locale: 'pt-BR', name: 'Portuguese' },
  { code: 'ru', locale: 'ru-RU', name: 'Russian' },
  { code: 'ur', locale: 'ur-PK', name: 'Urdu' },
]

/**
 * Default language (used for x-default hreflang)
 */
export const DEFAULT_LANGUAGE = 'en'

/**
 * Base URL for the production site
 * Update this when deploying to production
 */
export const PRODUCTION_BASE_URL = 'https://www.pittsburghpioneer.com'

/**
 * Generate hreflang URLs for a given path
 * @param pathname - Current page path (e.g., '/resources')
 * @returns Array of hreflang link objects
 */
export function generateHreflangLinks(pathname: string) {
  const links: Array<{ hreflang: string; href: string }> = []
  
  // Add a link for each supported language
  for (const lang of SUPPORTED_LANGUAGES) {
    const url = `${PRODUCTION_BASE_URL}${pathname}${pathname.includes('?') ? '&' : '?'}lang=${lang.code}`
    links.push({
      hreflang: lang.locale,
      href: url,
    })
  }
  
  // Add x-default (fallback) - points to English version
  const defaultUrl = `${PRODUCTION_BASE_URL}${pathname}${pathname.includes('?') ? '&' : '?'}lang=${DEFAULT_LANGUAGE}`
  links.push({
    hreflang: 'x-default',
    href: defaultUrl,
  })
  
  return links
}

/**
 * Get language code from URL query parameter
 * @param searchParams - URLSearchParams object
 * @returns Language code or null if not found/invalid
 */
export function getLangFromUrl(searchParams: URLSearchParams): string | null {
  const lang = searchParams.get('lang')
  if (!lang) return null
  
  // Validate that it's a supported language
  const isSupported = SUPPORTED_LANGUAGES.some(l => l.code === lang)
  return isSupported ? lang : null
}

/**
 * Check if a path should have hreflang tags
 * Excludes authenticated/private pages
 */
export function shouldIncludeHreflang(pathname: string): boolean {
  const excludedPaths = [
    '/dashboard',
    '/admin-dashboard',
    '/screening',
    '/checklist',
    '/edit',
    '/login',
    '/signup',
    '/callback',
  ]
  
  return !excludedPaths.some(excluded => pathname.startsWith(excluded))
}

