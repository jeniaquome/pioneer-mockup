import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { normalizeAnswersToCamelCase, normalizeAnswersToSnakeCase } from '@/lib/utils'
import { buildOptions, mapSurveyResponsesToCodes, QUESTION_IDS } from '@/lib/survey'
import { useAuth } from '@/contexts/Auth0Context'
import { useAuth0 } from '@auth0/auth0-react'
import { OnboardingLoadingScreen } from './OnboardingLoadingScreen'

export function ScreeningForm() {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [submitting, setSubmitting] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const isEditMode = urlParams.get('mode') === 'edit'
  const { t } = useTranslation()
  const { isAuthenticated, user, submitOnboarding, updateOnboardingResponses } = useAuth()
  const { loginWithRedirect } = useAuth0()

  // Question IDs in order
  const questionIds = [...QUESTION_IDS]

  // Get questions data from translations
  const getQuestions = () => {
    return questionIds.map(id => {
      const questionKey = `screening.questions.${id}`
      const question = t(`${questionKey}.question`)
      const options = buildOptions(id as any, t)

      return {
        id,
        question,
        options,
        multiple: id === 'communityPriorities' || id === 'immediateNeeds'
      }
    })
  }

  const questions = getQuestions()
  const totalSteps = questions.length

  // Load saved answers from sessionStorage on mount; if edit mode and user has stored responses, prefill from profile
  useEffect(() => {
    try {
      // Clean up legacy localStorage entries
      if (localStorage.getItem('screening_progress')) {
        localStorage.removeItem('screening_progress')
      }

      if (isEditMode && user?.survey_responses) {
        const camel = normalizeAnswersToCamelCase(user.survey_responses as any)
        const coded = mapSurveyResponsesToCodes(camel as any)
        setAnswers(coded)
      } else {
        const raw = sessionStorage.getItem('survey_answers_v1')
        if (raw) {
          const saved = JSON.parse(raw) as Record<string, string | string[]>
          const camel = normalizeAnswersToCamelCase(saved)
          const coded = mapSurveyResponsesToCodes(camel as any)
          setAnswers(coded)
          // Jump to first unanswered question
          const firstUnansweredIndex = questionIds.findIndex((id) => {
            const ans = camel[id]
            return ans == null || (Array.isArray(ans) && (ans as string[]).length === 0)
          })
          if (firstUnansweredIndex >= 0) {
            setCurrentStep(firstUnansweredIndex)
          }
        }
      }
    } catch (err) {
      // Ignore parse errors and start fresh
    }
  }, [isEditMode, user])

  // Persist answers to sessionStorage whenever they change (anonymous-first)
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      const normalized = normalizeAnswersToSnakeCase(answers)
      sessionStorage.setItem('survey_answers_v1', JSON.stringify(normalized))
    }
  }, [answers])

  function handleChange(id: string, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }))
    setShowErrors(false)
  }

  function handleMultipleChange(id: string, value: string, checked: boolean) {
    setAnswers((a) => {
      const currentValues = Array.isArray(a[id]) ? a[id] as string[] : []
      
      // Our option values are stable codes; the "none" option is represented by code 'none'
      const isNoneOption = value === 'none'
      
      if (checked) {
        if (isNoneOption) {
          // If selecting "None of these", clear all other options and only keep this one
          return { ...a, [id]: ['none'] }
        } else {
          // If selecting any other option, remove "None of these" if it exists and add the new option
          const filteredValues = currentValues.filter(v => v !== 'none')
          return { ...a, [id]: [...filteredValues, value] }
        }
      } else {
        // Unchecking - just remove the value
        return { ...a, [id]: currentValues.filter(v => v !== value) }
      }
    })
    setShowErrors(false)
  }

  function isComplete() {
    return questions.every((q) => {
      const answer = answers[q.id]
      // For multi-select questions, require at least one selection
      if (q.multiple) {
        return Array.isArray(answer) && answer.length > 0
      }
      return answer && answer !== '' // For single-select, must have a non-empty value
    })
  }

  function isCurrentStepValid() {
    const currentQuestion = questions[currentStep]
    if (!currentQuestion) return false
    
    const answer = answers[currentQuestion.id]
    // For multi-select questions, require at least one selection
    if (currentQuestion.multiple) {
      return Array.isArray(answer) && answer.length > 0
    }
    return answer && answer !== '' // For single-select, must have a non-empty value
  }

  function handleNext() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  function handlePrevious() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }



  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setShowErrors(true)
    if (!isComplete()) {
      // Navigate to first unanswered question
      const firstUnanswered = questions.findIndex(q => !answers[q.id])
      if (firstUnanswered !== -1) {
        setCurrentStep(firstUnanswered)
      }
      return
    }
    
    setSubmitting(true)
    
    try {
      if (!isAuthenticated) {
        // Anonymous user: keep in sessionStorage and redirect to Auth0 login
        await loginWithRedirect({
          appState: {
            returnTo: "/dashboard",
          },
          authorizationParams: {
            prompt: "login",
          },
        })
        return
      }
      
      if (isAuthenticated && !user?.is_onboarded) {
        // Authenticated but not onboarded: submit onboarding
        const result = await submitOnboarding(answers)
        
        if (result.success) {
          navigate('/dashboard')
        } else {
          console.error('Failed to submit onboarding:', result.error)
          // Show error message or fallback to checklist
          alert(`Error submitting survey: ${result.error}`)
        }
        return
      }
      
      if (isAuthenticated && user?.is_onboarded) {
        // Edit mode: update responses
        if (isEditMode) {
          const result = await updateOnboardingResponses(answers)
          if (result.success) {
            navigate('/dashboard')
          } else {
            alert(`Error updating responses: ${result.error}`)
          }
        } else {
          navigate('/profile')
        }
        return
      }
    } catch (error) {
      console.error('Error during submit:', error)
      // Fallback to legacy checklist behavior
      const searchParams = new URLSearchParams()
      const normalized = normalizeAnswersToSnakeCase(answers)
      Object.entries(normalized).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          searchParams.set(key, value.join(','))
        } else {
          searchParams.set(key, value)
        }
      })
      navigate(`/checklist?${searchParams.toString()}`, { 
        state: { answers } 
      })
    } finally {
      setSubmitting(false)
    }
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / totalSteps) * 100

  // Show loading screen when submitting
  if (submitting) {
    return <OnboardingLoadingScreen />
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="brand-accent text-sm text-brand-reflex-blue font-medium">
              {t('common.stepOf', { current: currentStep + 1, total: totalSteps })}
            </span>
            <span className="brand-accent text-sm text-gray-600">
              {t('common.percentComplete', { percent: Math.round(progress) })}
            </span>
          </div>
          <div className="w-full bg-brand-pms-290 rounded-full h-3">
            <div 
              className="bg-brand-reflex-blue h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white border-2 border-brand-pms-285 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
          <h2 className="brand-subheading text-brand-reflex-blue mb-6 text-xl sm:text-2xl leading-tight" style={{ textTransform: 'none' }}>
            {currentQuestion?.question}
          </h2>

          {currentQuestion?.multiple ? (
            // Multiple choice question
            <div className="space-y-3">
              {currentQuestion.options.map((opt: any) => {
                const optionValue = typeof opt === 'string' ? opt : opt.value
                const optionLabel = typeof opt === 'string' ? opt : opt.label
                const isChecked = Array.isArray(answers[currentQuestion.id])
                  ? (answers[currentQuestion.id] as string[]).includes(optionValue)
                  : false
                return (
                  <label
                    key={optionValue}
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-brand-pms-285 hover:bg-brand-pms-290/30 transition-all duration-200 interactive-element"
                    style={{ minHeight: '60px' }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleMultipleChange(currentQuestion.id, optionValue, e.target.checked)}
                      className="w-5 h-5 text-brand-reflex-blue focus:ring-brand-pms-285 border-gray-300 rounded"
                    />
                    <span className="brand-accent text-gray-700 flex-1">{optionLabel}</span>
                  </label>
                )
              })}
            </div>
          ) : (
            // Single choice question
            <RadioGroup 
              value={answers[currentQuestion?.id] as string || ''} 
              onValueChange={(value) => handleChange(currentQuestion?.id || '', value)}
              className="space-y-3"
            >
              {currentQuestion?.options.map((option: any) => {
                const optionValue = typeof option === 'string' ? option : option.value
                const optionLabel = typeof option === 'string' ? option : option.label
                return (
                  <div key={optionValue} className="flex items-center space-x-3">
                    <label
                      htmlFor={`radio-${currentQuestion.id}-${optionValue}`}
                      className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-brand-pms-285 hover:bg-brand-pms-290/30 transition-all duration-200 interactive-element w-full"
                      style={{ minHeight: '60px' }}
                    >
                      <RadioGroupItem 
                        value={optionValue} 
                        id={`radio-${currentQuestion.id}-${optionValue}`}
                        className="w-5 h-5"
                      />
                      <span className="brand-accent text-gray-700 flex-1">{optionLabel}</span>
                    </label>
                  </div>
                )
              })}
            </RadioGroup>
          )}

          {/* Error Message */}
          {showErrors && !answers[currentQuestion?.id] && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm brand-accent">Please select an answer to continue.</p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-row gap-3">
          {/* Previous Button */}
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn-brand-outline touch-target flex-1 h-12 text-sm sm:text-base"
            style={{ minHeight: '48px' }}
          >
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">{t('common.previousButton')}</span>
            <span className="xs:hidden">{t('common.prev', 'Prev')}</span>
          </Button>

          {/* Next/Submit Button */}
          {currentStep === totalSteps - 1 ? (
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleSubmit(e)
              }}
              disabled={submitting || !isComplete()}
              className="btn-brand-primary touch-target flex-1 h-12 text-sm sm:text-base"
              style={{ minHeight: '48px' }}
            >
              <span className="hidden xs:inline">{t('common.completeAssessment')}</span>
              <span className="xs:hidden">{t('common.complete', 'Complete')}</span>
              <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              className="btn-brand-primary touch-target flex-1 h-12 text-sm sm:text-base"
              style={{ minHeight: '48px' }}
            >
              <span className="hidden xs:inline">{t('common.nextButton')}</span>
              <span className="xs:hidden">{t('common.next', 'Next')}</span>
              <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
            </Button>
          )}
        </div>

        {/* Quick Navigation Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 interactive-element ${
                index === currentStep 
                  ? 'bg-brand-reflex-blue' 
                  : answers[questions[index].id] 
                    ? 'bg-brand-pms-285' 
                    : 'bg-gray-300'
              }`}
              style={{ minWidth: '20px', minHeight: '20px' }}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
