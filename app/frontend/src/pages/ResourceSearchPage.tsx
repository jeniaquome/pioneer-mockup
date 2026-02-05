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
import { Search, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

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
      <main className="min-h-screen bg-white pt-24">
        {/* Hero Header */}
        <section className="bg-brand-reflex-blue py-10 sm:py-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #F4B33D 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, #F4B33D 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="container max-w-6xl mx-auto px-6 relative z-10">
            {/* Breadcrumb */}
            <div className="mb-4">
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
                className="text-white/60 [&_a]:text-white/60 [&_a:hover]:text-brand-pms-129"
              />
            </div>

            <motion.header
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 leading-[1.1]">
                Search <span className="text-brand-pms-129 italic">Results</span>
              </h1>
              {searchQuery && (
                <p className="text-base text-white/70 font-light">
                  Showing results for "<span className="text-white font-medium">{searchQuery}</span>"
                </p>
              )}
            </motion.header>

            {/* Search Bar */}
            <motion.div
              className="max-w-xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <GlobalResourceSearch />
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <article className="container max-w-6xl mx-auto py-8 px-6">
          {/* Results Summary */}
          {!loading && (
            <div className="text-sm text-gray-500 mb-6">
              {t('resources.showingResults', {
                current: total > 0 ? `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, total)}` : '0',
                total: total,
                defaultValue: `Showing {{current}} of {{total}} resources`
              })}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-32 bg-gray-100 rounded-2xl"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-red-800 font-medium mb-2">{error}</p>
              <p className="text-red-600/70 text-sm">Please try again or adjust your search.</p>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && !error && resources.length === 0 && searchQuery && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-reflex-blue mb-3">
                {t('resources.searchResults.noResults', 'No resources found')}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {t('resources.searchResults.tryDifferent', 'We couldn\'t find any resources matching your search. Try different keywords or browse our categories.')}
              </p>
            </motion.div>
          )}

          {/* Results List */}
          {!loading && resources.length > 0 && (
            <div className="space-y-4">
              {resources.map((r, idx) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <ResourceCard
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
                </motion.div>
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
        </article>
      </main>
    </>
  )
}

