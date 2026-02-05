import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Home,
  BookOpen,
  Users,
  CheckCircle2,
  Globe,
  Sparkles,
  Camera,
  Quote,
  MapPin,
  Heart,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SEO } from '@/components/SEO'
import { StructuredData } from '@/components/StructuredData'
import { useState, useEffect, useRef } from 'react'

// Pittsburgh images from public folder
const images = {
  hero: '/Copy of yosselin-artavia-RKH2ws90pMI-unsplashriversunsetpittsburghdowntownviewacrosswater.jpg',
  downtown: '/Copy of downtownfrombridge-unsplash.jpg',
  yellowBridge: '/Copy of AdobeStock_436357547yellowbridgewithwhitesky.jpeg',
  yellowBridgeRoad: '/Copy of jaime-casap-obaEBmP_CTA-yellowbridgeroad.jpg',
  yellowBridgeNight: '/Copy of jason-pischke-YfoxivJxNT4-yellowbridgeatnight.jpg',
  ppgPlace: '/Copy of AdobeStock_392745144PPGplaceglass_building.jpeg',
  neighborhoodHill: '/Copy of jimmy-woo-l4pVJ4zzwt0-unsplashaspinwallpittsburghneighborhoodhillview.jpg',
  riverSky: '/Copy of jocelyn-allen-0Orb6gDDn4g-unsplashriverwithskyreflectedonwater.jpg',
  ppgWithBridge: '/Copy of jocelyn-allen-AgpI111Z4Ys-unsplashPGAplacewithyellowbridgecuttinginfront.jpg',
  schenleyPark: '/Copy of nathan-kelly-U3eEA6puoA4-unsplashschenleyparkbridgepillarsforestunderrustygreenbridge.jpg',
  bridgeSunshine: '/Copy of willie-shaw-64iuIOektb4-unsplashyellowbridgeroadviewwithsunshiningthrough.jpg',
  cityNight: '/Copy of zhen-yao-is1I1XTI4NU-unsplashcitybluewithlightslitupatnightbridgescrossingriver.jpg',
  adobeBuilding: '/Copy of AdobeStock_175831629.jpeg',
  adobeFamily: '/Copy of AdobeStock_361619753.jpeg',
  adobeYellowBridge: '/Copy of AdobeStock_371672182_yellow_bridge.jpeg',
}

// Animated counter component
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const duration = 2000
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
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
  }, [target, hasAnimated])

  return <span ref={ref}>{count}{suffix}</span>
}

export function HomePage() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax for different sections
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

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

      <main ref={containerRef} className="bg-white overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════════════
            HERO SECTION - Full viewport with parallax background
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section id="hero" className="relative h-screen overflow-hidden">
          {/* Parallax Background Image */}
          <motion.div
            className="absolute inset-0 scale-110"
            style={{ y: heroY }}
          >
            <img
              src={images.hero}
              alt="Pittsburgh skyline at sunset"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-reflex-blue/60 via-brand-reflex-blue/40 to-brand-reflex-blue/80" />
          </motion.div>

          {/* Hero Content */}
          <motion.div
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
            style={{ opacity: heroOpacity }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <MapPin className="w-4 h-4 text-brand-pms-129" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/90">
                  Welcome to Pittsburgh
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black leading-[0.9] tracking-tight max-w-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Your new chapter in the{' '}
              <span className="text-brand-pms-129 italic">Steel City</span>{' '}
              starts here.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-8 text-xl sm:text-2xl text-white/80 max-w-2xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              A free, personalized guide helping newcomers connect with their new city faster and more effectively.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                to="/screening"
                className="group bg-brand-pms-129 text-brand-reflex-blue px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-[0_0_60px_rgba(244,179,61,0.5)] transition-all duration-500 hover:scale-105"
              >
                <span>Get Your Free Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
              <a
                href="#story"
                className="px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white border-2 border-white/40 hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center justify-center"
              >
                Learn Our Story
              </a>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              className="mt-16 grid grid-cols-3 gap-8 sm:gap-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[
                { value: '380+', label: 'Resources' },
                { value: '7+', label: 'Languages' },
                { value: '100%', label: 'Free' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-serif font-black text-brand-pms-129">{stat.value}</div>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <a href="#story" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <motion.div
              className="flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-pointer"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-[8px] uppercase tracking-[0.3em]">Scroll</span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
          </a>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════════
            THE STORY SECTION - Image-driven narrative panels
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section id="story" className="relative">

          {/* Panel 1: Introduction - Full width image with overlaid text */}
          <div className="relative min-h-screen flex items-center">
            {/* Background Image with Parallax */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            >
              <img
                src={images.downtown}
                alt="Pittsburgh downtown from bridge"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-reflex-blue/95 via-brand-reflex-blue/70 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="text-white space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 text-brand-pms-129 text-[10px] font-black uppercase tracking-[0.3em]">
                  <Sparkles className="w-4 h-4" />
                  The Pioneer Story
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-[0.95]">
                  A groundbreaking platform for{' '}
                  <span className="text-brand-pms-129 italic">newcomers</span>
                </h2>
                <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                  Pittsburgh Tomorrow Pioneer is a free, private, and multilingual relocation tool targeting transplants from other cities, boomerangers returning home, new students, and immigrants.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  The intuitive design and use of the latest AI technologies ensures that users can easily discover everything they need to feel at home in Pittsburgh.
                </p>
              </motion.div>

              {/* Floating Stats Card */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: <AnimatedCounter target={380} suffix="+" />, label: 'Vetted Resources' },
                      { value: <AnimatedCounter target={7} suffix="+" />, label: 'Languages' },
                      { value: <AnimatedCounter target={89} suffix="+" />, label: 'AI Languages' },
                      { value: '2023', label: 'Founded' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-4">
                        <div className="text-4xl font-serif font-black text-brand-pms-129">{stat.value}</div>
                        <div className="text-[9px] uppercase tracking-[0.15em] text-white/60 mt-2">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Panel 2: Bento Grid - Mixed images and content */}
          <div className="bg-gray-50 py-20 sm:py-32">
            <div className="max-w-7xl mx-auto px-6">
              {/* Bento Grid */}
              <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 auto-rows-[120px] sm:auto-rows-[150px]">

                {/* Large Image - Yellow Bridge */}
                <motion.div
                  className="col-span-4 md:col-span-4 lg:col-span-5 row-span-3 relative rounded-3xl overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={images.yellowBridge}
                    alt="Pittsburgh Yellow Bridge"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-brand-pms-129 mb-1">Iconic Landmark</div>
                    <div className="text-2xl font-serif font-bold">Roberto Clemente Bridge</div>
                  </div>
                </motion.div>

                {/* Quote Card */}
                <motion.div
                  className="col-span-4 md:col-span-4 lg:col-span-7 row-span-2 bg-brand-reflex-blue rounded-3xl p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-white/10" />
                  <blockquote className="text-white text-lg sm:text-xl lg:text-2xl font-serif italic leading-relaxed">
                    "This is a one-of-a-kind asset that no other city on earth has."
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-pms-129 rounded-full flex items-center justify-center text-brand-reflex-blue font-black text-sm">DH</div>
                    <div>
                      <div className="text-white font-bold text-sm">Doug Heuck</div>
                      <div className="text-white/60 text-xs">Founder, Pittsburgh Tomorrow</div>
                    </div>
                  </div>
                </motion.div>

                {/* Small Image - PPG Place */}
                <motion.div
                  className="col-span-2 md:col-span-4 lg:col-span-4 row-span-2 relative rounded-3xl overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={images.ppgPlace}
                    alt="PPG Place"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Stat Card */}
                <motion.div
                  className="col-span-2 md:col-span-4 lg:col-span-3 row-span-2 bg-brand-pms-129 rounded-3xl p-6 flex flex-col justify-center items-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="text-5xl sm:text-6xl font-serif font-black text-brand-reflex-blue">
                    <AnimatedCounter target={15} />m
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.15em] text-brand-reflex-blue/70 mt-2">To Get Started</div>
                </motion.div>

                {/* Small Image - Neighborhood */}
                <motion.div
                  className="col-span-2 md:col-span-4 lg:col-span-3 row-span-2 relative rounded-3xl overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={images.neighborhoodHill}
                    alt="Pittsburgh neighborhood"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>

                {/* Small Image - River */}
                <motion.div
                  className="col-span-2 md:col-span-4 lg:col-span-2 row-span-1 relative rounded-2xl overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={images.riverSky}
                    alt="Pittsburgh river"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>

              </div>
            </div>
          </div>

          {/* Panel 3: Features with Image Background */}
          <div id="mission" className="relative py-24 sm:py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={images.cityNight}
                alt="Pittsburgh at night"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-reflex-blue/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-tight">
                  Everything you need to{' '}
                  <span className="text-brand-pms-129 italic">thrive</span>
                </h3>
                <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
                  The platform saves countless hours of search time and yields better results.
                </p>
              </motion.div>

              {/* Feature Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Globe className="w-6 h-6" />,
                    title: 'Multilingual Support',
                    desc: 'Available in 7+ languages including Spanish, Arabic, Mandarin, Swahili, and Uzbek.',
                    image: images.adobeFamily,
                  },
                  {
                    icon: <Heart className="w-6 h-6" />,
                    title: 'Personalized Roadmap',
                    desc: 'Fill out a brief intake form and get a custom personalized roadmap based on your needs.',
                    image: images.bridgeSunshine,
                  },
                  {
                    icon: <Sparkles className="w-6 h-6" />,
                    title: 'AI-Powered Assistant',
                    desc: 'Meet Bridgit, our AI assistant providing automatic support in over 89 languages.',
                    image: images.ppgWithBridge,
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                  >
                    {/* Background Image */}
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-reflex-blue via-brand-reflex-blue/60 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="w-12 h-12 bg-brand-pms-129 rounded-2xl flex items-center justify-center text-brand-reflex-blue mb-4 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h4 className="text-xl font-black text-white mb-2">{feature.title}</h4>
                      <p className="text-white/70 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 4: Second Quote - Cinematic */}
          <div className="relative py-32 sm:py-40">
            {/* Background Image with Mask */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            >
              <img
                src={images.schenleyPark}
                alt="Schenley Park"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Quote className="w-16 h-16 text-brand-pms-129 mx-auto mb-8 opacity-50" />
                <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif text-brand-reflex-blue leading-relaxed">
                  "Growing up in Allegheny County, I saw firsthand the incredible history and resilience of Pittsburgh. Pittsburgh Tomorrow Pioneer is the perfect example of how innovation can be used to build a stronger community, welcome newcomers, and secure the city's future."
                </blockquote>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="w-16 h-[2px] bg-brand-pms-129" />
                  <div className="text-center">
                    <div className="font-black text-brand-reflex-blue text-lg">Jim Schwoebel</div>
                    <div className="text-gray-500 text-sm">Founder & CEO, Quome</div>
                  </div>
                  <div className="w-16 h-[2px] bg-brand-pms-129" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════════
            RESOURCES SECTION
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section id="resources" className="py-20 sm:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-brand-reflex-blue/5 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-brand-pms-129" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-brand-reflex-blue">{t('homepage.sixModules', 'Six Essential Modules')}</span>
              </div>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-brand-reflex-blue">{t('homepage.personalGuide', 'Your Personal Guide')}</h3>
            </motion.div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: t('homepage.featureLiving', 'Living Essentials'), icon: <Home />, desc: t('homepage.featureLivingDesc', 'Housing, utilities, healthcare, and everything you need to settle in.'), color: 'from-blue-500 to-blue-600', link: '/resources/living-essentials' },
                { title: t('homepage.featureCommunity', 'Community And Belonging'), icon: <Users />, desc: t('homepage.featureCommunityDesc', 'Find your faith, your hobby, and your local neighborhood council.'), color: 'from-purple-500 to-purple-600', link: '/resources/community-belonging' },
                { title: t('homepage.featureEducation', 'Education: Adult And Youth'), icon: <BookOpen />, desc: t('homepage.featureEducationDesc', 'Navigating the Pittsburgh school system with ease.'), color: 'from-green-500 to-green-600', link: '/resources/education-youth' },
                { title: t('homepage.featureESL', 'ESL And Immigrant Support'), icon: <Globe />, desc: t('homepage.featureESLDesc', 'Connecting you with local translators and ESL programs.'), color: 'from-orange-500 to-orange-600', link: '/resources/esl-immigrant' },
                { title: t('homepage.featureJobs', 'Jobs And Business Resources'), icon: <CheckCircle2 />, desc: t('homepage.featureJobsDesc', 'Career services, job boards, and business resources.'), color: 'from-pink-500 to-pink-600', link: '/resources/work-business' },
                { title: t('homepage.featureCulture', 'Culture, Arts And Fun'), icon: <Camera />, desc: t('homepage.featureCultureDesc', 'Museums, events, parks, and entertainment in the Steel City.'), color: 'from-teal-500 to-teal-600', link: '/resources/culture-leisure' },
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
                    className="group block bg-white p-8 rounded-3xl border border-gray-100 hover:border-brand-pms-129/30 hover:shadow-[0_20px_60px_rgba(46,49,146,0.12)] transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {item.icon}
                    </div>

                    {/* Content */}
                    <h4 className="text-xl font-black text-brand-reflex-blue mb-3 group-hover:text-brand-pms-129 transition-colors">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.desc}</p>

                    {/* CTA */}
                    <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-reflex-blue group-hover:text-brand-pms-129 transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════════
            GALLERY SECTION - Masonry photo grid
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section id="gallery" className="py-20 sm:py-32 bg-brand-reflex-blue">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full mb-6">
                <Camera className="w-4 h-4 text-brand-pms-129" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/80">Explore the City</span>
              </div>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white">
                Discover <span className="text-brand-pms-129">Pittsburgh</span>
              </h3>
            </motion.div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { src: images.downtown, span: 'col-span-2 row-span-2', title: 'Downtown', location: 'Point State Park' },
                { src: images.yellowBridgeNight, span: 'col-span-1 row-span-1', title: 'City Lights', location: 'North Shore' },
                { src: images.ppgPlace, span: 'col-span-1 row-span-1', title: 'PPG Place', location: 'Downtown' },
                { src: images.yellowBridgeRoad, span: 'col-span-1 row-span-1', title: 'Bridge Road', location: 'Clemente Bridge' },
                { src: images.neighborhoodHill, span: 'col-span-1 row-span-1', title: 'Neighborhoods', location: 'Aspinwall' },
              ].map((photo, i) => (
                <motion.div
                  key={i}
                  className={`${photo.span} relative rounded-2xl overflow-hidden group cursor-pointer aspect-square`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="text-[8px] uppercase tracking-[0.2em] text-brand-pms-129">{photo.location}</div>
                    <div className="font-bold">{photo.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section className="relative py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={images.adobeYellowBridge}
              alt="Pittsburgh Yellow Bridge"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-brand-reflex-blue/90" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-tight mb-8">
                Ready to start your{' '}
                <span className="text-brand-pms-129 italic">Pittsburgh journey?</span>
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Get your personalized guide in minutes. It's free, private, and available in 7+ languages.
              </p>
              <Link
                to="/screening"
                className="group inline-flex items-center gap-4 bg-brand-pms-129 text-brand-reflex-blue px-12 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-[0_0_60px_rgba(244,179,61,0.5)] transition-all duration-500 hover:scale-105"
              >
                <span>Get Your Free Guide</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
