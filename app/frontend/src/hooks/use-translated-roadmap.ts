import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/contexts/Auth0Context'

interface TranslatedRoadmapResponse {
  language_code: string
  roadmap_summary: string
  translation_status: 'completed' | 'not_available'
  note?: string
}

/**
 * Hook to fetch translated roadmap summary based on current language
 * Falls back to original English text if translation is not available
 */
export function useTranslatedRoadmap() {
  const { i18n } = useTranslation()
  const { user, token } = useAuth()
  const [translatedSummary, setTranslatedSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTranslatedRoadmap = async () => {
      // If no user or no roadmap summary, return early
      if (!user?.roadmap_summary || !token) {
        setTranslatedSummary(user?.roadmap_summary || null)
        return
      }

      // If language is English, use original text
      if (i18n.language === 'en') {
        setTranslatedSummary(user.roadmap_summary)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/onboarding/roadmap/translated/${i18n.language}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch translation: ${response.status}`)
        }

        const data: TranslatedRoadmapResponse = await response.json()
        setTranslatedSummary(data.roadmap_summary)

        // Log if we're showing fallback text
        if (data.translation_status === 'not_available') {
          console.log(`Translation not available for ${i18n.language}, showing English text`)
        }

      } catch (err) {
        console.error('Error fetching translated roadmap:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        // Fallback to original English text on error
        setTranslatedSummary(user.roadmap_summary)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTranslatedRoadmap()
  }, [i18n.language, user?.roadmap_summary, token])

  return {
    translatedSummary,
    isLoading,
    error,
    currentLanguage: i18n.language
  }
}
