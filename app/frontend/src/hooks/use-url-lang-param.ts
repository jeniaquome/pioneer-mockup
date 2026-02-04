import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getLangFromUrl } from '@/lib/hreflang-config'

/**
 * Hook that detects and applies language from URL query parameter
 * Supports SEO-friendly URLs like: /resources?lang=es
 * 
 * Behavior:
 * - Checks for ?lang= parameter on page load
 * - If valid language code found, switches to that language
 * - Stores selection in sessionStorage (respecting user override)
 * - Removes lang parameter from URL after applying (cleaner UX)
 */
export function useUrlLangParam() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { i18n } = useTranslation()

  useEffect(() => {
    const langFromUrl = getLangFromUrl(searchParams)
    
    if (langFromUrl && langFromUrl !== i18n.language) {
      console.log(`[useUrlLangParam] Detected language from URL: ${langFromUrl}`)
      
      // Switch to the language from URL
      i18n.changeLanguage(langFromUrl)
      
      // Store as session override so it persists during navigation
      sessionStorage.setItem('session_language_override', langFromUrl)
      
      // Optional: Remove the lang parameter from URL for cleaner UX
      // Comment this out if you want to keep ?lang= in the URL
      searchParams.delete('lang')
      setSearchParams(searchParams, { replace: true })
    }
  }, [searchParams, setSearchParams, i18n])
}

