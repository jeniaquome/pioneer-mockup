import { useAuth } from '@/contexts/Auth0Context'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTranslatedRoadmap } from '@/hooks/use-translated-roadmap'
import { 
  Heart, 
  Home, 
  AlertTriangle,
  Users,
  DollarSign,
  Star,
  GraduationCap,
  Dumbbell,
  Palette,
  Church
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { API_BASE_URL } from '@/lib/api'

type PriorityCategory = {
  key: string
  title: string
  subtitle?: string
  order: number
}

// Map priority category keys to resource taxonomy paths
const getCategoryRoute = (key: string): string => {
  switch (key) {
    // Navigate to personalized, AI-ranked view under dashboard
    case 'housing':
    case 'education':
    case 'income':
    case 'first_things_first':
    case 'meeting_people':
    case 'kids_activities':
    case 'faith_communities':
    case 'sports_wellness':
    case 'arts_entertainment':
      return `/dashboard/priority/${key}`
    default:
      return '/resources'
  }
}

export function RoleBasedContent() {
  const { user, isAuthenticated, token } = useAuth()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { translatedSummary, isLoading: isTranslationLoading } = useTranslatedRoadmap()
  const [categories, setCategories] = useState<PriorityCategory[] | null>(null)

  useEffect(() => {
    let ignore = false
    async function load() {
      if (!isAuthenticated || !user) {
        setCategories(null)
        return
      }
      if (!user.is_onboarded) {
        setCategories(null)
        return
      }
      if (!token) {
        if (!ignore) setCategories([])
        return
      }

      try {
        const languageParam = i18n.language && i18n.language !== 'en' ? `?language=${i18n.language}` : ''
        const res = await fetch(`${API_BASE_URL}/onboarding/priority-categories${languageParam}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json().catch(() => ({ categories: [], source: 'unknown' }))
        if (!ignore) {
          const arr = Array.isArray(data?.categories) ? data.categories : []
          const allowedOrder = [
            'housing','education','income','first_things_first','meeting_people',
            'kids_activities','faith_communities','sports_wellness','arts_entertainment'
          ]
          const orderMap: Record<string, number> = Object.fromEntries(allowedOrder.map((k, i) => [k, i + 1]))
          const cleaned = arr
            .filter((c: any) => c && typeof c.key === 'string' && allowedOrder.includes(c.key))
            .map((c: any) => ({
              key: c.key,
              title: c.title || c.key.replace(/_/g, ' ').replace(/\b\w/g, (m: string) => m.toUpperCase()),
              subtitle: c.subtitle || '',
              order: Number(c.order || orderMap[c.key] || 999),
            }))
            .sort((a: any, b: any) => a.order - b.order)

          setCategories(cleaned)
        }
      } catch (e) {
        console.error('[PriorityCategories] Error fetching categories:', e)
        if (!ignore) setCategories([])
      }
    }
    load()
  }, [isAuthenticated, user?.id, user?.is_onboarded, user?.checklist_id, token, i18n.language])

  if (!isAuthenticated || !user) {
    return null
  }

  // Only show Priority Resources if user has actually completed the survey (has survey responses)
  const hasSurveyResponses = user.survey_responses && Object.keys(user.survey_responses).length > 0
  const showPriorityResources = Boolean(user.is_onboarded && hasSurveyResponses)
  
  const cards = useMemo(() => {
    // If categories haven't loaded yet (null), return null to show loading state
    if (categories === null) {
      return null
    }
    
    // If categories is an empty array, return empty (user doesn't need specific help)
    if (Array.isArray(categories) && categories.length === 0) {
      return []
    }
    
    // Map categories to card format
    if (categories && categories.length > 0) {
      const iconFor = (key: string) => {
        const common = { className: 'h-6 w-6' }
        switch (key) {
          case 'housing': return <Home {...common} />
          case 'education': return <GraduationCap {...common} />
          case 'income': return <DollarSign {...common} />
          case 'first_things_first': return <AlertTriangle {...common} />
          case 'meeting_people': return <Users {...common} />
          case 'kids_activities': return <Heart {...common} />
          case 'faith_communities': return <Church {...common} />
          case 'sports_wellness': return <Dumbbell {...common} />
          case 'arts_entertainment': return <Palette {...common} />
          default: return <Users {...common} />
        }
      }
      const colorFor = (key: string) => {
        switch (key) {
          case 'housing': return '#2E3192'           // PMS Reflex Blue
          case 'education': return '#68CCE8'         // PMS 2985
          case 'income': return '#F4B33D'            // PMS 129
          case 'first_things_first': return '#F15647' // PMS 179
          case 'meeting_people': return '#954D9E'     // PMS 267
          case 'kids_activities': return '#08A576'   // PMS 354
          case 'faith_communities': return '#4987C6' // PMS 285
          case 'sports_wellness': return '#98CC70'   // PMS 382
          case 'arts_entertainment': return '#FCE51A' // PMS 3955
          default: return '#4987C6'
        }
      }
      return categories.map((c) => ({
        icon: iconFor(c.key),
        title: t(`common.priorityCategories.${c.key}`, c.title),
        // Use the subtitle directly from API - it's already translated based on language param
        description: c.subtitle || '',
        color: colorFor(c.key)
      }))
    }
    
    return []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(categories), t])

  return (
    <div className="w-full">
      {/* Priority Resources - Only show after survey completion */}
      {showPriorityResources && (
        <div id="priority-resources" className="bg-white rounded-2xl p-8 shadow-lg border-3" style={{ borderColor: '#4987C6' }}>
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1">
            <h2 
              className="mb-1 font-bold"
              style={{ 
                fontSize: '1.5rem',
                color: '#2E3192',
                lineHeight: '1.1'
              }}
            >
              {t('common.priorityResourcesForYou', 'Priority Resources For You')}
            </h2>
            <p 
              className="text-lg"
              style={{ 
                color: '#4987C6'
              }}
            >
              {t('common.personalizedRecommendationsLabel', 'Personalized Recommendations')}
            </p>
          </div>
        </div>
        
        {/* Personalized Description */}
        {user?.roadmap_summary && (
          <div 
            className="p-6 rounded-xl border-2 mb-6"
            style={{ 
              backgroundColor: '#D2EDF6',
              borderColor: '#4987C6'
            }}
          >
            <div className="flex items-start gap-3">
              <svg 
                className="w-6 h-6 mt-1 flex-shrink-0"
                style={{ color: '#2E3192' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p 
                  className="leading-relaxed"
                  style={{ 
                    fontSize: '1.1rem',
                    color: '#2E3192'
                  }}
                >
                  {isTranslationLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('common.loading', 'Loading...')}
                    </span>
                  ) : (
                    translatedSummary || user.roadmap_summary
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {cards === null ? (
            // Loading state
            <div 
              className="p-12 border-2 rounded-2xl text-center"
              style={{ 
                borderColor: '#D2EDF6',
                backgroundColor: 'white'
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <svg 
                  className="animate-spin h-12 w-12" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  style={{ color: '#4987C6' }}
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p 
                  className="text-lg font-medium"
                  style={{ color: '#2E3192' }}
                >
                  {t('common.loading', 'Loading your personalized resources...')}
                </p>
              </div>
            </div>
          ) : cards.length > 0 ? (
            // Has categories - show cards
            cards.map((resource, index) => {
              const categoryKey = categories?.[index]?.key || ''
              const routePath = getCategoryRoute(categoryKey)
              
              return (
                <div
                  key={index}
                  className="group p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg cursor-pointer bg-white interactive-element"
                  style={{ 
                    borderColor: '#D2EDF6',
                    minHeight: '44px'
                  }}
                  onClick={() => navigate(routePath)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = resource.color
                    e.currentTarget.style.backgroundColor = resource.color + '10'
                    e.currentTarget.style.cursor = 'pointer'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#D2EDF6'
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ backgroundColor: resource.color + '20' }}
                  >
                    <div style={{ color: resource.color }}>
                      {resource.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 
                      className="font-bold mb-2"
                      style={{ 
                        color: '#2E3192',
                        fontSize: '1.1rem'
                      }}
                    >
                      {resource.title}
                    </h4>
                    <p 
                      className="leading-relaxed"
                      style={{ 
                        color: '#2E3192',
                        opacity: '0.8',
                        fontSize: '0.9rem'
                      }}
                    >
                      {resource.description}
                    </p>
                  </div>
                </div>
              </div>
              )
            })
          ) : (
            // Empty state - user doesn't need specific help
            <div 
              className="p-8 border-3 border-dashed rounded-2xl text-center"
              style={{ 
                borderColor: '#4987C6',
                backgroundColor: '#D2EDF6'
              }}
            >
              <Star 
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: '#4987C6' }}
              />
              <p className="mb-6" style={{ color: '#2E3192', opacity: '0.8', maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '1.1rem' }}>
                {t('common.noPriorityCategoriesMessage', 'Based on your survey responses, you don\'t need specific assistance right now. If your situation changes, you can update your profile. Otherwise, feel free to explore all available resources.')}
              </p>
              <div className="flex justify-center">
                <Link to="/resources">
                  <Button 
                    className="font-semibold px-6 py-3 rounded-xl text-white"
                    style={{ backgroundColor: '#2E3192', minHeight: '44px' }}
                  >
                    {t('common.exploreAllResources', 'Explore All Resources')}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  )
}