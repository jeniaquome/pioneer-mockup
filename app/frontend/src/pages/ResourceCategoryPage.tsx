import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BrandPagination } from '@/components/BrandPagination'
import { ArrowLeft, Plus, Target, Compass, Users, GraduationCap, Globe, Briefcase, Palette } from 'lucide-react'
import { getCategoryById, getSubcategoryById, getCanonicalCategoryLabel, type Subcategory } from '@/lib/taxonomy'
import { generateSectionId } from '@/lib/geo-utils'
import { API_BASE_URL } from '@/lib/api'
import { useAuth } from '@/contexts/Auth0Context'
import { ResourceCard } from '@/components/ResourceCard'
import { SEO } from '@/components/SEO'
import { StructuredData } from '@/components/StructuredData'
import { Breadcrumb } from '@/components/Breadcrumb'
import { GlobalResourceSearch } from '@/components/GlobalResourceSearch'

// Helper function to get the icon component with color
const getIconComponent = (iconName: string, color: string) => {
  const iconProps = { className: 'w-12 h-12', style: { color, strokeWidth: 2.5 } }
  switch (iconName) {
    case 'compass': return <Compass {...iconProps} />
    case 'users': return <Users {...iconProps} />
    case 'graduation-cap': return <GraduationCap {...iconProps} />
    case 'globe': return <Globe {...iconProps} />
    case 'briefcase': return <Briefcase {...iconProps} />
    case 'palette': return <Palette {...iconProps} />
    default: return <Compass {...iconProps} />
  }
}

// Helper function to get darker color for icons based on category
const getIconColor = (categoryId: string) => {
  switch (categoryId) {
    case 'living-essentials': return '#F4B33D'      // PMS 129 to match title
    case 'community-belonging': return '#4987C6'    // PMS 285 for light blue background
    case 'education-youth': return '#08A576'        // PMS 354 (darker green)
    case 'esl-immigrant': return '#98CC70'          // PMS 382 to match title
    case 'work-business': return '#954D9E'          // PMS 267 (purple)
    case 'culture-leisure': return '#F15647'        // PMS 179 (coral/red)
    default: return '#2E3192'
  }
}

// Minimal backend resource model used for rendering ResourceCard
interface Resource {
  id: string
  ready?: boolean
  category: string
  subcategory?: string
  resource_name: string
  summary?: string
  website_link?: string
  physical_location?: string
  notes?: string
}

// Hardcoded legacy category map removed. Using centralized taxonomy in /lib/taxonomy.

export function ResourceCategoryPage() {
  const { categoryId, subcategoryId, groupId } = useParams<{ categoryId: string; subcategoryId?: string; groupId?: string }>()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { isAuthenticated, token, isLoading: authLoading } = useAuth()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const fromPriorityCategories = urlParams.get('from') === 'priority-categories'
  
  // Debug: Log auth state changes
  console.log('ResourceCategoryPage render - authLoading:', authLoading, 'isAuthenticated:', isAuthenticated, 'hasToken:', !!token)
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error] = useState<string>('')
  const [savedResources, setSavedResources] = useState<string[]>([])
  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)

  const category = getCategoryById(categoryId || '') || null
  const isGroupableCategory = !!category && ['living-essentials', 'esl-immigrant', 'community-belonging'].includes(category.id)

  // Build grouping map from subcategory labels using the prefix before '/'
  const { groupMap, ungroupedSubcategories } = useMemo(() => {
    const map: Record<string, Subcategory[]> = {}
    const ungrouped: Subcategory[] = []
    if (category) {
      // Special manual grouping for ESL & Immigrant Support
      if (category.id === 'esl-immigrant') {
        const legalIds = new Set(['immigration-asylum', 'general-law'])
        const legalSubs: Subcategory[] = []
        for (const sub of category.subcategories) {
          if (legalIds.has(sub.id)) legalSubs.push(sub)
          else ungrouped.push(sub)
        }
        // Enforce desired card order within the Legal group
        if (legalSubs.length) {
          const desiredOrder = ['immigration-asylum', 'general-law']
          legalSubs.sort((a, b) => desiredOrder.indexOf(a.id) - desiredOrder.indexOf(b.id))
          map['Legal'] = legalSubs
        }
      } else {
        for (const sub of category.subcategories) {
          const parts = sub.label.split('/').map(p => p.trim())
          if (parts.length > 1) {
            const group = parts[0]
            if (!map[group]) map[group] = []
            map[group].push(sub)
          } else {
            ungrouped.push(sub)
          }
        }
      }
    }
    return { groupMap: map, ungroupedSubcategories: ungrouped }
  }, [category])

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  useEffect(() => { setSelectedGroup(null) }, [categoryId])

  // Normalize a group label (e.g., "Food", "Legal") into a URL/translation-safe slug
  const normalizeGroupKey = (label: string): string =>
    label
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  // When the URL contains a group slug (e.g., /resources/living-essentials/food),
  // detect it and reflect it in selectedGroup so routing is deep-linkable.
  const routeGroupLabel = useMemo(() => {
    // groupId takes precedence when provided: /resources/:categoryId/:groupId or /:groupId/:subcategoryId
    const slug = groupId || subcategoryId
    if (!slug || !isGroupableCategory) return null
    for (const group of Object.keys(groupMap)) {
      if (normalizeGroupKey(group) === slug) return group
    }
    return null
  }, [groupId, subcategoryId, groupMap, isGroupableCategory])

  useEffect(() => {
    if (routeGroupLabel) setSelectedGroup(routeGroupLabel)
  }, [routeGroupLabel])

  // Ensure we clear any previously selected group when navigating back to the
  // plain category path (no group in URL), so overview shows group tiles again.
  useEffect(() => {
    if (!routeGroupLabel) setSelectedGroup(null)
  }, [routeGroupLabel])

  const getDisplayLabel = (sub: Subcategory): string => {
    if (category?.id === 'esl-immigrant') {
      switch (sub.id) {
        case 'immigration-asylum': return 'Immigration & Asylum'
        case 'general-law': return 'General Law'
        case 'refugee-immigrant-support': return 'Refugee & Immigrant Support'
        case 'esl-support': return 'ESL Support'
      }
    }
    return sub.label.includes('/') ? sub.label.split('/')[1].trim() : sub.label
  }

  // Resolve a friendly nested slug back to the internal subcategory id
  const resolveSubcategoryId = (catId: string, grpId: string | undefined, subSlug: string | undefined): string | undefined => {
    if (!subSlug) return undefined
    if (catId === 'community-belonging' && grpId === 'civic-engagement') {
      switch (subSlug) {
        case 'government': return 'civic-government'
        case 'local-advocacy': return 'civic-advocacy'
        case 'volunteer': return 'civic-volunteer'
        case 'youth': return 'civic-youth'
        default: return subSlug
      }
    }
    return subSlug
  }

  // Separate useEffect for bookmark loading (authentication-dependent)
  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated && token) {
        fetchUserBookmarks()
      } else {
        const saved = JSON.parse(localStorage.getItem('savedResources') || '[]')
        setSavedResources(saved)
      }
    }
  }, [isAuthenticated, token, authLoading])

  // Separate useEffect for resource fetching (works for all users, including unauthenticated)
  useEffect(() => {
    // Fetch all resources for the selected subcategory once
    // For legacy group URLs like /resources/:categoryId/:groupId (no tertiary), skip.
    if (categoryId && subcategoryId && (!routeGroupLabel || !!groupId)) {
      fetchResources()
    } else {
      setLoading(false)
    }
  }, [categoryId, subcategoryId, groupId, routeGroupLabel, i18n.language])

  // Paginate resources for display
  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return resources.slice(start, end)
  }, [resources, currentPage, pageSize])

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize])

  const fetchResources = async () => {
    if (!categoryId) return
    setLoading(true)
    try {
      // Use canonical category label to query backend
      const canonical = getCanonicalCategoryLabel(categoryId)
      // Normalize subcategory to match CSV/DB formatting (no spaces around slashes)
      // If nested route includes a group (e.g., civic-engagement/government),
      // use the actual subcategory id mapping to DB string.
      let rawFromRoute = subcategoryId?.replace(/-/g, ' ') || ''
      // Map friendly slugs back to canonical labels for civic-engagement
      if (groupId === 'civic-engagement') {
        switch (subcategoryId) {
          case 'government': rawFromRoute = 'Civic engagement / Government'; break
          case 'local-advocacy': rawFromRoute = 'Civic engagement / Local advocacy'; break
          case 'volunteer': rawFromRoute = 'Civic engagement / Volunteer'; break
          case 'youth': rawFromRoute = 'Civic engagement / Youth engagement'; break
        }
      }
      const subLabelRaw = subcategory?.label || rawFromRoute
      let subLabelNormalized = subLabelRaw.replace(/\s*\/\s*/g, '/')

      // Backward-compatibility mapping to match CSV/DB subcategory strings
      // 1) Living Essentials
      if (categoryId === 'living-essentials') {
        const idForMapping = (subcategory?.id || subcategoryId || '').toLowerCase()

        // 1a) Pittsburgh Guides → Guides/...
        if (groupId === 'pittsburgh-guides' || subLabelNormalized.startsWith('Pittsburgh Guides/')) {
          switch (idForMapping) {
            case 'guide-discover-pittsburgh':
              subLabelNormalized = 'Guides/Discover pittsburgh'
              break
            case 'guide-diverse-businesses':
              subLabelNormalized = 'Guides/Diverse businesses'
              break
            case 'guide-immigrant-services':
              subLabelNormalized = 'Guides/Immigrant services'
              break
          }
        }

        // 1b) Housing / Renting → Housing/Rent
        if (idForMapping === 'housing-rent') {
          subLabelNormalized = 'Housing/Rent'
        }

        // 1c) Transit → Transportation
        if (idForMapping === 'transportation' || subLabelNormalized === 'Transit') {
          subLabelNormalized = 'Transportation'
        }
      }

      // 2) Culture, Arts and Fun: label tweaks
      if (categoryId === 'culture-leisure') {
        const idForMapping = (subcategory?.id || subcategoryId || '').toLowerCase()
        // 2a) Arts → Art
        if (idForMapping === 'art' || subLabelNormalized === 'Arts') {
          subLabelNormalized = 'Art'
        }
        // 2b) Family Recreation → Family
        if (idForMapping === 'family' || subLabelNormalized === 'Family Recreation') {
          subLabelNormalized = 'Family'
        }
      }

      // Aggregate across all pages so client-side search can see the full list
      const aggregated: Resource[] = []
      let totalFromApi = 0
      let page = 1
      const limit = 100
      // Safeguard: stop after 200 pages max
      for (let i = 0; i < 200; i++) {
        const params = new URLSearchParams({
          category: canonical || '',
          subcategory: subLabelNormalized,
          page: String(page),
          limit: String(limit),
          language: i18n.language || 'en'
        })
        const response = await fetch(`${API_BASE_URL}/resources/?${params.toString()}`)
        if (!response.ok) break
        const data = await response.json()
        const list: Resource[] = (data.resources || [])
        aggregated.push(...list)
        totalFromApi = data.pagination?.total ?? aggregated.length
        if (aggregated.length >= totalFromApi || list.length === 0) break
        page += 1
      }

      setResources(aggregated)
      setTotal(totalFromApi || aggregated.length)
      setCurrentPage(1)
    } catch (e) {
      setResources([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  // Fetch user bookmarks from database
  const fetchUserBookmarks = async () => {
    if (!isAuthenticated || !token) {
      console.log('Not authenticated or no token, skipping bookmark fetch')
      return
    }
    
    console.log('Fetching user bookmarks from:', `${API_BASE_URL}/bookmarks/`)
    console.log('Using token:', token.substring(0, 20) + '...')
    
    try {
      const response = await fetch(`${API_BASE_URL}/bookmarks/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      
      console.log('User bookmarks response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      
      if (response.ok) {
        const bookmarks = await response.json()
        console.log('User bookmarks received:', bookmarks)
        const bookmarkedIds = bookmarks.map((bookmark: any) => bookmark.resource_id)
        console.log('Bookmarked resource IDs:', bookmarkedIds)
        setSavedResources(bookmarkedIds)
      } else {
        const errorText = await response.text()
        console.error('Failed to fetch user bookmarks:', response.status, errorText)
      }
    } catch (error) {
      console.error('Network error fetching bookmarks:', error)
    }
  }

  // Bookmark functionality
  const toggleBookmark = async (resourceId: string) => {
    if (isAuthenticated && token) {
      // Use database for authenticated users
      try {
        const isCurrentlyBookmarked = savedResources.includes(resourceId)
        
        if (isCurrentlyBookmarked) {
          // Remove bookmark
          const response = await fetch(`${API_BASE_URL}/bookmarks/${resourceId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          
          if (response.ok) {
            setSavedResources(prev => prev.filter(id => id !== resourceId))
            console.log('Successfully removed bookmark for:', resourceId)
            // Notify other pages
            window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: { resourceId, action: 'removed' } }))
          } else {
            const errorText = await response.text()
            console.error('Failed to remove bookmark:', response.status, response.statusText, errorText)
          }
        } else {
          // Add bookmark
          const response = await fetch(`${API_BASE_URL}/bookmarks/${resourceId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          
          if (response.ok) {
            setSavedResources(prev => [...prev, resourceId])
            console.log('Successfully added bookmark for:', resourceId)
            // Notify other pages
            window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: { resourceId, action: 'added' } }))
          } else {
            const errorText = await response.text()
            console.error('Failed to add bookmark:', response.status, response.statusText, errorText)
            
            // If it's a 409 (already bookmarked), update the UI to reflect that
            if (response.status === 409) {
              setSavedResources(prev => [...prev, resourceId])
              console.log('Resource was already bookmarked, updating UI')
              window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: { resourceId, action: 'added' } }))
            }
          }
        }
      } catch (error) {
        console.error('Failed to toggle bookmark:', error)
      }
    } else {
      // Use localStorage for non-authenticated users
      const newSaved = savedResources.includes(resourceId)
        ? savedResources.filter(id => id !== resourceId)
        : [...savedResources, resourceId]
      
      setSavedResources(newSaved)
      localStorage.setItem('savedResources', JSON.stringify(newSaved))
    }
  }

  // Keep saved state in sync when bookmarks are changed elsewhere
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

  // Comparison functionality removed in redesign

  if (!category) {
    return <div>{t('resources.categoryNotFound')}</div>
  }

  // If no subcategory is selected, show the category overview (with tertiary grouping for select categories)
  // Show overview when no subcategory is selected, or when using legacy group URLs
  // (e.g., /resources/living-essentials/food). If nested path (/category/:group/:sub) is used,
  // both groupId and subcategoryId will be present and we should NOT render overview.
  if (!subcategoryId || (!!routeGroupLabel && !groupId)) {
    const categoryDescription = category.description || 'Explore resources to help you settle and thrive in Pittsburgh.'
    const displayTitle = routeGroupLabel 
      ? `${routeGroupLabel} Resources`
      : `${category.label} Resources`
    const displayDescription = routeGroupLabel
      ? `Find ${routeGroupLabel.toLowerCase()} resources for newcomers to Pittsburgh.`
      : `${categoryDescription} Discover organizations, services, and support in ${category.label.toLowerCase()}.`
    
    // BreadcrumbList schema for category page
    const breadcrumbItems: Array<{ name: string; url: string }> = [
      { name: 'Home', url: 'https://www.pittsburghpioneer.com/' },
      { name: 'Resources', url: 'https://www.pittsburghpioneer.com/resources' },
      { name: category.label, url: `https://www.pittsburghpioneer.com/resources/${categoryId}` }
    ]
    
    if (routeGroupLabel) {
      breadcrumbItems.push({
        name: routeGroupLabel,
        url: `https://www.pittsburghpioneer.com/resources/${categoryId}/${normalizeGroupKey(routeGroupLabel)}`
      })
    }
    
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    }
    
    return (
      <>
        <SEO 
          title={displayTitle}
          description={displayDescription.length > 160 ? displayDescription.substring(0, 157) + '...' : displayDescription}
          keywords={`Pittsburgh, ${category.label}${routeGroupLabel ? ', ' + routeGroupLabel : ''}, resources, newcomers, immigrants`}
          url={routeGroupLabel 
            ? `https://www.pittsburghpioneer.com/resources/${categoryId}/${normalizeGroupKey(routeGroupLabel)}`
            : `https://www.pittsburghpioneer.com/resources/${categoryId}`
          }
        />
        <StructuredData data={breadcrumbSchema} />
        <main className="min-h-screen bg-white">
          <article className="container max-w-6xl mx-auto py-12 px-4">
          <header className="mb-12">
            <Breadcrumb 
              items={[
                { 
                  label: t('nav.resources', 'Resources'), 
                  path: '/resources',
                  translationKey: 'nav.resources'
                },
                ...(routeGroupLabel ? [
                  { 
                    label: category.label, 
                    path: `/resources/${categoryId}`,
                    translationKey: `resources.taxonomy.categories.${category.id}`
                  },
                  { 
                    label: routeGroupLabel,
                    translationKey: `resources.taxonomy.groups.${normalizeGroupKey(routeGroupLabel)}`
                  }
                ] : [
                  { 
                    label: category.label,
                    translationKey: `resources.taxonomy.categories.${category.id}`
                  }
                ])
              ]}
              className="mb-6"
            />
            <div className="flex items-center gap-6 mb-6">
              <div>
                {getIconComponent(category.icon, getIconColor(category.id))}
              </div>
              <div>
                <h1 className="brand-heading-primary text-brand-reflex-blue mb-4" id={generateSectionId(category.label)}>
                  {t('resources.welcomeToCategory', { category: routeGroupLabel ? t(`resources.taxonomy.groups.${normalizeGroupKey(routeGroupLabel)}`, { defaultValue: routeGroupLabel }) : t(`resources.taxonomy.categories.${category.id}`, { defaultValue: category.label }) })}
                </h1>
                {!routeGroupLabel && (
                  <p className="text-xl text-brand-pms-285 font-medium brand-accent">
                    {t(`resources.taxonomy.categoryDescriptions.${category.id}`, { defaultValue: category.description })}
                  </p>
                )}
              </div>
            </div>
          </header>

          {/* Global Search Bar */}
          <div className="mb-8">
            <GlobalResourceSearch />
          </div>

          <div className="mb-8">
            {/* Resource Cards Grid with optional tertiary grouping */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[320px]">
              {isGroupableCategory ? (
                selectedGroup ? (
                  (groupMap[selectedGroup] || []).map((sub) => {
                    const groupSlug = normalizeGroupKey(selectedGroup)
                    const buildSubSlug = (sId: string) => {
                      if (categoryId === 'community-belonging' && groupSlug === 'civic-engagement') {
                        switch (sId) {
                          case 'civic-government': return 'government'
                          case 'civic-advocacy': return 'local-advocacy'
                          case 'civic-volunteer': return 'volunteer'
                          case 'civic-youth': return 'youth'
                        }
                      }
                      return sId
                    }
                    const subSlug = buildSubSlug(sub.id)
                    return (
                      <Card key={sub.id} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => navigate(`/resources/${categoryId}/${groupSlug}/${subSlug}`)} style={{ minHeight: '320px' }}>
                      <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                        <div className="flex items-center justify-between">
                          <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Plus className="w-7 h-7 text-white" />
                          </div>
                          <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                        <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                          {t(`resources.taxonomy.subcategories.${sub.id}`, { defaultValue: getDisplayLabel(sub) })}
                        </CardTitle>
                        <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                          <span>{t('common.exploreResources')}</span>
                          <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                    )
                  })
                ) : (
                  <>
                    {/* Special ordering for specific categories */}
                    {category.id === 'community-belonging' ? (
                      <>
                        {/* Social Connection subcategory first */}
                        {ungroupedSubcategories.filter(s => s.id === 'social-connection').map((sub) => (
                          <Card key={sub.id} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => navigate(`/resources/${categoryId}/${sub.id}`)} style={{ minHeight: '320px' }}>
                            <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                              <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <Plus className="w-7 h-7 text-white" />
                                </div>
                                <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                              <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                                {t(`resources.taxonomy.subcategories.${sub.id}`, { defaultValue: getDisplayLabel(sub) })}
                              </CardTitle>
                              <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                                <span>{t('common.exploreResources')}</span>
                                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {/* Civic Engagement group second */}
                        {Object.keys(groupMap).filter(g => normalizeGroupKey(g) === 'civic-engagement').map((group) => (
                          <Card key={group} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => {
                            const groupSlug = normalizeGroupKey(group)
                            navigate(`/resources/${categoryId}/${groupSlug}`)
                          }} style={{ minHeight: '320px' }}>
                            <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                              <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <Plus className="w-7 h-7 text-white" />
                                </div>
                                <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                              <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                                {t(`resources.taxonomy.groups.${normalizeGroupKey(group)}`, { defaultValue: group })}
                              </CardTitle>
                              <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                                <span>{t('common.exploreResources')}</span>
                                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {/* Religion third */}
                        {ungroupedSubcategories.filter(s => s.id === 'religion').map((sub) => (
                          <Card key={sub.id} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => navigate(`/resources/${categoryId}/${sub.id}`)} style={{ minHeight: '320px' }}>
                            <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                              <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <Plus className="w-7 h-7 text-white" />
                                </div>
                                <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                              <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                                {t(`resources.taxonomy.subcategories.${sub.id}`, { defaultValue: getDisplayLabel(sub) })}
                              </CardTitle>
                              <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                                <span>{t('common.exploreResources')}</span>
                                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </>
                    ) : category.id === 'esl-immigrant' ? (
                      <>
                        {/* ESL and Immigrant Support custom ordering: ESL Support, Refugee/Immigrant Support, Legal */}
                        {ungroupedSubcategories.filter(s => s.id === 'esl-support').map((sub) => (
                          <Card key={sub.id} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => navigate(`/resources/${categoryId}/${sub.id}`)} style={{ minHeight: '320px' }}>
                            <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                              <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <Plus className="w-7 h-7 text-white" />
                                </div>
                                <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                              <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                                {t(`resources.taxonomy.subcategories.${sub.id}`, { defaultValue: getDisplayLabel(sub) })}
                              </CardTitle>
                              <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                                <span>{t('common.exploreResources')}</span>
                                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {/* Refugee/Immigrant Support second */}
                        {ungroupedSubcategories.filter(s => s.id === 'refugee-immigrant-support').map((sub) => (
                          <Card key={sub.id} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => navigate(`/resources/${categoryId}/${sub.id}`)} style={{ minHeight: '320px' }}>
                            <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                              <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <Plus className="w-7 h-7 text-white" />
                                </div>
                                <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                              <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                                {t(`resources.taxonomy.subcategories.${sub.id}`, { defaultValue: getDisplayLabel(sub) })}
                              </CardTitle>
                              <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                                <span>{t('common.exploreResources')}</span>
                                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}

                        {/* Legal group third */}
                        {Object.keys(groupMap).filter(g => normalizeGroupKey(g) === 'legal').map((group) => (
                          <Card key={group} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => {
                            const groupSlug = normalizeGroupKey(group)
                            navigate(`/resources/${categoryId}/${groupSlug}`)
                          }} style={{ minHeight: '320px' }}>
                            <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                              <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <Plus className="w-7 h-7 text-white" />
                                </div>
                                <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                              <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                                {t(`resources.taxonomy.groups.${normalizeGroupKey(group)}`, { defaultValue: group })}
                              </CardTitle>
                              <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                                <span>{t('common.exploreResources')}</span>
                                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </>
                    ) : (
                    /* Default ordering (with Living Essentials customizations below) */
                    (category.id === 'living-essentials'
                      ? Object.keys(groupMap).filter(g => g !== 'Pittsburgh Guides' && g !== 'Food')
                      : Object.keys(groupMap)
                    ).map((group) => (
                      <Card key={group} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => {
                        const groupSlug = normalizeGroupKey(group)
                        navigate(`/resources/${categoryId}/${groupSlug}`)
                      }} style={{ minHeight: '320px' }}>
                        <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                          <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <Plus className="w-7 h-7 text-white" />
                            </div>
                            <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                          <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                            {t(`resources.taxonomy.groups.${normalizeGroupKey(group)}`, { defaultValue: group })}
                          </CardTitle>
                          <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                            <span>{t('common.exploreResources')}</span>
                            <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    )))}
                                         {/* Place Transit immediately after Housing and Health - excluding those already shown for community-belonging */}
                     {ungroupedSubcategories.filter(sub => {
                       if (category.id === 'community-belonging') {
                         return sub.id !== 'social-connection' && sub.id !== 'religion'
                       }
                       if (category.id === 'esl-immigrant') {
                         return sub.id !== 'refugee-immigrant-support' && sub.id !== 'esl-support'
                       }
                       return true
                     }).map((sub) => (
                       <Card key={sub.id} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => navigate(`/resources/${categoryId}/${sub.id}`)} style={{ minHeight: '320px' }}>
                        <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                          <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <Plus className="w-7 h-7 text-white" />
                            </div>
                            <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                          <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                             {t(`resources.taxonomy.subcategories.${sub.id}`, { defaultValue: getDisplayLabel(sub) })}
                          </CardTitle>
                          <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                            <span>{t('common.exploreResources')}</span>
                            <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {/* Render Food after Transit when in Living Essentials */}
                    {category.id === 'living-essentials' && Object.keys(groupMap).filter(g => g === 'Food').map((group) => (
                      <Card key={group} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => {
                        const groupSlug = normalizeGroupKey(group)
                        navigate(`/resources/${categoryId}/${groupSlug}`)
                      }} style={{ minHeight: '320px' }}>
                        <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                          <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <Plus className="w-7 h-7 text-white" />
                            </div>
                            <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                          <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                            {t(`resources.taxonomy.groups.${normalizeGroupKey(group)}`, { defaultValue: group })}
                          </CardTitle>
                          <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                            <span>{t('common.exploreResources')}</span>
                            <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {/* For Living Essentials, append Pittsburgh Guides at the end after Transit */}
                    {category.id === 'living-essentials' && Object.keys(groupMap).filter(g => g === 'Pittsburgh Guides').map((group) => (
                      <Card key={group} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => {
                        const groupSlug = normalizeGroupKey(group)
                        navigate(`/resources/${categoryId}/${groupSlug}`)
                      }} style={{ minHeight: '320px' }}>
                        <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                          <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <Plus className="w-7 h-7 text-white" />
                            </div>
                            <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                          <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                            {t(`resources.taxonomy.groups.${normalizeGroupKey(group)}`, { defaultValue: group })}
                          </CardTitle>
                          <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                            <span>{t('common.exploreResources')}</span>
                            <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )
                ) : (
                category.subcategories.map((sub) => (
                  <Card key={sub.id} className="group interactive-element hover:shadow-2xl transition-all duration-300 border-2 border-brand-pms-285/20 shadow-lg hover:scale-105 hover:border-brand-pms-285 bg-white rounded-2xl overflow-hidden flex flex-col h-full" onClick={() => {
                    if (routeGroupLabel) {
                      navigate(`/resources/${categoryId}/${normalizeGroupKey(routeGroupLabel)}/${sub.id}`)
                    } else {
                      navigate(`/resources/${categoryId}/${sub.id}`)
                    }
                  }} style={{ minHeight: '320px' }}>
                    <CardHeader className="pb-4 bg-gradient-to-br from-brand-pms-290/30 to-white relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="w-14 h-14 bg-brand-reflex-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Plus className="w-7 h-7 text-white" />
                        </div>
                        <div className="w-9 h-9 bg-brand-pms-285/20 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-7 pt-3 flex-1 flex flex-col">
                      <CardTitle className="brand-subheading text-brand-reflex-blue mb-4 group-hover:text-brand-pms-285 transition-colors duration-300 text-2xl font-extrabold">
                         {t(`resources.taxonomy.subcategories.${sub.id}`, { defaultValue: sub.label })}
                      </CardTitle>
                      <div className="flex items-center text-brand-reflex-blue text-base font-semibold group-hover:text-brand-pms-285 transition-colors duration-300 brand-accent mt-auto">
                        <span>{t('common.exploreResources')}</span>
                        <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
          </article>
        </main>
      </>
    )
  }

  // Show specific subcategory resources
  const effectiveSubId = resolveSubcategoryId(category.id, groupId, subcategoryId)
  const subcategory = getSubcategoryById(category.id, effectiveSubId)
  if (!subcategory) {
    return <div>{t('resources.subcategoryNotFound')}</div>
  }

  // Determine base URL for absolute URLs
  const getBaseUrl = () => {
    if (import.meta.env.VITE_SITE_BASE_URL) {
      return import.meta.env.VITE_SITE_BASE_URL
    }
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin
    }
    return 'https://www.pittsburghpioneer.com'
  }

  const baseUrl = getBaseUrl()
  const currentUrl = `${baseUrl}${location.pathname}${location.search}`

  // BreadcrumbList schema for subcategory page
  const subcategoryBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Resources",
        "item": `${baseUrl}/resources`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.label,
        "item": `${baseUrl}/resources/${categoryId}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": subcategory.label,
        "item": `${baseUrl}/resources/${categoryId}/${subcategoryId}`
      }
    ]
  }

  // Enhanced CollectionPage schema for GEO optimization
  // Provides comprehensive resource directory information for AI systems
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": subcategory.label,
    "description": `Comprehensive directory of ${subcategory.label.toLowerCase()} resources for newcomers and immigrants in Pittsburgh. ${total} verified resources available. All resources are vetted and available in 15 languages.`,
    "url": currentUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": total,
      "itemListElement": paginatedResources.slice(0, 10).map((resource, index) => ({
        "@type": "ListItem",
        "position": (currentPage - 1) * pageSize + index + 1,
        "item": {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${currentUrl}#resource-${resource.id}`,
          "name": resource.resource_name,
          "description": resource.summary || `Resource for ${subcategory.label} in Pittsburgh`,
          ...(resource.website_link && { "url": resource.website_link }),
          ...(resource.physical_location && {
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Pittsburgh",
              "addressRegion": "PA",
              "addressCountry": "US",
              "streetAddress": resource.physical_location
            }
          }),
          // Enhanced business information
          "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "40.4406",
              "longitude": "-79.9959"
            },
            "geoRadius": "50000"
          },
          "audience": {
            "@type": "Audience",
            "audienceType": "Newcomers, Immigrants, Relocating Professionals"
          },
          "priceRange": "Free-$",
          "knowsAbout": [
            category.label,
            subcategory.label,
            "Newcomer Support",
            "Immigrant Services"
          ],
          // Verification badge
          "additionalProperty": {
            "@type": "PropertyValue",
            "name": "Verified",
            "value": "true",
            "description": "This resource has been vetted by Pittsburgh Tomorrow"
          }
        }
      }))
    },
    "about": {
      "@type": "Thing",
      "name": `${category.label} Resources`,
      "description": `Pittsburgh Pioneer provides ${total} verified ${subcategory.label.toLowerCase()} resources for newcomers. All resources are vetted and available in 15 languages.`,
      // Enhanced about section
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Total Resources",
          "value": total.toString()
        },
        {
          "@type": "PropertyValue",
          "name": "Languages Supported",
          "value": "9"
        },
        {
          "@type": "PropertyValue",
          "name": "Service Area",
          "value": "Pittsburgh Metropolitan Area"
        }
      ]
    },
    // Provider information
    "provider": {
      "@type": "Organization",
      "name": "Pittsburgh Tomorrow",
      "url": "https://www.pittsburghpioneer.com",
      "description": "Pittsburgh Tomorrow helps newcomers settle and thrive in Pittsburgh with personalized guidance and trusted resources."
    },
    // Pagination information
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Resources",
          "item": "https://www.pittsburghpioneer.com/resources"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category.label,
          "item": `https://www.pittsburghpioneer.com/resources/${categoryId}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": subcategory.label,
          "item": currentUrl
        }
      ]
    }
  }

  return (
    <>
      <SEO 
        title={`${subcategory.label} Resources`}
        description={`Find ${subcategory.label.toLowerCase()} resources for newcomers to Pittsburgh. ${subcategory.description || 'Discover organizations, services, and support to help you thrive.'}`}
        keywords={`Pittsburgh, ${category.label}, ${subcategory.label}, resources, newcomers, immigrants`}
        url={`https://www.pittsburghpioneer.com/resources/${categoryId}/${subcategoryId}`}
      />
      <StructuredData data={subcategoryBreadcrumbSchema} />
      <StructuredData data={collectionPageSchema} />
      <main className="min-h-screen bg-white">
        <article className="container max-w-6xl mx-auto py-6 px-4">
        <header className="mb-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              ...(fromPriorityCategories ? [
                { 
                  label: t('common.dashboard', 'Dashboard'), 
                  path: '/dashboard',
                  translationKey: 'common.dashboard'
                }
              ] : [
                { 
                  label: t('nav.resources', 'Resources'), 
                  path: '/resources',
                  translationKey: 'nav.resources'
                }
              ]),
              { 
                label: category.label, 
                path: `/resources/${categoryId}`,
                translationKey: `resources.taxonomy.categories.${category.id}`
              },
              ...(() => {
                const candidate = isGroupableCategory
                  ? (routeGroupLabel || (subcategory.label.includes('/') ? subcategory.label.split('/')[0].trim() : null))
                  : null
                const effectiveGroupLabel = candidate && (routeGroupLabel || (candidate in groupMap ? candidate : null))
                if (!effectiveGroupLabel) return []
                const groupSlug = normalizeGroupKey(effectiveGroupLabel)
                return [{
                  label: effectiveGroupLabel,
                  path: `/resources/${categoryId}/${groupSlug}`,
                  translationKey: `resources.taxonomy.groups.${groupSlug}`
                }]
              })(),
              { 
                label: subcategory.label,
                translationKey: `resources.taxonomy.subcategories.${subcategory.id}`
              }
            ]}
            includeHome={!fromPriorityCategories}
            className="mb-4"
          />

          <div className="mb-4">
            {fromPriorityCategories && (
              <div className="mb-4 p-4 rounded-xl border-2" style={{ 
                backgroundColor: '#FCE51A20', 
                borderColor: '#FCE51A' 
              }}>
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6" style={{ color: '#2E3192' }} />
                  <div>
                    <h3 className="font-bold text-brand-reflex-blue brand-subheading">
                      {t('resources.fromPriorityCategories', 'From Your Priority Resources')}
                    </h3>
                    <p className="text-sm text-brand-reflex-blue/80 brand-accent">
                      {t('resources.personalizedResourcesMessage', 'These resources were selected based on your survey responses.')}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <h1 className="brand-heading-primary text-brand-reflex-blue mb-4" id={generateSectionId(subcategory.label)}>{t(`resources.taxonomy.subcategories.${subcategory.id}`, { defaultValue: subcategory.label })}</h1>
          </div>
          </header>

          {/* Global Search Bar */}
          <div className="mb-6">
            <GlobalResourceSearch />
          </div>

          {/* Results Summary */}
          <div className="text-sm text-brand-reflex-blue/80 brand-accent mb-4">
            {t('resources.showingResults', {
              current: total > 0 && paginatedResources.length > 0
                ? `${(currentPage - 1) * pageSize + 1}–${(currentPage - 1) * pageSize + paginatedResources.length}`
                : '0',
              total: total,
            })}
          </div>

        {loading && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-28 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!loading && !error && resources.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">{t('resources.noResourcesFoundCategory')}</p>
          </div>
        )}

        {!loading && paginatedResources.length > 0 && (
          <div className="space-y-4">
            {paginatedResources.map((r) => (
              <ResourceCard
                key={r.id}
                resource={{
                  id: r.id,
                  ready: true,
                  category: r.category,
                  subcategory: r.subcategory,
                  resource_name: r.resource_name,
                  summary: r.summary,
                  website_link: r.website_link,
                  physical_location: r.physical_location,
                  notes: r.notes,
                } as any}
                context="category"
                isAuthenticated={isAuthenticated}
                isSaved={savedResources.includes(r.id)}
                onBookmarkToggle={() => toggleBookmark(r.id)}
              />
            ))}
          </div>
        )}

          {/* Pagination Controls - Moved to bottom */}
          {!loading && paginatedResources.length > 0 && totalPages > 1 && (
            <div className="mt-8 pt-4 border-t border-gray-200">
              <BrandPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                showPageNumbers={false}
                showPageInfo={true}
              />
            </div>
          )}

          {/* Comparison modal removed in redesign */}
        </article>
      </main>
    </>
  )
} 