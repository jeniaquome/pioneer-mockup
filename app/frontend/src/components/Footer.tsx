import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-brand-reflex-blue text-white mt-auto" data-nosnippet>
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Logo and CTA */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 pb-12 border-b border-white/10">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/branding/assets/logo-0.svg"
                alt="Pittsburgh Tomorrow Pioneer Logo"
                className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
                style={{ minHeight: '40px', maxWidth: '280px' }}
              />
            </div>

            {/* CTA Button */}
            <Link
              to="/screening"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-pms-129 text-brand-reflex-blue rounded-sm text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(244,179,61,0.5)] transition-all duration-500 hover:scale-105"
            >
              <span>{t('footer.getYourGuide', 'Get Your Guide')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Middle Section - Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16">
            {/* Explore Column */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-6">
                {t('footer.explore', 'Explore')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/resources"
                    className="text-sm text-white/80 hover:text-brand-pms-129 transition-colors duration-300"
                  >
                    {t('footer.neighborhoods', 'Neighborhoods')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#gallery"
                    className="text-sm text-white/80 hover:text-brand-pms-129 transition-colors duration-300"
                  >
                    {t('footer.gallery', 'Gallery')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources"
                    className="text-sm text-white/80 hover:text-brand-pms-129 transition-colors duration-300"
                  >
                    {t('footer.resources', 'Resources')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-6">
                {t('footer.resourceCategories', 'Resources')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/resources/living-essentials"
                    className="text-sm text-white/80 hover:text-brand-pms-129 transition-colors duration-300"
                  >
                    {t('footer.livingEssentials', 'Living Essentials')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources/community-belonging"
                    className="text-sm text-white/80 hover:text-brand-pms-129 transition-colors duration-300"
                  >
                    {t('footer.community', 'Community')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources/work-business"
                    className="text-sm text-white/80 hover:text-brand-pms-129 transition-colors duration-300"
                  >
                    {t('footer.jobsBusiness', 'Jobs & Business')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-6">
                {t('footer.aboutSection', 'About')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-white/80 hover:text-brand-pms-129 transition-colors duration-300"
                  >
                    {t('footer.pioneerStory', 'The Pioneer Story')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-white/80 hover:text-brand-pms-129 transition-colors duration-300"
                  >
                    {t('footer.privacyPolicy', 'Privacy Policy')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-6">
                {t('footer.contact', 'Contact')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <span className="text-sm text-white/60">
                    {t('footer.location', 'Pittsburgh, PA')}
                  </span>
                </li>
                <li>
                  <a
                    href="mailto:Hello@pittsburghtomorrow.org"
                    className="text-sm text-white/80 hover:text-brand-pms-129 transition-colors duration-300"
                  >
                    Hello@pittsburghtomorrow.org
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
            <p className="text-[11px] text-white/40 tracking-wide">
              &copy; {new Date().getFullYear()} Pittsburgh Tomorrow Pioneer. {t('common.allRightsReserved', 'All rights reserved.')}
            </p>
            <p className="text-[11px] text-white/40 tracking-wide">
              {t('common.initiativeOfPittsburghTomorrow', 'An initiative of Pittsburgh Tomorrow')}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-brand-pms-129 to-transparent opacity-50" />
    </footer>
  )
}
