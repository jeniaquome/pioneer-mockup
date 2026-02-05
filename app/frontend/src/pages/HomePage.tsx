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
  Shield,
  Map,
  MessageCircle,
  Heart,
  Building2,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SEO } from '@/components/SEO'
import { StructuredData } from '@/components/StructuredData'
import { useRef } from 'react'

// Pittsburgh images
const images = {
  hero: '/Copy of yosselin-artavia-RKH2ws90pMI-unsplashriversunsetpittsburghdowntownviewacrosswater.jpg',
  downtown: '/Copy of downtownfrombridge-unsplash.jpg',
  yellowBridge: '/Copy of AdobeStock_436357547yellowbridgewithwhitesky.jpeg',
  neighborhoodHill: '/Copy of jimmy-woo-l4pVJ4zzwt0-unsplashaspinwallpittsburghneighborhoodhillview.jpg',
  cityNight: '/Copy of zhen-yao-is1I1XTI4NU-unsplashcitybluewithlightslitupatnightbridgescrossingriver.jpg',
  ppgPlace: '/Copy of AdobeStock_392745144PPGplaceglass_building.jpeg',
  bridgeSunshine: '/Copy of willie-shaw-64iuIOektb4-unsplashyellowbridgeroadviewwithsunshiningthrough.jpg',
  yellowBridgeNight: '/Copy of jason-pischke-YfoxivJxNT4-yellowbridgeatnight.jpg',
}

export function HomePage() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%'])

  const getBaseUrl = () => {
    if (import.meta.env.VITE_SITE_BASE_URL) return import.meta.env.VITE_SITE_BASE_URL
    if (typeof window !== 'undefined' && window.location.origin) return window.location.origin
    return 'https://www.pittsburghpioneer.com'
  }

  const baseUrl = getBaseUrl()

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
        "publisher": { "@id": `${baseUrl}/#organization` }
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
            HERO - Welcome & Purpose
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section id="hero" className="relative min-h-screen flex items-center">
          {/* Background */}
          <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
            <img src={images.hero} alt="Pittsburgh skyline at sunset" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-reflex-blue/95 via-brand-reflex-blue/80 to-brand-reflex-blue/60" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-brand-pms-129" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/80">Your Personal Guide</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.1] mb-8">
                Welcome to{' '}
                <span className="text-brand-pms-129 italic">Pittsburgh Tomorrow Pioneer</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-6 max-w-3xl">
                Your personal guide to starting a new life in Pittsburgh and Allegheny County. Whether you've just arrived in the U.S. or you've taken a new job with one of Pittsburgh's growing companies in energy, robotics, AI, life sciences, or steel — Pittsburgh Tomorrow Pioneer is here to help.
              </p>

              <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-3xl">
                From finding housing to enrolling your children in school, from locating English classes to connecting with faith communities or local food support, Pittsburgh Tomorrow Pioneer brings together the resources you need in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/screening"
                  className="group bg-brand-pms-129 text-brand-reflex-blue px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(244,179,61,0.5)] transition-all duration-500 hover:scale-105"
                >
                  <span>Create Your Roadmap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/resources"
                  className="px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300 text-center"
                >
                  Explore Resources
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <a href="#why" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
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
            WHY PITTSBURGH TOMORROW PIONEER
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section id="why" className="py-20 sm:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-brand-reflex-blue leading-tight mb-6">
                Why Pittsburgh Tomorrow Pioneer?
              </h2>
              <p className="text-2xl sm:text-3xl text-brand-pms-129 font-serif italic mb-8">
                Because starting fresh in a new city shouldn't mean starting from scratch.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Pittsburgh Tomorrow Pioneer brings together everything you need to start a new life in Pittsburgh and Allegheny County — all in one trusted, easy-to-use place. It's free, comprehensive, and designed to save you hours of searching, comparing, and second-guessing.
              </p>
            </motion.div>

            {/* Comparison Points */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  contrast: 'Where a Google search shows you everything,',
                  benefit: 'Pioneer shows you exactly what matters.',
                },
                {
                  contrast: 'Where an AI chatbot offers answers,',
                  benefit: 'Pioneer gives you a roadmap.',
                },
                {
                  contrast: 'Where most relocation tools stop at logistics,',
                  benefit: 'Pioneer starts with community.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="text-center p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-gray-500 mb-2">{item.contrast}</p>
                  <p className="text-xl font-black text-brand-reflex-blue">{item.benefit}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-center text-2xl sm:text-3xl font-serif font-black text-brand-pms-129"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              It's Pittsburgh, made personal.
            </motion.p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════════
            YOU ARE THE PIONEER
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section id="story" className="relative py-24 sm:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src={images.downtown} alt="Pittsburgh skyline" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-reflex-blue/90" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight mb-8">
                  You Are the{' '}
                  <span className="text-brand-pms-129 italic">Pioneer</span>
                </h2>
                <p className="text-xl text-white/90 leading-relaxed mb-6">
                  You're not just moving — you're starting something new. A new job. A new school. A new home. And maybe even a new language or culture. That takes courage.
                </p>
                <p className="text-lg text-white/70 leading-relaxed">
                  We built Pittsburgh Tomorrow Pioneer to support you — because you are the Pioneer. This site is here to walk alongside you as you build a future in Pittsburgh.
                </p>
              </motion.div>

              {/* Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={images.neighborhoodHill}
                    alt="Pittsburgh neighborhood hillside"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-brand-pms-129 text-brand-reflex-blue px-6 py-3 rounded-lg font-black text-sm">
                  90 Neighborhoods
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════════
            HOW PIONEER HELPS - Features
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section id="mission" className="py-20 sm:py-28 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-brand-reflex-blue mb-4">
                How Pittsburgh Tomorrow Pioneer Helps
              </h2>
            </motion.div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Made for You — Wherever You're From",
                  desc: "We know not everyone speaks English as their first language. That's why Pittsburgh Tomorrow Pioneer supports dozens of global languages, including Spanish, Arabic, French, Chinese, Dari, and more. If you type in your native language, Pioneer will respond in kind.",
                },
                {
                  icon: <Map className="w-6 h-6" />,
                  title: 'Create Your Personal Roadmap',
                  desc: "Our most powerful tool is your personalized roadmap — a checklist made just for you. By answering a few simple questions about your needs, Pioneer creates a tailored action plan. View and update anytime, save your progress, download or print your checklist.",
                },
                {
                  icon: <MessageCircle className="w-6 h-6" />,
                  title: 'Smart, Self-Guided Support',
                  desc: "Pioneer features a friendly AI chatbot trained to answer hundreds of common questions. It can guide you to resources, explain how local systems work, and help you take the next step.",
                },
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: 'Trusted Partners',
                  desc: "Access our complete directory of trusted partners — public agencies, nonprofits, and service providers throughout Pittsburgh and Allegheny County. Our network includes 380+ not-for-profit organizations ready to help with your specific needs.",
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: 'Your Privacy, Protected',
                  desc: "Your privacy and security matter to us. If you choose to create an account, your personal data is protected by SOC II-compliant security protocols. We will never sell or share your data. You remain in full control of your information at all times.",
                },
                {
                  icon: <CheckCircle2 className="w-6 h-6" />,
                  title: 'Free & Comprehensive',
                  desc: "Pittsburgh Tomorrow Pioneer is completely free to use. Whether you're finding housing, enrolling your child in school, learning English, or looking to meet people who share your faith, language, or interests — we've got you covered.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-brand-pms-129/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-12 h-12 bg-brand-reflex-blue rounded-xl flex items-center justify-center text-white mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-black text-brand-reflex-blue mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                to="/screening"
                className="group inline-flex items-center gap-3 bg-brand-pms-129 text-brand-reflex-blue px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-lg transition-all duration-300"
              >
                <span>Create Your Roadmap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════════
            RESOURCES SECTION
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section id="resources" className="py-20 sm:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-reflex-blue mb-4">
                Browse Resources
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore at your own pace with our complete resource library — no login required.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: t('homepage.featureLiving', 'Living Essentials'), icon: <Home className="w-5 h-5" />, desc: 'Housing, utilities, healthcare', link: '/resources/living-essentials', color: 'bg-blue-500' },
                { title: t('homepage.featureCommunity', 'Community & Belonging'), icon: <Users className="w-5 h-5" />, desc: 'Faith, hobbies, neighborhood councils', link: '/resources/community-belonging', color: 'bg-purple-500' },
                { title: t('homepage.featureEducation', 'Education'), icon: <BookOpen className="w-5 h-5" />, desc: 'Schools for adults and youth', link: '/resources/education-youth', color: 'bg-green-500' },
                { title: t('homepage.featureESL', 'ESL & Immigrant Support'), icon: <Globe className="w-5 h-5" />, desc: 'Language classes, legal aid', link: '/resources/esl-immigrant', color: 'bg-orange-500' },
                { title: t('homepage.featureJobs', 'Jobs & Business'), icon: <CheckCircle2 className="w-5 h-5" />, desc: 'Career services, job boards', link: '/resources/work-business', color: 'bg-pink-500' },
                { title: t('homepage.featureCulture', 'Culture & Fun'), icon: <Camera className="w-5 h-5" />, desc: 'Arts, events, entertainment', link: '/resources/culture-leisure', color: 'bg-teal-500' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={item.link}
                    className="group flex items-center gap-4 p-5 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100"
                  >
                    <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-brand-reflex-blue group-hover:text-brand-pms-129 transition-colors text-sm">{item.title}</h3>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-pms-129 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════════
            GALLERY - Discover Pittsburgh
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section id="gallery" className="py-20 sm:py-28 bg-brand-reflex-blue">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4">
                <Camera className="w-4 h-4 text-brand-pms-129" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/80">Explore the City</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-white">
                Discover <span className="text-brand-pms-129">Pittsburgh</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: images.downtown, span: 'col-span-2 row-span-2' },
                { src: images.yellowBridgeNight, span: '' },
                { src: images.ppgPlace, span: '' },
                { src: images.bridgeSunshine, span: '' },
                { src: images.neighborhoodHill, span: '' },
              ].map((photo, i) => (
                <motion.div
                  key={i}
                  className={`${photo.span} relative rounded-xl overflow-hidden group cursor-pointer aspect-square`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={photo.src}
                    alt="Pittsburgh"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════════
            ABOUT PITTSBURGH TOMORROW (Bottom)
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section className="py-20 sm:py-28 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-reflex-blue/5 rounded-full mb-6">
                <Building2 className="w-4 h-4 text-brand-reflex-blue" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-reflex-blue">Our Organization</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-reflex-blue mb-8">
                About Pittsburgh Tomorrow
              </h2>

              <div className="text-left space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Pittsburgh Tomorrow Pioneer is an initiative of <strong className="text-brand-reflex-blue">Pittsburgh Tomorrow</strong>, a nonprofit organization on a mission to grow Pittsburgh. We're catalyzing the new spirit that's redefining what historian David McCullough called "America's Indispensable City."
                </p>

                <p>
                  The region that built America from the ground up is surging with a new vitality and civic spirit: welcoming newcomers, launching entrepreneurs, and blazing new trails. Our movement is powered by a new wave of pioneers, first-movers, and risk-takers who are seizing opportunity and building the future — in Pittsburgh.
                </p>

                <p>
                  At Pittsburgh Tomorrow, we're on a mission to grow Pittsburgh. And that doesn't just mean population or economic growth; it means revitalizing our city's spirit. Supporting small businesses and entrepreneurs. Beautifying and preserving our environment. Promoting arts and culture. Welcoming newcomers and creating community. Being proud of our city, and putting it back on the map.
                </p>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-200">
                <a
                  href="https://pittsburghtomorrow.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-reflex-blue hover:text-brand-pms-129 font-bold text-sm transition-colors"
                >
                  <span>Learn more about Pittsburgh Tomorrow</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════════════════════════════════════ */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img src={images.cityNight} alt="Pittsburgh at night" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-reflex-blue/90" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white leading-tight mb-6">
                Ready to start your{' '}
                <span className="text-brand-pms-129 italic">Pittsburgh journey?</span>
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Create your personalized roadmap in minutes. It's free, private, and available in dozens of languages.
              </p>
              <Link
                to="/screening"
                className="group inline-flex items-center gap-3 bg-brand-pms-129 text-brand-reflex-blue px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(244,179,61,0.5)] transition-all duration-500 hover:scale-105"
              >
                <span>Create Your Roadmap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
