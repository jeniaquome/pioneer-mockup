import { ChevronRight, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export interface BreadcrumbItem {
  label: string
  path?: string
  translationKey?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  includeHome?: boolean
  className?: string
}

/**
 * Breadcrumb Navigation Component
 * 
 * Displays a clickable breadcrumb trail for navigation hierarchy.
 * Automatically includes "Home" as the first item unless disabled.
 * 
 * Features:
 * - Touch-friendly interactive elements (44px min height)
 * - Branded colors matching Pittsburgh Tomorrow guidelines
 * - Responsive design with proper spacing
 * - Translation support via i18next
 * - Accessible navigation patterns
 * 
 * @example
 * ```tsx
 * <Breadcrumb items={[
 *   { label: 'Resources', path: '/resources' },
 *   { label: 'Housing', path: '/resources/housing' },
 *   { label: 'Affordable Housing' }
 * ]} />
 * ```
 */
export function Breadcrumb({ items, includeHome = true, className = '' }: BreadcrumbProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Prepare breadcrumb items with Home prepended if needed
  const breadcrumbItems: BreadcrumbItem[] = includeHome
    ? [{ label: t('nav.home', 'Home'), path: '/', translationKey: 'nav.home' }, ...items]
    : items

  return (
    <nav 
      className={`flex items-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm brand-accent ${className}`}
      aria-label="Breadcrumb"
      data-nosnippet
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1
        const displayLabel = item.translationKey ? t(item.translationKey, item.label) : item.label

        return (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            {/* Breadcrumb Item */}
            {item.path && !isLast ? (
              <button
                onClick={() => navigate(item.path!)}
                className="
                  flex items-center gap-2
                  text-brand-pms-285 hover:text-brand-reflex-blue 
                  transition-colors duration-200
                  interactive-element
                  font-medium
                  hover:underline
                  focus:outline-none focus:ring-2 focus:ring-brand-reflex-blue focus:ring-offset-2 rounded
                  px-1
                "
                style={{ minHeight: '44px' }}
                aria-label={`Navigate to ${displayLabel}`}
              >
                {index === 0 && includeHome && (
                  <Home className="w-4 h-4" aria-hidden="true" />
                )}
                <span className="whitespace-normal break-words">{displayLabel}</span>
              </button>
            ) : (
              <span 
                className={`
                  flex items-center gap-2
                  font-semibold
                  ${isLast 
                    ? 'text-brand-reflex-blue' 
                    : 'text-brand-pms-285'
                  }
                `}
                aria-current={isLast ? 'page' : undefined}
              >
                {index === 0 && includeHome && (
                  <Home className="w-4 h-4" aria-hidden="true" />
                )}
                <span className="whitespace-normal break-words">{displayLabel}</span>
              </span>
            )}

            {/* Separator */}
            {!isLast && (
              <ChevronRight 
                className="w-4 h-4 text-brand-pms-285/60" 
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}

