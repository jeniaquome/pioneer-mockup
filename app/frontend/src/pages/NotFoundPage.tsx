import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SEO } from '@/components/SEO'
import { Home, Search } from 'lucide-react'

export function NotFoundPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEO 
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        noindex={true}
      />
      <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center py-12 sm:py-16">
          {/* 404 Number - Using brand Reflex Blue */}
          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-extrabold text-brand-reflex-blue mb-4 sm:mb-6 font-brand-heading italic">
            404
          </h1>
          
          {/* Main heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-reflex-blue mb-3 sm:mb-4 px-4">
            {t('errors.pageNotFound', 'Page Not Found')}
          </h2>
          
          {/* Description - single line on desktop, wraps on mobile */}
          <p className="text-base sm:text-lg text-brand-reflex-blue/80 mb-6 sm:mb-8 brand-accent px-4 max-w-xs sm:max-w-none mx-auto">
            {t('errors.pageNotFoundDescription', "The page you're looking for doesn't exist or has been moved.")}
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link to="/" className="interactive-element">
              <button className="btn-brand-primary inline-flex items-center justify-center gap-2 px-6 py-3 touch-target w-full sm:w-auto">
                <Home className="w-5 h-5" />
                {t('common.goHome', 'Go Home')}
              </button>
            </Link>
            <Link to="/resources" className="interactive-element">
              <button className="btn-brand-outline inline-flex items-center justify-center gap-2 px-6 py-3 touch-target w-full sm:w-auto">
                <Search className="w-5 h-5" />
                {t('common.browseResources', 'Browse Resources')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

