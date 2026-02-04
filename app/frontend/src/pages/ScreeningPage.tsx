import { ScreeningForm } from '@/components/ScreeningForm'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/Auth0Context'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import { generateSectionId } from '@/lib/geo-utils'

export function ScreeningPage() {
  const { t } = useTranslation()
  const { isAuthenticated, user } = useAuth()
  const { loginWithRedirect } = useAuth0()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const isEditMode = urlParams.get('mode') === 'edit'

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

  
  // Show message for already onboarded users unless in edit mode
  if (isAuthenticated && user?.is_onboarded && !isEditMode) {
    return (
      <>
        <SEO 
          title="Survey Complete"
          description="You've already completed your Pittsburgh settlement survey. View your personalized roadmap or edit your responses."
          url="https://www.pittsburghpioneer.com/screening"
        />
        <main className="min-h-screen bg-white">
        <div className="container max-w-4xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <section className="text-center">
            <header className="mb-8">
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#08A576' }}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 id={generateSectionId(t('dashboard.completedSurveyHeader'))} className="font-brand-heading text-3xl sm:text-4xl font-bold text-brand-pms-129 mb-4">
                {t('dashboard.completedSurveyHeader')}
              </h1>
              <p className="font-brand-subheading text-lg sm:text-xl text-brand-reflex-blue max-w-2xl mx-auto mb-8">
                {user.first_survey_at ?
                  t('dashboard.completedSurveyTextWithDate', {
                    date: new Date(user.first_survey_at).toLocaleDateString()
                  }) :
                  t('dashboard.completedSurveyText')
                }
              </p>
            </header>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link to="/dashboard" className="flex-1">
                <Button className="touch-target w-full text-white font-semibold" style={{ minHeight: '48px', backgroundColor: '#2E3192' }}>
                  {t('dashboard.viewMyRoadmap')}
                </Button>
              </Link>
              <Link to="/profile" className="flex-1">
                <Button className="touch-target w-full font-semibold border-2" style={{ minHeight: '48px', borderColor: '#2E3192', color: '#2E3192', backgroundColor: 'white' }}>
                  {t('dashboard.editResponses')}
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
      </>
    )
  }
  
  return (
    <>
      <SEO 
        title="Settlement Survey"
        description="Take our quick 5-minute survey to receive personalized resource recommendations tailored to your needs and goals in Pittsburgh."
        keywords="Pittsburgh survey, newcomer assessment, personalized recommendations, settlement resources, community integration"
        url="https://www.pittsburghpioneer.com/screening"
      />
      <main className="min-h-screen bg-white">
      <div className="container max-w-4xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        {!isAuthenticated && (
          <section className="mb-6 sm:mb-8 p-4 sm:p-5 border-2 border-brand-pms-285 rounded-xl bg-brand-pms-290/20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-sm sm:text-base text-brand-reflex-blue flex-1 min-w-0">
                {t('screening.saveRoadmapBanner', 'Save your personalized roadmap by logging in. You can take the survey anonymously now and log in later to save it.')}
              </p>
              <Button
                className="touch-target w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-200 text-white font-medium text-base flex-shrink-0"
                style={{ minHeight: '44px', backgroundColor: '#2E3192' }}
                onClick={handleLogin}
              >
                {t('nav.signUp')}
              </Button>
            </div>
          </section>
        )}
        <header className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 id={generateSectionId(t('screening.title'))} className="font-brand-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-pms-129 mb-4 sm:mb-6 leading-tight">
            {t('screening.title')}
          </h1>
          <p className="font-brand-subheading text-lg sm:text-xl lg:text-2xl text-brand-reflex-blue max-w-3xl mx-auto leading-relaxed">
            {t('screening.description')}
          </p>
        </header>
        <section>
          <ScreeningForm />
        </section>
      </div>
    </main>
    </>
  )
}
