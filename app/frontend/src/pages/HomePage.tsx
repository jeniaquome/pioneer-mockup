import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Home,
  BookOpen,
  Users,
  CheckCircle2,
  Globe,
  Play,
  Sparkles,
  Camera,
  Quote,
  Cpu,
  Languages,
  Shield,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SEO } from '@/components/SEO'
import { StructuredData } from '@/components/StructuredData'
import { useState, useEffect, useRef } from 'react'

// Pittsburgh photos from public folder
const pittsburghPhotos = [
  { src: '/Copy of downtownfrombridge-unsplash.jpg', title: 'Downtown from the Bridge', location: 'Point State Park' },
  { src: '/Copy of AdobeStock_436357547yellowbridgewithwhitesky.jpeg', title: 'Iconic Yellow Bridge', location: 'Roberto Clemente Bridge' },
  { src: '/Copy of jason-pischke-YfoxivJxNT4-yellowbridgeatnight.jpg', title: 'City Lights', location: 'North Shore' },
  { src: '/Copy of yosselin-artavia-RKH2ws90pMI-unsplashriversunsetpittsburghdowntownviewacrosswater.jpg', title: 'Golden Hour', location: 'Three Rivers' },
  { src: '/Copy of zhen-yao-is1I1XTI4NU-unsplashcitybluewithlightslitupatnightbridgescrossingriver.jpg', title: 'Bridges at Night', location: 'Allegheny River' },
]

// Animated counter component
function AnimatedCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / (duration * 1000), 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  return <span ref={ref}>{count}{suffix}</span>
}

export function HomePage() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)

  // Parallax scroll for story section
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

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
        "logo": `${baseUrl}/branding/assets/logo-0.svg`
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

        {/* Hero Section */}
        <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                {t('homepage.heroTitle', 'Ready to become')} <br />
                <span className="italic font-light bg-gradient-to-r from-white via-brand-pms-129 to-white bg-clip-text text-transparent animate-shimmer">
                  {t('homepage.heroTitleAccent', 'a local?')}
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
                {t('homepage.heroDescription', 'Join thousands of newcomers who found their home in Pittsburgh with our free, comprehensive guide.')}
              </p>

              <div className="flex flex-col md:flex-row gap-5 justify-center animate-fade-in delay-700">
                <Link to="/screening" className="group relative overflow-hidden bg-brand-pms-129 text-brand-reflex-blue px-12 py-5 rounded-sm text-[11px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-4 hover:shadow-[0_0_60px_rgba(244,179,61,0.6)] transition-all duration-500 hover:scale-105">
                  <span className="relative z-10">{t('homepage.startYourJourney', 'Start Your Journey')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                <a href="#story" className="group px-12 py-5 rounded-sm text-[11px] font-black uppercase tracking-[0.25em] text-white border-2 border-white/40 backdrop-blur-xl hover:bg-white/10 hover:border-white/70 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] relative overflow-hidden flex items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center group-hover:border-brand-pms-129 transition-colors">
                    <Play className="w-3 h-3 ml-0.5" />
                  </div>
                  <span className="relative z-10">{t('homepage.watchTheStory', 'Watch The Story')}</span>
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl mx-auto pt-8 animate-fade-in delay-700">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-serif font-black text-brand-pms-129">10k+</div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-bold text-white/50">{t('homepage.familiesHelped', 'Families Helped')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-serif font-black text-brand-pms-129">90</div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-bold text-white/50">{t('homepage.neighborhoods', 'Neighborhoods')}</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-serif font-black text-brand-pms-129">100%</div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-bold text-white/50">{t('homepage.freeForever', 'Free Forever')}</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <a href="#story" className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow cursor-pointer group">
            <div className="flex flex-col items-center gap-3 text-white/50 group-hover:text-white/80 transition-colors duration-300">
              <span className="text-[8px] uppercase tracking-[0.3em] font-bold">{t('homepage.scrollToExplore', 'Scroll to Explore')}</span>
              <div className="w-[2px] h-12 bg-gradient-to-b from-white/50 to-transparent group-hover:from-brand-pms-129 transition-all duration-300" />
            </div>
          </a>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════════
            THE PIONEER STORY - Immersive Scroll-Driven Narrative
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section id="story" className="relative">
          {/* Chapter 1: The Opening - Full-bleed parallax intro */}
          <div ref={storyRef} className="relative min-h-[200vh]">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen overflow-hidden">
              {/* Parallax Background */}
              <motion.div
                className="absolute inset-0"
                style={{ y: backgroundY }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-reflex-blue via-brand-reflex-blue/95 to-brand-reflex-blue z-10" />
                <img
                  src="/Copy of AdobeStock_392745144PPGplaceglass_building.jpeg"
                  alt="PPG Place Pittsburgh"
                  className="w-full h-[130%] object-cover opacity-40"
                />
              </motion.div>

              {/* Animated Diagonal Lines */}
              <div className="absolute inset-0 z-[5] overflow-hidden opacity-[0.03]">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-[200%] w-[1px] bg-brand-pms-129"
                    style={{
                      left: `${i * 5}%`,
                      transform: 'rotate(15deg)',
                      transformOrigin: 'top left',
                    }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: i * 0.05, duration: 1.5 }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>

              {/* Content */}
              <motion.div
                className="relative z-20 h-full flex items-center justify-center px-6"
                style={{ y: textY, opacity }}
              >
                <div className="max-w-5xl text-center space-y-8">
                  {/* Animated Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10"
                  >
                    <Sparkles className="w-5 h-5 text-brand-pms-129" />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/80">The Pioneer Story</span>
                  </motion.div>

                  {/* Main Title with Staggered Animation */}
                  <motion.h2
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-serif font-black text-white leading-[0.9] tracking-tight"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.span
                      className="block"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      A groundbreaking
                    </motion.span>
                    <motion.span
                      className="block text-brand-pms-129 italic"
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      viewport={{ once: true }}
                    >
                      platform
                    </motion.span>
                  </motion.h2>

                  {/* Animated Underline */}
                  <motion.div
                    className="flex justify-center"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-1 w-32 bg-gradient-to-r from-transparent via-brand-pms-129 to-transparent" />
                  </motion.div>

                  {/* Subtitle */}
                  <motion.p
                    className="text-xl sm:text-2xl md:text-3xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    helping newcomers connect with their new city faster and more effectively.
                  </motion.p>
                </div>
              </motion.div>

              {/* Scroll Progress Indicator */}
              <motion.div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col items-center gap-2 text-white/40">
                  <span className="text-[8px] uppercase tracking-[0.3em]">Keep scrolling</span>
                  <motion.div
                    className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <div className="w-1 h-2 bg-brand-pms-129 rounded-full" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Chapter 2: The Mission - Horizontal reveal cards */}
          <div id="mission" className="py-24 sm:py-32 lg:py-40 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #2E3192 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />

            <div className="max-w-7xl mx-auto px-6">
              {/* Section Header */}
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-brand-reflex-blue leading-[0.95]">
                  Free, private, and{' '}
                  <span className="relative inline-block text-brand-pms-129 italic">
                    multilingual
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                      <path d="M0 4 Q100 0, 200 4" stroke="#F4B33D" strokeWidth="2" fill="none" opacity="0.5"/>
                    </svg>
                  </span>
                </h3>
                <p className="mt-8 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                  A relocation tool targeting transplants from other cities, boomerangers returning home, new students, and immigrants.
                </p>
              </motion.div>

              {/* Feature Cards - Staggered Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Shield className="w-8 h-8" />,
                    stat: <AnimatedCounter target={380} suffix="+" />,
                    label: 'Trusted Resources',
                    desc: 'Government, community, employer, cultural and nonprofit resources — all locally vetted.'
                  },
                  {
                    icon: <Languages className="w-8 h-8" />,
                    stat: <AnimatedCounter target={7} suffix="+" />,
                    label: 'Languages',
                    desc: 'Spanish, Arabic, Mandarin, Swahili, Uzbek, and more languages on the way.'
                  },
                  {
                    icon: <Cpu className="w-8 h-8" />,
                    stat: <AnimatedCounter target={89} suffix="+" />,
                    label: 'AI Languages',
                    desc: 'Bridgit, our AI assistant, provides automatic support in over 89 languages.'
                  },
                  {
                    icon: <Globe className="w-8 h-8" />,
                    stat: '1',
                    label: 'Of A Kind',
                    desc: 'No other city on earth has an asset like this.'
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="group relative bg-white p-8 rounded-3xl border border-brand-reflex-blue/10 hover:border-brand-pms-129/30 hover:shadow-[0_30px_60px_rgba(46,49,146,0.12)] transition-all duration-700"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 bg-brand-reflex-blue/5 rounded-2xl flex items-center justify-center text-brand-reflex-blue mb-6 group-hover:bg-brand-pms-129 group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>

                    {/* Stat */}
                    <div className="text-5xl sm:text-6xl font-serif font-black text-brand-reflex-blue mb-2 group-hover:text-brand-pms-129 transition-colors duration-500">
                      {item.stat}
                    </div>

                    {/* Label */}
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-pms-129 mb-4">
                      {item.label}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-3xl">
                      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-brand-pms-129/0 group-hover:border-brand-pms-129/50 transition-all duration-700 rounded-tr-xl" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Chapter 3: The Quote - Cinematic full-width */}
          <div className="relative py-32 sm:py-40 lg:py-48 overflow-hidden">
            {/* Background with Parallax */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-reflex-blue via-brand-reflex-blue/95 to-brand-reflex-blue z-10" />
              <motion.img
                src="/Copy of zhen-yao-is1I1XTI4NU-unsplashcitybluewithlightslitupatnightbridgescrossingriver.jpg"
                alt="Pittsburgh at night"
                className="w-full h-full object-cover opacity-30"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
              />
            </div>

            {/* Quote Content */}
            <div className="relative z-20 max-w-5xl mx-auto px-6">
              <motion.div
                className="text-center space-y-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                {/* Quote Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <Quote className="w-16 h-16 text-brand-pms-129 mx-auto opacity-60" />
                </motion.div>

                {/* Quote Text */}
                <motion.blockquote
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <span className="text-brand-pms-129">"</span>This is a one-of-a-kind asset that no other city on earth has. It's a great way to connect people with all they need to make Pittsburgh home — a major step forward in our efforts to attract and welcome new Pittsburghers.<span className="text-brand-pms-129">"</span>
                </motion.blockquote>

                {/* Attribution */}
                <motion.div
                  className="pt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-4">
                    <div className="w-16 h-[2px] bg-brand-pms-129/50" />
                    <div className="text-left">
                      <div className="text-white font-black text-lg">Doug Heuck</div>
                      <div className="text-white/60 text-sm">Founder, Pittsburgh Tomorrow</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 border border-brand-pms-129/20 rounded-full" />
            <div className="absolute bottom-10 right-10 w-48 h-48 border border-brand-pms-129/10 rounded-full" />
          </div>

          {/* Chapter 4: The Vision - Split screen */}
          <div className="py-24 sm:py-32 lg:py-40 bg-gray-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image Side */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {/* Main Image */}
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(46,49,146,0.2)] group">
                    <img
                      src="/Copy of AdobeStock_436357547yellowbridgewithwhitesky.jpeg"
                      alt="Pittsburgh Yellow Bridge"
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-reflex-blue/60 via-transparent to-transparent" />

                    {/* Floating Card */}
                    <motion.div
                      className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-3xl font-serif font-black text-brand-pms-129 mb-1">2023</div>
                      <div className="text-[9px] font-black uppercase tracking-[0.15em] text-gray-500">Founded with a mission</div>
                    </motion.div>
                  </div>

                  {/* Decorative Frame */}
                  <div className="absolute -top-6 -left-6 w-full h-full border-2 border-brand-pms-129/20 rounded-[3rem] -z-10" />
                </motion.div>

                {/* Text Side */}
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-3 px-5 py-2 bg-brand-reflex-blue/5 rounded-full">
                    <div className="w-2 h-2 bg-brand-pms-129 rounded-full" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-reflex-blue">The Vision</span>
                  </div>

                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-brand-reflex-blue leading-[0.95]">
                    Building a stronger{' '}
                    <span className="text-brand-pms-129 italic">community</span>
                  </h3>

                  {/* Quote */}
                  <div className="relative pl-6 border-l-4 border-brand-pms-129">
                    <p className="text-lg sm:text-xl text-gray-700 leading-relaxed italic">
                      "Growing up in Allegheny County, I saw firsthand the incredible history and resilience of Pittsburgh. Pittsburgh Tomorrow Pioneer is the perfect example of how innovation can be used to build a stronger community, welcome newcomers, and secure the city's future."
                    </p>
                    <div className="mt-4">
                      <div className="font-black text-brand-reflex-blue">Jim Schwoebel</div>
                      <div className="text-sm text-gray-500">Founder & CEO, Quome</div>
                    </div>
                  </div>

                  {/* Pittsburgh Tomorrow Info */}
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      <span className="font-bold text-brand-reflex-blue">Pittsburgh Tomorrow</span> is a nonprofit founded in 2023 with the mission to reverse Pittsburgh's decades-long population decline and revitalize the region.
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    to="/screening"
                    className="group inline-flex items-center gap-4 px-10 py-5 bg-brand-reflex-blue text-white rounded-full text-sm font-black uppercase tracking-[0.2em] hover:bg-brand-pms-129 hover:text-brand-reflex-blue transition-all duration-500 hover:shadow-[0_20px_50px_rgba(244,179,61,0.4)]"
                  >
                    <span>Get Your Guide</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section id="resources" className="py-20 sm:py-32 lg:py-40 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
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
                { title: t('homepage.featureLiving', 'Living Essentials'), icon: <Home />, desc: t('homepage.featureLivingDesc', 'Housing, utilities, healthcare, and everything you need to settle in.'), color: 'from-blue-500/10 to-blue-600/5', link: '/resources/living-essentials' },
                { title: t('homepage.featureCommunity', 'Community And Belonging'), icon: <Users />, desc: t('homepage.featureCommunityDesc', 'Find your faith, your hobby, and your local neighborhood council.'), color: 'from-purple-500/10 to-purple-600/5', link: '/resources/community-belonging' },
                { title: t('homepage.featureEducation', 'Education: Adult And Youth'), icon: <BookOpen />, desc: t('homepage.featureEducationDesc', 'Navigating the Pittsburgh school system with ease.'), color: 'from-green-500/10 to-green-600/5', link: '/resources/education-youth' },
                { title: t('homepage.featureESL', 'ESL And Immigrant Support'), icon: <Globe />, desc: t('homepage.featureESLDesc', 'Connecting you with local translators and ESL programs.'), color: 'from-orange-500/10 to-orange-600/5', link: '/resources/esl-immigrant' },
                { title: t('homepage.featureJobs', 'Jobs And Business Resources'), icon: <CheckCircle2 />, desc: t('homepage.featureJobsDesc', 'Career services, job boards, and business resources.'), color: 'from-pink-500/10 to-pink-600/5', link: '/resources/work-business' },
                { title: t('homepage.featureCulture', 'Culture, Arts And Fun'), icon: <Camera />, desc: t('homepage.featureCultureDesc', 'Museums, events, parks, and entertainment in the Steel City.'), color: 'from-teal-500/10 to-teal-600/5', link: '/resources/culture-leisure' },
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

        {/* Pittsburgh Photo Gallery */}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
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
          </div>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-pms-129 to-transparent opacity-50" />
        </section>
      </main>
    </>
  )
}
