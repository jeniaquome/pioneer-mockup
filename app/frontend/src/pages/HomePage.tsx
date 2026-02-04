import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  MapPin,
  Home,
  BookOpen,
  Users,
  CheckCircle2,
  Globe,
  Play,
  Sparkles,
  Camera,
  MessageCircle
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SEO } from '@/components/SEO'
import { StructuredData } from '@/components/StructuredData'
import { openChatWidget } from '@/components/ChatWidget'
import { useState, useEffect, useRef } from 'react'

// Pittsburgh photos from public folder
const pittsburghPhotos = [
  { src: '/Copy of downtownfrombridge-unsplash.jpg', title: 'Downtown from the Bridge', location: 'Point State Park' },
  { src: '/Copy of AdobeStock_436357547yellowbridgewithwhitesky.jpeg', title: 'Iconic Yellow Bridge', location: 'Roberto Clemente Bridge' },
  { src: '/Copy of jason-pischke-YfoxivJxNT4-yellowbridgeatnight.jpg', title: 'City Lights', location: 'North Shore' },
  { src: '/Copy of yosselin-artavia-RKH2ws90pMI-unsplashriversunsetpittsburghdowntownviewacrosswater.jpg', title: 'Golden Hour', location: 'Three Rivers' },
  { src: '/Copy of zhen-yao-is1I1XTI4NU-unsplashcitybluewithlightslitupatnightbridgescrossingriver.jpg', title: 'Bridges at Night', location: 'Allegheny River' },
  { src: '/Copy of AdobeStock_371672182_yellow_bridge.jpeg', title: 'Steel City Pride', location: 'Andy Warhol Bridge' },
  { src: '/Copy of jocelyn-allen-AgpI111Z4Ys-unsplashPGAplacewithyellowbridgecuttinginfront.jpg', title: 'PPG Place', location: 'Downtown' },
  { src: '/Copy of willie-shaw-64iuIOektb4-unsplashyellowbridgeroadviewwithsunshiningthrough.jpg', title: 'Morning Light', location: 'Fort Duquesne Bridge' },
  { src: '/Copy of AdobeStock_392745144PPGplaceglass_building.jpeg', title: 'Glass Castle', location: 'PPG Place' },
  { src: '/Copy of jimmy-woo-l4pVJ4zzwt0-unsplashaspinwallpittsburghneighborhoodhillview.jpg', title: 'Neighborhood Views', location: 'Aspinwall' },
  { src: '/Copy of nathan-kelly-U3eEA6puoA4-unsplashschenleyparkbridgepillarsforestunderrustygreenbridge.jpg', title: 'Hidden Gems', location: 'Schenley Park' },
  { src: '/Copy of jocelyn-allen-0Orb6gDDn4g-unsplashriverwithskyreflectedonwater.jpg', title: 'Reflections', location: 'Ohio River' },
]

export function HomePage() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleBridgitClick = (e: React.MouseEvent) => {
    e.preventDefault()
    openChatWidget()
  }

  // Determine base URL for absolute URLs
  const getBaseUrl = () => {
    if (import.meta.env.VITE_SITE_BASE_URL) {
      return import.meta.env.VITE_SITE_BASE_URL
    }
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin
    }
    return 'https://www.pittsburghpioneer.com'
  }

  const baseUrl = getBaseUrl()

  // Hybrid JSON-LD schema
  const hybridSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${baseUrl}/#organization`,
        "@type": "Organization",
        "name": "Pittsburgh Tomorrow",
        "alternateName": "Pittsburgh Tomorrow Pioneer",
        "url": baseUrl,
        "logo": `${baseUrl}/branding/assets/new-bridgit.png`
      },
      {
        "@id": `${baseUrl}/#website`,
        "@type": "WebSite",
        "name": "Pittsburgh Tomorrow Pioneer",
        "description": "Your personalized guide to settling and thriving in Pittsburgh.",
        "url": `${baseUrl}/`,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/resources?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        "publisher": {
          "@id": `${baseUrl}/#organization`
        }
      }
    ]
  }

  return (
    <>
      <SEO
        title="Pittsburgh Resources for Newcomers & Immigrants | Free Guide & Services"
        description="Free personalized guide for immigrants and newcomers in Pittsburgh. Find housing, jobs, ESL classes, legal aid, healthcare, and community support."
        keywords="Pittsburgh immigrant resources, Pittsburgh newcomer guide, immigrant services Pittsburgh"
        url={baseUrl}
      />
      <StructuredData data={hybridSchema} />

      <main className="bg-white overflow-x-hidden">
        {/* Grain Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[150] opacity-[0.015] mix-blend-overlay grain-texture" />

        {/* Cinematic Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Gradient Mesh Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-reflex-blue via-brand-reflex-blue/80 to-black opacity-40 z-[5]" />
            <div
              className="absolute inset-0 opacity-30 z-[6] transition-transform duration-1000"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #F4B33D 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0 scale-110 animate-slow-zoom">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-brand-reflex-blue/50 to-white z-10" />
            <img
              src="/Copy of yosselin-artavia-RKH2ws90pMI-unsplashriversunsetpittsburghdowntownviewacrosswater.jpg"
              alt="Pittsburgh Three Rivers Sunrise"
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 z-[15] pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-20 text-center max-w-6xl px-6 space-y-12">
            {/* Decorative Top Element */}
            <div className="flex justify-center mb-8 animate-slide-down">
              <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                <div className="w-2 h-2 bg-brand-pms-129 rounded-full animate-pulse-slow" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/80">
                  {t('homepage.welcomeBadge', 'Welcome to the Steel City')}
                </span>
              </div>
            </div>

            <div className="space-y-6 animate-slide-up">
              <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[8.5rem] font-serif font-black leading-[0.85] tracking-tighter drop-shadow-2xl">
                {t('homepage.heroTitle', 'A New Chapter')} <br />
                <span className="italic font-light bg-gradient-to-r from-white via-brand-pms-129 to-white bg-clip-text text-transparent animate-shimmer">
                  {t('homepage.heroTitleAccent', 'in the Steel City.')}
                </span>
              </h1>
              {/* Decorative Line */}
              <div className="flex justify-center items-center gap-4 animate-fade-in delay-300">
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-brand-pms-129 to-transparent" />
                <div className="w-2 h-2 bg-brand-pms-129 rounded-full rotate-45" />
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-brand-pms-129 to-transparent" />
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-10 animate-fade-in delay-500">
              <p className="text-xl sm:text-2xl md:text-3xl text-white/95 font-light leading-relaxed tracking-wide drop-shadow-lg">
                {t('homepage.heroDescription', "Moving to Pittsburgh? Don't spend hours searching dozens of sites.")}
                <span className="font-black text-brand-pms-129 drop-shadow-[0_0_20px_rgba(244,179,61,0.5)]"> Pittsburgh Pioneer</span> {t('homepage.heroDescriptionContinued', 'is your personal, free guide to settling in quickly and warmly.')}
              </p>

              <div className="flex flex-col md:flex-row gap-5 justify-center animate-fade-in delay-700">
                <Link to="/screening" className="group relative overflow-hidden bg-gradient-to-r from-brand-pms-129 via-brand-pms-179 to-brand-pms-129 text-brand-reflex-blue px-12 py-6 rounded-full text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:shadow-[0_0_60px_rgba(244,179,61,0.6)] transition-all duration-500 hover:scale-105 bg-[length:200%_100%] hover:bg-[position:100%_0]">
                  <span className="relative z-10">{t('homepage.beginJourney', 'Begin Your Journey')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <Link to="/resources" className="group px-12 py-6 rounded-full text-sm font-black uppercase tracking-[0.2em] text-white border-2 border-white/30 backdrop-blur-xl hover:bg-white/20 hover:border-white/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    {t('homepage.exploreResources', 'Explore Resources')}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced Floating Stat */}
          <div className="absolute bottom-16 left-16 hidden lg:block z-20 animate-slide-right">
            <div className="flex items-center gap-6 text-white/70 group cursor-pointer">
              <div className="w-16 h-[2px] bg-gradient-to-r from-brand-pms-129 to-transparent group-hover:w-24 transition-all duration-700" />
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-[0.35em] font-black text-white/90 block">
                  {t('homepage.statFree', '100% Free • Personalized')}
                </span>
                <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/60">
                  {t('homepage.statCommunity', 'Community Backed')}
                </span>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <a href="#mission" className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow cursor-pointer group">
            <div className="flex flex-col items-center gap-3 text-white/50 group-hover:text-white/80 transition-colors duration-300">
              <span className="text-[8px] uppercase tracking-[0.3em] font-bold">{t('homepage.scrollToExplore', 'Scroll to Explore')}</span>
              <div className="w-[2px] h-12 bg-gradient-to-b from-white/50 to-transparent group-hover:from-brand-pms-129 transition-all duration-300" />
            </div>
          </a>
        </section>

        {/* Mission Section */}
        <section id="mission" className="py-20 sm:py-32 lg:py-40 px-6 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-brand-pms-129/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-reflex-blue/5 rounded-full blur-[120px]" />

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:rounded-[4rem] shadow-[0_40px_100px_rgba(46,49,146,0.25)] group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-8 left-8 w-12 h-12 border-l-4 border-t-4 border-brand-pms-129 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-r-4 border-b-4 border-brand-pms-129 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20" />

              <img
                src="/Copy of AdobeStock_392745144PPGplaceglass_building.jpeg"
                alt="PPG Place Pittsburgh"
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-reflex-blue/30 via-transparent to-brand-pms-129/20 group-hover:opacity-0 transition-opacity duration-700" />

              <div className="absolute bottom-12 left-12 text-white transform translate-y-0 group-hover:translate-y-[-8px] transition-transform duration-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-[2px] bg-brand-pms-129" />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black">PPG Place • Downtown</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-serif italic drop-shadow-lg">{t('homepage.missionImageCaption', 'Where glass meets steel.')}</h4>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8 lg:space-y-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-brand-reflex-blue/10 to-brand-reflex-blue/5 rounded-full text-brand-reflex-blue text-[10px] font-black uppercase tracking-[0.25em] border border-brand-reflex-blue/10">
                <div className="w-2 h-2 bg-brand-pms-129 rounded-full animate-pulse-slow" />
                {t('homepage.missionBadge', 'The Mission')}
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-black text-brand-reflex-blue leading-[0.95] tracking-tight">
                {t('homepage.missionTitle', 'The most complete, time-saving way to')} <span className="relative inline-block text-brand-pms-129">
                  {t('homepage.missionTitleAccent', 'start your life')}
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M0 6 Q150 0, 300 6" stroke="#F4B33D" strokeWidth="2" fill="none" opacity="0.3"/>
                  </svg>
                </span> {t('homepage.missionTitleEnd', 'here.')}
              </h2>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl font-light">
                {t('homepage.missionDescription', "From housing and schools to language, faith, and community life—we've consolidated everything into a single, seamless roadmap. It's not just a directory; it's a")} <span className="font-bold text-brand-reflex-blue">{t('homepage.missionDescriptionAccent', 'welcoming hand')}</span> {t('homepage.missionDescriptionEnd', 'into your new community.')}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 sm:gap-10 pt-8">
                <div className="group cursor-pointer">
                  <div className="relative inline-block">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-brand-reflex-blue group-hover:text-brand-pms-129 transition-colors duration-500">500+</span>
                    <div className="absolute -right-2 -top-2 w-4 h-4 bg-brand-pms-129 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mt-3 group-hover:text-brand-reflex-blue/60 transition-colors duration-500">{t('homepage.statResources', 'Vetted Resources')}</p>
                  <div className="w-0 h-[2px] bg-brand-pms-129 group-hover:w-full transition-all duration-500 mt-2" />
                </div>
                <div className="group cursor-pointer">
                  <div className="relative inline-block">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-brand-reflex-blue group-hover:text-brand-pms-129 transition-colors duration-500">15m</span>
                    <div className="absolute -right-2 -top-2 w-4 h-4 bg-brand-pms-129 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mt-3 group-hover:text-brand-reflex-blue/60 transition-colors duration-500">{t('homepage.statTime', 'To get started')}</p>
                  <div className="w-0 h-[2px] bg-brand-pms-129 group-hover:w-full transition-all duration-500 mt-2" />
                </div>
              </div>

              {/* Mission CTA */}
              <div className="pt-8 lg:pt-12">
                <Link
                  to="/screening"
                  className="group inline-flex items-center gap-4 px-8 sm:px-10 py-4 sm:py-5 bg-brand-reflex-blue text-white rounded-full text-sm font-black uppercase tracking-[0.2em] hover:bg-brand-pms-129 hover:text-brand-reflex-blue hover:shadow-[0_20px_50px_rgba(244,179,61,0.4)] transition-all duration-500"
                >
                  <span>{t('homepage.getStartedFree', 'Get Started Free')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section id="features" className="py-20 sm:py-32 lg:py-40 bg-gradient-to-b from-gray-50 via-gray-100/50 to-white relative overflow-hidden">
          {/* Decorative Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, #2E3192 0px, #2E3192 1px, transparent 1px, transparent 60px),
                             repeating-linear-gradient(90deg, #2E3192 0px, #2E3192 1px, transparent 1px, transparent 60px)`
          }} />

          {/* Floating Decorative Elements */}
          <div className="absolute top-40 left-20 w-72 h-72 bg-gradient-to-br from-brand-pms-129/10 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-brand-reflex-blue/10 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Header */}
            <motion.div
              className="text-center mb-16 lg:mb-24 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-brand-reflex-blue/10 mb-4">
                <Sparkles className="w-4 h-4 text-brand-pms-129" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-brand-reflex-blue">{t('homepage.sixModules', 'Six Essential Modules')}</span>
              </div>
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-brand-reflex-blue tracking-tight">{t('homepage.personalGuide', 'Your Personal Guide')}</h3>
              <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">{t('homepage.personalGuideSubtitle', 'Explore the modules that make your transition seamless, from finding a home to becoming part of the community.')}</p>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: t('homepage.featureLiving', 'Living Essentials'), icon: <Home />, desc: t('homepage.featureLivingDesc', 'Housing, utilities, healthcare, and everything you need to settle in.'), color: 'from-blue-500/10 to-blue-600/5', link: '/resources/housing' },
                { title: t('homepage.featureCommunity', 'Community And Belonging'), icon: <Users />, desc: t('homepage.featureCommunityDesc', 'Find your faith, your hobby, and your local neighborhood council.'), color: 'from-purple-500/10 to-purple-600/5', link: '/resources/community' },
                { title: t('homepage.featureEducation', 'Education: Adult And Youth'), icon: <BookOpen />, desc: t('homepage.featureEducationDesc', 'Navigating the Pittsburgh school system with ease.'), color: 'from-green-500/10 to-green-600/5', link: '/resources/education' },
                { title: t('homepage.featureESL', 'ESL And Immigrant Support'), icon: <Globe />, desc: t('homepage.featureESLDesc', 'Connecting you with local translators and ESL programs.'), color: 'from-orange-500/10 to-orange-600/5', link: '/resources/language' },
                { title: t('homepage.featureJobs', 'Jobs And Business Resources'), icon: <CheckCircle2 />, desc: t('homepage.featureJobsDesc', 'Career services, job boards, and business resources.'), color: 'from-pink-500/10 to-pink-600/5', link: '/resources/employment' },
                { title: t('homepage.featureCulture', 'Culture, Arts And Fun'), icon: <MapPin />, desc: t('homepage.featureCultureDesc', 'Museums, events, parks, and entertainment in the Steel City.'), color: 'from-teal-500/10 to-teal-600/5', link: '/resources/social' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={item.link}
                    className="group relative bg-white p-8 sm:p-10 lg:p-12 rounded-[2rem] lg:rounded-[3rem] hover:shadow-[0_30px_80px_rgba(46,49,146,0.15)] transition-all duration-700 hover:-translate-y-3 border border-brand-reflex-blue/5 overflow-hidden cursor-pointer block h-full"
                  >
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                    {/* Decorative Corner */}
                    <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-brand-pms-129/0 group-hover:border-brand-pms-129/50 transition-all duration-700 rounded-tr-3xl" />

                    {/* Icon */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-reflex-blue/10 to-brand-reflex-blue/5 rounded-2xl flex items-center justify-center text-brand-reflex-blue mb-8 sm:mb-10 group-hover:bg-gradient-to-br group-hover:from-brand-pms-129 group-hover:to-brand-pms-179 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-lg shadow-brand-reflex-blue/0 group-hover:shadow-brand-pms-129/30">
                      {item.icon}
                    </div>

                    {/* Content */}
                    <h4 className="relative text-xl sm:text-2xl lg:text-3xl font-serif font-black text-brand-reflex-blue mb-4 sm:mb-5 group-hover:text-brand-pms-129 transition-colors duration-500">{item.title}</h4>
                    <p className="relative text-gray-600 leading-relaxed text-sm sm:text-base mb-8 sm:mb-10 group-hover:text-gray-700 transition-colors duration-500">{item.desc}</p>

                    {/* CTA Button */}
                    <span className="relative flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-brand-reflex-blue group-hover:text-brand-pms-129 group-hover:gap-5 transition-all duration-500">
                      <span>{t('homepage.learnMore', 'Learn More')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-pms-129 group-hover:w-full transition-all duration-700" />
                    </span>

                    {/* Number Badge */}
                    <div className="absolute bottom-8 right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-reflex-blue/5 flex items-center justify-center text-brand-reflex-blue/20 font-black text-xl sm:text-2xl group-hover:bg-brand-pms-129/10 group-hover:text-brand-pms-129/40 transition-all duration-500">
                      {idx + 1}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pittsburgh Photo Showcase */}
        <section id="gallery" className="py-20 sm:py-32 bg-brand-reflex-blue relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #F4B33D 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, #F4B33D 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16 lg:mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
                <Camera className="w-4 h-4 text-brand-pms-129" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/80">{t('homepage.exploreCity', 'Explore the City')}</span>
              </div>
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-white tracking-tight mb-6">
                {t('homepage.discoverPittsburgh', 'Discover')} <span className="text-brand-pms-129">Pittsburgh</span>
              </h3>
              <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto font-light">
                {t('homepage.discoverPittsburghSubtitle', 'From iconic bridges to hidden neighborhoods, experience the beauty of the Steel City')}
              </p>
            </motion.div>

            {/* Bento Grid Photo Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
              {/* Large Featured Image */}
              <motion.div
                className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={pittsburghPhotos[0].src}
                  alt={pittsburghPhotos[0].title}
                  className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <motion.div
                  className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-brand-pms-129 mb-1">{pittsburghPhotos[0].location}</p>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold">{pittsburghPhotos[0].title}</h4>
                </motion.div>
              </motion.div>

              {/* Smaller Grid Images */}
              {pittsburghPhotos.slice(1, 5).map((photo, idx) => (
                <motion.div
                  key={idx}
                  className="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl aspect-square"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-brand-pms-129">{photo.location}</p>
                    <h4 className="text-xs sm:text-sm font-bold">{photo.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              className="text-center mt-12 sm:mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-white/60 mb-6 text-base sm:text-lg">{t('homepage.readyToCall', 'Ready to call Pittsburgh home?')}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/resources"
                  className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-brand-pms-129 text-brand-reflex-blue rounded-full font-black uppercase tracking-[0.2em] text-sm hover:shadow-[0_0_60px_rgba(244,179,61,0.5)] transition-all duration-500"
                >
                  {t('homepage.exploreNeighborhoods', 'Explore Neighborhoods')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer CTA Section */}
        <section className="relative bg-gradient-to-br from-brand-reflex-blue via-brand-reflex-blue to-brand-reflex-blue/90 py-20 sm:py-32 text-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, #F4B33D 0%, transparent 50%),
                               radial-gradient(circle at 80% 80%, #F4B33D 0%, transparent 50%)`
            }} />
          </div>

          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #F4B33D 0px, #F4B33D 2px, transparent 2px, transparent 50px),
                             repeating-linear-gradient(-45deg, #F4B33D 0px, #F4B33D 2px, transparent 2px, transparent 50px)`
          }} />

          <div className="max-w-7xl mx-auto px-6 text-center space-y-12 sm:space-y-16 relative z-10">
            {/* Logo */}
            <motion.div
              className="animate-fade-in"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="/branding/assets/logo-0.svg"
                alt="Logo"
                className="h-12 sm:h-14 w-auto mx-auto brightness-0 invert drop-shadow-[0_0_30px_rgba(244,179,61,0.3)]"
              />
            </motion.div>

            {/* Main CTA */}
            <motion.div
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif font-black italic leading-[1] tracking-tight">
                {t('homepage.readyToBecome', 'Ready to become')} <br />
                <span className="bg-gradient-to-r from-white via-brand-pms-129 to-white bg-clip-text text-transparent">{t('homepage.aLocal', 'a local?')}</span>
              </h2>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto font-light">
                {t('homepage.joinThousands', 'Join thousands of newcomers who found their home in Pittsburgh with our free, comprehensive guide.')}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/screening" className="group relative overflow-hidden bg-gradient-to-r from-brand-pms-129 to-brand-pms-179 text-brand-reflex-blue px-12 sm:px-16 py-5 sm:py-7 rounded-full text-sm font-black uppercase tracking-[0.25em] hover:shadow-[0_0_80px_rgba(244,179,61,0.6)] transition-all duration-700 hover:scale-110">
                <span className="relative z-10 flex items-center gap-3">
                  {t('homepage.startYourJourney', 'Start Your Journey')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Link>

              <Link to="/about" className="group flex items-center gap-3 text-white/80 hover:text-white text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/30 group-hover:border-brand-pms-129 flex items-center justify-center group-hover:bg-brand-pms-129/10 transition-all duration-500">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                </div>
                {t('homepage.watchTheStory', 'Watch The Story')}
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="grid grid-cols-3 gap-6 sm:gap-12 max-w-3xl mx-auto pt-12 sm:pt-16 border-t border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-2">
                <div className="text-2xl sm:text-4xl font-serif font-black text-brand-pms-129">10k+</div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] font-bold text-white/50">{t('homepage.familiesHelped', 'Families Helped')}</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl sm:text-4xl font-serif font-black text-brand-pms-129">90</div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] font-bold text-white/50">{t('homepage.neighborhoods', 'Neighborhoods')}</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl sm:text-4xl font-serif font-black text-brand-pms-129">100%</div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] font-bold text-white/50">{t('homepage.freeForever', 'Free Forever')}</div>
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
