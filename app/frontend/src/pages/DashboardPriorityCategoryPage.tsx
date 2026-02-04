import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  Target, ChevronDown, ChevronUp, Home, GraduationCap, DollarSign, AlertTriangle, Users, Heart, Church, Dumbbell, Palette
} from 'lucide-react'
import { BrandPagination } from '@/components/BrandPagination'
import { API_BASE_URL } from '@/lib/api'
import { useAuth } from '@/contexts/Auth0Context'
import { ResourceCard } from '@/components/ResourceCard'
import { Button } from '@/components/ui/button'
import { SEO } from '@/components/SEO'
import { Breadcrumb } from '@/components/Breadcrumb'

type Resource = {
  id: string
  resource_name: string
  summary?: string
  website_link?: string
  category: string
  subcategory?: string
  physical_location?: string
  notes?: string
}

export function DashboardPriorityCategoryPage() {
  const { categoryKey } = useParams<{ categoryKey: string }>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { isAuthenticated, token } = useAuth()
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [savedResources, setSavedResources] = useState<string[]>([])

  useEffect(() => {
    let ignore = false
    async function load() {
      if (!isAuthenticated || !categoryKey || !token) {
        if (!ignore) setLoading(false)
        return
      }

      try {
        console.log('[PriorityResources] Fetching fresh data from API for category:', categoryKey)
        const languageParam = i18n.language && i18n.language !== 'en' ? `?language=${i18n.language}` : ''
        const res = await fetch(`${API_BASE_URL}/onboarding/priority-resources/${categoryKey}${languageParam}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        if (!ignore) {
          const list = Array.isArray(data?.resources) ? data.resources : []
          console.log('[PriorityResources] fetched from API', { key: categoryKey, count: list.length, source: data?.source })
          setResources(list)
        }
      } catch (e) {
        console.error('[PriorityResources] Error fetching resources:', e)
        if (!ignore) setResources([])
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [isAuthenticated, token, categoryKey, i18n.language])

  // Pagination constants
  const ITEMS_PER_PAGE = 10
  const getInitialDisplayCount = (key: string) => key === 'first_things_first' ? 6 : 5

  const iconFor = (key: string) => {
    const common = { className: 'h-5 w-5' } // Smaller icons for this page
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

  const title = useMemo(() => {
    if (!categoryKey) return t('common.priorityResourcesForYou', 'Priority Resources')
    return t(`common.priorityCategories.${categoryKey}`, categoryKey.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()))
  }, [categoryKey, t])

  // Pagination logic
  const initialDisplayCount = getInitialDisplayCount(categoryKey || '')
  const totalResources = resources.length
  const needsPagination = totalResources > ITEMS_PER_PAGE
  const needsExpandButton = !showAll && totalResources > initialDisplayCount

  // Calculate displayed resources
  const displayedResources = useMemo(() => {
    if (!showAll) {
      // Show initial count (5 or 6 depending on category)
      return resources.slice(0, initialDisplayCount)
    } else if (needsPagination) {
      // Show paginated results
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      return resources.slice(startIndex, endIndex)
    } else {
      // Show all resources (≤10 total)
      return resources
    }
  }, [resources, showAll, currentPage, initialDisplayCount, needsPagination])

  // Calculate pagination info
  const totalPages = Math.ceil(totalResources / ITEMS_PER_PAGE)
  const showPagination = showAll && needsPagination

  // Reset pagination when category changes, but preserve state when resources refresh for same category
  useEffect(() => {
    setCurrentPage(1)
    setShowAll(false)
  }, [categoryKey]) // Only reset when categoryKey changes, not when resources change

  const handleSeeMore = () => {
    setShowAll(true)
    setCurrentPage(1)
  }

  const handleSeeLess = () => {
    setShowAll(false)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of resources
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Fetch user bookmarks for saved state
  useEffect(() => {
    let ignore = false
    async function fetchUserBookmarks() {
      if (!isAuthenticated || !token) return
      try {
        const res = await fetch(`${API_BASE_URL}/bookmarks/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (!res.ok) return
        const data = await res.json()
        if (!ignore) setSavedResources((data || []).map((b: any) => b.resource_id))
      } catch {}
    }
    fetchUserBookmarks()
    return () => { ignore = true }
  }, [isAuthenticated, token])

  // Listen for global bookmark updates to keep UI in sync across pages
  useEffect(() => {
    const handler = (e: Event) => {
      const { resourceId, action } = (e as CustomEvent).detail || {}
      if (!resourceId || !action) return
      setSavedResources(prev => {
        if (action === 'added') {
          return prev.includes(resourceId) ? prev : [...prev, resourceId]
        }
        return prev.filter(id => id !== resourceId)
      })
    }
    window.addEventListener('bookmarks-updated', handler as EventListener)
    return () => window.removeEventListener('bookmarks-updated', handler as EventListener)
  }, [])

  // Toggle bookmark for a resource
  const toggleBookmark = async (resourceId: string) => {
    if (!isAuthenticated || !token) return
    const isCurrentlyBookmarked = savedResources.includes(resourceId)
    try {
      if (isCurrentlyBookmarked) {
        const response = await fetch(`${API_BASE_URL}/bookmarks/${resourceId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          setSavedResources(prev => prev.filter(id => id !== resourceId))
          window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: { resourceId, action: 'removed' } }))
        }
      } else {
        const response = await fetch(`${API_BASE_URL}/bookmarks/${resourceId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          setSavedResources(prev => [...prev, resourceId])
          window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: { resourceId, action: 'added' } }))
        } else if (response.status === 409) {
          // Already bookmarked; update UI and broadcast
          setSavedResources(prev => prev.includes(resourceId) ? prev : [...prev, resourceId])
          window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: { resourceId, action: 'added' } }))
        }
      }
    } catch {}
  }

  return (
    <>
      <SEO 
        title={title ? `${title} Resources` : 'Priority Resources'}
        description={`Personalized ${title ? title.toLowerCase() : ''} resources recommended for your Pittsburgh settlement journey.`}
        keywords={`Pittsburgh, ${title || 'priority'}, personalized resources, settlement recommendations`}
        noindex={true}
      />
      <div className="min-h-screen bg-white">
        <div className="container max-w-6xl mx-auto py-8 px-4">
          <Breadcrumb 
            items={[
              { 
                label: t('common.dashboard', 'Dashboard'), 
                path: '/dashboard',
                translationKey: 'common.dashboard'
              },
              { 
                label: title
              }
            ]}
            className="mb-6"
          />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colorFor(categoryKey || '') + '20' }}>
            <div style={{ color: colorFor(categoryKey || '') }}>
              {iconFor(categoryKey || '')}
            </div>
          </div>
          <h1 className="brand-heading-primary text-brand-reflex-blue">{title}</h1>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brand-reflex-blue/80 text-lg">{t('resources.noResourcesFoundCategory')}</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {displayedResources.map((r) => (
                <ResourceCard key={r.id} resource={{
                  id: r.id,
                  ready: true,
                  category: r.category,
                  subcategory: r.subcategory,
                  resource_name: r.resource_name,
                  summary: r.summary,
                  website_link: r.website_link,
                  physical_location: r.physical_location,
                  notes: r.notes,
                } as any} context="category" isAuthenticated={isAuthenticated} isSaved={savedResources.includes(r.id)} onBookmarkToggle={() => toggleBookmark(r.id)} />
              ))}
            </div>

            {/* Results Summary - Only show when not expanded */}
            {!showAll && (
              <div className="mt-6 text-center text-sm text-brand-reflex-blue/70">
                <span>
                  {String(t('common.showingTopOf', 'Showing top {{current}} of {{total}} resources', {
                    current: Math.min(initialDisplayCount, totalResources),
                    total: totalResources,
                  } as any))}
                </span>
              </div>
            )}

            {/* See More/Less Button */}
            {(needsExpandButton || (showAll && totalResources > initialDisplayCount)) && (
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={needsExpandButton ? handleSeeMore : handleSeeLess}
                  className="
                    interactive-element bg-brand-reflex-blue hover:bg-brand-pms-285 
                    text-white font-semibold px-8 py-3 rounded-xl 
                    transition-all duration-200 border-none shadow-lg
                    flex items-center gap-2 text-base
                  "
                  style={{ minHeight: '48px' }}
                >
                  {needsExpandButton ? (
                    <>
                      {t('common.seeMore')}
                      <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                    </>
                  ) : (
                    <>
                      {t('common.seeLess')}
                      <ChevronUp className="w-5 h-5 transition-transform duration-300" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Pagination */}
            {showPagination && (
              <div className="mt-8">
                <BrandPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  showPageNumbers={false}
                  showPageInfo={true}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </>
  )
}


