import { useAuth0 } from '@auth0/auth0-react'
import { API_BASE_URL } from '@/lib/api'
import { normalizeAnswersToCamelCase, normalizeAnswersToSnakeCase } from '@/lib/utils'
import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

// Types (keeping existing interface for compatibility)
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
const Auth0Context = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function Auth0AuthProvider({ children }: { children: ReactNode }) {
  const { 
    user: auth0User, 
    isAuthenticated: auth0IsAuthenticated, 
    isLoading: auth0IsLoading, 
    getAccessTokenSilently,
    loginWithRedirect,
    logout: auth0Logout
  } = useAuth0()
  
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const onboardingSubmissionInFlightRef = useRef<boolean>(false)
  const profileUpdateInFlightRef = useRef<boolean>(false)

  // Sync Auth0 state with our local state
  useEffect(() => {
    const syncAuthState = async () => {
      // Don't sync if a profile update is in progress to avoid overwriting local changes
      if (profileUpdateInFlightRef.current) {
        
        return
      }
      
      if (auth0IsAuthenticated && auth0User) {
        try {
          // Get access token from Auth0
          const accessToken = await getAccessTokenSilently()
          setToken(accessToken)
          
          // Fetch or create user in our backend
          await fetchOrCreateUser(accessToken, auth0User)
        } catch (error) {
          console.error('Error syncing auth state:', error)
        }
      } else {
        setUser(null)
        setToken(null)
        clearAuthData()
      }
      setIsLoading(auth0IsLoading)
    }

    syncAuthState()
    // Note: getAccessTokenSilently is intentionally excluded from deps as it's a stable function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth0IsAuthenticated, auth0User, auth0IsLoading])

  // Handle session storage survey when user becomes authenticated
  useEffect(() => {
    if (user && token) {
      handleSessionStorageSurvey(user)
    }
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

  // Fetch or create user in our backend
  const fetchOrCreateUser = async (accessToken: string, auth0UserData: any) => {
    try {
      // First try to get existing user
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      })

      if (response.ok) {
        const userData = await response.json()
        
        setUser(userData)
        localStorage.setItem('user_data', JSON.stringify(userData))
        
        // Trigger user data change event
        window.dispatchEvent(new CustomEvent('userDataChanged', { 
          detail: { userData } 
        }))
      } else if (response.status === 404) {
        // User doesn't exist in our backend, create them
        await createUserFromAuth0(accessToken, auth0UserData)
      } else {
        console.error('Failed to fetch user:', response.status)
      }
    } catch (error) {
      console.error('Error fetching/creating user:', error)
      // If /me fails, try to create the user anyway
      await createUserFromAuth0(accessToken, auth0UserData)
    }
  }

  // Create user in our backend from Auth0 data
  const createUserFromAuth0 = async (accessToken: string, auth0UserData: any) => {
    try {
      const userData = {
        email: auth0UserData.email,
        username: auth0UserData.nickname || auth0UserData.email.split('@')[0],
        first_name: auth0UserData.given_name || '',
        last_name: auth0UserData.family_name || '',
        auth0_user_id: auth0UserData.sub
      }

      const response = await fetch(`${API_BASE_URL}/auth/auth0-user`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const newUser = await response.json()
        setUser(newUser)
        localStorage.setItem('user_data', JSON.stringify(newUser))
        
        // Trigger user data change event
        window.dispatchEvent(new CustomEvent('userDataChanged', { 
          detail: { userData: newUser } 
        }))
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error('Failed to create user in backend:', response.status, errorData)
      }
    } catch (error) {
      console.error('Error creating user from Auth0:', error)
    }
  }

  // Clear authentication data
  const clearAuthData = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_data')
    
    // Trigger user logged out event
    window.dispatchEvent(new CustomEvent('userDataChanged', { 
      detail: { userData: null } 
    }))
  }

  // Submit onboarding function
  const submitOnboarding = async (
    answers: Record<string, any>,
    authTokenOverride?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const effectiveToken = authTokenOverride || token
      if (!effectiveToken) {
        return { success: false, error: 'No authentication token available' }
      }

      const response = await fetch(`${API_BASE_URL}/onboarding/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${effectiveToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })

      if (response.ok) {
        // Refresh user data to get updated onboarding status
        await fetchCurrentUser(effectiveToken)
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
      const effectiveToken = authTokenOverride || token
      if (!effectiveToken) {
        return { success: false, error: 'No authentication token available' }
      }

      // Get latest user state
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

      // Merge existing responses with new ones
      const legacyKeyMapping: Record<string, string> = {
        'primarylanguage': 'primary_language',
        'culturalbackground': 'cultural_background', 
        'professionalstatus': 'professional_status',
        'housingneed': 'housing_need',
        'languagesupport': 'language_support',
        'communitypriorities': 'community_priorities',
        'immediateneeds': 'immediate_needs',
        'techcomfort': 'tech_comfort',
      }
      
      const existingRaw = (latestUser?.survey_responses || {}) as Record<string, any>
      const fixedExisting: Record<string, any> = {}
      Object.entries(existingRaw).forEach(([key, value]) => {
        const correctedKey = legacyKeyMapping[key] || key
        fixedExisting[correctedKey] = value
      })
      
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
        const responseData = await response.json()
        
        // Update local user state
        if (user) {
          const updatedUser: User = {
            ...user,
            survey_responses: mergedSnake as any,
            onboarding_profile: responseData?.onboarding_profile ?? user.onboarding_profile,
            roadmap_summary: responseData?.roadmap_summary ?? user.roadmap_summary,
            checklist_id: responseData?.checklist_id ?? user.checklist_id,
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
          
          // Trigger user data change event
          window.dispatchEvent(new CustomEvent('userDataChanged', { 
            detail: { userData: updatedUser } 
          }))
        }
        
        try { sessionStorage.removeItem('survey_answers_v1') } catch (_) {}
        // Force refresh from server to ensure canonical user state is loaded
        await fetchCurrentUser(effectiveToken)
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

  // Check if survey answers are complete
  const isSurveyComplete = (answers: Record<string, any>): boolean => {
    const normalizedAnswers = normalizeAnswersToCamelCase(answers as any)
    const requiredQuestionIds = [
      'audience',
      'primaryLanguage', 
      'culturalBackground',
      'housingNeed',
      'professionalStatus',
      'languageSupport',
      'employment',
      'communityPriorities',
      'immediateNeeds',
      'timeline',
    ]
    
    return requiredQuestionIds.every((questionId) => {
      const answer = (normalizedAnswers as any)[questionId]
      if (questionId === 'communityPriorities' || questionId === 'immediateNeeds') {
        return Array.isArray(answer) && answer.length > 0
      }
      return answer && answer !== ''
    })
  }

  // Handle session storage survey answers after auth
  const handleSessionStorageSurvey = async (userData: User) => {
    try {
      if (onboardingSubmissionInFlightRef.current) {
        return
      }

      // Refresh user state once before deciding to submit
      try {
        const freshToken = token
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
        
        if (isSurveyComplete(camelCaseAnswers)) {
          
          
          await new Promise(resolve => setTimeout(resolve, 500))
          
          onboardingSubmissionInFlightRef.current = true
          const result = await submitOnboarding(answers, token || undefined)
          if (result.success) {
            
            sessionStorage.removeItem('survey_answers_v1')
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('onboardingComplete'))
            }, 200)
          } else {
            const alreadyOnboarded = (result.error || '').toLowerCase().includes('already onboarded')
            if (alreadyOnboarded) {
              await fetchCurrentUser(token || undefined)
              sessionStorage.removeItem('survey_answers_v1')
              setTimeout(() => {
                window.dispatchEvent(new CustomEvent('onboardingComplete'))
              }, 200)
            } else {
              console.error('Failed to submit onboarding from sessionStorage:', result.error)
              window.dispatchEvent(new CustomEvent('onboardingError', { 
                detail: { error: result.error } 
              }))
            }
          }
          onboardingSubmissionInFlightRef.current = false
        } else {
          
        }
      } else {
        if (userData.is_onboarded) {
          sessionStorage.removeItem('survey_answers_v1')
        }
      }
    } catch (error) {
      console.error('Error handling sessionStorage survey:', error)
      sessionStorage.removeItem('survey_answers_v1')
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
      const effective = authToken || token
      if (!effective) {
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
        
        window.dispatchEvent(new CustomEvent('userDataChanged', { 
          detail: { userData } 
        }))
        
        return true
      } else {
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

  // Auth0-based login (redirect to Auth0)
  const login = async (data: LoginData): Promise<{ success: boolean; error?: string }> => {
    try {
      await loginWithRedirect({
        appState: {
          returnTo: "/dashboard",
        },
        authorizationParams: {
          prompt: "login",
          login_hint: data.email,
        },
      })
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      }
    }
  }

  // Auth0-based signup (redirect to Auth0)
  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      await loginWithRedirect({
        appState: {
          returnTo: "/dashboard",
        },
        authorizationParams: {
          prompt: "login",
          screen_hint: "signup",
          login_hint: data.email,
        },
      })
      return { success: true }
    } catch (error) {
      console.error('Signup error:', error)
      return { 
        success: false, 
        error: 'Registration failed. Please try again.' 
      }
    }
  }

  // Logout function
  const logout = () => {
    clearAuthData()
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    })
    
    // Dispatch custom event to handle navigation
    window.dispatchEvent(new CustomEvent('userLoggedOut'))
  }

  // Refresh token function (Auth0 handles this automatically)
  const refreshToken = async (): Promise<boolean> => {
    try {
      if (auth0IsAuthenticated) {
        const accessToken = await getAccessTokenSilently()
        setToken(accessToken)
        return true
      }
      return false
    } catch (error) {
      console.error('Token refresh error:', error)
      return false
    }
  }

  // Update user profile function
  const updateUserProfile = async (data: ProfileUpdateData): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!token) {
        return { success: false, error: 'No authentication token available' }
      }

      // Set flag to prevent sync from overwriting our update
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
      await fetchCurrentUser(token)

        // DON'T re-enable sync immediately - keep it blocked to prevent overwriting
        // The sync will naturally re-enable on the next auth state change
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
    isAuthenticated: auth0IsAuthenticated && !!user && !!token,
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
    <Auth0Context.Provider value={value}>
      {children}
    </Auth0Context.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(Auth0Context)
  if (context === undefined) {
    throw new Error('useAuth must be used within an Auth0AuthProvider')
  }
  return context
}

// Higher-order component for protected routes
export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const { loginWithRedirect } = useAuth0()
  const { t } = useTranslation()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
      authorizationParams: {
        prompt: "login",
      },
    })
  }

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
          <Button 
            className="w-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200 text-white font-medium text-base" 
            style={{ minHeight: '48px', backgroundColor: '#2E3192' }}
            onClick={handleLogin}
          >
            {t('auth.signIn')}
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
