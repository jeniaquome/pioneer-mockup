import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BrandPagination } from '@/components/BrandPagination'
import { API_BASE_URL } from '@/lib/api'
import { useAuth } from '@/contexts/Auth0Context'
import { ResourceCard } from '@/components/ResourceCard'
import { SEO } from '@/components/SEO'
import { Breadcrumb } from '@/components/Breadcrumb'
import { GlobalResourceSearch } from '@/components/GlobalResourceSearch'

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

export function ResourceSearchPage() {
  const [searchParams] = useSearchParams()
  const { t, i18n } = useTranslation()
  const { isAuthenticated, token, isLoading: authLoading } = useAuth()
  
  const searchQuery = searchParams.get('q') || ''
  
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [savedResources, setSavedResources] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)

  // Fetch bookmarks
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

  // Fetch search results - use current i18n.language for real-time language switching
  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults()
    } else {
      setLoading(false)
    }
  }, [searchQuery, currentPage, i18n.language])

  const fetchSearchResults = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({
        search: searchQuery,
        page: String(currentPage),
        limit: String(pageSize),
        language: i18n.language || 'en'
      })
      
      const response = await fetch(`${API_BASE_URL}/resources/?${params.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch search results')
      }
      
      const data = await response.json()
      setResources(data.resources || [])
      setTotal(data.pagination?.total || 0)
    } catch (e) {
      console.error('Error fetching search results:', e)
      setError(t('common.errorLoadingResources', 'Failed to load resources'))
      setResources([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserBookmarks = async () => {
    if (!isAuthenticated || !token) return
    
    try {
      const response = await fetch(`${API_BASE_URL}/bookmarks/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const bookmarks = await response.json()
        const bookmarkedIds = bookmarks.map((bookmark: any) => bookmark.resource_id)
        setSavedResources(bookmarkedIds)
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error)
    }
  }

  const toggleBookmark = async (resourceId: string) => {
    if (isAuthenticated && token) {
      try {
        const isCurrentlyBookmarked = savedResources.includes(resourceId)
        
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
            setSavedResources(prev => [...prev, resourceId])
            window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: { resourceId, action: 'added' } }))
          }
        }
      } catch (error) {
        console.error('Failed to toggle bookmark:', error)
      }
    } else {
      const newSaved = savedResources.includes(resourceId)
        ? savedResources.filter(id => id !== resourceId)
        : [...savedResources, resourceId]
      
      setSavedResources(newSaved)
      localStorage.setItem('savedResources', JSON.stringify(newSaved))
    }
  }

  // Keep bookmarks in sync
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

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <>
      <SEO 
        title={`${t('resources.searchResults.title', 'Search Results')} - ${searchQuery}`}
        description={`Search results for "${searchQuery}" in Pittsburgh newcomer resources`}
        keywords={`Pittsburgh, resources, search, ${searchQuery}, newcomers, immigrants`}
        url={`https://www.pittsburghpioneer.com/resources/search?q=${encodeURIComponent(searchQuery)}`}
      />
      <div className="min-h-screen bg-white">
        <div className="container max-w-6xl mx-auto py-6 px-4">
          <div className="mb-6">
            {/* Breadcrumb Navigation */}
            <Breadcrumb 
              items={[
                { 
                  label: t('nav.resources', 'Resources'), 
                  path: '/resources',
                  translationKey: 'nav.resources'
                },
                { 
                  label: t('resources.searchResults.title', 'Search Results'),
                  translationKey: 'resources.searchResults.title'
                }
              ]}
              className="mb-4"
            />

            {/* Search Results Label */}
            <p className="text-lg text-brand-reflex-blue/80 mb-4">
              {t('resources.searchResults.title', 'Search Results')} {t('resources.searchResults.for', 'for')} "{searchQuery}"
            </p>

            {/* Search Bar */}
            <div className="mb-6">
              <GlobalResourceSearch />
            </div>

            {/* Results Summary */}
            {!loading && (
              <div className="text-sm text-brand-reflex-blue/80 brand-accent mb-4">
                {t('resources.showingResults', {
                  current: total > 0 ? `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, total)}` : '0',
                  total: total,
                  defaultValue: `Showing {{current}} of {{total}} resources`
                })}
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-28 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && resources.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">
                {t('resources.searchResults.noResults', 'No resources found matching your search.')}
              </p>
              <p className="text-gray-400">
                {t('resources.searchResults.tryDifferent', 'Try a different search term.')}
              </p>
            </div>
          )}

          {/* Results List */}
          {!loading && resources.length > 0 && (
            <div className="space-y-4">
              {resources.map((r) => (
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

          {/* Pagination */}
          {!loading && resources.length > 0 && totalPages > 1 && (
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
        </div>
      </div>
    </>
  )
}

