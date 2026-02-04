import React from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import { StructuredData } from '@/components/StructuredData'
import { useTranslation } from 'react-i18next'
import { generateSectionId } from '@/lib/geo-utils'

export function AboutPage() {
  const { t } = useTranslation()
  
  // Preload critical images for faster initial render
  React.useEffect(() => {
    const preloadImages = [
      '/branding/assets/across-water.svg',
    ];
    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);
  
  // Organization structured data for about page
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pittsburgh Tomorrow",
    "alternateName": "Pittsburgh Tomorrow Pioneer",
    "url": "https://www.pittsburghpioneer.com",
    "logo": "https://www.pittsburghpioneer.com/branding/assets/new-bridgit.png",
    "description": "Pittsburgh Tomorrow helps newcomers settle and thrive in Pittsburgh with personalized guidance and trusted resources. We provide free, multilingual support to connect people with essential services.",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pittsburgh",
        "addressRegion": "PA",
        "addressCountry": "US"
      }
    },
    "areaServed": {
      "@type": "Place",
      "name": "Pittsburgh Metropolitan Area"
    },
    "sameAs": [
      "https://pittsburghtomorrow.org"
    ],
    "knowsAbout": [
      "Immigration Services",
      "Settlement Services",
      "Community Resources",
      "Newcomer Support",
      "Multilingual Services",
      "Software Development",
      "AI-Powered Tools"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pittsburgh Pioneer Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "name": "Pittsburgh Pioneer Concierge",
            "applicationCategory": "Relocation Tool",
            "operatingSystem": "Web",
            "description": "Provides 300+ vetted resources across 6 categories in 15 languages."
          }
        }
      ]
    }
  }
  
  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about Pittsburgh Tomorrow and Pittsburgh Tomorrow Pioneer. We help newcomers settle and thrive in Pittsburgh with personalized guidance and trusted resources."
        keywords="Pittsburgh Tomorrow, Pittsburgh Tomorrow Pioneer, about, mission, newcomers, immigrants, settlement services, community support"
        url="https://www.pittsburghpioneer.com/about"
      />
      <StructuredData data={organizationSchema} />
      <main className="min-h-screen bg-white">
        {/* Page Title - Centered at Top */}
        <header className="bg-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl lg:max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-reflex-blue mb-4">
                {t('about.title')}
              </h1>
            </div>
          </div>
        </header>

        {/* Intro Text - Left Aligned */}
        <section className="py-6">
          <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl lg:max-w-7xl">
            <div className="bg-[#D2EDF6] rounded-3xl px-8 sm:px-12 lg:px-16 py-8 sm:py-10 lg:py-12">
              <p className="text-xl sm:text-2xl text-brand-reflex-blue leading-relaxed">
                {t('about.welcomeText')}
              </p>
            </div>
          </article>
        </section>

        {/* Why Pittsburgh Tomorrow Pioneer - Text on Left, Image on Right */}
        <section className="bg-white py-12">
          <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl lg:max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 id={generateSectionId(t('about.whyPioneerTitle'))} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-reflex-blue mb-6">
                  {t('about.whyPioneerTitle')}
                </h2>
                <ul className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed space-y-4 list-disc ml-6">
                  <li>{t('about.whyPioneerText1')}</li>
                  <li>{t('about.whyPioneerText2')}</li>
                  <li>{t('about.whyPioneerText3')}</li>
                  <li>{t('about.whyPioneerText4')}</li>
                  <li>{t('about.whyPioneerText5')}</li>
                  <li>{t('about.whyPioneerText6')}</li>
                  <li>{t('about.whyPioneerText7')}</li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden">
                <picture>
                  <source 
                    srcSet="/branding/assets/across-water-optimized.jpg" 
                    type="image/jpeg"
                  />
                  <img 
                    src="/branding/assets/across-water.svg" 
                    alt="Pittsburgh skyline across the water at sunset"
                    className="w-full h-auto object-cover"
                    loading="eager"
                    decoding="async"
                    width="1200"
                    height="800"
                  />
                </picture>
              </div>
            </div>
          </article>
        </section>

        {/* You Are the Pioneer - Full Width with Background */}
        <section className="py-12">
          <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl lg:max-w-7xl flex justify-center">
            <div className="bg-[#D2EDF6] rounded-3xl px-8 sm:px-12 lg:px-16 py-8 sm:py-10 lg:py-12 max-w-5xl">
              <h2 id={generateSectionId(t('about.youAreThePioneerTitle'))} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-reflex-blue mb-6 text-center">
                {t('about.youAreThePioneerTitle')}
              </h2>
              <p className="text-xl sm:text-2xl text-brand-reflex-blue leading-relaxed mb-6 text-center">
                {t('about.youAreThePioneerText1')}
              </p>
              <p className="text-xl sm:text-2xl text-brand-reflex-blue leading-relaxed text-center">
                {t('about.youAreThePioneerText2')}
              </p>
            </div>
          </article>
        </section>

        {/* How Pittsburgh Tomorrow Pioneer Helps - Image on Left, Text on Right */}
        <section className="bg-white py-12">
          <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl lg:max-w-7xl">
            {/* Top section: Image left, first two subsections right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12">
              <div className="rounded-lg overflow-hidden">
                <picture>
                  <source 
                    srcSet="/branding/assets/neighborhood-hill-view-optimized.jpg" 
                    type="image/jpeg"
                  />
                  <img 
                    src="/branding/assets/neighborhood-hill-view.svg" 
                    alt="Pittsburgh neighborhood hillside view"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="800"
                  />
                </picture>
              </div>
              <div>
                <h2 id={generateSectionId(t('about.howPioneerHelpsTitle'))} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-reflex-blue mb-8">
                  {t('about.howPioneerHelpsTitle')}
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 id={generateSectionId(t('about.madeForYouTitle'))} className="text-2xl sm:text-3xl font-bold text-brand-reflex-blue mb-4">
                      {t('about.madeForYouTitle')}
                    </h3>
                    <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed">
                      {t('about.madeForYouDescription')}
                    </p>
                  </div>

                  <div>
                    <h3 id={generateSectionId(t('about.personalRoadmapTitle'))} className="text-2xl sm:text-3xl font-bold text-brand-reflex-blue mb-4">
                      {t('about.personalRoadmapTitle')}
                    </h3>
                    <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed mb-4">
                      {t('about.personalRoadmapDescription')}
                    </p>
                    <ul className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed mb-4 ml-6 list-disc space-y-2">
                      {(t('about.personalRoadmapFeatures', { returnObjects: true }) as string[]).map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed">
                      {t('about.personalRoadmapNote')} <Link to="/resources" className="underline hover:text-brand-pms-285">{t('common.exploreResources')}</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section: Full width subsections */}
            <div className="space-y-8">
              <div>
                <h3 id={generateSectionId(t('about.smartSupportTitle'))} className="text-2xl sm:text-3xl font-bold text-brand-reflex-blue mb-4">
                  {t('about.smartSupportTitle')}
                </h3>
                <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed">
                  {t('about.smartSupportDescription')}
                </p>
              </div>

              <div>
                <h3 id={generateSectionId(t('about.trustedPartnersTitle'))} className="text-2xl sm:text-3xl font-bold text-brand-reflex-blue mb-4">
                  {t('about.trustedPartnersTitle')}
                </h3>
                <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed">
                  {t('about.trustedPartnersDescription')}
                </p>
              </div>

              <div>
                <h3 id={generateSectionId(t('about.privacyTitle'))} className="text-2xl sm:text-3xl font-bold text-brand-reflex-blue mb-4">
                  {t('about.privacyTitle')}
                </h3>
                <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed">
                  {t('about.privacyDescription')} <Link to="/privacy" className="underline hover:text-brand-pms-285">{t('about.pittsburghTomorrowLink')}</Link>
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* About Pittsburgh Tomorrow - Text on Left, Image on Right */}
        <section className="py-12">
          <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl lg:max-w-7xl">
            <div className="bg-[#D2EDF6] rounded-3xl px-8 sm:px-12 lg:px-16 py-8 sm:py-10 lg:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div>
                  <h2 id={generateSectionId(t('about.pittsburghTomorrowTitle'))} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-reflex-blue mb-8">
                    {t('about.pittsburghTomorrowTitle')}
                  </h2>
                  <div className="space-y-6">
                    <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed">
                      {(() => {
                        const text = t('about.pittsburghTomorrowText1');
                        const parts = text.split('Pittsburgh Tomorrow');
                        if (parts.length >= 3) {
                          // First instance: no link, Second instance: with link
                          return (
                            <>
                              {parts[0]}Pittsburgh Tomorrow{parts[1]}
                              <a href="https://pittsburghtomorrow.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-pms-285">Pittsburgh Tomorrow</a>
                              {parts.slice(2).join('Pittsburgh Tomorrow')}
                            </>
                          );
                        }
                        return text;
                      })()}
                    </p>
                    <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed">
                      {t('about.pittsburghTomorrowText2')}
                    </p>
                    <p className="text-lg sm:text-xl text-brand-reflex-blue leading-relaxed">
                      {t('about.pittsburghTomorrowText3')}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <picture>
                    <source 
                      srcSet="/branding/assets/river-with-sky-optimized.jpg" 
                      type="image/jpeg"
                    />
                    <img 
                      src="/branding/assets/river-with-sky.svg" 
                      alt="Pittsburgh river with sky"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="800"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Call to Action */}
        <section className="bg-white py-12">
          <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl lg:max-w-7xl">
            <div className="border-2 border-brand-reflex-blue rounded-2xl p-8 sm:p-12 bg-white">
              <h2 id={generateSectionId(t('about.readyToStartTitle'))} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-reflex-blue mb-6 text-center">
                {t('about.readyToStartTitle')}
              </h2>
              <p className="text-lg sm:text-xl text-brand-reflex-blue mb-8 text-center max-w-3xl mx-auto">
                {t('about.readyToStartDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                <Link to="/screening" className="flex-1">
                  <button className="px-8 py-4 bg-brand-reflex-blue text-white rounded-lg hover:bg-brand-pms-285 transition-colors w-full text-lg sm:text-xl font-semibold flex items-center justify-center" style={{ minHeight: '44px' }}>
                    {t('about.getStarted')}
                  </button>
                </Link>
                <Link to="/resources" className="flex-1">
                  <button className="px-8 py-4 border-2 border-brand-reflex-blue text-brand-reflex-blue bg-white rounded-lg hover:bg-brand-reflex-blue hover:text-white transition-colors w-full text-lg sm:text-xl font-semibold flex items-center justify-center" style={{ minHeight: '44px' }}>
                    {t('about.browseResources')}
                  </button>
                </Link>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  )
}
