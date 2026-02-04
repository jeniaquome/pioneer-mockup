import React from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import { StructuredData } from '@/components/StructuredData'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Users, Globe, Shield, Sparkles } from 'lucide-react'

export function AboutPage() {
  const { t } = useTranslation()

  // Preload critical images for faster initial render
  React.useEffect(() => {
    const preloadImages = [
      '/branding/assets/across-water-optimized.jpg',
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
    "logo": "https://www.pittsburghpioneer.com/branding/assets/logo-0.svg",
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
      "Multilingual Services"
    ]
  }

  return (
    <>
      <SEO
        title="The Pioneer Story | About Us"
        description="Learn about Pittsburgh Tomorrow and Pittsburgh Tomorrow Pioneer. We help newcomers settle and thrive in Pittsburgh with personalized guidance and trusted resources."
        keywords="Pittsburgh Tomorrow, Pittsburgh Tomorrow Pioneer, about, mission, newcomers, immigrants, settlement services, community support"
        url="https://www.pittsburghpioneer.com/about"
      />
      <StructuredData data={organizationSchema} />

      <main className="min-h-screen bg-white pt-24">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-brand-pms-129/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-reflex-blue/5 rounded-full blur-[120px]" />

          <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
            <motion.div
              className="max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-brand-reflex-blue/10 to-brand-reflex-blue/5 rounded-full text-brand-reflex-blue text-[10px] font-black uppercase tracking-[0.25em] border border-brand-reflex-blue/10 mb-8">
                <Sparkles className="w-4 h-4 text-brand-pms-129" />
                {t('about.badge', 'The Pioneer Story')}
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-brand-reflex-blue leading-[0.95] tracking-tight mb-8">
                {t('about.heroTitle', 'Helping you find your')} <span className="text-brand-pms-129 italic">{t('about.heroTitleAccent', 'place')}</span> {t('about.heroTitleEnd', 'in Pittsburgh.')}
              </h1>

              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl font-light">
                {t('about.heroDescription', 'Pittsburgh Tomorrow Pioneer is your free, personalized guide to settling and thriving in the Steel City. We connect newcomers with trusted resources, supportive communities, and everything needed to call Pittsburgh home.')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section with Image */}
        <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              {/* Image */}
              <motion.div
                className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:rounded-[4rem] shadow-[0_40px_100px_rgba(46,49,146,0.25)] group order-2 lg:order-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src="/branding/assets/across-water-optimized.jpg"
                  alt="Pittsburgh skyline across the water"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-reflex-blue/30 via-transparent to-brand-pms-129/20 group-hover:opacity-0 transition-opacity duration-700" />
              </motion.div>

              {/* Content */}
              <motion.div
                className="space-y-8 order-1 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-brand-reflex-blue leading-[0.95]">
                  {t('about.whyPioneerTitle', 'Why Pittsburgh Tomorrow Pioneer?')}
                </h2>

                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>{t('about.whyPioneerText1', 'Moving to a new city is exciting but overwhelming. We created Pittsburgh Tomorrow Pioneer to simplify that journey.')}</p>
                  <p>{t('about.whyPioneerText2', 'Instead of spending hours searching countless websites and asking the same questions, you get one comprehensive, personalized guide tailored to your needs.')}</p>
                </div>

                <ul className="space-y-4">
                  {[
                    { icon: <Heart className="w-5 h-5" />, text: t('about.benefit1', 'Free and always will be') },
                    { icon: <Globe className="w-5 h-5" />, text: t('about.benefit2', 'Available in 15 languages') },
                    { icon: <Users className="w-5 h-5" />, text: t('about.benefit3', '500+ vetted local resources') },
                    { icon: <Shield className="w-5 h-5" />, text: t('about.benefit4', 'Privacy-first approach') },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-pms-129/20 rounded-full flex items-center justify-center text-brand-pms-129">
                        {item.icon}
                      </div>
                      <span className="text-brand-reflex-blue font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* You Are The Pioneer Section */}
        <section className="py-20 lg:py-32 bg-brand-reflex-blue text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #F4B33D 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, #F4B33D 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
            <motion.div
              className="text-center space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black leading-[0.95] tracking-tight">
                {t('about.youAreThePioneerTitle', 'You Are The')} <span className="text-brand-pms-129 italic">{t('about.youAreThePioneerTitleAccent', 'Pioneer')}</span>
              </h2>

              <div className="max-w-3xl mx-auto space-y-6 text-xl text-white/80 leading-relaxed">
                <p>{t('about.youAreThePioneerText1', 'Every newcomer to Pittsburgh is a pioneer - brave enough to start fresh, resilient enough to build a new life, and hopeful enough to see the possibilities ahead.')}</p>
                <p>{t('about.youAreThePioneerText2', "We're here to make sure you don't have to navigate this journey alone. Your success is Pittsburgh's success.")}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How We Help Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-brand-reflex-blue mb-6">
                {t('about.howWeHelpTitle', 'How Pittsburgh Tomorrow Pioneer Helps')}
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                {t('about.howWeHelpSubtitle', 'A comprehensive approach to helping you settle in and thrive')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: t('about.helpPersonalized', 'Personalized Guidance'),
                  desc: t('about.helpPersonalizedDesc', 'Answer a few questions and get a customized roadmap tailored to your specific situation, needs, and goals.'),
                },
                {
                  title: t('about.helpResources', 'Curated Resources'),
                  desc: t('about.helpResourcesDesc', 'Access 500+ vetted local resources across housing, healthcare, education, employment, and community services.'),
                },
                {
                  title: t('about.helpMultilingual', 'Multilingual Support'),
                  desc: t('about.helpMultilingualDesc', 'Everything available in 15 languages to ensure language is never a barrier to getting the help you need.'),
                },
                {
                  title: t('about.helpAI', 'AI Assistant'),
                  desc: t('about.helpAIDesc', 'Get instant answers to your questions with Bridgit, our AI-powered assistant trained on Pittsburgh-specific information.'),
                },
                {
                  title: t('about.helpPrivacy', 'Privacy Protected'),
                  desc: t('about.helpPrivacyDesc', "Your information stays private. We don't sell data and give you full control over your personal information."),
                },
                {
                  title: t('about.helpCommunity', 'Community Backed'),
                  desc: t('about.helpCommunityDesc', 'Built in partnership with local organizations who understand the challenges newcomers face.'),
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-brand-reflex-blue/5 hover:shadow-[0_20px_60px_rgba(46,49,146,0.1)] transition-all duration-500 hover:-translate-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-brand-pms-129/20 rounded-xl flex items-center justify-center text-brand-pms-129 font-black text-xl mb-6">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-black text-brand-reflex-blue mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Pittsburgh Tomorrow Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
            <motion.div
              className="text-center space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-brand-reflex-blue">
                {t('about.pittsburghTomorrowTitle', 'About Pittsburgh Tomorrow')}
              </h2>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                <p>
                  {t('about.pittsburghTomorrowText1', 'Pittsburgh Tomorrow Pioneer is an initiative of')}{' '}
                  <a href="https://pittsburghtomorrow.org" target="_blank" rel="noopener noreferrer" className="text-brand-reflex-blue hover:text-brand-pms-129 underline transition-colors">
                    Pittsburgh Tomorrow
                  </a>
                  {t('about.pittsburghTomorrowText1End', ', a nonprofit dedicated to making Pittsburgh a more welcoming and thriving city for all.')}
                </p>
                <p>{t('about.pittsburghTomorrowText2', 'We believe that when newcomers succeed, our entire community benefits. By providing free, accessible resources, we help strengthen the fabric of our neighborhoods.')}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-brand-reflex-blue text-white relative overflow-hidden">
          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #F4B33D 0px, #F4B33D 2px, transparent 2px, transparent 50px),
                             repeating-linear-gradient(-45deg, #F4B33D 0px, #F4B33D 2px, transparent 2px, transparent 50px)`
          }} />

          <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
            <motion.div
              className="text-center space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black italic leading-[1]">
                {t('about.ctaTitle', 'Ready to start your')} <br />
                <span className="text-brand-pms-129">{t('about.ctaTitleAccent', 'Pittsburgh journey?')}</span>
              </h2>

              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {t('about.ctaDescription', 'Get your personalized guide in minutes. Free, private, and available in 15 languages.')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link
                  to="/screening"
                  className="group inline-flex items-center gap-3 px-12 py-5 bg-brand-pms-129 text-brand-reflex-blue rounded-sm text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-[0_0_60px_rgba(244,179,61,0.6)] transition-all duration-500 hover:scale-105"
                >
                  <span>{t('about.ctaButton', 'Get Your Guide')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>

                <Link
                  to="/resources"
                  className="inline-flex items-center gap-3 px-12 py-5 rounded-sm text-[11px] font-black uppercase tracking-[0.2em] text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                >
                  {t('about.browseResources', 'Browse Resources')}
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-pms-129 to-transparent opacity-50" />
        </section>
      </main>
    </>
  )
}
