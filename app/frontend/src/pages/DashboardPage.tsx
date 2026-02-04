import { useAuth } from '@/contexts/Auth0Context'
import { useAuth0 } from '@auth0/auth0-react'
import { RoleBasedContent } from '@/components/RoleBasedContent'
import { AdminDashboard } from '@/components/AdminDashboard'
import { NameDialog } from '@/components/NameDialog'
import { useTranslation } from 'react-i18next'
import { Link, useParams, Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { User, Pencil } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { useState, useEffect } from 'react'
import { generateSectionId } from '@/lib/geo-utils'

export function DashboardPage() {
  const { isAuthenticated, user } = useAuth()
  const { loginWithRedirect } = useAuth0()
  const { tab } = useParams()
  const { t } = useTranslation()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [showNameDialog, setShowNameDialog] = useState(false)
  
  

  // Check if user needs to provide their name
  useEffect(() => {
    if (user && isAuthenticated) {
      const hasName = user.first_name?.trim() || user.last_name?.trim()
      if (!hasName) {
        // Small delay to ensure the page has loaded
        const timer = setTimeout(() => {
          setShowNameDialog(true)
        }, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [user, isAuthenticated])

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        prompt: "login",
      },
    })
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <>
        <SEO 
          title="Sign In Required"
          description="Sign in to access your personalized Pittsburgh settlement dashboard and resources."
          noindex={true}
        />
        <main className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center p-8 max-w-md mx-auto bg-white rounded-2xl shadow-2xl border-2" style={{ borderColor: '#4987C6' }}>
            <div className="mb-8">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #2E3192 0%, #4987C6 100%)'
                }}
              >
                <User className="w-10 h-10 text-white" />
              </div>
              <h1 
                className="text-3xl font-bold italic mb-3"
                style={{ 
                  color: '#2E3192'
                }}
              >
                {t('common.authenticationRequired', 'Access Required')}
              </h1>
              <p 
                className="text-lg mb-8"
                style={{ 
                  color: '#2E3192'
                }}
              >
                {t('dashboard.signInExplore', 'Sign in to explore your personalized Pittsburgh journey')}
              </p>
            </div>
            <Button 
              className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{ 
                background: 'linear-gradient(135deg, #2E3192 0%, #4987C6 100%)',
                minHeight: '56px',
                fontSize: '16px'
              }}
              onClick={handleLogin}
            >
              {t('dashboard.signInToPioneer', 'Sign in to Pioneer').toUpperCase()}
            </Button>
          </div>
        </div>
      </main>
      </>
    )
  }

  // Show admin dashboard for admin users (unless they explicitly request personalized view)
  if (user.role === 'admin') {
    // Check if admin user wants to see personalized dashboard
    const viewParam = searchParams.get('view')
    if (viewParam === 'personalized') {
      // Show personalized dashboard for admin users
      // Continue to the regular dashboard rendering below
    } else {
      // Valid admin tabs (new routing)
      const validTabs = ['overview', 'csv-upload', 'resources', 'translations']

      // Backward compatibility: redirect old /dashboard paths to /admin-dashboard
      if (location.pathname.startsWith('/dashboard') && !viewParam) {
        const targetTab = tab && validTabs.includes(tab) ? tab : 'overview'
        return <Navigate to={`/admin-dashboard/${targetTab}`} replace />
      }
      
      // If no tab specified or base /admin-dashboard, redirect to overview
      if (!tab && !viewParam) {
        return <Navigate to="/admin-dashboard/overview" replace />
      }
      
      // If invalid tab, redirect to overview
      if (tab && !validTabs.includes(tab) && !viewParam) {
        return <Navigate to="/admin-dashboard/overview" replace />
      }

      // Show admin dashboard
      return (
        <main className="min-h-screen bg-white">
          <div className="container mx-auto px-6 py-8 max-w-screen-2xl">
            <AdminDashboard initialTab={tab || 'overview'} />
          </div>
        </main>
      )
    }
  }

  // Main Dashboard Layout
  return (
    <>
      <SEO 
        title="My Dashboard"
        description="Your personalized Pittsburgh settlement dashboard with priority resources and progress tracking."
        noindex={true}
      />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-8 max-w-7xl">

        {/* Clean Welcome Section */}
        <header className="bg-white rounded-2xl p-8 mb-8 shadow-lg border-2" style={{ borderColor: '#4987C6' }}>
          <div>
            <h1
              id={generateSectionId(user.first_name || user.username
                ? t('dashboard.welcomeTitle', 'Welcome to Pioneer, {{name}}!', { name: user.first_name || user.username })
                : t('dashboard.welcomeTitleWithoutName', 'Welcome to Pioneer!'))}
              className="mb-1 font-bold"
              style={{
                fontSize: '1.5rem',
                color: '#2E3192',
                lineHeight: '1.1'
              }}
            >
              {(user.first_name || user.username)
                ? t('dashboard.welcomeTitle', 'Welcome to Pioneer, {{name}}!', { name: user.first_name || user.username })
                : t('dashboard.welcomeTitleWithoutName', 'Welcome to Pioneer!')
              }
              {user.is_demo_user && (
                <span
                  className="ml-2 text-sm font-normal"
                  style={{ color: '#F4B33D' }}
                >
                  (Demo)
                </span>
              )}
            </h1>
            <p 
              className="text-lg"
              style={{ 
                color: '#4987C6'
              }}
            >
              {user.is_onboarded 
                ? t('dashboard.journeyContinues', 'Your personalized journey continues...')
                : t('dashboard.beginJourney', 'Begin your personalized Pittsburgh journey')}
            </p>
          </div>
        </header>

        {/* Main Content - Simplified Layout */}
        <div className="space-y-12">
          {/* Show roadmap section for all users */}
          {user.is_onboarded ? (
            <>
              {/* Survey completion status */}
              <section className="bg-white rounded-2xl p-6 shadow-lg border-3" style={{ borderColor: '#4987C6' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2
                        id={generateSectionId(t('dashboard.completedSurveyHeader', "You've Already Completed the Survey"))}
                        className="font-bold"
                        style={{
                          color: '#2E3192',
                          fontSize: '1.25rem'
                        }}
                      >
                        {t('dashboard.completedSurveyHeader', "You've Already Completed the Survey")}
                      </h2>
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#08A576' }}
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p 
                      style={{ 
                        color: '#4987C6',
                        fontSize: '0.9rem'
                      }}
                    >
                      {user.first_survey_at
                        ? t('dashboard.completedSurveyTextWithDate', 'You completed your onboarding survey on {{date}}. View your personalized roadmap below or edit your responses to update your recommendations.', { date: new Date(user.first_survey_at).toLocaleDateString() })
                        : t('dashboard.completedSurveyText', 'You completed your onboarding survey. View your personalized roadmap below or edit your responses to update your recommendations.')}
                    </p>
                    <p 
                      className="mt-2 text-sm"
                      style={{ 
                        color: '#4987C6'
                      }}
                    >
                      <strong>{t('dashboard.noteLabel', 'Note:')}</strong> {t('dashboard.editRegenerateNote', 'If you edit your survey responses, your personalized recommendations and roadmap will be automatically regenerated to better match your updated preferences.')}
                    </p>
                  </div>
                  <Link to="/profile" state={{ fromPersonalizedDashboard: user.role === 'admin' && searchParams.get('view') === 'personalized' }}>
                    <Button 
                      className="font-semibold px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-white flex items-center gap-2"
                      style={{ 
                        backgroundColor: '#2E3192',
                        fontSize: '0.9rem'
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                      {t('common.edit', 'Edit')}
                    </Button>
                  </Link>
                </div>
                
                {/* Bridgit Help Clause */}
                <div 
                  className="mt-4 p-4 rounded-xl text-base border-2 shadow-md"
                  style={{ 
                    backgroundColor: '#FEF7CD',
                    borderColor: '#F4B33D',
                    color: '#2E3192'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-white rounded-full shadow-md border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: '#2E3192' }}>
                      <img
                        src="/branding/assets/new-bridgit.png"
                        alt="Bridgit"
                        className="w-12 h-12 object-contain"
                        draggable={false}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg mb-1" style={{ color: '#2E3192' }}>
                        {t('common.askBridget', 'Ask BRIDGIT')}
                      </div>
                      <div className="font-semibold" style={{ color: '#2E3192', opacity: 0.9 }}>
                        {t('dashboard.bridgitHelp', 'Have questions not covered by the survey? Click the Bridgit chatbot on the bottom right for personalized assistance!')}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </>
          ) : (
            /* Non-onboarded users see survey prompt */
            <section className="bg-white rounded-2xl p-8 shadow-lg border-3" style={{ borderColor: '#4987C6' }}>
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#2E3192' }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <h2 
                    className="font-bold"
                    style={{ 
                      fontSize: '1.5rem',
                      color: '#2E3192'
                    }}
                  >
                    {t('dashboard.personalizedRoadmap', 'Your Personalized Roadmap')}
                  </h2>
                  <p 
                    className="text-sm font-medium"
                    style={{ color: '#4987C6' }}
                  >
                    {t('dashboard.unlockExperience', 'Unlock your customized experience').toUpperCase()}
                  </p>
                </div>
              </div>

              <div 
                className="p-8 border-3 border-dashed rounded-2xl text-center"
                style={{ 
                  borderColor: '#4987C6',
                  backgroundColor: '#D2EDF6'
                }}
              >
                <h2
                  id={generateSectionId(t('dashboard.completeSurveyHeader', 'Complete Your Survey to Get Started'))}
                  className="font-bold mb-3"
                  style={{
                    color: '#2E3192',
                    fontSize: '1.25rem'
                  }}
                >
                  {t('dashboard.completeSurveyHeader', 'Complete Your Survey to Get Started')}
                </h2>
                <p 
                  className="mb-6 max-w-xl mx-auto"
                  style={{ 
                    color: '#2E3192',
                    opacity: '0.8'
                  }}
                >
                  {t('dashboard.completeSurveyText', 'Take our quick 5-minute survey to receive personalized resource recommendations tailored specifically to your needs and goals in Pittsburgh.')}
                </p>
                <Link to="/screening">
                  <Button 
                    className="bg-brand-reflex-blue hover:bg-brand-reflex-blue-dark text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ minHeight: '48px' }}
                  >
                    {t('profile.takeSurvey', 'Take the Survey')}
                  </Button>
                </Link>
              </div>
            </section>
          )}



          {/* Role-based content - no redundant header since it's the main content */}
          <RoleBasedContent />
        </div>
      </div>

      {/* Name Dialog */}
      <NameDialog 
        open={showNameDialog} 
        onClose={() => setShowNameDialog(false)} 
      />
    </main>
    </>
  )
}