import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function OnboardingLoadingScreen() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  const LOADING_MESSAGES = [
    t('onboarding.thinking', 'Thinking...'),
    t('onboarding.curatingRecommendations', 'Curating personalized recommendations...'),
    t('onboarding.findingResources', 'Finding the best resources...'),
    t('onboarding.complete', 'Complete!')
  ]
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showFallbackButton, setShowFallbackButton] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        const next = prev + 1
        if (next >= LOADING_MESSAGES.length - 1) {
          setIsComplete(true)
          clearInterval(interval)
          return next
        }
        return next
      })
    }, 2500) // Change message every 2.5 seconds (increased by 500ms)

    return () => clearInterval(interval)
  }, [])

  // Show fallback button after loading sequence is complete
  useEffect(() => {
    if (isComplete) {
      // Add a small delay after completion for better UX
      const fallbackTimer = setTimeout(() => {
        setShowFallbackButton(true)
      }, 1000) // 1 second after completion

      return () => clearTimeout(fallbackTimer)
    }
  }, [isComplete])

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        {/* Bridgit Image with Animation */}
        <div className="mb-8 relative">
          <div 
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
              isComplete ? 'bg-green-100' : 'bg-brand-pms-290/30'
            }`}
          >
            <img
              src="/branding/assets/new-bridgit.png"
              alt="Bridgit AI assistant"
              className={`w-[72px] h-[72px] object-contain transition-transform duration-1000 ${
                isComplete ? 'scale-110' : 'animate-pulse'
              }`}
              draggable={false}
            />
          </div>
          
          {/* Rotating border animation (only when not complete) */}
          {!isComplete && (
            <div className="absolute inset-0 w-24 h-24 mx-auto">
              <div 
                className="w-full h-full border-4 border-transparent border-t-brand-reflex-blue rounded-full animate-spin"
                style={{ animationDuration: '2s' }}
              />
            </div>
          )}
        </div>

        {/* Loading Message */}
        <div className="mb-6">
          <h2 
            className="text-2xl font-bold mb-3 transition-all duration-500"
            style={{ color: '#2E3192' }}
          >
            {t('onboarding.creatingYourPlan', 'Creating Your Personalized Plan')}
          </h2>
          
          <div className="h-8 flex items-center justify-center">
            <p 
              className="text-lg font-medium transition-all duration-300 opacity-100"
              style={{ color: '#4987C6' }}
              key={currentMessageIndex} // Force re-render for animation
            >
              {LOADING_MESSAGES[currentMessageIndex]}
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="w-full bg-brand-pms-290 rounded-full h-2 mb-4">
          <div 
            className="bg-brand-reflex-blue h-2 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${((currentMessageIndex + 1) / LOADING_MESSAGES.length) * 100}%` 
            }}
          />
        </div>

        {/* Completion Check */}
        {isComplete && (
          <div className="flex items-center justify-center gap-2 text-green-600 animate-fade-in">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{t('onboarding.ready', 'Ready!')}</span>
          </div>
        )}

        {/* Fallback Button - appears after 3 seconds */}
        {showFallbackButton && (
          <div className="mt-6 animate-fade-in">
            <Button
              onClick={() => navigate('/dashboard')}
              className="btn-brand-primary px-6 py-3"
              style={{ minHeight: '48px' }}
            >
              {t('onboarding.seeMyRecommendations', 'See my recommendations')}
            </Button>
          </div>
        )}

        {/* Subtle hint */}
        <p 
          className="text-sm mt-6 opacity-70"
          style={{ color: '#4987C6' }}
        >
          {t('onboarding.loadingHint', 'This may take a moment as we personalize your experience...')}
        </p>
      </div>
    </div>
  )
}
