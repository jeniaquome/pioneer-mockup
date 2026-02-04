import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Bookmark, RotateCcw } from 'lucide-react'
import { BrandPagination } from '@/components/BrandPagination'
import { API_BASE_URL } from '@/lib/api'
import { useAuth } from '@/contexts/Auth0Context'
import { RequireAuth } from '@/contexts/Auth0Context'
import { ResourceCard } from '@/components/ResourceCard'
import { SEO } from '@/components/SEO'
import { Breadcrumb } from '@/components/Breadcrumb'
import { generateSectionId } from '@/lib/geo-utils'

// Category color mapping no longer used in simplified bookmarks view

interface BookmarkedResource {
  bookmark_id: number
  resource_id: string
  resource_name: string
  summary?: string
  category: string
  subcategory?: string
  website_link?: string
  physical_location?: string
  notes?: string
  bookmarked_at: string
}

function BookmarksContent() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { token, isAuthenticated, isLoading } = useAuth()
  const [bookmarks, setBookmarks] = useState<BookmarkedResource[]>([])
  const [filteredBookmarks, setFilteredBookmarks] = useState<BookmarkedResource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(10)
  // Expanded services removed in simplified schema

  useEffect(() => {
    console.log('BookmarksPage useEffect triggered, isLoading:', isLoading, 'isAuthenticated:', isAuthenticated, 'token:', !!token)
    if (!isLoading && isAuthenticated && token) {
      fetchBookmarks()
    }
  }, [token, isAuthenticated, isLoading, i18n.language])

  // Listen for bookmark updates dispatched from other pages and refresh list
  useEffect(() => {
    const handler = () => {
      if (isAuthenticated && token) fetchBookmarks()
    }
    window.addEventListener('bookmarks-updated', handler)
    return () => window.removeEventListener('bookmarks-updated', handler)
  }, [isAuthenticated, token])

  // Filter bookmarks based on search and language filters
  useEffect(() => {
    let filtered = [...bookmarks]

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(bookmark =>
        bookmark.resource_name.toLowerCase().includes(query) ||
        (bookmark.summary || '').toLowerCase().includes(query) ||
        (bookmark.physical_location || '').toLowerCase().includes(query) ||
        (bookmark.category || '').toLowerCase().includes(query) ||
        (bookmark.subcategory || '').toLowerCase().includes(query)
      )
    }

    // Apply language filter
    // languages not tracked in simplified schema

    setFilteredBookmarks(filtered)
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [bookmarks, searchQuery, selectedLanguages])

  // Calculate paginated bookmarks
  const paginatedBookmarks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredBookmarks.slice(startIndex, endIndex)
  }, [filteredBookmarks, currentPage, itemsPerPage])

  // Calculate pagination info
  const totalPages = Math.ceil(filteredBookmarks.length / itemsPerPage)
  const showPagination = filteredBookmarks.length > itemsPerPage

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of bookmarks section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const fetchBookmarks = async () => {
    if (!token) {
      console.error('No token available for fetching bookmarks')
      return
    }

    setLoading(true)
    setError('') // Clear previous errors
    
    // Add language parameter to the API request
    const params = new URLSearchParams({
      language: i18n.language || 'en'
    })
    const url = `${API_BASE_URL}/bookmarks/?${params.toString()}`
    console.log('Fetching bookmarks from:', url)
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      console.log('Bookmarks response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Bookmarks fetch error:', response.status, errorText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Bookmarks data received:', data)
      setBookmarks(data)
      if (data.length === 0) {
        console.log('No bookmarks found for user')
      } else {
        console.log(`Found ${data.length} bookmarks`)
      }
    } catch (err) {
      console.error('Failed to fetch bookmarks:', err)
      setError(t('common.failedToLoadBookmarks'))
    } finally {
      setLoading(false)
    }
  }

  const removeBookmark = async (resourceId: string) => {
    if (!token) return

    try {
      const response = await fetch(`${API_BASE_URL}/bookmarks/${resourceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setBookmarks(prev => prev.filter(bookmark => bookmark.resource_id !== resourceId))
        // Broadcast deletion to keep other views in sync
        window.dispatchEvent(new CustomEvent('bookmarks-updated', { detail: { resourceId, action: 'removed' } }))
      }
    } catch (error) {
      console.error('Failed to remove bookmark:', error)
    }
  }

  // Get unique languages from all bookmarks
  const availableLanguages = Array.from(new Set(bookmarks.flatMap(_ => []))).sort()

  const toggleLanguageFilter = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language)
        ? prev.filter(lang => lang !== language)
        : [...prev, language]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedLanguages([])
  }

  // No expanded services in simplified schema

  return (
    <>
      <SEO 
        title="Saved Resources"
        description="Access your bookmarked Pittsburgh resources. All your saved organizations and services in one place."
        keywords="saved resources, bookmarks, Pittsburgh resources, favorite services"
        noindex={true}
      />
      <div className="min-h-screen bg-white">
        <main className="container max-w-6xl mx-auto py-12 px-4">
          <Breadcrumb
            items={[
              {
                label: t('nav.bookmarks', 'Saved Resources')
              }
            ]}
            className="mb-6"
          />
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-brand-pms-290 rounded-full flex items-center justify-center">
                <Bookmark className="w-8 h-8 text-brand-pms-285" />
              </div>
              <div>
                <h1 id={generateSectionId(t('nav.bookmarks'))} className="brand-heading-primary text-brand-reflex-blue mb-2">
                  {t('nav.bookmarks')}
                </h1>
                <p className="text-brand-pms-285 text-lg font-medium brand-accent">
                  {t('common.viewAndManageBookmarks')}
                </p>
              </div>
            </div>
          </header>

          {/* Search and Filter Controls */}
          <section className="mt-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-pms-285 w-4 h-4" />
                <Input
                  type="text"
                  placeholder={t('common.searchYourBookmarks')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border-brand-pms-285/30 focus:border-brand-reflex-blue focus:ring-brand-reflex-blue text-selectable"
                  style={{ minHeight: '48px' }}
                />
              </div>

              {/* Clear Filters Button */}
              {(searchQuery || selectedLanguages.length > 0) && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-brand-reflex-blue/30 text-brand-reflex-blue hover:bg-brand-reflex-blue hover:text-white transition-colors interactive-element flex items-center gap-2"
                  style={{ minHeight: '48px' }}
                >
                  <RotateCcw className="w-4 h-4" />
                  {t('resources.clearFilters')}
                </Button>
              )}
            </div>

            {/* Language Filter */}
            {availableLanguages.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-brand-reflex-blue brand-accent">Filter by Language:</h4>
                <div className="flex flex-wrap gap-2">
                  {availableLanguages.map((language) => (
                    <Button
                      key={language}
                      variant={selectedLanguages.includes(language) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleLanguageFilter(language)}
                      className={`text-xs interactive-element ${
                        selectedLanguages.includes(language)
                          ? 'bg-brand-pms-354/20 text-brand-pms-354 border-brand-pms-354/30 hover:bg-brand-pms-354/30'
                          : 'border-brand-pms-285/30 hover:bg-brand-pms-290'
                      }`}
                      style={{ minHeight: '36px' }}
                    >
                      {language}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div className="text-sm text-brand-reflex-blue/80 brand-accent">
              {showPagination ? (
                <>
                  {t('common.showingBookmarksPaginated', { 
                    start: ((currentPage - 1) * itemsPerPage) + 1, 
                    end: Math.min(currentPage * itemsPerPage, filteredBookmarks.length), 
                    total: filteredBookmarks.length 
                  })}
                  {bookmarks.length !== filteredBookmarks.length && ` (${bookmarks.length} total)`}
                </>
              ) : (
                <>
                  {t('common.showingBookmarks', { count: filteredBookmarks.length, total: bookmarks.length })}
                </>
              )}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedLanguages.length > 0 && ` in ${selectedLanguages.join(', ')}`}
            </div>
        </section>

        {(loading || isLoading) && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-brand-pms-290/50 rounded-2xl"></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 brand-accent">{error}</p>
          </div>
        )}

        {!loading && !isLoading && !error && bookmarks.length === 0 && (
          <div className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <h2 id={generateSectionId(t('common.noBookmarksYet'))} className="brand-subheading text-brand-reflex-blue">
                {t('common.noBookmarksYet')}
              </h2>
              <p className="text-gray-500 text-lg mb-2">
                {t('common.startExploringBookmark')}
              </p>
              <Button 
                onClick={() => navigate('/resources')} 
                className="bg-brand-reflex-blue text-white hover:bg-brand-pms-285 transition-colors flex items-center gap-2"
                style={{ minHeight: '48px' }}
              >
                {t('common.browseResources')}
              </Button>
            </div>
          </div>
        )}

        {!loading && !isLoading && filteredBookmarks.length === 0 && bookmarks.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('common.noBookmarksMatchFilters')}</p>
          </div>
        )}

        {!loading && !isLoading && filteredBookmarks.length > 0 && (
          <section className="space-y-4">
              {paginatedBookmarks.map((bookmark) => (
                <ResourceCard
                  key={bookmark.bookmark_id}
                  bookmark={bookmark}
                  context="bookmarks"
                  onRemoveBookmark={(id) => removeBookmark(id)}
                />
              ))}

            {/* Pagination Controls */}
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
          </section>
        )}
      </main>
      </div>
    </>
  )
}

export function BookmarksPage() {
  return (
    <RequireAuth>
      <BookmarksContent />
    </RequireAuth>
  )
} 