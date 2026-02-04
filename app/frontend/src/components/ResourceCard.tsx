import { useTranslation } from 'react-i18next'
import { ExternalLink, MapPin, Bookmark, BookmarkCheck, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StructuredData } from '@/components/StructuredData'

interface Resource {
  id: string
  ready: boolean
  category: string
  subcategory?: string
  resource_name: string
  summary?: string
  website_link?: string
  physical_location?: string
  notes?: string
  created_at?: string
  updated_at?: string
}

interface BookmarkResource {
  bookmark_id: number | string
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

interface ResourceCardProps {
  resource?: Resource
  bookmark?: BookmarkResource
  context: 'search' | 'category' | 'bookmarks'
  isAuthenticated?: boolean
  isSaved?: boolean
  onBookmarkToggle?: (resourceId: string) => void
  onRemoveBookmark?: (resourceId: string) => void
}

export function ResourceCard({ 
  resource, 
  bookmark, 
  context, 
  isAuthenticated = false,
  isSaved = false,
  onBookmarkToggle,
  onRemoveBookmark
}: ResourceCardProps) {
  const { t } = useTranslation()

  // Normalize data whether it's a Resource or BookmarkResource
  const normalizedResource = resource ? {
    id: resource.id,
    name: resource.resource_name,
    description: resource.summary,
    category: resource.category,
    subcategory: resource.subcategory,
    physical_location: resource.physical_location,
    website: resource.website_link,
    notes: resource.notes,
  } : {
    id: bookmark!.resource_id,
    name: bookmark!.resource_name,
    description: bookmark!.summary,
    category: bookmark!.category,
    subcategory: bookmark!.subcategory,
    physical_location: bookmark!.physical_location,
    website: bookmark!.website_link,
    notes: bookmark!.notes,
  }

  // Helper function to format description
  const getDisplayDescription = () => {
    if (!normalizedResource.description) return 'No description available'
    // Show the full description instead of truncating
    return normalizedResource.description
  }

  const displayDescription = getDisplayDescription()

  // Enhanced LocalBusiness structured data for GEO optimization
  // Includes comprehensive information for AI-powered search engines
  const shouldIncludeSchema = normalizedResource.name && (normalizedResource.website || normalizedResource.physical_location)

  const localBusinessSchema = shouldIncludeSchema ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": normalizedResource.name,
    ...(normalizedResource.description && { "description": normalizedResource.description }),
    ...(normalizedResource.website && { "url": normalizedResource.website }),
    // Area served - Pittsburgh and surrounding areas for newcomers
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "40.4406",
        "longitude": "-79.9959"
      },
      "geoRadius": "50000" // 50km radius
    },
    // Service audience - newcomers and immigrants
    "audience": {
      "@type": "Audience",
      "audienceType": "Newcomers, Immigrants, Relocating Professionals"
    },
    // Category information for better classification
    ...(normalizedResource.category && {
      "knowsAbout": [
        normalizedResource.category,
        ...(normalizedResource.subcategory ? [normalizedResource.subcategory] : []),
        "Newcomer Support",
        "Immigrant Services",
        "Settlement Resources"
      ]
    }),
    // Content rating for quality indication (placeholder - could be enhanced with real ratings)
    // "aggregateRating": {
    //   "@type": "AggregateRating",
    //   "ratingValue": "4.5",
    //   "bestRating": "5",
    //   "worstRating": "1",
    //   "ratingCount": "1",
    //   "reviewCount": "1"
    // },
    // Indicates this is a verified resource
    "additionalProperty": {
      "@type": "PropertyValue",
      "name": "Verified",
      "value": "true",
      "description": "This resource has been vetted by Pittsburgh Tomorrow"
    }
  } : null

  return (
    <>
      {localBusinessSchema && <StructuredData data={localBusinessSchema} />}
      <div className="bg-white border-2 border-brand-pms-285/20 hover:border-brand-pms-285 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
      {/* Header with title, affiliation, and action buttons */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-brand-reflex-blue mb-2">
            {normalizedResource.name}
          </h3>
          
          {normalizedResource.physical_location && (
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-brand-pms-285" />
              <Badge className="bg-brand-pms-290 text-brand-reflex-blue border-brand-pms-285/30 text-sm brand-accent">
                {normalizedResource.physical_location}
              </Badge>
            </div>
          )}

          {/* Bookmark date for bookmarks context */}
          {context === 'bookmarks' && bookmark && (
            <div className="text-xs text-gray-500 mb-2">
              {t('common.bookmarkedOn')} {new Date(bookmark.bookmarked_at).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Bookmark button - context dependent */}
          {context === 'bookmarks' && onRemoveBookmark ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemoveBookmark(normalizedResource.id)}
              className="bg-red-50 border-red-300 text-red-600 hover:bg-red-100 hover:text-red-700 interactive-element"
              style={{ minHeight: '40px' }}
              title={t('common.removeBookmark')}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          ) : isAuthenticated && onBookmarkToggle ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBookmarkToggle(normalizedResource.id)}
              className={`interactive-element transition-all duration-200 ${
                isSaved 
                  ? 'bg-green-50 border-green-500 hover:bg-green-100' 
                  : 'border-brand-pms-285/30 hover:bg-brand-pms-290/20'
              }`}
              style={{ minHeight: '40px' }}
              title={isSaved ? 'Remove from saved' : 'Save for later'}
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-green-600" />
              ) : (
                <Bookmark className="w-4 h-4 text-brand-pms-285" />
              )}
            </Button>
          ) : null}

          {/* Visit button */}
          {normalizedResource.website && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(normalizedResource.website, '_blank')}
              className="btn-brand-outline px-3 py-2 text-sm interactive-element"
              style={{ minHeight: '40px' }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('common.visitWebsite')}
            </Button>
          )}
        </div>
      </div>

      {/* Main description */}
      <p className="text-brand-reflex-blue/80 text-sm mb-6 leading-relaxed brand-accent">
        {displayDescription}
      </p>

      {/* Category section removed for consolidated design */}
    </div>
    </>
  )
} 