import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Compass, Users, GraduationCap, Globe, Briefcase, Palette } from 'lucide-react'
import { TAXONOMY } from '@/lib/taxonomy'
import { SEO } from '@/components/SEO'
import { StructuredData } from '@/components/StructuredData'
import { Breadcrumb } from '@/components/Breadcrumb'
import { GlobalResourceSearch } from '@/components/GlobalResourceSearch'
import { generateSectionId } from '@/lib/geo-utils'

// Helper function to get the icon component with color
const getIconComponent = (iconName: string, color: string) => {
  const iconProps = { className: 'w-12 h-12 sm:w-16 sm:h-16', style: { color, strokeWidth: 2.5 } }
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

export function ResourcePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/resources/${categoryId}`)
  }

  // CollectionPage schema for main resources directory
  // Helps AI understand this is a comprehensive newcomer resource directory
  const resourcesDirectorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Pittsburgh Newcomer Resources Directory",
    "description": "Comprehensive directory of essential resources for newcomers and immigrants to Pittsburgh. Find housing, healthcare, education, employment, community connections and cultural resources to help you settle and thrive.",
    "url": "https://www.pittsburghpioneer.com/resources",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Resource Categories",
      "description": "6 main categories of newcomer resources in Pittsburgh",
      "numberOfItems": TAXONOMY.length,
      "itemListElement": TAXONOMY.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebPage",
          "@id": `https://www.pittsburghpioneer.com/resources/${category.id}`,
          "name": category.label,
          "description": category.description,
          "url": `https://www.pittsburghpioneer.com/resources/${category.id}`,
          "about": {
            "@type": "Thing",
            "name": "Newcomer Resources",
            "description": `Resources for newcomers in the ${category.label.toLowerCase()} category`
          }
        }
      }))
    },
    "about": {
      "@type": "Thing",
      "name": "Pittsburgh Newcomer Support",
      "description": "Resources and services to help immigrants and newcomers settle successfully in Pittsburgh"
    },
    "provider": {
      "@type": "Organization",
      "name": "Pittsburgh Tomorrow",
      "url": "https://www.pittsburghpioneer.com"
    }
  }

  return (
    <>
      <SEO
        title="Resource Toolkit"
        description="Find essential resources for newcomers to Pittsburgh. Housing, health, education, employment, community connections and more to help you settle and thrive."
        keywords="Pittsburgh, resources, newcomers, immigrants, housing, healthcare, education, employment, community"
        url="https://www.pittsburghpioneer.com/resources"
      />
      <StructuredData data={resourcesDirectorySchema} />
      <main className="min-h-screen bg-white">
        <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-16">
        <Breadcrumb
          items={[
            {
              label: t('nav.resources', 'Resources')
            }
          ]}
          className="mb-8"
        />
        <header className="mb-12 text-center">
          <h1 id={generateSectionId(t('toolkit.title'))} className="brand-subheading text-brand-reflex-blue mb-4">
            {t('toolkit.title')}
          </h1>
          <p className="brand-accent text-brand-pms-285 text-lg max-w-2xl mx-auto">
            {t('toolkit.description')}
          </p>
        </header>

        {/* Global Search Bar */}
        <section className="mb-8 max-w-3xl mx-auto">
          <GlobalResourceSearch />
        </section>

        {/* Grid of six categories from centralized taxonomy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 auto-rows-[240px]">
          {TAXONOMY.slice(0, 6).map((category) => (
            <Card
              key={category.id}
              className={`${category.color} ${category.hoverColor} touch-target interactive-element hover:shadow-xl transition-all duration-300 border-2 border-brand-pms-285/20 hover:border-brand-pms-285 hover:scale-105 transform h-full cursor-pointer`}
              onClick={() => handleCategoryClick(category.id)}
              style={{ minHeight: '240px' }}
            >
              <CardContent className="p-6 sm:p-8 h-full flex flex-col justify-start gap-2">
                <div className="flex items-center justify-end">
                  <div className="w-8 h-8 bg-brand-reflex-blue rounded-full flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    {getIconComponent(category.icon, getIconColor(category.id))}
                  </div>
                  <h3 className={`brand-subheading ${category.textColor} text-lg sm:text-xl`}>
                    {(() => {
                      const label = t(`resources.taxonomy.categories.${category.id}`, { defaultValue: category.label })
                      return <span className="text-2xl sm:text-3xl">{label}</span>
                    })()}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Call to Action Section - keep as requested */}
        <section className="text-center mt-12 p-8 bg-brand-pms-290/50 rounded-2xl border border-brand-pms-285/30">
          <h2 id={generateSectionId(t('common.needPersonalizedRecommendations'))} className="brand-subheading text-brand-reflex-blue mb-4">
            {t('common.needPersonalizedRecommendations')}
          </h2>
          <p className="brand-accent text-brand-pms-285 mb-6 max-w-2xl mx-auto">
            {t('common.personalizedRecommendationsDescription')}
          </p>
          <button
            onClick={() => navigate('/screening')}
            className="btn-brand-primary touch-target text-lg px-8 py-4"
            style={{ minHeight: '48px' }}
          >
            {t('common.getYourPersonalRoadmap')}
          </button>
        </section>
      </div>
      </main>
    </>
  )
}