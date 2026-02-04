import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Hook that synchronizes the HTML lang attribute with the current i18n language
 * This is critical for:
 * - Accessibility: Screen readers use the lang attribute to select appropriate voice
 * - SEO: Search engines use it to understand page language
 * - Browser features: Translation prompts, spell checking, etc.
 */
export function useHtmlLang() {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Update the HTML lang attribute whenever the language changes
    const updateHtmlLang = (lang: string) => {
      document.documentElement.lang = lang
      console.log(`[useHtmlLang] Updated HTML lang attribute to: ${lang}`)
    }

    // Set initial language
    updateHtmlLang(i18n.language)

    // Listen for language changes
    const handleLanguageChanged = (lng: string) => {
      updateHtmlLang(lng)
    }

    i18n.on('languageChanged', handleLanguageChanged)

    // Cleanup listener on unmount
    return () => {
      i18n.off('languageChanged', handleLanguageChanged)
    }
  }, [i18n])
}

