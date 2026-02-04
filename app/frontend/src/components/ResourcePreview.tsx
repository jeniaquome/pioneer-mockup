import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

export function ResourcePreview({ resource }: { resource: { id: string, resource_name: string, category: string, summary: string } }) {
  const { t } = useTranslation()
  
  return (
    <div className="bg-white border-2 border-brand-pms-285/20 rounded-lg p-6 hover:border-brand-pms-285 hover:shadow-lg transition-all duration-300 hover:scale-102 transform">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="brand-subheading text-brand-reflex-blue text-lg mb-2">{resource.resource_name}</div>
          <div className="text-xs text-brand-pms-285 brand-accent-caps mb-2 px-2 py-1 bg-brand-pms-290 rounded-md inline-block">
            {resource.category}
          </div>
          <div className="text-brand-reflex-blue/80 text-sm brand-accent leading-relaxed">{resource.summary}</div>
        </div>
        <Link 
          to={`/resources/detail/${resource.id}`} 
          className="btn-brand-outline flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap"
          style={{ minHeight: '44px', minWidth: '140px' }}
          id={`resource-preview-link-${resource.id}`}
        >
          <span>{t('common.viewDetails')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
