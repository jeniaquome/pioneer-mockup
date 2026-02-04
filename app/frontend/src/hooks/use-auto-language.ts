import { useAuth } from '@/contexts/Auth0Context'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Supported languages that have translations
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'zh', 'ar', 'sw', 'ne', 'ps', 'uz', 'prs', 'fa', 'ja', 'de', 'pt', 'ru', 'ur']

// Mapping from display names in screening form to language codes
const LANGUAGE_DISPLAY_TO_CODE_MAP: Record<string, string> = {
  'English (native/fluent)': 'en',
  'Spanish': 'es',
  'Arabic': 'ar',
  'French': 'fr',
  'Nepali/Bhutanese': 'ne',
  'Dari/Pashto (Afghan languages)': 'ps',
  'Uzbek': 'uz',
  'Dari': 'prs',
  'Farsi': 'fa',
  'Persian': 'fa',
  'Japanese': 'ja',
  'German': 'de',
  'Portuguese': 'pt',
  'Russian': 'ru',
  'Urdu': 'ur',
  // Survey system codes to language codes
  'ne_dz': 'ne',  // Nepali/Dzongkha -> Nepali
  'fa_ps': 'ps',  // Farsi/Pashto -> Pashto
  // Legacy mappings for consistency
  'nepali/bhutanese': 'ne',
  'dari/pashto (afghan languages)': 'ps',
  'uzbek': 'uz',
  'nepali': 'ne',
  'pashto': 'ps',
  'dari': 'prs',  // Updated: Dari now has its own code
  'farsi': 'fa',
  'persian': 'fa',
  'japanese': 'ja',
  'german': 'de',
  'portuguese': 'pt',
  'russian': 'ru',
  'urdu': 'ur',
  'bhutanese': 'ne'
}

/**
 * Hook that automatically switches language based on user profile preferences
 * Integrates with react-i18next to update the active language when user logs in/out
 * 
 * Behavior:
 * - On login: Load user profile language (primary_language)
 * - Session override: Respect sessionStorage language changes during session
 * - On logout: Clear session overrides, keep profile language for continuity
 * - Guest browsing: Falls back to browser language or English
 */
export function useAutoLanguage() {
  const { i18n } = useTranslation()
  const { user } = useAuth()

  useEffect(() => {
    // Function to handle user data changes and switch language
    const handleUserLanguageChange = (userData: any) => {
      console.log('user data', user)
      if (userData?.primary_language) {
        const userLanguage = userData.primary_language
        const currentUserId = userData.id
        
        // Determine target language from user profile
        let targetLanguage: string | null = null
        
        // First check if it's already a supported language code
        if (SUPPORTED_LANGUAGES.includes(userLanguage)) {
          targetLanguage = userLanguage
        } else {
          // Try to map from display name to language code
          const mappedLanguage = LANGUAGE_DISPLAY_TO_CODE_MAP[userLanguage] || 
                                 LANGUAGE_DISPLAY_TO_CODE_MAP[userLanguage.toLowerCase()]
          
          if (mappedLanguage && SUPPORTED_LANGUAGES.includes(mappedLanguage)) {
            targetLanguage = mappedLanguage
          } else {
            // If user's language is not supported, default to English
            targetLanguage = 'en'
          }
        }
        
        // Check if user has a session language override (from dropdown)
        const sessionOverride = sessionStorage.getItem('session_language_override')
        
        if (sessionOverride) {
          // Parse session override: format is "userId:languageCode" or just "languageCode"
          const [storedUserId, storedLang] = sessionOverride.includes(':') 
            ? sessionOverride.split(':')
            : [null, sessionOverride]
          
          // If override is for this user and is valid, use it
          // BUT: if the profile language has changed, clear the override and use the new profile language
          if (storedUserId === String(currentUserId) && storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
            // Check if profile language differs from session override
            if (targetLanguage && targetLanguage !== storedLang) {
              console.log(`Profile language changed to ${targetLanguage}, clearing session override (was: ${storedLang})`)
              sessionStorage.removeItem('session_language_override')
              // Fall through to use profile language
            } else {
              console.log(`Using session language override: ${storedLang} (profile: ${userLanguage})`)
              if (i18n.language !== storedLang) {
                i18n.changeLanguage(storedLang)
              }
              return
            }
          }
        }
        
        // Use profile language (no override or override was cleared)
        if (targetLanguage && i18n.language !== targetLanguage) {
          console.log(`Loading user profile language: ${targetLanguage} for user ${userData.username}`)
          i18n.changeLanguage(targetLanguage)
        }
      } else {
        // No user logged in - guest browsing
        // Check for session override (non-authenticated user)
        const sessionOverride = sessionStorage.getItem('session_language_override')
        if (sessionOverride && !sessionOverride.includes(':') && SUPPORTED_LANGUAGES.includes(sessionOverride)) {
          console.log(`Guest browsing: using session language ${sessionOverride}`)
          i18n.changeLanguage(sessionOverride)
          return
        }
        
        // Fall back to browser language detection
        const browserLanguage = navigator.language.split('-')[0]
        if (SUPPORTED_LANGUAGES.includes(browserLanguage)) {
          console.log(`Guest browsing: detected browser language ${browserLanguage}`)
          i18n.changeLanguage(browserLanguage)
        } else {
          console.log('Guest browsing: defaulting to English')
          i18n.changeLanguage('en')
        }
      }
    }

    // Check for existing user data on mount
    const checkInitialUserData = () => {
      const userData = localStorage.getItem('user_data')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          handleUserLanguageChange(user)
        } catch (error) {
          console.error('Error parsing user data for language preference:', error)
          handleUserLanguageChange(null)
        }
      } else {
        handleUserLanguageChange(null)
      }
    }

    // Check initial user data
    checkInitialUserData()

    // Listen for localStorage changes (from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user_data') {
        if (e.newValue) {
          try {
            const user = JSON.parse(e.newValue)
            handleUserLanguageChange(user)
          } catch (error) {
            console.error('Error parsing user data from storage event:', error)
          }
        } else {
          // User logged out
          handleUserLanguageChange(null)
        }
      }
    }

    // Listen for custom user data change events (same tab)
    const handleUserDataChangeEvent = (e: CustomEvent) => {
      const userData = e.detail?.userData
      handleUserLanguageChange(userData)
    }

    // Add event listeners
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('userDataChanged', handleUserDataChangeEvent as EventListener)

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userDataChanged', handleUserDataChangeEvent as EventListener)
    }
  }, [i18n, user])
}
