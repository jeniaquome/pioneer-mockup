import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Compass, Users, GraduationCap, Globe, Briefcase, Palette, ArrowRight, Sparkles } from 'lucide-react'
import { TAXONOMY } from '@/lib/taxonomy'
import { SEO } from '@/components/SEO'
import { StructuredData } from '@/components/StructuredData'
import { GlobalResourceSearch } from '@/components/GlobalResourceSearch'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Helper function to get the icon component
const getIconComponent = (iconName: string) => {
  const iconProps = { className: 'w-8 h-8' }
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

// Get gradient colors for each category
const getCategoryGradient = (categoryId: string) => {
  switch (categoryId) {
    case 'living-essentials': return 'from-amber-500/10 to-yellow-500/5'
    case 'community-belonging': return 'from-blue-500/10 to-indigo-500/5'
    case 'education-youth': return 'from-green-500/10 to-emerald-500/5'
    case 'esl-immigrant': return 'from-lime-500/10 to-green-500/5'
    case 'work-business': return 'from-purple-500/10 to-violet-500/5'
    case 'culture-leisure': return 'from-red-500/10 to-orange-500/5'
    default: return 'from-gray-500/10 to-gray-500/5'
  }
}

export function ResourcePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/resources/${categoryId}`)
  }

  // CollectionPage schema for main resources directory
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
        }
      }))
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

      <main className="min-h-screen bg-white pt-24">
        {/* Hero Header */}
        <section className="bg-brand-reflex-blue py-16 sm:py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #F4B33D 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, #F4B33D 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="container max-w-6xl mx-auto px-6 relative z-10">
            {/* Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="w-4 h-4 text-brand-pms-129" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/80">
                  {t('toolkit.badge', '500+ Vetted Resources')}
                </span>
              </div>
            </div>

            <header className="text-center mb-12">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
                {t('toolkit.title', 'Resource')} <span className="text-brand-pms-129 italic">{t('toolkit.titleAccent', 'Toolkit')}</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                {t('toolkit.description', 'Everything you need to settle and thrive in Pittsburgh, organized by category and vetted by our community partners.')}
              </p>
            </header>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <GlobalResourceSearch />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 sm:py-24">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TAXONOMY.slice(0, 6).map((category, idx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className="group w-full text-left relative bg-white p-8 rounded-2xl hover:shadow-[0_20px_60px_rgba(46,49,146,0.12)] transition-all duration-500 hover:-translate-y-2 border border-brand-reflex-blue/5 overflow-hidden"
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(category.id)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-14 h-14 bg-brand-reflex-blue/10 rounded-xl flex items-center justify-center text-brand-reflex-blue mb-6 group-hover:bg-brand-pms-129 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {getIconComponent(category.icon)}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-serif font-black text-brand-reflex-blue mb-3 group-hover:text-brand-pms-129 transition-colors duration-300">
                        {t(`resources.taxonomy.categories.${category.id}`, { defaultValue: category.label })}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        {category.description}
                      </p>

                      {/* CTA */}
                      <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-reflex-blue group-hover:text-brand-pms-129 transition-colors duration-300">
                        <span>{t('common.explore', 'Explore')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>

                    {/* Number Badge */}
                    <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-brand-reflex-blue/5 flex items-center justify-center text-brand-reflex-blue/20 font-black text-lg group-hover:bg-brand-pms-129/10 group-hover:text-brand-pms-129/40 transition-all duration-500">
                      {idx + 1}
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container max-w-4xl mx-auto px-6">
            <motion.div
              className="text-center p-12 sm:p-16 rounded-3xl bg-brand-reflex-blue relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #F4B33D 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>

              <div className="relative z-10">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-[1.1]">
                  {t('common.needPersonalizedRecommendations', 'Need personalized')} <span className="text-brand-pms-129 italic">{t('common.recommendations', 'recommendations?')}</span>
                </h2>
                <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto font-light">
                  {t('common.personalizedRecommendationsDescription', 'Take our quick survey and get a customized roadmap based on your specific needs and goals.')}
                </p>
                <Link
                  to="/screening"
                  className="group inline-flex items-center gap-3 bg-brand-pms-129 text-brand-reflex-blue px-10 py-5 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(244,179,61,0.5)] transition-all duration-500 hover:scale-105"
                >
                  <span>{t('common.getYourPersonalRoadmap', 'Get Your Personal Roadmap')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
