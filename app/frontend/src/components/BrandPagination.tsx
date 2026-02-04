import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BrandPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  showPageNumbers?: boolean
  showPageInfo?: boolean
}

/**
 * Unified pagination component following Pittsburgh Tomorrow brand guidelines
 * Features:
 * - Brand-compliant colors (PMS Reflex Blue #2E3192)
 * - Consistent interactive states with proper cursor feedback
 * - Solid backgrounds for clarity (per brand guidelines)
 * - Responsive design with proper spacing
 * - Accessible navigation with ARIA labels
 */
export function BrandPagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showPageNumbers = true,
  showPageInfo = false
}: BrandPaginationProps) {
  const { t } = useTranslation()

  if (totalPages <= 1) return null

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  const renderPageNumbers = () => {
    if (!showPageNumbers) return null

    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Smart pagination with ellipsis
      const startPage = Math.max(1, currentPage - 2)
      const endPage = Math.min(totalPages, currentPage + 2)

      // Always show first page
      if (startPage > 1) {
        pages.push(1)
        if (startPage > 2) {
          pages.push('ellipsis-start')
        }
      }

      // Show pages around current page
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Always show last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('ellipsis-end')
        }
        pages.push(totalPages)
      }
    }

    return (
      <div className="flex space-x-1">
        {pages.map((page) => {
          if (typeof page === 'string') {
            return (
              <span
                key={page}
                className="px-2 py-1 text-brand-reflex-blue/50 select-none"
                aria-hidden="true"
              >
                ...
              </span>
            )
          }

          const isActive = page === currentPage

          return (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              variant="outline"
              size="sm"
              className={`
                interactive-element min-h-[44px] min-w-[44px] transition-all duration-200
                ${isActive 
                  ? 'bg-brand-reflex-blue text-white border-brand-reflex-blue hover:bg-brand-reflex-blue hover:text-white' 
                  : 'bg-white text-brand-reflex-blue border-brand-reflex-blue hover:bg-brand-reflex-blue hover:text-white'
                }
              `}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </Button>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      {showPageInfo && (
        <div className="text-sm text-gray-600 font-medium">
          {t('common.pageOf', { current: currentPage, total: totalPages })}
        </div>
      )}

      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          variant="outline"
          size="sm"
          className="
            interactive-element min-h-[44px] gap-1 pl-2.5 transition-all duration-200
            bg-white text-brand-reflex-blue border-brand-reflex-blue 
            hover:bg-brand-reflex-blue hover:text-white
            disabled:border-gray-300 disabled:text-gray-400 disabled:bg-gray-50
            disabled:hover:bg-gray-50 disabled:hover:text-gray-400 disabled:cursor-not-allowed
          "
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('common.previous')}
        </Button>

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Next Button */}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          variant="outline"
          size="sm"
          className="
            interactive-element min-h-[44px] gap-1 pr-2.5 transition-all duration-200
            bg-white text-brand-reflex-blue border-brand-reflex-blue 
            hover:bg-brand-reflex-blue hover:text-white
            disabled:border-gray-300 disabled:text-gray-400 disabled:bg-gray-50
            disabled:hover:bg-gray-50 disabled:hover:text-gray-400 disabled:cursor-not-allowed
          "
          aria-label="Go to next page"
        >
          {t('common.next')}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
