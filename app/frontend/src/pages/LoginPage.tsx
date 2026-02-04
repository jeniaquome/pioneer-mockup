import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useAuth } from '@/contexts/Auth0Context'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from 'react-i18next'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/button'
import { CheckCircle, Lock } from 'lucide-react'

export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { loginWithRedirect } = useAuth0()
  const { isAuthenticated, isLoading, user } = useAuth()
  const { toast } = useToast()
  const { t } = useTranslation()

  // Check for ISS parameter (email verification)
  const issParam = searchParams.get('iss')

  useEffect(() => {
    // If user is authenticated, handle email verification and redirect
    if (isAuthenticated && user) {
      if (issParam) {
        // Show email verification success toast
        toast({
          title: t('auth.emailVerified'),
          description: t('auth.emailVerifiedDescription'),
          variant: 'default',
        })
      }
      
      // Redirect to dashboard after a short delay to show the toast
      const redirectTimer = setTimeout(() => {
        navigate('/dashboard')
      }, 2000)

      return () => clearTimeout(redirectTimer)
    }
  }, [isAuthenticated, user, issParam, navigate, toast, t])

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        appState: {
          returnTo: "/dashboard",
        },
        authorizationParams: {
          prompt: "login",
        },
      })
    } catch (error) {
      console.error('Login error:', error)
      toast({
        title: t('auth.loginError'),
        description: t('auth.loginErrorDescription'),
        variant: 'destructive',
      })
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <>
        <SEO 
          title="Sign In"
          description="Sign in to your Pittsburgh Tomorrow Pioneer account."
          noindex={true}
        />
        <div className="flex items-center justify-center min-h-screen bg-white font-sans">
          <div className="text-center p-8 max-w-md mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-reflex-blue mx-auto mb-4"></div>
            <p className="text-gray-600 font-sans">{t('common.loading')}</p>
          </div>
        </div>
      </>
    )
  }

  // If authenticated, show redirect message
  if (isAuthenticated && user) {
    return (
      <>
        <SEO 
          title="Sign In"
          description="Sign in to your Pittsburgh Tomorrow Pioneer account."
          noindex={true}
        />
        <div className="flex items-center justify-center min-h-screen bg-white font-sans">
          <div className="text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-brand-reflex-blue mb-2 font-brand-heading">
                {issParam ? t('auth.emailVerified') : t('auth.alreadySignedIn')}
              </h2>
              <p className="text-gray-600 mb-6 font-sans">
                {issParam ? t('auth.emailVerifiedDescription') : t('auth.redirectingToDashboard')}
              </p>
            </div>
            <div className="animate-pulse">
              <div className="h-2 bg-brand-pms-285 rounded-full mx-auto w-32"></div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Show login form for unauthenticated users
  return (
    <>
      <SEO 
        title="Sign In"
        description="Sign in to your Pittsburgh Tomorrow Pioneer account to access personalized resources and recommendations."
        noindex={true}
      />
      <div className="flex items-center justify-center min-h-screen bg-white font-sans">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="mb-6">
            <div className="w-16 h-16 bg-brand-reflex-blue rounded-full mx-auto mb-4 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600 mb-6 font-sans">
              {t('auth.signInDescription')}
            </p>
          </div>
          
          <div className="space-y-4">
            <Button 
              className="w-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200 text-white font-medium text-base hover:scale-105 font-sans"
              style={{ minHeight: '48px', backgroundColor: '#2E3192' }}
              onClick={handleLogin}
            >
              {t('auth.signInWithAuth0')}
            </Button>
            
            <div className="text-sm text-gray-500 font-sans">
              {t('auth.signInHelp')}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
