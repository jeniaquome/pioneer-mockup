import { API_BASE_URL } from '@/lib/api'
import { normalizeAnswersToCamelCase, normalizeAnswersToSnakeCase } from '@/lib/utils'
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

// Types
interface User {
  id: number
  email: string
  username: string
  first_name?: string
  last_name?: string
  is_active: boolean
  is_verified: boolean
  role?: string
  user_type?: string
  primary_language?: string
  cultural_background?: string
  
  is_demo_user?: boolean
  created_at: string
  // Phase 1 onboarding fields
  is_onboarded: boolean
  first_survey_at?: string
  checklist_id?: string
  survey_responses?: Record<string, any>
  onboarding_profile?: Record<string, any>
  roadmap_summary?: string
  
  // Translation fields
  roadmap_translation_status?: string
  last_roadmap_translation_hash?: string
}

interface AuthTokens {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

interface LoginData {
  email: string
  password: string
}

interface SignupData {
  email: string
  username: string
  password: string
  first_name?: string
  last_name?: string
}

interface ProfileUpdateData {
  first_name?: string
  last_name?: string
  username?: string
  primary_language?: string
  cultural_background?: string
  
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginData) => Promise<{ success: boolean; error?: string }>
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  refreshToken: () => Promise<boolean>
  updateUserProfile: (data: ProfileUpdateData) => Promise<{ success: boolean; error?: string }>
  submitOnboarding: (answers: Record<string, any>) => Promise<{ success: boolean; error?: string }>
  updateOnboardingResponses: (answers: Record<string, any>) => Promise<{ success: boolean; error?: string }>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)


// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const onboardingSubmissionInFlightRef = useRef<boolean>(false)
  const profileUpdateInFlightRef = useRef<boolean>(false)

  // Check for stored auth data on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token')
    const storedUser = localStorage.getItem('user_data')
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(userData)
        // Verify token is still valid
        fetchCurrentUser(storedToken)
      } catch (error) {
        console.error('Error parsing stored auth data:', error)
        clearAuthData()
      }
    }
    setIsLoading(false)
  }, [])

  // If we become authenticated and there are saved survey answers, auto-submit
  useEffect(() => {
    if (user && token) {
      handleSessionStorageSurvey(user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, token])

  // Listen for external userDataChanged events (e.g., from ProfilePage)
  useEffect(() => {
    const handleUserDataChanged = (event: CustomEvent) => {
      const { userData } = event.detail;
      if (userData) {
        
        setUser(userData);
      }
    };

    window.addEventListener('userDataChanged', handleUserDataChanged as EventListener);
    return () => {
      window.removeEventListener('userDataChanged', handleUserDataChanged as EventListener);
    };
  }, [])



  // Clear authentication data
  const clearAuthData = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_data')
    
    // Clear session language override (temporary UI language changes)
    // This ensures the next user gets their profile language
    sessionStorage.removeItem('session_language_override')
    
    // Keep i18nextLng for language continuity after logout
    // (Will be overridden by next user's profile language on login)
    
    // Trigger a custom event to notify language system that user logged out
    window.dispatchEvent(new CustomEvent('userDataChanged', { 
      detail: { userData: null } 
    }))
  }

  // Store authentication data
  const storeAuthData = (tokens: AuthTokens, userData: User) => {
    setToken(tokens.access_token)
    setUser(userData)
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)
    localStorage.setItem('user_data', JSON.stringify(userData))
    
    
    // Trigger a custom event to notify language system of user data change
    window.dispatchEvent(new CustomEvent('userDataChanged', { 
      detail: { userData } 
    }))
  }

  // Submit onboarding function
  const submitOnboarding = async (
    answers: Record<string, any>,
    authTokenOverride?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const effectiveToken = authTokenOverride || localStorage.getItem('access_token') || token
      const response = await fetch(`${API_BASE_URL}/onboarding/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${effectiveToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })

      if (response.ok) {
        // Refresh user data to get updated onboarding status using a known-good token
        await fetchCurrentUser(effectiveToken || undefined)
        // Load priority data now that user is onboarded
        return { success: true }
      } else {
        const errorData = await response.json()
        return { 
          success: false, 
          error: errorData.detail || 'Failed to submit onboarding. Please try again.' 
        }
      }
    } catch (error) {
      console.error('Onboarding submission error:', error)
      return { 
        success: false, 
        error: 'Network error. Please check your connection and try again.' 
      }
    }
  }

  // Update onboarding responses (edit flow)
  const updateOnboardingResponses = async (
    answers: Record<string, any>,
    authTokenOverride?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const effectiveToken = authTokenOverride || localStorage.getItem('access_token') || token

      // Always fetch the freshest user state to avoid overwriting previous answers on re-login
      let latestUser = user
      try {
        const meRes = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${effectiveToken}`,
            'Content-Type': 'application/json',
          },
        })
        if (meRes.ok) {
          latestUser = await meRes.json()
        }
      } catch (_) {
        // Non-fatal: fall back to current user state
      }

      // Merge existing server-stored responses with incoming edits
      // First handle legacy malformed keys in existing data
      const legacyKeyMapping: Record<string, string> = {
        'primarylanguage': 'primary_language',
        'culturalbackground': 'cultural_background', 
        'professionalstatus': 'professional_status',
        'housingneed': 'housing_need',
        'languagesupport': 'language_support',
        'communitypriorities': 'community_priorities',
        'immediateneeds': 'immediate_needs',
        'techcomfort': 'tech_comfort',  // Kept for backwards compatibility but filtered out
      };
      
      const existingRaw = (latestUser?.survey_responses || {}) as Record<string, any>
      const fixedExisting: Record<string, any> = {};
      Object.entries(existingRaw).forEach(([key, value]) => {
        const correctedKey = legacyKeyMapping[key] || key;
        fixedExisting[correctedKey] = value;
      });
      
      const existingCamel = normalizeAnswersToCamelCase(fixedExisting)
      const incomingCamel = normalizeAnswersToCamelCase(answers as any)
      const mergedCamel = { ...existingCamel, ...incomingCamel }
      const mergedSnake = normalizeAnswersToSnakeCase(mergedCamel)

      const response = await fetch(`${API_BASE_URL}/onboarding/responses`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${effectiveToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: mergedSnake }),
      })

      if (response.ok) {
        // Get updated onboarding data to merge back into user state
        const responseData = await response.json()
        
        // Update local user state so that future views reflect the saved responses immediately
        if (user) {
          const updatedUser: User = {
            ...user,
            // Persist the edited responses locally to avoid stale rehydration
            survey_responses: mergedSnake as any,
            onboarding_profile: responseData?.onboarding_profile ?? user.onboarding_profile,
            roadmap_summary: responseData?.roadmap_summary ?? user.roadmap_summary,
            checklist_id: responseData?.checklist_id ?? user.checklist_id,
            // Update primary_language from survey responses if it exists
            primary_language: (Array.isArray(mergedSnake.primary_language) 
              ? mergedSnake.primary_language[0] 
              : mergedSnake.primary_language) || user.primary_language,
          }
          setUser(updatedUser)
          localStorage.setItem('user_data', JSON.stringify(updatedUser))
          
          // Clear session language override when profile language is updated
          // This ensures the new profile language takes effect immediately
          try {
            sessionStorage.removeItem('session_language_override')
          } catch (_) {}
          
          // Trigger a custom event to notify language system of user data change
          window.dispatchEvent(new CustomEvent('userDataChanged', { 
            detail: { userData: updatedUser } 
          }))
        }
        
        // Reload priority data since survey responses changed
        try { sessionStorage.removeItem('survey_answers_v1') } catch (_) {}
        // Force refresh from server to ensure canonical user state is loaded
        await fetchCurrentUser(effectiveToken || undefined)
        return { success: true }
      } else {
        const errorData = await response.json()
        return { success: false, error: errorData.detail || 'Failed to update responses.' }
      }
    } catch (error) {
      console.error('Update onboarding responses error:', error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  // Check if survey answers are complete (all required questions answered)
  const isSurveyComplete = (answers: Record<string, any>): boolean => {
    // Accept answers with snake_case keys from sessionStorage by normalizing to camelCase first
    const normalizedAnswers = normalizeAnswersToCamelCase(answers as any)
    const requiredQuestionIds = [
      'audience',
      'primaryLanguage', 
      'culturalBackground',
      'housingNeed',           // Moved from position 5 to 4
      'professionalStatus',    // Moved from position 4 to 5
      'languageSupport',
      'employment',
      'communityPriorities',
      'immediateNeeds',
      'timeline',
      // 'techComfort' - removed (question no longer exists)
    ]
    
    return requiredQuestionIds.every((questionId) => {
      const answer = (normalizedAnswers as any)[questionId]
      // For multi-select questions (communityPriorities, immediateNeeds), require at least one selection
      if (questionId === 'communityPriorities' || questionId === 'immediateNeeds') {
        return Array.isArray(answer) && answer.length > 0
      }
      // For single-select, must have a value
      return answer && answer !== ''
    })
  }

  // Handle sessionStorage survey answers after auth
  const handleSessionStorageSurvey = async (userData: User) => {
    try {
      // Prevent duplicate submissions if multiple triggers fire
      if (onboardingSubmissionInFlightRef.current) {
        return
      }

      // Refresh user state once before deciding to submit
      try {
        const freshToken = localStorage.getItem('access_token') || token || undefined
        if (freshToken) {
          const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${freshToken}`, 'Content-Type': 'application/json' }
          })
          if (res.ok) {
            userData = await res.json()
          }
        }
      } catch (_) { /* non-fatal */ }

      const savedAnswers = sessionStorage.getItem('survey_answers_v1')
      if (savedAnswers && !userData.is_onboarded) {
        const answers = JSON.parse(savedAnswers)
        const camelCaseAnswers = normalizeAnswersToCamelCase(answers)
        
        // Only auto-submit if the survey is complete
        if (isSurveyComplete(camelCaseAnswers)) {
          
          
          // Add a small delay to ensure token is fully set
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // Use the freshly stored access token for submission
          const freshToken = localStorage.getItem('access_token') || undefined
          onboardingSubmissionInFlightRef.current = true
          // Send the original snake_case answers to the API; backend normalizes keys
          const result = await submitOnboarding(answers, freshToken)
          if (result.success) {
            
            sessionStorage.removeItem('survey_answers_v1')
            // Emit event to trigger navigation to dashboard with a delay to ensure UI updates
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('onboardingComplete'))
            }, 200)
          } else {
            // If user is already onboarded, treat as non-fatal: refresh user and continue
            const alreadyOnboarded = (result.error || '').toLowerCase().includes('already onboarded')
            if (alreadyOnboarded) {
              await fetchCurrentUser(freshToken)
              sessionStorage.removeItem('survey_answers_v1')
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('onboardingComplete'))
              }, 200)
            } else {
              console.error('Failed to submit onboarding from sessionStorage:', result.error)
              // Show user-friendly error message
              window.dispatchEvent(new CustomEvent('onboardingError', { 
                detail: { error: result.error } 
              }))
            }
          }
          onboardingSubmissionInFlightRef.current = false
        } else {
          
          // Keep partial answers in sessionStorage for user to continue later
        }
      } else {
        // Clear sessionStorage if user is already onboarded or no answers found
        if (userData.is_onboarded) {
          sessionStorage.removeItem('survey_answers_v1')
        }
      }
    } catch (error) {
      console.error('Error handling sessionStorage survey:', error)
      // Clear sessionStorage on error to prevent issues
      sessionStorage.removeItem('survey_answers_v1')
      // Emit error event for user feedback
      window.dispatchEvent(new CustomEvent('onboardingError', { 
        detail: { error: 'Failed to process saved survey data' } 
      }))
    } finally {
      onboardingSubmissionInFlightRef.current = false
    }
  }

  // Fetch current user data
  const fetchCurrentUser = async (authToken?: string) => {
    try {
      // Resolve an effective token in a resilient way.
      // Prefer explicit argument, then in-memory state, then localStorage.
      const effective = authToken || token || localStorage.getItem('access_token') || undefined
      if (!effective) {
        // If we truly have no token, treat as unauthenticated but avoid thrashing local storage unnecessarily
        clearAuthData()
        return false
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${effective}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        localStorage.setItem('user_data', JSON.stringify(userData))
        
        // Trigger a custom event to notify language system of user data change
        window.dispatchEvent(new CustomEvent('userDataChanged', { 
          detail: { userData } 
        }))
        
        return true
      } else {
        // Only clear auth if the server explicitly rejects with 401/403; otherwise be conservative
        if (response.status === 401 || response.status === 403) {
          clearAuthData()
        }
        return false
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      clearAuthData()
      return false
    }
  }

  // Login function
  const login = async (data: LoginData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const tokens: AuthTokens = await response.json()
        
        // Fetch user data with the new token
        const userResponse = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${tokens.access_token}`,
            'Content-Type': 'application/json',
          },
        })

        if (userResponse.ok) {
          const userData: User = await userResponse.json()
          storeAuthData(tokens, userData)
          
          // Handle any saved survey answers from sessionStorage
          await handleSessionStorageSurvey(userData)
          // After potential onboarding, refetch user to ensure latest flags
          await fetchCurrentUser(tokens.access_token)
          
          return { success: true }
        } else {
          return { success: false, error: 'Failed to fetch user data' }
        }
      } else {
        const errorData = await response.json()
        return { 
          success: false, 
          error: errorData.detail || 'Login failed. Please check your credentials.' 
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: 'Network error. Please check your connection and try again.' 
      }
    }
  }

  // Signup function
  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // Auto-login after successful signup
        const loginResult = await login({ email: data.email, password: data.password })
        return loginResult
      } else {
        const errorData = await response.json()
        return { 
          success: false, 
          error: errorData.detail || 'Registration failed. Please try again.' 
        }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return { 
        success: false, 
        error: 'Network error. Please check your connection and try again.' 
      }
    }
  }

  // Logout function
  const logout = () => {
    clearAuthData()
    // Optionally call logout endpoint
    fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).catch(error => console.error('Logout error:', error))
    
    // Dispatch custom event to handle navigation from components inside Router
    window.dispatchEvent(new CustomEvent('userLoggedOut'))
  }

  // Refresh token function
  const refreshToken = async (): Promise<boolean> => {
    try {
      const storedRefreshToken = localStorage.getItem('refresh_token')
      if (!storedRefreshToken) return false

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: storedRefreshToken }),
      })

      if (response.ok) {
        const tokens: AuthTokens = await response.json()
        setToken(tokens.access_token)
        localStorage.setItem('access_token', tokens.access_token)
        localStorage.setItem('refresh_token', tokens.refresh_token)
        return true
      } else {
        clearAuthData()
        return false
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      clearAuthData()
      return false
    }
  }

  // Update user profile function
  const updateUserProfile = async (data: ProfileUpdateData): Promise<{ success: boolean; error?: string }> => {
    try {
      // Set flag to prevent any potential race conditions
      profileUpdateInFlightRef.current = true
      

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const updatedUser: User = await response.json()
        
        
        // Create a completely new object to ensure React detects the change
        const newUserObject = { ...updatedUser }
        
        // Update localStorage FIRST before dispatching event or calling setUser
        localStorage.setItem('user_data', JSON.stringify(newUserObject))
        
        
        // Dispatch event with the NEW object
        window.dispatchEvent(new CustomEvent('userDataChanged', { 
          detail: { userData: newUserObject } 
        }))
        
        
        // Finally update React state
        setUser(newUserObject)
        
        
        // Force refresh from server to ensure canonical user state is loaded
        const effective = localStorage.getItem('access_token') || token || undefined
        await fetchCurrentUser(effective)

        // Clear flag after a longer delay to prevent immediate overwrites
        setTimeout(() => {
          profileUpdateInFlightRef.current = false
          
        }, 5000)
        
        return { success: true }
      } else {
        profileUpdateInFlightRef.current = false
        const errorData = await response.json()
        return { 
          success: false, 
          error: errorData.detail || 'Failed to update profile. Please try again.' 
        }
      }
    } catch (error) {
      profileUpdateInFlightRef.current = false
      console.error('Profile update error:', error)
      return { 
        success: false, 
        error: 'Network error. Please check your connection and try again.' 
      }
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    signup,
    logout,
    refreshToken,
    updateUserProfile,
    submitOnboarding,
    updateOnboardingResponses,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protected routes
export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-reflex-blue to-brand-pms-285 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-brand-reflex-blue mb-2 font-brand-heading">{t('auth.authenticationRequired')}</h2>
            <p className="text-gray-600 mb-6">{t('auth.loginToAccessPage')}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/login" className="flex-1">
              <Button className="btn-brand-primary w-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200" style={{ minHeight: '48px' }}>
                {t('auth.signIn')}
              </Button>
            </Link>
            <Link to="/signup" className="flex-1">
              <Button 
                variant="outline" 
                className="btn-brand-outline w-full border-2 border-brand-pms-285 hover:text-white hover:bg-brand-pms-285 hover:border-brand-pms-285 transition-all duration-200 px-6 py-3"
                style={{ minHeight: '48px' }}
              >
                {t('auth.signUp')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
} 