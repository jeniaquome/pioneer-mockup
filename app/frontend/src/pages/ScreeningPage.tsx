import { ScreeningForm } from '@/components/ScreeningForm'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/Auth0Context'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'

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
        <main className="min-h-screen bg-brand-reflex-blue pt-24">
          <div className="container max-w-4xl mx-auto py-16 sm:py-24 px-6">
            <section className="text-center">
              {/* Success Icon */}
              <div className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center bg-brand-pms-129/20 border-4 border-brand-pms-129">
                <CheckCircle className="w-12 h-12 text-brand-pms-129" />
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
                {t('dashboard.completedSurveyHeader', 'Survey Complete!')}
              </h1>

              <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light">
                {user.first_survey_at ?
                  t('dashboard.completedSurveyTextWithDate', {
                    date: new Date(user.first_survey_at).toLocaleDateString()
                  }) :
                  t('dashboard.completedSurveyText', 'Your personalized roadmap is ready. View your recommendations or update your responses anytime.')
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link to="/dashboard" className="flex-1">
                  <button className="w-full group relative overflow-hidden bg-brand-pms-129 text-brand-reflex-blue px-8 py-4 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(244,179,61,0.5)] transition-all duration-500">
                    <span>{t('dashboard.viewMyRoadmap', 'View My Roadmap')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/profile" className="flex-1">
                  <button className="w-full px-8 py-4 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                    {t('dashboard.editResponses', 'Edit Responses')}
                  </button>
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
      <main className="min-h-screen bg-white pt-24">
        {/* Hero Header */}
        <section className="bg-brand-reflex-blue py-16 sm:py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #F4B33D 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, #F4B33D 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="container max-w-4xl mx-auto px-6 relative z-10">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-brand-pms-129" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/80">
                  {t('screening.badge', '5-Minute Survey')}
                </span>
              </div>
            </div>

            <header className="text-center">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
                {t('screening.title', 'Get Your')} <span className="text-brand-pms-129 italic">{t('screening.titleAccent', 'Personal Guide')}</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                {t('screening.description', 'Answer a few questions and we\'ll create a customized roadmap with resources tailored to your specific needs and goals.')}
              </p>
            </header>
          </div>
        </section>

        {/* Form Section */}
        <div className="container max-w-4xl mx-auto py-12 sm:py-16 px-6">
          {/* Login Banner for non-authenticated users */}
          {!isAuthenticated && (
            <section className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-brand-reflex-blue/5 to-brand-pms-129/5 border border-brand-reflex-blue/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-brand-reflex-blue font-medium mb-1">
                    {t('screening.saveRoadmapTitle', 'Save your progress')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t('screening.saveRoadmapBanner', 'Log in to save your personalized roadmap. You can take the survey anonymously and log in later.')}
                  </p>
                </div>
                <button
                  className="flex-shrink-0 bg-brand-reflex-blue text-white px-6 py-3 rounded-sm text-[11px] font-black uppercase tracking-[0.15em] hover:bg-brand-pms-129 hover:text-brand-reflex-blue transition-all duration-300"
                  onClick={handleLogin}
                >
                  {t('nav.signUp', 'Sign Up')}
                </button>
              </div>
            </section>
          )}

          {/* Form */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <ScreeningForm />
          </section>
        </div>
      </main>
    </>
  )
}
